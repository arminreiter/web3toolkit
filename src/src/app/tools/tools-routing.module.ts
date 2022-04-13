import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ToolsComponent } from './tools/tools.component';
import { GenSeedPhraseComponent } from './gen-seed-phrase/gen-seed-phrase.component';

const routes: Routes = [
    {
        path: 'tools', component: ToolsComponent, children: [
            { path: 'genseedphrase', component: GenSeedPhraseComponent }
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ToolsRoutingModule { }