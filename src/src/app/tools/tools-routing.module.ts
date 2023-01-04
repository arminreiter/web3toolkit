import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ToolsComponent } from './tools/tools.component';
import { GenSeedPhraseComponent } from './gen-seed-phrase/gen-seed-phrase.component';
import { GetAddressFromSeedComponent } from './get-address-from-seed/get-address-from-seed.component';
import { WeiConverterComponent } from './wei-converter/wei-converter.component';
import { ToolsOverviewComponent } from './tools-overview/tools-overview.component';
import { GetBalanceComponent } from './get-balance/get-balance.component';
import { GetAddressKeysFromSeedComponent } from './get-address-keys-from-seed/get-address-keys-from-seed.component';
import { DrainfundsComponent } from './drainfunds/drainfunds.component';
import { GetAddressFromKeyComponent } from './get-address-from-key/get-address-from-key.component';
import { GenerateKeypairComponent } from './generate-keypair/generate-keypair.component';
import { IsValidSeedphraseComponent } from './is-valid-seedphrase/is-valid-seedphrase.component';
import { IsValidAddressComponent } from './is-valid-address/is-valid-address.component';

const routes: Routes = [
    {
        path: 'tools', component: ToolsComponent, children: [
            { path: '', component: ToolsOverviewComponent },
            { path: 'genseedphrase', component: GenSeedPhraseComponent },
            { path: 'genkeypair', component: GenerateKeypairComponent },
            { path: 'getaddrfromseed', component: GetAddressFromSeedComponent },
            { path: 'getaddrkeysfromseed', component: GetAddressKeysFromSeedComponent },
            { path: 'getaddrfromkey', component: GetAddressFromKeyComponent},
            { path: 'weiconverter', component: WeiConverterComponent },
            { path: 'getbalances', component: GetBalanceComponent },
            { path: 'drainfunds', component: DrainfundsComponent},
            { path: 'isvalidseed', component: IsValidSeedphraseComponent },
            { path: 'isvalidaddress', component: IsValidAddressComponent }
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ToolsRoutingModule { }