import { Routes } from '@angular/router';

import { featuresRoutes } from '@features/features.routes';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('@shared/components/layout/layout.component').then((m) => m.AppLayoutComponent),
        children: featuresRoutes,
    },
];
