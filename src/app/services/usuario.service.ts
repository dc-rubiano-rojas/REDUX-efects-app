import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private URL = 'https://reqres.in/api';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any>{
    // map() de rxjs me permite tomar la respuesta o la data que 
    // viene del servicio y convertirla en algo
    return this.http.get(`${this.URL}/users?per_page=6`)
                    .pipe(
                      map(res => res['data'])
                    );
  }

}
