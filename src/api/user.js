import api from './api.js'
import url from './url.js'

export function getUser(user_openid) {
	return new Promise(function(resolve, reject) {
		api.get(url.UserGetUser, {
			user_openid: user_openid
		}).then(response => {
			resolve(response);
		}).catch(error => {
			reject(response);
		})
	})
}



