// 导航滚动效果
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  nav.classList.toggle('scroll', window.scrollY > 50);
});

// 移动端菜单
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('show');
  });
}

// 弹窗控制
function openModal(modalId) {
  document.getElementById(modalId).classList.add('show');
}
function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('show');
}

// 提示框
function showToast(text, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = text;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 100);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

// 表单验证
function validateForm(form) {
  let valid = true;
  const inputs = form.querySelectorAll('[required]');
  inputs.forEach(input => {
    const error = input.nextElementSibling;
    if (!input.value.trim()) {
      error.style.display = 'block';
      valid = false;
    } else {
      error.style.display = 'none';
    }
  });
  return valid;
}

// 花瓣飘落（PC端）
function createPetal() {
  if (window.innerWidth > 768) {
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.style.left = Math.random() * 100 + 'vw';
    petal.style.width = Math.random() * 5 + 5 + 'px';
    petal.style.height = Math.random() * 5 + 5 + 'px';
    petal.style.background = Math.random() > 0.5 ? 'var(--sub2)' : 'var(--sub1)';
    document.body.appendChild(petal);
    setTimeout(() => petal.remove(), 10000);
  }
}
setInterval(createPetal, 3000);

// 本地存储
function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
function getData(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}