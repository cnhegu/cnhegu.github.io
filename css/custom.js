document.addEventListener('DOMContentLoaded', function() {
  // 移动菜单展开/收起 (Meme 主题 .nav-toggle)
  const navToggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.menu');
  if (navToggle && menu) {
    navToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      menu.classList.toggle('active');
      navToggle.classList.toggle('open');
      document.body.classList.toggle('menu-open');  // 防滚动
    });
    // 点击外部关闭
    document.addEventListener('click', function(e) {
      if (!menu.contains(e.target) && !navToggle.contains(e.target)) {
        menu.classList.remove('active');
        navToggle.classList.remove('open');
        document.body.classList.remove('menu-open');
      }
    });
  }

  // 明暗模式切换 (.theme-toggle)
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark');
      localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    });
    // 加载本地偏好
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark');
    }
  }
});