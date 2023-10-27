// const queryString = require('query-string');
// const axios = require('axios');
// const URL = require('url');


const googleAuth = (req, res, next) => {
    const strParams = queryString.stringify({
        client_id: process.env.GOOGLE_CLIENT_ID,
        redirect_uri: `${process.env.BASE_URL}/users/googleAuth-redirect`,
        scope: [
            'https://www.googleapis.com/auth/userinfo.email', 
            'https://www.googleapis.com/auth/userinfo.profile'
        ],
        response_type: "code",
        access_type: "offline",
        promt: "consent"

    })

    return res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${strParams}`);
    
}

module.exports = googleAuth;

module.exports = googleAuth;