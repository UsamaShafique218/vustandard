// Tiny syntax highlighter for assignment solutions (no dependencies).
// Returns lines of [tokenType, text] pairs; React escapes the text when rendering.

const words = (s) => new Set(s.split(/\s+/));

const C_KW = "auto break case char const continue default do double else enum extern float for goto if int long register return short signed sizeof static struct switch typedef union unsigned void volatile while NULL";
const CPP_KW = `${C_KW} bool catch class delete false friend inline namespace new nullptr operator private protected public template this throw true try typename using virtual string cout cin endl std vector`;
const JAVA_KW = "abstract boolean break byte case catch char class continue default do double else enum extends final finally float for if implements import instanceof int interface long new null package private protected public return short static super switch this throw throws true false try void while String System";
const CS_KW = "abstract bool break byte case catch char class const continue decimal default do double else enum false finally float for foreach if in int interface internal long namespace new null object out override private protected public readonly ref return static string struct switch this throw true try using var virtual void while Console";
const PY_KW = "and as assert break class continue def del elif else except False finally for from global if import in is lambda None not or pass print raise return True try while with yield self range len input int float str list dict";
const JS_KW = "async await break case catch class const continue default delete do else export extends false finally for function if import in instanceof let new null return super switch this throw true try typeof undefined var void while console document window";
const PHP_KW = "abstract and array as break case catch class const continue default do echo else elseif empty endif endforeach endwhile extends false for foreach function global if include isset new null or private protected public require require_once return static switch this true try unset use var while";
const SQL_KW = "add all alter and as asc between by check column constraint create database default delete desc distinct drop exists foreign from group having in index inner insert into is join key left like limit not null on or order outer primary references right select set table top union unique update values view where int integer varchar char text date decimal float count sum avg min max";
const ASM_KW = "mov add sub mul div inc dec cmp jmp je jne jz jnz jg jl jge jle call ret push pop int loop and or xor not shl shr lea nop hlt org db dw dd ax bx cx dx si di sp bp al ah bl bh cl ch dl dh cs ds es ss";

const STR = String.raw`"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'`;
const NUM = String.raw`\b(?:0x[\da-fA-F]+|\d+(?:\.\d+)?[fFlLuU]?)\b`;
const SLASH_COM = String.raw`\/\/[^\n]*|\/\*[\s\S]*?\*\/`;

const langs = {
  c: { com: SLASH_COM, pre: true, kw: words(C_KW) },
  cpp: { com: SLASH_COM, pre: true, kw: words(CPP_KW) },
  java: { com: SLASH_COM, kw: words(JAVA_KW) },
  csharp: { com: SLASH_COM, kw: words(CS_KW) },
  javascript: { com: SLASH_COM, str: `${STR}|\`(?:\\\\.|[^\`\\\\])*\``, kw: words(JS_KW) },
  php: { com: `${SLASH_COM}|#[^\\n]*`, kw: words(PHP_KW), vars: true },
  python: { com: "#[^\\n]*", str: `"""[\\s\\S]*?"""|'''[\\s\\S]*?'''|${STR}`, kw: words(PY_KW) },
  sql: { com: String.raw`--[^\n]*|\/\*[\s\S]*?\*\/`, kw: words(SQL_KW), caseless: true },
  assembly: { com: ";[^\\n]*", kw: words(ASM_KW), caseless: true },
  html: { com: "<!--[\\s\\S]*?-->", tags: true },
  css: { com: String.raw`\/\*[\s\S]*?\*\/`, kw: new Set() },
};

const cache = new Map();
const patternFor = (lang) => {
  if (cache.has(lang)) return cache.get(lang);
  const l = langs[lang];
  const parts = [`(?<com>${l.com})`, `(?<str>${l.str || STR})`];
  if (l.pre) parts.push(String.raw`(?<pre>^[ \t]*#[^\n]*)`);
  if (l.tags) parts.push(String.raw`(?<kw><\/?[A-Za-z][\w-]*|\/?>)`);
  if (l.vars) parts.push(String.raw`(?<type>\$\w+)`);
  parts.push(`(?<num>${NUM})`, String.raw`(?<word>[A-Za-z_]\w*)`);
  const re = new RegExp(parts.join("|"), "gm");
  cache.set(lang, re);
  return re;
};

function tokenize(code, lang) {
  const l = langs[lang];
  if (!l) return [["", code]];
  const out = [];
  let last = 0;
  for (const m of code.matchAll(patternFor(lang))) {
    if (m.index > last) out.push(["", code.slice(last, m.index)]);
    const g = m.groups;
    let type = Object.keys(g).find((k) => g[k] !== undefined);
    if (type === "word") {
      const w = l.caseless ? m[0].toLowerCase() : m[0];
      if (l.kw?.has(w)) type = "kw";
      else if (!l.tags && /^\s*\(/.test(code.slice(m.index + m[0].length, m.index + m[0].length + 3))) type = "fn";
      else type = "";
    }
    out.push([type, m[0]]);
    last = m.index + m[0].length;
  }
  if (last < code.length) out.push(["", code.slice(last)]);
  return out;
}

/** Splits highlighted tokens into lines (multi-line comments/strings are split too). */
export function highlightLines(code, lang) {
  const lines = [[]];
  for (const [type, text] of tokenize(code.replace(/\r\n?/g, "\n").trimEnd(), lang)) {
    text.split("\n").forEach((part, i) => {
      if (i > 0) lines.push([]);
      if (part) lines[lines.length - 1].push([type, part]);
    });
  }
  return lines;
}
