import { sequelize } from "../../DB/connectionDB.js";
import { commentModel, postModel, userModel } from "../../DB/models/index.js";

export const createPost = async (req, res, next) => {
  try {
    const { title, content, userId } = req.body;

    if (!title || !content || !userId) {
      return res
        .status(400)
        .json({ message: "Title, content, and userId are required" });
    }

    const newPost = await postModel.create({ title, content, userId });

    return res
      .status(201)
      .json({ message: "post created successfully", newPost });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error });
  }
};
export const deleteById = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const { userId } = req.body; 
    
        const post = await postModel.findByPk(postId);
    
        if (!post) {
          return res.status(404).json({ message: 'Post not found' });
        }
    
        if (post.userId !== userId) {
          return res.status(403).json({ message: 'You are not the owner of this post' });
        }
    
        // Delete the post
        await post.destroy();
        return res.status(200).json({ message: 'Post deleted successfully' });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
      }
  };

  export const allPosts = async (req, res, next) => {
    try {
        const posts = await postModel.findAll({
          include: [
            {
              model: userModel, 
              attributes: ['id', 'name'],
            },
            {
              model: commentModel, 
              attributes: ['id', 'content'],
            },
          ],
        });
    
        return res.status(200).json(posts);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
      }
  };
  export const commentCount  = async (req, res, next) => {
    try {
        const posts = await postModel.findAll({
          attributes: {
            include: [
              [
                sequelize.fn('COUNT', sequelize.col('comments.id')), 
                'commentCount',
              ],
            ],
          },
          include: [
            {
              model: commentModel,  
              attributes: [],
            },
          ],
          group: ['post.id'], // Group by post id to count comments per post
        });
    
        return res.status(200).json(posts);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error',error });
      }
    };
  
