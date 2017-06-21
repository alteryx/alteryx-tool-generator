// this module creates Config.xml, which contains the metadata for the tool's popup when installing through a YXI
const fs = require('fs')
const path = require('path')
const builder = require('xmlbuilder');

// *** this section will load the stored values from the JSON object

exports.createConfigXml = (result) => new Promise((resolve, reject) => {
    // temp hard coded input values. The actual values will come from a JSON object.
    const name = result.ToolName
    const description = result.Description
    const toolVersion = result.Version
    const categoryName = result.Category
    const author = result.Author
    const icon = result.IconPath
    // const configXmlPath = ``

    var xml = builder.create('AlteryxJavaScriptPlugin', {encoding: 'UTF-8'})
        .ele('Properties')
            .ele('MetaInfo')
                .ele('Name', name).up()
                .ele('Description', description).up()
                .ele('ToolVersion', toolVersion).up()
                .ele('CategoryName', categoryName).up()
                .ele('Author', author).up()
                .ele('Icon', icon)
        .end({ pretty: true});

    // need to create relative path for file creation
    fs.writeFile('Config.xml', xml, (err) => {
        if (err) reject(err)
        console.log('Config.xml has been saved')
        // const inputResult = result
        // inputResult.ConfigXml = configXmlPath
        // resolve(inputResult)
    })
})
