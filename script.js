// Tailwind Config
tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                utama: '#8b5cf6',
                sekunder: '#3b82f6',
                gelap: '#000000',
                kartuGelap: '#1a1a1a',
                hijau: '#10b981',
                ungu: '#8b5cf6',
                kuning: '#f59e0b',
                cyan: '#06b6d4',
                pink: '#ec4899',
                merah: '#ef4444'
            },
            fontFamily: {
                'inter': ['Inter', 'sans-serif'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 3s ease-in-out infinite',
                'slide-up': 'slideUp 0.5s ease-out',
                'fade-in': 'fadeIn 0.6s ease-out',
                'bounce-slow': 'bounce 2s infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'spin-slow': 'spin 3s linear infinite',
                'wave': 'wave 1.5s ease-in-out infinite',
                'shimmer': 'shimmer 2s infinite',
                'blob': 'blob 7s infinite',
            },
            boxShadow: {
                'neumorphism': '20px 20px 60px #0d1522, -20px -20px 60px #111b32',
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                'card-hover': '0 20px 40px -15px rgba(139, 92, 246, 0.5)',
                'glow-purple': '0 0 20px rgba(139, 92, 246, 0.7)',
                'glow-blue': '0 0 20px rgba(59, 130, 246, 0.7)',
                'glow-pink': '0 0 20px rgba(236, 72, 153, 0.7)',
                'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.7)',
                'inner-glow': 'inset 0 0 20px rgba(139, 92, 246, 0.2)'
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            }
        }
    }
};

// Global Variables
let cart = JSON.parse(localStorage.getItem('kyz_store_cart')) || [];
let selectedService = null;
let selectedStorage = null;
let selectedChatGPT = null;
let selectedAlightMotion = null;
let selectedCapCut = null;

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading animation
    simulateLoading();
    
    // Initialize particles
    createParticles();
    
    // Initialize storage options
    initStorageOptions();
    
    // Initialize service options
    initServiceOptions();
    
    // Initialize app options (new products)
    initAppOptions();
    
    // Initialize ripple effect for buttons
    initRippleEffect();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize tooltips
    initTooltips();
    
    // Update cart display
    updateCartDisplay();
    
    // Hide loading screen after 1.5 seconds
    setTimeout(() => {
        document.getElementById('loading').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loading').style.display = 'none';
            showToast('Welcome to Kyz Store!', 'success');
        }, 500);
    }, 1500);
});

// Loading Simulation
function simulateLoading() {
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
        }
        document.getElementById('loading-bar').style.width = progress + '%';
    }, 100);
}

// Particles Background
function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 3 + 1;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        const opacity = Math.random() * 0.3 + 0.1;
        
        // Apply styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.opacity = opacity;
        particle.style.background = `rgba(${Math.random() > 0.5 ? '139, 92, 246' : '59, 130, 246'}, ${opacity})`;
        
        container.appendChild(particle);
    }
}

// Navigation Functions
function showMainMenu() {
    hideAllContent();
    document.getElementById('main-menu').classList.remove('hidden');
    showToast('Returned to main menu', 'info');
}

function showHostingMenu() {
    hideAllContent();
    document.getElementById('hosting-content').classList.remove('hidden');
    showToast('Hosting menu loaded', 'info');
}

function showAppMenu() {
    hideAllContent();
    document.getElementById('app-content').classList.remove('hidden');
    showToast('App menu loaded', 'info');
}

function showSuntikMenu() {
    hideAllContent();
    document.getElementById('suntik-content').classList.remove('hidden');
    showToast('Suntik menu loaded', 'info');
}

function hideAllContent() {
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('hosting-content').classList.add('hidden');
    document.getElementById('app-content').classList.add('hidden');
    document.getElementById('suntik-content').classList.add('hidden');
}

