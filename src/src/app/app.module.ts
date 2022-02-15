import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarComponent } from './shared/layout/sidebar/sidebar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import { ActionComponent } from './shared/layout/action/action.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { ActionsInuseComponent } from './actions-inuse/actions-inuse.component';
import { InputOutputComponent } from './input-output/input-output.component';
import { TextInputComponent } from './shared/layout/text-input/text-input.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ActionComponent,
    MainHeaderComponent,
    ActionsInuseComponent,
    InputOutputComponent,
    TextInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    ClipboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
