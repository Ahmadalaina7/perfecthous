/* Statische momentopname: de site is echt, maar er is geen server.
   - Na hydratie zet next/image de optimizer-URL terug; die bestaat statisch
     niet, dus we zetten hem meteen weer op het originele bestand.
   - Navigatie gaat met een volledige pagina-lading: de RSC-payload bestaat
     niet, dus de router van Next kan geen pagina's inladen.
   - Formulieren kunnen niets versturen; dat zeggen we eerlijk. */
(function () {
  function plain(value) {
    var prefix = "/_next/image?url=";
    var text = value || "";
    if (text.indexOf(prefix) !== 0) return null;
    var encoded = text.slice(prefix.length).split("&")[0];
    try {
      return decodeURIComponent(encoded);
    } catch (error) {
      return null;
    }
  }

  function fixImage(image) {
    if (image.getAttribute("srcset")) image.removeAttribute("srcset");
    var fixed = plain(image.getAttribute("src"));
    if (fixed) image.setAttribute("src", fixed);
  }

  function fixWithin(node) {
    if (node.nodeType !== 1) return;
    if (node.tagName === "IMG") fixImage(node);
    if (node.querySelectorAll) {
      Array.prototype.forEach.call(node.querySelectorAll("img"), fixImage);
    }
  }

  function fixAll() {
    Array.prototype.forEach.call(document.images, fixImage);
  }
  document.addEventListener(
    "error",
    function (event) {
      if (event.target && event.target.tagName === "IMG") fixImage(event.target);
    },
    true
  );
  fixAll();
  window.addEventListener("load", fixAll);
  new MutationObserver(function (records) {
    for (var i = 0; i < records.length; i += 1) {
      var record = records[i];
      if (record.type === "attributes") fixWithin(record.target);
      else for (var j = 0; j < record.addedNodes.length; j += 1) fixWithin(record.addedNodes[j]);
    }
  }).observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["src", "srcset"],
  });

  document.addEventListener(
    "click",
    function (event) {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      var link = event.target.closest ? event.target.closest("a[href]") : null;
      if (!link || (link.target && link.target !== "_self") || link.hasAttribute("download")) return;
      var href = link.getAttribute("href");
      if (!href || href.charAt(0) === "#") return;
      var url;
      try {
        url = new URL(link.href, location.href);
      } catch (error) {
        return;
      }
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname && url.search === location.search) return;
      event.preventDefault();
      event.stopPropagation();
      location.assign(url.href);
    },
    true
  );

  var message =
    "Dit is een voorbeeldversie van de site: het formulier verstuurt niets. Bel of stuur WhatsApp voor een offerte.";
  function banner() {
    var bar = document.createElement("div");
    bar.setAttribute("role", "status");
    bar.textContent = message;
    bar.style.cssText =
      "position:fixed;inset-inline:0;bottom:0;z-index:9999;background:#1a1d21;color:#f6f4f0;" +
      "font:500 13px/1.5 system-ui,sans-serif;padding:10px 16px;text-align:center;";
    var close = document.createElement("button");
    close.textContent = "×";
    close.setAttribute("aria-label", "Melding sluiten");
    close.style.cssText =
      "position:absolute;inset-inline-end:8px;top:50%;transform:translateY(-50%);background:none;" +
      "border:0;color:inherit;font-size:20px;line-height:1;cursor:pointer;padding:4px 8px;";
    close.onclick = function () { bar.remove(); };
    bar.appendChild(close);
    document.body.appendChild(bar);
  }
  document.addEventListener(
    "submit",
    function (event) {
      event.preventDefault();
      event.stopPropagation();
      banner();
    },
    true
  );
})();
