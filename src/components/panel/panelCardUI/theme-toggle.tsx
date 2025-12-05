import React from "react";
import { usePanel } from "@/hooks/use-panel";
import { colorMap } from "@/data/color-settings";
import cn from "classnames";
import {useTheme} from "next-themes";

const ThemeToggle: React.FC = () => {
    const { theme, setTheme } = useTheme();
    const { selectedColor,setThemeZustand } = usePanel();
    
    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        setThemeZustand(newTheme); //  Sync to Zustand
    };
    
    return (
        <div>
            <h3 className="text-base font-medium mb-4">Theme Mode</h3>
            <div className="flex items-center text-15px">
                <span className="me-2">Light</span>
                <button
                    onClick={toggleTheme}
                    className={cn(
                        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                        theme === "dark" ? colorMap[selectedColor].bg : "bg-gray-200"
                    )}
                >
                  <span
                      className={cn(
                          "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                          theme === "dark"
                              ? "ltr:translate-x-6 rtl:-translate-x-6"
                              : "ltr:translate-x-1 rtl:-translate-x-1"
                      )}
                  />
                </button>
                <span className="ms-2">Dark</span>
            </div>
        </div>
    );
};

export default ThemeToggle;