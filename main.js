/* global Lang, _header */
(function () {
	if (typeof Lang === "undefined") {
		console.error("Lang no está disponible. Revisa que jquery-lang.js esté cargado.");
		return;
	}

	window.lang = new Lang("es");
	window.lang.dynamic("es", "/assets/translations/es.json");
	window.lang.dynamic("en", "/assets/translations/en.json");
	console.log("Lang inicializado");

	// Expose header actions under a single app namespace
	window._app = window._app || {};
	window._app.header = _header;

	// Initialize language label on first load
	var initialLang = window.lang.currentLang || "es";
	var label = document.getElementById("languageLabel");
	if (label) {
		label.innerHTML = initialLang.toUpperCase();
	}
	// Preload language packs to avoid missing translations
	Promise.all([
		fetch("/assets/translations/es.json").then((res) => res.json()),
		fetch("/assets/translations/en.json").then((res) => res.json())
	])
		.then(([esPack, enPack]) => {
			window.lang.pack = window.lang.pack || {};
			window.lang.pack.es = esPack;
			window.lang.pack.en = enPack;
			// Re-apply current language after packs load
			window.lang.change(window.lang.currentLang || "es");
			console.log("Packs de idioma cargados");
		})
		.catch((err) => {
			console.error("Error cargando packs de idioma:", err);
		});
})();
