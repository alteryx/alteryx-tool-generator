const os = require('os')
const fs = require('fs')

// Creates tool folder in user directory, if successful message displays that folder was created
exports.createFolder = (result) => {
  const userInput = result[0]
  const folderName = userInput.ToolName + '_v' + userInput.Version
  toolDirectory = 'C:\\Users\\' + os.userInfo().username + '\\AppData\\Roaming\\Alteryx\\Tools\\' + folderName

  fs.mkdir(toolDirectory, function (err) {
    if (err) {
      return console.error(err)
    }
    console.log(`\n${folderName} folder has been created`)
  })
}
