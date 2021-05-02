import { NgModule } from '@angular/core';
import { Routes, RouterModule, } from '@angular/router';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['tabs/home']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs/home', pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./@features/tabs/tabs.module').then(m => m.TabsModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./@features/admin/admin.module').then(m => m.AdminModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: '**',
    redirectTo: 'tabs/home', pathMatch: 'full'
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
