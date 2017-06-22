// Alteryx
// (c) 2017

// const path = require('path')
// const argv = require('minimist')(process.argv.slice(2))
const program = require('commander')
// const prompt = require('prompt')
// const colors = require('colors')
const input = require('./app/user-input.js')
const directory = require('./app/create-directory.js')
const engineHTML = require('./app/create-engine-html.js')
const guiHTML = require('./app/create-gui-html.js')
const configXml = require('./app/create-configxml.js')

program
  .version('v1.0.0')
  // .option('-p, --parameter', 'add a parameter and description')
  .parse(process.argv)

input.getUserInput()
  .then(directory.createDirectory)
  .then(engineHTML.createEngineHTML)
  .then(guiHTML.createGuiHTML)
  .then(configXml.createConfigXml)
