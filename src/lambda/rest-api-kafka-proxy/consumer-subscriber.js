const https = require('http')

function postrequest(body) {
	const opt = {
		hostname: 'rest-proxy',
		path: '/consumers/poc/instances/poc/subscription',
		method: 'POST',
		port: 8084,
		headers: {
			'Content-Type': 'application/vnd.kafka.json.v2+json'
		},
	};

	return new Promise((resolve, reject) => {
		const req = https.request(opt, res => {
			let raw = '';

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

		req.write(JSON.stringify(body));
		req.end();
	});
}


exports.handler = async event => {
	try {
		const result = await postrequest({
			topics:["poc"]
		});
		console.log('result is:', result)

		return {
			statuCode: 200,
			headers: {
				'Content-Type': 'application/json'
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
