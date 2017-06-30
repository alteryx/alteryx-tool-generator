const fs = require('fs')

const readIconPNG = (result) => new Promise((resolve, reject) => {
  if (result === undefined) {
    reject(console.error('readIconPNG: input undefined'))
  }
  const userObj = result
  const iconInput = `${userObj.IconPath}`
  let iconPath = ''
    if (iconInput === 'default_icon.png') {
      iconPath = `${userObj.AlteryxInstallDir}\\RuntimeData\\icons\\categories\\Connectors.png`
    } else {
      iconPath = iconInput
    }

  const directory = `${userObj.ToolDirectory}\\`
  const fileName = `${userObj.ToolName}_v${userObj.Version}_Icon.png`
  const filePath = `${directory}${fileName}`
  const fileData = fs.readFileSync(iconPath)

  userObj.IconPNGPath = filePath
  userObj.IconPNGData = fileData

  resolve(userObj)
})


const writeIconPNG = (result) => new Promise((resolve, reject) => {
  if (result === undefined) {
    reject(console.error('writeIconPNG: input undefined'))
  }

  const userObj = result

  fs.writeFileSync(userObj.IconPNGPath, userObj.IconPNGData, 'binary')

  console.log(`${userObj.IconPNGPath} has been created.`)

  // delete userObj.GuiHTMLPath
  // delete userObj.GuiHTMLData

  resolve(userObj)
})


// Creates Gui.html file, if successful message displays that file was created
exports.createIconPNG = (result) => {
  const userObj = readIconPNG(result)
      .then(writeIconPNG)
  return userObj
}
