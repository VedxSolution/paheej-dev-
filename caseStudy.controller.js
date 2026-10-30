const { caseStudyService } = require("../services/caseStudy.service");
const { sendSuccess } = require("../utils/apiResponse");
const { parseListParams, buildPagination } = require("../utils/listQuery");

const caseStudyController = {
  list: async (_req, res) => {
    sendSuccess(res, await caseStudyService.listPublished());
  },
  getBySlug: async (req, res) => {
    sendSuccess(res, await caseStudyService.getPublishedBySlug(req.params.slug));
  },
  adminList: async (req, res) => {
    const params = parseListParams(req.query);
    const { items, total } = await caseStudyService.listAll(params);
    sendSuccess(res, items, { pagination: buildPagination(total, params) });
  },
  adminGetById: async (req, res) => {
    sendSuccess(res, await caseStudyService.getById(Number(req.params.id)));
  },
  create: async (req, res) => {
    sendSuccess(res, await caseStudyService.create(req.body), { status: 201, message: "Case study created" });
  },
  update: async (req, res) => {
    sendSuccess(res, await caseStudyService.update(Number(req.params.id), req.body), {
      message: "Case study updated",
    });
  },
  remove: async (req, res) => {
    await caseStudyService.remove(Number(req.params.id));
    sendSuccess(res, null, { message: "Case study deleted" });
  },
};

module.exports = { caseStudyController };
