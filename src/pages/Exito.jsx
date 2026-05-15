import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Exito({ vaciarCarrito }) {
  const navigate = useNavigate()

  useEffect(() => {
    vaciarCarrito()
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fdf0f8, #f0e6ff)',
      display: 'flex', justifyContent: 'center',
      alignItems: 'center', padding: '30px'
    }}>
      <div style={{
        background: 'white', borderRadius: '30px',
        padding: '60px 40px', textAlign: 'center',
        maxWidth: '500px', width: '100%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
      }}>
        <div style={{ fontSize: '80px', marginBottom: '20px' }}>🎉</div>

        <h1 style={{
          fontSize: '32px', margin: '0 0 15px 0',
          background: 'linear-gradient(135deg, #ff6b9d, #c44dff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          ¡Pago exitoso!
        </h1>

        <p style={{
          color: '#888', fontSize: '16px',
          lineHeight: '1.6', marginBottom: '10px'
        }}>
          Tu pedido ha sido confirmado. 💧
        </p>

        <p style={{
          color: '#aaa', fontSize: '14px',
          marginBottom: '35px'
        }}>
          Recibirás un correo con los detalles de tu pedido pronto.
        </p>

        <div style={{
          background: 'linear-gradient(135deg, #f0fff4, #e6f7ff)',
          borderRadius: '15px', padding: '20px',
          marginBottom: '30px'
        }}>
          <p style={{ margin: '0 0 8px 0', fontWeight: 'bold', color: '#555' }}>
            🐾 ¡Gracias por tu compra en AquaKawaii!
          </p>
          <p style={{ margin: 0, color: '#888', fontSize: '13px' }}>
            Tu botella kawaii está en camino 🚀
          </p>
        </div>

        <button onClick={() => navigate('/')} style={{
          padding: '15px 40px',
          background: 'linear-gradient(135deg, #ff6b9d, #c44dff)',
          color: 'white', border: 'none',
          borderRadius: '25px', fontSize: '16px',
          fontWeight: 'bold', cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(255,107,157,0.4)'
        }}>
          Seguir comprando 💧
        </button>
      </div>
    </div>
  )
}