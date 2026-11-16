import { test } from "node:test";
import assert from "node:assert/strict";
import { parseHeadline } from "../src/utils/headline";

test("splits lines on <br> and keeps the accent emphasis", () => {
  const lines = parseHeadline('Seus cachos merecem<br>todo esse <em class="accent">cuidado</em>.');
  assert.equal(lines.length, 2);
  assert.deepEqual(lines[0], [{ text: "Seus cachos merecem" }]);
  assert.deepEqual(lines[1], [
    { text: "todo esse" + " " },
    { text: "cuidado", em: true, className: "accent" },
    { text: "." },
  ]);
});

test("drops any other markup instead of rendering it", () => {
  const lines = parseHeadline('Olá <img src=x onerror="alert(1)"><script>alert(2)</script>mundo');
  const text = lines.flat().map((part) => part.text).join("");
  assert.equal(text.includes("<"), false);
  assert.equal(lines.flat().some((part) => part.em), false);
});

test("decodes basic entities and ignores empty lines", () => {
  const lines = parseHeadline("Cachos &amp; ondas<br><br>  ");
  assert.equal(lines.length, 1);
  assert.equal(lines[0][0].text, "Cachos & ondas");
});
