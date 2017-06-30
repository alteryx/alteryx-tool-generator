const toolNameConfigXml = require('../create-toolname-configxml.js')
const assert = require('assert')
const fs = require('fs')

// hard-coded inputs for testing
const result = {
  "ToolName": "toolName",
  "RootToolName": "root tool name",
  "Version": "1",
  "Author": "author",
  "Company": "company",
  "Copyright": "2017",
  "Category": "Connectors",
  "Description": "description",
  "SearchTags": "search tags",
  "Backend": "J",
  "IconPath": "default_icon.png",
  "InputConnections": "1",
  "OutputConnections": "2",
  "InputDetails": {
      "InputConnectionName_1": "NameA",
      "InputConnectionLabel_1": "A"
  },
  "OutputDetails": {
      "OutputConnectionName_1": "NameB",
      "OutputConnectionLabel_1": "B",
      "OutputConnectionName_2": "NameC",
      "OutputConnectionLabel_2": "C"
  },
  ToolDirectory: __dirname,
  engineDllEntryPoint: 'toolname\\SupportingMacros\\toolname-engine.yxmc',
  engineDll: 'Macro'
}

const resultNoInputDetails = {
  "ToolName": "toolName",
  "RootToolName": "root tool name",
  "Version": "1",
  "Author": "author",
  "Company": "company",
  "Copyright": "2017",
  "Category": "Connectors",
  "Description": "description",
  "SearchTags": "search tags",
  "Backend": "J",
  "IconPath": "default_icon.png",
  "InputConnections": "0",
  "OutputConnections": "2",
  "InputDetails": {},
  "OutputDetails": {
      "OutputConnectionName_1": "NameB",
      "OutputConnectionLabel_1": "B",
      "OutputConnectionName_2": "NameC",
      "OutputConnectionLabel_2": "C"
  },
  ToolDirectory: __dirname,
  engineDllEntryPoint: 'toolname\\SupportingMacros\\toolname-engine.yxmc',
  engineDll: 'Macro'
}

const resultNoOutputDetails = {
  "ToolName": "toolName",
  "RootToolName": "root tool name",
  "Version": "1",
  "Author": "author",
  "Company": "company",
  "Copyright": "2017",
  "Category": "Connectors",
  "Description": "description",
  "SearchTags": "search tags",
  "Backend": "J",
  "IconPath": "default_icon.png",
  "InputConnections": "1",
  "OutputConnections": "0",
  "InputDetails": {
    "InputConnectionName_1": "NameA",
    "InputConnectionLabel_1": "A"
  },
  "OutputDetails": {},
  ToolDirectory: __dirname,
  engineDllEntryPoint: 'toolname\\SupportingMacros\\toolname-engine.yxmc',
  engineDll: 'Macro'
}

// nodes to check
const nodes = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<AlteryxJavaScriptPlugin>',
  '<EngineSettings',
  '<Properties>',
  '<MetaInfo>',
  '<Name>',
  '<Description>',
  '<RootToolName>',
  '<ToolVersion>',
  '<CategoryName>',
  '<SearchTags>',
  '<Author>',
  '<Company>',
  '<Copyright>',
  '<GuiSettings',
  '<InputConnections',
  '<OutputConnections'
]

// function that loads created ToolNameConfig.xml file, checks the file for each node, and runs assert.equal test
const testNodes = () => {
  console.log('\nTest Results:')
  const toolNameConfigXmlFile = fs.readFileSync(`toolNameConfig.xml`, 'utf8')

  nodes.forEach((d) => {
    const checkNode = toolNameConfigXmlFile.includes(d)
    // error message only shows if assert.equal does not pass
    assert.equal(checkNode, true, `FAIL: ${d} node is missing from ToolNameConfig.xml`)
    if (checkNode) { console.log(`  ${d} node exists`) }
  })
}

// promise chain that creates ToolNameConfig.xml and then runs assert tests
toolNameConfigXml.createToolNameConfigXml(result)
  .then(testNodes)

toolNameConfigXml.createToolNameConfigXml(resultNoInputDetails)
  .then(testNodes)

toolNameConfigXml.createToolNameConfigXml(resultNoOutputDetails)
  .then(testNodes)
