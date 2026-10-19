import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
    private usuariosUrl = 'http://localhost:8000/api/v1/usuarios/';
    
    login(mail: string, password: string): Observable<any> {
      return this.http.post<any>('http://localhost:8000/api/v1/login/', {
        mail,
        password
      });
    }
    

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.usuariosUrl);
  }
  
  crearUsuario(usuario: Omit<Usuario, 'id'>): Observable<Usuario> {
    return this.http.post<Usuario>(this.usuariosUrl, usuario);
  }

}

