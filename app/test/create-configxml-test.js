const configXml = require('../create-configxml.js')
const assert = require('assert')
const fs = require('fs')

// hard-coded inputs for testing
const result = {
    ToolName: 'tool name',
    Description: 'tool description',
    Version: 'tool version',
    Category: 'tool category',
    Author: 'author',
    IconPath: 'icon_path.png',
    ToolDirectory: __dirname
}

// nodes to check
const nodes = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<AlteryxJavaScriptPlugin>',
    '<Properties>',
    '<MetaInfo>',
    '<Name>',
    '<Description>',
    '<ToolVersion>',
    '<CategoryName>',
    '<Author>',
    '<Icon>'
]

// function that loads created Config.xml file, checks the file for each node, and runs assert.equal test
const testNodes = () => {
    console.log('\nTest Results:')
    const ConfigXmlFile = fs.readFileSync('Config.xml', 'utf8')

    nodes.forEach((d) => {
        const checkNode = ConfigXmlFile.includes(d)
        // error message only shows if assert.equal does not pass
        assert.equal(checkNode, true, `FAIL: ${d} node is missing from Config.xml`)
        if (checkNode) { console.log(`  ${d} node exists`) }
    })
}

// promise chain that creates Config.xml and then runs assert tests
configXml.createConfigXml(result)
         .then(testNodes)
         