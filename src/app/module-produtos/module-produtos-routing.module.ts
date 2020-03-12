import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProdutosComponent } from './produtos/produtos.component';
import { EstoqueComponent } from './estoque/estoque.component';

const routes: Routes = [
	{path: '', component: ProdutosComponent},
	{ path: 'estoque', component: EstoqueComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleProdutosRoutingModule { }
