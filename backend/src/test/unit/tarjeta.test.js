const expect = require('chai').expect;
const { tarjetaTieneDatos } = require('../../utils');

describe('validaciones tarjeta', () => {
    it('comprueba que la tarjeta tenga los datos necesarios', () => {
        // Una tarjeta necesita titulo, contenido y baraja asociada para poder crearse.
        expect(tarjetaTieneDatos('Repaso', 'Contenido de estudio', 1)).equal(true);
        expect(tarjetaTieneDatos('', 'Contenido de estudio', 1)).equal(false);
        expect(tarjetaTieneDatos('Repaso', '', 1)).equal(false);
        expect(tarjetaTieneDatos('Repaso', 'Contenido de estudio', null)).equal(false);
    });
});
