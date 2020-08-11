import { Component, OnInit } from '@angular/core';
import { Venda } from 'src/app/models/produtos';
import { FestasService } from 'src/app/core/services/festas.service';

@Component({
  selector: 'app-financeiro',
  templateUrl: './financeiro.component.html',
  styleUrls: ['./financeiro.component.scss']
})
export class FinanceiroComponent implements OnInit {

	listaVendas: Array<Venda> = [];
	
  constructor(private festasService: FestasService) { }

  ngOnInit(): void {
	  this.getVendas();
  }

  getVendas() {
	  this.listaVendas = this.festasService.getVendas();
  }

}
