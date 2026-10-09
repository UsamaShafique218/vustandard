import express from "express";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
import protect from "../middleware/authMiddleware.js";
import { Subject, Quiz, Note, Project, LmsHandled, StudentResult, StudentTestimonial, Solution, Message, Attempt, Setting } from "../models/content.js";
import siteDefaults from "../../src/data/site.js";
import lmsHandledDefaults from "../../src/data/lmsHandled.js";
import { resultDefaults, testimonialDefaults } from "../../src/data/studentShowcase.js";

const router = express.Router();

const pick = (body, fields) =>
  Object.fromEntries(fields.filter((f) => body?.[f] !== undefined).map((f) => [f, body[f]]));

const validId = (req, res, next) =>
  mongoose.isValidObjectId(req.params.id) ? next() : res.status(404).json({ message: "Not found" });

// Public GET + admin create/update/delete for a collection.
const crud = (path, Model, { fields, sort, publicFilter = () => ({}), listHandler }) => {
  router.get(
    path,
    listHandler ||
      (async (req, res) => {
        res.json(await Model.find(publicFilter(req)).sort(sort).lean());
      })
  );
  router.post(path, protect, async (req, res) => {
    const item = await Model.create(pick(req.body, fields));
    res.status(201).json(item);
  });
  router.put(`${path}/:id`, protect, validId, async (req, res) => {
    const item = await Model.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    item.set(pick(req.body, fields));
    await item.save();
    res.json(item);
  });
  router.delete(`${path}/:id`, protect, validId, async (req, res) => {
    const item = await Model.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  });
};

crud("/subjects", Subject, { fields: ["code", "title", "department"], sort: { department: 1, code: 1 } });

crud("/notes", Note, {
  fields: ["subject", "term", "title", "description", "links"],
  sort: { subject: 1, term: 1 },
  publicFilter: (req) => (["midterm", "final"].includes(req.query.term) ? { term: req.query.term } : {}),
});

crud("/projects", Project, {
  fields: ["course", "title", "description", "youtubeUrl", "imageUrl", "projectUrl", "studentName", "tech", "order"],
  sort: { order: 1, createdAt: -1 },
});

crud("/lms-handled", LmsHandled, {
  fields: ["name", "program", "semester", "type", "imageKey", "imageUrl", "order"],
  sort: { order: 1, createdAt: -1 },
  listHandler: async (_req, res) => {
    const marker = await Setting.findOne({ key: "lms-handled-seed-v1" }).lean();
    if (!marker) {
      await LmsHandled.bulkWrite(lmsHandledDefaults.map((item) => ({
        updateOne: { filter: { seedKey: item.seedKey }, update: { $setOnInsert: item }, upsert: true },
      })));
      await Setting.updateOne({ key: "lms-handled-seed-v1" }, { $setOnInsert: { data: { seeded: true } } }, { upsert: true });
    }
    res.json(await LmsHandled.find().sort({ order: 1, createdAt: -1 }).lean());
  },
});

crud("/results", StudentResult, {
  fields: ["title", "desc", "gallery", "imageKeys", "order"],
  sort: { order: 1, createdAt: -1 },
  listHandler: async (_req, res) => {
    const marker = await Setting.findOne({ key: "results-seed-v1" }).lean();
    if (!marker) {
      await StudentResult.bulkWrite(resultDefaults.map((item) => ({
        updateOne: { filter: { seedKey: item.seedKey }, update: { $setOnInsert: item }, upsert: true },
      })));
      await Setting.updateOne({ key: "results-seed-v1" }, { $setOnInsert: { data: { seeded: true } } }, { upsert: true });
    }
    res.json(await StudentResult.find().sort({ order: 1, createdAt: -1 }).lean());
  },
});

crud("/testimonials", StudentTestimonial, {
  fields: ["name", "degree", "text", "imageKey", "imageUrl", "order"],
  sort: { order: 1, createdAt: -1 },
  listHandler: async (_req, res) => {
    const marker = await Setting.findOne({ key: "testimonials-seed-v1" }).lean();
    if (!marker) {
      await StudentTestimonial.bulkWrite(testimonialDefaults.map((item) => ({
        updateOne: { filter: { seedKey: item.seedKey }, update: { $setOnInsert: item }, upsert: true },
      })));
      await Setting.updateOne({ key: "testimonials-seed-v1" }, { $setOnInsert: { data: { seeded: true } } }, { upsert: true });
    }
    res.json(await StudentTestimonial.find().sort({ order: 1, createdAt: -1 }).lean());
  },
});

