const fs = require('fs')
const Registry= require('winreg')

const readGuiHTML = (result) => new Promise((resolve, reject) => {
  if (result === undefined) {
    reject(console.log('readGuiHTML: input undefined'))
  }

  const alteryxRegKey = new Registry({
    hive: Registry.HKCU,
    key:  '\\Software\\SRC\\Alteryx'
  })

    // May want to refactor this
    alteryxRegKey.values(function (err, items) {
    if (err) {
      console.log(`Error: ${err}`)
    }
      const findInstallDir = (regKey) => {
        return regKey.name === 'LastInstallDir'
      }
      const lastInstalDirObj = items.find(findInstallDir)
      const installDir = lastInstalDirObj.value

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
  //   console.log('tempInstall',tempInstall)
  //   console.log('getAlteryxInstallDir',getAlteryxInstallDir.key)
  //
  // const JSGuiPath = `${getAlteryxInstallDir}\\HtmlPlugins\\JavascriptPluginExample\\JavascriptPluginExampleGui.html`
  // console.log(JSGuiPath)
  // const directory = `${result.ToolDirectory}\\`
  // const fileName = `${result.ToolName}_v${result.Version}_Gui.html`
  // const filePath = `${directory}${fileName}`
  // const fileData = fs.readFileSync(JSGuiPath, 'utf8')
  //
  // const inputObj = result
  // inputObj.GuiHTMLPath = filePath
  // inputObj.GuiHTMLData = fileData
  // resolve(inputObj)
})

const updateGuiHTML = (result) => new Promise((resolve, reject) => {
  if (result === undefined) {
    reject(console.log('updateGuiHTML: input undefined'))
  }

  const titlereg = /<title>.*<\/title>/

  const modifiedHTML= result.GuiHTMLData.replace(titlereg, `<title>${result.ToolName}</title>`)

  const inputObj = result

  inputObj.GuiHTMLData = modifiedHTML

  // const found = result.GuiHTMLData.match(titlereg)
  //
  // console.log(newHTML)
  //
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
