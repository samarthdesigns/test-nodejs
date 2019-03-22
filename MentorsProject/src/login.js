const fs = require('fs')
const chalk = require('chalk')

const fetchDetails = () => {
    const dataBuffer = fs.readFileSync('./files/details.json')
    const dataString = dataBuffer.toString()
    const dataJSON = JSON.parse(dataString)
    return dataJSON
}

const login = (userName, password, callback) => {
    const loginData = fetchDetails()

    let userNameFlag = 0
    let passwordFlag = 0
    let loginFlag = 0

    loginData.forEach((loginDetail) => {
        if(userName === loginDetail.userName){
            userNameFlag = 1
            if(userName === loginDetail.userName && password === loginDetail.password){
                passwordFlag = 1
            }
        }
    })

    if(userNameFlag===1 && passwordFlag===1){
        callback(undefined,'Success!')
    }
    else if(userNameFlag != 1){
        callback('Username doesnot exist', undefined)
    }
    else if(userNameFlag ===1 && passwordFlag!=1){
        callback('Password doesnot match', undefined)
    }

}


//Register function
const register = (userName, password, confirmPassword, fullName, callback) => {
    const loginData = fetchDetails()
    
    let userNameFlag = 0
    let passwordFlag = 0

    if(password !== confirmPassword){
        passwordFlag = 1
    }

    loginData.forEach((loginDetail) => {
        if(loginDetail.userName === userName){
            userNameFlag = 1
        }
    })


    if(passwordFlag===1){
        return callback('Passwords donot match', undefined)
    }

    else if (userNameFlag === 1){
        return callback('Username already exists', undefined)
    }

    else{
        loginData.push({
            fullName: fullName,
            userName: userName,
            password: password
        })
        registerFlag = 1
        const dataJSON = JSON.stringify(loginData)
        fs.writeFileSync('./files/details.json', dataJSON)
        return callback(undefined,'Success please login to continue')
    }

}

module.exports = {
    login:login,
    register:register
}
