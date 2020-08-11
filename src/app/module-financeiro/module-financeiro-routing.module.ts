import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinanceiroComponent } from './financeiro/financeiro.component';


const routes: Routes = [
	{path: '', component: FinanceiroComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleFinanceiroRoutingModule { }
