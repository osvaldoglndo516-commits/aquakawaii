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
      success_url: 'https://aquakawaii.netlify.app/exito',
      cancel_url: 'https://aquakawaii.netlify.app/carrito',
      metadata: { nombre }
    })

    console.log('Session ID:', session.id)
    console.log('Session URL:', session.url)

    // Si Stripe no devuelve url, construirla manualmente
    const url = session.url || `https://checkout.stripe.com/c/pay/${session.id}`

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({ 
        sessionId: session.id,
        url: url
      })
    }

  } catch (error) {
    console.log('Error:', error.message)
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: error.message })
    }
  }
}