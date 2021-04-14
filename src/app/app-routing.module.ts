import { NgModule } from '@angular/core';
import { Routes, RouterModule, } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'tabs/home', pathMatch: 'full' },

  {
    path: 'tabs',
    loadChildren: () => import('./@features/tabs/tabs.module').then( m => m.TabsModule) 
  },

  { path: '**', redirectTo: 'tabs/home', pathMatch: 'full' },
  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
