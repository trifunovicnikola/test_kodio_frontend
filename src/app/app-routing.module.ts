import { AdminGuardGuard } from './admin-guard.guard';
import { GuardGuard } from './guard.guard';

import { ClientPageComponent } from './client-page/client-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'admin', component:AdminPageComponent, canActivate:[AdminGuardGuard]},
  {path:'client/:id', component:ClientPageComponent, canActivate:[GuardGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
