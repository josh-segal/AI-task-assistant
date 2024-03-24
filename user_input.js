const spacy = require('spacy')

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

async function datetime(task) {
	const nlp = spacy.load('en_core_web_sm');
	const entities = await nlp(task);
	const standardizedDatetime = null;
	for (let ent of entities.ents) {
		if (ent.label_ == "DATE") {
			try {
				standardizedDatetime = standardDate(ent.text);
			}
			catch(err) {
				const standardizedDatetime = null;
			}
		}
		if (ent.label_ == "TIME") {
			time = standardTime(ent.text);
			if (standardizedDatetime !== null) {
				standardizedDatetime = combineDateTime(standardizedDatetime, time);
			}
			else {
				standardizedDatetime = newDateTime(time)
			}
		}
	}
}

function standardDate(dateExpression) {
    // Array of days of the week in lowercase
    var daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    
    // Split the input expression by spaces
    var date = dateExpression.split(" ");

    // Get the index of the day of the week from the input expression
    var dayOfWeekIndex = daysOfWeek.indexOf(date[date.length - 1].toLowerCase());
    
    // Get the current day of the week
    var currentDayOfWeek = new Date().getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday

    // Calculate the number of days to add to reach the desired date
    var daysToAdd;
    if (date.includes("next")) {
        daysToAdd = (dayOfWeekIndex - currentDayOfWeek + 7) % 7 + 7;
    } else {
        daysToAdd = (dayOfWeekIndex - currentDayOfWeek + 7) % 7;
    }

    // Create a new Date object representing the standard date
    var standardDate = new Date();
    standardDate.setDate(standardDate.getDate() + daysToAdd);
    standardDate.setHours(0, 0, 0, 0); // Set time to midnight (00:00:00)

    return standardDate;
}

function standardTime(timeString) {
    // Regular expression to extract hour and meridiem (AM/PM) from the input string
    var regex = /^(\d{1,2})(?::?(\d{2}))?\s*([AP]M)?$/i;
    var match = timeString.match(regex);

    if (!match) {
        return null; // Return null if the input doesn't match the expected format
    }

    var hour = parseInt(match[1], 10); // Extract hour
    var minute = match[2] ? parseInt(match[2], 10) : 0; // Extract minute, default to 0 if not provided
    var meridiem = match[3] ? match[3].toUpperCase() : ''; // Extract meridiem (AM/PM), default to empty string if not provided

    // Convert hour to 24-hour format if meridiem is provided and it's PM
    if (meridiem === 'PM' && hour < 12) {
        hour += 12;
    }

    // Convert hour to 12-hour format if it's greater than 12
    if (hour > 12) {
        hour %= 12;
    }

    // Pad hour and minute with leading zeros if necessary
    hour = hour < 10 ? '0' + hour : hour.toString();
    minute = minute < 10 ? '0' + minute : minute.toString();

    // Return the parsed time in standard format (hh:mm:ss)
    return hour + ':' + minute + ':00';
}

function combineDateTime(dateString, timeString) {
    // Parse the date string into components (year, month, day)
    var dateComponents = dateString.split("-");
    var year = parseInt(dateComponents[0], 10);
    var month = parseInt(dateComponents[1], 10) - 1; // Month is zero-based in JavaScript
    var day = parseInt(dateComponents[2], 10);

    // Parse the time string into components (hours, minutes, seconds)
    var timeComponents = timeString.split(":");
    var hours = parseInt(timeComponents[0], 10);
    var minutes = parseInt(timeComponents[1], 10);
    var seconds = parseInt(timeComponents[2], 10) || 0; // Default seconds to 0 if not provided

    // Create a new Date object with the combined date and time components
    var combinedDateTime = new Date(year, month, day, hours, minutes, seconds);

    return combinedDateTime;
}

function newDateTime(time) {
	standardizedDatetime = new Date();
	var timeComponents = time.split(":");
	standardizedDatetime.setHours(parseInt(timeComponents[0], 10)); // Set hours
	standardizedDatetime.setMinutes(parseInt(timeComponents[1], 10)); // Set minutes
	standardizedDatetime.setSeconds(parseInt(timeComponents[2], 10)); // Set seconds
	standardizedDatetime.setMilliseconds(0); // Set milliseconds to 0

	return standardizedDatetime;
}



module.exports = query;