let tabelaLivros = document.querySelector('#livros'); //seleciona a tabela de livros

//event lister é para 'ouvir' o evento que acontecerá no clic dentro desta tabela
tabelaLivros.addEventListener('click', (evento) => {
    let elementoClicado = evento.target;

    if (elementoClicado.dataset.type == 'remocao') {
        let livroId = elementoClicado.dataset.ref;
        fetch(`http://localhost:3000/livros/${livroId}`, { method: 'DELETE' })
            .then(resposta => {

                let tr = elementoClicado.closest(`#livro_${livroId}`);
                tr.remove();

            })
            .catch(erro => console.log(erro));

    }

});

//todo esse processo acima se dá do lado do navegador 