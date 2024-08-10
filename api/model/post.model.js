import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default:
        'https://media.istockphoto.com/id/606217830/photo/boat-riding-in-a-river.jpg?s=1024x1024&w=is&k=20&c=ADE-DAcb4jumBPPnXJgoG6N_iUXhLqYeQfJh-7KewSw=',
    },
    category: {
      type: String,
      default: 'uncategorized',
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

export default Post;