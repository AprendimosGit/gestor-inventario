export interface MovimientoStock {
  id?: number;
  tipo: string;
  fecha: string;
  cantidad: number;
  id_ingrediente: number;
  id_usuario: number;
  id_proveedor: number | null;
  id_venta: number | null;
}