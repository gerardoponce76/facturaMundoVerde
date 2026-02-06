const _header = {};

_header.onLanguageClick = (language) => {
	_header.translate(language);
	const event = new Event('translate');	
	document.dispatchEvent(event);
};

_header.translate = (language) => {
	document.getElementById('languageLabel').innerHTML = language.toUpperCase();
	if (!window.lang) {
		return;
	}
	const packLoaded = window.lang.pack && window.lang.pack[language];
	const dynamicPath = window.lang._dynamic && window.lang._dynamic[language];
	const packPath = dynamicPath || `/assets/translations/${language}.json`;

	const applyLanguage = () => {
		try {
			window.lang.change(language);
		} catch (err) {
			console.error("Error al cambiar idioma:", err);
		}
		setTimeout(_header.textRotatorsSetup, 1000);
	};

	if (packLoaded) {
		applyLanguage();
		return;
	}

	fetch(packPath)
		.then((res) => res.json())
		.then((data) => {
			window.lang.pack = window.lang.pack || {};
			window.lang.pack[language] = data;
			applyLanguage();
		})
		.catch((err) => {
			console.error("No se pudo cargar el paquete de idioma:", err);
		});
};

_header.textRotatorsSetup = () => {
	const textRotators = document.getElementsByName("textRotator");
	textRotators.forEach((textRotator) => { 
		textRotator.classList.add("text-rotator");
		INSPIRO.elements.morphext();
	});	
};
