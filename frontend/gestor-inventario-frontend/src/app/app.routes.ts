import { Routes } from '@angular/router';
import { DashboardAdmin } from './pages/dashboard-admin/dashboard-admin';
import { DashboardEmpleado } from './pages/dashboard-empleado/dashboard-empleado';

export const routes: Routes = [
    { path: "dashboardAdmin", component: DashboardAdmin },
    { path: "dashboardEmpleado", component: DashboardEmpleado}
];
