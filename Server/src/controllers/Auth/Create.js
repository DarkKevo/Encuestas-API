import { UsuariosModel } from '../../Schemas/Usuarios.js';
import bcrypt from 'bcrypt';
import { SaltRounds } from '../../index.js';
import jwt from 'jsonwebtoken';
import { token as jwt_hash } from '../../index.js';

export async function Create(correo, nombre, clave, icon) {
  let verify = await UsuariosModel.find({ correo: correo });
  if (verify.length == 0) {
    var Encripted_password = bcrypt.hashSync(clave, parseInt(SaltRounds));
    const Usuario = new UsuariosModel({
      correo: correo,
      nombre: nombre,
      clave: Encripted_password,
      icon: icon,
    });
    await Usuario.save()
      .then((response) => {
        let token = jwt.sign({ nombre: nombre, exp: Date.now() + 60 * 50000 }, jwt_hash);
        return {
          nombre: nombre,
          token: token,
          status: true,
          icon: icon,
          id: response._id,
        };
      })
      .catch((err) => {
        console.log(err);
        return false
      });
  } else {
    return false
  }
}
