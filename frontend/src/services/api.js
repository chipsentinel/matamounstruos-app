// CUIDADO LOS IMPORTS SE PONEN SOLOS CUANDO 'export'

const API_URL = 'http://localhost:3000'


// Funcion base para centralizar las peticiones fetch al backend.
async function request(endpoint, options = {}) {
    const response =await fetch(`${API_URL}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    })

    const data = await response.json()

    if (!response.ok){
        throw new Error(data.message || 'Error de peticion')
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

// Juego



// especial ojo a escribir bien stringify