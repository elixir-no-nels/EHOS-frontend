import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CloudsListComponent }      from './clouds/clouds-list/clouds-list.component';
import { NodesListComponent }      from './nodes/nodes-list/nodes-list.component';
import { SettingsPageComponent }      from './settings/settings-page/settings-page.component';
import {LocationStrategy, APP_BASE_HREF, PathLocationStrategy} from '@angular/common';

//import { DashboardComponent }   from './dashboard/dashboard.component';
//import { HeroDetailComponent }  from './hero-detail/hero-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'clouds', pathMatch: 'full' },
  { path: 'clouds', component: CloudsListComponent },
  { path: 'settings', component: SettingsPageComponent },
  { path: 'nodes/:status_id', component: NodesListComponent },
  { path: 'nodes', component: NodesListComponent },
//  { path: 'nodes/:id/:node_status_id/:node_state_id', component: NodesComponent },
//  { path: 'dashboard', component: DashboardComponent },
//  { path: 'detail/:id', component: HeroDetailComponent },
];

@NgModule({

  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
//  providers: [
//    { provide: LocationStrategy, useClass: PathLocationStrategy },
    //{ provide: APP_BASE_HREF, useValue: 'ehos-frontend/' },
  ],
})
export class RoutingModule { }
