// MemE主题双态控制中心 (修改版 - 彻底去除系统Auto模式)

const enableDarkMode = {{ if .Site.Params.enableDarkMode }}true{{ else }}false{{ end }};
const overrideSystemPreferences = {{ if .Site.Params.overrideSystemPreferences }}true{{ else }}false{{ end }};
const defaultTheme = '{{ .Site.Params.defaultTheme | default "light" }}';

function shouldOverrideSystemPreferences() {
    return enableDarkMode && overrideSystemPreferences;
}

function isThemeSwitchingAllowed() {
    return !shouldOverrideSystemPreferences();
}

// 1. 初始化逻辑：如果本地没有缓存，默认给 light（浅色）或者主题指定的默认色
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

// 3. 核心修改：将三态循环（light → dark → system）缩减为真正的双态循环（light ↔ dark）
function cycleTheme() {
    if (!isThemeSwitchingAllowed()) return;
    
    const currentPreference = getUserPreference();
    // 浅色变深色，深色变浅色，干净利落
    const newPreference = currentPreference === 'light' ? 'dark' : 'light';
    
    localStorage.setItem('theme', newPreference);
    applyThemeFromPreference(newPreference);
}

// 4. 控制图标显示
function updateThemeIcons(preference) {
    // 隐藏所有图标
    const icons = document.querySelectorAll('.theme-icon-light, .theme-icon-dark, .theme-icon-system');
    icons.forEach(icon => icon.style.display = 'none');
    
    // 如果存在系统电脑图标（.theme-icon-system），永远将它隐藏
    const systemIcon = document.querySelector('.theme-icon-system');
    if (systemIcon) systemIcon.style.display = 'none';

    // 核心切换：如果是浅色模式，按钮应该显示“月亮”暗示可以切换到夜间；反之显示“太阳”
    if (preference === 'dark') {
        const lightIcon = document.querySelector('.theme-icon-light'); // 太阳图标
        if (lightIcon) lightIcon.style.display = 'inline-block';
    } else {
        const darkIcon = document.querySelector('.theme-icon-dark');   // 月亮图标
        if (darkIcon) darkIcon.style.display = 'inline-block';
    }
}

function changeModeMeta(theme) {
    document.documentElement.setAttribute('data-theme', theme);
}

function changeMode() {
    const isDark = getCurrentTheme() === 'dark';

    const themeColor = isDark ? '{{ .Site.Params.themeColorDark }}' : '{{ .Site.Params.themeColor }}';
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) metaThemeColor.setAttribute('content', themeColor);

    {{ if and .Site.Params.enableUtterances (eq hugo.Environment "production") }}
        if (isDark) {
            changeUtterancesTheme('{{ .Site.Params.utterancesThemeDark | default "photon-dark" }}');
        } else {
            changeUtterancesTheme('{{ .Site.Params.utterancesTheme | default "github-light" }}');
        }
        function changeUtterancesTheme(theme) {
            const iframe = document.querySelector('.utterances-frame');
            if (iframe !== null) {
                iframe.contentWindow.postMessage({ type: 'set-theme', theme: theme }, 'https://utteranc.es');
            }
        }
    {{ end }}

    {{ if and .Site.Params.enableGiscus (eq hugo.Environment "production") }}
        if (isDark) {
            changeGiscusTheme('{{ .Site.Params.giscusThemeDark | default "dark" }}');
        } else {
            changeGiscusTheme('{{ .Site.Params.giscusTheme | default "light" }}');
        }
        function changeGiscusTheme(theme) {
            const iframe = document.querySelector('iframe.giscus-frame');
            if (iframe !== null) {
                iframe.contentWindow.postMessage({ giscus: { setConfig: { theme: theme } } }, 'https://giscus.app');
            }
        }
    {{ end }}

    if (typeof mermaidConfig !== 'undefined') {
        const mermaids = document.querySelectorAll('.mermaid');
        mermaids.forEach(e => {
            if (e.getAttribute('data-processed')) {
                e.removeAttribute('data-processed');
                e.innerHTML = e.getAttribute('data-graph');
            } else {
                e.setAttribute('data-graph', e.textContent);
            }
        });

        if (isDark) {
            mermaidConfig.theme = '{{ .Site.Params.mermaidThemeDark | default "dark" }}';
        } else {
            mermaidConfig.theme = '{{ .Site.Params.mermaidTheme | default "default" }}';
        }
        mermaid.initialize(mermaidConfig);
        mermaid.init();
    }
}