// Image-backed content used only by the frontend (services, LMS handled, reviews, team, results, Cisco).
import bscs from "../assets/optimized/bscs.webp";
import bsit from "../assets/optimized/bsit.webp";
import bs_sociology from "../assets/optimized/bs_sociology.webp";
import bs_ba from "../assets/optimized/bs_ba.webp";
import bbit from "../assets/optimized/bbit.webp";
import bs_english from "../assets/optimized/bs_english.webp";
import lmsHandledSeed from "./lmsHandled";
import { resultDefaults, testimonialDefaults } from "./studentShowcase";

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

const reviewImages = { javid: javidImg, ashir: ashirImg };
export const testimonials = testimonialDefaults.map((item) => ({ ...item, image: reviewImages[item.imageKey] || "" }));
export const testimonialImageFor = (key) => reviewImages[key] || "";

export const team = [
  { name: "Usama Shafique", role: "CEO & Founder", image: usamaImg, bio: "BSCS graduate and developer. Leads LMS handling, projects and student support." },
  { name: "Javid Ali", role: "Chairman", image: javidImg, bio: "Oversees quality and makes sure every task meets VU standards." },
  { name: "Umair Shafique", role: "Director Strategy", image: umairImg, bio: "Plans services and partnerships to reach more VU students." },
];

const resultImages = { cs101, cs101_2, cs101_3, cs201, cs201p, cs202, cs302, cs302p, cs420, cs506, cs601, mth104, phy301 };
export const results = resultDefaults.map((item) => ({ ...item, gallery: item.imageKeys.map((key) => resultImages[key]) }));
export const resultImageFor = (key) => resultImages[key] || "";

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
