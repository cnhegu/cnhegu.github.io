// MemE主题双态控制中心 (修改版 - 彻底去除系统Auto模式，并采用状态指示器图标逻辑)

const enableDarkMode = {{ if .Site.Params.enableDarkMode }}true{{ else }}false{{ end }};
const overrideSystemPreferences = {{ if .Site.Params.overrideSystemPreferences }}true{{ else }}false{{ end }};
const defaultTheme = '{{ .Site.Params.defaultTheme | default "light" }}';

function shouldOverrideSystemPreferences() {
    return enableDarkMode && overrideSystemPreferences;
}

function isThemeSwitchingAllowed() {
    return !shouldOverrideSystemPreferences();
}

// 1. 初始化逻辑，如果本地没有缓存，默认给 light（浅色）或者主题指定的默认色
let userPreference;
if (shouldOverrideSystemPreferences()) {
    userPreference = defaultTheme;
} else {
    // 强制把没有缓存或者缓存为 system 的情况校正为 light 或 dark
    let stored = localStorage.getItem('theme');
    if (stored === 'system' || !stored) {
        stored = defaultTheme;
    }
    userPreference = stored;
}
applyThemeFromPreference(userPreference);

// 2. 彻底移除对系统明暗改变的监听（因为我们不需要跟随系统了）
// 保持空方法或移除

window.addEventListener("DOMContentLoaded", () => {
    changeMode();
    updateThemeIcons(getUserPreference());

    const themeSwitcher = document.getElementById('theme-switcher');
    if (themeSwitcher) {
        themeSwitcher.addEventListener('click', (e) => {
            e.preventDefault();
            if (isThemeSwitchingAllowed()) {
                cycleTheme();
                changeMode();
            }
        });
    }
}, {once: true});

window.addEventListener('storage', function (event) {
    if (event.key !== 'theme') return;
    if (isThemeSwitchingAllowed()) {
        applyThemeFromPreference(event.newValue || 'light');
        changeMode();
    }
});

// 核心控制函数

function getUserPreference() {
    if (shouldOverrideSystemPreferences()) {
        return defaultTheme;
    }
    let stored = localStorage.getItem('theme');
    return (stored === 'system' || !stored) ? 'light' : stored;
}

function getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
}

function applyThemeFromPreference(preference) {
    let actualTheme = shouldOverrideSystemPreferences() ? defaultTheme : preference;
    
    // 降级保护
    if (actualTheme === 'system') actualTheme = 'light';

    changeModeMeta(actualTheme);
    updateThemeIcons(preference);
}

// 3. 核心修改：将三态