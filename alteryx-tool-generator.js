// Alteryx
// (c) 2017

const fs = require('fs')
const path = require('path')
const argv = require('minimist')(process.argv.slice(2))
const program = require('commander')
const prompt = require('prompt')
const colors = require('colors')
const os = require('os')

program
  .version('v1.0.0')
  // .option('-p, --parameter', 'add a parameter and description')
  .parse(process.argv)

const schema = {
  properties: {
	// Example: {
	//     description: 'Enter your password',     // Prompt displayed to the user. If not supplied name will be used.
	//     pattern: /^\w+$/,                  // Regular expression that input must be valid against.
	//     message: 'Password must be letters', // Warning message to display if validation fails.
	//     hidden: true,                        // If true, characters entered will either not be output to console or will be outputed using the `replace` string.
	//     replace: '*',                        // If `hidden` is set it will replace each hidden character with the specified string.
	//     default: 'lamepassword',             // Default value to use if no value is entered.
	//     required: true                        // If true, value entered must be non-empty.
	//     before: function(value) { return 'v' + value; } // Runs before node-prompt callbacks. It modifies user's input
	// },
    ToolName: {
      description: 'Tool Name',
      pattern: /^[a-zA-Z\s\-]+$/,
      message: 'Tool Name must be only letters, spaces, or dashes',
      required: true
    },
    NameIsFileName: {
    	description: 'Is the tool name the same as the file name? (T/F)',
    	pattern: /T{1}|F{1}/,
    	message: 'Please enter T (true) or F (false).',
    	required: true
    },
    RootToolName: {
    	description: 'Root Tool Name',
    	// pattern: / /,
    	// message: '',
	    required: true
    },
    Version: {
    	description: 'Tool Version',
    	pattern: /[\d]/,
    	message: 'Must be written as a whole number.',
    	default: 1,
    	required: false
    },
    Author: {
      description: 'Author',
      pattern: /^[a-zA-Z\s\-]+$/,
      message: 'Author must be only letters, spaces, or dashes',
      required: false
    },
    Company: {
    	description: 'Company',
    	// pattern: / /,
    	// message: '',
    	required: false
    },
    Copyright: {
    	description: 'Copyright',
    	// pattern: / /,
    	// message: '',
    	required: false
    },
    Category: {
    	description: 'Category',
    	// pattern: / /,
    	// message: '',
    	required: false
    },
    SearchTags: {
    	description: 'Search Tags - separate by commas',
    	// pattern: / /,
    	// message: '',
    	required: false
    },
    Description: {
    	description: 'Description',
    	// pattern: / /,
    	// message: '',
    	required: false
    },
    DescriptionLink: {
    	description: 'Description Link',
    	// pattern: / /,
    	// message: '',
    	required: false
    },
    Backend: {
    	description: 'Will the engine for your tool be a macro (M) or JavaScript (J) file?',
    	pattern: /M{1}|J{1}/,
    	message: 'Please enter M (macro) or J (JavaScript).',
    	required: true
    },
    IconPath: {
    	description: 'Path to Icon image file',
    	pattern: /(.png$)|(.jpeg$)|(.jpg$)/,
    	message: 'Please select an image file.  File extension must be .png, .jpg, or .jpeg.',
    	default: 'default_icon.png',
    	required: false
    },
    InputConnections: {
    	description: 'Number of input connections',
    	pattern: /\d/,
    	message: 'Must be written as a whole number.',
    	required: true
    },
    OutputConnections: {
    	description: 'Number of output connections',
    	pattern: /\d/,
    	message: 'Must be written as a whole number.',
    	required: true
    }
  }
}

let toolDirectory = ''

console.log('\nEnter the following to configure your project...\n')
prompt.message = '' // removes prompt: from the front of each question

let userInput = {}
let inputConnections = []
let outputConnections = []

prompt.start()
prompt.get(schema, function (err, result) {
  const userInput = result
  const folderName = userInput.ToolName + '_v' + userInput.Version
  toolDirectory = 'C:\\Users\\' + os.userInfo().username +  '\\AppData\\Roaming\\Alteryx\\Tools\\' + folderName
  fs.mkdir(toolDirectory, function(err) {
    if (err) {
      return console.error(err)
    }
    console.log(folderName + ' folder has been created')
  })
  console.log('\nUser Inputs:\n')
  console.log(JSON.stringify(userInput, null, 4))

  let inputSchema = {
  	'properties': {}
  }

  for (let i = 1; i <= userInput.InputConnections; i++) {
  	let name = 'InputConnectionName_' + i
  	let nameValue = {
  		description: 'Input Connection Name ' + i,
   		type: 'string',
  	 	required: false
  	}
  	inputSchema.properties[name] = nameValue

  	let label = 'InputConnectionLabel_' + i
  	let labelValue = {
   		description: 'Input Connection Label ' + i,
   		type: 'string',
  	 	required: false
  	}
  	inputSchema.properties[label] = labelValue
  }

  let outputSchema = {
  	'properties': {}
  }

  for (let i = 1; i <= userInput.OutputConnections; i++) {
  	let name = 'OutputConnectionName_' + i
  	let nameValue = {
  		description: 'Output Connection Name ' + i,
   		type: 'string',
  	 	required: false
  	}
  	outputSchema.properties[name] = nameValue

  	let label = 'OutputConnectionLabel_' + i
  	let labelValue = {
   		description: 'Output Connection Label ' + i,
   		type: 'string',
  	 	required: false
  	}
  	outputSchema.properties[label] = labelValue
  }

  userInput.InputConnections > 0 ? console.log(`\n${userInput.InputConnections} input connections specified. Please enter name and label for each (Optional).\n`) : ''
  // prompt.get needs to be nested otherwise it acts weird and results in duplicate entries
  prompt.get(inputSchema, function (err, result) {
  	inputConnections.push(result)
    userInput.OutputConnections > 0 ? console.log(`\n${userInput.OutputConnections} output connections specified. Please enter name and label for each (Optional).`) : ''
    prompt.get(outputSchema, function (err, result) {
      outputConnections.push(result)
    })
  })
})
