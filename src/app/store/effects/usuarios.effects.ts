import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as usuarioActions from '../actions/usuarios.actions';
import { mergeMap, tap, map, catchError } from 'rxjs/operators';
import { UsuarioService } from '../../services/usuario.service';
import { of } from 'rxjs';

@Injectable()
export class UsuariosEffects {

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
    // El pipe() me permite manipular, transforma y hacer
    // otras cosas con los observables
    // map() nos permite tomar la respuesta
    // y permite regresar cualquier cosa que quiera.
    // catchError() me atrapa cualquier error que suce en la petición.
    // of() es para crear un observable
    // En este caso se uso porque necesitamos devolver un observable y catchError() no devuelve observable
    cargarUsuarios$ = createEffect(
        () => this.actions$.pipe(
            ofType(usuarioActions.cargarUsuarios),
            // tap(data => console.log('effect tap ', data)),
            mergeMap(
                () => this.usuarioService.getUsers()
                            .pipe(
                                // tap(data => console.log('getUsers effect', data))
                                map(users => usuarioActions.cargarUsuariosSuccess({usuarios: users})),
                                catchError( err => of(usuarioActions.cargarUsuariosError({payload: err}) ))
                            )
        )
    ));

}
