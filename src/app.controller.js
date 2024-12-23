import { checkConecttionDB, checkSyncDB } from "./DB/connectionDB.js";
import { commentRouter } from "./modules/comment/comment.controller.js";
import { postRouter } from "./modules/post/post.controller.js";
import { userRouter } from "./modules/user/user.controller.js";


const bootstrap=(app,express)=>{
    app.use(express.json());
    checkConecttionDB();
    checkSyncDB();

    app.use("/users",userRouter)
    app.use("/posts",postRouter)
    app.use("/comments",commentRouter)

    app.use("*", (req, res, next) => {
        return res.status(404).json({ msg: `invalid url ${req.originalUrl}` });
      });

}
export default bootstrap