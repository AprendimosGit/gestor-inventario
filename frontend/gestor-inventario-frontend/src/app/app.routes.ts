import { Routes } from '@angular/router';
import { DashboardAdmin } from './pages/dashboard-admin/dashboard-admin';
import { DashboardEmpleado } from './pages/dashboard-empleado/dashboard-empleado';
import { StockEmpleado } from './pages/dashboard-empleado/stock-empleado/stock-empleado';

export const routes: Routes = [
    { path: "dashboardAdmin", component: DashboardAdmin },
    { 
        path: "dashboardEmpleado",
        component: DashboardEmpleado,
        children: [
            { path: "", redirectTo: "stock", pathMatch: "full" },
            { path: "stock", component: StockEmpleado },
        ],
    },
];
