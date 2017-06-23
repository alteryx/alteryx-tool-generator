const fs = require('fs')

const readGuiHTML = (result) => new Promise((resolve, reject) => {
  if (result === undefined) {
    reject(console.log('readGuiHTML: input undefined'))
  }
  const installDir = result.AlteryxInstallDir
  const JSGuiPath = `${installDir}\\HtmlPlugins\\JavascriptPluginExample\\JavascriptPluginExampleGui.html`
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
  const titlePattern = /<title>.*<\/title>/
  const scriptPattern = /<script src=.*><\/script>/

  let modifiedHTML = result.GuiHTMLData.replace(titlePattern, `<title>${result.ToolName}</title>`)
  modifiedHTML = modifiedHTML.replace(scriptPattern, `<script src="${result.AlteryxInstallDir}\\RuntimeData\\HtmlAssets\\Workflows\\js\\engine_dialog_utils.js"></script>`)

  const inputObj = result

  inputObj.GuiHTMLData = modifiedHTML

  resolve(inputObj)
})

const writeUpdatedGuiHTML = (result) => new Promise((resolve, reject) => {
  if (result === undefined) {
    reject(console.log('updateGuiHTML: input undefined'))
  }

  const inputObj = result

  fs.writeFileSync(inputObj.GuiHTMLPath, inputObj.GuiHTMLData)

  console.log(`${inputObj.GuiHTMLPath} has been created.`)

  delete inputObj.GuiHTMLPath
  delete inputObj.GuiHTMLData
  resolve(inputObj)
})

// Creates Gui.html file, if successful message displays that file was created
exports.createGuiHTML = (result) => {
  const userObj = readGuiHTML(result)
    readGuiHTML(result)
      .then(updateGuiHTML)
      .then(writeUpdatedGuiHTML)
  return userObj
}
