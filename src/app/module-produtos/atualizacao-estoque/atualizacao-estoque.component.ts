import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Itens } from 'src/app/models/produtos';

@Component({
	selector: 'app-atualizacao-estoque',
	templateUrl: './atualizacao-estoque.component.html',
	styleUrls: ['./atualizacao-estoque.component.scss']
})
export class AtualizacaoEstoqueComponent implements OnInit {	

	constructor(
		public dialogRef: MatDialogRef<AtualizacaoEstoqueComponent>,
		@Inject(MAT_DIALOG_DATA) public data: Itens
	) { }

	ngOnInit(): void {

	}
	salvar(): void {
		this.dialogRef.close(this.data);
	}
	onNoClick(): void {
		this.dialogRef.close()
	}
}
