/// <reference types="@angular/localize" />

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// fixes BigInt serialization issue
(BigInt.prototype as any).toJSON = function() {
  return this.toString();
};

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
