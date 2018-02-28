class Perceptron{
	constructor(amostras, saidas, taxa_aprendizado=0.1, epocas=1000, moderador=-1){
		this.amostras = amostras; // todas as amostras
		// console.log(this.amostras);
		this.saidas = saidas; // saídas respectivas de cada amostra
		this.taxa_aprendizado = taxa_aprendizado; // taxa de aprendizado (entre 0 e 1)
		this.epocas = epocas; // número de épocas
		this.moderador = moderador; // moderador
		this.num_amostras = amostras.length; // quantidade de amostras
		this.num_amostra =  amostras[0].length; // quantidade de elementos por amostra
		this.pesos = []; // vetor de pesos
		this.tratamento=new Tratamento();
    }
	// função para treinar a rede
	treinar(){	
		return new Promise((resolve)=>{
			// adiciona -1 para cada uma das amostras
			// console.log(this.amostras);
			for (let amostra in this.amostras){
				this.amostras[amostra].unshift(-1);
				
			}
			// console.log(this.amostras);
			// inicia o vetor de pesos com valores aleatórios
			//nesse caso '0'
			for (let i=0;i<this.num_amostra;i++){
				this.pesos.push(0);
			}
			// insere o moderador no vetor de pesos
			this.pesos.unshift(this.moderador);
			// inicia o contador de epocas
			var num_epocas = 0;
			while (true){
				var erro = false; // o erro inicialmente inexiste
				// para todas as amostras de treinamento
				for (let i=0;i<this.num_amostras;i++){
					var u = 0;
					for (let j =0; j<this.num_amostra + 1; j++){
						u += this.pesos[j] * this.amostras[i][j];
					}
					// obtém a saída da rede utilizando a função de ativação
					var y = this.sinal(u);
					// verifica se a saída da rede é diferente da saída desejada
					if (y != this.saidas[i]){
						// calcula o erro: subtração entre a saída desejada e a saída da rede
						var erro_aux = this.saidas[i] - y;
						// faz o ajuste dos pesos para cada elemento da amostra
						for (let j=0; j<this.num_amostra + 1;j++){
							this.pesos[j] = this.pesos[j] + this.taxa_aprendizado * erro_aux * this.amostras[i][j];
						}
						erro = true; // ainda existe erro
					}
				}
				// incrementa o número de épocas
				num_epocas += 1;
				// critério de parada é pelo número de épocas ou se não existir erro
				if (num_epocas > this.epocas || erro!=true){
					break;
				}
			}
			resolve(true);
		});
	}

	// função utilizada para testar a rede
	// recebe uma amostra a ser classificada e os nomes das classes
	// utiliza a função sinal, se é -1 então é classe1, senão é classe2
	testar(amostra, classe1, classe2){
		// insere o -1
		amostra.unshift(-1);
		// utiliza o vetor de pesos que foi ajustado na fase de treinamento
		var u = 0;
		for (let i=0;i<this.num_amostra + 1;i++){
            u += this.pesos[i] * amostra[i];
        }
		// calcula a saída da rede
		var y = this.sinal(u);
		// verifica a qual classe pertence
		if (y == -1){
			this.tratamento.escrever('A amostra pertence a classe '+classe1,false);
		}else{
			this.tratamento.escrever('A amostra pertence a classe '+classe2,false);
		}
    }
	// função de ativação: degrau bipolar (sinal)
	sinal(u){
        return (u >= 0) ? 1 : -1;
    }
}