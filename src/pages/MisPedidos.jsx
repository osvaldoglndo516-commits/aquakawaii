import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function MisPedidos({ usuario }) {
  const navigate = useNavigate()
  const [pedidos, setPedidos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!usuario) { navigate('/login'); return }
    cargarPedidos()
  }, [usuario])

  async function cargarPedidos() {
    const { data, error } = await supabase
      .from('pedidos')
      .select('*')
      .eq('email_cliente', usuario.email)
      .order('creado_en', { ascending: false })

    if (error) console.error(error)
    else setPedidos(data)
    setLoading(false)
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

  function formatFecha(fecha) {
    return new Date(fecha).toLocaleDateString('es-MX', {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    })
  }

  function getEstadoColor(estado) {
    switch (estado) {
      case 'pagado': return { bg: '#e6f7ee', color: '#1a7a4a', label: '✅ Pagado' }
      case 'enviado': return { bg: '#e6f0ff', color: '#1a4a7a', label: '🚚 Enviado' }
      case 'entregado': return { bg: '#f0e6ff', color: '#4a1a7a', label: '📦 Entregado' }
      default: return { bg: '#fff4e6', color: '#7a4a1a', label: '⏳ Pendiente' }
    }
  }

  if (loading) return (
    <div style={{
      display: 'flex', justifyContent: 'center',
      alignItems: 'center', minHeight: '60vh',
      fontSize: '24px', color: '#ff6b9d'
    }}>
      💧 Cargando pedidos...
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#fdf0f8', padding: '40px 30px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{
            fontSize: '36px', margin: '0 0 10px 0',
            background: 'linear-gradient(135deg, #ff6b9d, #c44dff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold'
          }}>
            📦 Mis Pedidos
          </h1>
          <p style={{ color: '#aaa', fontSize: '16px', margin: 0 }}>
            Hola {usuario?.user_metadata?.nombre || usuario?.email?.split('@')[0]} 👋
          </p>
        </div>

        {/* Sin pedidos */}
        {pedidos.length === 0 ? (
          <div style={{
            background: 'white', borderRadius: '25px',
            padding: '60px', textAlign: 'center',
            boxShadow: '0 8px 25px rgba(0,0,0,0.08)'
          }}>
            <span style={{ fontSize: '70px', display: 'block', marginBottom: '20px' }}>🛒</span>
            <h2 style={{ color: '#888', margin: '0 0 10px 0' }}>
              Aún no tienes pedidos
            </h2>
            <p style={{ color: '#aaa', marginBottom: '30px' }}>
              ¡Explora nuestra colección y encuentra tu botella favorita!
            </p>
            <button onClick={() => navigate('/')} style={{
              padding: '14px 35px',
              background: 'linear-gradient(135deg, #ff6b9d, #c44dff)',
              color: 'white', border: 'none',
              borderRadius: '25px', fontSize: '16px',
              fontWeight: 'bold', cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(255,107,157,0.4)'
            }}>
              Ver botellas 💧
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {pedidos.map((pedido, i) => {
              const estado = getEstadoColor(pedido.estado)
              return (
                <div key={i} style={{
                  background: 'white', borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.08)'
                }}>
                  {/* Header del pedido */}
                  <div style={{
                    background: 'linear-gradient(135deg, #fff0f8, #f5e6ff)',
                    padding: '16px 24px',
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', flexWrap: 'wrap', gap: '10px'
                  }}>
                    <div>
                      <p style={{ margin: '0 0 4px 0', fontSize: '13px', color: '#aaa' }}>
                        Pedido realizado
                      </p>
                      <p style={{ margin: 0, fontWeight: '600', color: '#555', fontSize: '14px' }}>
                        {formatFecha(pedido.creado_en)}
                      </p>
                    </div>

                    {/* Estado */}
                    <div style={{
                      background: estado.bg,
                      color: estado.color,
                      padding: '6px 16px',
                      borderRadius: '20px',
                      fontSize: '13px',
                      fontWeight: 'bold'
                    }}>
                      {estado.label}
                    </div>
                  </div>

                  {/* Detalle del pedido */}
                  <div style={{
                    padding: '20px 24px',
                    display: 'flex', alignItems: 'center',
                    gap: '20px'
                  }}>
                    {/* Emoji */}
                    <div style={{
                      width: '70px', height: '70px',
                      background: 'linear-gradient(135deg, #fff0f8, #f5e6ff)',
                      borderRadius: '15px',
                      display: 'flex', alignItems: 'center',
                      justifyContent: 'center', fontSize: '40px',
                      flexShrink: 0
                    }}>
                      {getEmoji(pedido.nombre_producto)}
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        margin: '0 0 6px 0', color: '#333',
                        fontSize: '18px', fontWeight: 'bold'
                      }}>
                        {pedido.nombre_producto}
                      </h3>
                      <p style={{ margin: '0 0 4px 0', color: '#888', fontSize: '14px' }}>
                        Color: <strong>{pedido.color_elegido}</strong>
                      </p>
                      <p style={{ margin: 0, color: '#888', fontSize: '14px' }}>
                        Cantidad: <strong>{pedido.cantidad}</strong>
                      </p>
                    </div>

                    {/* Precio */}
                    <div style={{ textAlign: 'right' }}>
                      <p style={{
                        margin: 0, fontSize: '24px',
                        fontWeight: 'bold', color: '#ff6b9d'
                      }}>
                        ${pedido.precio_total} MXN
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Botón seguir comprando */}
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <button onClick={() => navigate('/')} style={{
                padding: '14px 35px',
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
        )}
      </div>
    </div>
  )
}