import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.scss']
})
export class VendasComponent implements OnInit {

  tipoVenda: string = 'aluno';
  RA: string;
  CPF: string;
  sexo: string;
  lote: number;
  alimento: number;
  combo: number;
  numeroIngresso: string;
  constructor() { }

  ngOnInit() {
  }

  valorFinal(): number{


    return 0;
  }

}
