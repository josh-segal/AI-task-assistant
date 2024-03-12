const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_KEY });

(async () => {
  const response = await notion.pages.create({
    "parent": {
        "type": "database_id",
        "database_id": process.env.NOTION_PAGE_ID
    },
    "properties": {
        "Task": {
            "title": [
                {
                    "text": {
                        "content": "Write more complex data samples." // replace user input from query
                    }
                }
            ]
        },
        "Label": {
            "select": {
                "name": "TODO" // replace with label generated from assistant_model
            }
        },
        "Status": {
            "status": {
                "name": "Not started" // tasks always not started when created
            }
        }
    },
});
  console.log(response);
})();