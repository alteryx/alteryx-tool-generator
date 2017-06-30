// this module creates toolnameconfig.xml
const fs = require('fs')
const builder = require('xmlbuilder')

const translateBackend = (backend) => {
  if (backend === 'M') {
    return 'Macro'
  }
    return 'HTML'

}

exports.createToolNameConfigXml = (result) => new Promise((resolve, reject) => {
  const {
      ToolName,
      RootToolName,
      Version,
      Author,
      Company,
      Copyright,
      Category,
      Description,
      SearchTags,
      Backend,
      IconPath,
      InputConnections,
      OutputConnections,
      InputDetails,
      OutputDetails,
      ToolDirectory
  } = result

  const engineDll = translateBackend(Backend)
  const engineDllEntryPoint = `${RootToolName}\\Supporting_Macros\\${RootToolName}-engine.yxmc`
  const help = `${RootToolName}.htm`
  const html = `${RootToolName}Gui.html`
  const toolNameConfigXmlPath = `${ToolDirectory}\\${ToolName}Config.xml`

  // Pull input connection details into an array
  const inputNames = Object.keys(InputDetails)

  const newInputArray = (Object.keys(InputDetails).map((e, i) => [inputNames[i], InputDetails[e]]))

  const inputConnectionArray = []

  for (let i = 1; i <= InputConnections; i+=1) {
      let tempArray = []
      tempArray.push(i)
      newInputArray.forEach((d) => {
        const [key, value] = d
        if (key.endsWith(`Name_${i}`)) tempArray.push(value)
        if (key.endsWith(`Label_${i}`)) tempArray.push(value)
      })
      inputConnectionArray.push(tempArray)
      tempArray = []
  }

  // Pull output connection details into an array
  const outputNames = Object.keys(OutputDetails)

  const newOutputArray = (Object.keys(OutputDetails).map((e, i) => [outputNames[i], OutputDetails[e]]))

  const outputConnectionArray = []

  for (let i = 1; i <= OutputConnections; i+=1) {
      let tempArray = []
      tempArray.push(i)
      newOutputArray.forEach((d) => {
        const [key, value] = d
        if (key.endsWith(`Name_${i}`)) tempArray.push(value)
        if (key.endsWith(`Label_${i}`)) tempArray.push(value)
      })
      // console.log(tempArray)
      outputConnectionArray.push(tempArray)
      tempArray = []
  }

  const xml = builder.create('AlteryxJavaScriptPlugin', {encoding: 'UTF-8'})
    .ele('EngineSettings', { 'EngineDllEntryPoint': engineDllEntryPoint, 'EngineDll': engineDll, 'SDKVersion': '10.1' }).up()
    .ele('Properties')
      .ele('MetaInfo')
        .ele('NameIsFileName', { 'value': 'True' }).up()
        .ele('Name', ToolName).up()
        .ele('Description', Description).up()
        .ele('RootToolName', RootToolName).up()
        .ele('ToolVersion', Version).up()
        .ele('ToolInDB', { 'value': 'false' }).up()
        .ele('CategoryName', Category).up()
        .ele('SearchTags', SearchTags).up()
        .ele('Author', Author).up()
        .ele('Company', Company).up()
        .ele('Copyright', Copyright).up()
        .ele('DescriptionLink', { 'actual': '','display': ''}).up()
        .up()
      .up()

      const inputOutputRoot = xml.ele('GuiSettings', { 'help': help, 'Html': html, 'Icon': IconPath, 'SDKVersion': '10.1' })
      const inputRoot = inputOutputRoot.ele('InputConnections')
        for (let i = 0 ; i <= InputConnections - 1; i += 1) {
          const item = inputRoot.ele('Connection')
            item.att('Name', inputConnectionArray[i][1])
            item.att('AllowMultiple', 'False')
            item.att('Optional', 'False')
            item.att('Type', 'Connection')
            item.att('Label', inputConnectionArray[i][2])
          }

          const outputRoot = inputOutputRoot.ele('OutputConnections')
            for (let i = 0 ; i <= OutputConnections - 1; i += 1) {
              const item = outputRoot.ele('Connection')
              item.att('Name', outputConnectionArray[i][1])
              item.att('AllowMultiple', 'False')
              item.att('Optional', 'False')
              item.att('Type', 'Connection')
              item.att('Label', outputConnectionArray[i][2])
            }
      const finalXml = xml.end({pretty: true});

  fs.writeFile(toolNameConfigXmlPath, finalXml, (err) => {
    if (err) {
      reject(console.error(err))
    }
    console.log(`${toolNameConfigXmlPath} has been created`)
    const inputResult = result
    inputResult.ToolNameConfigXml = toolNameConfigXmlPath
    resolve(inputResult)
  })
})
