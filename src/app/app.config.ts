import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {
    ApplicationConfig,
    provideBrowserGlobalErrorListeners,
    provideZoneChangeDetection,
} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, TitleStrategy, withInMemoryScrolling } from '@angular/router';
import Lara from '@primeng/themes/lara';
import { providePrimeNG } from 'primeng/config';

import { TemplatePageTitleStrategy } from '@core/config/template-page-title.strategy';
import { ErrorInterceptor } from '@core/interceptors/error.interceptor';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),

        provideAnimations(),

        providePrimeNG({
            theme: {
                preset: Lara,
                options: {
                    cssLayer: {
                        order: 'primeng, tailwind-base, tailwind-utilities',
                    },
                },
            },
        }),

        provideHttpClient(withInterceptorsFromDi()),
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        provideRouter(
            routes,
            withInMemoryScrolling({
                scrollPositionRestoration: 'top',
                anchorScrolling: 'enabled',
            }),
        ),

        {
            provide: TitleStrategy,
            useClass: TemplatePageTitleStrategy,
        },
    ],
};
