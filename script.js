"use strict"

// import AppExtensionsSDK from './node_modules/@pipedrive/app-extensions-sdk';

// const sdk = await new AppExtensionsSDK().initialize();
// // console.log('sdk:', sdk);

// const { status } = await sdk.execute(AppExtensionsSDK.Command.OPEN_MODAL, {
// 	type: AppExtensionsSDK.Modal.CUSTOM_MODAL,
// 	action_id: 'Open settings',
// 	data: {
// 		item: 'xyz',
// 	},
// });
// // console.log('status:', status);

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

function formSend(event) {
	event.preventDefault();

	const formRequest = document.querySelectorAll('._req');
	const validData = formValidate(formRequest);
	const objData = {};

	if (validData) {
		const input = form.querySelectorAll('.data');

		input.forEach((elem) => {
			objData[elem.name] = elem.value;
		});

		const buttonSubmit = document.querySelector('.create-job');
		buttonSubmit.textContent = 'Request is sent';
		buttonSubmit.style.background = 'red';

		saveData(objData);
	}
}

async function saveData(objData) {
	try {
		const response = await fetch('https://api.pipedrive.com/v1/deals', {
			 method: 'POST',
			 headers: {
				  'Content-Type': 'application/json',
				  Authorization: `Bearer ${'bed5a485c9d152488ae0c9cc8adfac328142e0d3'}`
			 },
			 body: JSON.stringify(objData)
		});

		if (response.ok) {
			 const result = await response.json();
			 console.log('Deal created:', result);
		} else {
			 console.error('Error creating deal:', response.statusText);
		}
  } catch (error) {
		console.error('Error sending data:', error.message);
  }
}