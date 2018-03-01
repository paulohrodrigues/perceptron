class Perceptron{
	constructor(amostras, saidas, taxa_aprendizado=0.1, epocas=1000, moderador=-1){
		this.amostras = amostras; 
		this.saidas = saidas;
		this.taxa_aprendizado = taxa_aprendizado;
		this.epocas = epocas;
		this.moderador = moderador;
		this.num_amostras = amostras.length;
		this.num_amostra =  amostras[0].length;
		this.pesos = [];
		this.tratamento=new Tratamento();
    }
	treinar(){	
		return new Promise((resolve)=>{
			for (let amostra in this.amostras){
				this.amostras[amostra].unshift(-1);	
			}
			for (let i=0;i<this.num_amostra;i++){
				this.pesos.push(0);
			}
			this.pesos.unshift(this.moderador);
			var num_epocas = 0;
			while (true){
				var erro = false;
				for (let i=0;i<this.num_amostras;i++){
					var u = 0;
					for (let j =0; j<this.num_amostra + 1; j++){
						u += this.pesos[j] * this.amostras[i][j];
					}
					var y = this.sinal(u);
					if (y != this.saidas[i]){
						var erro_aux = this.saidas[i] - y;
						for (let j=0; j<this.num_amostra + 1;j++){
							this.pesos[j] = this.pesos[j] + this.taxa_aprendizado * erro_aux * this.amostras[i][j];
						}
						erro = true; 
					}
				}
				num_epocas += 1;
				if (num_epocas > this.epocas || erro!=true){
					break;
				}
			}
			resolve(true);
		});
	}
	testar(amostra, classe1, classe2){
		amostra.unshift(-1);
		var u = 0;
		for (let i=0;i<this.num_amostra + 1;i++){
            u += this.pesos[i] * amostra[i];
        }
		var y = this.sinal(u);
		if (y == -1){
			this.tratamento.escrever('A amostra pertence a classe '+classe1,false);
		}else{
			this.tratamento.escrever('A amostra pertence a classe '+classe2,false);
		}
    }
	sinal(u){
        return (u >= 0) ? 1 : -1;
    }
}