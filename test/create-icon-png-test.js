// const assert = require('chai').assert; // const assert = require('assert'); for not chai
// const iconPNG = require('../app/create-icon-png.js')
// const fs = require('fs')
//
//
// // story in rally
//
// // If icon path is provided, copy/paste into tools directory. If not, create default .png in tools directory.
// //
// // propose: connector cloud image as default .png, but speak with UX for default .png.
// //
// // AC
// // .png file exists in tools directory
// // if icon path provided, the .png file matches the file specified
//
// // Defining the test you want to run
// // 1. result is defined in readIconPNG
// // 2. File path should be stored in the user Object
// // 3. File Data should be stored in the user Object
// // 4. Tool Icon should exist in new path
//
//
// const result = {
//   ToolName: 'tool_name',
//   Description: 'tool description',
//   Version: '2',
//   Category: 'tool category',
//   Author: 'author',
//   IconPath: 'default_icon.png',
//   ToolDirectory: 'C:\\Users\\odembowski\\AppData\\Roaming\\Alteryx\\Tools\\tool_name_v2',
//   AlteryxInstallDir: 'C:\\Program Files\\Alteryx\\bin'
// }
//
// // Results: better practice to call results separately from the tests
// const iconPNGResult = iconPNG.createIconPNG(result).Promise
// const fileName = `${result.ToolName}_v${result.Version}_Icon.png`
// const fileData = fs.readFileSync(result.IconPNGPath)
//
// describe('readIconPNG', function() {
//   it('result is defined', function() {
//     assert.isDefined(result)
//     console.log('Result is defined')
//   })
// })
//
// describe('writeIconPNG', function() {
//   it('IconPNGPath should be stored in the user Object', function() {
//     assert.propertyVal(result,'IconPNGPath' ,'C:\\Users\\odembowski\\AppData\\Roaming\\Alteryx\\Tools\\tool_name_v2\\tool_name_v2_Icon.png')
//     console.log(`${result.IconPNGPath} is stored in IconPNGPath`)
//   })
//   it('GuiHTMLData should not be empty in user Object', function() {
//     assert.isNotEmpty(result.IconPNGData, 'GuiHTMLData is not empty' )
//     console.log('GuiHTMLData is not empty')
//   })
//   it(`${fileName} should not be empty`, function() {
//     assert.isNotEmpty(fileData, `${fileName} is not empty` )
//     console.log(`${fileName} is not empty` )
//   })
// })