// Storage Options
function initStorageOptions() {
    const storageOptions = [
        { size: '1GB', price: 1000 },
        { size: '2GB', price: 1000 },
        { size: '3GB', price: 2000 },
        { size: '4GB', price: 2500 },
        { size: '5GB', price: 3000 },
        { size: '6GB', price: 3500 },
        { size: '7GB', price: 4000 },
        { size: '8GB', price: 4500 },
        { size: '9GB', price: 5000 },
        { size: '10GB', price: 6000 },
        { size: '15GB', price: 7000 },
        { size: '20GB', price: 8000 },
        { size: 'UNLI', price: 9000, highlight: true }
    ];
    
    const container = document.getElementById('storage-options');
    container.innerHTML = '';
    
    storageOptions.forEach(option => {
        const optionEl = document.createElement('button');
        optionEl.className = 'storage-option p-4 rounded-2xl bg-black/50 border border-utama/20 text-center hover:border-utama hover:bg-utama/10 transition-all';
        if (option.highlight) {
            optionEl.classList.add('col-span-3', 'bg-gradient-to-r', 'from-utama/20', 'to-pink/20', 'border-utama');
        }
        
        optionEl.innerHTML = `
            <p class="text-sm font-bold text-white mb-1">${option.size}</p>
            <p class="text-utama font-black text-lg">Rp ${option.price.toLocaleString()}</p>
            ${option.highlight ? '<span class="text-xs text-pink font-bold">MOST POPULAR</span>' : ''}
        `;
        
        optionEl.onclick = () => selectStorage(option);
        container.appendChild(optionEl);
    });
}

function selectStorage(option) {
    selectedStorage = option;
    document.querySelectorAll('#storage-options button').forEach(btn => {
        btn.classList.remove('product-selected');
    });
    event.target.classList.add('product-selected');
    showToast(`Selected ${option.size} storage`, 'success');
}

// App Options (New Products)
function initAppOptions() {
    // ChatGPT Options
    const chatgptOptions = [
        { duration: '1 Minggu Sharing', price: 10000 },
        { duration: '1 Bulan Sharing', price: 20000 }
    ];
    
    const chatgptContainer = document.getElementById('chatgpt-options');
    chatgptContainer.innerHTML = '';
    
    chatgptOptions.forEach(option => {
        const optionEl = document.createElement('div');
        optionEl.className = 'chatgpt-option';
        optionEl.innerHTML = `
            <div class="p-4 rounded-2xl bg-black/50 border border-cyan/20 text-center hover:border-cyan hover:bg-cyan/10 transition-all cursor-pointer">
                <p class="text-sm font-bold text-white mb-1">${option.duration}</p>
                <p class="text-cyan font-black text-lg">Rp ${option.price.toLocaleString()}</p>
            </div>
        `;
        
        optionEl.onclick = () => {
            document.querySelectorAll('.chatgpt-option > div').forEach(div => {
                div.classList.remove('border-cyan', 'bg-cyan/10');
                div.classList.add('border-cyan/20');
            });
            optionEl.querySelector('div').classList.add('border-cyan', 'bg-cyan/10');
            selectedChatGPT = option;
        };
        
        chatgptContainer.appendChild(optionEl);
    });
    
    // Alight Motion Options
    const alightOptions = [
        { platform: 'Android', price: 10000, color: 'hijau' },
        { platform: 'iOS', price: 10000, color: 'blue-500' }
    ];
    
    const alightContainer = document.getElementById('alight-options');
    alightContainer.innerHTML = '';
    
    alightOptions.forEach(option => {
        const optionEl = document.createElement('div');
        optionEl.className = 'alight-option';
        optionEl.innerHTML = `
            <div class="p-4 rounded-2xl bg-black/50 border border-${option.color}/20 text-center hover:border-${option.color} hover:bg-${option.color}/10 transition-all cursor-pointer">
                <p class="text-sm font-bold text-white mb-1"><i class="fab fa-${option.platform.toLowerCase()} mr-2"></i>${option.platform}</p>
                <p class="text-${option.color} font-black text-lg">Rp ${option.price.toLocaleString()}</p>
                <p class="text-xs text-slate-400 mt-1">1 Tahun</p>
            </div>
        `;
        
        optionEl.onclick = () => {
            document.querySelectorAll('.alight-option > div').forEach(div => {
                div.classList.remove('border-hijau', 'border-blue-500', 'bg-hijau/10', 'bg-blue-500/10');
                div.classList.add('border-hijau/20', 'border-blue-500/20');
            });
            optionEl.querySelector('div').classList.add(`border-${option.color}`, `bg-${option.color}/10`);
            selectedAlightMotion = option;
        };
        
        alightContainer.appendChild(optionEl);
    });
    
    // CapCut Options
    const capcutOptions = [
        { package: '7 Hari Sharing', price: 5000, color: 'cyan' },
        { package: '7 Hari Private', price: 7000, color: 'cyan' },
        { package: '1 Bulan Sharing', price: 15000, color: 'utama' },
        { package: '1 Bulan Private', price: 20000, color: 'utama' }
    ];
    
    const capcutContainer = document.getElementById('capcut-options');
    capcutContainer.innerHTML = '';
    
    capcutOptions.forEach(option => {
        const optionEl = document.createElement('div');
        optionEl.className = 'capcut-option';
        optionEl.innerHTML = `
            <div class="p-4 rounded-2xl bg-black/50 border border-${option.color}/20 text-center hover:border-${option.color} hover:bg-${option.color}/10 transition-all cursor-pointer">
                <p class="text-sm font-bold text-white mb-1">${option.package}</p>
                <p class="text-${option.color} font-black text-lg">Rp ${option.price.toLocaleString()}</p>
            </div>
        `;
        
        optionEl.onclick = () => {
            document.querySelectorAll('.capcut-option > div').forEach(div => {
                div.classList.remove('border-cyan', 'border-utama', 'bg-cyan/10', 'bg-utama/10');
                div.classList.add('border-cyan/20', 'border-utama/20');
            });
            optionEl.querySelector('div').classList.add(`border-${option.color}`, `bg-${option.color}/10`);
            selectedCapCut = option;
        };
        
        capcutContainer.appendChild(optionEl);
    });
}

