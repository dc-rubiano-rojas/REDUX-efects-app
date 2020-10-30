import { createReducer, on } from '@ngrx/store';
import { Usuario } from '../../models/usuario.model';

// Ya que el index esta exportando todo podemos importar las actiones
// de esta forma
import { 
    cargarUsuario,
    cargarUsuarioError,
    cargarUsuarioSuccess
} from '../actions';



export interface UsuarioState {
    id: string;
    user: Usuario;
    loaded: boolean;
    loading: boolean;
    error: any;
}

export const UsuarioInitialState: UsuarioState = {
    id: null,
    user: null,
    loaded: false,
    loading: false,
    error: null
}

const _UsuarioReducer = createReducer(UsuarioInitialState,

    on(cargarUsuario, (state, {id}) => ({
        ...state,
        loading: true,
        id
    })),

    on(cargarUsuarioSuccess, (state, { usuario }) => ({
        ...state,
        loading: false,
        loaded: true,
        user: {...usuario}
    })),

    on(cargarUsuarioError, (state, {payload}) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            name: payload.name,
            message: payload.message
        }
    })),
);


export function usuarioReducer(state, action) {
    return _UsuarioReducer(state, action);
}