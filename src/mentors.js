const fs = require('fs')

const mentorsChoose = (userName, callback) => {
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
            if(mentor.mentors.samarth === 1){
                callback(undefined,'Your mentor is samarth')
            }
            else if(mentor.mentors.ayush === 1){
                callback(undefined,'Your mentor is samarth')
            }
        })
    }

}

const fetchDetails = () => {
    const dataBuffer = fs.readFileSync('./files/mentors.json')
    const dataString = dataBuffer.toString()
    const dataJSON = JSON.parse(dataString)
    return dataJSON
}

module.exports = {
    mentorsChoose : mentorsChoose
}