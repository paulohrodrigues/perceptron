class Tratamento{
    tratarMatrizes(puro){
        var matrizParaAplicar=[];
        puro=puro.split("\n");
        for(var l of puro){
            var novo = l.split(',').map(function(item) {
                return parseFloat(item,10);
            });
            matrizParaAplicar.push(novo);
        }
        matrizParaAplicar.pop();
        return matrizParaAplicar;
    }
    tratarVetor(puro){
        puro=puro.split("\n");
        var novo = puro[0].split(',').map(function(item) {
            return parseFloat(item,10);
        });
        console.log(novo);
        return novo;
    }
    escrever(mensagem,limpa){
        if(limpa){
            document.getElementById("resultado").innerHTML=mensagem+"<br>";
        }else{
            document.getElementById("resultado").innerHTML+=mensagem+"<br>";
        }
    }
}