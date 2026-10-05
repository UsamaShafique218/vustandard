// Quiz result PDF with VU Standard branding and contact/advertisement details.
import logoUrl from "../assets/images/logo.png";
import { whatsappLink } from "../data/site";

const C = {
  ink: [14, 26, 43],
  text: [14, 26, 43],
  text2: [68, 84, 106],
  text3: [94, 110, 130],
  primary: [20, 98, 214],
  primarySubtle: [234, 242, 253],
  border: [226, 232, 240],
  surface2: [246, 248, 251],
  success: [21, 128, 61],
  successSubtle: [231, 245, 236],
  danger: [198, 40, 40],
  dangerSubtle: [253, 236, 236],
  accent: [230, 180, 80],
  white: [255, 255, 255],
};

const toBase64 = (buffer) => {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i += 0x8000) binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(binary);
};

const fetchBase64 = async (url) => toBase64(await (await fetch(url)).arrayBuffer());

let assetsPromise;
const loadAssets = () =>
  (assetsPromise ||= Promise.all([
    import("jspdf"),
    fetchBase64("/fonts/DejaVuSans.ttf"),
    fetchBase64("/fonts/DejaVuSans-Bold.ttf"),
    fetchBase64(logoUrl).catch(() => null),
  ]).catch((err) => {
    assetsPromise = null;
    throw err;
  }));

const pretty = (url = "") => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

