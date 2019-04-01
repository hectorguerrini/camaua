import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-vendas",
  templateUrl: "./vendas.component.html",
  styleUrls: ["./vendas.component.scss"]
})
export class VendasComponent implements OnInit {
  tipoVenda: string = "aluno";
  RA: string;
  CPF: string;
  sexo: string;
  lote: number;
  alimento: number;
  combo: number;
  numeroIngresso: string;

  valores = [
    { tipo: "aluno", lote: 1, valor: 55 },
    { tipo: "aluno", lote: 2, valor: 60 },
    { tipo: "aluno", lote: 3, valor: 65 },
    { tipo: "convidado", lote: 1, valor: 70 },
    { tipo: "convidado", lote: 2, valor: 80 },
    { tipo: "convidado", lote: 3, valor: 90 }
  ];
  constructor() {}

  ngOnInit() {}

  valorFinal(): number {
    const valor = this.valores.find(
      el => el.tipo === this.tipoVenda && el.lote === this.lote
    );
    let result = 0;
    if (valor) {
      result = valor.valor;
      if (this.alimento) {
        result -= 5;
      }
      if (this.combo) {
        result += 12;
      }
    }

    return result;
  }
}
