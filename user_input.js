async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/Joshua-Segal/assistant",
		{
			headers: { Authorization: process.env.HF_KEY },
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}

// query({"inputs": "Create more complex data samples."}).then((response) => {
// 	console.log(JSON.stringify(response));
// });

module.exports = query;