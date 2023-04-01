import { EncuestasModel } from '../../Schemas/Encuestas.js';

export async function CrearEncuesta(req, res) {
  const { nombre, periodo } = req.body;

  let Encuesta = new EncuestasModel({
    nombre: nombre,
    open: true,
    periodo: periodo
  });

  Encuesta.save()
    .then((response) => res.status(201).json({ data: {status: true, id: response._id}, r: true }))
    .catch((err) => res.status(404).json({msg: 'Ha ocurrido un error creando la encuesta, intentelo de nuevo. ' + err, r: false}));
}
