const fs = require('fs')

const login = (userName, password, callback) => {
    const loginData = fetchDetails()
    loginData.forEach((loginDetail) =>{
        if(loginDetail.userName ===  userName && loginDetail.password === password){
            return callback(undefined, 'Success in the login')
        }
        else if (loginDetail.userName ===  userName && loginDetail.password != password){
            return callback('Please check your password', undefined)
        }
        else if(loginDetail.userName !=  userName){
            return callback('Username does not exist', undefined)
        }
    })
}

const register = (userName, password, confirmPassword, name, callback) => {
    const loginData = fetchDetails()
    console.log(loginData)
    loginData.forEach((loginDetail) =>{
        if(loginDetail.userName === userName){
            return callback('Username already exists', undefined)
        }
        else if(password != confirmPassword){
            return callback('Passwords donot match', undefined)
        }
        else{
            loginData.push({
                fullName: name,
                userName: userName,
                password: password
            })
            const dataJSON = JSON.stringify(loginData)
            console.log(dataJSON)
            fs.writeFileSync('./files/details.json', dataJSON)
            return callback(undefined,'Success please login to continue')
        }
    })
}

const fetchDetails = () => {
    const dataBuffer = fs.readFileSync('./files/details.json')
    const dataString = dataBuffer.toString()
    const dataJSON = JSON.parse(dataString)
    return dataJSON
}

module.exports = {
    login:login,
    register:register
}
