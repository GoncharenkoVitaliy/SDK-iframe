"use strict"

import AppExtensionsSDK from './node_modules/@pipedrive/app-extensions-sdk';

const sdk = await new AppExtensionsSDK().initialize();
// console.log('sdk:', sdk);

const { status } = await sdk.execute(AppExtensionsSDK.Command.OPEN_MODAL, {
	type: AppExtensionsSDK.Modal.CUSTOM_MODAL,
	action_id: 'Open settings',
	data: {
		item: 'xyz',
	},
});
// console.log('status:', status);

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
	// Pipedrive API token
	const api_token = 'bed5a485c9d152488ae0c9cc8adfac328142e0d3'; //'YOUR_API_TOKEN'
	// Pipedrive company domain
	const company_domain = 'vitaliy-sandbox'; //'YOUR_COMPANY_DOMAIN';

	//получить user_id определенного пользователя с помощью GET /users
	const deal = {
		title: 'Your deal title goes here',
		user_id: { "success": true, "data": [{ "id": 1, "name": "John Doe", "default_currency": "EUR", "locale": "et_EE", "lang": 1, "email": "john@pipedrive.com", "phone": "0000-0001", "activated": true, "last_login": "2019-11-21 08:45:56", "created": "2018-11-13 09:16:26", "modified": "2019-11-21 08:45:56", "has_created_company": true, "access": [{ "app": "sales", "admin": true, "permission_set_id": "62cc4d7f-4038-4352-abf3-a8c1c822b631" }, { "app": "global", "admin": true, "permission_set_id": "233b7976-39bd-43a9-b305-ef3a2b0998e5" }, { "app": "account_settings", "admin": true, "permission_set_id": "982c5ce5-b8ba-4b47-b102-9da024f4b990" }], "active_flag": true, "timezone_name": "Europe/Berlin", "timezone_offset": "+03:00", "role_id": 1, "icon_url": "https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/WPVG_icon_2016.svg/1024px-WPVG_icon_2016.svg.png", "is_you": true, "is_deleted": false }, { "id": 2, "name": "Jane Doe", "default_currency": "EUR", "locale": "et_EE", "lang": 1, "email": "jane@pipedrive.com", "phone": "0000-0002", "activated": true, "last_login": "2019-09-11 11:43:54", "created": "2019-01-22 10:43:47", "modified": "2019-11-21 09:49:50", "has_created_company": false, "access": [{ "app": "sales", "admin": false, "permission_set_id": "f07d229d-088a-4144-a40f-1fe64295d180" }, { "app": "global", "admin": true, "permission_set_id": "233b7976-39bd-43a9-b305-ef3a2b0998e5" }], "active_flag": true, "timezone_name": "Europe/Berlin", "timezone_offset": "+03:00", "role_id": 1, "icon_url": null, "is_you": false, "is_deleted": false }] }
	};

	// URL-адрес для создания сделки
	const url = `https://.${company_domain}.pipedrive.com/api/v1/deals?api_token=.${api_token}`;

	// POST-запроса с вашими данными к API. Назначение сделки определенному пользователю с помощью API Pipedrive
	const fetch = require('node-fetch'); //! Подключаем модуль node-fetch ???

	(async () => {
		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(deal)
			});

			if (response.ok) {
				const result = await response.json();
				if (result.data.id) {
					console.log(`New deal added for user ${result.data.user_id.id}`);
				}
				console.log('Response:', result);
				return result;
			} else {
				console.error('Error sending request:', response.statusText);
			}
		} catch (error) {
			console.error('Error executing request:', error.message);
		}
	})();




	// try {
	// 	const response = await fetch('https://api.pipedrive.com/v1/deals', {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 			Authorization: `Bearer ${'bed5a485c9d152488ae0c9cc8adfac328142e0d3'}`
	// 		},
	// 		body: JSON.stringify(objData)
	// 	});

	// 	if (response.ok) {
	// 		const result = await response.json();
	// 		console.log('Deal created:', result);
	// 	} else {
	// 		console.error('Error creating deal:', response.statusText);
	// 	}
	// } catch (error) {
	// 	console.error('Error sending data:', error.message);
	// }
}