import axios from 'axios'
//
const baseDomain = "http://rotaract3220.test"
const baseURL = 'http://rotaract3220.org/rmis/v4/onerotaract/login'

export default axios.create({
	baseURL,
	headers: {
		"Access-Control-Allow-Origin": "*",
	}
})