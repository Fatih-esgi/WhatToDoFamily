import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsComponent } from './tabs.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { map } from 'rxjs/operators';
import { } from 'firebase/auth'
// const redirectToProfileEditOrLogin = () => map(user => user ? ['profiles', user.uid, 'edit'] : ['login']);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['tabs/home']);

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
          .then(m => m.MyEventsModule),
          ...canActivate (redirectUnauthorizedToLogin)
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
          // ...canActivate(redirectToProfileEditOrLogin)
      },
      {
        path: 'favorites',
        loadChildren: () => import('../favorites/favorites.module')
          .then(m => m.FavoritesModule)
      },
      {
        path: 'login',
        loadChildren: () => import('../login-page/login-page.module')
          .then(m => m.LoginPageModule)
      },
      {
        path: 'signin',
        loadChildren: () => import('../signin-page/signin-page.module')
          .then(m => m.SigninPageModule)
      },
      {
        path: 'event/:id',
        loadChildren: () => import('../event-detail/event-detail.module')
          .then(m => m.EventDetailModule)
      },
      {
        path: 'myevents/lastvisited',
        loadChildren: () => import('../lastvisited/lastvisited.module')
          .then(m => m.LastvisitedModule),
          ...canActivate (redirectUnauthorizedToLogin)
      },
      {
        path: 'myevents/myrating',
        loadChildren: () => import('../myrating/myrating.module')
          .then(m => m.MyratingModule),
          ...canActivate (redirectUnauthorizedToLogin)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsRoutingModule { }
