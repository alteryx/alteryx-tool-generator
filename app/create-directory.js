const os = require('os')
const fs = require('fs')

// Creates tool folder in user directory, if successful message displays that folder was created
exports.createDirectory = (result) => new Promise((resolve, reject) => {
  const toolName = result.ToolName
  // const version = result.Version
  const folderName = `${toolName}`
  const username = os.userInfo().username
  const toolDirectory = `C:\\Users\\${username}\\AppData\\Roaming\\Alteryx\\Tools\\${folderName}`

  fs.mkdir(toolDirectory, (err) => {
    if (err) {
      reject(console.error(err))
      process.exit(1)
    }
    console.log(`\n${folderName} folder has been created.`)
    const inputResult = result
    inputResult.ToolDirectory = toolDirectory

    resolve(inputResult)
  })
})
