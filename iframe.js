'use strict';

import AppExtensionsSDK from './node_modules/@pipedrive/app-extensions-sdk';

const sdk = await new AppExtensionsSDK().initialize();
console.log('sdk:', sdk);

const { status } = await sdk.execute(AppExtensionsSDK.Command.OPEN_MODAL, {
	type: AppExtensionsSDK.Modal.CUSTOM_MODAL,
	action_id: 'Open settings',
	data: {
		item: 'xyz',
	},
});


// pipedriveUI.modal.openByName('NEW Create a job three');

// function saveData() {
// 	const link = 'https://goncharenkovitaliy.github.io/iframe-pipedrive/?code=13525530.21566062.3414aafa12ac87d2317a1241a393e0d952c21a3e';
// 	// console.log('objData:', objData);

// 	fetch(link, {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json'
// 		},
// 		body: JSON.stringify({
// 			title: 'New deal',
// 			// value: objData
// 		})
// 	})
// 	.then(response => {
// 		if (!response.ok) {
// 			throw new Error('The network response was incorrect');
// 		}
// 		console.log('response', response);
// 		return response.json();
// 	})
// 	.catch(error => console.error('Fetch error:', error));
// }