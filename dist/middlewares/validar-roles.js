"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.esRolRequerido = exports.esAdminRole = void 0;
const esAdminRole = (req, res, next) => {
    if (!res.locals.usuario1) {
        return res.status(500).json({
            msg: "se quiere verificar rol sin validad el token primero"
        });
    }
    const usuario = res.locals.usuario1.dataValues;
    if (usuario.Rol != "administrativo" && usuario.rol != 'administrador') {
        res.status(401).json({
            msg: `este usuario ${usuario.apellido} no puede hacer esta operación/no es administrativo ni administrador`
        });
    }
    next();
};
exports.esAdminRole = esAdminRole;
const esRolRequerido = (...roles) => {
    return (req, res, next) => {
        if (!res.locals.usuario1) {
            return res.status(500).json({
                msg: "se quiere verificar rol sin validad el token primero"
            });
        }
        const usuario = res.locals.usuario1.dataValues;
        const rolu = res.locals.usuario1.dataValues['rol'];
        if (roles.includes(rolu)) {
            res.status(401).json({
                msg: `este usuario ${usuario.apellido} no tiene un rol habilitado: (${roles} )`
            });
        }
        next();
    };
};
exports.esRolRequerido = esRolRequerido;
//# sourceMappingURL=validar-roles.js.map