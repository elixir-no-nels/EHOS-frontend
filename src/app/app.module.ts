import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RoutingModule } from './routing.module';
import { CloudsListComponent } from './clouds/clouds-list/clouds-list.component';
import { NodesListComponent } from './nodes/nodes-list/nodes-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CloudsListComponent,
    NodesListComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
