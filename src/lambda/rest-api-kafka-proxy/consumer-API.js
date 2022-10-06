const https = require('http')

function getrequest() {
	const url = 'http://rest-proxy:8084/consumers/poc/instances/poc/records'

	return new Promise((resolve, reject) => {
		const req = https.get(url, res => {
		 let raw = ''

			res.on('data', chunk => {
				raw += chunk;
			});

			res.on('end', () => {
				try {
					resolve(JSON.parse(raw));
				} catch (err) {
					reject(new Error(err))
				}
			});
		});
		req.on('error', err => {
			reject(new Error(err))
		});
	});
}


exports.handler = async event => {
	try {
		const result = await getrequest();
		console.log('result is:', result)

		return {
			statuCode: 200,
			headers: {
				'Content-Type': 'application/vnd.kafka.json.v2+json'
			},
			body: JSON.stringify(result),
		};
	} catch (error) {
		console.log('error is:', error)
		return {
			statuCode: 400,
			body: error.message
		};
	}
};
