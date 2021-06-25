import { useParams } from "react-router-dom";
import MyProfile from "../Profile/MyProfile";
import { useEffect, useState } from "react";
import { streamProfile } from "../../firebase/FirestoreService";
import Profile from "../../types/Profile";

type ParamTypes = {
  uid: string | undefined;
};

const ProfilePage = (props: { currentUserId: string | null }) => {
  const { uid } = useParams<ParamTypes>();
  const ownsProfile = props.currentUserId ? props.currentUserId === uid : false;
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    console.log(profile);
  }, [profile]);

  useEffect(() => {
    if (!(uid && props.currentUserId === uid)) {
      return;
    }
    const unsubscribe = streamProfile(
      uid,
      (p) => {
        setProfile(p);
      },
      (error) => {
        console.error(error);
      }
    );
    return unsubscribe;
  }, [uid, props]);

  return (
    <div className="w-full max-w-screen-2xl mx-auto">
      {ownsProfile && profile ? (
        <MyProfile
          profile={profile}
        />
      ) : (
        <p className="p-5 text-gray-900 dark:text-white">
          This profile was not found
        </p>
      )}
    </div>
  );
};

export default ProfilePage;
