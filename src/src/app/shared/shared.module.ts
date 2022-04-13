import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from '../app-routing.module';
import { MainHeaderComponent } from './layout/main-header/main-header.component';



@NgModule({
  declarations: [
    MainHeaderComponent,
    SidebarComponent,
    SidenavComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  exports: [
    MainHeaderComponent,
    SidebarComponent,
    SidenavComponent
  ]
})
export class SharedModule { }
