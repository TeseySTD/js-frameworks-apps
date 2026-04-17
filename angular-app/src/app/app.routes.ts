import { Routes } from '@angular/router';
import { Home } from '@/features/home/pages/home';
import { Admin } from './features/admin/pages/admin/admin';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'articles', loadChildren: () => import('./features/article/article.routes').then(m => m.default) },
    { path: 'admin', component: Admin }
];
