import React, { FormEvent } from "react";
import { useState } from "react";
import { submitForm } from "../../api/LivlearnApi";
import useForm from "../../hooks/useForm";
import Button from "../Button/Button";
import LLInput from "../Form/Inputs/LLInput";
import LLTextArea from "../Form/Inputs/LLTextArea";
import StarRating from "../Form/StarRating";

export const FancyText = (props: { children: React.ReactNode }) => {
  return (
    <span
      className={`
      font-extrabold 
      text-transparent 
      bg-clip-text 
      bg-gradient-to-br
      from-green-500 via-blue-500 to-pink-500`}
    >
      {props.children}
    </span>
  );
};

const Section = (props: { children: React.ReactNode; label: string }) => {
  return (
    <div className="mt-4 md:mt-6 w-full">
      <label className="w-full mb-2 block leading-tight font-normal">
        {props.label}
      </label>
      {props.children}
    </div>
  );
};
export default function FormPage() {
  const initialState = {
    email: "",
    q1: "",
    q2: "",
    q3: "",
    q4: "",
  };
  const [msg, setMsg] = useState({ isError: false, msg: "" });
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    submitForm(JSON.stringify(state)+`Rating: ${rating}`, "Feedback form")
      .then(() => {
        setMsg({
          isError: false,
          msg: "Thank you so much for sending us feedback",
        });
        setLoading(false);
      })
      .catch((e) => {
        setMsg({
          isError: true,
          msg: `${e.message}. Unfortunately there was an error submitting your feedback. Please try again.`,
        });
        setLoading(false);
      });
  };
  const { state, bind } = useForm(initialState);
  const { q1, q2, q3, q4, email } = state;
  return (
    <div className="w-full sm:px-8 md:px-12 py-8 sm:py-12 text-gray-900 dark:text-white">
      <form
        onSubmit={submitHandler}
        className="w-100 flex flex-col max-w-2xl mx-auto justify-center items-center bg-white dark:bg-gray-900 px-6 py-6 sm:px-8 sm:py-10 sm:rounded sm:border border-gray-300 dark:border-gray-500 shadow-sm"
      >
        <h1
          className={`text-5xl 
        font-extrabold 
        leading-none`}
        >
          We really need <FancyText>your</FancyText> opinion
        </h1>
        <h2 className="font-medium text-lg leading-tight mt-2 md:mt-4">
          At livlearn, we love learning from our users. Your feedback will make
          a difference to how we develop the platform. Feel free to get in touch
          via the form below.
        </h2>
        <Section label="If you'd like us to reply to you, please put your email below:">
          <LLInput
            readOnly={loading}
            name="email"
            {...bind}
            value={email}
            placeholder="cat@whiskers.com"
          />
        </Section>
        <Section label="Please rate our beta version in terms of usefulness and accessibility:">
          <StarRating rating={rating} onChange={(n: number) => setRating(n)} />
        </Section>
        <Section label="What types of resources do you use most when learning new tech topics?">
          <LLInput
            readOnly={loading}
            name="q1"
            {...bind}
            value={q1}
            placeholder="eg: blogs, moocs, yt, books, forums"
          />
        </Section>
        <Section label=" What topics would you like more curated recommendations on?">
          <LLInput
            readOnly={loading}
            name="q2"
            {...bind}
            value={q2}
            placeholder="eg: ML, blockchain, web dev"
          />
        </Section>

        <Section label="Feature suggestions:">
          <LLTextArea
            readOnly={loading}
            rows={3}
            name="q3"
            {...bind}
            value={q3}
            placeholder="eg: every website visitor should get a free Tesla and a holiday to the Maldives"
          />
        </Section>
        <Section label="I just want to say hi or write some general feedback:">
          <LLTextArea
            readOnly={loading}
            rows={3}
            name="q4"
            {...bind}
            value={q4}
            placeholder="eg: my cat wants to invest all his savings into livlearn - 5 dead mice, one robin and half a packet of cat food"
          />
        </Section>
        {msg.msg && (
          <h2
            className={`font-medium text-lg leading-tight mt-2 md:mt-4 ${
              msg.isError ? "text-red-500" : "text-green-500"
            }`}
          >
            {msg.msg}
          </h2>
        )}
        <Button
          type="submit"
          content={
            <>
              {loading ? "Sending..." : "Send feedback"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 inline ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </>
          }
          color="green"
          className="mt-4 md:mt-6 items-center"
        />
      </form>
    </div>
  );
}
