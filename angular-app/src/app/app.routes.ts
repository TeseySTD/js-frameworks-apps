import { Routes } from '@angular/router';
import { Home } from '@/features/home/pages/home';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'articles', loadChildren: () => import('./features/article/article.routes').then(m => m.default) },
];
