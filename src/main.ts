/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { AppGlobal } from './app/app.global';

declare var config: AppGlobal;

var providers = [{ provide: AppGlobal, useValue: config }];

platformBrowserDynamic(providers)
  .bootstrapModule(AppModule, {
    ngZoneEventCoalescing: true,
  })
  .catch(err => console.error(err));
