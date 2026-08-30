import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-empleado',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './dashboard-empleado.html',
  styleUrl: './dashboard-empleado.css',
})
export class DashboardEmpleado {}
