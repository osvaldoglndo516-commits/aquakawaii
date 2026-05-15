import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Navbar({ carrito, usuario, setUsuario }) {
  const navigate = useNavigate()
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0)
  const [menuAbierto, setMenuAbierto] = useState(false)
  const isMobile = window.innerWidth < 768

  async function cerrarSesion() {
    await supabase.auth.signOut()
    setUsuario(null)
    navigate('/')
    setMenuAbierto(false)
  }

  return (
    <nav style={{
      background: 'white',
      padding: '10px 20px',
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
          style={{ height: isMobile ? '50px' : '70px', objectFit: 'contain' }}
        />
      </Link>

      {/* Desktop */}
      {!isMobile && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
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

          {usuario ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Link to="/perfil" style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                background: '#fff0f8', padding: '8px 16px',
                borderRadius: '25px', textDecoration: 'none'
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#ffd6eb'}
              onMouseLeave={e => e.currentTarget.style.background = '#fff0f8'}>
                <span style={{ fontSize: '18px' }}>👤</span>
                <span style={{ color: '#ff6b9d', fontWeight: '600', fontSize: '14px' }}>
                  {usuario.user_metadata?.nombre || usuario.email?.split('@')[0]}
                </span>
              </Link>
              <button onClick={cerrarSesion} style={{
                background: 'white', color: '#ff6b9d',
                border: '2px solid #ff6b9d',
                padding: '8px 18px', borderRadius: '20px',
                fontSize: '14px', fontWeight: '600', cursor: 'pointer'
              }}>
                Salir
              </button>
            </div>
          ) : (
            <Link to="/login" style={{
              background: 'white', color: '#ff6b9d',
              border: '2px solid #ff6b9d',
              padding: '9px 22px', borderRadius: '20px',
              textDecoration: 'none', fontSize: '14px', fontWeight: '600'
            }}>
              🔑 Iniciar sesión
            </Link>
          )}

          <Link to="/carrito" style={{
            background: 'linear-gradient(135deg, #ff6b9d, #c44dff)',
            color: 'white', padding: '10px 22px',
            borderRadius: '25px', textDecoration: 'none',
            fontWeight: 'bold', fontSize: '15px',
            display: 'flex', alignItems: 'center', gap: '8px',
            boxShadow: '0 4px 15px rgba(255,107,157,0.4)'
          }}>
            🛒 {totalItems > 0 ? `(${totalItems})` : 'Carrito'}
          </Link>
        </div>
      )}

      {/* Mobile — carrito + hamburguesa */}
      {isMobile && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Link to="/carrito" style={{
            background: 'linear-gradient(135deg, #ff6b9d, #c44dff)',
            color: 'white', padding: '8px 14px',
            borderRadius: '20px', textDecoration: 'none',
            fontWeight: 'bold', fontSize: '14px',
            display: 'flex', alignItems: 'center', gap: '6px'
          }}>
            🛒 {totalItems > 0 ? `(${totalItems})` : ''}
          </Link>

          <button onClick={() => setMenuAbierto(!menuAbierto)} style={{
            background: 'none', border: 'none',
            fontSize: '26px', cursor: 'pointer', color: '#ff6b9d'
          }}>
            {menuAbierto ? '✕' : '☰'}
          </button>
        </div>
      )}

      {/* Menú mobile desplegable */}
      {isMobile && menuAbierto && (
        <div style={{
          position: 'absolute', top: '70px', left: 0, right: 0,
          background: 'white', padding: '20px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          display: 'flex', flexDirection: 'column', gap: '15px',
          zIndex: 999
        }}>
          {usuario ? (
            <>
              <Link to="/perfil" onClick={() => setMenuAbierto(false)} style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                background: '#fff0f8', padding: '12px 16px',
                borderRadius: '15px', textDecoration: 'none'
              }}>
                <span>👤</span>
                <span style={{ color: '#ff6b9d', fontWeight: '600' }}>
                  {usuario.user_metadata?.nombre || usuario.email?.split('@')[0]}
                </span>
              </Link>

              <Link to="/mis-pedidos" onClick={() => setMenuAbierto(false)} style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                color: '#555', textDecoration: 'none',
                fontWeight: '600', fontSize: '15px',
                padding: '10px 0', borderBottom: '1px solid #f0f0f0'
              }}>
                📦 Mis Pedidos
              </Link>

              <button onClick={cerrarSesion} style={{
                background: 'white', color: '#ff6b9d',
                border: '2px solid #ff6b9d',
                padding: '12px', borderRadius: '15px',
                fontSize: '15px', fontWeight: '600', cursor: 'pointer'
              }}>
                Salir
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setMenuAbierto(false)} style={{
              background: 'linear-gradient(135deg, #ff6b9d, #c44dff)',
              color: 'white', padding: '14px',
              borderRadius: '15px', textDecoration: 'none',
              fontSize: '16px', fontWeight: 'bold', textAlign: 'center'
            }}>
              🔑 Iniciar sesión
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}
