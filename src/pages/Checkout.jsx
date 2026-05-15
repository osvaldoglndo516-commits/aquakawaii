import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { stripePromise } from '../lib/stripe'

export default function Checkout({ carrito, vaciarCarrito }) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: ''
  })

  const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handlePago(e) {
    e.preventDefault()

    if (!form.nombre || !form.email) {
      alert('Por favor llena todos los campos requeridos')
      return
    }

    if (carrito.length === 0) {
      alert('Tu carrito está vacío')
      return
    }

    setLoading(true)

    try {
      // Guardar pedidos en Supabase
      for (const item of carrito) {
        await supabase.from('pedidos').insert({
          nombre_cliente: form.nombre,
          email_cliente: form.email,
          producto_id: item.id,
          nombre_producto: item.nombre,
          color_elegido: item.colorElegido,
          cantidad: item.cantidad || 1,
          precio_total: item.precio,
          estado: 'pendiente'
        })
      }

      // Redirigir a Stripe
      const stripe = await stripePromise

      const response = await fetch('/.netlify/functions/crear-pago', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          carrito,
          email: form.email,
          nombre: form.nombre
        })
      })

      const { sessionId, error } = await response.json()

      if (error) throw new Error(error)

      await stripe.redirectToCheckout({ sessionId })

    } catch (error) {
      console.error(error)
      alert('Error al procesar el pago: ' + error.message)
      setLoading(false)
    }
  }

  if (carrito.length === 0) {
    return (
      <div style={{
        minHeight: '80vh', display: 'flex',
        flexDirection: 'column', justifyContent: 'center',
        alignItems: 'center', gap: '20px',
        background: '#fdf0f8'
      }}>
        <span style={{ fontSize: '80px' }}>🛒</span>
        <h2 style={{ color: '#888' }}>Tu carrito está vacío</h2>
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
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fdf0f8', padding: '30px' }}>
      <div style={{
        maxWidth: '800px', margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '25px'
      }}>

        {/* Formulario */}
        <div style={{
          background: 'white', borderRadius: '25px',
          padding: '30px',
          boxShadow: '0 8px 25px rgba(0,0,0,0.08)'
        }}>
          <h2 style={{
            margin: '0 0 25px 0', color: '#333',
            fontSize: '22px'
          }}>
            📋 Datos de envío
          </h2>

          <form onSubmit={handlePago} style={{
            display: 'flex', flexDirection: 'column', gap: '16px'
          }}>
            <div>
              <label style={{
                display: 'block', marginBottom: '6px',
                color: '#555', fontWeight: '600', fontSize: '14px'
              }}>
                Nombre completo *
              </label>
              <input
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                required
                placeholder="Tu nombre"
                style={{
                  width: '100%', padding: '12px 16px',
                  border: '2px solid #eee', borderRadius: '12px',
                  fontSize: '15px', outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s'
                }}
                onFocus={e => e.target.style.borderColor = '#ff6b9d'}
                onBlur={e => e.target.style.borderColor = '#eee'}
              />
            </div>

            <div>
              <label style={{
                display: 'block', marginBottom: '6px',
                color: '#555', fontWeight: '600', fontSize: '14px'
              }}>
                Correo electrónico *
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="correo@ejemplo.com"
                style={{
                  width: '100%', padding: '12px 16px',
                  border: '2px solid #eee', borderRadius: '12px',
                  fontSize: '15px', outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s'
                }}
                onFocus={e => e.target.style.borderColor = '#ff6b9d'}
                onBlur={e => e.target.style.borderColor = '#eee'}
              />
            </div>

            <div>
              <label style={{
                display: 'block', marginBottom: '6px',
                color: '#555', fontWeight: '600', fontSize: '14px'
              }}>
                Teléfono (opcional)
              </label>
              <input
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                placeholder="555-123-4567"
                style={{
                  width: '100%', padding: '12px 16px',
                  border: '2px solid #eee', borderRadius: '12px',
                  fontSize: '15px', outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s'
                }}
                onFocus={e => e.target.style.borderColor = '#ff6b9d'}
                onBlur={e => e.target.style.borderColor = '#eee'}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '16px',
                background: loading
                  ? '#ccc'
                  : 'linear-gradient(135deg, #ff6b9d, #c44dff)',
                color: 'white', border: 'none',
                borderRadius: '15px', fontSize: '17px',
                fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer',
                marginTop: '10px',
                boxShadow: loading ? 'none' : '0 4px 15px rgba(255,107,157,0.4)',
                transition: 'all 0.3s'
              }}
            >
              {loading ? '⏳ Procesando...' : '💳 Pagar con Stripe'}
            </button>
          </form>
        </div>

        {/* Resumen */}
        <div>
          <div style={{
            background: 'white', borderRadius: '25px',
            padding: '25px',
            boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
            marginBottom: '15px'
          }}>
            <h2 style={{
              margin: '0 0 20px 0', color: '#333', fontSize: '20px'
            }}>
              🛒 Resumen
            </h2>

            {carrito.map((item, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', padding: '10px 0',
                borderBottom: i < carrito.length - 1 ? '1px solid #f0f0f0' : 'none'
              }}>
                <div>
                  <p style={{ margin: '0 0 3px 0', fontWeight: '600', fontSize: '14px', color: '#333' }}>
                    {item.nombre}
                  </p>
                  <p style={{ margin: 0, fontSize: '12px', color: '#aaa' }}>
                    Color: {item.colorElegido}
                  </p>
                </div>
                <span style={{ fontWeight: 'bold', color: '#ff6b9d' }}>
                  ${item.precio}
                </span>
              </div>
            ))}

            <div style={{
              borderTop: '2px solid #f0f0f0',
              paddingTop: '15px', marginTop: '10px',
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ fontWeight: 'bold', fontSize: '18px', color: '#333' }}>
                Total
              </span>
              <span style={{
                fontWeight: 'bold', fontSize: '24px', color: '#ff6b9d'
              }}>
                ${total} MXN
              </span>
            </div>
          </div>

          {/* Seguridad */}
          <div style={{
            background: 'linear-gradient(135deg, #f0fff4, #e6f7ff)',
            borderRadius: '15px', padding: '15px',
            textAlign: 'center'
          }}>
            <p style={{ margin: '0 0 5px 0', fontWeight: 'bold', color: '#555', fontSize: '14px' }}>
              🔒 Pago 100% seguro
            </p>
            <p style={{ margin: 0, color: '#888', fontSize: '12px' }}>
              Procesado por Stripe • SSL encriptado
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}