// Quizzes: the list omits questions; admins see every quiz, the public only published ones.
router.get("/quizzes/admin", protect, async (req, res) => {
  res.json(await Quiz.find().sort({ code: 1 }).lean());
});
crud("/quizzes", Quiz, {
  fields: ["code", "title", "department", "term", "published", "questions"],
  listHandler: async (req, res) => {
    const items = await Quiz.aggregate([
      { $match: { published: true } },
      { $project: { code: 1, title: 1, department: 1, term: 1, questionCount: { $size: "$questions" } } },
      { $sort: { code: 1 } },
    ]);
    res.json(items);
  },
});
router.get("/quizzes/:code", async (req, res) => {
  const quiz = await Quiz.findOne({ code: req.params.code.toUpperCase(), term: req.query.term === "final" ? "final" : "midterm", published: true }).lean();
  if (!quiz) return res.status(404).json({ message: "Quiz not found" });
  res.json(quiz);
});

// Assignment solutions: the public list omits the code; the detail route returns it.
router.get("/solutions/admin", protect, async (req, res) => {
  res.json(await Solution.find().sort({ subject: 1, createdAt: -1 }).lean());
});
crud("/solutions", Solution, {
  fields: ["subject", "title", "semester", "language", "description", "code", "fileUrl", "published"],
  listHandler: async (req, res) => {
    const items = await Solution.aggregate([
      { $match: { published: true } },
      { $sort: { subject: 1, createdAt: -1 } },
      {
        $project: {
          subject: 1, title: 1, semester: 1, language: 1, createdAt: 1,
          lines: { $size: { $split: [{ $rtrim: { input: "$code" } }, "\n"] } },
        },
      },
    ]);
    res.json(items);
  },
});
router.get("/solutions/:id", validId, async (req, res) => {
  const item = await Solution.findOne({ _id: req.params.id, published: true }).lean();
  if (!item) return res.status(404).json({ message: "Solution not found" });
  res.json(item);
});

// Contact messages: anyone can send, only admins can read.
const messageLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 5,
  message: { message: "Too many messages. Please try again in a few minutes or contact us on WhatsApp." },
});
router.post("/messages", messageLimiter, async (req, res) => {
  const msg = await Message.create(pick(req.body, ["name", "email", "phone", "subject", "message"]));
  res.status(201).json({ message: "Thanks! We'll get back to you soon.", id: msg._id });
});
router.get("/messages", protect, async (req, res) => {
  res.json(await Message.find().sort({ createdAt: -1 }).limit(200).lean());
});
router.patch("/messages/:id", protect, validId, async (req, res) => {
  const msg = await Message.findByIdAndUpdate(req.params.id, { read: !!req.body?.read }, { returnDocument: "after" });
  if (!msg) return res.status(404).json({ message: "Not found" });
  res.json(msg);
});
router.delete("/messages/:id", protect, validId, async (req, res) => {
  await Message.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// Quiz attempts (anonymous, used for admin stats).
const attemptLimiter = rateLimit({ windowMs: 60 * 1000, limit: 20 });
router.post("/attempts", attemptLimiter, async (req, res) => {
  await Attempt.create(pick(req.body, ["name", "vuId", "code", "score", "total"]));
  res.status(201).json({ ok: true });
});

// Site settings (contact details + PDF advertisement block).
const settingFields = Object.keys(siteDefaults);
router.get("/settings", async (req, res) => {
  const doc = await Setting.findOne({ key: "site" }).lean();
  res.json({ ...siteDefaults, ...(doc?.data || {}) });
});
router.put("/settings", protect, async (req, res) => {
  const data = Object.fromEntries(
    Object.entries(pick(req.body, settingFields)).map(([k, v]) => [k, String(v ?? "").trim().slice(0, 500)])
  );
  const doc = await Setting.findOneAndUpdate(
    { key: "site" },
    { data },
    { upsert: true, returnDocument: "after" }
  ).lean();
  res.json({ ...siteDefaults, ...doc.data });
});

router.get("/stats", protect, async (req, res) => {
  const [subjects, quizzes, notes, projects, lmsHandled, results, testimonials, solutions, messages, unread, attempts, recentAttempts] = await Promise.all([
    Subject.countDocuments(),
    Quiz.countDocuments(),
    Note.countDocuments(),
    Project.countDocuments(),
    LmsHandled.countDocuments(),
    StudentResult.countDocuments(),
    StudentTestimonial.countDocuments(),
    Solution.countDocuments(),
    Message.countDocuments(),
    Message.countDocuments({ read: false }),
    Attempt.countDocuments(),
    Attempt.find().sort({ createdAt: -1 }).limit(8).lean(),
  ]);
  res.json({ subjects, quizzes, notes, projects, lmsHandled, results, testimonials, solutions, messages, unread, attempts, recentAttempts });
});

export default router;
