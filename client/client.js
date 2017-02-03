var nome = ["Alex da Silva", "Bartolomeu Kuma", "Maria da Silva", "Geovana Antonela", "Sabrina Socorro", "Hercules Nors", "Paulo Nostro", "Emilia Fernandes", "Natacha Silva"];
var sexo = ["masculino", "feminino"];
var raca = ["branca", "preta", "amarela", "parda", "indigena", "ignorada"];
var estadoCivil = ["solteiro", "casado", "viuvo", "desquitado", "divorciado", "separado", "uniao estavel"];
var escolaridade = ["1 a 3 anos", "4 a 7 anos", "8 a 11 anos", "> 12 anos", "ignorado"];
var acompanhamentoMedico = ["publico", "privado"];
var estado = ["acre", "alagoas", "amapa", "amazonas", "bahia", "ceara", "distrito federal", "espirito santo", "goias", "maranhao", "mato grosso", "mato grosso do sul", "minas gerais", "para", "paraiba", "parana", "pernambuco", "piaui", "rio de janeiro", "rio grande do norte", "rio grande do sul", "rondonia", "roraima", "santa catarina", "sao paulo", "sergipe", "tocantins"];
var sintomas = ["dorBarriga", "febre", "caganeira", "dengo"];

$(document).ready(function () {

    $("#campoDorBarriga").html("0");
    $("#campoFebre").html("0");
    $("#campoDesinteria").html("0");

    /*var prontuario = new Object();
    prontuario.id = 33333;
    prontuario.nome = "";
    prontuario.sexo = "";
    prontuario.raca = "";
    prontuario.estadoCivil = "";
    prontuario.escolaridade = "";
    prontuario.acompanhamentoMedico = "";
    prontuario.cep = "";
    prontuario.cidade = "";
    prontuario.estado = "";
    prontuario.pais = "";

    $.ajax({
        url: 'http://localhost:50127/api/alice/' + JSON.stringify(new Array(prontuario)),
        dataType: "json",
        type: "PUT",
        contentType: 'application/json; charset=utf-8',
        async: true,
        processData: false,
        cache: false,
        success: function (data) {
            console.log("Sucesso!");
        },
        error: function (xhr) {
            console.log("Error");
            console.log(xhr);
        }
    });*/

    /*var teste = new Object();
    teste.aaa = "111";

    $.ajax({

        type: "POST",
        data: JSON.stringify(teste),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: "http://localhost:50127/api/alice",
        async: false,
        success: function (res, status, xhr) {
            
            console.log(res);

        },
        error: function (res, textStatus, errorThrown) {

            console.log("AA");
            console.log(res);
            
        }

    })*/

    $("#novaRequisicao").on("click", function () {

        InputRandom();
        CarregaSintomas();

    });

    CarregaSintomas();

});

function CarregaSintomas () {

        var retorno;

        $.ajax({
        url: 'http://localhost:50127/api/alice/sintomas',
        dataType: "json",
        type: "GET",
        contentType: 'application/json; charset=utf-8',
        async: false,
        processData: false,
        cache: false,
        success: function (data) {
            console.log("Sucesso!");
            console.log(data);
            retorno = data;
        },
        error: function (xhr) {
            console.log("Error");
            console.log(xhr);
        }
    });

    $("#campoDorBarriga").html(50 + retorno.dorBarriga);
    $("#campoFebre").html(250 + retorno.febre);
    $("#campoDesinteria").html(325 + retorno.caganeira);

}

function InputRandom () {

    var prontuario = new Object();
    prontuario.id = 33333;
    prontuario.nome = nome[Math.floor((Math.random() * nome.length))];
    prontuario.sexo = sexo[Math.floor((Math.random() * sexo.length))];
    prontuario.raca = raca[Math.floor((Math.random() * raca.length))];
    prontuario.estadoCivil = estadoCivil[Math.floor((Math.random() * estadoCivil.length))];
    prontuario.escolaridade = escolaridade[Math.floor((Math.random() * escolaridade.length))];
    prontuario.acompanhamentoMedico = acompanhamentoMedico[Math.floor((Math.random() * acompanhamentoMedico.length))];
    prontuario.cep = Math.floor((Math.random() * 99999999)).toString();
    prontuario.cidade = "";
    prontuario.estado = estado[Math.floor((Math.random() * estado.length))];
    prontuario.pais = "";
    prontuario.sintomas = GetSintomasRandom(Math.floor((Math.random() * 3))).toString();

console.log(prontuario);

    $.ajax({
        url: 'http://localhost:50127/api/alice/' + JSON.stringify(new Array(prontuario)),
        dataType: "json",
        type: "PUT",
        contentType: 'application/json; charset=utf-8',
        async: false,
        processData: false,
        cache: false,
        success: function (data) {
            console.log("Sucesso!");
        },
        error: function (xhr) {
            console.log("Error");
            console.log(xhr);
        }
    });

}

function GetSintomasRandom(rand) {

    var sintomasRand = "";
    console.log(rand);
    for (var i = 0; i < rand; i++) {

        var sintomaAux = sintomas[Math.floor((Math.random() * sintomas.length))];

        if (sintomaAux != null) {

            sintomasRand += sintomaAux + " ";

        }

    }
    console.log(sintomasRand);
    return sintomasRand;

}

