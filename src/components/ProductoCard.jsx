import { Link } from 'react-router-dom'

function getImagen(nombre) {
  if (nombre?.includes('Capibara')) return '/imagenes/ChatGPT Image 14 may 2026, 02_34_17 p.m.png'
  if (nombre?.includes('Panda')) return '/imagenes/ChatGPT Image 14 may 2026, 02_34_43 p.m.png'
  if (nombre?.includes('Koala')) return '/imagenes/ChatGPT Image 14 may 2026, 02_34_59 p.m.png'
  if (nombre?.includes('Conejito')) return '/imagenes/ChatGPT Image 14 may 2026, 02_37_53 p.m.png'
  if (nombre?.includes('Dinosaurio')) return '/imagenes/ChatGPT Image 14 may 2026, 02_39_32 p.m.png'
  if (nombre?.includes('Zorro')) return '/imagenes/ChatGPT Image 14 may 2026, 02_41_30 p.m.png'
  if (nombre?.includes('Pingüino')) return '/imagenes/ChatGPT Image 14 may 2026, 02_43_28 p.m.png'
  if (nombre?.includes('León')) return '/imagenes/ChatGPT Image 14 may 2026, 02_46_56 p.m.png'
  if (nombre?.includes('Vaca')) return '/imagenes/ChatGPT Image 14 may 2026, 02_48_28 p.m.png'
  if (nombre?.includes('Unicornio')) return '/imagenes/ChatGPT Image 14 may 2026, 02_50_47 p.m.png'
  if (nombre?.includes('Cohete')) return '/imagenes/ChatGPT Image 14 may 2026, 02_53_51 p.m.png'
  return null
}

export default function ProductoCard({ producto, agregarAlCarrito }) {
  const imagen = getImagen(producto.nombre)

  return (
    <div style={{
      background: 'white',
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer',
      position: 'relative'
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translateY(-8px)'
      e.currentTarget.style.boxShadow = '0 15px 35px rgba(255,107,157,0.3)'
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'translateY(0)'
      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)'
    }}>

      {/* Badge edición especial */}
      {producto.es_edicion_especial && (
        <div style={{
          position: 'absolute',
          top: '15px', right: '15px',
          background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
          color: 'white', padding: '5px 12px',
          borderRadius: '20px', fontSize: '12px',
          fontWeight: 'bold', zIndex: 1,
          boxShadow: '0 2px 8px rgba(255,140,0,0.5)'
        }}>
          ⭐ Edición Especial
        </div>
      )}

      {/* Imagen */}
      <Link to={`/producto/${producto.id}`} style={{ textDecoration: 'none' }}>
        <div style={{
          background: producto.es_edicion_especial
            ? 'linear-gradient(135deg, #fff0f8, #f0e6ff)'
            : 'linear-gradient(135deg, #f0f8ff, #e6fff0)',
          padding: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '220px',
          overflow: 'hidden'
        }}>
          {imagen ? (
            <img
              src={imagen}
              alt={producto.nombre}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'contain',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.target.style.transform = 'scale(1)'}
            />
          ) : (
            <span style={{ fontSize: '80px' }}>💧</span>
          )}
        </div>

        <div style={{ padding: '20px' }}>
          <h3 style={{
            margin: '0 0 8px 0', color: '#333',
            fontSize: '18px', fontWeight: 'bold'
          }}>
            {producto.nombre}
          </h3>

          <p style={{
            margin: '0 0 12px 0', color: '#888',
            fontSize: '13px', lineHeight: '1.4'
          }}>
            {producto.descripcion?.substring(0, 60)}...
          </p>

          {/* Colores */}
          <div style={{ marginBottom: '15px' }}>
            <p style={{ margin: '0 0 6px 0', fontSize: '12px', color: '#999' }}>
              Colores disponibles:
            </p>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {producto.colores?.map((color, i) => (
                <span key={i} style={{
                  background: '#f5f5f5', padding: '3px 10px',
                  borderRadius: '10px', fontSize: '11px', color: '#666'
                }}>
                  {color}
                </span>
              ))}
            </div>
          </div>

          <span style={{
            fontSize: '24px', fontWeight: 'bold',
            color: producto.es_edicion_especial ? '#ff8c00' : '#ff6b9d'
          }}>
            ${producto.precio} MXN
          </span>
        </div>
      </Link>

      {/* Botón */}
      <div style={{ padding: '0 20px 20px' }}>
        <button
          onClick={() => agregarAlCarrito(producto)}
          style={{
            width: '100%', padding: '12px',
            background: producto.es_edicion_especial
              ? 'linear-gradient(135deg, #ffd700, #ff8c00)'
              : 'linear-gradient(135deg, #ff6b9d, #c44dff)',
            color: 'white', border: 'none',
            borderRadius: '12px', fontSize: '15px',
            fontWeight: 'bold', cursor: 'pointer',
            transition: 'opacity 0.2s'
          }}
          onMouseEnter={e => e.target.style.opacity = '0.85'}
          onMouseLeave={e => e.target.style.opacity = '1'}
        >
          🛒 Agregar al carrito
        </button>
      </div>
    </div>
  )
}