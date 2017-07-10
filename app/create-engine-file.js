const engineHtml = require('./create-engine-html.js')
const engineYxmc = require('./create-engine-yxmc.js')

exports.creatEngineFile = (result) => new Promise((resolve, reject) => {
  if (result === null) reject(console.error('createEngineFile: input undefined'))
  const { Backend } = result
  if (Backend.toLowerCase() === 'j') resolve(engineHtml.createEngineHTML(result))
  if (Backend.toLowerCase() === 'm') resolve(engineYxmc.createEngineYxmc(result))
})