// Service Options
function initServiceOptions() {
    document.querySelectorAll('.service-option').forEach(option => {
        option.onclick = function() {
            // Remove previous selection
            document.querySelectorAll('.service-option').forEach(opt => {
                opt.classList.remove('product-selected');
            });
            
            // Add selection to clicked option
            this.classList.add('product-selected');
            
            // Get service data
            const service = this.dataset.service;
            const amount = this.dataset.amount;
            const price = parseInt(this.dataset.price);
            
            // Update form
            document.getElementById('service-name').value = `${service} ${amount}`;
            document.getElementById('service-amount').value = amount;
            
            // Update summary
            updateOrderSummary(service, amount, price);
            
            selectedService = { service, amount, price };
        };
    });
}

function updateOrderSummary(service, amount, price) {
    document.getElementById('summary-service').textContent = service;
    document.getElementById('summary-amount').textContent = `${parseInt(amount).toLocaleString()} items`;
    document.getElementById('summary-price').textContent = `Rp ${price.toLocaleString()}`;
    document.getElementById('summary-total').textContent = `Rp ${price.toLocaleString()}`;
}

// Service Tabs
function showServiceTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.service-tab').forEach(tab => {
        tab.classList.remove('active', 'bg-gradient-to-r', 'from-pink', 'to-utama', 'text-white');
        tab.classList.add('bg-black/50', 'text-slate-400');
    });
    
    document.getElementById(`tab-${tabName}`).classList.add('active', 'bg-gradient-to-r', 'from-pink', 'to-utama', 'text-white');
    document.getElementById(`tab-${tabName}`).classList.remove('bg-black/50', 'text-slate-400');
    
    // Show corresponding content
    document.querySelectorAll('.service-content').forEach(content => {
        content.classList.add('hidden');
    });
    document.getElementById(`service-${tabName}`).classList.remove('hidden');
    
    showToast(`${tabName.charAt(0).toUpperCase() + tabName.slice(1)} services loaded`, 'info');
}

