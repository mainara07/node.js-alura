const db = require("../../config/database");
const LivroDao = require("../infra/livro-dao"); //importa a classe construída na Infra pra ser utilizada nas rotas

module.exports = (app) => {
  // método GET recebe dois parâmetro: o caminho que ele vai executar, e a função callback a ser executada quando o cliente fizer requisicao para o endereço do parametro
  app.get("/", function (req, resp) {
    resp.send(
      `<html><head> <meta charset="utf-8"</head> <body><h1> Você está na rota raiz </h1></body></html>`
    ); // envia a resposta a requisicao do usuário, neste caso um html estático
  });

  app.get("/livros", function (req, resp) {
    const livroDao = new LivroDao(db);
    livroDao
      .listaLivros()
      .then((livros) =>
        resp.marko(require("../views/livros/lista/lista.marko"), {
          livros: livros,
        })
      )
      .catch((erro) => console.log(erro));
  });

  app.get("/livros/form", function (req, resp) {
    resp.marko(require("../views/livros/form/form.marko"),  { livro: {}});
  });

  app.post('/livros', function(req, resp) {
    console.log(req.body);
    const livroDao = new LivroDao(db);
    livroDao.adicionaLivro(req.body)
            .then(resp.redirect('/livros'))
            .catch(erro => console.log(erro));
});

app.put('/livros', function(req, resp) {
  console.log(req.body);
  const livroDao = new LivroDao(db);
  livroDao.atualiza(req.body)
          .then(resp.redirect('/livros'))
          .catch(erro => console.log(erro));
});

app.delete('/livros/:id', function(req, resp) {
  const id = req.params.id;

  const livroDao = new LivroDao(db);
  livroDao.remove(id)
      .then(() => resp.status(200).end())
      .catch(erro => console.log(erro));

});

app.get('/livros/form/:id', function(req, resp) {
  const id = req.params.id;
  const livroDao = new LivroDao(db);

  livroDao.buscaPorId(id)
      .then(livro => 
          resp.marko(
              require('../views/livros/form/form.marko'),
              { livro: livro }
          )
      )
      .catch(erro => console.log(erro));

});

};

//exportando uma funcao que recebe como parametro o app para ser utilizado na custom express
