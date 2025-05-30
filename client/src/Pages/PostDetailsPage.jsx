/* eslint-disable no-unused-vars */

import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Spinner } from 'flowbite-react';
import Comments from '../Components/Comments';
import PostCard from '../Components/PostCard';
import Headers from '../Components/Headers';
const PostDetailsPage = () => {

    const {postSlug}=useParams()
    const [loading, setLoading]=useState(true)
    const [error, setError]=useState(false)
    const [post, setPost]=useState(null)
    const [recentPosts, setRecentPosts] = useState(null);
   
//    post fetching
    useEffect(() => {
        const fetchPost = async () => {
          try {
            setLoading(true);
            const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
            const data = await res.json();

            if (!res.ok) {
              setError(true);
              setLoading(false);
              return;
            }
            if (res.ok) {
              setPost(data.posts[0]);
              setLoading(false);
              setError(false);
            }
          } catch (error) {
            setError(true);
            setLoading(false);
          }
        };
        fetchPost();
      }, [postSlug]);

    //   Comment fetching
    useEffect(() => {
        try {
          const fetchRecentPosts = async () => {
            const res = await fetch(`/api/post/getposts?limit=4`);
            const data = await res.json();
            console.log("recent",data);
            if (res.ok) {
              setRecentPosts(data.posts);
            }
          };
          fetchRecentPosts();
        } catch (error) {
          console.log(error.message);
        }
      }, [])
    //   spinner when page is loading
      if (loading)
        return (
          <div className='flex justify-center items-center min-h-screen'>
            <Spinner size='xl' />
          </div>
        );

  return (
    <div >
      <Headers/>
          <main  className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen my-6'>
         <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
        {post && post.title}
      </h1>

      <Link
        to={`/search?category=${post && post.category}`}
        className='self-center mt-5'
      >
        <Button color='gray' pill size='xs'>
          {post && post.category}
        </Button>
      </Link>

      <img
        src={post && post.image}
        alt={post && post.title}
        className='mt-10 p-3 h-56 md:h-[500px] w-full object-cover'
      />
       <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-4xl text-xs'>
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className='italic'>
          {post && (post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>

{/* remove this html tag  */}
      <div
        className='p-3 max-w-2xl mx-auto w-full post-content'
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>

      <div className='max-w-4xl mx-auto w-full'>
        {/* <CallToAction /> */}
      </div>
      {/* comment section */}
      <Comments postId={post._id} />
      <div className='flex flex-col justify-center items-center mb-5'>
        <h1 className='text-xl mt-5'>Recent Posts</h1>
        <div className='flex flex-wrap gap-5 mt-5 justify-center'>
          {recentPosts &&
            recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
    </main>
    </div>
    
  )
}

export default PostDetailsPage