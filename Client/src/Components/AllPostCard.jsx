/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const AllPostCard = ({ post }) => {
  console.log(post);
  return (
    <div className="group relative w-full border   overflow-hidden transition-all ">
      <div className="w-full h-24 md:h-56  flex  justify-between">
        <div>
          <Link to={`/post/${post.slug}`}>
            <img
              src={post.image}
              alt="post cover"
              className="h-[260px] max-sm:w-24 md:w-96  object-cover group-hover:h-[200px] transition-all duration-300 z-20"
            />
          </Link>
        </div>
        <div>
          <h1 className="md:text-3xl font-bold text-blue-500">{post.title}</h1>
          <span className="italic text-sm">{post.category}</span>

          <Link
            to={`/post/${post.slug}`}
            className=" z-10 group-hover:bottom-0 w-36 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2"
          >
            Read Full Blog
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllPostCard;
