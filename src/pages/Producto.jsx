import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Producto({ agregarAlCarrito }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [producto, setProducto] = useState(null)
  const [loading, setLoading] = useState(true)
  const [colorElegido, setColorElegido] = useState('')
  const [agregado, setAgregado] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    cargarProducto()
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [id])

  async function cargarProducto() {
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .eq('id', id)
      .single()

    if (error) console.error(error)
    else {
      setProducto(data)
      setColorElegido(data.colores?.[0] || '')
    }
    setLoading(false)
  }

  function getImagen(nombre) {
    const base = 'https://ikfhrnsvnqvcizinepct.supabase.co/storage/v1/object/public/productos/'
    if (nombre?.includes('Capibara')) return base + 'capibara.png'
    if (nombre?.includes('Panda')) return base + 'panda.png'
    if (nombre?.includes('Koala')) return base + 'koala.png'
    if (nombre?.includes('Conejito')) return base + 'conejito.png'
    if (nombre?.includes('Dinosaurio')) return base + 'dinosaurio.png'
    if (nombre?.includes('Zorro')) return base + 'zorro.png'
    if (nombre?.includes('Pingüino')) return base + 'pinguino.png'
    if (nombre?.includes('León')) return base + 'leon.png'
    if (nombre?.includes('Vaca')) return base + 'vaca.png'
    if (nombre?.includes('Unicornio')) return base + 'unicornio.png'
    if (nombre?.includes('Cohete')) return base + 'cohete.png'
    return base + 'logo.png'
  }

  function handleAgregar() {
    if (!colorElegido) {
      alert('Por favor selecciona un color')
      return
    }
    agregarAlCarrito({ ...producto, colorElegido })
    setAgregado(true)
    setTimeout(() => setAgregado(false), 2000)
  }

  if (loading) return (
    <div style={{
      display: 'flex', justifyContent: 'center',
      alignItems: 'center', minHeight: '60vh', fontSize: '24px'
    }}>
      💧 Cargando...
    </div>
  )

  if (!producto) return (
    <div style={{ textAlign: 'center', padding: '60px' }}>
      <p>Producto no encontrado</p>
      <button onClick={() => navigate('/')}>Regresar</button>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#fdf0f8', padding: isMobile ? '15px' : '30px' }}>
      <div style={{
        maxWidth: '900px', margin: '0 auto',
        background: 'white', borderRadius: '30px',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr'
        }}>

          {/* Imagen */}
          <div style={{
            background: producto.es_edicion_especial
              ? 'linear-gradient(135deg, #fff0f8, #f0e6ff)'
              : 'linear-gradient(135deg, #f0f8ff, #e6fff0)',
            display: 'flex', justifyContent: 'center',
            alignItems: 'center',
            padding: isMobile ? '25px' : '40px'
          }}>
            <img
              src={getImagen(producto.nombre)}
              alt={producto.nombre}
              style={{
                width: '100%',
                maxWidth: isMobile ? '200px' : '300px',
                height: isMobile ? '200px' : '300px',
                objectFit: 'contain'
              }}
            />
          </div>

          {/* Info */}
          <div style={{ padding: isMobile ? '20px' : '40px' }}>

            {producto.es_edicion_especial && (
              <div style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
                color: 'white', padding: '6px 16px',
                borderRadius: '20px', fontSize: '13px',
                fontWeight: 'bold', marginBottom: '15px'
              }}>
                ⭐ Edición Especial
              </div>
            )}

            <h1 style={{
              fontSize: isMobile ? '24px' : '32px',
              margin: '0 0 10px 0', color: '#333'
            }}>
              {producto.nombre}
            </h1>

            <p style={{
              fontSize: isMobile ? '28px' : '36px',
              fontWeight: 'bold', margin: '0 0 20px 0',
              color: producto.es_edicion_especial ? '#ff8c00' : '#ff6b9d'
            }}>
              ${producto.precio} MXN
            </p>

            <p style={{
              color: '#888', fontSize: '15px',
              lineHeight: '1.6', marginBottom: '25px'
            }}>
              {producto.descripcion}
            </p>

            {/* Características */}
            <div style={{
              background: '#f9f9f9', borderRadius: '15px',
              padding: '15px', marginBottom: '25px'
            }}>
              {['700ml capacidad', 'Libre de BPA', 'Popote de silicona',
                'Asa portátil', 'Boca ancha', 'A prueba de fugas'].map((c, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center',
                  gap: '8px', padding: '4px 0',
                  fontSize: '14px', color: '#555'
                }}>
                  <span style={{ color: '#4CAF50' }}>✓</span> {c}
                </div>
              ))}
            </div>

            {/* Selector de color */}
            <div style={{ marginBottom: '25px' }}>
              <p style={{
                fontWeight: 'bold', color: '#333',
                marginBottom: '10px', fontSize: '15px'
              }}>
                Color: <span style={{ color: '#ff6b9d' }}>{colorElegido}</span>
              </p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {producto.colores?.map((color, i) => (
                  <button key={i} onClick={() => setColorElegido(color)} style={{
                    padding: '8px 18px',
                    borderRadius: '20px',
                    border: colorElegido === color
                      ? '3px solid #ff6b9d'
                      : '2px solid #ddd',
                    background: colorElegido === color ? '#fff0f5' : 'white',
                    cursor: 'pointer', fontSize: '13px',
                    fontWeight: colorElegido === color ? 'bold' : 'normal',
                    color: colorElegido === color ? '#ff6b9d' : '#666',
                    transition: 'all 0.2s'
                  }}>
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Botones */}
            <div style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>
              <button onClick={handleAgregar} style={{
                padding: '15px',
                background: agregado
                  ? 'linear-gradient(135deg, #4CAF50, #2e7d32)'
                  : producto.es_edicion_especial
                    ? 'linear-gradient(135deg, #ffd700, #ff8c00)'
                    : 'linear-gradient(135deg, #ff6b9d, #c44dff)',
                color: 'white', border: 'none',
                borderRadius: '15px', fontSize: '17px',
                fontWeight: 'bold', cursor: 'pointer',
                transition: 'all 0.3s'
              }}>
                {agregado ? '✅ Agregado!' : '🛒 Agregar al carrito'}
              </button>

              <button onClick={() => navigate('/')} style={{
                padding: '12px',
                background: 'white',
                color: '#888', border: '2px solid #eee',
                borderRadius: '15px', fontSize: '15px',
                cursor: 'pointer'
              }}>
                Seguir comprando
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
