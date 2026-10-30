const { env } = require("../config/env");
const { authService } = require("../services/auth.service");
const { sendSuccess } = require("../utils/apiResponse");
const { ApiError } = require("../utils/ApiError");

const COOKIE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 days, matches default JWT_EXPIRES_IN

const authController = {
  login: async (req, res) => {
    const { email, password } = req.body;
    const { token, admin } = await authService.login(email, password);

    res.cookie(env.auth.cookieName, token, {
      httpOnly: true,
      secure: env.nodeEnv === "production",
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE_MS,
      path: "/",
    });

    sendSuccess(res, { admin, token }, { message: "Logged in" });
  },

  logout: async (_req, res) => {
    res.clearCookie(env.auth.cookieName, { path: "/" });
    sendSuccess(res, null, { message: "Logged out" });
  },

  me: async (req, res) => {
    if (!req.admin) throw ApiError.unauthorized();
    const admin = await authService.getById(req.admin.id);
    sendSuccess(res, admin);
  },

  updateMe: async (req, res) => {
    if (!req.admin) throw ApiError.unauthorized();
    const admin = await authService.updateOwnProfile(req.admin.id, req.body);
    sendSuccess(res, admin, { message: "Profile updated" });
  },

  changePassword: async (req, res) => {
    if (!req.admin) throw ApiError.unauthorized();
    await authService.changePassword(req.admin.id, req.body.currentPassword, req.body.newPassword);
    sendSuccess(res, null, { message: "Password changed" });
  },
};

module.exports = { authController };
