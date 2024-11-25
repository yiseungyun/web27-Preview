import { UserInfo } from "@/pages/MyPage";

const Profile = (userInfo: UserInfo) => {
  return (
    <div className="flex flex-row gap-8">
      <div className="relative bg-gray-50 rounded-full w-32 h-32 border-2 border-gray-100 overflow-hidden">
        <div className="absolute rounded-full w-12 h-12 bg-gray-500 top-5 left-1/2 -translate-x-1/2"></div>
        <div className="absolute rounded-custom-3xl w-32 h-32 bg-gray-500 top-[4.75rem]"></div>
      </div>
      <div className="flex flex-col my-2">
        <div className="flex flex-row mb-2">
          <p className="text-gray-black text-semibold-l">회원 정보</p>
        </div>
        <p className="text-gray-black text-medium-xl">{userInfo?.nickname}</p>
        <span className="text-gray-600 text-medium-l">
          {userInfo?.nickname}님의 관심분야를 등록해보세요!
        </span>
      </div>
    </div>
  );
};

export default Profile;
