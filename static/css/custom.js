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

  // 明暗模式 (通用 + 防消失)
  const themeBtn = document.querySelector('.theme-switcher, .theme-toggle, .adjust, [data-theme-toggle]');
  if (themeBtn) {
    themeBtn.style.opacity = '1';  // 防消失
    themeBtn.innerHTML = '<i class="fas fa-adjust"></i>';  // Font Awesome 图标
    themeBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      document.body.classList.toggle('dark');
      localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
      // 防消失：强制重设 visibility
      setTimeout(() => {
        themeBtn.style.visibility = 'visible';
      }, 100);
    });
    // 加载偏好 (防初始消失)
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.body.classList.add(savedTheme);
  }

  // 搜索框可见
  const search = document.querySelector('.search, .search-icon, .search-box');
  if (search) {
    search.style.display = 'block';
    search.style.visibility = 'visible';
  }
});