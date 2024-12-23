import { Router } from "express";
import { allPosts, commentCount, createPost, deleteById } from "./post.service.js";

export const postRouter = new Router();
postRouter.post("/", createPost);
postRouter.delete("/:postId", deleteById);
postRouter.get("/details", allPosts);
postRouter.get("/comment-count", commentCount);
