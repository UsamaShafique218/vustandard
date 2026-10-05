// Midterm and final term study files. Shared by the frontend and server/seed.js.
const DRIVE_FILE = "https://drive.google.com/file/d/1Htlj1NeLZwwvA1ePD0eyHYOHJ668qdgk/view?usp=sharing";

const notes = [
  {
    subject: "CS101",
    term: "midterm",
    title: "CS101 Midterm Notes",
    description: "Solved midterm notes covering modules 1–8 with the most repeated MCQs.",
    links: [
      { label: "VU Standard File", url: DRIVE_FILE },
      { label: "Junaid File", url: DRIVE_FILE },
    ],
  },
  {
    subject: "CS202",
    term: "midterm",
    title: "CS202 Midterm Notes",
    description: "HTML and CSS fundamentals, current paper questions and short notes.",
    links: [
      { label: "VU Standard File", url: DRIVE_FILE },
      { label: "Junaid File", url: DRIVE_FILE },
    ],
  },
  {
    subject: "CS101",
    term: "final",
    title: "CS101 Final Term Notes",
    description: "Solved final term notes with past paper MCQs and subjective questions.",
    links: [
      { label: "VU Standard File", url: DRIVE_FILE },
      { label: "Junaid File", url: DRIVE_FILE },
    ],
  },
  {
    subject: "CS202",
    term: "final",
    title: "CS202 Final Term Notes",
    description: "Complete final term preparation file with repeated MCQs and solved sample paper.",
    links: [
      { label: "Final Term Preparation 2026 (PDF)", url: "/pdfs/CS202 final term Prepration 2026.pdf" },
      { label: "VU Standard File", url: DRIVE_FILE },
      { label: "Junaid File", url: DRIVE_FILE },
    ],
  },
];

export default notes;
