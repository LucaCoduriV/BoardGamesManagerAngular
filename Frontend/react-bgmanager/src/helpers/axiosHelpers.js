import axios from 'axios';

const uri = 'http://localhost:8081';

/*let instance = axios.create({
	headers: {
		Authorization: localStorage.getItem('token') || 'not set',
	},
});

instance.interceptors.request.use(
	function (config) {
		// console.log("axios config", config)
		try {
			const token = localStorage.getItem('token');
			// console.log("token", token)

			if (token) {
				let decoded = jwt_decode(token);
				// console.log("decoded", decoded)
				// console.log("check time", Date.now() / 1000)

				if (Date.now() / 1000 > decoded.exp) {
					console.log('token expired');

					clearToken();
					window.location.href = '/login';
					window.location.reload(true);
				} else {
					// console.log("not expired")
				}
			}
		} catch (err) {
			console.log('no token', err);
		}

		return config;
	},
	function (error) {
		// console.log("axios error", error)
		return Promise.reject(error);
	}
); //*/

export function postReq(data, url) {
	return axios({
		method: 'post',
		url: `${uri}${url}`,
		headers: {
			'Content-Type': 'application/json',
			token: localStorage.getItem('token'),
		},
		data: data,
	});
}

export function getReq(url) {
	return axios({
		method: 'get',
		url: `${uri}${url}`,
		headers: {
			'Content-Type': 'application/json',
			token: localStorage.getItem('token'),
		},
	});
}

export function putReq(data, url) {
	return axios({
		method: 'put',
		url: `${uri}${url}`,
		data: data,
		headers: {
			'Content-Type': 'application/json',
			token: localStorage.getItem('token'),
		},
	});
}

export function deleteReq(data, url) {
	return axios({
		method: 'delete',
		url: `${uri}${url}`,
		data: data,
		headers: {
			'Content-Type': 'application/json',
			token: localStorage.getItem('token'),
		},
	});
}
/*
export const axiosGet = (url) => {
	return instance.get(url);
};

export const axiosPost = (url, data) => {
	return instance.post(url, data);
};

export const axiosPut = (url, data) => {
	return instance.put(url, data);
};

export const axiosDelete = (url, data) => {
	return instance.delete(url, { data: data });
}; //*/
