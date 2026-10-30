const { buyingGuideService } = require("../services/buyingGuide.service");
const { sendSuccess } = require("../utils/apiResponse");
const { parseListParams, buildPagination } = require("../utils/listQuery");

const buyingGuideController = {
  list: async (_req, res) => {
    sendSuccess(res, await buyingGuideService.listPublished());
  },
  getBySlug: async (req, res) => {
    sendSuccess(res, await buyingGuideService.getPublishedBySlug(req.params.slug));
  },
  adminList: async (req, res) => {
    const params = parseListParams(req.query);
    const { items, total } = await buyingGuideService.listAll(params);
    sendSuccess(res, items, { pagination: buildPagination(total, params) });
  },
  adminGetById: async (req, res) => {
    sendSuccess(res, await buyingGuideService.getById(Number(req.params.id)));
  },
  create: async (req, res) => {
    sendSuccess(res, await buyingGuideService.create(req.body), { status: 201, message: "Buying guide created" });
  },
  update: async (req, res) => {
    sendSuccess(res, await buyingGuideService.update(Number(req.params.id), req.body), {
      message: "Buying guide updated",
    });
  },
  remove: async (req, res) => {
    await buyingGuideService.remove(Number(req.params.id));
    sendSuccess(res, null, { message: "Buying guide deleted" });
  },
};

module.exports = { buyingGuideController };
