import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { darkMode, lightMode } from '@libellum-ds/react'
import { useCookies } from 'react-cookie'

type ThemeName = 'light' | 'dark'
type Theme = typeof darkMode
type ThemeCookie = {theme: ThemeName}
type ThemeContextType = {
    theme: Theme,
    themeName: string,
    toggleTheme: () => void
}
type ThemeProviderProps = PropsWithChildren

const ThemeContext = createContext<ThemeContextType | null>(null)

const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [themeName, setThemeName] = useState<ThemeName>('light')
    const [cookies, setCookie] = useCookies<'theme', ThemeCookie>()

    const toggleTheme = useCallback(() => {
        setThemeName(state => {
            const newTheme = state === 'light' ? 'dark' : 'light'
            setCookie('theme', newTheme)
            return newTheme
        })
    }, [])

    const theme = useMemo(() => {
        return themeName === 'light' ? lightMode : darkMode
    }, [themeName])

    const providerValues = {
        theme,
        themeName,
        toggleTheme,
    }

    useEffect(() => {
        const body = document.querySelector('body')
        if (body) {
            body.style.backgroundColor = theme.colors['color-background'].value
        }
        setThemeName(cookies.theme || 'light')
    }, [theme])
    
    return (
        <ThemeContext.Provider value={providerValues}>
            <div className={theme}>
                {children}
            </div>
        </ThemeContext.Provider>
    )
}

const useTheme = () => {
    const context = useContext(ThemeContext)

    if (!context) {
        throw new Error('useTheme must be use inside ThemeProvider')
    }
    
    return context
}

export { ThemeProvider, useTheme }