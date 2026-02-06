const _invoice = {};

_invoice.setupTooltips = () => {
	_invoice.setupServiceNumberTooltip();
	_invoice.setupTaxNameTooltip();
	_invoice.setupEmailTooltip();	
};

_invoice.setupImages = () => {	
	_invoice.setupInvoiceReferenceImage();	
};

_invoice.setupServiceNumberTooltip = () => {
	const icon = document.getElementById("serviceNumberTooltipIcon");
	if (!icon) return;
	const token = 'invoiceFormFieldServiceTooltip';
	const text = window.lang.translate(token);
	const finalText = (text && text !== '?' && text !== token) ? text : icon.getAttribute('data-tooltip-fallback');
	icon.setAttribute("data-tooltip", finalText);
	icon.setAttribute("aria-label", "?");
	icon.setAttribute("title", "?");
};

_invoice.setupTaxNameTooltip = () => {
	const icon = document.getElementById("taxNameTooltipIcon");
	if (!icon) return;
	const token = 'invoiceFormFieldTaxNameTooltip';
	const text = window.lang.translate(token);
	const finalText = (text && text !== '?' && text !== token) ? text : icon.getAttribute('data-tooltip-fallback');
	icon.setAttribute("data-tooltip", finalText);
	icon.setAttribute("aria-label", "?");
	icon.setAttribute("title", "?");
};

_invoice.setupEmailTooltip = () => {
	const icon = document.getElementById("emailTooltipIcon");
	if (!icon) return;
	const token = 'invoiceFormFieldEmailTooltip';
	const text = window.lang.translate(token);
	const finalText = (text && text !== '?' && text !== token) ? text : icon.getAttribute('data-tooltip-fallback');
	icon.setAttribute("data-tooltip", finalText);
	icon.setAttribute("aria-label", "?");
	icon.setAttribute("title", "?");
};

_invoice.setupInvoiceReferenceImage = () => {
	document.getElementById("invoiceReferenceImage").innerHTML = '';	
	setTimeout(()=>{
		const fallbackSrc = "./assets/images/invoice/invoice-references-es.jpg";
		const fallbackAlt = "Referencia de boleto y reservación";
		const src = window.lang.translate('invoiceAboutImage');
		const alt = window.lang.translate('invoiceAboutImageDesc');
		const finalSrc = (src && src !== '?' && src !== 'invoiceAboutImage') ? src : fallbackSrc;
		const finalAlt = (alt && alt !== '?' && alt !== 'invoiceAboutImageDesc') ? alt : fallbackAlt;
		document.getElementById("invoiceReferenceImage").innerHTML = `
		<img class="img-fluid"
			src="${finalSrc}"  
			alt="${finalAlt}"
		>`;
	}, 1000);	
};

_invoice.setupConfirmEmailInput = () => {	
	const confirmEmailInput = document.getElementById('confirmEmailInput');
 	confirmEmailInput.onpaste = e => e.preventDefault();
};


_invoice.validateForm = () => {
	return $("#invoiceform").valid();	
};

_invoice.validateEmail = () => {
	var email = document.getElementById('emailInput').value;
	var confirmEmail = document.getElementById('confirmEmailInput').value;
	var valid = email.trim() === confirmEmail.trim();
	return valid;
};

_invoice.clearData = () => {	
	document.getElementById('serviceNumberInput').value = '';
	document.getElementById('rfcInput').value = '';
	document.getElementById('nameInput').value = '';
	document.getElementById('zipCodeInput').value = '';
	document.getElementById('taxRegimeInput').value = '';
	document.getElementById('paymentTypeInput').value = '';
	document.getElementById('emailInput').value = '';
};

_invoice.clearAlerts = () => {	
	$("#successAlert").hide("slow");
	$("#errorAlert").hide("slow");
	document.getElementById('errorMessageLabel').innerHTML = "";								
};

_invoice.showSuccessAlert = (serviceNumber, invoice) => {	
	$("#successAlert").show("slow");
	_invoice.showDownloadInvoiceButtons(serviceNumber, invoice);
	var element = document.getElementById('successAlert');
	var headerOffset = 100;
	var elementPosition = element.getBoundingClientRect().top;
	var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
	window.scrollTo({
		top: offsetPosition,
		behavior: "smooth"
	});
};

