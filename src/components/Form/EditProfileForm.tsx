import React, { useState } from "react";
import LabelledInput from "./LabelledInputs/LabelledInput";
import Button from "../Button/Button";
import LabelledTextarea from "./LabelledInputs/LabelledTextarea";
import Profile from "../../types/Profile";

export default function EditProfileForm(props: {
  onClose: () => void;
  onChange: (n: Profile) => void;
  initial: Profile;
}) {
  const [profile, setProfile] = useState<Profile>(props.initial);

  const onDone = () => {
    props.onChange(profile);
    props.onClose();
  };

  const onChange = (p: Profile) => {
    setProfile(p);
  };

  return (
    <div className="w-full">
      <form className="my-6">
        <LabelledInput
          name="Username"
          placeholder="Your username on livlearn"
          onChange={(newValue: string) =>
            onChange({ ...profile, username: newValue.substring(0,100) })
          }
          value={profile.username ?? ""}
        />
        <LabelledInput
          name="Tagline"
          placeholder="Describe yourself is once sentence"
          onChange={(newValue: string) =>
            onChange({ ...profile, tagline: newValue.substring(0,500) })
          }
          value={profile.tagline ?? ""}
        />
        <LabelledTextarea
          name="About"
          placeholder="About you - what are you currently learning, what are your goals, where do you see yourself in 5 years time?"
          onChange={(newValue: string) =>
            onChange({ ...profile, body: newValue.substring(0,2000) })
          }
          value={profile.body ?? ""}
          rows={5}
        />
      </form>
      <div className="mt-4 flex">
        <Button
          color="red"
          onClick={props.onClose}
          text="Cancel"
          className="flex-none mr-3"
        />
        <Button color="green" onClick={onDone} text="Save" className="flex-1" />
      </div>
    </div>
  );
}
