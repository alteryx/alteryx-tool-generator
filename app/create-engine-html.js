// This module copies the JavascriptPluginExampleGui.html from the Alteryx install folder, updates it with configured connections and adds it to the new tool directory.
const fs = require('fs')

const readEngineHTML = (result) => new Promise((resolve, reject) => {
  if (result === undefined) {
    reject(console.error('readEngineHTML: input undefined'))
  }

  const userObj = result
  const JSEnginePath = `${userObj.AlteryxInstallDir}\\HtmlPlugins\\HtmlGuiSdk\\HtmlGuiSdkEngine.html`
  const directory = `${userObj.ToolDirectory}\\`
  const fileName = `${userObj.ToolName}_v${userObj.Version}Engine.html`
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
  console.log('prepareInputText() inputNames: ', inputNames)
  inputNames.forEach((item, index, arr) => {
    const newArr = arr
    newArr[index] = {
      type: item,
      GroupInfo: {
        count: 0,
        grouping: 'false'
      }
    }
  console.log('prepareInputText() newArr: ', newArr)
    return newArr
  })
  console.log('prepareInputText() inputNames: ', inputNames)
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

const updateEngineHTML = (result) => new Promise((resolve, reject) => {
  if (result === undefined) {
    reject(console.error('updateEngineHTML: input undefined'))
  }

  const userObj = result

  const inputFind = /IncomingConnections:.*[\n\s]+.*[\n\s]+.*[\n\s]+.*[\n\s]+.*[\n\s]+.*[\n\s]+.*[\n\s]+.*[\n\s]+.*[\n\s]+.*[\n\s]+.*[\n\s]+.*[\n\s]+\}\]/m
  const inputReplace = `IncomingConnections: ${JSON.stringify(prepareInputText(userObj), null, 4)}`
  console.log('updateEngineHTML() inputFind: ', inputFind)
  console.log('updateEngineHTML() inputReplace: ', inputReplace)

  const outputFind = /OutgoingConnections:.*[\n\s]+.*[\n\s]+\}\]/m
  const outputReplace = `OutgoingConnections: ${JSON.stringify(prepareOutputText(userObj), null, 4)}`
  console.log('updateEngineHTML() outputFind: ', outputFind)
  console.log('updateEngineHTML() outputReplace: ', outputReplace)

  userObj.EngineHTMLData = userObj.EngineHTMLData.replace(inputFind, inputReplace)
  userObj.EngineHTMLData = userObj.EngineHTMLData.replace(outputFind, outputReplace)

  resolve(userObj)
})

const writeUpdatedEngineHTML = (result) => new Promise((resolve, reject) => {
  if (result === undefined) {
    reject(console.error('writeUPdatedEngineHTML: input undefined'))
  }

  const userObj = result

  fs.writeFileSync(userObj.EngineHTMLPath, userObj.EngineHTMLData)

  console.log(`${userObj.EngineHTMLPath} has been created.`)

  delete userObj.EngineHTMLPath
  delete userObj.EngineHTMLData

  resolve(userObj)
})

// Creates Engine.html file, if successful message displays that file was created
exports.createEngineHTML = (result) => {
  const userObj = readEngineHTML(result)
    .then(updateEngineHTML)
    .then(writeUpdatedEngineHTML)

  return userObj
}
