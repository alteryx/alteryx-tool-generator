const os = require('os')
const fs = require('fs')

// Creates tool folder in user directory, if successful message displays that folder was created
exports.createDirectory = (result) => new Promise((resolve, reject) => {
  const toolName = result.ToolName
  const version = result.Version
  const folderName = `${toolName}_v${version}`
  const username = os.userInfo().username
  const toolDirectory = `C:\\Users\\${username}\\AppData\\Roaming\\Alteryx\\Tools\\${folderName}`

  fs.mkdir(toolDirectory, (err) => {
    if (err) {
      reject(console.error(err))
    }
    console.log(`\n${folderName} folder has been created`)
    result.ToolDirectory = toolDirectory
    resolve(result)
  })
})
