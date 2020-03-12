import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Carrinho, Itens } from 'src/app/models/produtos';

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
		lote: number, combo: number, camarote: number, formado: number
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
			formado
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
		camarote: number, formado: number
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
			formado
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
		const url = `${this.url}/get_produtos`;
		return this.http.get(url, {
			headers: new HttpHeaders().set(
				'Content-Type',
				'application/json'
			)
		});
	}
	updateProdutos(carrinho: Array<Carrinho>) {
		const url = `${this.url}/update_produto`;
		return this.http.post(url, carrinho ,{
			headers: new HttpHeaders().set(
				'Content-Type',
				'application/json'
			)
		});
	}
	novoProduto(item: Itens) {
		const url = `${this.url}/novo_produto`;
		return this.http.post(url, item ,{
			headers: new HttpHeaders().set(
				'Content-Type',
				'application/json'
			)
		});
	}
}
