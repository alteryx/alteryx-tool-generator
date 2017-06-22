// This module copies the JavascriptPluginExampleGui.html from the Alteryx install folder, updates it with configured connections and adds it to the new tool directory.
// const os = require('os')
const fs = require('fs')
// const path = require('path')

const readEngineHTML = (result) => new Promise((resolve, reject) => {
  if (result === undefined) {
    reject(console.log('readEngineHTML: input undefined'))
  }
  // NEED TO MAKE THIS DYNAMIC
  const JSEnginePath = 'C:\\Program Files\\Alteryx\\bin\\HtmlPlugins\\JavascriptPluginExample\\JavascriptPluginExampleEngine.html'
  const directory = `${result.ToolDirectory}\\`
  const fileName = `${result.ToolName}_v${result.Version}_Engine.html`
  const filePath = `${directory}${fileName}`
  const fileData = fs.readFileSync(JSEnginePath, 'utf8')

  const inputObj = result
  inputObj.EngineHTMLPath = filePath
  inputObj.EngineHTMLData = fileData
  resolve(inputObj)
})

const updateEngineHTML = (result) => new Promise((resolve, reject) => {
  if (result === undefined) {
    reject(console.log('updateEngineHTML: input undefined'))
  }

  const inputObj = result

  ////////
  // regex the shit out of inputObj.EngineHTMLData
  ////////

  resolve(inputObj)
})

const writeUpdatedEngineHTML = (result) => new Promise((resolve, reject) => {
  if (result === undefined) {
    reject(console.log('updateEngineHTML: input undefined'))
  }

  const inputObj = result

  fs.writeFileSync(inputObj.EngineHTMLPath, inputObj.EngineHTMLData)

  delete inputObj.EngineHTMLPath
  delete inputObj.EngineHTMLData
  resolve(inputObj)
})

// Creates Engine.html file, if successful message displays that file was created
exports.createEngineHTML  = (result) => new Promise((resolve, reject) => {
  if (result === undefined) {
    reject(console.log('createEngineHTML: input undefined'))
  }
  readEngineHTML(result)
    .then(updateEngineHTML)
    .then(writeUpdatedEngineHTML)
  resolve(result)
})
