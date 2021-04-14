import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyratingComponent } from './myrating.component';

const routes: Routes = [
  {
    path: '',
    component: MyratingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyratingRoutingModule { }
