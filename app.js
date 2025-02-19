import bcrypt from  "bcrypt"

const passwrord = await bcrypt.compare("123456", "$2a$09$3aqzBCosFhEcW8OxA5qmkuxSWqqJpEZP7cpxpJ35Y4h6RZ0TSP6Sq")
console.log(passwrord)