// Cart Functions
function addToCart(name, price, variant = '') {
    const item = {
        id: Date.now(),
        name,
        price,
        variant,
        quantity: 1
    };
    
    cart.push(item);
    saveCart();
    updateCartDisplay();
    showToast(`${name} added to cart!`, 'success');
    createConfetti();
}

function updateCartDisplay() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    document.getElementById('cart-count').textContent = totalItems;
    document.getElementById('cart-total').textContent = `${totalItems} items`;
    document.getElementById('cart-modal-total').textContent = `Rp ${totalPrice.toLocaleString()}`;
    
    // Update cart items in modal
    const cartItemsContainer = document.getElementById('cart-items');
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="text-center py-10">
                <i class="fas fa-shopping-cart text-4xl text-slate-700 mb-4"></i>
                <p class="text-slate-500">Your cart is empty</p>
            </div>
        `;
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="flex items-center justify-between p-4 bg-black/30 rounded-2xl">
                <div>
                    <p class="font-bold text-white">${item.name}</p>
                    ${item.variant ? `<p class="text-xs text-slate-400">${item.variant}</p>` : ''}
                    <p class="text-utama font-bold">Rp ${item.price.toLocaleString()}</p>
                </div>
                <div class="flex items-center gap-2">
                    <button onclick="updateQuantity(${item.id}, -1)" class="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="px-3 font-bold">${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)" class="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center">
                        <i class="fas fa-plus"></i>
                    </button>
                    <button onclick="removeFromCart(${item.id})" class="w-8 h-8 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center ml-2">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }
}

function updateQuantity(itemId, change) {
    const itemIndex = cart.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
        cart[itemIndex].quantity += change;
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
        saveCart();
        updateCartDisplay();
    }
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCart();
    updateCartDisplay();
    showToast('Item removed from cart', 'info');
}

function saveCart() {
    localStorage.setItem('kyz_store_cart', JSON.stringify(cart));
}

function showCart() {
    document.getElementById('cart-modal').classList.remove('hidden');
    setTimeout(() => {
        document.querySelector('#cart-modal > div').classList.remove('translate-y-full');
    }, 10);
}

function hideCart() {
    document.querySelector('#cart-modal > div').classList.add('translate-y-full');
    setTimeout(() => {
        document.getElementById('cart-modal').classList.add('hidden');
    }, 300);
}

function checkoutCart() {
    if (cart.length === 0) {
        showToast('Your cart is empty!', 'error');
        return;
    }
    
    const message = cart.map(item => 
        `${item.name}${item.variant ? ` (${item.variant})` : ''} x${item.quantity} - Rp ${item.price * item.quantity}`
    ).join('%0A');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const fullMessage = `bg mo beli:%0A%0A${message}%0A%0ATotal: Rp ${total}%0A%`;
    
    window.open(`https://t.me/rkyyzz?text=${fullMessage}`, '_blank');
    showToast('Opening Telegram for checkout...', 'success');
}

// Order Functions
function orderProduct(productName) {
    const telegramUser = "rkyyzz";
    const message = `bg mo beli ${productName}.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://t.me/${telegramUser}?text=${encodedMessage}`, '_blank');
    showToast('Opening Telegram...', 'success');
}

function orderChatGPT() {
    if (!selectedChatGPT) {
        showToast('Please select duration first!', 'error');
        return;
    }
    
    const telegramUser = "rkyyzz";
    const message = `bg mo beli ChatGPT Premium ${selectedChatGPT.duration} (Rp ${selectedChatGPT.price})`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://t.me/${telegramUser}?text=${encodedMessage}`, '_blank');
    showToast('Opening Telegram...', 'success');
}

function orderGemini() {
    const telegramUser = "rkyyzz";
    const message = `bg mo beli Gemini AI Premium - 1 Tahun Private (Rp 30.000)`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://t.me/${telegramUser}?text=${encodedMessage}`, '_blank');
    showToast('Opening Telegram...', 'success');
}

