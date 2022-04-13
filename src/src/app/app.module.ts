import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import { ActionComponent } from './shared/layout/action/action.component';
import { ActionsInuseComponent } from './actions-inuse/actions-inuse.component';
import { InputOutputComponent } from './input-output/input-output.component';
import { MainComponent } from './main/main.component';
import { AboutComponent } from './about/about.component';
import { AutomatorComponent } from './automator/automator.component';
import { ToolsModule } from './tools/tools.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    ActionComponent,
    ActionsInuseComponent,
    InputOutputComponent,
    MainComponent,
    AboutComponent,
    AutomatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    ClipboardModule,
    SharedModule,
    ToolsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
