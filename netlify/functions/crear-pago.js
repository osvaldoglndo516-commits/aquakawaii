const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  try {
    const { carrito, email, nombre } = JSON.parse(event.body)

    const lineItems = carrito.map(item => ({
      price_data: {
        currency: 'mxn',
        product_data: {
          name: item.nombre,
          description: `Color: ${item.colorElegido}`,
          images: [],
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
      success_url: `${process.env.URL}/exito`,
      cancel_url: `${process.env.URL}/carrito`,
      metadata: { nombre }
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ sessionId: session.id })
    }

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    }
  }
}