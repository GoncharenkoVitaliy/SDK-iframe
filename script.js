"use strict"

// import AppExtensionsSDK from './node_modules/@pipedrive/app-extensions-sdk';

// const sdk = await new AppExtensionsSDK().initialize();
// console.log('sdk:', sdk);

// const { status } = await sdk.execute(AppExtensionsSDK.Command.OPEN_MODAL, {
// 	type: AppExtensionsSDK.Modal.CUSTOM_MODAL,
// 	action_id: 'Open settings',
// 	data: {
// 		item: 'xyz',
// 	},
// });

const form = document.querySelector('#form');
form.addEventListener('submit', formSend);

function formValidate(formRequest) {
	let validData = true;
	formRequest.forEach((element) => {
		formRemoveError(element);
		if (element.value === '') {
			formAddError(element);
			validData = false;
		}
	});
	return validData;
}

function formAddError(element) {
	element.setAttribute('required', '');
	element.classList.add('_error');
}

function formRemoveError(element) {
	element.removeAttribute('required');
	element.classList.remove('_error');
}

async function formSend(event) {
	event.preventDefault();

	const formRequest = document.querySelectorAll('._req');
	const validData = formValidate(formRequest);
	const objData = {};

	if (validData) {
		const input = form.querySelectorAll('.data');

		input.forEach((elem) => {
			objData[elem.name] = elem.value;
		});

		// window.parent.postMessage({ type: 'formData', data: objData }, '*');

		const buttonSubmit = document.querySelector('.create-job');
		buttonSubmit.textContent = 'Request is sent';
		buttonSubmit.style.background = 'red';

		saveData(objData);
	}
}

function saveData(objData) {
	const link = 'https://goncharenkovitaliy.github.io/iframe-pipedrive/`';
	console.log('objData:', objData);

	fetch(link, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			title: 'New deal',
			value: objData
		})
	})
		.then(response => {
			if (!response.ok) {
				throw new Error('The network response was incorrect');
			}
			console.log('response', response);
			return response.json();
		})
		.catch(error => console.error('Fetch error:', error));
}