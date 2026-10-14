const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

// Lädt die ausgelieferte app/app.js; nur fetch und window werden gefaked.
function context(fetch) {
  const c = vm.createContext({ URL, fetch, window: { location: { pathname: "/app/" } } });
  vm.runInContext(fs.readFileSync(path.join(__dirname, "../app/app.js"), "utf8"), c);
  return c;
}

test("Abbruchsignal erreicht fetch im Direkt- und im Proxymodus", async () => {
  const signal = new AbortController().signal;
  for (const proxyAktiv of ["nein", "ja"]) {
    let optionen;
    const c = context(async (_url, opts) => {
      optionen = opts;
      return { ok: true, text: async () => "{}", json: async () => ({ content: "{}" }) };
    });
    await c.fetchOdasJson("https://first.example/data", { proxyAktiv }, { signal });
    assert.equal(optionen && optionen.signal, signal, proxyAktiv);
  }
});

test("Ein abgebrochener Direktabruf bleibt ein AbortError", async () => {
  const c = context(async () => { throw Object.assign(new Error("aborted"), { name: "AbortError" }); });
  await assert.rejects(c.fetchOdasJson("https://first.example/data", {}, { signal: new AbortController().signal }), { name: "AbortError" });
});

test("Ohne Signal verhalten sich die Helfer wie bisher", async () => {
  const c = context(async () => ({ ok: true, text: async () => '{"a":1}' }));
  assert.deepEqual({ ...(await c.fetchOdasJson("https://first.example/data", {})) }, { a: 1 });
  await assert.rejects(c.fetchOdasJson("", {}), /Keine Datenquelle konfiguriert/);
});
