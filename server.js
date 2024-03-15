
require('dotenv').config()

const inference = require("./user_input.js")
const express = require("express")
const app = express();

const { Client } = require("@notionhq/client");
const notion = new Client({ auth: process.env.NOTION_KEY })

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"))
app.use(express.json()) // for parsing application/json

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/views/index.html")
})

// Create new page. The database ID is provided in the web form.
app.post("/pages", async function (request, response) {
  const {taskText} = request.body

  try {
    const taskType = await inference(taskText);
    const newPage = await notion.pages.create({
      parent: {
        type: "database_id",
        database_id: process.env.NOTION_DB_ID,
      },
      properties: {
        Task: {
          title: [
            {
              text: {
                content: taskText,
              },
            },
          ],
        },
        Label: {
          select: {
            name: taskType[0][0].label
          }
        }
      },
    })
    response.json({ message: "success!", data: newPage , task: taskType[0][0].label})
    // TODO: INPUT TASK SELECTION AND NER MESSAGES HERE
  } catch (error) {
    response.json({ message: "error", error })
  }
})

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


// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port)
})
