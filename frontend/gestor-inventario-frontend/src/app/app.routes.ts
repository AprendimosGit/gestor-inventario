import { Routes } from '@angular/router';
import { DashboardAdmin } from './pages/dashboard-admin/dashboard-admin';
import { Home } from './pages/home/home';
import { QuienesSomos } from './pages/quienes-somos/quienes-somos';

export const routes: Routes = [
    { path: "dashboardAdmin", component: DashboardAdmin },
    { path: "", component: Home },
    { path: "QuienesSomos", component: QuienesSomos },
];
