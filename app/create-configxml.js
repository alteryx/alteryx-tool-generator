// this module creates Config.xml, which contains the metadata for the tool's popup when installing through a YXI
const fs = require('fs')
const builder = require('xmlbuilder')
const path = require('path')

exports.createConfigXml = (result) => new Promise((resolve, reject) => {
  const configXmlPath = `${result.ToolDirectory}\\Config.xml`
  const {
    ToolName,
    Description,
    Version,
    Category,
    Author,
    IconPNGPath
  } = result
  const iconPath = path.parse(IconPNGPath)

  // build and store the xml inside a variable
  const xml = builder.create('AlteryxJavaScriptPlugin', { encoding: 'UTF-8' })
    .ele('Properties')
      .ele('MetaInfo')
        .ele('Name', `${ToolName}`).up()
        .ele('Description', Description).up()
        .ele('ToolVersion', Version).up()
        .ele('CategoryName', Category).up()
        .ele('Author', Author).up()
        .ele('Icon', iconPath.base)
    .end({ pretty: true });

  // writes the actual xml file with the path and xml as inputs
  fs.writeFile(configXmlPath, xml, (err) => {
    if (err) reject(err)
    console.log(`${configXmlPath} has been created.`)
    const inputResult = result
    inputResult.ConfigXml = configXmlPath
    resolve(inputResult)
  })
})
