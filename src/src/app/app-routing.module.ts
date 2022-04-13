import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AutomatorComponent } from './automator/automator.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'home', component: MainComponent },
  { path: 'automator', component: AutomatorComponent },
  { path: 'about', component: AboutComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
