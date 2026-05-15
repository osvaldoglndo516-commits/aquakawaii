import { useNavigate } from 'react-router-dom'

export default function Carrito({ carrito, eliminarDelCarrito, vaciarCarrito }) {
  const navigate = useNavigate()
  const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0)

  if (carrito.length === 0) return (
    <div style={{
      minHeight: '80vh', display: 'flex',
      flexDirection: 'column', justifyContent: 'center',
      alignItems: 'center', gap: '20px',
      background: '#fdf0f8'
    }}>
      <span style={{ fontSize: '80px' }}>🛒</span>
      <h2 style={{ color: '#888', margin: 0 }}>Tu carrito está vacío</h2>
      <button onClick={() => navigate('/')} style={{
        padding: '14px 30px',
        background: 'linear-gradient(135deg, #ff6b9d, #c44dff)',
        color: 'white', border: 'none',
        borderRadius: '25px', fontSize: '16px',
        fontWeight: 'bold', cursor: 'pointer'
      }}>
        Ver botellas 💧
      </button>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#fdf0f8', padding: '30px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        <h1 style={{
          textAlign: 'center', marginBottom: '30px',
          background: 'linear-gradient(135deg, #ff6b9d, #c44dff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: '36px'
        }}>
          🛒 Mi Carrito
        </h1>

        {/* Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '25px' }}>
          {carrito.map((item, i) => (
            <div key={i} style={{
              background: 'white', borderRadius: '20px',
              padding: '20px', display: 'flex',
              alignItems: 'center', gap: '20px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
            }}>
              <span style={{ fontSize: '50px' }}>{getEmoji(item.nombre)}</span>

              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>{item.nombre}</h3>
                <p style={{ margin: '0 0 3px 0', color: '#888', fontSize: '14px' }}>
                  Color: {item.colorElegido}
                </p>
                <p style={{ margin: 0, color: '#ff6b9d', fontWeight: 'bold', fontSize: '18px' }}>
                  ${item.precio} MXN
                </p>
              </div>

              <button onClick={() => eliminarDelCarrito(i)} style={{
                background: '#ffe0e0', color: '#ff4444',
                border: 'none', borderRadius: '50%',
                width: '36px', height: '36px',
                fontSize: '18px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                ×
              </button>
            </div>
          ))}
        </div>

        {/* Total */}
        <div style={{
          background: 'white', borderRadius: '20px',
          padding: '25px', marginBottom: '20px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', marginBottom: '8px'
          }}>
            <span style={{ color: '#888', fontSize: '16px' }}>
              {carrito.length} producto(s)
            </span>
            <span style={{
              fontSize: '28px', fontWeight: 'bold',
              color: '#ff6b9d'
            }}>
              Total: ${total} MXN
            </span>
          </div>
        </div>

        {/* Botones */}
        <div style={{ display: 'flex', gap: '15px', flexDirection: 'column' }}>
          <button onClick={() => navigate('/checkout')} style={{
            padding: '16px',
            background: 'linear-gradient(135deg, #ff6b9d, #c44dff)',
            color: 'white', border: 'none',
            borderRadius: '15px', fontSize: '18px',
            fontWeight: 'bold', cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(255,107,157,0.4)'
          }}>
            💳 Proceder al pago
          </button>

          <button onClick={() => navigate('/')} style={{
            padding: '13px',
            background: 'white', color: '#888',
            border: '2px solid #eee', borderRadius: '15px',
            fontSize: '15px', cursor: 'pointer'
          }}>
            ← Seguir comprando
          </button>

          <button onClick={vaciarCarrito} style={{
            padding: '10px',
            background: 'transparent', color: '#ccc',
            border: 'none', fontSize: '14px', cursor: 'pointer'
          }}>
            🗑 Vaciar carrito
          </button>
        </div>
      </div>
    </div>
  )
}

function getEmoji(nombre) {
  if (nombre?.includes('Capibara')) return '🦫'
  if (nombre?.includes('Panda')) return '🐼'
  if (nombre?.includes('Koala')) return '🐨'
  if (nombre?.includes('Conejito')) return '🐰'
  if (nombre?.includes('Dinosaurio')) return '🦕'
  if (nombre?.includes('Zorro')) return '🦊'
  if (nombre?.includes('Pingüino')) return '🐧'
  if (nombre?.includes('León')) return '🦁'
  if (nombre?.includes('Vaca')) return '🐄'
  if (nombre?.includes('Unicornio')) return '🦄'
  if (nombre?.includes('Cohete')) return '🚀'
  return '💧'
}