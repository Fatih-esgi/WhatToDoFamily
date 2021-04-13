import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { TabsComponent } from './tabs.component';

const routes: Routes = [
  {
    path: '',
    component: TabsComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module')
          .then(m => m.HomeModule),
      },
      {
        path: 'search',
        loadChildren: () => import('../search/search.module')
          .then(m => m.SearchModule)
      },
      {
        path: 'eventslist',
        loadChildren: () => import('../liste-event/liste-event.module')
          .then(m => m.ListeEventModule),
        
      },
      {
        path: 'user',
        loadChildren: () => import('../user/user.module')
          .then(m => m.UserModule)
      },
      {
        path: 'favorites',
        loadChildren: () => import('../favorites/favorites.module')
          .then(m => m.FavoritesModule)
      },
      {
        path: 'event',
        loadChildren: () => import('../event-detail/event-detail.module')
          .then(m => m.EventDetailModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsRoutingModule { }
