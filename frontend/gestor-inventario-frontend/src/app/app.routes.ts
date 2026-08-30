import { Routes } from '@angular/router';
import { DashboardAdmin } from './pages/dashboard-admin/dashboard-admin';
import { DashboardEmpleado } from './pages/dashboard-empleado/dashboard-empleado';
import { StockEmpleado } from './pages/dashboard-empleado/stock-empleado/stock-empleado';
import { RegistrarVenta } from './pages/dashboard-empleado/registrar-venta/registrar-venta';
import { Home } from './pages/home/home';
import { QuienesSomos } from './pages/quienes-somos/quienes-somos';
import { Login } from './pages/login/login';

import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
    { path: "", component: Home },
    { path: "QuienesSomos", component: QuienesSomos },
    { path: "login", component: Login},
    { path: "dashboardAdmin", component: DashboardAdmin },
    {
        path: "dashboardEmpleado",
        component: DashboardEmpleado,
        children: [
            { path: "", redirectTo: "stock", pathMatch: "full" },
            { path: "stock", component: StockEmpleado },
            { path: "registrar-venta", component: RegistrarVenta },
        ],
    },
    { path: "**", component: NotFound },
];