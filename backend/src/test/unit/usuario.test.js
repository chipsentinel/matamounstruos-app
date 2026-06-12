const expect = require('chai').expect;
const { usuarioTieneDatos } = require('../../utils');

describe('validaciones usuario', () => {
    it('comprueba que el usuario tenga nombre y password', () => {
        // El registro/acceso basico necesita los dos campos para continuar.
        expect(usuarioTieneDatos('jose', '1234')).equal(true);
        expect(usuarioTieneDatos('', '1234')).equal(false);
        expect(usuarioTieneDatos('jose', '')).equal(false);
    });
});
