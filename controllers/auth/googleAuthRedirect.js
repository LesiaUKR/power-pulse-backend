// const queryString = require('query-string');
// const axios = require('axios');
// const URL = require('url');

const googleAuthRedirect = async (req, res) => {
    const fullUrl = `${req.protocol}://${req.host}${req.originalUrl}`;
    const urlObj = new URL(fullUrl);
    const urlParams = queryString.parse(urlObj.search);
    const code = urlParams.code;

    const tokenData = await axios({
        url: "https://oauth2.googleapis.com/token",
        method: "post",
        data: {
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: `${process.env.BASE_URL}/users/googleAuth-redirect`,
            grant_type: "authorization_code",
            code
        }
    });
    const userData = await axios({
        url: "https://www.googleapis.com/oauth2/v2/userinfo",
        method: "get",
        headers: {
            Authorization: `Bearer ${tokenData.data.access_token}`
        }
    })

}

module.exports = googleAuthRedirect;