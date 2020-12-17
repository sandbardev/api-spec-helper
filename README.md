# api-spec-helper

[Github](https://github.com/sandobits/api-spec-helper)

`api-spec-helper` is a CLI tool meant to help you generate API documentation based on the [OAS3](https://swagger.io/resources/open-api/).  
It generates simple stubs for user-specified paths, allowing you to add methods and responses to your requests automatically. You will still need to customize requestBody properties, request parameters and response schemas.
It is currently in the early stages of development, and only supports the JSON formatting style.

## Installation

Install globally on your computer:

``` bash
  npm install -g api-spec-helper
```

## Usage

Run `api-spec-helper --help` to get a list of commands and arguments.

``` txt
api-spec-helper command references:
  -h      --help                        Display this help message.
  
  -a      --add-path                    Adds routes to specific paths. Expects arguments:
  -p        --paths=users,estates         Specify which paths will be documented.
  -t        --tag='Admin Panel'           Specify a tag to the generated routes.
  -m        --methods=GET,PUT,DELETE      Specify which methods will be generated. Defaults to all 4.
  -r        --responses=200,203           Specify HTTP status codes for responses. Defaults to 200, 204, 401 & 404.
```

### Example

``` bash
  api-spec-helper -a -p users,estates -t 'Admin Panel' -m GET,POST -r 200
```

will be equivalent to

``` bash
  api-spec-helper --add-path --paths=users,estates --tag='Admin Panel' --methods=GET,POST --responses=200
```

and will generate the following json in stdout:

```json
"/users": {
    "get": {
      "tags": ["Admin Panel"],
      "summary": "",
      "responses": {
        "200": {"description": "OK"},
      },
  "post": {
      "tags": ["Admin Panel"],
      "summary": "",
      "requestBody": {
      "description": "",
      "content": {

      },
    },
      "responses": {
        "200": {"description": "OK"},
      },
},
"/estates": {
    "get": {
      "tags": ["Admin Panel"],
      "summary": "",
      "responses": {
        "200": {"description": "OK"},
      },
  "post": {
      "tags": ["Admin Panel"],
      "summary": "",
      "requestBody": {
      "description": "",
      "content": {

      },
    },
      "responses": {
        "200": {"description": "OK"},
      },
},
```

You can choose to send your output for a specific text file or simply copy-paste the stubs on your swagger.json file. Then, adapt and add content as necessary.

## Contributing

Please visit the [Contributing Guide](https://github.com/sandobits/api-spec-helper/Contributing.md).

## License

MIT
