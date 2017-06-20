const prompt = require('prompt')

exports.getUserInput = () => new Promise((resolve, reject) => {
  const schema = {
    properties: {
      ToolName: {
        description: 'Tool Name',
        pattern: /^[a-zA-Z\s\-\d]+$/,
          // letters, numbers, spaces, periods, dashes, underscores,
        message: 'Tool Name must be only letters, numbers, spaces, or dashes',
        required: true
      },
      RootToolName: {
        description: 'Root Tool Name',
        pattern: /^[a-zA-Z\s\-\d]+$/,
        message: 'Tool Name must be only letters, numbers, spaces, or dashes',
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
        pattern: /^[a-zA-Z\s-]+$/,
        message: 'Author must be only letters, spaces, or dashes',
        required: true
      },
      Company: {
        description: 'Company',
        pattern: /^[a-zA-Z\s\-\d]+$/,
        message: 'Tool Name must be only letters, numbers, spaces, or dashes',
        required: false
      },
      Copyright: {
        description: 'Copyright',
        pattern: /^[a-zA-Z\s\-\d]+$/,
        message: 'Tool Name must be only letters, numbers, spaces, or dashes',
        required: false
      },
      Category: {
        description: 'Category',
        pattern: /^[a-zA-Z\s\-\d]+$/,
        message: 'Tool Name must be only letters, numbers, spaces, or dashes',
        required: false
      },
      Description: {
        description: 'Description',
        required: false
      },
      SearchTags: {
        description: 'Search Tags - separate by commas',
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
        pattern: /(.png$)/,
        message: 'Please select a png image file.',
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

  console.log('\nEnter the following to configure your project...\n')
  prompt.message = '' // removes prompt: from the front of each question

  prompt.start()
  prompt.get(schema, (err, result) => {
    if (err) {
      reject(err)
      return
    }
    const userInput = result

    const inputSchema = {
      'properties': {}
    }

    for (let i = 1; i <= userInput.InputConnections; i += 1) {
      const name = `InputConnectionName_${i}`
      const nameValue = {
        description: `Input Connection Name ${i}`,
        type: 'string',
        required: false
      }
      inputSchema.properties[name] = nameValue

      const label = `InputConnectionLabel_${i}`
      const labelValue = {
        description: `Input Connection Label ${i}`,
        type: 'string',
        required: false
      }
      inputSchema.properties[label] = labelValue
    }

    const outputSchema = {
      'properties': {}
    }

    for (let i = 1; i <= userInput.OutputConnections; i += 1) {
      const name = `OutputConnectionName_${i}`
      const nameValue = {
        description: `Output Connection Name ${i}`,
        type: 'string',
        required: false
      }
      outputSchema.properties[name] = nameValue

      const label = `OutputConnectionLabel_${i}`
      const labelValue = {
        description: `Output Connection Label ${i}`,
        type: 'string',
        required: false
      }
      outputSchema.properties[label] = labelValue
    }

    if (userInput.InputConnections > 0) {
      console.log(`\n${userInput.InputConnections} input connections specified. Please enter name and label for each (Optional).\n`)
    }
    // prompt.get needs to be nested otherwise it acts weird and results in duplicate entries
    prompt.get(inputSchema, (inputErr, inputResult) => {
      userInput.InputDetails = inputResult
      if (userInput.OutputConnections > 0) {
        console.log(`\n${userInput.OutputConnections} output connections specified. Please enter name and label for each (Optional).`)
      }
      prompt.get(outputSchema, (outputErr, outputResult) => {
        userInput.OutputDetails = outputResult
        console.log('\nProject Configuration:\n')
        console.log(JSON.stringify(userInput, null, 4))
        resolve(userInput)
      })
    })
  })
})
