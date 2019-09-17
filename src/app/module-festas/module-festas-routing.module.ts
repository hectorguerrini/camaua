import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendasComponent } from './vendas/vendas.component';
import { ListaFestaComponent } from './lista-festa/lista-festa.component';


const routes: Routes = [
  { path: 'lista', component: ListaFestaComponent},
  { path: 'venda/:id', component: VendasComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'lista' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleFestasRoutingModule { }
