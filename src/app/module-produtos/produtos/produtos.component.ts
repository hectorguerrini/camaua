import { Component, OnInit } from '@angular/core';
import { FestasService } from 'src/app/core/services/festas.service';
import { Produto, Loja, Itens, Carrinho } from 'src/app/models/produtos';

@Component({
	selector: 'app-produtos',
	templateUrl: './produtos.component.html',
	styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {
	listaProdutos: Array<Loja>;
	carrinho: Array<Carrinho> = [];
	constructor(private festasService: FestasService) { }

	ngOnInit() {
		this.getProdutos();
	}
	getProdutos(): void {
		this.listaProdutos = [];
		let lista = new Produto().produto.jsonRetorno;
		lista.forEach(element => {
			let nome = element.nome_produto + ' ' + element.descricao.split(' ')[4]
			const i = this.listaProdutos.findIndex(el => el.nome_produto == nome);

			if (i == -1) {
				let obj = <Loja>{
					nome_produto: element.nome_produto + ' ' + element.descricao.split(' ')[4],
					itens: [
						{ 
							id_produto: element.id_produto,
							tamanho: element.descricao.split(' ')[1],
							descricao: element.descricao,
							qtde: element.qtde
						}
					]
				}
				this.listaProdutos.push(obj);
			} else {
				let obj = <Itens> {
					id_produto: element.id_produto,
					tamanho: element.descricao.split(' ')[1],
					descricao: element.descricao,
					qtde: element.qtde
				}
				this.listaProdutos[i].itens.push(obj);
			}
			
		});
		// this.festasService.getProdutos()
		// 	.subscribe((data: { jsonRetorno: Array<any> }) => {
		// 		if(data.jsonRetorno.length > 0 ){
		// 			this.listaProdutos = data.jsonRetorno;
		// 		}

		// 	});
	}

	addCarrinho(nome_produto: string, item: Itens){
		const i = this.carrinho.findIndex(el => el.id_produto == item.id_produto);
		if (i == -1) {
			this.carrinho.push({
				id_produto: item.id_produto,
				nome_produto: nome_produto, 
				preco: 100,
				qtde: 1,
				tamanho: item.tamanho
			});		
		} else {
			this.carrinho[i].qtde += 1;
			this.carrinho[i].preco += 100;
		}
		
	}
}
