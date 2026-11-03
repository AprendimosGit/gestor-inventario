export interface MovimientoStock {
  id?: number;
  tipo: 'ingreso' | 'egreso';
  fecha: string;
  cantidad: number;
  ingrediente: number;
  proveedor: number | null;
}