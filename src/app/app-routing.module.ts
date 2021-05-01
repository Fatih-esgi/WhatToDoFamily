import { NgModule } from '@angular/core';
import { Routes, RouterModule, } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'tabs/home', pathMatch: 'full' },

  {
    path: 'tabs',
    loadChildren: () => import('./@features/tabs/tabs.module').then( m => m.TabsModule) 
  },
  {
    path: 'admin',
    loadChildren: () => import('./@features/admin/admin.module').then( m => m.AdminModule) 
  },
  { path: '**', redirectTo: 'tabs/home', pathMatch: 'full' },
  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
