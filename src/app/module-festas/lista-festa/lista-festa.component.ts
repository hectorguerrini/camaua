import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FestasService } from 'src/app/core/services/festas.service';
import { ListaFesta } from 'src/app/models/listaFesta';

@Component({
	selector: 'app-lista-festa',
	templateUrl: './lista-festa.component.html',
	styleUrls: ['./lista-festa.component.scss']
})
export class ListaFestaComponent implements OnInit {

	listaFestas: Array<ListaFesta>
	constructor(
		private router: Router,
		private festasService: FestasService
	) { }

	ngOnInit() {
		this.getListaFestas();
	}
	abrirFesta(id: number): void {
		this.router.navigate([`festas/venda/${id}`]);
	}
	getExcel(id_festa: number): void {
		this.festasService.getExcel(id_festa)
			.subscribe((data) => {
				console.log(data)

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
