// CUIDADO: no queremos imports hasta que haga falta consumir estas funciones en las vistas.

// URL base del backend. En Docker/Vite puede llegar desde VITE_API_URL.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

// Funcion base para centralizar las peticiones fetch al backend.
async function request(endpoint, options = {}) {
    const requestUrl = `${API_URL}${endpoint}`
    const response =await fetch(requestUrl, {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    })

    const data = await response.json()

    if (!response.ok){
        const error = new Error(data.reason || data.message || 'Error de peticion')
        error.status = response.status
        error.url = requestUrl
        error.data = data
        throw error
    }

    return data
}

// Usuarios
export function getUsuarios() {
    return request('/usuarios')
}

export function createUsuario(usuarios) {
    return request('/usuarios', {
        method: 'POST',
        body: JSON.stringify(usuarios),
    })
}

// Barajas
export function getBarajas() {
    return request('/barajas')
}

export function getIdBaraja(idBaraja) {
    return request(`/barajas/${idBaraja}`)
}

export function createBaraja(baraja) {
    return request('/barajas',{
        method: 'POST',
        body: JSON.stringify(baraja),
    })
}

export function updateBaraja(idBaraja, baraja) {
    return request(`/barajas/${idBaraja}`,{
        method: 'PUT',
        body: JSON.stringify(baraja),
    })
}

export function deleteBaraja(idBaraja, idUsuario) {
    return request(`/barajas/${idBaraja}`,{
        method: 'DELETE',
        body: JSON.stringify({idUsuario}),
    })
}

// Cartas
export function getCartas(){
    return request('/cartas')
}

export function getCartasPorBaraja (idBaraja) {
    return request(`/cartas/baraja/${idBaraja}`)
}

export function getIdCarta (idCarta) {
    return request(`/cartas/${idCarta}`)
} 

export function createCarta (carta) {
    return request('/cartas', {
        method: 'POST',
        body: JSON.stringify(carta),
    })
}

export function updateCarta(idCarta, carta) {
    return request(`/cartas/${idCarta}`,{
        method: 'PUT',
        body: JSON.stringify(carta),
    })
}

export function deleteCarta(idCarta, idUsuario) {
    return request(`/cartas/${idCarta}`,{
        method: 'DELETE',
        body: JSON.stringify({idUsuario}),
    })
}

// Tarjetas
export function getTarjetas() {
    return request('/tarjetas')
}

export function getIdTarjeta(idTarjeta) {
    return request(`/tarjetas/${idTarjeta}`)
}

export function createTarjeta(tarjeta) {
    return request('/tarjetas',{
        method: 'POST',
        body: JSON.stringify(tarjeta),
    })
}

// Juego
export function getCartaAleatoriaDeBaraja(idBaraja) {
    return request(`/juego/carta/aleatoria/${idBaraja}`)
}

export function getTarjetaAleatoriaDeCarta(idCarta) {
    return request(`/juego/tarjeta/aleatoria/${idCarta}`)
}

// especial ojo a escribir bien stringify
