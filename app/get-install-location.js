const Registry = require('winreg')

exports.getAlteryxInstallDirectory = (result) => new Promise((resolve, reject) => {
  if (result === undefined) {
    reject(console.error('getAlteryxInstallDirectory: input undefined'))
  }

  const regKey = new Registry({
    hive: Registry.HKCU,
    key: '\\Software\\SRC\\Alteryx'
  })

  regKey.values((err, items) => {
    if (err) {
      console.error(`Error: ${err}`)
    }
    const findInstallDir = (key) => key.name === 'LastInstallDir'
    const installDir = (items.find(findInstallDir)).value
    const userObj = result
    userObj.AlteryxInstallDir = installDir

    resolve(userObj)
  })
})
