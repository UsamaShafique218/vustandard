// Image-backed content used only by the frontend (services, LMS handled, reviews, team, results, Cisco).
import bscs from "../assets/optimized/bscs.webp";
import bsit from "../assets/optimized/bsit.webp";
import bs_sociology from "../assets/optimized/bs_sociology.webp";
import bs_ba from "../assets/optimized/bs_ba.webp";
import bbit from "../assets/optimized/bbit.webp";
import bs_english from "../assets/optimized/bs_english.webp";
import lmsHandledSeed from "./lmsHandled";

import lmsHandlingImg from "../assets/images/educational_img.webp";
import assignmntImg from "../assets/optimized/assignmnt_img.webp";
import quizImg from "../assets/images/quiz-background.jpg";
import gdbImg from "../assets/optimized/gdb_img.webp";
import fypProjectImg from "../assets/optimized/fyp_project.webp";
import lmsQuiries from "../assets/optimized/lms_quiries.webp";

import usamaImg from "../assets/images/user_img1.jpeg";
import javidImg from "../assets/images/javid_ali.jpeg";
import umairImg from "../assets/images/umair_mailo.jpeg";
import ashirImg from "../assets/images/ashir_img.jpeg";

import cs101 from "../assets/images/assignments/cs101.PNG";
import cs101_2 from "../assets/images/assignments/cs101_2.PNG";
import cs101_3 from "../assets/images/assignments/cs101_3.PNG";
import cs201 from "../assets/images/assignments/cs201.PNG";
import cs201p from "../assets/images/assignments/cs201p.PNG";
import cs202 from "../assets/images/assignments/cs202.PNG";
import cs302 from "../assets/images/assignments/cs302.PNG";
import cs302p from "../assets/images/assignments/cs302p.PNG";
import cs420 from "../assets/images/assignments/cs420.PNG";
import cs506 from "../assets/images/assignments/cs506.PNG";
import cs601 from "../assets/images/assignments/cs601.PNG";
import mth104 from "../assets/images/assignments/mth104.PNG";
import phy301 from "../assets/images/assignments/phy301.PNG";

const ciscoImages = import.meta.glob("../assets/images/cisco/*.PNG", { eager: true, import: "default" });

export const services = [
  {
    key: "lms",
    title: "LMS Handling",
    text: "Complete management of your VU LMS: organizing course content, tracking progress, communication and every graded activity, so your semester runs smoothly.",
    img: lmsHandlingImg,
  },
  {
    key: "assignments",
    title: "Assignments",
    text: "Well-researched, original solutions that apply the course concepts and are submitted within the deadline.",
    img: assignmntImg,
  },
  {
    key: "quiz",
    title: "Quizzes",
    text: "Quiz support with accurate answers and proper time management, plus free practice quizzes on this website.",
    img: quizImg,
  },
  {
    key: "gdb",
    title: "GDBs",
    text: "Well-structured Graded Discussion Board posts that match the course objectives and are posted on time.",
    img: gdbImg,
  },
  {
    key: "projects",
    title: "Paid Projects",
    text: "CS519 and CS619 final projects, from proposal, SRS and design document to a working prototype and viva preparation.",
    img: fypProjectImg,
  },
  {
    key: "free",
    title: "Free Services",
    text: "Free guidance on LMS queries, course selection, practice quizzes and midterm/final term preparation files.",
    img: lmsQuiries,
  },
];

const lmsImages = { bscs, bsit, sociology: bs_sociology, business: bs_ba, bbit, english: bs_english };
export const lmsHandled = lmsHandledSeed.map((item) => ({ ...item, image: lmsImages[item.imageKey] }));
export const lmsImageFor = (imageKey) => lmsImages[imageKey] || bscs;

