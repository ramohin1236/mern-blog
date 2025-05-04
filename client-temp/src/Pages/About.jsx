/* eslint-disable react/no-unescaped-entities */

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-12 mx-auto lg:px-8 lg:py-24">
      <div className="w-full max-w-4xl text-center">
        <h1 className="text-3xl font-bold text-gray-800 lg:text-5xl">
          About Us
        </h1>
        <p className="mt-6 text-lg text-gray-600 lg:text-xl">
          Welcome to our blog, where knowledge meets experience. Our mission is to empower readers with insightful content that fosters learning and growth.
        </p>
        <p className="mt-4 text-lg text-gray-600 lg:text-xl">
          Here, we believe in sharing ideas and stories that resonate with our community. Whether you're here to learn something new or to share your own experiences, you're in the right place.
        </p>
      </div>

      <div className="grid gap-8 mt-12 lg:grid-cols-2">
        <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-xl">
          <img
            src="/public/logo.jpg"
            alt="Our Vision"
            className="w-24 h-24 mb-4 rounded-full"
          />
          <h2 className="text-xl font-semibold text-gray-800">Our Vision</h2>
          <p className="mt-2 text-gray-600">
            To be the go-to platform for reliable and engaging blog content that inspires and educates.
          </p>
        </div>

        <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-xl">
          <img
            src="/public/logo.jpg"
            alt="Our Mission"
            className="w-24 h-24 mb-4 rounded-full"
          />
          <h2 className="text-xl font-semibold text-gray-800">Our Mission</h2>
          <p className="mt-2 text-gray-600">
            To provide high-quality content that meets the needs of our diverse audience, promoting continuous learning and personal growth.
          </p>
        </div>

        <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-xl">
          <img
            src="/public/logo.jpg"
            alt="Our Values"
            className="w-24 h-24 mb-4 rounded-full"
          />
          <h2 className="text-xl font-semibold text-gray-800">Our Values</h2>
          <p className="mt-2 text-gray-600">
            Integrity, Inclusivity, and Innovation are at the heart of everything we do. We are committed to creating a positive impact.
          </p>
        </div>

        <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-xl">
          <img
            src="/public/logo.jpg"
            alt="Join Us"
            className="w-24 h-24 mb-4 rounded-full"
          />
          <h2 className="text-xl font-semibold text-gray-800">Join Us</h2>
          <p className="mt-2 text-gray-600">
            Become a part of our growing community. Share your knowledge and experiences with a wider audience.
          </p>
        </div>
      </div>

      <div className="w-full max-w-4xl mt-16">
        <h2 className="text-2xl font-semibold text-gray-800 text-center lg:text-4xl">
          Frequently Asked Questions
        </h2>
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
  )
}

export default About