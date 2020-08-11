import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Carrinho, Itens, Venda } from 'src/app/models/produtos';

@Injectable({
	providedIn: 'root'
})
export class FestasService {

	url = environment.url;
	constructor(private http: HttpClient) { }

	getExcel(id_festa: number) {
		const url = `${this.url}/excel/download/${id_festa}/all`;

		return this.http.get(url, {
			headers: new HttpHeaders().set(
				'Content-Type',
				'application/json'
			)
		});
	}
	getLotes(id_festa: number) {
		const url = `${this.url}/get_lotes/${id_festa}`;

		return this.http.get(url, {
			headers: new HttpHeaders().set(
				'Content-Type',
				'application/json'
			)
		});
	}
	getFesta(id_festa: number) {
		const url = `${this.url}/get_festa/${id_festa}`;

		return this.http.get(url, {
			headers: new HttpHeaders().set(
				'Content-Type',
				'application/json'
			)
		});
	}
	getLista(id_festa: number) {
		const url = `${this.url}/get_lista`;
		var body = {
			id_festa
		};
		return this.http.post(url, body, {
			headers: new HttpHeaders().set(
				'Content-Type',
				'application/json'
			)
		});
	}
	updateVendaAluno(
		id_festa: number, id_vendedor: number, valor: number,
		sexo: string, alimento: number, id_aluno: number,
		lote: number, combo: number, camarote: number, formado: number,
		formaPgto: string
	) {
		const url = `${this.url}/update_venda`;
		var body = {
			id_festa,
			id_vendedor,
			valor,
			sexo,
			flag_alimento: alimento,
			id_aluno,
			lote,
			combo,
			camarote,
			formado,
			formaPgto
		};
		return this.http.post(url, body, {
			headers: new HttpHeaders().set(
				'Content-Type',
				'application/json'
			)
		});
	}
	updateVendaConvidado(
		id_festa: number, id_vendedor: number, valor: number,
		sexo: string, alimento: number, cpf: string,
		lote: number, combo: number, nome: string,
		camarote: number, formado: number,formaPgto: string
	) {
		const url = `${this.url}/update_venda_convidado`;
		let body = {
			id_festa,
			id_vendedor,
			valor,
			sexo,
			flag_alimento: alimento,
			nome,
			lote,
			combo,
			cpf,
			camarote,
			formado,
			formaPgto
		};
		return this.http.post(url, body, {
			headers: new HttpHeaders().set(
				'Content-Type',
				'application/json'
			)
		});
	}

	getAluno(registro: string, id_festa: number) {
		const url = `${this.url}/detalhes`;
		var body = {
			registro,
			id_festa
		};
		return this.http.post(url, body, {
			headers: new HttpHeaders().set(
				'Content-Type',
				'application/json'
			)
		});
	}
	getConvidado(cpf: string, id_festa: number) {
		const url = `${this.url}/detalhes`;
		var body = {
			cpf,
			id_festa
		};
		return this.http.post(url, body, {
			headers: new HttpHeaders().set(
				'Content-Type',
				'application/json'
			)
		});
	}

	getListaFestas() {
		const url = `${this.url}/get_lista_festas`;
		return this.http.get(url, {
			headers: new HttpHeaders().set(
				'Content-Type',
				'application/json'
			)
		});
	}
	getProdutos() {
		return JSON.parse(localStorage.getItem('produtos'));
		// const url = `${this.url}/get_produtos`;
		// return this.http.get(url, {
		// 	headers: new HttpHeaders().set(
		// 		'Content-Type',
		// 		'application/json'
		// 	)
		// });
	}
	updateProdutos(venda: Venda) {
		let lista:Array<Itens> = JSON.parse(localStorage.getItem('produtos'));
		let vendas:Array<Venda> = JSON.parse(localStorage.getItem('vendas'));
		if (vendas == null )
			vendas = [];
		venda.carrinho.forEach(c => {
			lista = lista.map(e => {
				if (c.id_produto === e.id_produto) {
					e.qtde -= c.qtde;
				}
				return e;
			});			
		});
		venda.idVenda = vendas.length + 1;
		vendas.push(venda);
		localStorage.setItem('produtos', JSON.stringify(lista));
		localStorage.setItem('vendas', JSON.stringify(vendas));
		// const url = `${this.url}/update_produto`;
		// return this.http.post(url, carrinho ,{
		// 	headers: new HttpHeaders().set(
		// 		'Content-Type',
		// 		'application/json'
		// 	)
		// });
	}
	updateEstoque(item: Itens) {
		let lista:Array<Itens> = JSON.parse(localStorage.getItem('produtos'));
		lista = lista.map(e => {
			if(e.id_produto == item.id_produto){
				e = item;
			}
			return e;
		});
		console.log(lista);
		localStorage.setItem('produtos', JSON.stringify(lista));
	}
	novoProduto(item: Itens) {
		let lista = JSON.parse(localStorage.getItem('produtos'));
		if (lista == null )
			lista = [];
		item.id_produto = lista.length + 1;
		lista.push(item);
		localStorage.setItem('produtos', JSON.stringify(lista));

		// const url = `${this.url}/novo_produto`;
		// return this.http.post(url, item ,{
		// 	headers: new HttpHeaders().set(
		// 		'Content-Type',
		// 		'application/json'
		// 	)
		// });
	}
	getVendas() {
		let vendas:Array<Venda> = JSON.parse(localStorage.getItem('vendas'));
		if (vendas == null )
			vendas = [];
		return vendas;
	}
}
