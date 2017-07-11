const fs = require('fs')

const readIconPNG = (result) => new Promise((resolve, reject) => {
  if (result === undefined) {
    reject(console.error('readIconPNG: input undefined'))
  }
  const userObj = result
  let iconInput = `${userObj.IconPath}`
  if (fs.existsSync(iconInput) === false && iconInput !== 'default_icon.png' ) {
      iconInput = 'default_icon.png'
      console.log('Icon path provided does not exist, default_icon.png used instead.')
    }
  let iconPath = ''
  if (iconInput === 'default_icon.png') {
    iconPath = `${userObj.AlteryxInstallDir}\\RuntimeData\\icons\\categories\\Connectors.png`
  } else {
    iconPath = iconInput
  }

  const directory = `${userObj.ToolDirectory}\\`
  const fileName = `${userObj.ToolName}_v${userObj.Version}Icon.png`
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

  resolve(userObj)
})

exports.createIconPNG = (result) => {
  const userObj = readIconPNG(result)
      .then(writeIconPNG)
  return userObj
}
