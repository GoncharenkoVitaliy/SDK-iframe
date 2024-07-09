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

// const form = document.querySelector('#form');
// form.addEventListener('submit', formSend);

// function formValidate(formRequest) {
// 	let validData = true;
// 	formRequest.forEach((element) => {
// 		formRemoveError(element);
// 		if (element.value === '') {
// 			formAddError(element);
// 			validData = false;
// 		}
// 	});
// 	return validData;
// }

// function formAddError(element) {
// 	element.setAttribute('required', '');
// 	element.classList.add('_error');
// }

// function formRemoveError(element) {
// 	element.removeAttribute('required');
// 	element.classList.remove('_error');
// }

// function formSend(event) {
// 	event.preventDefault();

// 	const formRequest = document.querySelectorAll('._req');
// 	const validData = formValidate(formRequest);
// 	const objData = {};

// 	if (validData) {
// 		const input = form.querySelectorAll('.data');

// 		input.forEach((elem) => {
// 			objData[elem.name] = elem.value;
// 		});

// 		const buttonSubmit = document.querySelector('.create-job');
// 		buttonSubmit.textContent = 'Request is sent';
// 		buttonSubmit.style.background = 'red';

// 		saveData(objData);
// 	}
// }

// function saveData(objData) {
// 	const link = 'https://goncharenkovitaliy.github.io/iframe-pipedrive/`';
// 	console.log('objData:', objData);

// 	const arrKeys = Object.keys(objData);
// 	console.log('objData.length:', arrKeys.length);

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
// 			console.log('response', response);
// 			return response.json();
// 		})
// 		.then(data => console.log('data(script.js):', data))
// 		.catch(error => console.error('Fetch error:', error));
// }

//======================================================

const express = require('express');
const path = require('path');
const passport = require('passport');
const OAuth2Strategy = require('passport-oauth').OAuth2Strategy;

const api = require('./api');
const config = require('./config');
const User = require('./db/user');

User.createTable();

const app = express();
const port = 3000;

passport.use(
	'pipedrive',
	new OAuth2Strategy({
			authorizationURL: 'https://oauth.pipedrive.com/oauth/authorize',
			tokenURL: 'https://oauth.pipedrive.com/oauth/token',
			clientID: config.clientID || '',
			clientSecret: config.clientSecret || '',
			callbackURL: config.callbackURL || ''
		}, async (accessToken, refreshToken, profile, done) => {
			const userInfo = await api.getUser(accessToken);
			const user = await User.add(
				userInfo.data.name,
				accessToken,
				refreshToken
			);

			done(null, { user });
		}
	)
);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(async (req, res, next) => {
	req.user = await User.getById(1);
	next();
});

// `Step 2` Code goes here... 👇
app.get('/auth/pipedrive', passport.authenticate('pipedrive'));
app.get('/auth/pipedrive/callback', passport.authenticate('pipedrive', {
    session: false,
    failureRedirect: '/',
    successRedirect: '/'
}));
app.get('/', async (req, res) => {
    if (req.user.length < 1) {
        return res.redirect('/auth/pipedrive');
    }

    try {
        const deals = await api.getDeals(req.user[0].access_token);

        res.render('deals', {
            name: req.user[0].username,
            deals: deals.data
        });
    } catch (error) {
        return res.send(error.message);
    }
});
app.get('/deals/:id', async (req, res) => {
    const randomBoolean = Math.random() >= 0.5;
    const outcome = randomBoolean === true ? 'won' : 'lost';

    try {
        await api.updateDeal(req.params.id, outcome, req.user[0].access_token);

        res.render('outcome', { outcome });
    } catch (error) {
        return res.send(error.message);
    }
});
// End of `Step 2`
app.listen(port, () => console.log(`🟢 App has started. \n🔗 Live URL: https://${process.env.PROJECT_DOMAIN}.glitch.me`));