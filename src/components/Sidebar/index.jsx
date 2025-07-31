import React, { useState, useEffect } from "react";
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
import clsx from "clsx";

const Sidebar = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "fa" || i18n.language === "ar";

  const [windowWidth, setWindowWidth] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [activeItem, setActiveItem] = useState("dashboard");

  const menuItems = [
    { id: "dashboard", icon: <FaTachometerAlt />, label: t("dashboard") },
    { id: "leaderboard", icon: <FaChartBar />, label: t("leaderboard") },
    { id: "order", icon: <FaShoppingCart />, label: t("order") },
    { id: "products", icon: <FaClipboardList />, label: t("products") },
    { id: "salesReport", icon: <FaChartLine />, label: t("salesReport") },
    { id: "messages", icon: <FaEnvelope />, label: t("messages") },
    { id: "settings", icon: <FaCog />, label: t("settings") },
    { id: "signOut", icon: <FaSignOutAlt />, label: t("signOut") },
  ];

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth !== null) {
      setIsOpen(windowWidth >= 768);
    }
  }, [windowWidth]);

  useEffect(() => {
    if (windowWidth && windowWidth < 768 && isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {};
  }, [isOpen, windowWidth]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen && windowWidth < 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, windowWidth]);

  const handleMenuItemClick = (id) => {
    setActiveItem(id);
    if (windowWidth < 768) setIsOpen(false);
  };

  if (windowWidth === null) return null;

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
      {windowWidth < 768 && (
        <div className={`p-4 ${isRTL ? "text-right" : "text-left"}`}>
          <button
            className="text-indigo-600 text-2xl"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={isOpen}
            aria-controls="sidebar"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      )}

      {/* بک‌دراپ موبایل با شفافیت کمتر */}
      {isOpen && windowWidth < 768 && (
        <div onClick={() => setIsOpen(false)} aria-hidden="true" />
      )}

      <aside
        id="sidebar"
        role="navigation"
        aria-label={t("sidebarNavigation")}
        className={clsx(
          "fixed top-0 h-full bg-white shadow-lg p-4 z-50 flex flex-col transition-transform duration-300",
          {
            "relative w-64 translate-x-0": windowWidth >= 768,
            "fixed top-0 w-[80vw] max-w-xs": windowWidth < 768,
            "left-0": windowWidth < 768 && !isRTL,
            "right-0": windowWidth < 768 && isRTL,
            "translate-x-0": windowWidth < 768 && isOpen,
            "-translate-x-full": windowWidth < 768 && !isOpen && !isRTL,
            "translate-x-full": windowWidth < 768 && !isOpen && isRTL,
            "pointer-events-none": windowWidth < 768 && !isOpen,
          }
        )}
      >
        {windowWidth < 768 && (
          <div
            className={`md:hidden flex mb-4 ${
              isRTL ? "justify-start" : "justify-end"
            }`}
          >
            <button
              className="text-gray-600 text-2xl"
              onClick={() => setIsOpen(false)}
              aria-label={t("closeMenu")}
            >
              <FaTimes />
            </button>
          </div>
        )}

        <div className="flex items-center mb-10">
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

        <nav
          role="menu"
          className={clsx("flex flex-col gap-2", {
            "overflow-y-auto max-h-[calc(100vh-280px)]": windowWidth < 768,
          })}
        >
          {menuItems.map((item) => (
            <button
              key={item.id}
              role="menuitem"
              onClick={() => handleMenuItemClick(item.id)}
              aria-current={activeItem === item.id ? "page" : undefined}
              className={clsx(
                "flex items-center gap-3 p-3 rounded-xl text-sm font-medium transition",
                {
                  "bg-indigo-500 text-white": activeItem === item.id,
                  "text-gray-700 hover:bg-gray-100": activeItem !== item.id,
                }
              )}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>

        <div className="flex-1" />

        <div className="bg-indigo-500 p-4 rounded-xl text-white text-center mt-6">
          <div className="flex justify-center mb-2">
            <FaStar size={24} />
          </div>
          <h2 className="font-bold mb-1">{t("dabangPro")}</h2>
          <p className="text-sm mb-3">{t("getAccess")}</p>
          <a
            href=""
            className="bg-white text-indigo-500 font-semibold py-1 px-4 rounded-xl text-sm transition-transform hover:scale-105 hover:shadow-lg hover:bg-indigo-100"
          >
            {t("getPro")}
          </a>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
