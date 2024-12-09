import useAuth from "@hooks/useAuth.ts";
import { useNavigate } from "react-router-dom";
import useToast from "@hooks/useToast.ts";
import DrawingSnowman from "@components/common/Animate/DrawingSnowman.tsx";
import Divider from "@components/common/Divider.tsx";
import OAuthContainer from "@components/login/OAuthContainer.tsx";
import DefaultAuthFormContainer from "@components/login/DefaultAuthFormContainer.tsx";
import { useEffect } from "react";

const LoginPage = () => {
  const { isLoggedIn, guestLogIn } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  const handleOAuthLogin = (provider: "github" | "guest") => {
    if (provider === "github") {
      // 깃허브 로그인
      window.location.assign(
        `https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_OAUTH_GITHUB_ID}&redirect_uri=${import.meta.env.VITE_OAUTH_GITHUB_CALLBACK}`
      );
    } else if (provider === "guest") {
      // 게스트 로그인
      guestLogIn();
      toast.success("게스트로 로그인되었습니다.");
      navigate("/");
    }
  };

  const handleDefaultLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      toast.error(
        "일반 로그인은 현재 지원되지 않습니다. Github나 게스트 로그인을 이용해주세요."
      );
    } catch (err) {
      console.error("로그인 도중 에러", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-8">
      <div className="w-full max-w-7xl mx-auto px-8">
        <div className="h-[640px] bg-gray-800/50 backdrop-blur-md rounded-2xl shadow-24 overflow-hidden">
          <div className="flex h-full">
            <div className="hidden lg:flex flex-grow flex-col justify-center col-span-7 p-16 bg-gradient-to-br from-emerald-600 to-emerald-700">
              <DrawingSnowman />
            </div>
            <div className="col-span-5 p-16 bg-gray-white w-full lg:w-5/12">
              <h1 className="text-6xl font-raleway font-bold black mb-11 tracking-tight text-center">
                Preview
              </h1>
              <div className="w-full max-w-md mx-auto">
                <form className="space-y-4">
                  <DefaultAuthFormContainer
                    handleDefaultLogin={handleDefaultLogin}
                  />
                  <Divider />
                  <OAuthContainer handleOAuthLogin={handleOAuthLogin} />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
