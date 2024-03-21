// This file is run by the browser each time your view template is loaded
/**
 * Define variables that reference elements included in /views/index.html:
 */

// Forms
// TODO: try inference here client side so it's easier to print task and NER inference
const pageForm = document.getElementById("pageForm")

// Table cells where API responses will be appended
const pageResponseEl = document.getElementById("pageResponse")
/**
 * Functions to handle appending new content to /views/index.html
 */

// Appends the API response to the UI
const appendApiResponse = function (apiResponse, el) {
  console.log(apiResponse)

  // Add success message to UI
  const newParagraphSuccessMsg = document.createElement("p")
  newParagraphSuccessMsg.textContent = "Result: " + apiResponse.message
  el.appendChild(newParagraphSuccessMsg)
  // See browser console for more information
  if (apiResponse.message === "error") return

  // Add URL of Notion item (db, page) to UI
  if (apiResponse.data.url) {
    const newAnchorTag = document.createElement("a")
    newAnchorTag.setAttribute("href", apiResponse.data.url)
    newAnchorTag.textContent = "Link to Database"
    el.appendChild(newAnchorTag)
  }
}

/**
 * Attach submit event handlers to each form included in /views/index.html
 */

// Attach submit event to each form

pageForm.onsubmit = async function (event) {
  event.preventDefault()

  const taskText = event.target.taskText.value
  
  const body = JSON.stringify({taskText})

  const newPageResponse = await fetch("/pages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  })

  const newPageData = await newPageResponse.json()
  appendApiResponse(newPageData, pageResponseEl)
}