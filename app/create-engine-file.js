const engineHtml = require('./create-engine-html.js')
// placeholder to import create-engine-yxmc.js. MUST UPDATE
// const engineYxmc = require('./create-engine-yxmc.js')

exports.creatEngineFile = (result) => new Promise((resolve, reject) => {
  if (result === null) reject(console.error('createEngineFile: input undefined'))
  const { Backend } = result
  if (Backend.toLowerCase() === 'j') resolve(engineHtml.createEngineHTML(result))
  if (Backend.toLowerCase() === 'm') {
    // update this section when create-engine-yxmc.js is created
    console.log('Engine YXMC Placeholder')
    resolve(result)
  }
})