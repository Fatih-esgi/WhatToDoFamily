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
          .then(m => m.UserModule),
      },
      {
        path: 'favorites',
        loadChildren: () => import('../favorites/favorites.module')
          .then(m => m.FavoritesModule)
      },
      {
        path: 'event/:id',
        loadChildren: () => import('../event-detail/event-detail.module')
          .then(m => m.EventDetailModule)
      },
      {
        path: 'user/eventbooked',
        loadChildren: () => import('../eventbooked/eventbooked.module')
          .then(m => m.EventbookedModule)
      },
      {
        path: 'user/oldevents',
        loadChildren: () => import('../oldevent/oldevent.module')
          .then(m => m.OldeventModule)
      },
      {
        path: 'user/lastvisited',
        loadChildren: () => import('../lastvisited/lastvisited.module')
          .then(m => m.LastvisitedModule)
      },
      {
        path: 'user/myrating',
        loadChildren: () => import('../myrating/myrating.module')
          .then(m => m.MyratingModule)
      },
      {
        path: 'user/settings',
        loadChildren: () => import('../settings/settings.module')
          .then(m => m.SettingsModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsRoutingModule { }
