const Users = require("../../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const createError = require("../../helpers/createError");
const queryString = require("querystring");
const { JWT_SECRET_KEY } = process.env;
const TIME_LIVE_JWT = "1d";
const axios = require("axios");

const singup = async (req, res, next) => {
  const { name, email, password: pass } = req.body;
  const password = await bcrypt.hash(pass, 10);
  try {
    const user = await Users.create({ ...req.body, avatarUrl: "" });
    const { _id } = user;
    const token = jwt.sign({ _id }, JWT_SECRET_KEY, {
      expiresIn: TIME_LIVE_JWT,
    });
    const updateUser = await Users.findByIdAndUpdate(_id, {
      ...req.body,
      password,
      token,
    });
    res.status(201);
    res.json({
      message: "User created",
      name,
      email,
      token,
      avatarUrl: user.avatarUrl,
    });
  } catch (err) {
    if (err.code === 11000) {
      next(createError("CONFLICT", "Email in use"));
    }
  }
};

const singin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email });
  if (user) {
    const result = await bcrypt.compare(password, user.password);

    if (result)
      if (!user.token) {
        const token = jwt.sign({ _id: user._id }, JWT_SECRET_KEY, {
          expiresIn: TIME_LIVE_JWT,
        });
        const updateUser = await Users.findByIdAndUpdate(user._id, { token });
        res.status(200);
        res.json({
          token,
          user: {
            name: user.name,
            email: user.email,
            avatarUrl: user.avatarUrl,
            bodyParams: user.bodyParams,
          },
        });
      } else {
        try {
          const decodedToken = jwt.decode(user.token);
          if (decodedToken && decodedToken.exp * 1000 < Date.now()) {
            const token = jwt.sign({ _id: user._id }, JWT_SECRET_KEY, {
              expiresIn: TIME_LIVE_JWT,
            });
            const updateUser = await Users.findByIdAndUpdate(user._id, {
              token,
            });
            console.log(token);
            res.status(200);
            res.json({
              token,
              user: {
                name: user.name,
                email: user.email,
                avatarUrl: user.avatarUrl,
                bodyParams: user.bodyParams,
              },
            });
          } else {
            res.status(200);
            res.json({
              token: user.token,
              user: {
                name: user.name,
                email: user.email,
                avatarUrl: user.avatarUrl,
                bodyParams: user.bodyParams,
              },
            });
          }
        } catch (err) {
          next(createError("UNAUTHORIZED", "JWT error"));
          // console.log(err)
        }
      }
    else {
      next(createError("UNAUTHORIZED", "Email or password is wrong"));
    }
  } else next(createError("UNAUTHORIZED", "Email or password is wrong"));
};

const logout = async (req, res, next) => {
  try {
    const user = await Users.findByIdAndUpdate(req.user, { token: "" });
    if (!user) next(createError("UNAUTHORIZED", "user dont logined"));
    else next(createError("NOCONTENT", "No Content"));
  } catch (err) {
    next(err);
  }
};

const googleAuth = (req, res, next) => {
  const strParams = queryString.stringify({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: `${process.env.BASE_URL}/users/googleAuth-redirect`,
    scope: ["https://www.googleapis.com/auth/userinfo.email"],
    response_type: "code",
    access_type: "offline",
    prompt: "consent",
  });

  return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${strParams}`
  );
  // 'https://www.googleapis.com/auth/userinfo.profile'
};

const googleAuthRedirect = async (req, res, next) => {
  const fullUrl = `${req.protocol}://${req.host}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = queryString.parse(urlObj.search);
  const code = urlParams["?code"];
  try {
    const tokenData = await axios({
      url: "https://oauth2.googleapis.com/token",
      method: "post",
      data: {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: `${process.env.BASE_URL}/users/googleAuth-redirect`,
        grant_type: "authorization_code",
        code,
      },
    });
    const userData = await axios({
      url: "https://www.googleapis.com/oauth2/v2/userinfo",
      method: "get",
      headers: {
        Authorization: `Bearer ${tokenData.data.access_token}`,
      },
    });

    const user = await Users.findOne({ email: userData.data.email });
    req.body = {
      name: userData.data.email,
      email: userData.data.email,
      password: userData.data.id,
    };

    if (user) singin(req, res, next);
    else singup(req, res, next);
  } catch (err) {
    console.log(err.message);
  }

  // return res.redirect(`${process.env.BASE_URL}/users`);
};

const current = async (req, res, next) => {
  const user = await Users.findOne({ _id: req.user });
  if (!user) next(createError("UNAUTHORIZED", "Not authorized"));
  else {
    delete user._doc.password;
    delete user._doc.createdAt;
    delete user._doc.updatedAt;

    res.status(200).json({
      message: "OK, login success",
      ResponseBody: {
        ...user._doc,
      },
    });
  }
};

module.exports = {
  singup,
  singin,
  logout,
  current,
  googleAuth,
  googleAuthRedirect,
};
