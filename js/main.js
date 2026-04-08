// ========== 存储KEY ==========
const STORAGE = {
    anime: 'spring_anime',
    painting: 'spring_painting',
    photo: 'spring_photo',
    craft: 'spring_craft',
    daily: 'spring_daily',
    share: 'spring_share',
    messages: 'spring_messages'
};

// 初始化默认数据
function initLocalStorage() {
    if (!localStorage.getItem(STORAGE.anime)) {
        localStorage.setItem(STORAGE.anime, JSON.stringify([
            { id: 'a1', name: '间谍过家家', type: '治愈', score: 9.2, cover: 'https://picsum.photos/id/104/280/180', comment: '安妮亚可爱！' },
            { id: 'a2', name: '咒术回战', type: '热血', score: 9.0, cover: 'https://picsum.photos/id/106/280/180', comment: '打斗超赞' }
        ]));
    }
    if (!localStorage.getItem(STORAGE.painting)) {
        localStorage.setItem(STORAGE.painting, JSON.stringify([
            { id: 'p1', name: '春日樱花', tool: '水彩', date: '2025-03-20', img: 'https://picsum.photos/id/96/280/220', desc: '粉色浪漫' }
        ]));
    }
    if (!localStorage.getItem(STORAGE.photo)) {
        localStorage.setItem(STORAGE.photo, JSON.stringify([
            { id: 'ph1', img: 'https://picsum.photos/id/15/300/280', date: '2025-04-01', note: '公园散步' },
            { id: 'ph2', img: 'https://picsum.photos/id/29/300/200', date: '2025-03-28', note: '春日阳光' }
        ]));
    }
    if (!localStorage.getItem(STORAGE.craft)) {
        localStorage.setItem(STORAGE.craft, JSON.stringify([
            { id: 'c1', name: '纸花束', materials: '彩纸,胶水', date: '2025-03-10', img: 'https://picsum.photos/id/127/280/180', thoughts: '很有成就感' }
        ]));
    }
    if (!localStorage.getItem(STORAGE.daily)) {
        localStorage.setItem(STORAGE.daily, JSON.stringify([
            { id: 'd1', date: '2025-04-05', title: '春日野餐', content: '和朋友们在公园野餐，微风和煦，非常惬意。' },
            { id: 'd2', date: '2025-03-30', title: '看展日记', content: '参观了印象派画展，收获满满。' }
        ]));
    }
    if (!localStorage.getItem(STORAGE.share)) {
        localStorage.setItem(STORAGE.share, JSON.stringify([
            { id: 's1', title: '春日摄影技巧', date: '2025-04-02', img: 'https://picsum.photos/id/20/220/300', content: '分享几个拍花小技巧，利用逆光...' },
        ]));
    }
    if (!localStorage.getItem(STORAGE.messages)) {
        localStorage.setItem(STORAGE.messages, JSON.stringify([
            { id: 'm1', nickname: '小春日', email: 'spring@xx.com', content: '主页好美呀！', time: new Date().toLocaleString() }
        ]));
    }
}

// 工具函数
function showToast(msg) {
    let toast = document.getElementById('globalToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'globalToast';
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.innerText = msg;
    toast.style.opacity = '1';
    setTimeout(() => toast.style.opacity = '0', 2000);
}

function openModal(modalId) { document.getElementById(modalId).style.display = 'flex'; }
function closeModal(modalId) { document.getElementById(modalId).style.display = 'none'; }
function escapeHtml(str) { if(!str) return ''; return str.replace(/[&<>]/g, function(m){if(m==='&') return '&amp;'; if(m==='<') return '&lt;'; if(m==='>') return '&gt;'; return m;}); }

// 导航高亮（根据当前页面路径）
function highlightNav() {
    const path = window.location.pathname;
    const page = path.split('/').pop().split('.')[0];
    const map = {
        'index': 'home', 'interest': 'interests', 'daily': 'daily',
        'share': 'share', 'message': 'guestbook', 'about': 'about',
        'anime': 'interests', 'draw': 'interests', 'photo': 'interests', 'handmade': 'interests'
    };
    let activeKey = map[page] || 'home';
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-nav') === activeKey) link.classList.add('active');
    });
}

// 导航栏滚动效果
function initNavbarScroll() {
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('navbar');
        if (window.scrollY > 20) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
    });
}

// 移动端菜单
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove('open');
            }
        });
    }
}

// 花瓣效果 (仅PC)
let petalInterval = null;
function startPetalEffect() {
    if (window.innerWidth <= 768) return;
    if (petalInterval) clearInterval(petalInterval);
    petalInterval = setInterval(() => {
        let petal = document.createElement('div');
        petal.className = 'petal';
        petal.innerHTML = Math.random() > 0.5 ? '🌸' : '🌼';
        petal.style.left = Math.random() * 100 + '%';
        petal.style.fontSize = (Math.random() * 8 + 6) + 'px';
        petal.style.animationDuration = (Math.random() * 8 + 6) + 's';
        document.body.appendChild(petal);
        setTimeout(() => petal.remove(), 10000);
    }, 3000);
}

// 页面加载完成后初始化公共组件
document.addEventListener('DOMContentLoaded', () => {
    initLocalStorage();
    initNavbarScroll();
    initMobileMenu();
    highlightNav();
    startPetalEffect();
});