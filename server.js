/**
 * Startbestand voor productie: Plesk (Phusion Passenger), PM2 of `node server.js`.
 *
 * Plesk's Node.js-toolkit start dit bestand en geeft de luisterplek mee in
 * `PORT`: een nummer, of het pad van een unix-socket. Daarom geven we `PORT`
 * ongewijzigd door aan `server.listen()` in plaats van er zelf een nummer van
 * te maken — van een socket-pad een nummer maken luistert naar niets.
 *
 * Next start hiermee precies zoals `next start` dat doet (zelfde build in
 * `.next`), alleen onder een eigen procesnaam die Plesk kan beheren.
 */
const http = require("node:http");
const next = require("next");

const app = next({ dev: false, dir: __dirname });
const handle = app.getRequestHandler();

const raw = process.env.PORT;
const target = raw && Number.isNaN(Number(raw)) ? raw : Number(raw) || 3000;

app.prepare().then(() => {
  http
    .createServer((req, res) => {
      handle(req, res).catch((error) => {
        console.error(error);
        if (!res.headersSent) res.statusCode = 500;
        res.end("Er ging iets mis.");
      });
    })
    .listen(target, () => {
      console.log(`Perfecthous luistert op ${typeof target === "string" ? target : `poort ${target}`}`);
    });
});

process.on("SIGTERM", () => process.exit(0));
