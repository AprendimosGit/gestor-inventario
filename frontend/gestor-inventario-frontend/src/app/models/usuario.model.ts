export interface Usuario {
  id?: string;
  nombre: string;
  apellido: string;
  mail: string;
  password?: string;
  rol: number;
}