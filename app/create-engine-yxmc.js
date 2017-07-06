const fs = require('fs')
const builder = require('xmlbuilder')

// temp hard-coded object
const tempResult = {
  "ToolName": "TOOL",
  "RootToolName": "ROOT",
  "Version": "1",
  "Author": "AUTH",
  "Company": "COMP",
  "Copyright": "2017",
  "Category": "CAT",
  "Description": "DESC",
  "SearchTags": "tag,search",
  "Backend": "M",
  "IconPath": "default_icon.png",
  "InputConnections": "2",
  "OutputConnections": "2",
  "InputDetails": {
    "InputConnectionName_1": "In_A",
    "InputConnectionLabel_1": "A",
    "InputConnectionName_2": "In_B",
    "InputConnectionLabel_2": "B"
  },
  "OutputDetails": {
    "OutputConnectionName_1": "Out_A",
    "OutputConnectionLabel_1": "A",
    "OutputConnectionName_2": "Out_B",
    "OutputConnectionLabel_2": "B"
  }
}

const createEngineYxmc = (result) => new Promise((resolve, reject) => {
  const engineYxmcPath = ``
  const {
    Author
  } = result

  // Alteryx XML structure with 0 macro inputs and 0 macro outputs
  const macroXml = builder.create('AlteryxDocument')
    .att('yxmdVer', '11.3')
    .ele('Nodes')
      .ele('Node', { ToolID: 1 })
        .ele('GuiSettings', { Plugin: 'AlteryxGuiToolkit.Questions.Tab.Tab' })
          .ele('Position', { x: '0', y: '0', width: '59', height: '59' }).up()
          .up()
        .ele('Properties')
          .ele('Configuration').up()
          .ele('Annotation', { DisplayMode: 0 })
            .ele('Name').up()
            .ele('DefaultAnnotationText').up()
            .ele('Left', { value: 'False' }).up()
            .up()
            .up()
            .up()
            // .up()
            
  const inputXml = macroXml
    .ele('Node', {ToolID: 2})
      .ele('GuiSettings', { Plugin: 'AlteryxBasePluginsGui.MacroInput.MacroInput'})
        .ele('Position', { x: 138, y: 66}).up()
      .up()
      // .up()
      .ele('Properties')
        .ele('Configuration')
          .ele('UseFileInput', { value: false}).up()
          .ele('Name', 'Input2 Name Placeholder').up()
          .ele('Abbrev', 'I').up()
          .ele('ShowFieldMap', { value: true}).up()
          .ele('Optional', { value: false}).up()
          .ele('TextInput')
            .ele('Configuration')
              .ele('NumRows', { value: 0}).up()
              .ele('Fields').up()
              .ele('Data').up()
          .up()
          .up()
          .up()
          // .up()
          // .up()
          // .up()
        .ele('Annotation', { DisplayMode: 0})
          .ele('Name').up()
          .ele('DefaultAnnotationText').up()
          .ele('Left', { value: true}).up()
          .up()
          .up()
          // .up()
      .ele('EngineSettings', { EngineDll: 'AlteryxBasePluginsEngine.dll', EngineDllEntryPoint: 'AlteryxMacroInput' }).up().up() // <EngineSettings EngineDll="AlteryxBasePluginsEngine.dll" EngineDllEntryPoint="AlteryxMacroInput" />

  const outputXml = inputXml.ele('_OutputNodes').up()
    .up()
    // .up()

  const bottomXml = outputXml
    .ele('Connections').up()
    .ele('Properties')
      .ele('Memory', { default: true }).up()
      .ele('GlobalRecordLimit', { value: 0}).up()
      .ele('TempFiles', { default: true}).up()
      .ele('Annotation', { on: true, includeToolName: false}).up()
      .ele('ConvErrorLimit', { value: 10}).up()
      .ele('ConvErrorLimit_Stop', { value: false}).up()
      .ele('CancelOnError', { value: false}).up()
      .ele('DisableBrowse', { value: false}).up()
      .ele('EnablePerformanceProfiling', { value: false}).up()
      .ele('DisableAllOutput', { value: false}).up()
      .ele('ShowAllMacroMessages', { value: false}).up()
      .ele('ShowConnectionStatusIsOn', { value: true}).up()
      .ele('ShowConnectionStatusOnlyWhenRunning', { value: true}).up()
      .ele('ZoomLevel', { value: 0}).up()
      .ele('LayoutType', 'Horizontal').up()
      .ele('MetaInfo')
        .ele('NameIsFileName', { value: true}).up()
        .ele('Name', 'ayx-engine').up()
        .ele('Description').up()
        .ele('RootToolName').up()
        .ele('ToolVersion').up()
        .ele('ToolInDb', { value: false }).up()
        .ele('CategoryName').up()
        .ele('SearchTags').up()
        .ele('Author').up()
        .ele('Company').up()
        .ele('Copyright').up()
        .ele('DescriptionLink', { actual: '', displayed: ''}).up()
        .ele('Example')
          .ele('Description').up()
          .ele('File').up()
          .up()
          .up()
      .ele('Events')
        .ele('Enabled', { value: true}).up()
        .up()
      .ele('RuntimeProperties')
        .ele('Actions').up()
        .ele('Questions')
          .ele('Question')
            .ele('Type', 'Tab').up()
            .ele('Description', 'Questions').up()
            .ele('Name', 'Tab (1)').up()
            .ele('ToolId', { value: 1 }).up()
            .ele('Questions').up()
            .up()
            .up()
        .ele('ModuleType', 'Macro').up()
        .ele('MacroCustomHelp', { value: false}).up()
        .ele('MacroDynamicOutputFields', { value: false}).up()
        .ele('MacroImageStd', { value: 39}).up()
        .ele('MacroInputs').up()
        .ele('MacroOutputs').up()
        .ele('Wiz_CustomHelp', { value: false}).up()
        .ele('Wiz_CustomGraphic', { value: false}).up()
        .ele('Wiz_ShowOutput', { value: true}).up()
        .ele('Wiz_OpenOutputTools').up()
        .ele('Wiz_OutputMessage').up()
        .ele('Wiz_NoOutputFilesMessage').up()
        .ele('Wiz_ChainRunWizard')
  
  const finalXml = bottomXml.end({ pretty: true })

  fs.writeFile('test\\ayx-engine.yxmc', finalXml, (err) => {
    if (err) reject(err)
    console.log(`ayx-engine.yxmc has been created.`)
    resolve(console.log('finalXml: ', finalXml))
  })
})

createEngineYxmc(tempResult)