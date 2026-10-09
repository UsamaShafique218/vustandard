// Initial LMS portfolio records. Keep this file free of frontend asset imports
// so the server seed script can use it too.
const lmsHandled = [
  ["Javid Ali", "BS Computer Science", "Semester 8", "Full LMS Handle", "bscs"],
  ["NAIMAL ASIF FAROOQUI", "BS Sociology", "Semester 2", "Full LMS Handle", "sociology"],
  ["M REHAN IRFAN", "BS Computer Science", "Semester 3", "Full LMS Handle", "bscs"],
  ["ASHIR SHABIR", "BS Business Administration", "Semester 7", "Full LMS Handle", "business"],
  ["Amir Mustafa", "BS Computer Science", "Semester 5", "Full LMS Handle", "bscs"],
  ["Sadaf Sania", "BS Computer Science", "Semester 6", "Full LMS Handle", "bscs"],
  ["Irsa Ashfaq", "BS Information Technology", "Semester 7", "Assignments + GDBs", "bsit"],
  ["Alina Razzaq", "BS Information Technology", "Semester 5", "Assignments", "bsit"],
  ["Tayyaba Rafique", "BS Information Technology", "Semester 8", "Full LMS Handle", "bsit"],
  ["HAFIZ SYED SAAD ALI ZAIDI", "BB Information Technology (BBIT)", "Semester 3", "Full LMS Handle", "bbit"],
  ["SAFI UR REHMAN", "BS Computer Science (BSCS)", "Semester 2", "Full LMS Handle", "bscs"],
  ["Shawana", "BS Information Technology", "Semester 8", "Assignments", "bsit"],
  ["Amjad Ali", "BS Information Technology", "Semester 2", "Assignments, Quizzes, GDBs", "bsit"],
  ["Iqra Farooq", "BS Computer Science (BSCS)", "Semester 8", "Full LMS Handle", "bsit"],
  ["Rabia Mubeen", "BS Information Technology", "Semester 3", "Full LMS Handle", "bsit"],
  ["Dua Fatima", "BS Information Technology", "Semester 3", "Full LMS Handle", "bsit"],
  ["Imran Khan", "BS Computer Science (BSCS)", "Semester 7", "Full LMS Handle", "bscs"],
  ["Mansoor Ahmad", "BS Computer Science (BSCS)", "Semester 7", "Assignments, Quizzes, GDBs", "bscs"],
  ["Mansoor Ahmad", "BS English", "Semester 3", "Full LMS Handle", "english"],
  ["Rabia Razzaq", "BS Information Technology", "Semester 2", "Assignments", "bsit"],
].map(([name, program, semester, type, imageKey], i) => ({ seedKey: `lms-${i + 1}`, name, program, semester, type, imageKey, order: i }));

export default lmsHandled;
