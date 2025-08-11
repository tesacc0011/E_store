// بيانات المنتجات
const products = [
    {
        id: 1,
        name: "هاتف ذكي",
        price: 999,
        image: "https://via.placeholder.com/300x200?text=هاتف+ذكي"
    },
    {
        id: 2,
        name: "حاسوب محمول",
        price: 1299,
        image: "https://via.placeholder.com/300x200?text=حاسوب+محمول"
    },
    {
        id: 3,
        name: "سماعات لاسلكية",
        price: 199,
        image: "https://via.placeholder.com/300x200?text=سماعات+لاسلكية"
    },
    {
        id: 4,
        name: "ساعة ذكية",
        price: 299,
        image: "https://via.placeholder.com/300x200?text=ساعة+ذكية"
    },
    {
        id: 5,
        name: "كاميرا رقمية",
        price: 599,
        image: "https://via.placeholder.com/300x200?text=كاميرا+رقمية"
    },
    {
        id: 6,
        name: "لوح رسم رقمي",
        price: 349,
        image: "https://via.placeholder.com/300x200?text=لوح+رسم+رقمي"
    }
];

// عربة التسوق
let cart = [];

// عرض المنتجات
function displayProducts() {
    const productGrid = document.querySelector('.product-grid');
    productGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">$${product.price}</p>
                <button class="add-to-cart" data-id="${product.id}">أضف إلى السلة</button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });

    // إضافة حدث النقر إلى أزرار "أضف إلى السلة"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// إضافة منتج إلى السلة
function addToCart(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    
    // تأثير عند النقر
    e.target.textContent = 'تمت الإضافة!';
    e.target.style.backgroundColor = '#4CAF50';
    
    setTimeout(() => {
        e.target.textContent = 'أضف إلى السلة';
        e.target.style.backgroundColor = 'var(--secondary-color)';
    }, 1000);
    
    // إضافة المنتج إلى السلة
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartCount();
}

// تحديث عدد العناصر في السلة
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // تأثير عند التحديث
    cartCount.style.transform = 'scale(1.2)';
    setTimeout(() => {
        cartCount.style.transform = 'scale(1)';
    }, 300);
}

// تأثيرات تفاعلية للأزرار
function setupButtonEffects() {
    const buttons = document.querySelectorAll('.btn, .add-to-cart, nav ul li a, .social-icons a');
    
    buttons.forEach(button => {
        // تأثير عند المرور
        button.addEventListener('mouseenter', () => {
            button.style.transition = 'all 0.3s ease';
        });
        
        // تأثير عند النقر
        button.addEventListener('mousedown', () => {
            button.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', () => {
            button.style.transform = '';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
    });
}

// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    setupButtonEffects();
    
    // تأثيرات للهيدر عند التمرير
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            header.style.background = 'var(--white-color)';
        }
    });
    
    // تأثيرات للنموذج
    const newsletterForm = document.querySelector('.newsletter form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input');
            emailInput.value = '';
            alert('شكراً على اشتراكك في نشرتنا البريدية!');
        });
    }
});
// عرض/إخفاء نافذة السلة
function toggleCartModal() {
    const cartModal = document.getElementById('cartModal');
    if (cartModal.style.display === 'block') {
        cartModal.style.display = 'none';
    } else {
        cartModal.style.display = 'block';
        updateCartModal();
    }
}

// تحديث محتويات نافذة السلة
function updateCartModal() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalAmountElement = document.getElementById('totalAmount');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart">سلة التسوق فارغة</div>';
        totalAmountElement.textContent = '0';
        return;
    }
    
    cartItemsContainer.innerHTML = '';
    let totalAmount = 0;
    
    cart.forEach(item => {
        totalAmount += item.price * item.quantity;
        
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4 class="cart-item-title">${item.name}</h4>
                <p class="cart-item-price">$${item.price}</p>
            </div>
            <div class="cart-item-quantity">
                <button class="decrease-quantity" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button class="increase-quantity" data-id="${item.id}">+</button>
            </div>
            <span class="remove-item" data-id="${item.id}">&times;</span>
        `;
        cartItemsContainer.appendChild(cartItemElement);
    });
    
    totalAmountElement.textContent = totalAmount.toFixed(2);
    
    // إضافة أحداث للأزرار الجديدة
    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', decreaseQuantity);
    });
    
    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', increaseQuantity);
    });
    
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', removeItem);
    });
}

// تقليل الكمية
function decreaseQuantity(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (cart[itemIndex].quantity > 1) {
        cart[itemIndex].quantity -= 1;
    } else {
        cart.splice(itemIndex, 1);
    }
    
    updateCartModal();
    updateCartCount();
}

// زيادة الكمية
function increaseQuantity(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const item = cart.find(item => item.id === productId);
    item.quantity += 1;
    
    updateCartModal();
    updateCartCount();
}

// إزالة العنصر
function removeItem(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const itemIndex = cart.findIndex(item => item.id === productId);
    cart.splice(itemIndex, 1);
    
    updateCartModal();
    updateCartCount();
}

// تعديل تهيئة الصفحة لربط أحداث السلة
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    setupButtonEffects();
    
    // ربط حدث النقر على أيقونة السلة
    document.querySelector('.cart-icon').addEventListener('click', toggleCartModal);
    
    // ربط حدث النقر على زر الإغلاق
    document.querySelector('.close-cart').addEventListener('click', () => {
        document.getElementById('cartModal').style.display = 'none';
    });
    
    // إغلاق النافذة عند النقر خارجها
    window.addEventListener('click', (e) => {
        const cartModal = document.getElementById('cartModal');
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });
    
    // تأثيرات للهيدر عند التمرير
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            header.style.background = 'var(--white-color)';
        }
    });
});
// نقل بيانات السلة إلى صفحة الدفع
function goToCheckout() {
    // حفظ السلة في localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    // الانتقال إلى صفحة الدفع
    window.location.href = 'checkout.html';
}

// تعديل تهيئة الصفحة لربط زر إتمام الشراء
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    setupButtonEffects();
    
    // ربط حدث النقر على أيقونة السلة
    document.querySelector('.cart-icon').addEventListener('click', toggleCartModal);
    
    // ربط حدث النقر على زر الإغلاق
    document.querySelector('.close-cart')?.addEventListener('click', () => {
        document.getElementById('cartModal').style.display = 'none';
    });
    
    // ربط حدث النقر على زر إتمام الشراء
    document.querySelector('.checkout-btn')?.addEventListener('click', goToCheckout);
    
    // إغلاق النافذة عند النقر خارجها
    window.addEventListener('click', (e) => {
        const cartModal = document.getElementById('cartModal');
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });
    
    // تأثيرات للهيدر عند التمرير
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            header.style.background = 'var(--white-color)';
        }
    });
});