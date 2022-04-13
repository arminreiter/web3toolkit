import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolsRoutingModule } from './tools-routing.module';
import { ToolsComponent } from './tools/tools.component';
import { GenSeedPhraseComponent } from './gen-seed-phrase/gen-seed-phrase.component';

@NgModule({
  declarations: [
    ToolsComponent,
    GenSeedPhraseComponent,
    
  ],
  imports: [
    CommonModule,
    ToolsRoutingModule
  ]
})
export class ToolsModule { }
