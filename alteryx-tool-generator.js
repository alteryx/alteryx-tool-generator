// Alteryx
// (c) 2017

const fs = require('fs')
const path = require('path')
const argv = require('minimist')(process.argv.slice(2))
const program = require('commander')
const prompt = require('prompt')
const colors = require('colors')

program
  .version('v1.0.0')
  // .option('-p, --parameter', 'add a parameter and description')
  .parse(process.argv)

let userInput = {}

const schema = {
  properties: {
	// Example: {
	//     description: 'Enter your password',     // Prompt displayed to the user. If not supplied name will be used.
	//     type: 'string',                 // Specify the type of input to expect.
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
    	type: 'string',
    	required: true
    },
    RootToolName: {
    	description: 'Root Tool Name',
    	type: 'string',
    	required: true
    },
    Version: {
    	description: 'Tool Version',
    	type: 'number',
    	required: false,
    	default: 1
    },
    Author: {
	  	description: 'Author',
	    pattern: /^[a-zA-Z\s\-]+$/,
	    message: 'Author must be only letters, spaces, or dashes',
	    required: false
    },
    Company: {
    	description: 'Company',
    	type: 'string',
    	required: false
    },
    Copyright: {
    	description: 'Copyright',
    	type: 'string',
    	required: false
    },
    Category: {
    	description: 'Category',
    	type: 'string',
    	required: false
    },
    SearchTags: {
    	description: 'Search Tags - separate by commas',
    	type: 'string',
    	required: false
    },
    Description: {
    	description: 'Description',
    	type: 'string',
    	required: false
    },
    DescriptionLink: {
    	description: 'Description Link',
    	type: 'string',
    	required: false
    },
    Backend: {
    	description: 'Will the engine for your tool be a macro (M) or JavaScript (J) file?',
    	type: 'string',
    	required: true
    },
    IconPath: {
    	description: 'Path to Icon image file',
    	type: 'string',
    	required: false,
    	default: 'default_icon.png'
    },
    InputConnections: {
    	description: 'Number of input connections',
    	type: 'number',
    	required: true
    },
    OutputConnections: {
    	description: 'Number of output connections',
    	type: 'number',
    	required: true
    }
  }
}

console.log('\nEnter the following to configure your project...\n')
prompt.message = '' // removes prompt: from the front of each question
prompt.start()

prompt.get(schema, function (err, result) {
  userInput = result
  console.log('\nUser Inputs:\n')
  console.log(JSON.stringify(userInput, null, 4))
})

let inputConnections = {}

const inputSchema = {
  properties: {
    InputConnectionLabel: {
    	description: '',
    	type: 'string',
    	required:
    },
    InputConnectionName: {
    	description: '',
    	type: 'string',
    	required:
    },
  }
}

let outputConnections = {}

const outputSchema = {
  properties: {
    OutputConnectionLabel: {
    	description: '',
    	type: 'string',
    	required:
    },
    OutputConnectionName: {
    	description: '',
    	type: 'string',
    	required:
    },
  }
}