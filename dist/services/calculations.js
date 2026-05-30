"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificarBeca = exports.calcularPromedioGeneral = exports.calcularPromedioDesdeNotas = void 0;
const calcularPromedioDesdeNotas = (notas) => {
    let promedio = 0;
    notas.forEach((n) => {
        promedio += n.calificacion * (n.porcentaje / 100);
    });
    return Math.round(promedio * 100) / 100;
};
exports.calcularPromedioDesdeNotas = calcularPromedioDesdeNotas;
const calcularPromedioGeneral = (asignaturas) => {
    if (asignaturas.length === 0)
        return 0;
    let totalPuntos = 0;
    let totalCreditos = 0;
    asignaturas.forEach((a) => {
        totalPuntos += a.promedio * a.creditos;
        totalCreditos += a.creditos;
    });
    if (totalCreditos === 0)
        return 0;
    return Math.round((totalPuntos / totalCreditos) * 100) / 100;
};
exports.calcularPromedioGeneral = calcularPromedioGeneral;
const verificarBeca = (promedioGeneral, becaPromedio) => {
    return promedioGeneral >= becaPromedio;
};
exports.verificarBeca = verificarBeca;
