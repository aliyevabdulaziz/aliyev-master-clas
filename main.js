function openModal() {
	document.getElementById('myModal').style.display = 'flex';
	document.querySelector('body').style.overflow = 'hidden';
	clearErrors();
}

function closeModal() {
	document.querySelector('body').style.overflow = 'auto';
	document.getElementById('myModal').style.display = 'none';
	clearErrors();
}

window.onclick = function (event) {
	let modal = document.getElementById('myModal');
	if (event.target == modal) {
		modal.style.display = 'none';
		document.querySelector('body').style.overflow = 'scroll';

		clearErrors();
	}
};

function validateForm() {
	let name = document.getElementById('ism');
	let phone = document.getElementById('telefon');
	let nameError = document.getElementById('nameError');
	let phoneError = document.getElementById('phoneError');
	let formAlert = document.getElementById('formAlert');

	let valid = true;

	if (name.value.trim() === '') {
		name.classList.add('error');
		nameError.style.display = 'block';
		valid = false;
	} else {
		name.classList.remove('error');
		nameError.style.display = 'none';
	}

	if (phone.value.trim() === '') {
		phone.classList.add('error');
		phoneError.style.display = 'block';
		valid = false;
	} else {
		phone.classList.remove('error');
		phoneError.style.display = 'none';
	}

	if (!valid) {
		formAlert.style.display = 'block';
	} else {
		formAlert.style.display = 'none';
    window.open('davom-etish.html', '_blank');
		closeModal();
	}
}

function clearErrors() {
	document.getElementById('ism').classList.remove('error');
	document.getElementById('telefon').classList.remove('error');
	document.getElementById('nameError').style.display = 'none';
	document.getElementById('phoneError').style.display = 'none';
	document.getElementById('formAlert').style.display = 'none';
}

function doPost(e) {
	var sheet = SpreadsheetApp.getActiveSheet();
	var data = JSON.parse(e.postData.contents);

	sheet.appendRow([data.ism, data.telefon]);

	return ContentService.createTextOutput('Success').setMimeType(ContentService.MimeType.TEXT);
}

const phone = document.getElementById('telefon');
const form = document.getElementById('registration-form');

// Formatlash
phone.addEventListener('input', () => {
	let val = phone.value.replace(/\D/g, '').slice(0, 9);
	if (val.length > 4) phone.value = val.replace(/(\d{2})(\d{3})(\d+)/, '$1-$2-$3');
	else if (val.length > 2) phone.value = val.replace(/(\d{2})(\d+)/, '$1-$2');
	else phone.value = val;
});

// To‘liq raqam tekshiruvi
form.addEventListener('submit', e => {
	if (!/^\d{2}-\d{3}-\d{4}$/.test(phone.value)) {
		e.preventDefault();
		alert('Telefon raqamini to‘liq kiriting: 99-999-9999');
	}
});
