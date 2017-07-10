const fs = require('fs')
const builder = require('xmlbuilder')

exports.createEngineYxmc = (result) => new Promise((resolve, reject) => {
  const {
    ToolName,
    InputDetails,
    InputConnections,
    OutputDetails,
    OutputConnections,
    ToolDirectory
  } = result
  const engineYxmcPath = `${ToolDirectory}\\${ToolName}_Engine.yxmc`
  // these variables will store the nodes for inputs and outputs
  let nodeInputs = ''
  let nodeOutputs = ''
  let constantInputs = ''
  let constantOutputs = ''
  let questionInputs = ''
  let questionOutputs = ''
  // these variables are the <Properties> node broken into three sections
  const propertiesTopXml = `<Properties>
    <Memory default="True" />
    <GlobalRecordLimit value="0" />
    <TempFiles default="True" />
    <Annotation on="True" includeToolName="False" />
    <ConvErrorLimit value="10" />
    <ConvErrorLimit_Stop value="False" />
    <CancelOnError value="False" />
    <DisableBrowse value="False" />
    <EnablePerformanceProfiling value="False" />
    <DisableAllOutput value="False" />
    <ShowAllMacroMessages value="False" />
    <ShowConnectionStatusIsOn value="True" />
    <ShowConnectionStatusOnlyWhenRunning value="True" />
    <ZoomLevel value="0" />
    <LayoutType>Horizontal</LayoutType>`
  const propertiesMiddleXml = `<MetaInfo>
    <NameIsFileName value="True" />
    <Name>${ToolName}_Engine</Name>
    <Description />
    <RootToolName />
    <ToolVersion />
    <ToolInDb value="False" />
    <CategoryName />
    <SearchTags />
    <Author />
    <Company />
    <Copyright />
    <DescriptionLink actual="" displayed="" />
    <Example>
    <Description />
    <File />
    </Example>
    </MetaInfo>
    <Events>
    <Enabled value="True" />
    </Events>
    <RuntimeProperties>
    <Actions />`
  const propertiesBottomXml = `<ModuleType>Macro</ModuleType>
    <MacroCustomHelp value="False" />
    <MacroDynamicOutputFields value="False" />
    <MacroImageStd value="39" />
    <MacroInputs />
    <MacroOutputs />
    <Wiz_CustomHelp value="False" />
    <Wiz_CustomGraphic value="False" />
    <Wiz_ShowOutput value="True" />
    <Wiz_OpenOutputTools>
    </Wiz_OpenOutputTools>
    <Wiz_OutputMessage />
    <Wiz_NoOutputFilesMessage />
    <Wiz_ChainRunWizard />
    </RuntimeProperties>
    </Properties>`

  // ** This section creates the array of arrays containing connection information
  // Pull input connection details into an array
  const inputNames = Object.keys(InputDetails)

  const newInputArray = (Object.keys(InputDetails).map((e, i) => [inputNames[i], InputDetails[e]]))
  // use this variable for looping
  const inputConnectionArray = []
  // store name and label of each connection in numeric order inside inputConnectionArray
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
  // use this variable for looping
  const outputConnectionArray = []
  // store name and label of each connection in numeric order inside inputConnectionArray
  for (let i = 1; i <= OutputConnections; i+=1) {
      let tempArray = []
      tempArray.push(i)
      newOutputArray.forEach((d) => {
        const [key, value] = d
        if (key.endsWith(`Name_${i}`)) tempArray.push(value)
        if (key.endsWith(`Label_${i}`)) tempArray.push(value)
      })
      outputConnectionArray.push(tempArray)
      tempArray = []
  }
  console.log('inputConnectionArray: ', inputConnectionArray)
  console.log('outputConnectionArray: ', outputConnectionArray)
  // ** This section are the functions that create the nodes for input and outputs within the <Nodes> parent
  // this function creates the Macro Input nodes and concats them into nodeInputs
  // inputConnections iterates the for loop and inputConnectionArr contains the input information needed
  const createNodeInputXml = (inputConnections, inputConnectionArr) => {
    for (let i = 0; i < inputConnections; i++) {
    const node = builder.create('Node').att('ToolID', i+2)
      .ele('GuiSettings', { Plugin: 'AlteryxBasePluginsGui.MacroInput.MacroInput'})
        .ele('Position', { x: 138, y: 66*(i+1)}).up()
      .up()
      .ele('Properties')
        .ele('Configuration')
          .ele('UseFileInput', { value: 'False'}).up()
          .ele('Name', inputConnectionArr[i][1]).up()
          .ele('Abbrev', inputConnectionArr[i][2]).up()
          .ele('ShowFieldMap', { value: 'True'}).up()
          .ele('Optional', { value: 'False'}).up()
          .ele('TextInput')
            .ele('Configuration')
              .ele('NumRows', { value: 0}).up()
              .ele('Fields').up()
              .ele('Data').up()
          .up()
          .up()
          .up()
        .ele('Annotation', { DisplayMode: 0 })
          .ele('Name').up()
          .ele('DefaultAnnotationText').up()
          .ele('Left', { value: 'True' }).up()
          .up()
          .up()
      .ele('EngineSettings', { EngineDll: 'AlteryxBasePluginsEngine.dll', EngineDllEntryPoint: 'AlteryxMacroInput' })
      .end({pretty: 'True'})

      nodeInputs += node
    }
    return nodeInputs
  }

  // this function creates the Macro Output nodes and concats them into nodeInputs
  // outputConnections iterates the for loop and outputConnectionArr contains the input information needed
  const createNodeOutputXml = (outputConnections, outputConnectionArr) => {
    for (let i = 0; i < outputConnections; i++) {
    const node = builder.create('Node').att('ToolID', i+7)
      .ele('GuiSettings', { Plugin: 'AlteryxBasePluginsGui.MacroOutput.MacroOutput'})
        .ele('Position', { x: 338, y: 66*(i+1)}).up()
      .up()
      .ele('Properties')
        .ele('Configuration')
          .ele('Name', outputConnectionArr[i][1]).up()
          .ele('Abbrev', outputConnectionArr[i][2]).up().up()        
        .ele('Annotation', { DisplayMode: 0 })
          .ele('Name').up()
          .ele('DefaultAnnotationText').up()
          .ele('Left', { value: 'False' }).up()
          .up()
          .up()
      .ele('EngineSettings', { EngineDll: 'AlteryxBasePluginsEngine.dll', EngineDllEntryPoint: 'AlteryxMacroOutput' })
      .end({pretty: 'True'})

      nodeOutputs += node
    }
    return nodeOutputs
  }

  // create node for Tab tool
  const nodeTab = builder.create('Node').att('ToolID', 1)
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
    .end({pretty: 'True'})

  // this function creates the Constant input nodes and concats them into constantInputs
  // inputConnections iterates the for loop and inputConnectionArr contains the input information needed
  const createConstantInputsXml = (inputConnections, inputConnectionArr) => {
    for (let i = 0; i < inputConnections; i++) {
    const node = builder.create('Constant')
          .ele('Namespace', 'Question').up()
          .ele('Name', inputConnectionArr[i][1]).up()
          .ele('Value').up()
          .ele('IsNumeric', { value: 'False'}).up()
      .end({pretty: 'True'})

      constantInputs += node
    }
    return constantInputs
  }

  // this function creates the Constant input nodes and concats them into constantInputs
  // inputConnections iterates the for loop and inputConnectionArr contains the input information needed
  const createConstantOutputsXml = (outputConnections, outputConnectionArr) => {
    for (let i = 0; i < outputConnections; i++) {
    const node = builder.create('Constant')
          .ele('Namespace', 'Question').up()
          .ele('Name', outputConnectionArr[i][1]).up()
          .ele('Value').up()
          .ele('IsNumeric', { value: 'False'}).up()
      .end({pretty: 'True'})

      constantOutputs += node
    }
    return constantOutputs
  }

  // this function creates the Question input nodes and concats them into questionInputs
  // inputConnections iterates the for loop and inputConnectionArr contains the input information needed
  const createQuestionInputsXml = (inputConnections, inputConnectionArr) => {
    for (let i = 0; i < inputConnections; i++) {
    const node = builder.create('Question')
          .ele('Type', 'MacroInput').up()
          .ele('Description', '').up()
          .ele('Name', inputConnectionArr[i][1]).up()
          .ele('ToolId', { value: i+2}).up()
      .end({pretty: 'True'})

      questionInputs += node
    }
    return questionInputs
  }

  // this function creates the Question output nodes and concats them into questionOutputs
  // inputConnections iterates the for loop and inputConnectionArr contains the input information needed
  const createQuestionOutputsXml = (outputConnections, outputConnectionArr) => {
    for (let i = 0; i < outputConnections; i++) {
    const node = builder.create('Question')
          .ele('Type', 'MacroOutput').up()
          .ele('Description', '').up()
          .ele('Name', outputConnectionArr[i][1]).up()
          .ele('ToolId', { value: i+7}).up()
      .end({pretty: 'True'})

      questionOutputs += node
    }
    return questionOutputs
  }

  // ** This section invokes the create nodes functions and updates the node stores
  createNodeInputXml(InputConnections, inputConnectionArray) 
  createNodeOutputXml(OutputConnections, outputConnectionArray)
  createConstantInputsXml(InputConnections, inputConnectionArray)
  createConstantOutputsXml(OutputConnections, outputConnectionArray)
  createQuestionInputsXml(InputConnections, inputConnectionArray)
  createQuestionOutputsXml(OutputConnections, outputConnectionArray)

  // ** This section concats each section of the xml
  let nodesAll = '<Nodes>'
  nodesAll += nodeTab
  nodesAll += nodeInputs
  nodesAll += nodeOutputs
  nodesAll += '</Nodes>'
  const finalNodes = nodesAll.replace(/<\?xml version="1.0"\?>/g, '')

  let constantsAll = '<Constants>'
  constantsAll += constantInputs
  constantsAll += constantOutputs
  constantsAll += '</Constants>'
  const finalConstants = constantsAll.replace(/<\?xml version="1.0"\?>/g, '')

  let questionsAll = `<Questions>
    <Question>
    <Type>Tab</Type>
    <Description>Questions</Description>
    <Name>Tab (1)</Name>
    <ToolId value="1" />
    <Questions>`
  questionsAll += questionInputs
  questionsAll += questionOutputs
  questionsAll += '</Questions></Question></Questions>'
  const finalQuestions = questionsAll.replace(/<\?xml version="1.0"\?>/g, '')

  // ** This section does the final concats of the entire AlteryxDocument xml
  let finalProperties = propertiesTopXml
  finalProperties += finalConstants
  finalProperties += propertiesMiddleXml
  finalProperties += finalQuestions
  finalProperties += propertiesBottomXml
  let alteryxDocumentXml = `<?xml version="1.0"?>
    <AlteryxDocument yxmdVer="11.3">`
  alteryxDocumentXml += finalNodes
  alteryxDocumentXml += finalProperties
  alteryxDocumentXml += '</AlteryxDocument>'

  fs.writeFile(engineYxmcPath, alteryxDocumentXml, (err) => {
    if (err) reject(err)
    console.log(`${engineYxmcPath} has been created.`)
    const inputResult = result
    inputResult.engineYxmcPath = engineYxmcPath
    resolve(inputResult)
  })
})