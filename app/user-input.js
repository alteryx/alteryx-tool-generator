const prompt = require('prompt')

exports.getUserInput = () => new Promise((resolve, reject) => {
  const schema = {
    properties: {
      ToolName: {
        description: 'Tool Name',
        pattern: /^[a-zA-Z\s\d.\-_]{1,100}$/,
        message: 'Tool Name is required. May only contain letters, numbers, spaces, periods, underscores, or dashes and be 100 characters or less.',
        required: true
      },
      RootToolName: {
        description: 'Root Tool Name',
        pattern: /^[a-zA-Z\s\d.\-_]{1,100}$/,
        message: 'Root Tool Name is required. May only contain letters, numbers, spaces, periods, underscores, or dashes and be 100 characters or less.',
        required: true
      },
      Version: {
        description: 'Tool Version',
        pattern: /^[\d]{0,25}$/,
        message: 'Must be written as a whole number and be 25 characters or less.',
        default: 1,
        required: false
      },
      Author: {
        description: 'Author',
        pattern: /^[a-zA-Z\s\d.\-_]{1,150}$/,
        message: 'Author is required. May only contain letters, numbers, spaces, periods, underscores, or dashes and be 150 characters or less.',
        required: true
      },
      Company: {
        description: 'Company',
        pattern: /^[a-zA-Z\s\d.\-_]{0,150}$/,
        message: 'May only contain letters, numbers, spaces, periods, underscores, or dashes and be 150 characters or less.',
        required: false
      },
      Copyright: {
        description: 'Copyright',
        pattern: /^[\d]{4}$/,
        message: 'May only contain numbers and be 4 characters long.',
        required: false
      },
      Category: {
        description: 'Category',
        pattern: /^[a-zA-Z\s]{0,100}$/,
        message: 'May only contain letters or spaces and be 100 characters or less.',
        required: false
      },
      Description: {
        description: 'Description',
        pattern: /^[a-zA-Z\s\d.\-_]{0,1000}$/,
        message: 'May only contain letters, numbers, spaces, periods, underscores, or dashes and be 1,000 characters or less.',
        required: false
      },
      SearchTags: {
        description: 'Search Tags (comma separated)',
        pattern: /^[a-zA-Z\s,]{0,200}$/,
        message: 'May only contain letters, spaces, or commas and be 200 characters or less.',
        required: false
      },
      Backend: {
        description: 'Will the engine for your tool be a macro (M) or JavaScript (J) file?',
        pattern: /M{1}|J{1}|m{1}|j{1}/,
        message: 'Please enter M (macro) or J (JavaScript).',
        required: true
      },
      IconPath: {
        description: 'Path to Icon image file',
        pattern: /default_icon.png|[A-Z]:\\[a-zA-Z\s\d.\-_\\]{0,246}.png$|[A-Z]:\\[a-zA-Z\s\d.\-_\\]{0,246}.PNG$/,
        message: 'Please select a png image file. Path must be 250 characters or less.',
        default: 'default_icon.png',
        required: false
      },
      InputConnections: {
        description: 'Number of input connections',
        pattern: /^[0-5]{1}$/,
        message: 'Must be written as a whole number between 0 and 5.',
        required: true
      },
      OutputConnections: {
        description: 'Number of output connections',
        pattern: /^[0-5]{1}$/,
        message: 'Must be written as a whole number between 0 and 5.',
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
        pattern: /^[a-zA-Z\s\d.\-_]{1,100}$/,
        message: 'May only contain letters, numbers, spaces, periods, underscores, or dashes and be 100 characters or less.',
        type: 'string',
        required: false
      }
      inputSchema.properties[name] = nameValue

      const label = `InputConnectionLabel_${i}`
      const labelValue = {
        description: `Input Connection Label ${i}`,
        pattern: /^[a-zA-Z\d]{1}$/,
        message: 'May only contain one letter or number.',
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
        pattern: /^[a-zA-Z\s\d.\-_]{1,100}$/,
        message: 'May only contain letters, numbers, spaces, periods, underscores, or dashes and be 100 characters or less.',
        type: 'string',
        required: false
      }
      outputSchema.properties[name] = nameValue

      const label = `OutputConnectionLabel_${i}`
      const labelValue = {
        description: `Output Connection Label ${i}`,
        pattern: /^[a-zA-Z\d]{1}$/,
        message: 'May only contain one letter or number.',
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