export async function downloadQuizPdf({ quiz, answers, student, score, durationSec, settings }) {
  const [{ jsPDF }, regular, bold, logo] = await loadAssets();
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  doc.addFileToVFS("DejaVuSans.ttf", regular);
  doc.addFont("DejaVuSans.ttf", "DejaVu", "normal");
  doc.addFileToVFS("DejaVuSans-Bold.ttf", bold);
  doc.addFont("DejaVuSans-Bold.ttf", "DejaVu", "bold");

  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();
  const M = 16;
  const CW = W - M * 2;
  const FOOTER = 22;
  const total = quiz.questions.length;
  const pct = Math.round((score / total) * 100);
  const passed = pct >= 50;
  const wa = whatsappLink(settings.whatsappNumber, `Hi! I downloaded my ${quiz.code} quiz result from the VU Standard website.`);
  const site = settings.website || (typeof window !== "undefined" ? window.location.origin : "");

  const font = (size, weight = "normal", color = C.text) => {
    doc.setFont("DejaVu", weight);
    doc.setFontSize(size);
    doc.setTextColor(...color);
  };
  const fill = (color) => doc.setFillColor(...color);
  const stroke = (color) => doc.setDrawColor(...color);

  // ---- Header band ----
  const header = (compact) => {
    const h = compact ? 16 : 34;
    fill(C.ink);
    doc.rect(0, 0, W, h, "F");
    fill(C.accent);
    doc.rect(0, h, W, 1.2, "F");
    if (compact) {
      font(9, "bold", C.white);
      doc.text("VU Standard", M, 10);
      font(8, "normal", [170, 183, 201]);
      doc.text(`${quiz.code} · Quiz result · ${student.name || "Student"}`, W - M, 10, { align: "right" });
      return h + 10;
    }
    if (logo) {
      fill(C.white);
      doc.roundedRect(M, 7, 20, 20, 3, 3, "F");
      doc.addImage(`data:image/png;base64,${logo}`, "PNG", M + 1.5, 8.5, 17, 17);
    }
    const tx = logo ? M + 26 : M;
    font(17, "bold", C.white);
    doc.text(settings.brandName || "VU Standard", tx, 16);
    font(9, "normal", [170, 183, 201]);
    doc.text(settings.tagline || "", tx, 22);
    font(9, "bold", C.accent);
    doc.text("PRACTICE QUIZ RESULT", W - M, 15, { align: "right" });
    font(9, "normal", [170, 183, 201]);
    doc.text(new Date().toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" }), W - M, 21, { align: "right" });
    return h + 12;
  };

  let y = header(false);
  const ensure = (needed) => {
    if (y + needed > H - FOOTER) {
      doc.addPage();
      y = header(true);
    }
  };

  // ---- Title ----
  font(19, "bold");
  doc.text(`${quiz.code}: ${quiz.title}`, M, y);
  y += 7;
  font(10, "normal", C.text2);
  doc.text(`${total} multiple-choice questions · free practice quiz by VU Standard`, M, y);
  y += 9;

  // ---- Summary card ----
  const cardH = 38;
  fill(C.surface2);
  stroke(C.border);
  doc.roundedRect(M, y, CW, cardH, 3, 3, "FD");

  // Score block
  fill(passed ? C.successSubtle : C.dangerSubtle);
  doc.roundedRect(M + 5, y + 5, 46, cardH - 10, 2.5, 2.5, "F");
  font(24, "bold", passed ? C.success : C.danger);
  doc.text(`${pct}%`, M + 28, y + 21, { align: "center" });
  font(9, "bold", passed ? C.success : C.danger);
  doc.text(passed ? "PASSED" : "NEEDS PRACTICE", M + 28, y + 28, { align: "center" });

  const rows = [
    ["Student", student.name || "Not provided"],
    ["VU ID", student.vuId || "Not provided"],
    ["Score", `${score} of ${total} correct`],
    ["Time taken", `${Math.floor(durationSec / 60)} min ${durationSec % 60} sec`],
  ];
  rows.forEach(([k, v], i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = M + 60 + col * ((CW - 60) / 2);
    const ry = y + 13 + row * 13;
    font(8, "normal", C.text3);
    doc.text(k.toUpperCase(), x, ry);
    font(11, "bold");
    doc.text(doc.splitTextToSize(v, (CW - 60) / 2 - 6)[0], x, ry + 5.5);
  });
  y += cardH + 8;

  // ---- Advertisement / contact block ----
  const ad = (title) => {
    // Long links (WhatsApp group/channel) take a full row so they are never cut off.
    const items = [
      ["Contact", `${settings.ownerName} · ${settings.brandName}`],
      ["Phone / WhatsApp", settings.phone, wa],
      settings.whatsappGroup && ["Join our WhatsApp group", pretty(settings.whatsappGroup), settings.whatsappGroup, true],
      settings.whatsappChannel && ["Follow our WhatsApp channel", pretty(settings.whatsappChannel), settings.whatsappChannel, true],
      site && ["Website", pretty(site), site],
      settings.youtube && ["YouTube", pretty(settings.youtube), settings.youtube],
      settings.email && ["Email", settings.email, `mailto:${settings.email}`],
    ].filter(Boolean);
    const rows = [];
    items.forEach((it) => {
      const last = rows[rows.length - 1];
      if (!it[3] && last?.length === 1 && !last[0][3]) last.push(it);
      else rows.push([it]);
    });

    doc.setFont("DejaVu", "normal");
    doc.setFontSize(10);
    const msg = doc.splitTextToSize(settings.pdfMessage || "", CW - 14);
    const h = 16 + msg.length * 5 + rows.length * 11 + 4;
    ensure(h + 4);

    fill(C.primarySubtle);
    stroke(C.primary);
    doc.setLineWidth(0.4);
    doc.roundedRect(M, y, CW, h, 3, 3, "FD");
    fill(C.primary);
    doc.rect(M, y + 3, 1.6, h - 6, "F");

    font(13, "bold", C.primary);
    doc.text(title, M + 7, y + 9);
    font(10, "normal", C.text2);
    doc.text(msg, M + 7, y + 15);
    const ly = y + 17 + msg.length * 5;
    rows.forEach((row, r) =>
      row.forEach(([label, value, url, wide], c) => {
        const x = M + 7 + c * (CW / 2 - 2);
        const ry = ly + r * 11;
        font(7.5, "bold", C.text3);
        doc.text(label.toUpperCase(), x, ry);
        font(10, "bold", url ? C.primary : C.text);
        const v = doc.splitTextToSize(value, wide ? CW - 14 : CW / 2 - 12)[0];
        if (url) doc.textWithLink(v, x, ry + 5, { url });
        else doc.text(v, x, ry + 5);
      })
    );
    y += h + 8;
  };
  ad("Need help with your VU semester?");

  // ---- Answer review ----
  ensure(20);
  font(13, "bold");
  doc.text("Answer review", M, y);
  font(9, "normal", C.text3);
  doc.text("✓ correct answer   ✗ your incorrect choice", W - M, y, { align: "right" });
  y += 6;

  quiz.questions.forEach((q, qi) => {
    const chosen = answers[qi];
    const correct = chosen === q.answer;
    doc.setFont("DejaVu", "bold");
    doc.setFontSize(10.5);
    const qLines = doc.splitTextToSize(q.question, CW - 30);
    doc.setFont("DejaVu", "normal");
    doc.setFontSize(9.5);
    const optLines = q.options.map((o, oi) => doc.splitTextToSize(`${String.fromCharCode(65 + oi)}.  ${o}`, CW - 22));
    const blockH = 8 + qLines.length * 5 + optLines.reduce((n, l) => n + l.length * 4.6 + 2.2, 0) + 3;
    ensure(blockH + 3);

    stroke(C.border);
    doc.setLineWidth(0.25);
    doc.roundedRect(M, y, CW, blockH, 2.5, 2.5, "S");

    font(9, "bold", C.text3);
    doc.text(`Q${qi + 1}`, M + 5, y + 7);
    const status = chosen == null ? "Skipped" : correct ? "Correct" : "Incorrect";
    const sc = chosen == null ? C.text3 : correct ? C.success : C.danger;
    font(8.5, "bold", sc);
    doc.text(status, W - M - 5, y + 7, { align: "right" });

    font(10.5, "bold");
    doc.text(qLines, M + 15, y + 7);
    let oy = y + 9 + qLines.length * 5;
    q.options.forEach((_, oi) => {
      const isAnswer = oi === q.answer;
      const isWrongPick = oi === chosen && !correct;
      const lh = optLines[oi].length * 4.6;
      if (isAnswer || isWrongPick) {
        fill(isAnswer ? C.successSubtle : C.dangerSubtle);
        doc.roundedRect(M + 13, oy - 1, CW - 18, lh + 1.6, 1.5, 1.5, "F");
      }
      font(9.5, isAnswer ? "bold" : "normal", isAnswer ? C.success : isWrongPick ? C.danger : C.text2);
      doc.text(optLines[oi], M + 16, oy + 2.6);
      if (isAnswer || isWrongPick) doc.text(isAnswer ? "✓" : "✗", W - M - 8, oy + 2.6);
      oy += lh + 2.2;
    });
    y += blockH + 3;
  });

  y += 4;
  ad("Get your semester handled by VU Standard");

  // ---- Footer on every page ----
  const pages = doc.getNumberOfPages();
  for (let p = 1; p <= pages; p++) {
    doc.setPage(p);
    stroke(C.border);
    doc.setLineWidth(0.3);
    doc.line(M, H - 15, W - M, H - 15);
    font(8, "bold", C.text);
    doc.text(`${settings.brandName} · ${settings.ownerName}`, M, H - 10);
    font(8, "normal", C.text2);
    const contact = `WhatsApp ${settings.phone}`;
    doc.textWithLink(contact, M, H - 6, { url: wa });
    if (site) {
      font(8, "bold", C.primary);
      doc.textWithLink(pretty(site), M + doc.getTextWidth(`${contact}   `), H - 6, { url: site });
    }
    font(8, "normal", C.text3);
    doc.text(`Page ${p} of ${pages}`, W - M, H - 10, { align: "right" });
  }

  const safeName = (student.name || "Student").replace(/[^\w-]+/g, "_").slice(0, 40);
  doc.save(`VU-Standard_${quiz.code}_Quiz_Result_${safeName}.pdf`);
}
