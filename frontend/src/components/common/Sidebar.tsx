import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaClipboardList, FaLayerGroup } from "react-icons/fa";
import { MdDarkMode, MdLightMode, MdLogin, MdLogout } from "react-icons/md";
import { IoPersonSharp, IoHomeSharp } from "react-icons/io5";
import { FaGithub } from "react-icons/fa6";
import useTheme from "@hooks/useTheme.ts";
import useAuth from "@hooks/useAuth.ts";
import { IconType } from "react-icons";
import useToast from "@hooks/useToast.ts";

const Sidebar = () => {
  const { isLoggedIn, logOut } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const handleLogout = () => {
    logOut();
    toast.error("로그아웃 되었습니다.");
  };

  const routes = [
    {
      path: "/",
      label: "홈",
      icon: IoHomeSharp,
    },
    {
      path: "/questions",
      label: "질문지 리스트",
      icon: FaClipboardList,
    },
    {
      path: "/sessions",
      label: "스터디 세션 목록",
      icon: FaLayerGroup,
    },
    {
      path: "/mypage",
      label: "마이페이지",
      icon: IoPersonSharp,
    },
    isLoggedIn
      ? {
          path: null,
          label: "로그아웃",
          icon: MdLogout,
          onClick: handleLogout,
        }
      : {
          path: "/login",
          label: "로그인",
          icon: MdLogin,
        },
  ];

  const [selected, setSelected] = useState<string>("");
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setSelected(window.location.pathname);
  }, []);
  return (
    <nav
      className={
        "min-w-17.5 w-17.5 h-screen flex flex-col border-r-custom-s gap-1.5 justify-between overflow-y-hidden bg-white transition-colors dark:bg-gray-black dark:border-r-gray-400"
      }
    >
      <div>
        <header
          className={
            "text-green-400 text-5xl text-center py-7 font-bold hover:tracking-widest transition-all duration-700 font-raleway dark:text-green-100"
          }
        >
          Preview
        </header>
        <hr className={"mx-4 dark:border-gray-400"} />
        <ul
          className={"flex flex-col gap-2 items-center mx-2 my-2 p-2"}
          aria-label={"사이드바 링크 리스트"}
        >
          {routes.map((route) => {
            return (
              <SidebarMenu
                key={route.path}
                path={route.path}
                label={route.label}
                icon={route.icon}
                isSelected={selected === route.path}
                onClick={
                  route.path
                    ? () =>
                        navigate(route.path, {
                          state: { from: route.path ?? "/" },
                        })
                    : route.onClick
                }
              />
            );
          })}
        </ul>
      </div>
      <div className={"pb-4 px-6 inline-flex items-center justify-between"}>
        <a
          className={
            "text-medium-m dark:text-white text-black hover:text-gray-500"
          }
          href={"https://github.com/boostcampwm-2024/web27-Preview"}
          aria-label={"리포지토리 링크"}
          target={"_blank"}
        >
          <span className={"inline-flex items-center gap-1"}>
            <FaGithub /> BOOSKIT
          </span>
        </a>
        <button
          onClick={toggleTheme}
          className={
            "text-xl dark:bg-gray-100 dark:text-gray-black border border-gray-200 rounded-full p-2 dark:border-gray-200 hover:bg-gray-200/80 dark:hover:bg-gray-200/80  transition-colors"
          }
          aria-roledescription={"라이트모드와 다크모드 간 전환 버튼"}
          aria-label={"테마 변경버튼"}
        >
          {theme === "light" ? <MdLightMode /> : <MdDarkMode />}
        </button>
      </div>
    </nav>
  );
};

interface SidebarMenuProps {
  path: string | null;
  label: string;
  icon?: IconType;
  isSelected?: boolean;
  onClick?: () => void;
}

const SidebarMenu = ({
  path,
  label,
  icon: Icon,
  isSelected = false,
  onClick,
}: SidebarMenuProps) => {
  const activeClass = isSelected
    ? "bg-green-100 dark:text-gray-black text-white text-semibold-m"
    : "bg-transparent dark:text-white text-gray-black text-medium-l transition-color duration-300 hover:bg-gray-200/30";

  return (
    <li
      className={`${activeClass} flex items-center flex-nowrap text-nowrap px-4 p-2 w-full rounded-lg cursor-pointer`}
      aria-label={label + "(으)로 이동하는 버튼"}
      onClick={onClick}
    >
      {path === null ? (
        <div className={"inline-flex gap-3 items-center w-full"}>
          {Icon && <Icon />}
          <span>{label}</span>
        </div>
      ) : (
        <Link
          className={"inline-flex gap-3 items-center w-full"}
          to={path}
          state={{ from: path ?? "/" }}
        >
          {Icon && <Icon />}
          <span>{label}</span>
        </Link>
      )}
    </li>
  );
};

export default Sidebar;