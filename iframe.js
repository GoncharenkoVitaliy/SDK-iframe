'use strict';

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


// function saveData(objData) {
// 	const link = 'https://goncharenkovitaliy.github.io/iframe-pipedrive/`';
// 	console.log('objData:', objData);
// 	Object.keys(objData).size

// 	fetch(link, {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json'
// 		},
// 		body: JSON.stringify({
// 			title: 'New deal',
// 			value: objData
// 		})
// 	})
// 		.then(response => {
// 			if (!response.ok) {
// 				throw new Error('The network response was incorrect');
// 			}
// 			console.log('response(iframe):', response);
// 			return response.json();
// 		})
// 		.then(data => console.log('data(iframe):', data))
// 		.catch(error => console.error('Fetch error:', error));
// }

// window.addEventListener('message', function (event) {
// 	if (event.data && event.data.type === 'formData') {
// 		const objData = event.data.data;
// 		saveData(objData);
// 	}
// });