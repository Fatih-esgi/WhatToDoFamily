import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventbookedComponent } from './eventbooked.component';

const routes: Routes = [
  {
    path: '',
    component: EventbookedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventbookedRoutingModule { }
