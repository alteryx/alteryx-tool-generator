const fs = require('fs')

const readGuiHTML = (result) => new Promise((resolve, reject) => {
  if (result === undefined) {
    reject(console.error('readGuiHTML: input undefined'))
  }
  const userObj = result
  const JSGuiPath = `${userObj.AlteryxInstallDir}\\HtmlPlugins\\HtmlGuiSdk\\HtmlGuiSdkGui.html`
  const directory = `${userObj.ToolDirectory}\\`
  const fileName = `${userObj.ToolName}Gui.html`
  const filePath = `${directory}${fileName}`
  const fileData = fs.readFileSync(JSGuiPath, 'utf8')

  userObj.GuiHTMLPath = filePath
  userObj.GuiHTMLData = fileData

  resolve(userObj)
})

const updateGuiHTML = (result) => new Promise((resolve, reject) => {
  if (result === undefined) {
    reject(console.error('updateGuiHTML: input undefined'))
  }

  const userObj = result
  const titlePattern = /<title>.*<\/title>/
  const scriptPattern = /<script src=.*><\/script>/
  const bodyElement = '<body>'

  let modifiedHTML = userObj.GuiHTMLData.replace(titlePattern, `<title>${result.ToolName}</title>`)
  modifiedHTML = modifiedHTML.replace(scriptPattern, `<script src="${result.AlteryxInstallDir}\\RuntimeData\\HtmlAssets\\Workflows\\js\\engine_dialog_utils.js"></script>`)
  modifiedHTML = modifiedHTML.replace(bodyElement, '<body style="visibility: visible">')

  userObj.GuiHTMLData = modifiedHTML

  resolve(userObj)
})

const writeUpdatedGuiHTML = (result) => new Promise((resolve, reject) => {
  if (result === undefined) {
    reject(console.error('writeUpdatedGuiHTML: input undefined'))
  }

  const userObj = result

  fs.writeFileSync(userObj.GuiHTMLPath, userObj.GuiHTMLData)

  console.log(`${userObj.GuiHTMLPath} has been created.`)

  // delete userObj.GuiHTMLPath
  // delete userObj.GuiHTMLData

  resolve(userObj)
})


// Creates Gui.html file, if successful message displays that file was created
exports.createGuiHTML = (result) => {
  const userObj = readGuiHTML(result)
      .then(updateGuiHTML)
      .then(writeUpdatedGuiHTML)
  return userObj
}
