import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AtualizacaoEstoqueComponent } from '../atualizacao-estoque/atualizacao-estoque.component';
import { Itens } from 'src/app/models/produtos';
import { FestasService } from 'src/app/core/services/festas.service';
import { MessageComponent } from 'src/app/dialog/message/message.component';

@Component({
	selector: 'app-estoque',
	templateUrl: './estoque.component.html',
	styleUrls: ['./estoque.component.scss']
})
export class EstoqueComponent implements OnInit {
	listaProdutos: Array<Itens> = [];
	
	constructor(private dialog: MatDialog, private festasService: FestasService) { }

	ngOnInit(): void {
		this.getProdutos();
	}
	getProdutos(): void {
		this.listaProdutos = [];			
		this.festasService.getProdutos()
			.subscribe((data: { jsonRetorno: Array<Itens> }) => {
				if(data.jsonRetorno.length > 0 ){
					this.listaProdutos = data.jsonRetorno;
					
				}
			});
	}
	atualizarEstoque(produto: Itens): void {
		const dialogConfig = new MatDialogConfig();

		dialogConfig.disableClose = false;
		dialogConfig.hasBackdrop = true;
		dialogConfig.autoFocus = true;
		dialogConfig.width = '300px';
		dialogConfig.data = produto;
		const dialogRef = this.dialog.open(AtualizacaoEstoqueComponent, dialogConfig);

		dialogRef.afterClosed().subscribe(result => {
			if(result) {}
		});
	}
	novoProduto(): void {
		const dialogConfig = new MatDialogConfig();

		dialogConfig.disableClose = false;
		dialogConfig.hasBackdrop = true;
		dialogConfig.autoFocus = true;
		dialogConfig.width = '300px';
		dialogConfig.data = {};
		const dialogRef = this.dialog.open(AtualizacaoEstoqueComponent, dialogConfig);

		dialogRef.afterClosed().subscribe((result: Itens) => {
			if(result) {
				this.salvarProduto(result)
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
	salvarProduto(produto: Itens): void {
		this.festasService.novoProduto(produto)
			.subscribe((data: { jsonRetorno: Array<Itens> }) => {
				if (data.jsonRetorno.length > 0) {
					this.popup('success', 'Venda Finalizada com sucesso');
					this.getProdutos();
				} else {
					this.popup('error', 'Erro');
				}
			});
	}
}
