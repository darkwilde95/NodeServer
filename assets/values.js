const secret = 'unaminiaplicaciondepruebaNODE' //Esto no debe de hacerse
const port = process.env.PORT || 3000
const apiUrl = 'https://unfail-api.herokuapp.com'
const baseUrl = 'https://unfail.herokuapp.com'

module.exports = { secret, port, apiUrl }