_invoice.showDownloadInvoiceButtons = (serviceNumber, invoice) => {	
	// Clean invoice download buttons
	var downloadInvoiceButtonsContainer = document.getElementById('downloadInvoiceButtonsContainer');
	downloadInvoiceButtonsContainer.innerHTML = '';
	const pdfIcon = `
		<svg class="app-download-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
			<path d="M6 2h7l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm7 1.5V8h4.5L13 3.5zM7 14h10v2H7v-2zm0 4h10v2H7v-2zm0-8h6v2H7v-2z"/>
		</svg>`;
	const xmlIcon = `
		<svg class="app-download-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
			<path d="M4 6h16v2H4V6zm0 4h16v2H4v-2zm0 4h10v2H4v-2zm12.5 0l3.5 3.5L16.5 21v-7z"/>
		</svg>`;
	// Add break
	var breakElement = document.createElement('br');
	downloadInvoiceButtonsContainer.appendChild(breakElement);
	// Add PDF download  button	
	var pdfLinkElement = document.createElement("a");
	pdfLinkElement.className = 'app-p-link';
	pdfLinkElement.rel = 'noopener';
	pdfLinkElement.target = '_blank';
  pdfLinkElement.href = "data:application/pdf;base64," + invoice.invoicePDF;
  pdfLinkElement.download = `Ecofy-${window.lang.translate('invoiceInvoiceDownloadFileText')}-${serviceNumber}.pdf`;
	pdfLinkElement.innerHTML = `
		<div>
			<b>
				-
				${window.lang.translate('invoiceInvoiceDownloadButtonText')} PDF
				(${serviceNumber})
				${pdfIcon}
			</b>
		</div>`;
	downloadInvoiceButtonsContainer.appendChild(pdfLinkElement);
	// Add XML download  button	
	var pdfLinkElement = document.createElement("a");
	pdfLinkElement.className = 'app-p-link';
	pdfLinkElement.rel = 'noopener';
	pdfLinkElement.target = '_blank';
  pdfLinkElement.href = "data:application/pdf;base64," + invoice.invoiceXML;
  pdfLinkElement.download = `Ecofy-${window.lang.translate('invoiceInvoiceDownloadFileText')}-${serviceNumber}.xml`;
	pdfLinkElement.innerHTML = `
		<div>
			<b>
				-
				${window.lang.translate('invoiceInvoiceDownloadButtonText')} XML
				(${serviceNumber})
				${xmlIcon}
			</b>
		</div>`;
	downloadInvoiceButtonsContainer.appendChild(pdfLinkElement);
};

_invoice.showErrorAlert = () => {	
	$("#errorAlert").show("slow");
	var element = document.getElementById('errorAlert');
	var headerOffset = 100;
	var elementPosition = element.getBoundingClientRect().top;
	var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
	window.scrollTo({
		top: offsetPosition,
		behavior: "smooth"
	});
};

_invoice.showLoadingButton = () => {
	var element = document.getElementById('invoiceButton');
	element.innerHTML = '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>&nbsp;Loading...';
	element.setAttribute("disabled", "");
}

_invoice.hideLoadingButton = () => {
	var element = document.getElementById('invoiceButton');
	element.innerHTML = 'Facturar';
	element.removeAttribute("disabled");
}

_invoice.invoice = () => {		
	_invoice.showLoadingButton();
	_invoice.clearAlerts();
	
	if (_invoice.validateForm()) {
		
		if (!_invoice.validateEmail()) { 
			document.getElementById('errorMessageLabel').innerHTML = window.lang.translate('invoiceFormFieldConfirmEmailError');				
			_invoice.showErrorAlert();	
			_invoice.hideLoadingButton();
			return;
		}
		
		const serviceNumber = document.getElementById('serviceNumberInput').value;
		const rfc = document.getElementById('rfcInput').value;
		const name = document.getElementById('nameInput').value;
		const zipCode = document.getElementById('zipCodeInput').value;
		const taxRegime = document.getElementById('taxRegimeInput').value;
		const paymentType = document.getElementById('paymentTypeInput').value;
		const email = document.getElementById('emailInput').value;

		console.log("invoice", serviceNumber, rfc, name, zipCode, taxRegime, paymentType, email);	
						
		var requestBody = {
			orderId: serviceNumber,
			rfc: rfc,
			name: name,
			zipCode: zipCode,
			fiscalRegime: taxRegime,
			paymentTypeId: paymentType,
			email: email
		}
			
		fetch('https://api.ecofy.taxi/airportServiceEjecMty/v1/facturama/cfdi', {
			headers: { "Content-Type": "application/json; charset=utf-8" },
			method: 'POST',
			body: JSON.stringify(requestBody)
		}).then(response => response.json()).then(data => {
			if (data.responseCode === 'OK') {
				_invoice.showSuccessAlert(serviceNumber, data.responseObject);
				_invoice.clearData();				
			} else {				
				document.getElementById('errorMessageLabel').innerHTML = data.responseMessage;				
				_invoice.showErrorAlert();					
			}
			_invoice.hideLoadingButton();
		});
				
	} else {
		_invoice.hideLoadingButton();
	}
};

_invoice.onInvoiceClick = () => {
	_invoice.invoice();	
};

document.addEventListener('translate', (e) => { 	
	_invoice.setupTooltips();		
	_invoice.setupImages();		
}, false);

$(document).ready(function() {
	_invoice.setupTooltips();		
	_invoice.setupImages();		
	_invoice.setupConfirmEmailInput();
});
