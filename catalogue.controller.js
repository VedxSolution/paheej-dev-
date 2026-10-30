const { catalogueService } = require("../services/catalogue.service");
const { sendSuccess } = require("../utils/apiResponse");
const { parseListParams, buildPagination } = require("../utils/listQuery");

const catalogueController = {
  list: async (_req, res) => {
    sendSuccess(res, await catalogueService.listPublished());
  },
  adminList: async (req, res) => {
    const params = parseListParams(req.query);
    const { items, total } = await catalogueService.listAll(params);
    sendSuccess(res, items, { pagination: buildPagination(total, params) });
  },
  adminGetById: async (req, res) => {
    sendSuccess(res, await catalogueService.getById(Number(req.params.id)));
  },
  create: async (req, res) => {
    sendSuccess(res, await catalogueService.create(req.body), { status: 201, message: "Catalogue created" });
  },
  update: async (req, res) => {
    sendSuccess(res, await catalogueService.update(Number(req.params.id), req.body), {
      message: "Catalogue updated",
    });
  },
  remove: async (req, res) => {
    await catalogueService.remove(Number(req.params.id));
    sendSuccess(res, null, { message: "Catalogue deleted" });
  },
};

module.exports = { catalogueController };
