const nlp = require('compromise');
nlp.extend(require('compromise-dates'))

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

async function dateTime(task) {

	try {
		let doc = nlp(task);
		result = doc.json();
		date = doc.dates().json();
		const dateTime = date[0].dates.start;
		return dateTime;
		// console.log(doc.dates().json())
	
	} catch (error) {
		console.error('An error occurred:', error.message);
		return "";
		// Handle the error accordingly, such as logging, notifying the user, etc.
	}
}

module.exports = {
	query,
	dateTime,
};