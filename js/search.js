// search.js - site search on every page. It runs in the browser only (no server needed).
// It looks through the list below. If you add a page or product, add a line to INDEX.
(function () {
  var INDEX = [
    { title: "Home", url: "index.html", type: "Page", text: "home TEESKOLAR t-shirt shop wearing a brighter future" },
    { title: "Products For Sale", url: "index.html#shop", type: "Section", text: "shop products t-shirts tees buy order all 3 tees" },
    { title: "About Brand", url: "index.html#about", type: "Section", text: "about brand story start-up Quezon City students young professionals" },
    { title: "Don't Be Late Tee", url: "dont-be-late-tee.html", type: "T-shirt", text: "dont don't late deadline time tee t-shirt shirt azure 499 php peso price sizes S M L XL 2XL order" },
    { title: "Everyday Comfort Tee", url: "everyday-comfort-tee.html", type: "T-shirt", text: "everyday comfort comfy tee t-shirt shirt white 499 php peso price sizes S M L XL 2XL order" },
    { title: "Do Good Work Tee", url: "do-good-work-tee.html", type: "T-shirt", text: "do good work goals tee t-shirt shirt yellow 499 php peso price sizes S M L XL 2XL order" },
    { title: "Contact Us", url: "contact.html", type: "Page", text: "contact inquiry question feedback message form email hello address store Katipunan UP Diliman map follow social facebook instagram x" },
    { title: "Privacy Policy", url: "privacy.html", type: "Page", text: "privacy policy data personal information cookies security rights children store" },
    { title: "Terms and Conditions", url: "terms.html", type: "Page", text: "terms conditions service orders payment gcash bank transfer cod shipping delivery returns exchange refund prices liability" }
  ];

  // Every word typed must appear in an item. Title matches rank first.
  function search(query) {
    var words = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (!words.length) { return []; }
    return INDEX.map(function (item) {
      var title = item.title.toLowerCase();
      var all = title + " " + item.text.toLowerCase();
      var found = words.every(function (w) { return all.indexOf(w) !== -1; });
      if (!found) { return null; }
      var score = words.reduce(function (s, w) { return s + (title.indexOf(w) !== -1 ? 2 : 1); }, 0);
      return { item: item, score: score };
    }).filter(Boolean).sort(function (a, b) { return b.score - a.score; }).map(function (r) { return r.item; });
  }
  window.teeskolarSearch = search;

  var toggle = document.getElementById("search-toggle");
  var panel = document.getElementById("search-panel");
  var form = document.getElementById("search-form");
  var input = document.getElementById("site-search");
  var results = document.getElementById("search-results");
  if (!toggle || !panel || !form || !input || !results) { return; }

  function showMessage(text) {
    results.textContent = "";
    var p = document.createElement("p");
    p.className = "search-msg";
    p.textContent = text;
    results.appendChild(p);
  }

  function render() {
    var q = input.value.trim();
    if (!q) { showMessage("Type a word to search, like \u201Ctee\u201D or \u201Cshipping\u201D."); return; }
    var found = search(q);
    if (!found.length) { showMessage("No results for \u201C" + q + "\u201D. Try \u201Ctee\u201D, \u201Cshipping\u201D or \u201Ccontact\u201D."); return; }
    results.textContent = "";
    var ul = document.createElement("ul");
    ul.className = "list-unstyled mb-0";
    found.slice(0, 6).forEach(function (item) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = item.url;
      a.textContent = item.title;
      var type = document.createElement("span");
      type.className = "search-type";
      type.textContent = item.type;
      a.appendChild(type);
      li.appendChild(a);
      ul.appendChild(li);
    });
    results.appendChild(ul);
  }

  function openPanel() {
    panel.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
    input.focus();
  }
  function closePanel() {
    panel.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", function () { if (panel.hidden) { openPanel(); } else { closePanel(); } });
  form.addEventListener("submit", function (event) { event.preventDefault(); render(); });
  input.addEventListener("input", render);
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !panel.hidden) { closePanel(); toggle.focus(); }
  });
  document.addEventListener("click", function (event) {
    if (!panel.hidden && !event.target.closest(".nav-search")) { closePanel(); }
  });
})();
