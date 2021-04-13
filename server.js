const app = require('./src/config/custom-express')

app.listen(3000, function () {
  console.log("servidor rodando na porta 3000");
}); //essa função inicia o servidor e envia mensagem informando que ele foi inicializado.


