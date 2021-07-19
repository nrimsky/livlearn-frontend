import { useParams } from "react-router-dom";
import MyProfile from "../Profile/MyProfile";
import { useEffect, useState } from "react";
import { getProfile, streamProfile } from "../../firebase/FirestoreService";
import Profile from "../../types/Profile";
import OtherProfile from "../Profile/OtherProfile";

type ParamTypes = {
  uid: string | undefined;
};

const ProfilePage = (props: { currentUserId: string | null }) => {
  const { uid } = useParams<ParamTypes>();
  const ownsProfile = props.currentUserId ? props.currentUserId === uid : false;
  const [profile, setProfile] = useState<Profile | null>(null);

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

  useEffect(() => {
    // someone else's profile
    if (uid && props.currentUserId !== uid) {
      getProfile(uid)
        .then((p) => {
          setProfile(p);
        })
        .catch((e) => console.error(e));
    }
  });

  if (ownsProfile && profile && uid) {
    return (
      <div className="w-full max-w-screen-2xl mx-auto">
        <MyProfile profile={profile} uid={uid}/>
      </div>
    );
  }

  if (!ownsProfile && profile) {
    return (
      <div className="w-full max-w-screen-2xl mx-auto">
        <OtherProfile profile={profile} />
      </div>
    );
  }
  return (
    <p className="p-5 text-gray-900 dark:text-white">
      This profile was not found
    </p>
  );
};

export default ProfilePage;
