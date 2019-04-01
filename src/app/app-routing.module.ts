import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendasComponent } from './pages/vendas/vendas.component';

const routes: Routes = [
  { path: 'vendas', component: VendasComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'vendas' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
