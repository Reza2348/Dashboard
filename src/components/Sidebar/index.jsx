import React, { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  FaTachometerAlt,
  FaChartBar,
  FaShoppingCart,
  FaClipboardList,
  FaChartLine,
  FaEnvelope,
  FaCog,
  FaSignOutAlt,
  FaStar,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Sidebar = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "fa" || i18n.language === "ar";

  // مدیریت عرض پنجره برای واکنش‌گرایی
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  // وضعیت باز بودن سایدبار
  const [isOpen, setIsOpen] = useState(windowWidth >= 768);

  // آیتم فعال منو
  const [activeItem, setActiveItem] = useState("dashboard");

  // تعریف آیتم‌های منو با ترجمه پویا
  const menuItems = useMemo(
    () => [
      { id: "dashboard", icon: <FaTachometerAlt />, label: t("dashboard") },
      { id: "leaderboard", icon: <FaChartBar />, label: t("leaderboard") },
      { id: "order", icon: <FaShoppingCart />, label: t("order") },
      { id: "products", icon: <FaClipboardList />, label: t("products") },
      { id: "salesReport", icon: <FaChartLine />, label: t("salesReport") },
      { id: "messages", icon: <FaEnvelope />, label: t("messages") },
      { id: "settings", icon: <FaCog />, label: t("settings") },
      { id: "signOut", icon: <FaSignOutAlt />, label: t("signOut") },
    ],
    [t]
  );

  // بروزرسانی عرض پنجره
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // باز یا بسته کردن سایدبار بر اساس عرض پنجره
  useEffect(() => {
    setIsOpen(windowWidth >= 768);
  }, [windowWidth]);

  // جلوگیری از اسکرول صفحه وقتی سایدبار در موبایل باز است
  useEffect(() => {
    if (isOpen && windowWidth < 768) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, windowWidth]);

  // بستن سایدبار با کلید Escape در موبایل
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen && windowWidth < 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, windowWidth]);

  // تغییر آیتم فعال و بستن سایدبار موبایل بعد کلیک روی آیتم
  const handleMenuItemClick = (id) => {
    setActiveItem(id);
    if (windowWidth < 768) setIsOpen(false);
  };

  return (
    <>
      {/* دکمه باز/بسته کردن منو موبایل */}
      {windowWidth < 768 && (
        <div
          className={`p-4 ${isRTL ? "text-right" : "text-left"}`}
          dir={isRTL ? "rtl" : "ltr"}
        >
          <button
            className="text-indigo-600 text-2xl focus:outline-none"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={isOpen}
            aria-controls="sidebar"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      )}

      {/* بک‌گراند تار وقتی منو باز است در موبایل */}
      {isOpen && windowWidth < 768 && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* سایدبار */}
      <aside
        id="sidebar"
        dir={isRTL ? "rtl" : "ltr"}
        role="navigation"
        aria-label={t("sidebarNavigation")}
        className={`
          fixed top-0 h-full w-64 bg-white shadow-md p-4 z-50 flex flex-col transition-transform duration-300
          ${windowWidth >= 768 ? "translate-x-0 relative" : ""}
          ${windowWidth < 768 && isOpen ? "translate-x-0 fixed" : ""}
          ${windowWidth < 768 && !isOpen && !isRTL ? "-translate-x-full" : ""}
          ${windowWidth < 768 && !isOpen && isRTL ? "translate-x-full" : ""}
          ${isRTL ? "right-0" : "left-0"}
        `}
      >
        {/* دکمه بستن منو در موبایل */}
        {isOpen && windowWidth < 768 && (
          <div
            className={`md:hidden flex mb-4 ${
              isRTL ? "justify-start" : "justify-end"
            }`}
            dir={isRTL ? "rtl" : "ltr"}
          >
            <button
              className="text-gray-600 text-2xl focus:outline-none"
              onClick={() => setIsOpen(false)}
              aria-label={t("closeMenu")}
            >
              <FaTimes />
            </button>
          </div>
        )}

        {/* لوگو */}
        <div className="flex items-center mb-10" dir={isRTL ? "rtl" : "ltr"}>
          <div className="bg-indigo-500 p-2 rounded-xl text-white">
            <FaStar size={20} />
          </div>
          <h1
            className={`text-xl font-bold text-gray-800 ${
              isRTL ? "mr-3" : "ml-3"
            }`}
          >
            {t("logoText")}
          </h1>
        </div>

        {/* منو */}
        <nav
          className={`flex flex-col gap-2 ${
            windowWidth < 768 ? "overflow-y-auto max-h-[calc(100vh-300px)]" : ""
          }`}
          role="menu"
        >
          {menuItems.map((item) => (
            <button
              key={item.id}
              role="menuitem"
              aria-current={activeItem === item.id ? "page" : undefined}
              onClick={() => handleMenuItemClick(item.id)}
              className={`flex items-center gap-3 p-3 rounded-xl text-sm font-medium transition
                ${
                  activeItem === item.id
                    ? "bg-indigo-500 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }
              `}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>

        {/* فضای خالی برای پر کردن فضای بین منو و بخش پرو */}
        <div className="flex-1"></div>

        {/* بخش پرو */}
        <div className="bg-indigo-500 p-4 rounded-xl text-white text-center mt-6">
          <div className="flex justify-center mb-2">
            <FaStar size={24} />
          </div>
          <h2 className="font-bold mb-1">{t("dabangPro")}</h2>
          <p className="text-sm mb-3">{t("getAccess")}</p>
          <button className="bg-white text-indigo-500 font-semibold py-1 px-4 rounded-xl text-sm transition-transform hover:scale-105 hover:shadow-lg cursor-pointer hover:bg-indigo-100">
            {t("getPro")}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
