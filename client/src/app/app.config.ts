import { ApplicationConfig, importProvidersFrom, Injectable,LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations} from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { errorInterceptor } from './_interceptors/error.interceptor';
import { jwtInterceptor } from './_interceptors/jwt.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { loadingInterceptor } from './_interceptors/loading.interceptor';
import { TimeagoModule,TimeagoIntl,TimeagoFormatter, TimeagoCustomFormatter} from 'ngx-timeago';
import { strings as esStrings } from 'ngx-timeago/language-strings/es';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs);

@Injectable()
export class MyIntl extends TimeagoIntl {
  constructor() {
    super();
    this.strings = esStrings;
    this.changes.next(); // Notificar el cambio de idioma
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([errorInterceptor,jwtInterceptor, loadingInterceptor])),
    provideAnimations(),
    provideToastr({
      positionClass:'toast-bottom-right'
    }),
    importProvidersFrom(NgxSpinnerModule, TimeagoModule.forRoot(({
      intl: { provide: TimeagoIntl, useClass: MyIntl }, // Usa la configuración en español
      formatter: { provide: TimeagoFormatter, useClass: TimeagoCustomFormatter }, // Usa el formateador avanzado
    }))),
    { provide: LOCALE_ID, useValue: 'es-AR' },
    
    
    
  ]
};
