import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { PresentationModule } from './presentation/presentation.module';
import { environment } from './environments/environment';

import 'codemirror/mode/javascript/javascript';
// import 'codemirror/mode/markdown/markdown';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(PresentationModule)
  .catch((err) => console.error(err));
