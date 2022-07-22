import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolsRoutingModule } from './tools-routing.module';
import { ToolsComponent } from './tools/tools.component';
import { GenSeedPhraseComponent } from './gen-seed-phrase/gen-seed-phrase.component';
import { SharedModule } from '../shared/shared.module';
import { ToolsSidebarComponent } from './tools-sidebar/tools-sidebar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GetAddressFromSeedComponent } from './get-address-from-seed/get-address-from-seed.component';
import { FormsModule } from '@angular/forms';
import { WeiConverterComponent } from './wei-converter/wei-converter.component';
import { ToolsOverviewComponent } from './tools-overview/tools-overview.component';
import { GetBalanceComponent } from './get-balance/get-balance.component';
import { GetAddressKeysFromSeedComponent } from './get-address-keys-from-seed/get-address-keys-from-seed.component';
import { DrainfundsComponent } from './drainfunds/drainfunds.component';

@NgModule({
  declarations: [
    ToolsComponent,
    GenSeedPhraseComponent,
    ToolsSidebarComponent,
    GetAddressFromSeedComponent,
    WeiConverterComponent,
    ToolsOverviewComponent,
    GetBalanceComponent,
    GetAddressKeysFromSeedComponent,
    DrainfundsComponent
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    FontAwesomeModule,
    ToolsRoutingModule
  ]
})
export class ToolsModule { }
