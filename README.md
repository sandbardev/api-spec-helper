requisitos:

ser uma CLI e processar argumentos independente da ordem(
  eg (
    oashelper generate --resources /users/ /estates/ --methods GET POST PUT DELETE --responses 200 401 403 404 --tags 'Painel do Administrador' --file ./swagger.yml
  )
)

formatar ordenadamente um output referente a cada argumento presente(
  cada method especificado existirá em todos os recursos, 
  cada response especificada existirá em todos os métodos(rotas),
  a tag será aplicada a todas as rotas,
  rotas PUT e DELETE deverão appendar /:id no final da URL naturalmente
)

node src/cli.js --resources users,estates --methods GET,POST,PUT,DELETE --responses 200,401,402,403,404 
