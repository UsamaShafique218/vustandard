// Seeds subjects, quizzes, notes and the default admin account.
// Existing records are updated by code, nothing created from the admin panel is removed.
import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import { Subject, Quiz, Note, Solution } from "./models/content.js";
import subjects from "../src/data/subjects.js";
import sampleSolutions from "../src/data/solutions.js";
import quizzes from "../src/data/quizzes.js";
import notes from "../src/data/notes.js";

const departmentOf = Object.fromEntries(subjects.map((s) => [s.code, s.department]));

await mongoose.connect(process.env.MONGO_URI);

await Subject.bulkWrite(
  subjects.map((s) => ({ updateOne: { filter: { code: s.code }, update: { $set: s }, upsert: true } }))
);

await Quiz.bulkWrite(
  quizzes.map((q) => ({
    updateOne: {
      filter: { code: q.code },
      update: { $set: { ...q, department: departmentOf[q.code] || q.code.replace(/\d+/, "") } },
      upsert: true,
    },
  }))
);

await Note.bulkWrite(
  notes.map((n) => ({
    updateOne: { filter: { subject: n.subject, term: n.term }, update: { $set: n }, upsert: true },
  }))
);

// Sample solutions are only added once; after that they're managed from the admin panel.
if (!(await Solution.exists({}))) {
  await Solution.insertMany(sampleSolutions.map(({ _id, createdAt: _createdAt, ...s }) => s));
}

const email = (process.env.ADMIN_EMAIL || "admin@vustandard.com").toLowerCase();
if (!(await User.exists({ email }))) {
  await User.create({
    name: "VU Standard Admin",
    email,
    password: await bcrypt.hash(process.env.ADMIN_PASSWORD || "Admin@123", 10),
  });
  console.log(`Admin created: ${email}`);
} else {
  console.log(`Admin already exists: ${email}`);
}

console.log(`Seeded ${subjects.length} subjects, ${quizzes.length} quizzes, ${notes.length} notes; ${await Solution.countDocuments()} solutions in the database.`);
await mongoose.disconnect();
