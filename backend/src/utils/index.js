function contieneModoPruebas(texto) {
    return /TEST|PRUEBA/i.test(String(texto || ''));
}

function valorCartaValido(valor) {
    return Number(valor) <= 12;
}

function puedeCrearCartaConValor(totalCartasMismoValor) {
    return Number(totalCartasMismoValor) < 4;
}

function debeMostrarTarjeta(tipoResultado) {
    return tipoResultado !== 'APTO';
}

function tarjetaTieneDatos(titulo, contenido, idBaraja) {
    return Boolean(titulo && contenido && idBaraja);
}

function usuarioTieneDatos(nombre, password) {
    return Boolean(nombre && password);
}

module.exports = {
    contieneModoPruebas,
    valorCartaValido,
    puedeCrearCartaConValor,
    debeMostrarTarjeta,
    tarjetaTieneDatos,
    usuarioTieneDatos
};
