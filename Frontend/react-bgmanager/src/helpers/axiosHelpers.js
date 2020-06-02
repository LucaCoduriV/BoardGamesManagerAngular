import axios from 'axios';

const uri = 'http://localhost:8081';

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

export function deleteReq(url) {
	return axios({
		method: 'delete',
		url: `${uri}${url}`,
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
