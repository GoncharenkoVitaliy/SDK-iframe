// "use strict"

// // 1-я часть -------------------------------------------
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
// 	}
// }


// // 2-я часть -------------------------------------------

// const express = require('express');
// const path = require('path');
// const passport = require('passport');
// const OAuth2Strategy = require('passport-oauth').OAuth2Strategy;

// const api = require('./api');
// const config = require('./config');
// const User = require('./db/user');

// User.createTable();

// const app = express();
// const port = 3000;

// passport.use(
// 	'pipedrive',
// 	new OAuth2Strategy({
// 			authorizationURL: 'https://oauth.pipedrive.com/oauth/authorize',
// 			tokenURL: 'https://oauth.pipedrive.com/oauth/token',
// 			clientID: config.clientID || '',
// 			clientSecret: config.clientSecret || '',
// 			callbackURL: config.callbackURL || ''
// 		}, async (accessToken, refreshToken, profile, done) => {
// 			const userInfo = await api.getUser(accessToken);
// 			const user = await User.add(
// 				userInfo.data.name,
// 				accessToken,
// 				refreshToken
// 			);

// 			done(null, { user });
// 		}
// 	)
// );

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');

// app.use(express.static(path.join(__dirname, 'public')));
// app.use(passport.initialize());
// app.use(async (req, res, next) => {
// 	req.user = await User.getById(1);
// 	next();
// });

// // `Step 2` Code goes here... 👇
// app.get('/auth/pipedrive', passport.authenticate('pipedrive'));
// app.get('/auth/pipedrive/callback', passport.authenticate('pipedrive', {
//     session: false,
//     failureRedirect: '/',
//     successRedirect: '/'
// }));
// app.get('/', async (req, res) => {
//     if (req.user.length < 1) {
//         return res.redirect('/auth/pipedrive');
//     }

//     try {
//         const deals = await api.getDeals(req.user[0].access_token);

//         res.render('deals', {
//             name: req.user[0].username,
//             deals: deals.data
//         });
//     } catch (error) {
//         return res.send(error.message);
//     }
// });
// app.get('/deals/:id', async (req, res) => {
//     const randomBoolean = Math.random() >= 0.5;
//     const outcome = randomBoolean === true ? 'won' : 'lost';

//     try {
//         await api.updateDeal(req.params.id, outcome, req.user[0].access_token);

//         res.render('outcome', { outcome });
//     } catch (error) {
//         return res.send(error.message);
//     }
// });
// // End of `Step 2`
// app.listen(port, () => console.log(`🟢 App has started. \n🔗 Live URL: https://${process.env.PROJECT_DOMAIN}.glitch.me`));


// // =====================================================
// // =====================================================

// // 1-я часть: Получение данных из формы
// const form = document.querySelector('#form');
// form.addEventListener('submit', async (event) => {
//     event.preventDefault();

//     const formRequest = document.querySelectorAll('._req');
//     const validData = formValidate(formRequest);
//     const objData = {};

//     if (validData) {
//         const input = form.querySelectorAll('.data');

//         input.forEach((elem) => {
//             objData[elem.name] = elem.value;
//         });

//         // Отправка данных на сервер Pipedrive
        
//     }
// });

const fetch = require('node-fetch'); // Подключаем модуль node-fetch

const apiToken = 'YOUR_API_TOKEN';
const companyDomain = 'YOUR_COMPANY_DOMAIN';

const deal = {
    title: 'Your deal title goes here',
    user_id: 'The user ID goes here'
};

const url = `https://${companyDomain}.pipedrive.com/v1/deals?api_token=${apiToken}`;

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
        } else {
            console.error('Error sending request:', response.statusText);
        }
    } catch (error) {
        console.error('Error executing request:', error.message);
    }
})();