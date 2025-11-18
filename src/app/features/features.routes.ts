import { Routes } from '@angular/router';

export const featuresRoutes: Routes = [
    {
        path: '',
        redirectTo: 'livros',
        pathMatch: 'full',
    },
    {
        path: 'livros',
        loadComponent: () => import('@features/livro/livro.page').then((m) => m.LivroPage),
        title: 'Livros',
    },
    {
        path: 'autores',
        loadComponent: () => import('@features/autor/autor.page').then((m) => m.AutorPage),
        title: 'Autores',
    },
    {
        path: 'assuntos',
        loadComponent: () => import('@features/assunto/assunto.page').then((m) => m.AssuntoPage),
        title: 'Assuntos',
    },
];
