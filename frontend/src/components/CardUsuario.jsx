function CardUsuario({ onAcceso}) {
    return (
        <section className="container py-4">
            <h1>Identificate</h1>
            <p>Accede para administrar barajas, cartas y tarjetas temáticas.</p>

            <div className="d-flex gap-2">
                <button 
                  className="d-flex gap-2"
                  onClick={onAcceso}>
                    Conectate
                </button>
                <button 
                  className="d-flex gap-2"
                  onClick={onAcceso}>
                    Registrate
                </button>
            </div>
        </section>
    )
}

export default CardUsuario