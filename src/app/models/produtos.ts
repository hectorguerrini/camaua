export class Itens {
	id_produto: number;	
	descricao: string;
	tamanho: string;	
	qtde: number;
	dt_atualizacao: string;	
	valor: number;
}
export class Loja {
	descricao: string;
	valor: number;
	itens: Array<Itens>
}
export class Carrinho {
	id_produto: number;	
	descricao: string
	qtde: number;
	tamanho: string;
	valor: number;
}
export class Venda {
	carrinho: Array<Carrinho> = [];
	idVenda: number;
	valorTotal: number = 0;
	colaborador: string = '';
	
}
export class Produto {
	produto: {
		jsonRetorno: Array<any>
	}
	constructor() {
		this.produto = {"jsonRetorno":[{"id_produto":1,"nome_produto":"Calça Feminino","descricao":"Tam. P / Cor Preta","qtde":12,"dt_atualizacao":"2020-03-02T15:40:56.463Z"},{"id_produto":2,"nome_produto":"Calça Feminino","descricao":"Tam. M / Cor Preta","qtde":20,"dt_atualizacao":"2020-03-02T15:40:56.463Z"},{"id_produto":3,"nome_produto":"Calça Feminino","descricao":"Tam. G / Cor Preta","qtde":12,"dt_atualizacao":"2020-03-02T15:40:56.463Z"},{"id_produto":4,"nome_produto":"Calça Feminino","descricao":"Tam. GG / Cor Preta","qtde":4,"dt_atualizacao":"2020-03-02T15:40:56.463Z"},{"id_produto":5,"nome_produto":"Calça Feminino","descricao":"Tam. XGG / Cor Preta","qtde":2,"dt_atualizacao":"2020-03-02T15:40:56.463Z"},{"id_produto":6,"nome_produto":"Shorts Feminino","descricao":"Tam. P / Cor Preta","qtde":22,"dt_atualizacao":"2020-03-02T15:43:05.793Z"},{"id_produto":7,"nome_produto":"Shorts Feminino","descricao":"Tam. M / Cor Preta","qtde":35,"dt_atualizacao":"2020-03-02T15:43:05.793Z"},{"id_produto":8,"nome_produto":"Shorts Feminino","descricao":"Tam. G / Cor Preta","qtde":21,"dt_atualizacao":"2020-03-02T15:43:05.793Z"},{"id_produto":9,"nome_produto":"Shorts Feminino","descricao":"Tam. GG / Cor Preta","qtde":6,"dt_atualizacao":"2020-03-02T15:43:05.793Z"},{"id_produto":10,"nome_produto":"Shorts Masculino","descricao":"Tam. P / Cor Preta","qtde":24,"dt_atualizacao":"2020-03-02T15:45:12.193Z"},{"id_produto":11,"nome_produto":"Shorts Masculino","descricao":"Tam. M / Cor Preta","qtde":35,"dt_atualizacao":"2020-03-02T15:45:12.193Z"},{"id_produto":12,"nome_produto":"Shorts Masculino","descricao":"Tam. G / Cor Preta","qtde":26,"dt_atualizacao":"2020-03-02T15:45:12.193Z"},{"id_produto":13,"nome_produto":"Shorts Masculino","descricao":"Tam. GG / Cor Preta","qtde":10,"dt_atualizacao":"2020-03-02T15:45:12.193Z"},{"id_produto":14,"nome_produto":"Shorts Masculino","descricao":"Tam. XGG / Cor Preta","qtde":5,"dt_atualizacao":"2020-03-02T15:45:12.193Z"},{"id_produto":15,"nome_produto":"Camiseta Masculino","descricao":"Tam. P / Cor Vermelha","qtde":8,"dt_atualizacao":"2020-03-02T15:47:08.923Z"},{"id_produto":16,"nome_produto":"Camiseta Masculino","descricao":"Tam. M / Cor Vermelha","qtde":18,"dt_atualizacao":"2020-03-02T15:47:08.923Z"},{"id_produto":17,"nome_produto":"Camiseta Masculino","descricao":"Tam. G / Cor Vermelha","qtde":12,"dt_atualizacao":"2020-03-02T15:47:08.923Z"},{"id_produto":18,"nome_produto":"Camiseta Masculino","descricao":"Tam. GG / Cor Vermelha","qtde":6,"dt_atualizacao":"2020-03-02T15:47:08.923Z"},{"id_produto":19,"nome_produto":"Camiseta Masculino","descricao":"Tam. P / Cor Azul","qtde":3,"dt_atualizacao":"2020-03-02T15:47:40.420Z"},{"id_produto":20,"nome_produto":"Camiseta Masculino","descricao":"Tam. M / Cor Azul","qtde":6,"dt_atualizacao":"2020-03-02T15:47:40.420Z"},{"id_produto":21,"nome_produto":"Camiseta Masculino","descricao":"Tam. G / Cor Azul","qtde":4,"dt_atualizacao":"2020-03-02T15:47:40.420Z"},{"id_produto":22,"nome_produto":"Camiseta Masculino","descricao":"Tam. GG / Cor Azul","qtde":2,"dt_atualizacao":"2020-03-02T15:47:40.420Z"},{"id_produto":23,"nome_produto":"Camiseta Feminino","descricao":"Tam. P / Cor Azul","qtde":2,"dt_atualizacao":"2020-03-02T15:48:16.027Z"},{"id_produto":24,"nome_produto":"Camiseta Feminino","descricao":"Tam. M / Cor Azul","qtde":4,"dt_atualizacao":"2020-03-02T15:48:16.027Z"},{"id_produto":25,"nome_produto":"Camiseta Feminino","descricao":"Tam. G / Cor Azul","qtde":4,"dt_atualizacao":"2020-03-02T15:48:16.027Z"},{"id_produto":26,"nome_produto":"Camiseta Feminino","descricao":"Tam. GG / Cor Azul","qtde":2,"dt_atualizacao":"2020-03-02T15:48:16.027Z"},{"id_produto":27,"nome_produto":"Camiseta Feminino","descricao":"Tam. P / Cor Vermelha","qtde":2,"dt_atualizacao":"2020-03-02T15:48:47.000Z"},{"id_produto":28,"nome_produto":"Camiseta Feminino","descricao":"Tam. M / Cor Vermelha","qtde":12,"dt_atualizacao":"2020-03-02T15:48:47.000Z"},{"id_produto":29,"nome_produto":"Camiseta Feminino","descricao":"Tam. G / Cor Vermelha","qtde":8,"dt_atualizacao":"2020-03-02T15:48:47.000Z"},{"id_produto":30,"nome_produto":"Camiseta Feminino","descricao":"Tam. GG / Cor Vermelha","qtde":5,"dt_atualizacao":"2020-03-02T15:48:47.000Z"},{"id_produto":31,"nome_produto":"Camiseta Feminino","descricao":"Tam. P / Cor Preta","qtde":4,"dt_atualizacao":"2020-03-02T15:49:19.583Z"},{"id_produto":32,"nome_produto":"Camiseta Feminino","descricao":"Tam. M / Cor Preta","qtde":16,"dt_atualizacao":"2020-03-02T15:49:19.583Z"},{"id_produto":33,"nome_produto":"Camiseta Feminino","descricao":"Tam. G / Cor Preta","qtde":12,"dt_atualizacao":"2020-03-02T15:49:19.583Z"},{"id_produto":34,"nome_produto":"Camiseta Feminino","descricao":"Tam. GG / Cor Preta","qtde":8,"dt_atualizacao":"2020-03-02T15:49:19.583Z"},{"id_produto":35,"nome_produto":"Camiseta Masculino","descricao":"Tam. P / Cor Preta","qtde":12,"dt_atualizacao":"2020-03-02T15:50:59.263Z"},{"id_produto":36,"nome_produto":"Camiseta Masculino","descricao":"Tam. M / Cor Preta","qtde":24,"dt_atualizacao":"2020-03-02T15:50:59.263Z"},{"id_produto":37,"nome_produto":"Camiseta Masculino","descricao":"Tam. G / Cor Preta","qtde":16,"dt_atualizacao":"2020-03-02T15:50:59.263Z"},{"id_produto":38,"nome_produto":"Camiseta Masculino","descricao":"Tam. GG / Cor Preta","qtde":8,"dt_atualizacao":"2020-03-02T15:50:59.263Z"}]};
	}
}