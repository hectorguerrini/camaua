import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Itens } from 'src/app/models/produtos';

@Component({
	selector: 'app-atualizacao-estoque',
	templateUrl: './atualizacao-estoque.component.html',
	styleUrls: ['./atualizacao-estoque.component.scss']
})
export class AtualizacaoEstoqueComponent implements OnInit {	

	modoEdit = false;
	qtdeN = 0;
	constructor(
		public dialogRef: MatDialogRef<AtualizacaoEstoqueComponent>,
		@Inject(MAT_DIALOG_DATA) public data: Itens
	) { }

	ngOnInit(): void {
		console.log(this.data);
		if(this.data.id_produto != null) {
			this.modoEdit = true;
		}
	}
	salvar(): void {
		this.data.qtde = this.data.qtde*1;
		this.data.valor = this.data.valor*1;
		this.data.qtde += this.qtdeN*1;
		this.dialogRef.close(this.data);
	}
	onNoClick(): void {
		this.dialogRef.close();
	}
}
