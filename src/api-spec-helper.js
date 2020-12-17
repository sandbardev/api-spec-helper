#!/usr/bin/env node

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
  '--help': Boolean,
  '--generate-stub': Boolean,
  '--add-path': Boolean,
  '--paths': String,
  '--tag': String,
  '--methods': String,
  '--responses': String,
  '--file': String,

  // aliases
  '-h': '--help',
  '-a': '--add-path',
  '-p': '--paths',
  '-t': '--tag',
  '-m': '--methods',
  '-r': '--responses',
  '-f': '--file',
  
})


function checkForFile(){
  if (!args['--file']) {
    console.log('Error: \'--file\' argument not found.')
    process.exit(1)
  }
}

function help(){
  let message = `api-spec-helper command references:
  -h      --help                        Display this help message.
  
  -a      --add-path                    Adds routes to specific paths. Expects arguments:
  -p        --paths=users,estates         Specify which paths will be documented.
  -t        --tag='Admin Panel'           Specify a tag to the generated routes.
  -m        --methods=GET,PUT,DELETE      Specify which methods will be generated. Defaults to all 4.
  -r        --responses=200,203           Specify HTTP status codes for responses. Defaults to 200, 204, 401 & 404.\n` 
    
    console.log(message)
    process.exit(0)
}

function generateStub(){
  console.log('generating stub...')
  process.exit(0)
}

function createResponseObject(code){
  return `"${code}": {"description": "${status[code]}"},\n      `
}

function createMethodObject(method, responses){
  method = method.toLowerCase()
  let requestBody = ''

  function addRequestBody(){
    return `
      "requestBody": {
      "description": "",
      "content": {

      },
    },`
  }

  if (method === 'post' || method === 'put') requestBody = addRequestBody()

  let data =  `  "${method}": {
      "tags": ["${args['--tag']}"],
      "summary": "",${requestBody}
      "responses": {
        `

  for (let i = 0; i < responses.length; i++) {
    data = data + createResponseObject(responses[i])
  }

  return data+'},\n'
}

function addPath(path, methods, responses){
  let data = `"/${path}": {
  `
  for (let i = 0; i < methods.length; i++) {
    data = data + createMethodObject(methods[i], responses)
  }

  console.log(data+'},')
};

if (args['--help']) help()
if (args['--generate-stub']) generateStub()

if (args['--add-path']) {
  let paths = args['--paths'].split(',')

  let methods = ['GET', 'POST', 'PUT', 'DELETE'] 
  if (args['--methods']) methods = args['--methods'].split(',')

  let responses = ['200', '204', '404', '400'] 
  if (args['--responses']) responses = args['--responses'].split(',')

  for (let i = 0; i < paths.length; i++) {
    addPath(paths[i], methods, responses)
  }
}