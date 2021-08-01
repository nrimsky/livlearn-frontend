import { FancyText } from "./FormPage";

const About = () => {
  return (
    <div className="w-full sm:px-8 md:px-16 py-8 text-gray-900 dark:text-white">
      <div className="w-100 flex flex-col max-w-5xl mx-auto justify-center items-start">
        <h1 className="text-5xl font-extrabold leading-none mb-4 ml-6 sm:ml-0">
          <FancyText>About</FancyText> livlearn
        </h1>
        <div className="w-full bg-white dark:bg-gray-900 px-8 py-12 flex flex-col justify-center items-start sm:rounded">
          <p className="text-center w-full mb-12 leading-relaxed text-base sm:px-12 text-gray-600 dark:text-gray-300">
            Livlearn was born out of our own journeys teaching ourselves new
            tech topics online. We want to make lifelong learning more
            accessible, fun and useful for everyone.
          </p>
          <h2 className="text-3xl font-extrabold leading-none mb-6 text-center w-full">
            The team
          </h2>
          <div className="flex flex-wrap">
            <div className="p-4 lg:w-1/2">
              <div className="h-full flex sm:flex-row flex-col sm:items-start items-center sm:justify-start justify-center text-center sm:text-left">
                <img
                  alt="team"
                  className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4"
                  src="https://dummyimage.com/200x200"
                />
                <div className="flex-grow sm:pl-8">
                  <h2 className="title-font font-medium text-lg text-gray-900 dark:text-white">
                    Nina
                  </h2>
                  <h3 className="text-gray-500 dark:text-gray-400 mb-3">
                    Developer
                  </h3>
                  <p className="mb-4 text-gray-600 dark:text-gray-300">
                    Definitely never introduces any bugs to livlearn 😅. Hunter
                    of green lighthouse scores. Interested in all things
                    software engineering and ML. Engineering student.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 lg:w-1/2">
              <div className="h-full flex sm:flex-row flex-col items-center sm:items-start sm:justify-start justify-center text-center sm:text-left">
                <img
                  alt="team"
                  className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4"
                  src="https://dummyimage.com/200x200"
                />
                <div className="flex-grow sm:pl-8">
                  <h2 className="title-font font-medium text-lg text-gray-900 dark:text-white">
                    Nnaemeka
                  </h2>
                  <h3 className="mb-3 text-gray-500 dark:text-gray-400">
                    Strategy
                  </h3>
                  <p className="mb-4 text-gray-600 dark:text-gray-300">
                    Designer of our elephant logo which obviously is *not*
                    childish. Interested in no-code development and ecommerce.
                    Economics and Management student.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <h2 className="text-3xl font-extrabold leading-none mb-6 mt-6 text-center w-full">
            Why sign up
          </h2>
          <p className="text-center w-full leading-relaxed text-base sm:px-12 text-gray-600 dark:text-gray-300">
            With a livlearn account you can bookmark resources to refer back to,
            create and share resource collections (both private and public),
            create a learner profile, and upvote other people's resource
            collections. There are more member-only features to come. It's 100%
            free and all you need is an email.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
