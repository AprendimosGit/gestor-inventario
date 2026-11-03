import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venta } from '../models/venta.model';

export interface DetalleVentaRequest {
  producto: number;
  cantidad: number;
  precio_unitario: number;
}

export interface CrearVentaRequest {
  usuario: number;
  total: number;
  detalles: DetalleVentaRequest[];
}

export interface VentaConDetalles extends Venta {
  detalles: Array<DetalleVentaRequest & { id: number }>;
}


@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private ventasUrl = 'http://localhost:8000/api/v1/ventas/';

  constructor(private http: HttpClient) {}

  getVentas(): Observable<VentaConDetalles[]> {
    return this.http.get<VentaConDetalles[]>(this.ventasUrl);
  }

  registrarVenta(venta: CrearVentaRequest): Observable<VentaConDetalles> {
    return this.http.post<VentaConDetalles>(this.ventasUrl, venta);
  }
}
