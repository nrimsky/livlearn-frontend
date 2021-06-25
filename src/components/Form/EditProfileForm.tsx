import React, { useState } from "react";
import Input from "./Input";
import Button from "../Button/Button";
import Textarea from "./Textarea";
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
        <Input
          name="Username"
          placeholder="Your username on livlearn"
          onChange={(newValue: string) =>
            onChange({ ...profile, username: newValue })
          }
          value={profile.username ?? ""}
        />
        <Input
          name="Tagline"
          placeholder="Describe yourself is once sentence"
          onChange={(newValue: string) =>
            onChange({ ...profile, tagline: newValue })
          }
          value={profile.tagline ?? ""}
        />
        <Textarea
          name="About"
          placeholder="About you - what are you currently learning, what are your goals, where do you see yourself in 5 years time?"
          onChange={(newValue: string) =>
            onChange({ ...profile, body: newValue })
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
