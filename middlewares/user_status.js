module.exports = (req, res, next) => {
  console.log(`\nGetting a request: ${ new Date().toLocaleTimeString()}`)
  if (req.isAuthenticated()) {
    console.log("User status: User logged")
  } else {
    console.log("User status: No user logged")
  }
  next()
}
