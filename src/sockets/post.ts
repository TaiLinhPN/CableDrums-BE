import { Server, Socket } from 'socket.io';

interface Post {
  id: number;
  title: string;
  content: string;
}
let posts: Post[] = [];

export const handlePost = (socket: Socket, io: Server) => {
  socket.emit('posts', posts);

  socket.on('addPost', (post) => {
    const newPost = {
      id: posts.length + 1,
      title: post.title,
      content: post.content,
    };
    posts.push(newPost);
    io.emit('newPost', newPost);
  });
};
