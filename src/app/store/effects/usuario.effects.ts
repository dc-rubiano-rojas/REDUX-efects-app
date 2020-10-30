import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as usuarioActions from '../actions';
import { mergeMap, tap, map, catchError } from 'rxjs/operators';
import { UsuarioService } from '../../services/usuario.service';
import { of } from 'rxjs';

@Injectable()
export class UsuarioEffects {

    constructor(
        // $ significa que es un observable
        // Este Actions es un observable que esta pendiente de
        // todas las acciones que se disparan
        private actions$: Actions,
        private usuarioService: UsuarioService
    ) {}

    // ofType() me permite especificar cual es la action
    // que voy a evaluar.
    // Cualquier acción que no sea esa no pasa del ofType
    // y muere hay.
    // tap() me permite activar efectos secundarios. En este solo mostrar la data.
    // mergeMap() nos va ayudar a poder disparar un nuevo observable
    // y mezclarlo con el obsercable anterior.
    // En el mergeMap tengo la información de la accion(action)
    // El pipe() me permite manipular, transforma y hacer
    // otras cosas con los observables
    // map() nos permite tomar la respuesta
    // y permite regresar cualquier cosa que quiera.
    // catchError() me atrapa cualquier error que suce en la petición.
    // of() es para crear un observable
    // En este caso se uso porque necesitamos devolver un observable y catchError() no devuelve observable
    cargarUsuario$ = createEffect(
        () => this.actions$.pipe(
            ofType( usuarioActions.cargarUsuario ),
            // tap(data => console.log('effect tap ', data)),
            mergeMap(
                (action) => this.usuarioService.getUserById(action.id)
                            .pipe(
                                // tap(data => console.log('getUsers effect', data))
                                map(user => usuarioActions.cargarUsuarioSuccess({usuario: user})),
                                catchError( err => of(usuarioActions.cargarUsuarioError({payload: err}) ))
                            )
        )
    ));

}
