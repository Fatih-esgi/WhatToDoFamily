import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OldeventComponent } from './oldevent.component';

const routes: Routes = [
  {
    path: '',
    component: OldeventComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OldeventRoutingModule { }
