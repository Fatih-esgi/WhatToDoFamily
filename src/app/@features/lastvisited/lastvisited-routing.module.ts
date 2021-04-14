import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LastvisitedComponent } from './lastvisited.component';
import { LastvisitedModule } from './lastvisited.module';

const routes: Routes = [
  {
    path: '',
    component: LastvisitedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LastvisitedRoutingModule { }
