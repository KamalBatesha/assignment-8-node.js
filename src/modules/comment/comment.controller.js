import { Router } from "express";
import {
  createBulkComments,
  findOrCreateComment,
  getCommentDetails,
  getNewestComments,
  searchComments,
  updateComment,
} from "./comment.service.js";

export const commentRouter = new Router();
commentRouter.post("/", createBulkComments);
commentRouter.post("/:commentId", updateComment);
commentRouter.post("/find-or-create", findOrCreateComment);
commentRouter.get("/search", searchComments);
commentRouter.get("/newest/:postId ", getNewestComments);
commentRouter.get("/details/:id ", getCommentDetails);
