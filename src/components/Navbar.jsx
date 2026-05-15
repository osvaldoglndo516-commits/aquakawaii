import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Navbar({ carrito, usuario, setUsuario }) {
  const navigate = useNavigate()
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0)

  async function cerrarSesion() {
    await supabase.auth.signOut()
    setUsuario(null)
    navigate('/')
  }

  return (
    <nav style={{
      background: 'white',
      padding: '10px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 20px rgba(255,107,157,0.15)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>

      {/* Logo */}
      <Link to="/" style={{ textDecoration: 'none' }}>
        <img
          src="/imagenes/logo.png"
          alt="AquaKawaii"
          style={{ height: '70px', objectFit: 'contain' }}
        />
      </Link>

      {/* Acciones */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>

        {/* Mis Pedidos — solo si está logueado */}
        {usuario && (
          <Link to="/mis-pedidos" style={{
            color: '#555', textDecoration: 'none',
            fontWeight: '600', fontSize: '15px',
            display: 'flex', alignItems: 'center', gap: '6px'
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#ff6b9d'}
          onMouseLeave={e => e.currentTarget.style.color = '#555'}>
            📦 Mis Pedidos
          </Link>
        )}

        {/* Usuario logueado */}
        {usuario ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>

            {/* Nombre */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: '#fff0f8', padding: '8px 16px',
              borderRadius: '25px'
            }}>
              <span style={{ fontSize: '18px' }}>👤</span>
              <span style={{
                color: '#ff6b9d', fontWeight: '600', fontSize: '14px'
              }}>
                {usuario.user_metadata?.nombre || usuario.email?.split('@')[0]}
              </span>
            </div>

            {/* Cerrar sesión */}
            <button onClick={cerrarSesion} style={{
              background: 'white', color: '#ff6b9d',
              border: '2px solid #ff6b9d',
              padding: '8px 18px', borderRadius: '20px',
              fontSize: '14px', fontWeight: '600',
              cursor: 'pointer', transition: 'all 0.2s'
            }}
            onMouseEnter={e => {
              e.target.style.background = '#ff6b9d'
              e.target.style.color = 'white'
            }}
            onMouseLeave={e => {
              e.target.style.background = 'white'
              e.target.style.color = '#ff6b9d'
            }}>
              Salir
            </button>
          </div>

        ) : (
          /* Botón iniciar sesión */
          <Link to="/login" style={{
            background: 'white', color: '#ff6b9d',
            border: '2px solid #ff6b9d',
            padding: '9px 22px', borderRadius: '20px',
            textDecoration: 'none', fontSize: '14px',
            fontWeight: '600', transition: 'all 0.2s',
            display: 'flex', alignItems: 'center', gap: '6px'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#ff6b9d'
            e.currentTarget.style.color = 'white'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'white'
            e.currentTarget.style.color = '#ff6b9d'
          }}>
            🔑 Iniciar sesión
          </Link>
        )}

        {/* Carrito */}
        <Link to="/carrito" style={{
          background: 'linear-gradient(135deg, #ff6b9d, #c44dff)',
          color: 'white', padding: '10px 22px',
          borderRadius: '25px', textDecoration: 'none',
          fontWeight: 'bold', fontSize: '15px',
          display: 'flex', alignItems: 'center', gap: '8px',
          boxShadow: '0 4px 15px rgba(255,107,157,0.4)',
          transition: 'transform 0.2s'
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
          🛒 {totalItems > 0 ? `(${totalItems})` : 'Carrito'}
        </Link>

      </div>
    </nav>
  )
}