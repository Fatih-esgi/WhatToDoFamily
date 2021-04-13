import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';

const routes: Routes = [  {
  path: '',
  component: UserComponent,
  children: [
    {
      path: 'eventbooked',
      loadChildren: () => import('../user/eventbooked/eventbooked.module')
                            .then(m => m.EventbookedModule),
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
