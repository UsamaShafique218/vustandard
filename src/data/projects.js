// Final project courses shown on the Projects page.
// Student project demo videos are managed from the admin panel (stored in MongoDB).
export const projectCourses = [
  {
    code: "CS519",
    title: "Final Project (ADP / BS)",
    summary:
      "The CS519 final project for ADP and BS students: a working software product built step by step, from proposal to final viva.",
    deliverables: ["Project selection & proposal", "SRS document", "Design document", "Prototype", "Final deliverable & viva"],
  },
  {
    code: "CS619",
    title: "Final Year Project",
    summary:
      "The CS619 final year project for BSCS / BSIT students: a complete system with documentation, a live demo and viva preparation.",
    deliverables: ["Project selection", "SRS & design document", "Prototype phase", "Final deliverable", "Viva preparation"],
  },
];

// Seeded examples; replace or extend from Admin → Projects with your students' YouTube demo links.
const projects = [];

export default projects;
