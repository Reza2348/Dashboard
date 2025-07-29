import React, { useEffect, useState, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineBell } from "react-icons/ai";
import { FiChevronDown, FiSearch, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Img from "../../assets/img/Rectangle 1393.png";

const languages = {
  en: { label: "Eng (US)", flag: "https://flagcdn.com/us.svg" },
  fa: { label: "فارسی", flag: "https://flagcdn.com/ir.svg" },
};

export default function Header() {
  const { t, i18n, ready } = useTranslation();

  if (!ready) return null;

  const currentLang =
    i18n.language && languages[i18n.language]
      ? i18n.language
      : i18n.resolvedLanguage && languages[i18n.resolvedLanguage]
      ? i18n.resolvedLanguage
      : "en";

  const isRTL = currentLang === "fa";

  const [isLangOpen, setIsLangOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [ariaLiveMessage, setAriaLiveMessage] = useState("");
  const [notificationCount, setNotificationCount] = useState(3); // مثال تعداد اعلان

  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const langButtonRef = useRef(null);
  const searchButtonRef = useRef(null);
  const optionsRef = useRef([]);

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  }, [isRTL]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        isLangOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsLangOpen(false);
        setSearchTerm("");
        langButtonRef.current?.focus();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isLangOpen]);

  useEffect(() => {
    if (isSearchModalOpen) {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
      document.body.style.overflow = "hidden";
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = "unset";
      searchButtonRef.current?.focus();
    }
  }, [isSearchModalOpen]);

  useEffect(() => {
    function handleEscape(e) {
      if (e.key === "Escape" && isSearchModalOpen) {
        setIsSearchModalOpen(false);
        searchButtonRef.current?.focus();
      }
      if (e.key === "Escape" && isLangOpen) {
        setIsLangOpen(false);
        langButtonRef.current?.focus();
      }
    }
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isSearchModalOpen, isLangOpen]);

  const changeLanguage = async (lang) => {
    if (lang !== currentLang && languages[lang]) {
      try {
        await i18n.changeLanguage(lang);
        setIsLangOpen(false);
        setSearchTerm("");
        setFocusedIndex(-1);
        langButtonRef.current?.focus();
      } catch (error) {
        console.error("Language change error:", error);
        alert(t("languageChangeError") || "Failed to change language.");
      }
    }
  };

  const filteredLanguages = useMemo(() => {
    const filtered = Object.entries(languages).filter(([_, lang]) =>
      lang.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    optionsRef.current = [];
    return filtered;
  }, [searchTerm]);

  useEffect(() => {
    if (focusedIndex >= 0 && optionsRef.current[focusedIndex]) {
      optionsRef.current[focusedIndex].scrollIntoView({ block: "nearest" });
    }
  }, [focusedIndex]);

  const onLangKeyDown = (e) => {
    if (!isLangOpen) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((prev) =>
        prev + 1 < filteredLanguages.length ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((prev) =>
        prev - 1 >= 0 ? prev - 1 : filteredLanguages.length - 1
      );
    } else if (e.key === "Escape") {
      e.preventDefault();
      setIsLangOpen(false);
      langButtonRef.current?.focus();
    } else if (e.key === "Enter" && focusedIndex >= 0) {
      e.preventDefault();
      const selectedLang = filteredLanguages[focusedIndex][0];
      changeLanguage(selectedLang);
    }
  };

  useEffect(() => {
    if (isLangOpen && filteredLanguages.length > 0) {
      setFocusedIndex(0);
    } else {
      setFocusedIndex(-1);
      setSearchTerm("");
    }
  }, [isLangOpen, filteredLanguages.length]);

  useEffect(() => {
    if (isLangOpen) {
      if (filteredLanguages.length === 0) {
        setAriaLiveMessage(t("noLanguagesFound"));
      } else {
        setAriaLiveMessage(
          t("languagesFoundMessage", {
            count: filteredLanguages.length,
          }) || `${filteredLanguages.length} languages found`
        );
      }
    } else {
      setAriaLiveMessage("");
    }
  }, [filteredLanguages.length, isLangOpen, t]);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.header
          key={currentLang}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className={`w-full bg-white shadow-md px-6 py-3 flex items-center justify-between`}
          dir={isRTL ? "rtl" : "ltr"}
        >
          <h1
            className={`text-xl sm:text-2xl font-extrabold text-gray-900 whitespace-nowrap select-none ${
              isRTL ? "text-right" : "text-left"
            }`}
          >
            {t("dashboard")}
          </h1>

          {/* Search Input for md+ */}
          <div
            className={`flex-1 mx-6 max-w-xl hidden md:flex ${
              isRTL ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <div className="relative w-full">
              <FiSearch
                className={`absolute top-3.5 ${
                  isRTL ? "right-4" : "left-4"
                } text-gray-400 w-6 h-6`}
                aria-hidden="true"
              />
              <input
                type="search"
                placeholder={t("searchPlaceholder")}
                aria-label={t("searchPlaceholder")}
                className={`w-full px-5 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow ${
                  isRTL ? "pr-12 pl-5" : "pl-12 pr-5"
                }`}
              />
            </div>
          </div>

          {/* Search Button for mobile */}
          <button
            ref={searchButtonRef}
            className="md:hidden text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-2"
            onClick={() => setIsSearchModalOpen(true)}
            aria-label={t("openSearch")}
          >
            <FiSearch className="w-7 h-7" />
          </button>

          <div className="flex items-center gap-5 sm:gap-6">
            {/* Language Dropdown */}
            <div
              className="relative"
              ref={dropdownRef}
              onKeyDown={onLangKeyDown}
            >
              <button
                ref={langButtonRef}
                onClick={() => setIsLangOpen((prev) => !prev)}
                className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-gray-700 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-2 py-1 select-none"
                aria-haspopup="listbox"
                aria-expanded={isLangOpen}
                aria-controls="language-listbox"
                aria-label={t("changeLanguage")}
              >
                {isRTL && (
                  <FiChevronDown className="w-4 h-4 text-gray-500 rotate-180" />
                )}
                <img
                  src={languages[currentLang]?.flag || languages.en.flag}
                  alt={languages[currentLang]?.label || "English"}
                  className="w-5 h-5 rounded-full border border-gray-300"
                />
                <span className="hidden sm:inline truncate max-w-[90px]">
                  {languages[currentLang]?.label || "Eng (US)"}
                </span>
                {!isRTL && <FiChevronDown className="w-4 h-4 text-gray-500" />}
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -12 }}
                    transition={{ duration: 0.15 }}
                    className={`absolute mt-2 w-60 bg-white border border-gray-200 rounded-lg shadow-lg z-50 ${
                      isRTL ? "left-0" : "right-0"
                    }`}
                    role="listbox"
                    id="language-listbox"
                    tabIndex={-1}
                  >
                    <div className="p-2">
                      <input
                        type="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder={t("searchPlaceholder")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                        aria-label={t("filterLanguages")}
                      />
                    </div>
                    <ul className="max-h-64 overflow-auto" tabIndex={-1}>
                      {filteredLanguages.length > 0 ? (
                        filteredLanguages.map(([key, lang], index) => (
                          <li
                            key={key}
                            ref={(el) => (optionsRef.current[index] = el)}
                            className={`cursor-pointer ${
                              focusedIndex === index
                                ? "bg-blue-100"
                                : "hover:bg-blue-50"
                            }`}
                            role="option"
                            aria-selected={key === currentLang}
                          >
                            <button
                              onClick={() => changeLanguage(key)}
                              className={`flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-800 transition-colors duration-200 rounded-md focus:outline-none ${
                                key === currentLang && focusedIndex !== index
                                  ? "bg-blue-50 font-semibold"
                                  : ""
                              }`}
                              type="button"
                              tabIndex={-1}
                            >
                              <img
                                src={lang.flag}
                                alt={lang.label}
                                className="w-5 h-5 rounded-full border border-gray-300"
                              />
                              <span className="truncate">{lang.label}</span>
                            </button>
                          </li>
                        ))
                      ) : (
                        <li className="px-3 py-2 text-sm text-gray-500 select-none">
                          {t("noLanguagesFound")}
                        </li>
                      )}
                    </ul>
                    <div
                      aria-live="polite"
                      aria-atomic="true"
                      className="sr-only"
                      role="status"
                    >
                      {ariaLiveMessage}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Notification */}
            <div className="relative">
              <AiOutlineBell
                className="w-6 h-6 text-gray-600"
                aria-label={t("notifications")}
                role="img"
              />
              {notificationCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 min-w-[18px] h-4 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center px-1.5 select-none"
                  aria-live="polite"
                >
                  {notificationCount > 9 ? "9+" : notificationCount}
                </span>
              )}
            </div>

            {/* User Profile */}
            <div
              className={`flex items-center gap-2 sm:gap-3 cursor-pointer select-none ${
                isRTL ? "flex-row-reverse text-right" : "text-left"
              }`}
              tabIndex={0}
              role="button"
              aria-label={t("userMenu")}
            >
              <img
                src={Img}
                alt={t("profilePictureAlt") || "Profile"}
                className="w-8 h-8 rounded-full border border-gray-300"
              />
              <div className="hidden sm:flex flex-col text-sm min-w-[90px] overflow-hidden">
                <span className="font-semibold text-gray-900 truncate">
                  {t("userName")}
                </span>
                <span className="text-gray-500 truncate">{t("admin")}</span>
              </div>
              <FiChevronDown
                className={`w-4 h-4 text-gray-500 hidden sm:block ${
                  isRTL ? "rotate-180" : ""
                }`}
              />
            </div>
          </div>
        </motion.header>
      </AnimatePresence>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            dir={isRTL ? "rtl" : "ltr"}
            aria-modal="true"
            role="dialog"
            aria-labelledby="search-modal-title"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-lg w-full max-w-md p-6 shadow-lg relative"
            >
              <h2
                id="search-modal-title"
                className="text-lg font-semibold mb-4 text-gray-900"
              >
                {t("search")}
              </h2>
              <div className="relative">
                <FiSearch
                  className={`absolute top-3.5 ${
                    isRTL ? "right-4" : "left-4"
                  } text-gray-400 w-6 h-6`}
                  aria-hidden="true"
                />
                <input
                  ref={searchInputRef}
                  type="search"
                  placeholder={t("searchPlaceholder")}
                  aria-label={t("searchPlaceholder")}
                  className={`w-full px-5 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow ${
                    isRTL ? "pr-12 pl-5" : "pl-12 pr-5"
                  }`}
                  autoFocus
                />
                <button
                  aria-label={t("closeSearch")}
                  onClick={() => setIsSearchModalOpen(false)}
                  className="absolute top-3.5 right-4 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1"
                  type="button"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
