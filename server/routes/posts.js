import express from "express";
import { getPosts, createPost, getSinglePost } from "../controllers/posts.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getSinglePost);
router.post("/", createPost);

export default router;
