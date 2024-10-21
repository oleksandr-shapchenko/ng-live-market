import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./assets-dashboard/pages/assets-dashboard/assets-dashboard.component'),
  },
  { path: '**', redirectTo: '' },
];
