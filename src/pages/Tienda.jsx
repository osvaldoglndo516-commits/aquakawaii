import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import ProductoCard from '../components/ProductoCard'

export default function Tienda({ agregarAlCarrito }) {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtro, setFiltro] = useState('todos')

  useEffect(() => {
    cargarProductos()
  }, [])

  async function cargarProductos() {
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .order('es_edicion_especial', { ascending: true })
      .order('nombre')

    if (error) console.error(error)
    else setProductos(data)
    setLoading(false)
  }

  const productosFiltrados = productos.filter(p => {
    if (filtro === 'todos') return true
    if (filtro === 'normales') return !p.es_edicion_especial
    if (filtro === 'especiales') return p.es_edicion_especial
    return true
  })

  if (loading) return (
    <div style={{
      display: 'flex', justifyContent: 'center',
      alignItems: 'center', minHeight: '60vh',
      fontSize: '24px', color: '#ff6b9d'
    }}>
      💧 Cargando botellas...
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>

      {/* ── HERO ── */}
      <div style={{
        background: 'linear-gradient(135deg, #fff0f8 0%, #f5e6ff 50%, #ffe0f0 100%)',
        padding: '80px 40px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Círculos decorativos */}
        <div style={{
          position: 'absolute', top: '-60px', left: '-60px',
          width: '200px', height: '200px', borderRadius: '50%',
          background: 'rgba(255,107,157,0.1)'
        }}/>
        <div style={{
          position: 'absolute', bottom: '-40px', right: '-40px',
          width: '150px', height: '150px', borderRadius: '50%',
          background: 'rgba(196,77,255,0.1)'
        }}/>

        <img
          src="/imagenes/logo.png"
          alt="AquaKawaii"
          style={{
            height: '200px', objectFit: 'contain',
            marginBottom: '20px',
            filter: 'drop-shadow(0 10px 30px rgba(255,107,157,0.3))'
          }}
        />

        <p style={{
          fontSize: '20px', color: '#888',
          margin: '0 0 10px 0', fontWeight: '500'
        }}>
          🌿 Botellas kawaii de 700ml • Libre de BPA • Popote de silicona
        </p>

        {/* Badges */}
        <div style={{
          display: 'flex', justifyContent: 'center',
          gap: '15px', flexWrap: 'wrap', marginTop: '20px'
        }}>
          {[
            { icon: '💧', text: '700ml' },
            { icon: '🌿', text: 'Libre de BPA' },
            { icon: '🥤', text: 'Popote de silicona' },
            { icon: '🔒', text: 'A prueba de fugas' },
          ].map((b, i) => (
            <div key={i} style={{
              background: 'white',
              padding: '10px 20px',
              borderRadius: '25px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#666',
              boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
              display: 'flex', alignItems: 'center', gap: '6px'
            }}>
              {b.icon} {b.text}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: '35px' }}>
          <a href="#productos" style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #ff6b9d, #c44dff)',
            color: 'white', padding: '15px 40px',
            borderRadius: '30px', textDecoration: 'none',
            fontSize: '18px', fontWeight: 'bold',
            boxShadow: '0 8px 25px rgba(255,107,157,0.4)',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.target.style.transform = 'scale(1)'}
          >
            Ver colección 🐾
          </a>
        </div>
      </div>

      {/* ── SECCIÓN CARACTERÍSTICAS ── */}
      <div style={{
        background: 'white',
        padding: '60px 40px',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '32px', marginBottom: '40px',
          color: '#333', fontWeight: 'bold'
        }}>
          ¿Por qué elegir AquaKawaii? 💕
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '30px', maxWidth: '900px', margin: '0 auto'
        }}>
          {[
            { icon: '🌿', title: 'Libre de BPA', desc: 'Material Tritán de alta calidad, seguro para toda la familia' },
            { icon: '💧', title: '700ml', desc: 'Capacidad ideal para mantenerte hidratado todo el día' },
            { icon: '🥤', title: 'Popote de silicona', desc: 'Suave, reutilizable y fácil de limpiar' },
            { icon: '🎨', title: 'Diseños únicos', desc: 'Elige entre 11 diseños kawaii adorables' },
          ].map((c, i) => (
            <div key={i} style={{
              padding: '30px 20px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #fff0f8, #f5e6ff)',
              transition: 'transform 0.3s'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ fontSize: '40px', marginBottom: '15px' }}>{c.icon}</div>
              <h3 style={{ color: '#333', margin: '0 0 10px 0', fontSize: '18px' }}>{c.title}</h3>
              <p style={{ color: '#888', fontSize: '14px', lineHeight: '1.5', margin: 0 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── PRODUCTOS ── */}
      <div id="productos" style={{
        background: '#fdf0f8',
        padding: '60px 40px'
      }}>
        <h2 style={{
          textAlign: 'center', fontSize: '36px',
          marginBottom: '10px', color: '#333', fontWeight: 'bold'
        }}>
          Nuestra Colección 🐾
        </h2>
        <p style={{
          textAlign: 'center', color: '#aaa',
          marginBottom: '35px', fontSize: '16px'
        }}>
          Encuentra tu botella kawaii favorita
        </p>

        {/* Filtros */}
        <div style={{
          display: 'flex', justifyContent: 'center',
          gap: '12px', marginBottom: '40px', flexWrap: 'wrap'
        }}>
          {[
            { key: 'todos', label: '🐾 Todas' },
            { key: 'normales', label: '🐼 Colección Animal' },
            { key: 'especiales', label: '⭐ Edición Especial' }
          ].map(({ key, label }) => (
            <button key={key} onClick={() => setFiltro(key)} style={{
              padding: '12px 28px',
              borderRadius: '25px',
              border: 'none', cursor: 'pointer',
              fontSize: '15px', fontWeight: 'bold',
              background: filtro === key
                ? 'linear-gradient(135deg, #ff6b9d, #c44dff)'
                : 'white',
              color: filtro === key ? 'white' : '#888',
              boxShadow: filtro === key
                ? '0 4px 15px rgba(255,107,157,0.4)'
                : '0 2px 8px rgba(0,0,0,0.08)',
              transition: 'all 0.3s ease'
            }}>
              {label}
            </button>
          ))}
        </div>

        {/* Edición especial banner */}
        {filtro !== 'normales' && (
          <div style={{
            background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
            borderRadius: '20px', padding: '20px 30px',
            display: 'flex', alignItems: 'center', gap: '15px',
            marginBottom: '35px', maxWidth: '1200px', margin: '0 auto 35px'
          }}>
            <span style={{ fontSize: '40px' }}>⭐</span>
            <div>
              <h3 style={{ margin: '0 0 5px 0', color: 'white', fontSize: '20px' }}>
                Edición Especial
              </h3>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.9)', fontSize: '14px' }}>
                Unicornio y Cohete Espacial — Diseños únicos y exclusivos a $250 MXN
              </p>
            </div>
          </div>
        )}

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '25px', maxWidth: '1200px', margin: '0 auto'
        }}>
          {productosFiltrados.map(producto => (
            <ProductoCard
              key={producto.id}
              producto={producto}
              agregarAlCarrito={agregarAlCarrito}
            />
          ))}
        </div>
      </div>

      {/* ── PIE DE PÁGINA ── */}
      <footer style={{
        background: 'linear-gradient(135deg, #2d1b4e, #1a0a2e)',
        color: 'white', padding: '60px 40px 30px'
      }}>
        <div style={{
          maxWidth: '1100px', margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px', marginBottom: '40px'
        }}>

          {/* Logo y descripción */}
          <div>
            <img
              src="/imagenes/logo.png"
              alt="AquaKawaii"
              style={{ height: '80px', objectFit: 'contain', marginBottom: '15px' }}
            />
            <p style={{ color: '#ccc', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>
              Botellas kawaii de alta calidad para hidratarte con ternura cada día. 💧
            </p>
          </div>

          {/* Contacto */}
          <div>
            <h4 style={{
              color: '#ff6b9d', marginBottom: '20px',
              fontSize: '16px', fontWeight: 'bold'
            }}>
              📍 Contacto
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span>📞</span>
                <span style={{ color: '#ccc', fontSize: '14px' }}>221 126 4361</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span>📍</span>
                <span style={{ color: '#ccc', fontSize: '14px', lineHeight: '1.5' }}>
                  Privada 15 B Sur 8716,<br/>
                  Boulevard Municipio Libre,<br/>
                  Puebla, Pue.
                </span>
              </div>
            </div>
          </div>

          {/* Redes sociales */}
<div>
  <h4 style={{
    color: '#ff6b9d', marginBottom: '20px',
    fontSize: '16px', fontWeight: 'bold'
  }}>
    🌐 Síguenos
  </h4>
  <div style={{ display: 'flex', gap: '15px' }}>

    {/* Instagram */}
    <div style={{
      width: '45px', height: '45px', borderRadius: '12px',
      background: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', transition: 'transform 0.2s'
    }}
    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    </div>

    {/* Facebook */}
    <div style={{
      width: '45px', height: '45px', borderRadius: '12px',
      background: '#1877f2',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', transition: 'transform 0.2s'
    }}
    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    </div>

    {/* TikTok */}
    <div style={{
      width: '45px', height: '45px', borderRadius: '12px',
      background: '#010101',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', transition: 'transform 0.2s'
    }}
    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
      </svg>
    </div>

    {/* WhatsApp */}
    <div style={{
      width: '45px', height: '45px', borderRadius: '12px',
      background: '#25d366',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', transition: 'transform 0.2s'
    }}
    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </div>
  </div>
</div>

          {/* Info */}
          <div>
            <h4 style={{
              color: '#ff6b9d', marginBottom: '20px',
              fontSize: '16px', fontWeight: 'bold'
            }}>
              ℹ️ Información
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['Envíos a toda la república', 'Pago seguro con Stripe',
                'Garantía de calidad', 'Devoluciones en 30 días'].map((item, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center',
                  gap: '8px', color: '#ccc', fontSize: '14px'
                }}>
                  <span style={{ color: '#ff6b9d' }}>✓</span> {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Línea divisora */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '25px',
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: '10px'
        }}>
          <p style={{ color: '#888', fontSize: '13px', margin: 0 }}>
            © 2026 AquaKawaii — Todos los derechos reservados 💧
          </p>
          <p style={{ color: '#888', fontSize: '13px', margin: 0 }}>
            Hecho con 💕 en Puebla, México
          </p>
        </div>
      </footer>
    </div>
  )
}