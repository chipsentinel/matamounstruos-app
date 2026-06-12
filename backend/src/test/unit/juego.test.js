const expect = require('chai').expect;
const { debeMostrarTarjeta } = require('../../utils');

describe('validaciones juego', () => {
    it('decide cuando se debe mostrar una tarjeta de repaso', () => {
        // APTO termina la ronda; el resto de resultados necesitan tarjeta.
        expect(debeMostrarTarjeta('APTO')).equal(false);
        expect(debeMostrarTarjeta('NO_APTO')).equal(true);
        expect(debeMostrarTarjeta('PRUEBA_OTRA_VEZ')).equal(true);
    });
});
