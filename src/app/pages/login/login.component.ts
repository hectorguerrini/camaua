import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: string;
  senha: string;
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {

    if(this.loginService.isLogged){
      this.router.navigate([`vendas`]);
    }
  }

  login(): void{
    this.loginService.getLogin(this.user,this.senha)
    .subscribe((data: {jsonRetorno: Array<any>}) => {
      if(data.jsonRetorno.length > 0){
        this.loginService.setLogged(true, data.jsonRetorno[0].nome, data.jsonRetorno[0].id);
        this.router.navigate([`vendas`]);
      }
    })

  }
}
