import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { UsersComponent } from './users/users.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard }  from './auth/auth.guard';

const routes: Routes = [
{ path: 'users', component: UsersComponent, canActivate: [AuthGuard],},
{ path: 'login', component: LoginComponent },
{ path: '**', component: LoginComponent },
{ path: '',   redirectTo: 'login',  pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
