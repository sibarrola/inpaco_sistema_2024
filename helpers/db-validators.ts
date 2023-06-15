import Rol from '../models/rol';
import Usuario from '../models/usuario';

export const esRolValido =async (rol='') => {
    const existeRol= await Rol.findOne({
         where: { rol: rol } });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la BD`)
    }

}

export const existeUsuario =async (nombre_usuario='') => {
    const existeNombreUsuario= await Usuario.findOne({
         where: { nombre_usuario}}) ;
    if (!existeNombreUsuario) {
        throw new Error(`El usuario ${nombre_usuario} NO está registrado en la BD`)
    }

}

export const existeIdUsuario =async (id='') => {
    const existeIdusu= await Usuario.findOne({
         where: { id}}) ;
    if (!existeIdusu) {
        throw new Error(`El usuario ${id} noa está registrado en la BD`)
    }

}