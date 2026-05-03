/**
 * Lightweight SplitText utility (no paid GSAP plugin required).
 * Wraps each character or word in a <span> so GSAP can animate them individually.
 */

export type SplitMode = "chars" | "words" | "lines";

export interface SplitResult {
  chars: HTMLSpanElement[];
  words: HTMLSpanElement[];
  revert: () => void;
}

export function splitText(
  el: HTMLElement,
  mode: SplitMode = "chars"
): SplitResult {
  const original = el.innerHTML;
  const text = el.textContent ?? "";
  const words: HTMLSpanElement[] = [];
  const chars: HTMLSpanElement[] = [];

  el.innerHTML = "";

  const wordTokens = text.split(/(\s+)/); // keep whitespace
  wordTokens.forEach((token) => {
    if (/^\s+$/.test(token)) {
      el.appendChild(document.createTextNode(token));
      return;
    }
    const wordSpan = document.createElement("span");
    wordSpan.style.display = "inline-block";
    wordSpan.style.whiteSpace = "nowrap";
    wordSpan.className = "split-word";

    if (mode === "words") {
      wordSpan.textContent = token;
    } else {
      for (const ch of token) {
        const c = document.createElement("span");
        c.textContent = ch;
        c.style.display = "inline-block";
        c.className = "split-char";
        wordSpan.appendChild(c);
        chars.push(c);
      }
    }

    words.push(wordSpan);
    el.appendChild(wordSpan);
  });

  return {
    chars,
    words,
    revert: () => {
      el.innerHTML = original;
    },
  };
}
