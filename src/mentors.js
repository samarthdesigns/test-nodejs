const fs = require('fs')

const fetchDetails = () => {
    const dataBuffer = fs.readFileSync('./files/mentors.json')
    const dataString = dataBuffer.toString()
    const dataJSON = JSON.parse(dataString)
    return dataJSON
}

const mentorAdder = (userName) => {
    const mentorsList = fetchDetails()
    mentorsList.push({
        userName: userName,
        mentors: {
            samarth: 0,
            ayush: 0,
            samyak: 0,
            dhiraj: 0
        }
    })
    const dataJSON = JSON.stringify(mentorsList)
    fs.writeFileSync('./files/mentors.json', dataJSON)
}

const mentorsChecker = (userName, callback) => {
    const mentorDetails = fetchDetails()

    let userNameFlag = 0

    mentorDetails.forEach((mentorDetail) => {
        if(userName === mentorDetail.userName){
            userNameFlag = 1
        }
    })

    if(userNameFlag === 0){
        callback('No mentor has been choosen yet!', undefined)
    }

    else{
        mentorDetails.forEach((mentor) => {
            let mentorsList = mentor.mentors
            if(mentor.mentors.samarth === 1){
                callback(undefined,'Your mentor is samarth')
            }
            else if(mentor.mentors.ayush === 1){
                callback(undefined,'Your mentor is ayush')
            }
        })
    }

}

module.exports = {
    mentorsChecker : mentorsChecker,
    mentorAdder: mentorAdder
}