export const testimonials = [
  { name: "Javid Ali", degree: "BSCS", image: javidImg, text: "Professional LMS handling. Course selection and assignments were managed smoothly." },
  { name: "Alina Razzaq", text: "You are a brilliant teacher. Your teaching method is very understandable and helps a lot in preparation." },
  { name: "Ayesha Mughal", text: "Sir Usama boht achy teacher hain. Students ki boht help krty hain aur preparation bhi strong ho jati hai." },
  { name: "Irsa Ashfaq", text: "Your services are excellent, Sir Usama. You've been a great guide and helped me immensely with my studies. Your friendly approach and willingness to clarify doubts have made me feel comfortable asking questions without hesitation. Thank you for your guidance and support!" },
  { name: "Shawana", degree: "BSIT", text: "Thank you so much, Sir! Your guidance and support have been invaluable in helping me complete my assignments. Your teaching style and expertise have made complex concepts easier to understand. I'm grateful for your dedication and hard work. Keep up the fantastic job, Sir!" },
  { name: "Fatima Noor", degree: "BBA", text: "GDB aur LMS handling ka experience boht professional tha. Communication bhi clear aur fast thi." },
  { name: "NAIMAL ASIF FAROOQUI", degree: "Sociology", text: "Usama Thanks, Bht achy sy lms handle kia ap ny Acadmic Activies ki wja sy mera acha grade aya, again thanks..!" },
  { name: "M REHAN IRFAN", degree: "BSCS", text: "Preparation guidelines boht helpful thi. Or Lms Handle b Bht achy sy kia, Final exams me great marks aaye." },
  { name: "ASHIR SHABIR", degree: "BS Business Administration", image: ashirImg, text: "Usama Bhai Bht Bht shukria apka ap ny bht achy sy handle kia lms or files etc b outclass share ki jis sy mera result kafi bhtr hova, Thanks a lot..." },
  { name: "Anum Ijaz", degree: "BSCS", text: "Sir apka samjhana ka tareeka to bhout behtreen hai or informative hai. AP bhout cooperative Hain about study, students ko har mushkil mn sahi guidelines dete hain." },
  { name: "M Ibrahim", degree: "BSCS", text: "Excellent services, results always on time, quizzes and assignments are a breeze! Keep up the good work VU Standard!" },
  { name: "Aleena Zanib", degree: "BSCS", text: "I really liked their work, everything was 100% clear in the GDB assignment and afterwards in everything, I mean their services are very good." },
  { name: "Alveena", degree: "BS English", text: "LMS activities and assignments are all clear now Alhamdulillah, I've had minimal gaps so far thanks to your support." },
];

export const team = [
  { name: "Usama Shafique", role: "CEO & Founder", image: usamaImg, bio: "BSCS graduate and developer. Leads LMS handling, projects and student support." },
  { name: "Javid Ali", role: "Chairman", image: javidImg, bio: "Oversees quality and makes sure every task meets VU standards." },
  { name: "Umair Shafique", role: "Director Strategy", image: umairImg, bio: "Plans services and partnerships to reach more VU students." },
];

export const results = [
  { title: "CS101", desc: "Assignment result 2026", gallery: [cs101, cs101_2, cs101_3] },
  { title: "CS201 & CS201P", desc: "Assignment result 2026", gallery: [cs201, cs201p] },
  { title: "CS202", desc: "Assignment result 2026", gallery: [cs202] },
  { title: "CS302 & CS302P", desc: "Assignment result 2026", gallery: [cs302, cs302p] },
  { title: "CS420", desc: "Assignment result 2026", gallery: [cs420] },
  { title: "CS506", desc: "Assignment result 2026", gallery: [cs506] },
  { title: "CS601", desc: "Assignment result 2026", gallery: [cs601] },
  { title: "MTH104", desc: "Assignment result 2026", gallery: [mth104] },
  { title: "PHY301", desc: "Assignment result 2026", gallery: [phy301] },
];

export const ciscoCourses = Object.entries(ciscoImages)
  .map(([path, src]) => ({ n: Number(path.match(/course(\d+)/)[1]), src }))
  .sort((a, b) => a.n - b.n)
  .map(({ n, src }) => ({ src, title: `Cisco course certificate ${n}` }));

export const whyChoose = [
  { title: "Transparent Pricing", text: "Clear, upfront pricing for all services with no hidden fees, so you can focus on learning without worry." },
  { title: "Reliable Support", text: "Our team is available 24/7 to guide you through assignments, quizzes and LMS tasks efficiently and on time." },
  { title: "Comfortable Learning", text: "A smooth, stress-free learning experience with personalized guidance tailored to your pace." },
  { title: "Extra Resources", text: "Additional study materials, tips and preparation files to improve your academic performance." },
];
