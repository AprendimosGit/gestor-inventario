
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venta } from '../models/venta.model';
import { API_BASE_URL } from '../config/api.config';

export interface DetalleVentaRequest {
  producto: number;
  cantidad: number;
  subtotal: number;
}

export interface CrearVentaRequest {
  usuario: number;
  total: number;
  detalles: DetalleVentaRequest[];
}

export interface VentaConDetalles extends Venta {
  detalles: DetalleVentaRequest[];
}

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  private ventasUrl = `${API_BASE_URL}/ventas/`;

  constructor(private http: HttpClient) {}

  getVentas(): Observable<VentaConDetalles[]> {
    return this.http.get<VentaConDetalles[]>(this.ventasUrl);
  }

  registrarVenta(
    venta: CrearVentaRequest
  ): Observable<VentaConDetalles> {
    return this.http.post<VentaConDetalles>(
      this.ventasUrl,
      venta
    );
  }
}
