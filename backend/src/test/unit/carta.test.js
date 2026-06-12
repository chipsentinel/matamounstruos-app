const expect = require('chai').expect;
const { puedeCrearCartaConValor, valorCartaValido } = require('../../utils');

describe('validaciones carta', () => {
    it('valida valor maximo y limite de cartas repetidas', () => {
        // Las cartas solo pueden valer hasta 12 y solo se permiten 4 cartas del mismo valor.
        expect(valorCartaValido(12)).equal(true);
        expect(valorCartaValido(13)).equal(false);
        expect(puedeCrearCartaConValor(3)).equal(true);
        expect(puedeCrearCartaConValor(4)).equal(false);
    });
});
