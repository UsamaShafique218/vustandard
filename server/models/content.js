import mongoose from "mongoose";

const { Schema, model } = mongoose;
const opts = { timestamps: true };

export const Subject = model(
  "Subject",
  new Schema(
    {
      code: { type: String, required: true, unique: true, uppercase: true, trim: true },
      title: { type: String, required: true, trim: true },
      department: { type: String, required: true, uppercase: true, trim: true },
    },
    opts
  )
);

const questionSchema = new Schema(
  {
    question: { type: String, required: true, trim: true },
    options: {
      type: [String],
      validate: { validator: (v) => v.length >= 2 && v.length <= 6, message: "A question needs 2–6 options" },
    },
    answer: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

export const Quiz = model(
  "Quiz",
  new Schema(
    {
      code: { type: String, required: true, uppercase: true, trim: true },
      term: { type: String, enum: ["midterm", "final"], default: "midterm", required: true },
      title: { type: String, required: true, trim: true },
      department: { type: String, uppercase: true, trim: true },
      published: { type: Boolean, default: true },
      questions: [questionSchema],
    },
    opts
  )
);
Quiz.schema.index({ code: 1, term: 1 }, { unique: true });

export const Note = model(
  "Note",
  new Schema(
    {
      subject: { type: String, required: true, uppercase: true, trim: true },
      term: { type: String, enum: ["midterm", "final"], required: true },
      title: { type: String, required: true, trim: true },
      description: { type: String, trim: true, default: "" },
      links: [{ _id: false, label: { type: String, trim: true }, url: { type: String, trim: true } }],
    },
    opts
  )
);

// Accepts youtu.be, youtube.com/watch?v=, /embed/, /shorts/ and /live/ links.
export const youtubeId = (url = "") => {
  const m = String(url).match(/(?:youtu\.be\/|v=|\/embed\/|\/shorts\/|\/live\/)([\w-]{11})/);
  return m ? m[1] : null;
};

const projectSchema = new Schema(
  {
    course: { type: String, enum: ["CS519", "CS619"], required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: "" },
    youtubeUrl: { type: String, trim: true, default: "" },
    imageUrl: { type: String, trim: true, default: "" },
    projectUrl: { type: String, trim: true, default: "" },
    videoId: { type: String },
    studentName: { type: String, trim: true, default: "" },
    tech: { type: String, trim: true, default: "" },
    order: { type: Number, default: 0 },
  },
  opts
);
projectSchema.pre("validate", function () {
  this.videoId = this.youtubeUrl ? youtubeId(this.youtubeUrl) : null;
  if (this.youtubeUrl && !this.videoId) this.invalidate("youtubeUrl", "Enter a valid YouTube video link");
  if (!this.imageUrl && !this.videoId) this.invalidate("imageUrl", "Upload a project image");
});
export const Project = model("Project", projectSchema);

export const LmsHandled = model(
  "LmsHandled",
  new Schema(
    {
      seedKey: { type: String, unique: true, sparse: true },
      name: { type: String, required: true, trim: true, maxlength: 120 },
      program: { type: String, required: true, trim: true, maxlength: 120 },
      semester: { type: String, required: true, trim: true, maxlength: 40 },
      type: { type: String, required: true, trim: true, maxlength: 80 },
      imageKey: { type: String, trim: true, default: "" },
      imageUrl: { type: String, trim: true, default: "" },
      order: { type: Number, default: 0 },
    },
    opts
  )
);

export const solutionLanguages = ["cpp", "c", "java", "csharp", "python", "javascript", "php", "html", "css", "sql", "assembly", "text"];

export const Solution = model(
  "Solution",
  new Schema(
    {
      subject: { type: String, required: true, uppercase: true, trim: true },
      title: { type: String, required: true, trim: true, maxlength: 160 },
      semester: { type: String, trim: true, maxlength: 40, default: "" },
      language: { type: String, enum: solutionLanguages, default: "cpp" },
      description: { type: String, trim: true, maxlength: 8000, default: "" },
      code: { type: String, required: true, maxlength: 200000 },
      fileUrl: { type: String, trim: true, default: "" },
      published: { type: Boolean, default: true },
    },
    opts
  )
);

export const Message = model(
  "Message",
  new Schema(
    {
      name: { type: String, required: true, trim: true, maxlength: 120 },
      email: { type: String, trim: true, maxlength: 160, default: "" },
      phone: { type: String, trim: true, maxlength: 40, default: "" },
      subject: { type: String, trim: true, maxlength: 160, default: "" },
      message: { type: String, required: true, trim: true, maxlength: 3000 },
      read: { type: Boolean, default: false },
    },
    opts
  )
);

export const Attempt = model(
  "Attempt",
  new Schema(
    {
      name: { type: String, trim: true, maxlength: 120, default: "" },
      vuId: { type: String, trim: true, maxlength: 40, default: "" },
      code: { type: String, required: true, uppercase: true, trim: true },
      score: { type: Number, required: true, min: 0 },
      total: { type: Number, required: true, min: 1 },
    },
    opts
  )
);

// Single document (key: "site") holding admin-editable contact and PDF branding details.
export const Setting = model(
  "Setting",
  new Schema({ key: { type: String, unique: true, default: "site" }, data: { type: Object, default: {} } }, opts)
);
