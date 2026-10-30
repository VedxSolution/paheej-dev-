const { certificationService } = require("../services/certification.service");
const { sendSuccess } = require("../utils/apiResponse");
const { parseListParams, buildPagination } = require("../utils/listQuery");

const certificationController = {
  list: async (_req, res) => {
    sendSuccess(res, await certificationService.listPublished());
  },
  adminList: async (req, res) => {
    const params = parseListParams(req.query);
    const { items, total } = await certificationService.listAll(params);
    sendSuccess(res, items, { pagination: buildPagination(total, params) });
  },
  adminGetById: async (req, res) => {
    sendSuccess(res, await certificationService.getById(Number(req.params.id)));
  },
  create: async (req, res) => {
    sendSuccess(res, await certificationService.create(req.body), { status: 201, message: "Certification created" });
  },
  update: async (req, res) => {
    sendSuccess(res, await certificationService.update(Number(req.params.id), req.body), {
      message: "Certification updated",
    });
  },
  remove: async (req, res) => {
    await certificationService.remove(Number(req.params.id));
    sendSuccess(res, null, { message: "Certification deleted" });
  },
};

module.exports = { certificationController };
