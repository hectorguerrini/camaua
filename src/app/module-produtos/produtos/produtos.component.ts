import { Component, OnInit } from '@angular/core';
import { FestasService } from 'src/app/core/services/festas.service';
import { Produto, Loja, Itens, Carrinho } from 'src/app/models/produtos';
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
	totalPagar = 0;
	constructor(private festasService: FestasService, private dialog: MatDialog) { }

	ngOnInit() {
		this.getProdutos();
	}
	getProdutos(): void {
		this.listaProdutos = [];			
		this.festasService.getProdutos()
			.subscribe((data: { jsonRetorno: Array<Carrinho> }) => {
				if(data.jsonRetorno.length > 0 ){
					let lista = data.jsonRetorno;
					lista.forEach(element => {
						let nome = element.nome_produto + ' ' + element.descricao.split(' ')[4]
						const i = this.listaProdutos.findIndex(el => el.nome_produto == nome);
			
						if (i == -1) {
							let obj = <Loja>{
								nome_produto: element.nome_produto + ' ' + element.descricao.split(' ')[4],								
								valor: element.valor,
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
	addCarrinho(nome_produto: string,valor: number, item: Itens){
		const i = this.carrinho.findIndex(el => el.id_produto == item.id_produto);
		if (i == -1) {
			this.carrinho.push({
				id_produto: item.id_produto,
				nome_produto: nome_produto, 
				descricao: item.descricao,
				valor: valor,
				qtde: 1,
				tamanho: item.tamanho
			});		
		} else {
			this.carrinho[i].qtde += 1;
			this.carrinho[i].valor += valor;
		}
		
		this.totalPagar += valor;
	}
	vender(){
		
		this.festasService.updateProdutos(this.carrinho)
			.subscribe((data: { jsonRetorno: Array<Carrinho> }) => {
				if (data.jsonRetorno.length > 0){
					this.popup('success', 'Venda Finalizada com sucesso');
					this.getProdutos();
				} else {
					this.popup('error', `Erro`)
				}
			})
		
	}
}
