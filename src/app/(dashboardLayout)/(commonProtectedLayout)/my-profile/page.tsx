import MyProfile from "@/components/modules/MyProfile/MyProfile";
import { getUserInfo } from "@/service/auth/getUserInfo";

const MyProfilePage = async () => {
  const userinfo = await getUserInfo();

  return <MyProfile userInfo={userinfo} />;
};

export default MyProfilePage;
