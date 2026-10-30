const { blogService } = require("../services/blog.service");
const { sendSuccess } = require("../utils/apiResponse");
const { parseListParams, buildPagination } = require("../utils/listQuery");

const blogController = {
  list: async (_req, res) => {
    const posts = await blogService.listPublished();
    sendSuccess(res, posts);
  },

  getBySlug: async (req, res) => {
    const post = await blogService.getPublishedBySlug(req.params.slug);
    sendSuccess(res, post);
  },

  adminList: async (req, res) => {
    const params = parseListParams(req.query);
    const { items, total } = await blogService.listAll(params);
    sendSuccess(res, items, { pagination: buildPagination(total, params) });
  },

  adminGetById: async (req, res) => {
    const post = await blogService.getById(Number(req.params.id));
    sendSuccess(res, post);
  },

  create: async (req, res) => {
    const post = await blogService.create(req.body);
    sendSuccess(res, post, { status: 201, message: "Blog post created" });
  },

  update: async (req, res) => {
    const post = await blogService.update(Number(req.params.id), req.body);
    sendSuccess(res, post, { message: "Blog post updated" });
  },

  remove: async (req, res) => {
    await blogService.remove(Number(req.params.id));
    sendSuccess(res, null, { message: "Blog post deleted" });
  },
};

module.exports = { blogController };
