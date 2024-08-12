/* eslint-disable react/no-unescaped-entities */
import Typewriter from "typewriter-effect";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PostCard from "./../Components/PostCard";

const Home = () => {
  const [recentPosts, setRecentPosts] = useState(null);
  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/getposts?limit=4`);
        const data = await res.json();
        console.log("recent", data);
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  return (
    <div className="min-h-screen">
      <div className="m-2 relative">
        <img
          className="md:h-[500px] w-full object-cover rounded-bl-lg rounded-t-lg"
          src="/public/thum-image.jpg "
          alt=""
        />
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-700 text-center px-4">
          <Typewriter
            options={{
              strings: [
                "Welcome to my Blog Website. Need Help? Please Read your realiable Blog",
                "Show Your Skills with Blog & Help other to sharing your skills",
              ],
              autoStart: true,
              loop: true,
            }}
          />
          <Link
            to="/dashboard/create-post"
            className="md:ml-24 text-2xl text-blue-700 font-bold hover:underline"
          >
            Create your Blog
          </Link>
        </div>
      </div>
      {/* design  */}
      <div className="h-96 container mx-auto md:flex mt-32 mb-44">
        <div className="flex flex-col flex-1 text-center justify-center items-center">
          <h1 className="text-5xl mb-4">Choose the perfect design</h1>
          <p className="text-xl mb-6">
            Create a beautiful blog that fits your style. Choose from a
            selection of easy-to-use templates – all with flexible layouts and
            hundreds of background images – or design something new.
          </p>
        </div>
        <div className="flex-1">
          <img
            className="w-[800px] h-96 object-cover"
            src="/public/blog.jpg"
            alt=""
          />
        </div>
      </div>
              {/* Recent blogs when user log in */}
              <h1 className="text-3xl text-center max-sm:mt-72">Recent Blogs</h1>
      {
        recentPosts ? <div className="flex flex-col justify-center items-center mb-36 ">
       
        <div className="flex flex-wrap gap-5 mt-5 justify-center">
          {recentPosts &&
            recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div> : 
      <div className="h-44 flex justify-center text-5xl mt-4 font-bold">
          <Typewriter
            options={{
              strings: "Please Login First For Recent Blogs",
              autoStart: true,
              loop: true,
            }}
          />
      </div> 
      }

      {/* earn money */}

      <div className="h-96 container  mx-auto md:flex mt-12 mb-56">
        
        <div className="flex-1">
          <img
            className="w-[800px] h-96 object-cover rounded-bl-2xl rounded-rl-2xl"
            src="/public/money.jpg"
            alt=""
          />
        </div>
        <div className="flex flex-col flex-1 text-center justify-center items-center">
          <h1 className="text-5xl mb-4">Earn money</h1>
          <p className="text-xl mb-6">
          Get paid for your hard work. Google AdSense can automatically display relevant targeted ads on your blog so that you can earn income by posting about your passion.
          </p>
        </div>
      </div>

      {/* gain Knowledge */}

      <div className="h-96 container mx-auto md:flex mt-12 max-sm:mb-[450px] md:mb-20">
       
        <div className="flex flex-col flex-1 text-center justify-center items-center">
          <h1 className="text-5xl mb-4">Gain Knowledge</h1>
          <p className="text-xl mb-6">
          Gaining knowledge is a continuous process that enhances your understanding of the world. It involves actively seeking information, whether through reading, experiences, or interactions with others. This process not only broadens your perspective but also sharpens critical thinking and problem-solving skills. Knowledge empowers you to make informed decisions, adapt to change, and innovate. It fosters personal growth, boosts confidence, and contributes to success in various aspects of life. Embracing lifelong learning keeps the mind sharp and open to new possibilities.
          </p>
        </div>
         
        <div className="flex-1">
          <img
            className="w-[800px] h-96 object-cover rounded-bl-2xl rounded-rl-2xl"
            src="/public/Knowledge.jpg"
            alt=""
          />
        </div>
      </div>
      {/* q and a  */}
      <div className="flex flex-col items-center justify-center px-6 py-12 mx-auto lg:px-8 lg:py-24"> 
      <div className="w-full max-w-4xl mt-16">
      <h1 className="text-5xl mb-4 text-center"> Frequently Asked Questions</h1>
       
        <div className="mt-8 space-y-6">
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="text-xl font-medium text-gray-800">
              What type of content do you offer?
            </h3>
            <p className="mt-2 text-gray-600">
              We offer a wide range of content from technical guides, personal growth tips, and creative stories, to industry insights and trends.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="text-xl font-medium text-gray-800">
              How can I contribute to the blog?
            </h3>
            <p className="mt-2 text-gray-600">
              You can contribute by submitting your articles or joining as a regular writer. We value diverse perspectives and voices.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="text-xl font-medium text-gray-800">
              Is the content free to access?
            </h3>
            <p className="mt-2 text-gray-600">
              Yes, all our content is free to access. We believe in making knowledge accessible to everyone.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="text-xl font-medium text-gray-800">
              How often do you publish new content?
            </h3>
            <p className="mt-2 text-gray-600">
              We publish new content regularly, with updates often coming multiple times a week.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="text-xl font-medium text-gray-800">
              Can I subscribe to receive updates?
            </h3>
            <p className="mt-2 text-gray-600">
              Yes, you can subscribe to our newsletter to receive the latest articles directly in your inbox.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="text-xl font-medium text-gray-800">
              Who are the authors?
            </h3>
            <p className="mt-2 text-gray-600">
              Our authors are a mix of industry experts, passionate writers, and community members who have valuable experiences to share.
            </p>
          </div>
        </div>
      </div>
      </div>
      
    </div>
  );
};

export default Home;
