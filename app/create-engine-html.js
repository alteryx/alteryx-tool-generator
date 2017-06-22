// This module copies the JavascriptPluginExampleGui.html from the Alteryx install folder, updates it with configured connections and adds it to the new tool directory.
const fs = require('fs')

const readEngineHTML = (result) => new Promise((resolve, reject) => {
  if (result === undefined) {
    reject(console.error('readEngineHTML: input undefined'))
  }

  const userObj = result
  const JSEnginePath = `${userObj.AlteryxInstallDir}\\HtmlPlugins\\JavascriptPluginExample\\JavascriptPluginExampleEngine.html`
  const directory = `${result.ToolDirectory}\\`
  const fileName = `${result.ToolName}_v${result.Version}_Engine.html`
  const filePath = `${directory}${fileName}`
  const fileData = fs.readFileSync(JSEnginePath, 'utf8')

  userObj.EngineHTMLPath = filePath
  userObj.EngineHTMLData = fileData

  resolve(userObj)
})

const prepareInputText = (result) => {
  const details = result.InputDetails
  const detailArray = Object.keys(details).map((e) => details[e])
  const inputNames = detailArray.filter((value, index) => !(index % 2))

  inputNames.forEach((item, index, arr) => {
    const newArr = arr
    newArr[index] = {
      type: item,
      GroupInfo: {
        count: 0,
        grouping: 'false'
      }
    }
    return newArr
  })

  return inputNames
}

const prepareOutputText = (result) => {
  const details = result.OutputDetails
  const detailArray = Object.keys(details).map((e) => details[e])
  const outputNames = detailArray.filter((value, index) => !(index % 2))

  outputNames.forEach((item, index, arr) => {
    const newArr = arr
    newArr[index] = {
      name: item
    }
    return newArr
  })

  return outputNames
}

const replaceConnectionText = (result, find, replace) => new Promise((resolve, reject) => {
  if (result === undefined) {
    reject(console.error('replaceConnectionText: input undefined'))
  }

  const userObj = result
  const updatedText = userObj.EngineHTMLData.replace(find, replace)

  userObj.EngineHTMLData = updatedText

  resolve(userObj)
})

const updateEngineHTML = (result) => new Promise((resolve, reject) => {
  if (result === undefined) {
    reject(console.error('updateEngineHTML: input undefined'))
  }

  const userObj = result

  const inputFind = /IncomingConnections:.*[\n\s]+.*[\n\s]+.*[\n\s]+.*[\n\s]+.*[\n\s]+.*[\n\s]+\}\]/m
  const inputReplace = `IncomingConnections: ${JSON.stringify(prepareInputText(userObj), null, 4)}`

  const outputFind = /OutgoingConnections:.*[\n\s]+.*[\n\s]+\}\]/m
  const outputReplace = `OutgoingConnections: ${JSON.stringify(prepareOutputText(userObj), null, 4)}`

  replaceConnectionText(userObj, inputFind, inputReplace)
  replaceConnectionText(userObj, outputFind, outputReplace)

  resolve(userObj)
})

const writeUpdatedEngineHTML = (result) => new Promise((resolve, reject) => {
  if (result === undefined) {
    reject(console.error('writeUPdatedEngineHTML: input undefined'))
  }

  const inputObj = result

  fs.writeFileSync(inputObj.EngineHTMLPath, inputObj.EngineHTMLData)

  console.log(`${inputObj.EngineHTMLPath} has been created.`)

  delete inputObj.EngineHTMLPath
  delete inputObj.EngineHTMLData

  resolve(inputObj)
})

// Creates Engine.html file, if successful message displays that file was created
exports.createEngineHTML = (result) => {
  const userObj = readEngineHTML(result)
    .then(updateEngineHTML)
    .then(writeUpdatedEngineHTML)

  return userObj
}
