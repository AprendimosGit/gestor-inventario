
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { API_BASE_URL } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuariosUrl = `${API_BASE_URL}/usuarios/`;
  private loginUrl = `${API_BASE_URL}/login/`;

  constructor(private http: HttpClient) {}

  login(mail: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, {
      mail,
      password
    });
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.usuariosUrl);
  }

  crearUsuario(usuario: Omit<Usuario, 'id'>): Observable<Usuario> {
    return this.http.post<Usuario>(this.usuariosUrl, usuario);
  }
}
