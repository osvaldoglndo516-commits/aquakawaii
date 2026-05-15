import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Perfil({ usuario }) {
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
      .limit(5)

    if (!error) setPedidos(data)
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

  function getEstadoColor(estado) {
    switch (estado) {
      case 'pagado': return { bg: '#e6f7ee', color: '#1a7a4a', label: '✅ Pagado' }
      case 'enviado': return { bg: '#e6f0ff', color: '#1a4a7a', label: '🚚 Enviado' }
      case 'entregado': return { bg: '#f0e6ff', color: '#4a1a7a', label: '📦 Entregado' }
      default: return { bg: '#fff4e6', color: '#7a4a1a', label: '⏳ Pendiente' }
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fdf0f8', padding: '40px 30px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        {/* Header perfil */}
        <div style={{
          background: 'white', borderRadius: '25px',
          padding: '30px', marginBottom: '25px',
          boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
          display: 'flex', alignItems: 'center', gap: '20px'
        }}>
          <div style={{
            width: '80px', height: '80px',
            background: 'linear-gradient(135deg, #ff6b9d, #c44dff)',
            borderRadius: '50%', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            fontSize: '36px', flexShrink: 0
          }}>
            👤
          </div>
          <div>
            <h1 style={{
              margin: '0 0 6px 0', fontSize: '26px',
              background: 'linear-gradient(135deg, #ff6b9d, #c44dff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold'
            }}>
              {usuario?.user_metadata?.nombre || usuario?.email?.split('@')[0]}
            </h1>
            <p style={{ margin: 0, color: '#aaa', fontSize: '14px' }}>
              {usuario?.email}
            </p>
          </div>
        </div>

        {/* Compras recientes */}
        <div style={{
          background: 'white', borderRadius: '25px',
          padding: '25px',
          boxShadow: '0 8px 25px rgba(0,0,0,0.08)'
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', marginBottom: '20px'
          }}>
            <h2 style={{ margin: 0, color: '#333', fontSize: '20px' }}>
              🛍️ Compras recientes
            </h2>
            <button onClick={() => navigate('/mis-pedidos')} style={{
              background: 'none', border: 'none',
              color: '#ff6b9d', fontWeight: '600',
              cursor: 'pointer', fontSize: '14px'
            }}>
              Ver todos →
            </button>
          </div>

          {loading ? (
            <p style={{ color: '#aaa', textAlign: 'center' }}>💧 Cargando...</p>
          ) : pedidos.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '30px' }}>
              <p style={{ color: '#aaa' }}>Aún no tienes compras</p>
              <button onClick={() => navigate('/')} style={{
                padding: '10px 25px',
                background: 'linear-gradient(135deg, #ff6b9d, #c44dff)',
                color: 'white', border: 'none',
                borderRadius: '20px', cursor: 'pointer',
                fontWeight: 'bold'
              }}>
                Ver botellas 💧
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {pedidos.map((pedido, i) => {
                const estado = getEstadoColor(pedido.estado)
                return (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center',
                    gap: '15px', padding: '12px',
                    background: '#fdf0f8', borderRadius: '15px'
                  }}>
                    <span style={{ fontSize: '30px' }}>{getEmoji(pedido.nombre_producto)}</span>
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: '0 0 3px 0', fontWeight: '600', color: '#333' }}>
                        {pedido.nombre_producto}
                      </p>
                      <p style={{ margin: 0, fontSize: '12px', color: '#aaa' }}>
                        {new Date(pedido.creado_en).toLocaleDateString('es-MX')}
                      </p>
                    </div>
                    <div style={{
                      background: estado.bg, color: estado.color,
                      padding: '4px 12px', borderRadius: '15px',
                      fontSize: '12px', fontWeight: 'bold'
                    }}>
                      {estado.label}
                    </div>
                    <p style={{ margin: 0, fontWeight: 'bold', color: '#ff6b9d' }}>
                      ${pedido.precio_total}
                    </p>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
