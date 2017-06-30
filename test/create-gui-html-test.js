const assert = require('chai').assert; // const assert = require('assert'); for not chai
const guiHTML = require('../app/create-gui-html.js')
const fs = require('fs')


// What's the difference between assertion library, testing framework and testing environment in javascript?

// Assertion libraries are tools to verify that things are correct.This makes it a lot easier to test your code, so you don't have to do thousands of if statements.
// Testing frameworks are used to organize and execute tests. Mocha and Jasmine are two popular choices (and they're actually kinda similar)
// Testing Environments are the places where you run your tests .

// Defining the test you want to run
// 1. readGuiHTML should error if result is undefined
// 2. File path and file data should be stored in the user Object
// 3. readGuiHTML should resolve userObj
// 4. updateGuiHTML should error if input undefined
// 5. userObj.GuiHTMLData should contain updated title and script tags
// 6. updateGuiHTML should resolve user Object
// 7. writeUpdatedGuiHTML should error if result is undefined
// 8. HTML file was written to user directory
// 9. writeUpdatedGuiHTML should resolve user Object

const result = {
  ToolName: 'tool_name',
  Description: 'tool description',
  Version: '2',
  Category: 'tool category',
  Author: 'author',
  IconPath: 'icon_path.png',
  ToolDirectory: 'C:\\Users\\odembowski\\AppData\\Roaming\\Alteryx\\Tools\\tool_name_v2',
  AlteryxInstallDir: 'C:\\Program Files\\Alteryx\\bin'
}

// Results: better practice to call results separately from the tests
const guiHTMLResult = guiHTML.createGuiHTML(result).Promise
console.log(result.GuiHTMLData)
const fileName = `${result.ToolName}_v${result.Version}_Gui.html`
const fileData = fs.readFileSync(result.GuiHTMLPath)
const titlePattern = /<title>.*<\/title>/
const scriptPattern = /<script src=.*><\/script>/
const modifiedTitleTag = titlePattern.test(fileData)
const modifiedScriptTag = scriptPattern.test(fileData)

describe('readGuiHTML', function() {
  it('result is defined', function() {
    assert.isDefined(result)
    console.log('Result is defined')
  })
})

describe('updateGuiHTML', function() {
  it('updateGuiHTML should update title tags in userObj.GuiHTMLData', function() {
    assert.equal(modifiedTitleTag, true)
  })
  it('updateGuiHTML should update script tags in userObj.GuiHTMLData', function() {
    assert.equal(modifiedScriptTag, true)
  })
})

describe('writeUpdatedGuiHTML', function() {
  it('GuiHTMLPath should be stored in the user Object', function() {
    assert.propertyVal(result,'GuiHTMLPath' ,'C:\\Users\\odembowski\\AppData\\Roaming\\Alteryx\\Tools\\tool_name_v2\\tool_name_v2_Gui.html')
    console.log(`${result.GuiHTMLPath} is stored in GuiHTMLPath`)
  })
  it('GuiHTMLData should not be empty in user Object', function() {
    assert.isNotEmpty(result.GuiHTMLData, 'GuiHTMLData is not empty' )
    console.log('GuiHTMLData is not empty')
  })
  it(`${fileName} should not be empty`, function() {
    assert.isNotEmpty(fileData, `${fileName} is not empty` )
    console.log(`${fileName} is not empty` )
  })
})
