import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserViewComponent } from './pages/home/user-view/user-view.component';
import { UserFormComponent } from './pages/home/user-form/user-form.component';
import { UserListComponent } from './pages/home/user-list/user-list.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home',},
  { 
    path: "home", component: HomeComponent, children:
      [
        { path: '', pathMatch: 'full', redirectTo: 'users',},
        { path: 'users', component: UserListComponent},
        { path: 'user/new', component: UserFormComponent},
        { path: 'user/:_id', component: UserViewComponent},
        { path: 'user/update/:_id', component: UserFormComponent}
      ]
  },
  { path: '**', redirectTo: 'home'}
];
