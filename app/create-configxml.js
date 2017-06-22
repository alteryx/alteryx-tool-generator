// this module creates Config.xml, which contains the metadata for the tool's popup when installing through a YXI
const fs = require('fs')
const builder = require('xmlbuilder')

exports.createConfigXml = (result) => new Promise((resolve, reject) => {
    const name = result.ToolName
    const description = result.Description
    const toolVersion = result.Version
    const categoryName = result.Category
    const author = result.Author
    const icon = result.IconPath
    const configXmlPath = `${result.ToolDirectory}\\Config.xml`

    // build and store the xml inside a variable
    const xml = builder.create('AlteryxJavaScriptPlugin', {encoding: 'UTF-8'})
        .ele('Properties')
            .ele('MetaInfo')
                .ele('Name', name).up()
                .ele('Description', description).up()
                .ele('ToolVersion', toolVersion).up()
                .ele('CategoryName', categoryName).up()
                .ele('Author', author).up()
                .ele('Icon', icon)
        .end({ pretty: true});

    // writes the actual xml file with the path and xml as inputs
    fs.writeFile(configXmlPath, xml, (err) => {
        if (err) reject(err)
        console.log('Config.xml has been created.')
        const inputResult = result
        inputResult.ConfigXml = configXmlPath
        resolve(inputResult)
    })
})
