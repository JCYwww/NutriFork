document.addEventListener('DOMContentLoaded', function () {
    let cart = [];

    const cartIcon = document.querySelector('.cart-icon');
    const cartPanel = document.querySelector('.cart-panel');
    const closeCartBtn = document.querySelector('.close-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartCount = document.querySelector('.cart-count');
    const cartTotal = document.querySelector('.cart-total');
    const checkoutBtn = document.querySelector('.checkout-btn');
    const checkoutModal = document.getElementById('checkoutModal');
    const closeModalBtn = document.querySelector('.close-modal');
    const confirmOrderBtn = document.querySelector('.confirm-order-btn');

    // 清除所有現有的加入購物車按鈕
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => btn.remove());

    // 為每個餐點添加加入購物車按鈕
    const mealItems = document.querySelectorAll('.meal-container .meal-item');
    mealItems.forEach(item => {
        const addToCartBtn = document.createElement('button');
        addToCartBtn.className = 'add-to-cart-btn';
        addToCartBtn.textContent = '加入購物車';

        const mealTitle = item.querySelector('.meal-title').textContent;
        const mealPrice = parseInt(item.querySelector('.meal-price').textContent);
        const mealImage = item.querySelector('.meal-img-container img').src;

        addToCartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            addToCart(mealTitle, mealPrice, mealImage);
        });

        const priceElement = item.querySelector('.meal-price');
        priceElement.parentNode.insertBefore(addToCartBtn, priceElement);

    });

    // 加入購物車功能
    function addToCart(name, price, image) {
        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                name: name,
                price: price,
                quantity: 1,
                image: image
            });
        }

        updateCart();
        showCartPanel();

        // 顯示成功加入購物車的提醒
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = '已成功加入購物車！';
        document.body.appendChild(notification);

        // 1秒後自動移除提醒
        setTimeout(() => {
            notification.remove();
        }, 1000);
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCart();
    }

    function updateCart() {
        // 更新購物車數量
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;

        // 更新購物車項目
        cartItemsContainer.innerHTML = '';
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <div class="cart-item-info">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <span>${item.name}</span>
                </div>
                <div class="item-controls">
                    <button class="decrease-btn">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase-btn">+</button>
                </div>
                <span>$${item.price * item.quantity}</span>
                <button class="remove-btn">×</button>
            `;

            // 增加數量
            itemElement.querySelector('.increase-btn').addEventListener('click', () => {
                item.quantity += 1;
                updateCart();
            });

            // 減少數量
            itemElement.querySelector('.decrease-btn').addEventListener('click', () => {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    cart = cart.filter(cartItem => cartItem.name !== item.name);
                }
                updateCart();
            });

            // 移除項目
            itemElement.querySelector('.remove-btn').addEventListener('click', () => {
                cart = cart.filter(cartItem => cartItem.name !== item.name);
                updateCart();
            });

            cartItemsContainer.appendChild(itemElement);
        });

        // 更新總金額
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `總計: $${total}`;
    }

    // 購物車面板控制
    function showCartPanel() {
        cartPanel.style.display = 'block';
    }

    function hideCartPanel() {
        cartPanel.style.display = 'none';
    }

    // 顯示結帳視窗
    function showCheckoutModal() {
        const orderItems = document.querySelector('.order-items');
        orderItems.innerHTML = '';

        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'order-item';
            itemElement.innerHTML = `
                <div class="order-item-info">
                    <img src="${item.image}" alt="${item.name}" class="order-item-image">
                    <div class="order-item-details">
                        <span class="order-item-name">${item.name}</span>
                        <div class="order-item-controls">
                            <button class="decrease-btn">-</button>
                            <span class="order-item-quantity">${item.quantity}</span>
                            <button class="increase-btn">+</button>
                        </div>
                    </div>
                </div>
                <span class="order-item-price">$${item.price * item.quantity}</span>
            `;

            // 增加數量
            itemElement.querySelector('.increase-btn').addEventListener('click', () => {
                item.quantity += 1;
                updateOrderItems();
            });

            // 減少數量
            itemElement.querySelector('.decrease-btn').addEventListener('click', () => {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    cart = cart.filter(cartItem => cartItem.name !== item.name);
                }
                updateOrderItems();
            });

            orderItems.appendChild(itemElement);
        });

        updateOrderSummary();
        checkoutModal.style.display = 'block';
    }

    // 更新訂單項目
    function updateOrderItems() {
        const orderItems = document.querySelector('.order-items');
        orderItems.innerHTML = '';

        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'order-item';
            itemElement.innerHTML = `
                <div class="order-item-info">
                    <img src="${item.image}" alt="${item.name}" class="order-item-image">
                    <div class="order-item-details">
                        <span class="order-item-name">${item.name}</span>
                        <div class="order-item-controls">
                            <button class="decrease-btn">-</button>
                            <span class="order-item-quantity">${item.quantity}</span>
                            <button class="increase-btn">+</button>
                        </div>
                    </div>
                </div>
                <span class="order-item-price">$${item.price * item.quantity}</span>
            `;

            // 增加數量
            itemElement.querySelector('.increase-btn').addEventListener('click', () => {
                item.quantity += 1;
                updateOrderItems();
            });

            // 減少數量
            itemElement.querySelector('.decrease-btn').addEventListener('click', () => {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    cart = cart.filter(cartItem => cartItem.name !== item.name);
                }
                updateOrderItems();
            });

            orderItems.appendChild(itemElement);
        });

        updateOrderSummary();
        updateCart(); // 同時更新購物車顯示
    }

    // 更新訂單摘要
    function updateOrderSummary() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal > 0 ? 30 : 0;
        const total = subtotal + shipping;

        document.getElementById('totalItems').textContent = totalItems;
        document.getElementById('subtotal').textContent = `$${subtotal}`;
        document.getElementById('shipping').textContent = `$${shipping}`;
        document.getElementById('totalAmount').textContent = `$${total}`;
    }

    // 隱藏結帳視窗
    function hideCheckoutModal() {
        checkoutModal.style.display = 'none';
    }

    // 確認訂單
    function confirmOrder() {
        // 檢查購物車是否為空
        if (cart.length === 0) {
            alert('購物車是空的！');
            return;
        }

        // 顯示訂單確認訊息
        const orderDetails = cart.map(item =>
            `${item.name} x ${item.quantity} = $${item.price * item.quantity}`
        ).join('\n');

        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 30;

        const confirmMessage = `訂單明細：\n\n${orderDetails}\n\n運費：$30\n總計：$${total}\n\n確認要送出訂單嗎？`;

        if (confirm(confirmMessage)) {
            alert('訂單已確認！感謝您的購買！\n我們會盡快為您準備餐點。');
            cart = [];
            updateCart();
            hideCheckoutModal();
            hideCartPanel();
        }
    }

    cartIcon.addEventListener('click', showCartPanel);
    closeCartBtn.addEventListener('click', hideCartPanel);
    checkoutBtn.addEventListener('click', showCheckoutModal);
    closeModalBtn.addEventListener('click', hideCheckoutModal);
    confirmOrderBtn.addEventListener('click', confirmOrder);

    // 點擊購物車外部時關閉購物車面板
    document.addEventListener('click', (e) => {
        // 如果點擊的是購物車面板內部元素（包括按鈕），不關閉面板
        if (cartPanel.contains(e.target) || cartIcon.contains(e.target) ||
            e.target.classList.contains('increase-btn') ||
            e.target.classList.contains('decrease-btn') ||
            e.target.classList.contains('remove-btn')) {
            return;
        }
        hideCartPanel();
    });

    // 為購物車按鈕添加事件阻止冒泡
    document.querySelectorAll('.increase-btn, .decrease-btn, .remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });
});

window.onload = function () {
    document.querySelector('.tomato').classList.add('active');
    setTimeout(() => {
        document.querySelector('.corner').classList.add('active');
    }, 300);
    setTimeout(() => {
        document.querySelector('.correct').classList.add('active');
    }, 600);
};

// Tooltip 顯示與隱藏
const fruits = document.querySelectorAll('.fruit');
const tooltip = document.getElementById('tooltip');

fruits.forEach(fruit => {
    fruit.addEventListener('mouseenter', (e) => {
        tooltip.textContent = fruit.dataset.info;
        tooltip.style.display = 'block';
    });

    fruit.addEventListener('mousemove', (e) => {
        const iscorrect = fruit.classList.contains('correct');

        if (iscorrect) {
            tooltip.style.left = e.pageX - tooltip.offsetWidth - 15 + 'px'; // 顯示在左邊
        } else {
            tooltip.style.left = e.pageX + 70 + 'px'; // 顯示在右邊
        }
        tooltip.style.top = e.pageY + 20 + 'px';
    });

    fruit.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
    });
});