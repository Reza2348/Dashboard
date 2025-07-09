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
    return Object.entries(languages).filter(([_, lang]) =>
      lang.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
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

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.header
          key={currentLang}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className={`w-full bg-white shadow-sm px-4 py-2 flex items-center justify-between`}
          dir={isRTL ? "rtl" : "ltr"}
        >
          <h1
            className={`text-lg sm:text-xl font-bold text-gray-900 whitespace-nowrap ${
              isRTL ? "text-right" : "text-left"
            }`}
          >
            {t("dashboard")}
          </h1>

          <div
            className={`flex-1 mx-4 max-w-xl hidden md:flex ${
              isRTL ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <div className="relative w-full">
              <FiSearch
                className={`absolute top-2.5 ${
                  isRTL ? "right-3" : "left-3"
                } text-gray-400 w-5 h-5`}
              />
              <input
                type="text"
                placeholder={t("searchPlaceholder")}
                className={`w-full px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isRTL ? "pr-10 pl-4" : "pl-10 pr-4"
                }`}
              />
            </div>
          </div>

          <button
            ref={searchButtonRef}
            className="md:hidden text-gray-700"
            onClick={() => setIsSearchModalOpen(true)}
            aria-label={t("openSearch")}
          >
            <FiSearch className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Language Dropdown */}
            <div
              className="relative"
              ref={dropdownRef}
              onKeyDown={onLangKeyDown}
            >
              <button
                ref={langButtonRef}
                onClick={() => setIsLangOpen((prev) => !prev)}
                className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-700 hover:underline"
                aria-haspopup="listbox"
                aria-expanded={isLangOpen}
              >
                {isRTL && (
                  <FiChevronDown className="w-3 sm:w-4 h-3 sm:h-4 text-gray-500 rotate-180" />
                )}
                <img
                  src={languages[currentLang]?.flag || languages.en.flag}
                  alt={languages[currentLang]?.label || "English"}
                  className="w-4 sm:w-5 h-4 sm:h-5 rounded-full border"
                />
                <span className="hidden sm:inline">
                  {languages[currentLang]?.label || "Eng (US)"}
                </span>
                {!isRTL && (
                  <FiChevronDown className="w-3 sm:w-4 h-3 sm:h-4 text-gray-500" />
                )}
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className={`absolute mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-xl z-50 ${
                      isRTL ? "left-0" : "right-0"
                    }`}
                    role="listbox"
                  >
                    <div className="p-2">
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder={t("searchPlaceholder")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                        aria-label={t("filterLanguages")}
                      />
                    </div>
                    <ul className="max-h-60 overflow-auto" tabIndex={-1}>
                      {filteredLanguages.length > 0 ? (
                        filteredLanguages.map(([key, lang], index) => (
                          <li
                            key={key}
                            ref={(el) => (optionsRef.current[index] = el)}
                            className={
                              focusedIndex === index ? "bg-blue-100" : ""
                            }
                            role="option"
                            aria-selected={key === currentLang}
                          >
                            <button
                              onClick={() => changeLanguage(key)}
                              className={`flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-800 transition-colors duration-200 rounded-md 
                                hover:bg-blue-100 
                                ${
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
                                className="w-5 h-5 rounded-full border"
                              />
                              <span>{lang.label}</span>
                            </button>
                          </li>
                        ))
                      ) : (
                        <li className="px-3 py-2 text-sm text-gray-500">
                          {t("noLanguagesFound")}
                        </li>
                      )}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative">
              <AiOutlineBell className="w-5 sm:w-6 h-5 sm:h-6 text-gray-600" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
            </div>

            <div
              className={`flex items-center gap-1 sm:gap-2 ${
                isRTL ? "flex-row-reverse text-right" : "text-left"
              }`}
            >
              <img
                src={Img}
                alt="Profile"
                className="w-6 sm:w-8 h-6 sm:h-8 rounded-full"
              />
              <div className="hidden sm:flex flex-col text-sm min-w-[80px]">
                <span className="font-medium text-gray-900 truncate">
                  {t("userName")}
                </span>
                <span className="text-gray-500 truncate">{t("admin")}</span>
              </div>
              <FiChevronDown
                className={`w-3 sm:w-4 h-3 sm:h-4 text-gray-500 hidden sm:block ${
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
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-lg w-full max-w-md p-4 shadow-lg"
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-gray-900">
                  {t("search")}
                </h2>
                <button
                  onClick={() => setIsSearchModalOpen(false)}
                  className="text-gray-700 hover:text-gray-900"
                  aria-label={t("closeSearch")}
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>
              <input
                type="text"
                ref={searchInputRef}
                placeholder={t("searchPlaceholder")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
