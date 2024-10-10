
module.exports = {
    routes: [
      { // Path defined with a regular expression
        method: 'POST',
        path: '/payment/telegraf/:secret', // Only match when the URL parameter is composed of lowercase letters
        handler: 'payment.telegraf',
      },
      { // Path defined with a regular expression
        method: 'POST',
        path: '/payment/getInvoice', // Only match when the URL parameter is composed of lowercase letters
        handler: 'payment.getInvoice',
      },
      { // Path defined with a regular expression
        method: 'POST',
        path: '/payment/getYoInvoice', // Only match when the URL parameter is composed of lowercase letters
        handler: 'payment.getYoInvoice',
      }
    ]
  }