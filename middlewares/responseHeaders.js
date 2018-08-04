module.exports = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-type')
  res.header('Access-Control-Allow-Credentials', true)
  if ('OPTIONS' == req.method) { //Esto aun no entiendo que hace :(
    res.send(200)
  } else {
    next()
  }
}
