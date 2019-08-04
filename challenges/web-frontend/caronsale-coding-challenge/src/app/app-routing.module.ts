import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuardService } from "./helpers/role-guard.service";

import { HomeSalesmanComponent } from "./home-salesman";
import { LoginComponent } from "./login/login.component";
import { HomeDealershipComponent } from "./home-dealership";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home-salesman',
    component: HomeSalesmanComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedPrivileges: "{PUBLIC_USER}~{SALESMAN_USER}",
      location: ''
    }
  },
  { path: 'home-dealership',
    component: HomeDealershipComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedPrivileges: "{PUBLIC_USER}~{DEALERSHIP_USER}",
      location: 'home-dealership'
    }
  },

  // otherwise redirect to home-salesman
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
