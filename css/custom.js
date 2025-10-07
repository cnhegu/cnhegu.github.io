document.addEventListener('DOMContentLoaded', function() {
  // 菜单展开 (通用 + 防冲突)
  const toggle = document.querySelector('.hamburger, .menu-toggle, .nav-toggle, [aria-label*="menu"]');
  const menu = document.querySelector('.main-menu, .menu, nav ul');
  if (toggle && menu) {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      menu.classList.toggle('active');
      toggle.classList.toggle('open');
      document.body.classList.toggle('menu-open');
      document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : 'auto';
    });
    // 外部点击关闭
    document.addEventListener('click', function(e) {
      if (!menu.contains(e.target) && !toggle.contains(e.target)) {
        menu.classList.remove('active');
        toggle.classList.remove('open');
        document.body.classList.remove('menu-open');
        document.body.style.overflow = 'auto';
      }
    });
  }

  // 明暗模式 (通用 + fallback)
  const themeBtn = document.querySelector('.theme-switcher, .theme-toggle, .adjust');
  if (themeBtn) {
    themeBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      document.body.classList.toggle('dark');
      localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    });
    // 加载偏好
    if (localStorage.getItem('theme') === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.classList.add('dark');
    }
  }

  // 搜索框可见 (如果隐藏)
  const search = document.querySelector('.search, .search-icon');
  if (search) {
    search.style.display = 'block';
    search.style.visibility = 'visible';
  }
});