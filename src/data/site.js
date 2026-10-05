// Default site settings. The admin panel can override these (stored in MongoDB);
// the frontend falls back to these values when the API is unreachable.
const siteDefaults = {
  brandName: "VU Standard",
  tagline: "Academic support for Virtual University students",
  ownerName: "Usama Shafique",
  phone: "+92 315 0250218",
  whatsappNumber: "923150250218",
  email: "usamashafique218@gmail.com",
  location: "Bhatta Chowk, Lahore, Pakistan",
  website: "https://vustandard.vercel.app",
  whatsappGroup: "https://chat.whatsapp.com/KzGpWuZ0We303YZIiKxR9o",
  whatsappChannel: "https://whatsapp.com/channel/0029Vb5rrHyFcow7ovZDos3S",
  youtube: "https://www.youtube.com/@vu_standard",
  facebook: "https://www.facebook.com/UsDua218",
  instagram: "https://www.instagram.com/usama_shafique218",
  announcement: "15% off on full LMS handling this semester — message us on WhatsApp to reserve your slot.",
  pdfMessage:
    "Need help with assignments, quizzes, GDBs, LMS handling or your CS519/CS619 final project? Contact VU Standard.",
};

export const whatsappLink = (number, text = "Hello! I'm messaging from the VU Standard website.") =>
  `https://wa.me/${number}?text=${encodeURIComponent(text)}`;

export default siteDefaults;
