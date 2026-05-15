const Stripe = require('stripe')

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  try {
    const { carrito, email, nombre } = req.body

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16'
    })

    const lineItems = carrito.map(item => ({
      price_data: {
        currency: 'mxn',
        product_data: {
          name: item.nombre,
          description: item.colorElegido ? `Color: ${item.colorElegido}` : item.nombre,
        },
        unit_amount: Math.round(item.precio * 100),
      },
      quantity: item.cantidad || 1,
    }))

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      customer_email: email,
      success_url: 'https://aquakawaii.vercel.app/exito',
      cancel_url: 'https://aquakawaii.vercel.app/carrito',
      metadata: { nombre }
    })

    return res.status(200).json({ 
      sessionId: session.id,
      url: session.url
    })

  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
