const expect = require('chai').expect;
const { contieneModoPruebas } = require('../../utils');

describe('validaciones baraja', () => {
    it('detecta TEST o PRUEBA en la descripcion', () => {
        // Esta regla bloquea textos de prueba antes de crear o editar una baraja.
        expect(contieneModoPruebas('Baraja de prueba')).equal(true);
        expect(contieneModoPruebas('baraja TEST')).equal(true);
        expect(contieneModoPruebas('Baraja normal')).equal(false);
    });
});
