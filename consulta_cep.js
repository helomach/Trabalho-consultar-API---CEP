// Preencher o formulário com os dados de retorno da API
function preencherFormulario(endereco) {
    document.getElementById("endereco").value = endereco.logradouro;
    document.getElementById("bairro").value = endereco.bairro;
    document.getElementById("cidade").value = endereco.localidade;
    document.getElementById("estado").value = endereco.uf;
    document.getElementById("ibge").value = endereco.ibge;
    document.getElementById("ddd").value = endereco.ddd;
    document.getElementById("siafi").value = endereco.siafi;

}

// Função para verificar se o que foi digitado pelo usuário é somente números
function eNumero(numero) {
    return /^[0-9]+$/.test(numero);
}

// Função para verificar se o CEP informado possui tamanho 8 e só possui números
function cepValido(cep) {
    return cep.length == 8 && eNumero(cep);
}


// Função para pesquisar um CEP via API
async function pesquisarCEP() {
    
    const cep = document.getElementById("cep").value.replace("-", "");
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    if (cepValido(cep)) {
        const dados = await fetch(url);
        // await = esperar o retorno das funções
        // fetch = método de busca de recurso de rede quando a resposta estiver disponível - busca url
        const endereco = await dados.json();
        console.log(endereco);
        
        if (endereco.hasOwnProperty("erro")) {
            document.getElementById("endereco").value = "CEP não encontrado!"
        } else {
            preencherFormulario(endereco);
        }
    } 
    else {
        limpaCampos(endereco);
        document.getElementById("endereco").value = "CEP incorreto!";
        document.getElementById("cep").value = "Erro";
    }
}

document.getElementById("cep").addEventListener("focusout", pesquisarCEP);

// Execução do botão limpar
function limpaCampos(endereco) {
    document.getElementById("endereco").value = "";
    document.getElementById("bairro").value = "";
    document.getElementById("cidade").value = "";
    document.getElementById("estado").value = "";
    document.getElementById("numero").value = "";
    document.getElementById("ibge").value = "";
    document.getElementById("ddd").value = "";
    document.getElementById("siafi").value = "";
}  

// Escutando o botão limpar
document.getElementById("limpar").addEventListener("click", (e) => {
    limpaCampos(endereco);
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("cep").value = "";
})

// Mostrar infos da api e emitir alert de preenchimento dos campos
document.getElementById("salvar").addEventListener("click", (e) => {
    if (document.getElementById("cep").value != "") {
        alert(document.getElementById("endereco").value + "\n" +
        document.getElementById("bairro").value + "\n" +
        document.getElementById("cidade").value + "\n"  +
        document.getElementById("estado").value + "\n"  +
        document.getElementById("ibge").value + "\n"  +
        document.getElementById("ddd").value + "\n"  +
        document.getElementById("siafi").value + "\n" +
        document.getElementById("api").value);
    } 
    else {
        // Alerta de preenchimento de campos 
            alert("Preencha os campos")
        }
})