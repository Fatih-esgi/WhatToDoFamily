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
        path: 'myevents',
        loadChildren: () => import('../my-events/my-events.module')
          .then(m => m.MyEventsModule)
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
        path: 'myevents/eventbooked',
        loadChildren: () => import('../eventbooked/eventbooked.module')
          .then(m => m.EventbookedModule)
      },
      {
        path: 'myevents/oldevents',
        loadChildren: () => import('../oldevent/oldevent.module')
          .then(m => m.OldeventModule)
      },
      {
        path: 'myevents/lastvisited',
        loadChildren: () => import('../lastvisited/lastvisited.module')
          .then(m => m.LastvisitedModule)
      },
      {
        path: 'myevents/myrating',
        loadChildren: () => import('../myrating/myrating.module')
          .then(m => m.MyratingModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsRoutingModule { }
