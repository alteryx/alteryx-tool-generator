const assert = require('chai').assert; // const assert = require('assert'); for not chai
const guiHTML = require('../create-gui-html.js')
// const path = require('path')
// const argv = require('minimist')(process.argv.slice(2))
const program = require('commander')
// const prompt = require('prompt')
// const colors = require('colors')
const input = require('../user-input.js')
const alteryxDir = require('../get-install-location.js')
const directory = require('../create-directory.js')
const engineHTML = require('../create-engine-html.js')

program
  .version('v1.0.0')
  // .option('-p, --parameter', 'add a parameter and description')
  .parse(process.argv)

  // Defining the test you want to run

  //




  // Results: better practice to call results separately from the tests
  sayHelloResult = app.sayHello();
  addNumbersResult = app.addNumbers(5,5);
  function tests(result) new Promise((resolve, reject) {
    describe('App',function(){
      describe('sayHello()', function(){
        it('sayHello should return hello', function(){
          // let result = sayHello();
          assert.equal(sayHelloResult,'hello');
        });

        it('sayHello should return type string ', function(){
          // let result = sayHello();
          assert.typeOf(sayHelloResult, 'string');
        });
      });
      describe('addNumbers()', function(){
        it('addNumbers should be above 5', function(){
          // let result = addNumbers(5,5);
          assert.isAbove(addNumbersResult,5);
        });

        it('addNumbers should return type number', function(){
          // let result = addNumbers(5,5);
          assert.typeOf(addNumbersResult, 'number');
        });
      });
    });
  });


input.getUserInput()
  .then(alteryxDir.getAlteryxInstallDirectory)
  .then(directory.createDirectory)
  .then(engineHTML.createEngineHTML)
  .then(guiHTML.createGuiHTML)
