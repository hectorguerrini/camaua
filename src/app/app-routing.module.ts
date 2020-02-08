import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: 'festas',
    loadChildren: () => import('./module-festas/module-festas.module').then(mod => mod.ModuleFestasModule)
  },
  {
    path: 'produtos',
    loadChildren: () => import('./module-produtos/module-produtos.module').then(mod => mod.ModuleProdutosModule)
  },
  { path: 'login', component: LoginComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'festas' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
