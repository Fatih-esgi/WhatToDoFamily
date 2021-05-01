import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeEventComponent } from '../liste-event/liste-event.component';
import { AddEditEventComponent } from './add-edit-event/add-edit-event.component';
import { AdminComponent } from './admin.component';
import { ListEventComponent } from './list-event/list-event.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      
        { 
          path: '', 
          component: ListEventComponent },
      
      {
        path: 'add',
        component: AddEditEventComponent
      },
      {
        path: 'edit/:id',
        component: AddEditEventComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
