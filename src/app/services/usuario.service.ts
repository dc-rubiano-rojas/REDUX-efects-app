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
    // El pipe() me permite manipular, transforma y hacer
    // otras cosas con los observables
    // map() de rxjs me permite tomar la respuesta o la data que
    // viene del servicio y convertirla en algo
    return this.http.get(`${this.URL}/users?per_page=6&delay=3`)
                    .pipe(
                      map(res => res['data'])
                    );
  }


  getUserById(id: string): Observable<any>{
    return this.http.get(`${this.URL}/users/${id}`)
                    .pipe(
                      map(res => res['data'])
                    );
  }

}
