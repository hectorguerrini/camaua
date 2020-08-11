import { Component, OnInit } from '@angular/core';
import { FestasService } from 'src/app/core/services/festas.service';
import { Produto, Loja, Itens, Carrinho, Venda } from 'src/app/models/produtos';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MessageComponent } from 'src/app/dialog/message/message.component';

@Component({
	selector: 'app-produtos',
	templateUrl: './produtos.component.html',
	styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {
	listaProdutos: Array<Loja>;
	carrinho: Array<Carrinho> = [];
	
	colaboradores: Array<string> = [
		'Gerry', 'Cepacol', 'Paraiba', 'Ronaldo', 'Jamaica'
	];
	venda: Venda = new Venda();

	constructor(private festasService: FestasService, private dialog: MatDialog) { }

	ngOnInit() {
		this.getProdutos();
	}
	getProdutos(): void {
		this.listaProdutos = [];			
		this.gerarTela(this.festasService.getProdutos());
			// .subscribe((data: { jsonRetorno: Array<Itens> }) => {
			// 	if(data.jsonRetorno.length > 0 ){
			// 		let lista = data.jsonRetorno;
					
			// 	}

			// });
		console.log(this.listaProdutos);
	}

	gerarTela(lista: Array<Itens>) {
		lista.forEach(element => {						
			const i = this.listaProdutos.findIndex(el => el.descricao == element.descricao);			
			if (i == -1) {
				let obj = <Loja>{
					descricao: element.descricao,								
					valor: element.valor,
					itens: [
						{ 
							id_produto: element.id_produto,
							tamanho: element.tamanho,										
							qtde: element.qtde
						}
					]
				}
				this.listaProdutos.push(obj);
			} else {
				let obj = <Itens> {
					id_produto: element.id_produto,
					tamanho: element.tamanho,
					descricao: element.descricao,
					qtde: element.qtde
				}
				this.listaProdutos[i].itens.push(obj);
			}
			
		});
	}
	popup(status, message) {
		const dialogConfig = new MatDialogConfig();

		dialogConfig.disableClose = false;
		dialogConfig.hasBackdrop = true;
		dialogConfig.autoFocus = true;
		dialogConfig.width = '260px';
		dialogConfig.data = { status: status, message: message };
		const dialogRef = this.dialog.open(MessageComponent, dialogConfig);

		dialogRef.afterClosed().subscribe(result => {

		});

	}
	addCarrinho(descricao: string,valor: number, item: Itens){
		const i = this.carrinho.findIndex(el => el.id_produto == item.id_produto);
		if (i == -1) {
			this.carrinho.push({
				id_produto: item.id_produto,				
				descricao: descricao,
				valor: valor,
				qtde: 1,
				tamanho: item.tamanho
			});		
		} else {
			this.carrinho[i].qtde += 1;
			this.carrinho[i].valor += valor;
		}
		
		this.venda.valorTotal += valor;
	}
	rmCarrinho(index: number, valor: number): void {
		this.carrinho.splice(index, 1);
		this.venda.valorTotal -= valor;

	}
	vender(){
		console.log(this.carrinho);
		this.venda.carrinho = this.carrinho;
		if (this.venda.colaborador != ''){
			this.venda.valorTotal = 0;
		}
		console.log(this.venda);
		this.festasService.updateProdutos(this.venda);
		this.popup('success', 'Venda Finalizada com sucesso');
		this.venda = new Venda();
			// .subscribe((data: { jsonRetorno: Array<Carrinho> }) => {
			// 	if (data.jsonRetorno.length > 0){
			// 		this.popup('success', 'Venda Finalizada com sucesso');
			// 		this.getProdutos();
			// 	} else {
			// 		this.popup('error', `Erro`)
			// 	}
			// })
		
	}
}
