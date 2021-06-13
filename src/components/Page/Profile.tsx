import { useParams } from "react-router-dom";
import { getCurrentUser } from "../../firebase/AuthService";
import MyProfile from "../Profile/MyProfile";

type ParamTypes = {
  uid: string | undefined;
};

const ProfilePage = () => {
  const currentUser = getCurrentUser();
  const { uid } = useParams<ParamTypes>();
  const ownsProfile = currentUser ? currentUser.uid === uid : false;

  return (
    <div className="w-full max-w-screen-2xl mx-auto">
      {(ownsProfile && currentUser) ? <MyProfile user={currentUser} /> : <p className="p-5">Not found</p>}
    </div>
  );
};

export default ProfilePage;
