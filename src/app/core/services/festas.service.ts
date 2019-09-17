import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FestasService {

  url = environment.url;
  constructor(private http: HttpClient) { }

  getFesta(id_festa: number) {
    const url = `${this.url}/get_festa/${id_festa}`;

    return this.http.post(url, {}, {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/json'
      )
    });
  }
  getLista(id_festa: number) {
    const url = `${this.url}/get_lista`;
    var body = {
      id_festa: id_festa
    }
    return this.http.post(url, body, {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/json'
      )
    });
  }
  updateVendaAluno(
      id_festa: number, id_vendedor: number, valor: number,
      sexo: string, alimento: number, id_aluno: number,
      lote: number, combo: number, camarote: number
    ) {
    const url = `${this.url}/update_venda`;
    var body ={
      id_festa: id_festa,
      id_vendedor: id_vendedor,
      valor: valor,
      sexo: sexo,
      flag_alimento: alimento,
      id_aluno: id_aluno,
      lote: lote,
      combo: combo,
      camarote: camarote
    }
    return this.http.post(url, body, {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/json'
      )
    });
  }
  updateVendaConvidado(
    id_festa: number, id_vendedor: number, valor: number,
    sexo: string, alimento: number, cpf: string,
    lote: number, combo: number, nome: string,
    camarote: number
  ) {
  const url = `${this.url}/update_venda_convidado`;
  var body ={
    id_festa: id_festa,
    id_vendedor: id_vendedor,
    valor: valor,
    sexo: sexo,
    flag_alimento: alimento,
    nome: nome,
    lote: lote,
    combo: combo,
    cpf: cpf,
    camarote: camarote
  }
  return this.http.post(url, body, {
    headers: new HttpHeaders().set(
      'Content-Type',
      'application/json'
    )
  });
}

  getAluno(registro: string, id_festa: number) {
    const url = `${this.url}/detalhes`;
    var body ={
      registro: registro,
      id_festa: id_festa
    }
    return this.http.post(url, body, {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/json'
      )
    });
  }
  getConvidado(cpf: string, id_festa: number) {
    const url = `${this.url}/detalhes`;
    var body ={
      cpf: cpf,
      id_festa: id_festa
    }
    return this.http.post(url, body, {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/json'
      )
    });
  }

  getListaFestas() {
    const url = `${this.url}/get_lista_festas`;    
    return this.http.get(url, {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/json'
      )
    });
  }
}
