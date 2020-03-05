import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FestasService } from 'src/app/core/services/festas.service';
import { ListaFesta } from 'src/app/models/listaFesta';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MessageComponent } from 'src/app/dialog/message/message.component';

@Component({
	selector: 'app-lista-festa',
	templateUrl: './lista-festa.component.html',
	styleUrls: ['./lista-festa.component.scss']
})
export class ListaFestaComponent implements OnInit {

	listaFestas: Array<ListaFesta>
	constructor(
		private router: Router,
		private festasService: FestasService,
		public dialog: MatDialog
	) { }

	ngOnInit() {
		this.getListaFestas();
	}
	abrirFesta(id: number): void {
		this.router.navigate([`festas/venda/${id}`]);
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
	getExcel(id_festa: number): void {
		this.festasService.getExcel(id_festa)
			.subscribe((data: {message: boolean, caminho: string}) => {
				if (data.message){
					this.popup('success',`Excel gerado com sucesso\nCaminho ${data.caminho}`)
				}

			});
		
	}
	getListaFestas(): void {
		this.festasService.getListaFestas()
			.subscribe((data: { jsonRetorno: Array<ListaFesta> }) => {
				if (data.jsonRetorno.length > 0) {
					this.listaFestas = data.jsonRetorno;
				} else {
					this.listaFestas = [];
				}
			});

	}
}
