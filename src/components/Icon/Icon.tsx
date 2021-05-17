import React from "react";
import MediaType from "../../types/MediaType";
import {
  AcademicCapIcon,
  GlobeAltIcon,
  VideoCameraIcon,
  BookOpenIcon,
  VolumeUpIcon,
  MicrophoneIcon,
  NewspaperIcon,
  DotsCircleHorizontalIcon
} from "@heroicons/react/outline";

export default function Icon(props: { mediaType: MediaType }) {
  switch (props.mediaType) {
    case MediaType.Article:
      return (
        <NewspaperIcon
          className="flex-shrink-0 h-5 w-5 text-green-500"
          aria-hidden="true"
        />
      );
    case MediaType.Podcast:
      return (
        <MicrophoneIcon
          className="flex-shrink-0 h-5 w-5 text-green-500"
          aria-hidden="true"
        />
      );
    case MediaType.Blog:
      return (
        <GlobeAltIcon
          className="flex-shrink-0 h-5 w-5 text-green-500"
          aria-hidden="true"
        />
      );
    case MediaType.AudioBook:
      return (
        <VolumeUpIcon
          className="flex-shrink-0 h-5 w-5 text-green-500"
          aria-hidden="true"
        />
      );
    case MediaType.Book:
      return (
        <BookOpenIcon
          className="flex-shrink-0 h-5 w-5 text-green-500"
          aria-hidden="true"
        />
      );
    case MediaType.FreeVideo:
      return (
        <VideoCameraIcon
          className="flex-shrink-0 h-5 w-5 text-green-500"
          aria-hidden="true"
        />
      );
    case MediaType.OnlineCourse:
      return (
        <AcademicCapIcon
          className="flex-shrink-0 h-5 w-5 text-green-500"
          aria-hidden="true"
        />
      );
    case MediaType.Other:
      return (
        <DotsCircleHorizontalIcon
          className="flex-shrink-0 h-5 w-5 text-green-500"
          aria-hidden="true"
        />
      );
  }
}
