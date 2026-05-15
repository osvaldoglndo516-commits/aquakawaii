import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Login({ setUsuario }) {
  const navigate = useNavigate()
  const [modo, setModo] = useState('login') // 'login' o 'registro'
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (modo === 'registro') {
      if (form.password !== form.confirmPassword) {
        setError('Las contraseñas no coinciden')
        setLoading(false)
        return
      }
      if (form.nombre.trim() === '') {
        setError('El nombre es requerido')
        setLoading(false)
        return
      }

      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: { nombre: form.nombre }
        }
      })

      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }

      // Guardar en tabla usuarios
      if (data.user) {
        await supabase.from('usuarios').insert({
          id: data.user.id,
          nombre: form.nombre,
          email: form.email
        })
        setUsuario(data.user)
        navigate(-1)
      }

    } else {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password
      })

      if (error) {
        setError('Correo o contraseña incorrectos')
        setLoading(false)
        return
      }

      setUsuario(data.user)
      navigate(-1)
    }

    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fff0f8, #f5e6ff)',
      display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: '30px'
    }}>
      <div style={{
        background: 'white', borderRadius: '30px',
        padding: '50px 40px', width: '100%',
        maxWidth: '440px',
        boxShadow: '0 20px 60px rgba(255,107,157,0.15)'
      }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <img
            src="/imagenes/logo.png"
            alt="AquaKawaii"
            style={{ height: '80px', objectFit: 'contain' }}
          />
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex', background: '#f5f5f5',
          borderRadius: '15px', padding: '5px',
          marginBottom: '30px'
        }}>
          {['login', 'registro'].map(m => (
            <button key={m} onClick={() => { setModo(m); setError('') }} style={{
              flex: 1, padding: '12px',
              border: 'none', borderRadius: '12px',
              cursor: 'pointer', fontSize: '15px',
              fontWeight: 'bold', transition: 'all 0.3s',
              background: modo === m
                ? 'linear-gradient(135deg, #ff6b9d, #c44dff)'
                : 'transparent',
              color: modo === m ? 'white' : '#888'
            }}>
              {m === 'login' ? '🔑 Iniciar Sesión' : '✨ Registrarse'}
            </button>
          ))}
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} style={{
          display: 'flex', flexDirection: 'column', gap: '16px'
        }}>
          {modo === 'registro' && (
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
                placeholder="Tu nombre"
                required
                style={{
                  width: '100%', padding: '13px 16px',
                  border: '2px solid #eee', borderRadius: '12px',
                  fontSize: '15px', outline: 'none',
                  boxSizing: 'border-box', transition: 'border-color 0.2s'
                }}
                onFocus={e => e.target.style.borderColor = '#ff6b9d'}
                onBlur={e => e.target.style.borderColor = '#eee'}
              />
            </div>
          )}

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
              placeholder="correo@ejemplo.com"
              required
              style={{
                width: '100%', padding: '13px 16px',
                border: '2px solid #eee', borderRadius: '12px',
                fontSize: '15px', outline: 'none',
                boxSizing: 'border-box', transition: 'border-color 0.2s'
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
              Contraseña *
            </label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Mínimo 6 caracteres"
              required
              style={{
                width: '100%', padding: '13px 16px',
                border: '2px solid #eee', borderRadius: '12px',
                fontSize: '15px', outline: 'none',
                boxSizing: 'border-box', transition: 'border-color 0.2s'
              }}
              onFocus={e => e.target.style.borderColor = '#ff6b9d'}
              onBlur={e => e.target.style.borderColor = '#eee'}
            />
          </div>

          {modo === 'registro' && (
            <div>
              <label style={{
                display: 'block', marginBottom: '6px',
                color: '#555', fontWeight: '600', fontSize: '14px'
              }}>
                Confirmar contraseña *
              </label>
              <input
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Repite tu contraseña"
                required
                style={{
                  width: '100%', padding: '13px 16px',
                  border: '2px solid #eee', borderRadius: '12px',
                  fontSize: '15px', outline: 'none',
                  boxSizing: 'border-box', transition: 'border-color 0.2s'
                }}
                onFocus={e => e.target.style.borderColor = '#ff6b9d'}
                onBlur={e => e.target.style.borderColor = '#eee'}
              />
            </div>
          )}

          {/* Error */}
          {error && (
            <div style={{
              background: '#ffe0e0', color: '#cc0000',
              padding: '12px 16px', borderRadius: '10px',
              fontSize: '14px', textAlign: 'center'
            }}>
              ⚠️ {error}
            </div>
          )}

          <button type="submit" disabled={loading} style={{
            padding: '15px',
            background: loading ? '#ccc'
              : 'linear-gradient(135deg, #ff6b9d, #c44dff)',
            color: 'white', border: 'none',
            borderRadius: '15px', fontSize: '17px',
            fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer',
            marginTop: '5px',
            boxShadow: loading ? 'none' : '0 4px 15px rgba(255,107,157,0.4)',
            transition: 'all 0.3s'
          }}>
            {loading ? '⏳ Cargando...'
              : modo === 'login' ? '🔑 Iniciar Sesión' : '✨ Crear cuenta'}
          </button>
        </form>

        {/* Regresar */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link to="/" style={{
            color: '#aaa', fontSize: '14px',
            textDecoration: 'none'
          }}>
            ← Regresar a la tienda
          </Link>
        </div>
      </div>
    </div>
  )
}