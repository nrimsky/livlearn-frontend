import { useParams } from "react-router-dom";
import MyProfile from "../Profile/MyProfile";
import Profile from "../../types/Profile";
import OtherProfile from "../Profile/OtherProfile";

type ParamTypes = {
  profileOwnerUid: string | undefined;
};

type Props = {
  currentUserId: string | null;
  currentUserProfile: Profile | null;
}

const ProfilePage = ({currentUserId, currentUserProfile}: Props) => {
  const { profileOwnerUid } = useParams<ParamTypes>();
  const ownsProfile = currentUserId ? currentUserId === profileOwnerUid : false;

  if (ownsProfile && currentUserProfile && currentUserId) {
    return (
      <div className="w-full max-w-screen-2xl mx-auto">
        <MyProfile profile={currentUserProfile} uid={currentUserId}/>
      </div>
    );
  }

  if (!ownsProfile && profileOwnerUid) {
    return (
      <div className="w-full max-w-screen-2xl mx-auto">
        <OtherProfile profileOwnerId={profileOwnerUid} />
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
