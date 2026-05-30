"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actualizarDatosGlobalesUsuario = void 0;
const firebaseAdmin_1 = require("../config/firebaseAdmin");
const calculations_1 = require("./calculations");
const actualizarDatosGlobalesUsuario = async (uid) => {
    const asignaturasSnap = await firebaseAdmin_1.db.collection('usuarios').doc(uid).collection('asignaturas').get();
    const asignaturas = asignaturasSnap.docs.map((doc) => {
        const data = doc.data();
        return {
            id: doc.id,
            descripcion: (data.descripcion || data.nombre),
            creditos: data.creditos,
            promedio: data.promedio,
            aprueba: data.aprueba,
        };
    });
    const usuarioRef = firebaseAdmin_1.db.collection('usuarios').doc(uid);
    const usuarioSnap = await usuarioRef.get();
    if (!usuarioSnap.exists)
        return;
    const usuarioData = usuarioSnap.data();
    const promedioGeneral = (0, calculations_1.calcularPromedioGeneral)(asignaturas);
    const becaPromedio = usuarioData.beca_promedio || 4.0;
    const beca_cumple = (0, calculations_1.verificarBeca)(promedioGeneral, becaPromedio);
    await usuarioRef.update({
        promedio: promedioGeneral,
        beca_cumple,
    });
};
exports.actualizarDatosGlobalesUsuario = actualizarDatosGlobalesUsuario;
