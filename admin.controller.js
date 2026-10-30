const { authService } = require("../services/auth.service");
const { sendSuccess } = require("../utils/apiResponse");
const { ApiError } = require("../utils/ApiError");

/** CRUD for managing admin users (super_admin only, see routes). */
const adminUsersController = {
  list: async (_req, res) => {
    const admins = await authService.listAdminUsers();
    sendSuccess(res, admins);
  },

  create: async (req, res) => {
    const admin = await authService.createAdminUser(req.body);
    sendSuccess(res, admin, { status: 201, message: "Admin user created" });
  },

  update: async (req, res) => {
    const targetId = Number(req.params.id);

    // Safety: an admin can't lock themselves out by disabling/demoting their
    // own account through this screen.
    if (targetId === req.admin.id) {
      if (req.body.status && req.body.status !== "active") {
        throw ApiError.badRequest("You cannot deactivate your own account");
      }
      if (req.body.role && req.body.role !== req.admin.role) {
        throw ApiError.badRequest("You cannot change your own role");
      }
    }

    const admin = await authService.updateAdminUser(targetId, req.body);
    sendSuccess(res, admin, { message: "Admin user updated" });
  },

  remove: async (req, res) => {
    const targetId = Number(req.params.id);
    if (targetId === req.admin.id) {
      throw ApiError.badRequest("You cannot delete your own account");
    }
    await authService.deleteAdminUser(targetId);
    sendSuccess(res, null, { message: "Admin user deleted" });
  },
};

module.exports = { adminUsersController };