function orderAlightMotion() {
    if (!selectedAlightMotion) {
        showToast('Please select platform first!', 'error');
        return;
    }
    
    const telegramUser = "rkyyzz";
    const message = `bg mo beli Alight Motion Pro untuk ${selectedAlightMotion.platform} - 1 Tahun (Rp ${selectedAlightMotion.price})`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://t.me/${telegramUser}?text=${encodedMessage}`, '_blank');
    showToast('Opening Telegram...', 'success');
}

function orderCapCut() {
    if (!selectedCapCut) {
        showToast('Please select package first!', 'error');
        return;
    }
    
    const telegramUser = "rkyyzz";
    const message = `bg mo beli CapCut Pro ${selectedCapCut.package} (Rp ${selectedCapCut.price})`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://t.me/${telegramUser}?text=${encodedMessage}`, '_blank');
    showToast('Opening Telegram...', 'success');
}

function orderSuntikService() {
    const serviceName = document.getElementById('service-name').value;
    const serviceAmount = document.getElementById('service-amount').value;
    const serviceLink = document.getElementById('service-link').value;
    const serviceNote = document.getElementById('service-note').value;
    
    if (!serviceName || !serviceAmount) {
        showToast('Please fill in service name and amount!', 'error');
        return;
    }
    
    if (!serviceLink) {
        showToast('Please provide the target link!', 'error');
        return;
    }
    
    const telegramUser = "rkyyzz";
    let message = `Halo Kyz Store, saya mau order suntik service:%0A%0A`;
    message += `Layanan: ${serviceName}%0A`;
    message += `Jumlah: ${serviceAmount}%0A`;
    message += `Link: ${serviceLink}%0A`;
    
    if (serviceNote) {
        message += `Keterangan: ${serviceNote}%0A`;
    }
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://t.me/${telegramUser}?text=${encodedMessage}`, '_blank');
    showToast('Opening Telegram...', 'success');
    
    // Reset form
    document.getElementById('service-name').value = '';
    document.getElementById('service-amount').value = '';
    document.getElementById('service-link').value = '';
    document.getElementById('service-note').value = '';
}

// Ripple Effect
function initRippleEffect() {
    document.querySelectorAll('.ripple-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Back to Top
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Tooltips
function initTooltips() {
    // Tooltips are handled by CSS
}

// WhatsApp Modal
function showWhatsapp() {
    document.getElementById('whatsapp-modal').classList.remove('hidden');
}

function hideWhatsapp() {
    document.getElementById('whatsapp-modal').classList.add('hidden');
}

// Show Tutorial
function showTutorial() {
    showToast('Tutorial feature coming soon!', 'info');
}

// Toast Notification
function showToast(message, type = 'info') {
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    
    Toastify({
        text: message,
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: colors[type] || colors.info,
        stopOnFocus: true,
        onClick: function(){}
    }).showToast();
}

// Confetti Effect
function createConfetti() {
    const colors = ['#8b5cf6', '#3b82f6', '#06b6d4', '#ec4899', '#10b981'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Random properties
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 10 + 5;
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 3 + 2;
        
        // Apply styles
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.left = `${left}%`;
        confetti.style.backgroundColor = color;
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        
        // Add to body
        document.body.appendChild(confetti);
        
        // Animate
        const animation = confetti.animate([
            { 
                top: '-10px', 
                opacity: 1,
                transform: 'rotate(0deg)'
            },
            { 
                top: '100vh', 
                opacity: 0,
                transform: `rotate(${Math.random() * 360}deg)`
            }
        ], {
            duration: animationDuration * 1000,
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
        });
        
        // Remove after animation
        animation.onfinish = () => confetti.remove();
    }
}

// Feature Card Hover Effect
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const feature = this.dataset.feature;
        showToast(feature, 'info');
    });
});

// Prevent form submission on Enter key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
        e.preventDefault();
    }
});

// Handle image loading errors
document.querySelectorAll('img').forEach(img => {
    img.onerror = function() {
        this.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%231a1a1a"/><text x="200" y="150" font-family="Arial" font-size="20" fill="%238b5cf6" text-anchor="middle">Image not found</text></svg>';
    };
});
