"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePost = void 0;
let posts = [];
const handlePost = (socket, io) => {
    socket.emit("posts", posts);
    socket.on("addPost", (post) => {
        const newPost = {
            id: posts.length + 1,
            title: post.title,
            content: post.content,
        };
        posts.push(newPost);
        io.emit("newPost", newPost);
    });
};
exports.handlePost = handlePost;
//# sourceMappingURL=post.js.map