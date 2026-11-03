
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../config/api.config';

export interface DetalleVenta {
  id: number;
  producto: number;
  cantidad: number;
  precio_unitario: string;
}

export interface VentaConDetalles {
  id: number;
  fecha: string;
  usuario: number;
  total: string;
  detalles: DetalleVenta[];
}

export interface CrearVentaRequest {
  usuario: number;
  total: number;
  detalles: {
    producto: number;
    cantidad: number;
    precio_unitario: number;
  }[];
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
