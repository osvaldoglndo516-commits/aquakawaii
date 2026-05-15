const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  try {
    const event = req.body

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      const email = session.customer_email

      console.log('Pago completado para:', email)

      const { error } = await supabase
        .from('pedidos')
        .update({ estado: 'pagado' })
        .eq('email_cliente', email)
        .eq('estado', 'pendiente')

      if (error) console.log('Supabase error:', error)
    }

    return res.status(200).json({ received: true })

  } catch (error) {
    console.log('Error:', error.message)
    return res.status(500).json({ error: error.message })
  }
}
