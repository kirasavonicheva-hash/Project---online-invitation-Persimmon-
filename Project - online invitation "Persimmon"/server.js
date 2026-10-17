// Мини-сервер без зависимостей: раздаёт сайт и принимает загрузки (музыка, фото).
// Запуск:  node server.js   →  http://localhost:3000
const http = require("http"), fs = require("fs"), path = require("path"), crypto = require("crypto");
const PORT = process.env.PORT || 3000;
const ROOT = __dirname, UP = path.join(ROOT, "uploads");
fs.mkdirSync(UP, { recursive: true });

const MIME = { ".html":"text/html; charset=utf-8", ".css":"text/css", ".js":"text/javascript", ".png":"image/png", ".jpg":"image/jpeg", ".jpeg":"image/jpeg", ".gif":"image/gif", ".webp":"image/webp", ".svg":"image/svg+xml", ".mp3":"audio/mpeg", ".m4a":"audio/mp4", ".ogg":"audio/ogg", ".wav":"audio/wav", ".webm":"audio/webm" };
const UPLOAD_EXT = new Set([".mp3",".m4a",".ogg",".wav",".webm",".jpg",".jpeg",".png",".gif",".webp"]);
const MAX = 25 * 1024 * 1024;

function serve(req, res, file) {
  fs.stat(file, (err, st) => {
    if (err || !st.isFile()) { res.writeHead(404); return res.end("Not found"); }
    const type = MIME[path.extname(file).toLowerCase()] || "application/octet-stream";
    const range = req.headers.range;   // нужен для аудио в Safari
    if (range) {
      const m = /bytes=(\d*)-(\d*)/.exec(range) || [];
      const start = m[1] ? parseInt(m[1]) : 0, end = m[2] ? parseInt(m[2]) : st.size - 1;
      res.writeHead(206, { "Content-Type": type, "Accept-Ranges": "bytes", "Content-Range": `bytes ${start}-${end}/${st.size}`, "Content-Length": end - start + 1 });
      return fs.createReadStream(file, { start, end }).pipe(res);
    }
    res.writeHead(200, { "Content-Type": type, "Content-Length": st.size, "Accept-Ranges": "bytes" });
    fs.createReadStream(file).pipe(res);
  });
}

http.createServer((req, res) => {
  const url = new URL(req.url, "http://x");
  if (req.method === "POST" && url.pathname === "/upload") {
    const ext = path.extname(url.searchParams.get("name") || "").toLowerCase();
    if (!UPLOAD_EXT.has(ext)) { res.writeHead(400); return res.end("bad type"); }
    const name = crypto.randomBytes(9).toString("hex") + ext;
    const out = fs.createWriteStream(path.join(UP, name));
    let size = 0, dead = false;
    req.on("data", ch => { size += ch.length; if (size > MAX && !dead) { dead = true; out.destroy(); fs.unlink(path.join(UP, name), () => {}); res.writeHead(413); res.end("too big"); req.destroy(); } });
    req.pipe(out);
    out.on("finish", () => { if (dead) return; res.writeHead(200, { "Content-Type": "application/json" }); res.end(JSON.stringify({ url: "/uploads/" + name })); });
    return;
  }
  if (req.method !== "GET" && req.method !== "HEAD") { res.writeHead(405); return res.end(); }
  let p = decodeURIComponent(url.pathname);
  if (p === "/") p = "/index.html";
  const file = path.normalize(path.join(ROOT, p));
  const base = path.basename(file);
  if (!file.startsWith(ROOT + path.sep) || base.startsWith(".") || base === "server.js") { res.writeHead(403); return res.end("Forbidden"); }
  serve(req, res, file);
}).listen(PORT, () => console.log("Сайт: http://localhost:" + PORT));
