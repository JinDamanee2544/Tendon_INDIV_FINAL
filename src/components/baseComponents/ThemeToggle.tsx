import { useTheme } from "next-themes"

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();

    return (
        <input
            type="checkbox"
            className="toggle mr-8"
            onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
            checked={theme === 'dark'}
        />
    )
}

export default ThemeToggle