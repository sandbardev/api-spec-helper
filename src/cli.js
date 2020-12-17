const inquirer = require('inquirer');
const arg = require('arg');
const status = require('./http-status-codes.json')

module.exports = generateStub, addPath, help;

process.on('exit', (code) => {
  if (code != 0) {
    console.log(`About to exit with code: ${code}`)
  };
});

const args = arg({
  // types
  '--generate-stub': Boolean,
  '--add-path': Boolean,
  '--help': Boolean,
  '--responses': String,
  '--tag': String,
  '--paths': String,
  '--methods': String,
  '--file': String,

  // aliases
  '-h': '--help',
})


function splitInput(input){
  return input.split(',')
}

function checkForFile(){
  if (!args['--file']) {
    console.log('Error: \'--file\' argument not found.')
    process.exit(1)
  }
}

function help(){
  let message = `OAS Helper command references:

  -h                  --help        Display this help message.
  
  --generate-stub                   Generates a barebones OAS3 file. 
  --add-path                        Adds routes to specific paths. Expects arguments:
    --paths=users,estates           Specify which paths will be documented.
    --tag='Admin Panel'             Specify a tag to the generated routes.
    --methods=GET,POST,PUT,DELETE   Specify which methods will be generated. Defaults to all 4.
    --responses=200,401,403,404     Specify HTTP status codes for responses. Defaults only to 200.
  
  --file=swagger.json             Specify output file. Mandatory argument.` 
    console.log(message)
    process.exit(0)
}

function generateStub(){
  checkForFile()
  let fileExt = args['--file'].split('/').pop().split('.')[1]

  console.log('generating stub file...')
  process.exit(0)
}

function createResponseObject(code){
  return `"${code}": {
    "description": "${status[code]}"
  },`
}

function createMethodObject(method){
  return `"${method}": {

  }`
}

function addPath(){
  checkForFile()
  let fileExt = args['--file'].split('/').pop().split('.')[1]

  if (args['--tag']) {
    let tag = args['--tag']
  }
  
  if (args['--paths']) {
    let paths = splitInput(args['--paths'])
  }
  
  if (args['--methods']) {
    let methods = splitInput(args['--methods'])
  }
  
  if (args['--responses']) {
    let responses = splitInput(args['--responses'])
  }
  
  if (!args['--file']) {
    console.log('Error: \'--file\' argument not found.')
    process.exit(1)
  }
  console.log('adding paths...')
  process.exit(0)
};



if (args['--help']) help()
if (args['--generate-stub']) generateStub()
console.log(createResponseObject(200))
if (args['--add-path']) addPath()