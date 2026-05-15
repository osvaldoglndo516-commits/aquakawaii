import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { supabase } from './lib/supabase'
import Navbar from './components/Navbar'
import Tienda from './pages/Tienda'
import Producto from './pages/Producto'
import Carrito from './pages/Carrito'
import Checkout from './pages/Checkout'
import Exito from './pages/Exito'
import Login from './pages/Login'
import MisPedidos from './pages/MisPedidos'
import Perfil from './pages/Perfil'

export default function App() {
  const [carrito, setCarrito] = useState([])
  const [usuario, setUsuario] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUsuario(session?.user ?? null)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUsuario(session?.user ?? null)
      }
    )
    return () => subscription.unsubscribe()
  }, [])

  function agregarAlCarrito(producto) {
    const existe = carrito.find(
      item => item.id === producto.id && item.colorElegido === producto.colorElegido
    )
    if (existe) {
      setCarrito(carrito.map(item =>
        item.id === producto.id && item.colorElegido === producto.colorElegido
          ? { ...item, cantidad: (item.cantidad || 1) + 1 }
          : item
      ))
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }])
    }
  }

  function eliminarDelCarrito(index) {
    setCarrito(carrito.filter((_, i) => i !== index))
  }

  function vaciarCarrito() {
    setCarrito([])
  }

  return (
    <BrowserRouter>
      <Navbar carrito={carrito} usuario={usuario} setUsuario={setUsuario} />
      <Routes>
        <Route path="/" element={<Tienda agregarAlCarrito={agregarAlCarrito} />} />
        <Route path="/producto/:id" element={<Producto agregarAlCarrito={agregarAlCarrito} />} />
        <Route path="/carrito" element={
          <Carrito carrito={carrito} eliminarDelCarrito={eliminarDelCarrito} vaciarCarrito={vaciarCarrito} />
        } />
        <Route path="/checkout" element={
          usuario
            ? <Checkout carrito={carrito} vaciarCarrito={vaciarCarrito} usuario={usuario} />
            : <Navigate to="/login" />
        } />
        <Route path="/login" element={<Login setUsuario={setUsuario} />} />
        <Route path="/exito" element={<Exito vaciarCarrito={vaciarCarrito} />} />
        <Route path="/mis-pedidos" element={<MisPedidos usuario={usuario} />} />
        <Route path="/perfil" element={
          usuario ? <Perfil usuario={usuario} /> : <Navigate to="/login" />
        } />
      </Routes>
    </BrowserRouter>
  )
}
