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
import { MainComponent } from './main/main.component';
import { AboutComponent } from './about/about.component';
import { SidenavComponent } from './shared/layout/sidenav/sidenav.component';
import { AutomatorComponent } from './automator/automator.component';
import { ToolsModule } from './tools/tools.module';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ActionComponent,
    MainHeaderComponent,
    ActionsInuseComponent,
    InputOutputComponent,
    MainComponent,
    AboutComponent,
    SidenavComponent,
    AutomatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    ClipboardModule,
    ToolsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
