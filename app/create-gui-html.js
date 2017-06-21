const fs = require('fs')

const readGuiHTML = (result) => new Promise((resolve, reject) => {
  if (result === undefined) {
    reject(console.log('readGuiHTML: input undefined'))
  }
    // NEED TO MAKE THIS DYNAMIC
  const JSGuiPath = 'C:\\Program Files\\Alteryx\\bin\\HtmlPlugins\\JavascriptPluginExample\\JavascriptPluginExampleGui.html'
  const directory = `${result.ToolDirectory}\\`
  const fileName = `${result.ToolName}_v${result.Version}_Gui.html`
  const filePath = `${directory}${fileName}`
  const fileData = fs.readFileSync(JSGuiPath, 'utf8')

  const inputObj = result
  inputObj.GuiHTMLPath = filePath
  inputObj.GuiHTMLData = fileData
  resolve(inputObj)
})

const updateGuiHTML = (result) => new Promise((resolve, reject) => {
  if (result === undefined) {
    reject(console.log('updateGuiHTML: input undefined'))
  }

  const inputObj = result

  ////////
  // regex the shit out of inputObj.GuiHTMLData
  ////////

  resolve(inputObj)
})

const writeUpdatedGuiHTML = (result) => new Promise((resolve, reject) => {
  if (result === undefined) {
    reject(console.log('updateGuiHTML: input undefined'))
  }

  const inputObj = result

  fs.writeFileSync(inputObj.GuiHTMLPath, inputObj.GuiHTMLData)

  delete inputObj.GuiHTMLPath
  delete inputObj.GuiHTMLData
  resolve(inputObj)
})

// Creates Gui.html file, if successful message displays that file was created
exports.createGuiHTML = (result) => {
  readGuiHTML(result)
    .then(updateGuiHTML)
    .then(writeUpdatedGuiHTML)
}
