import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../redux/features/button/themeSlice";
import { useEffect } from "react";

const ThemeToggle = () => {
  const theme = useSelector((state) => state.theme.theme); // Get theme from Redux store
  const dispatch = useDispatch();

  // Apply the theme to the root element whenever it changes
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme); // Save theme to localStorage
  }, [theme]);

  return (
    <button
      onClick={() => dispatch(toggleTheme())} // Dispatch toggleTheme action
      className="text-2xl text-white transition rounded-md bg-secondary-500 p-2"
    >
      {theme === "dark" ? (
        <MdOutlineLightMode className="text-white font-bold" />
      ) : (
        <MdOutlineDarkMode className="text-white font-bold" />
      )}
    </button>
  );
};

export default ThemeToggle;
