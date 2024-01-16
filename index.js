const path = require("path");
const readJsonFileAsync = require("./fileUtils.js");

const postPath = path.join(__dirname, "data/posts.json");
const userPath = path.join(__dirname, "data/users.json");
const commentsPath = path.join(__dirname, "data/comments.json");

async function LoadPosts() {
  try {
    //Read all the JSON files
    const { posts } = await readJsonFileAsync(postPath);
    const { comments } = await readJsonFileAsync(commentsPath);
    const { users } = await readJsonFileAsync(userPath);

    //Merge comment with users
    const commentsWithUsers = comments.map((comment) => {
      const user = users.find((user) => user.id === comment.user.id);
      return {
        ...comment,
        user,
      };
    });

    //Merge Post with comments
    const postWithComments = posts.map((post) => {
      const postcomments = commentsWithUsers.filter(
        (itm) => itm.postId === post.id
      );

      return {
        ...post,
        comments: postcomments,
      };
    });
    return postWithComments;
  } catch (error) {
    console.log(error);
  }
}
LoadPosts().then((data) => {
  console.log(data);
});
