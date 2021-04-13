require('marko/node-require').install(); //para trabalhar com o node
require('marko/express'); //para trabalhar com o express

const express = require("express"); //importando o framework express baixado na aplicação
const app = express(); //como o express retorna uma função, chamamos a execução dela dentro de uma variável, para ser usada em nosso código
const methodOverride = require('method-override');

app.use('/estatico', express.static('src/app/public')) //criando rota para arquivos estaticos usando middleware 

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
    extended:true
})); 

app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method
      delete req.body._method
      return method
    }
  }));

const rotas = require('../app/rotas/rotas')
rotas (app) //o modulo de rotas recebe como parametro o objeto app, vindo do express
module.exports = app; // o que está guardando o objeto do express pra ser usado na aplicação
