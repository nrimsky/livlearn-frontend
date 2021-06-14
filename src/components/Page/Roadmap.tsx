import { AcademicCapIcon, ClipboardListIcon, MapIcon, UserGroupIcon} from "@heroicons/react/outline";
import React from "react";

const RoadmapItem = (props: {
  icon: React.ReactNode;
  title: string;
  text: string;
  key?: string;
  status: "Live!" | "In progress" | "Next up";
  num: number;
}) => {
  return (
    <div className="flex relative pt-10 pb-20 sm:items-center md:w-2/3 mx-auto">
      <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
        <div className="h-full w-1 bg-gray-200 dark:bg-gray-800 pointer-events-none"></div>
      </div>
      <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-green-500 text-white relative z-10 title-font font-medium text-sm">
        {props.num}
      </div>
      <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
        <div className="flex-shrink-0 w-24 h-24 bg-green-100 text-green-500 dark:text-green-400 dark:bg-gray-800 rounded-full inline-flex items-center justify-center">
          {props.icon}
        </div>
        <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
          <h2 className="font-medium title-font text-gray-900 text-xl dark:text-white">
            {props.title}
          </h2>
          <p className={`mb-1 leading-relaxed text-sm ${(props.status !== "Next up" && "text-green-500 dark:text-green-500 font-medium")}`}>{props.status}</p>
          <p className="leading-relaxed">{props.text}</p>
        </div>
      </div>
    </div>

  );
};

const Roadmap = () => {
  return (
    <div className="text-gray-600 body-font dark:text-gray-400 w-100 md:px-8">
      <div className="container px-5 my-12 py-12 mx-auto flex flex-wrap bg-white dark:bg-gray-900 md:rounded-lg border-t-2 border-b-2 md:border md:ring-4 md:ring-green-200 border-green-500 md:ring-opacity-20 max-w-4xl">
        <h1 className="flex relative pt-5 pb-2 sm:items-center md:w-2/3 mx-auto text-2xl text-gray-900 dark:text-white font-medium">Our roadmap...</h1>
        <p className="flex relative pb-5 sm:items-center md:w-2/3 mx-auto text-sm">We are two uni students trying to make lifelong learning in tech accessible for all! Got a feature suggestion? Email us at info[at]howshouldilearn[dot]com!</p>
        <RoadmapItem
          title="Learning resource collections"
          status="Live!"
          text="LivLearn's learning resource collections feature enables you to save and share lists of learning resources with friends, colleagues, students or for future reference. Manage access permissions to your lists, download and upload to CSV, and more."
          num={1}
          icon={<ClipboardListIcon className="h-12 w-12" />}
        />
        <RoadmapItem
          title="Sharing our favourite resources"
          status="In progress"
          text="With the help of a team of tech experts, we will curate and share our favourite learning resources on LivLearn. Easily filter by resource media type, difficulty level and topic. Bookmark a resource with one click, or save to a collection."
          num={2}
          icon={<AcademicCapIcon className="h-12 w-12" />}
        />
        <RoadmapItem
          title="Learner profiles"
          status="Next up"
          text="Build your learner profile on LivLearn - share what you're currently learning, what resources you benefitted from and stay accountable with your goals. Receive daily prompts and tips personalised especially for your learning style and interests."
          num={3}
          icon={<UserGroupIcon className="h-12 w-12" />}
        />
        <RoadmapItem
          title="Topic maps"
          status="Next up"
          text="Explore topic maps of various areas of knowledge, to help you decide what to learn next in your lifelong learning journey. Discover things you didn't know that you didn't know and earn learner points by overcoming boundaries."
          num={4}
          icon={<MapIcon className="h-12 w-12" />}
        />
      </div>
    </div>
  );
};

export default Roadmap;
