import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuardService } from "./helpers/role-guard.service";

import { HomeSalesmanComponent } from "./home-salesman";
import { LoginComponent } from "./login/login.component";
import { HomeDealershipComponent } from "./home-dealership";

// Roles: 0 - Dealership, 1 - Salesman
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home-salesman',
    component: HomeSalesmanComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedType: 1,
      location: ''
    }
  },
  { path: 'home-dealership',
    component: HomeDealershipComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedType: 0,
      location: 'home-dealership'
    }
  },

  // otherwise redirect to home-salesman
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
