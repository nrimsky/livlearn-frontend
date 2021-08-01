import { Link } from "react-router-dom";
import logo from "../../img/logo.svg";

export default function Footer() {
  return (
    <footer className="footer bg-white dark:bg-gray-900 text-sm relative text-gray-500 dark:text-gray-400">
      <div className="container px-5 py-6 mx-auto flex items-center md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="w-64 flex items-center justify-center flex-col mt-6 md:mt-0 text-gray-900 dark:text-white">
          <img
            width="40px"
            height="40px"
            className="h-10 w-10 rounded-full"
            src={logo}
            alt=""
          />
          <span className="text-xl font-extrabold tracking-tight ">
            livlearn
          </span>
          <p className="text-center leading-tight">
            built by lifelong learners, for lifelong learners
          </p>
        </div>
        <div className="flex-grow flex flex-wrap md:pr-20 md:text-left text-center order-first font-semibold text-gray-500 dark:text-gray-400">
          <div className="md:w-1/2 w-full px-4 hover:text-gray-900 dark:hover:text-green-500">
            <Link to="/">Home</Link>
          </div>
          <div className="md:w-1/2 w-full px-4 hover:text-gray-900 dark:hover:text-green-500">
            <Link to="/privacy">Privacy policy</Link>
          </div>
          <div className="md:w-1/2 w-full px-4 hover:text-gray-900 dark:hover:text-green-500">
            <Link to="/about">About us</Link>
          </div>
          <div className="md:w-1/2 w-full px-4 hover:text-gray-900 dark:hover:text-green-500">
            <Link to="/roadmap">Our roadmap</Link>
          </div>
          <div className="md:w-1/2 w-full px-4 hover:text-gray-900 dark:hover:text-green-500">
            <Link to="/curatedresources">Curated resources</Link>
          </div>
          <div className="md:w-1/2 w-full px-4 hover:text-gray-900 dark:hover:text-green-500">
            <Link to="/feedback">Give us feedback</Link>
          </div>
        </div>
      </div>
      <div className="footer bg-gray-100 dark:bg-gray-800 text-xs relative text-gray-900 dark:text-white">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-sm text-center sm:text-left font-medium">© 2021 livlearn</p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
            <a className="ml-2" href="https://www.instagram.com/livlearn.app/">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-6 h-6"
                viewBox="0 0 24 24"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
