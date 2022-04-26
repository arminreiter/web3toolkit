import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ToolsComponent } from './tools/tools.component';
import { GenSeedPhraseComponent } from './gen-seed-phrase/gen-seed-phrase.component';
import { GetAddressFromSeedComponent } from './get-address-from-seed/get-address-from-seed.component';
import { WeiConverterComponent } from './wei-converter/wei-converter.component';
import { ToolsOverviewComponent } from './tools-overview/tools-overview.component';
import { GetBalanceComponent } from './get-balance/get-balance.component';

const routes: Routes = [
    {
        path: 'tools', component: ToolsComponent, children: [
            { path: '', component: ToolsOverviewComponent },
            { path: 'genseedphrase', component: GenSeedPhraseComponent },
            { path: 'getaddrfromseed', component: GetAddressFromSeedComponent },
            { path: 'weiconverter', component: WeiConverterComponent },
            { path: 'getbalances', component: GetBalanceComponent }
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ToolsRoutingModule { }