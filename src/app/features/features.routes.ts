import { Routes } from '@angular/router';

export const featuresRoutes: Routes = [
    {
        path: 'inicio',
        loadComponent: () => import('@features/inicio/inicio.page').then((m) => m.InicioPage),
        title: 'Início',
    },
    {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full',
    },
];
