import { Sequelize } from "sequelize";
import { commentModel } from "../../DB/models/index.js";

export const createBulkComments = async (req, res, next) => {
  const { comments } = req.body;
  console.log(comments);

  try {
    const createdComments = await commentModel.bulkCreate(comments);
    console.log(createdComments);

    res.status(201).json({ message: "comments created", createdComments });
  } catch (error) {
    console.error("Error creating comments:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating comments." });
  }
};

export const updateComment = async (req, res, next) => {
  const { userId, content } = req.body;
  const { commentId } = req.params;

  try {
    const comment = await commentModel.findByPk(commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    if (comment.userId !== userId) {
      return res
        .status(403)
        .json({ error: "You can only update your own comment" });
    }

    comment.content = content;
    await comment.save();

    res.status(200).json({ message: "comment updated", comment });
  } catch (error) {
    console.error("Error updating comment:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the comment." });
  }
};

export const findOrCreateComment = async (req, res, next) => {
  const { postId, userId, content } = req.body;

  try {
    const comment = await commentModel.findOrCreate({
      where: { postId, userId, content },
      defaults: { content }, // default content if a new comment is created
    });
    console.log(comment);

    res.status(200).json(comment);
  } catch (error) {
    console.error("Error finding or creating comment:", error);

    res
      .status(500)
      .json({ error: "An error occurred while handling the comment." });
  }
};

export const searchComments = async (req, res, next) => {
  const { word } = req.query;

  try {
    const { count, rows } = await commentModel.findAndCountAll({
      where: {
        content: {
          [Sequelize.Op.like]: `%${word}%`,
        },
      },
    });

    res.status(200).json({ count, comments: rows });
  } catch (error) {
    console.error("Error searching comments:", error);
    res
      .status(500)
      .json({ error: "An error occurred while searching for comments." });
  }
};

export const getNewestComments = async (req, res, next) => {
  const { postId } = req.params;

  try {
    const comments = await commentModel.findAll({
      where: { postId },
      order: [["createdAt", "DESC"]],
      limit: 3,
    });

    res.status(200).json(comments);
  } catch (error) {
    console.error("Error retrieving newest comments:", error);
    res
      .status(500)
      .json({
        error: "An error occurred while retrieving the newest comments.",
      });
  }
};

export const getCommentDetails = async (req, res, next) => {
        const { id } = req.params;
      
        try {
          const comment = await commentModel.findOne({
            where: { id },
            include: [
              { model: userModel, attributes: ['id', 'name','email'] },
              { model: postModel, attributes: ['id', 'title','content'] },
            ],
          });
      
          if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
          }
      
          res.status(200).json(comment);
        } catch (error) {
          console.error('Error retrieving comment details:', error);
          res.status(500).json({ error: 'An error occurred while retrieving the comment details.' });
        }
  };
