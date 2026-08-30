import { Routes } from '@angular/router';
import { DashboardAdmin } from './pages/dashboard-admin/dashboard-admin';
import { Home } from './pages/home/home';
import { QuienesSomos } from './pages/quienes-somos/quienes-somos';
import { NotFound } from './pages/not-found/not-found';
//MATI, TUS RUTAS TIENEN QUE IR ACÁ. LA DE 404 TIENE QUE SER LA ÚLTIMA EN INSERTARSE PQ ES CUANDO//
//NO ENCUENTRA NINGUNA DE LAS OTRAS//




export const routes: Routes = [
    { path: "dashboardAdmin", component: DashboardAdmin },
    { path: "", component: Home },
    { path: "QuienesSomos", component: QuienesSomos },
    { path: "**", component: NotFound }
];
