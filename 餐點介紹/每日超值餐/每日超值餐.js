const foods = document.querySelectorAll('.food');

document.addEventListener("DOMContentLoaded", () => {
  const rocket = document.querySelector(".rocket");
  const foods = document.querySelectorAll(".food");

  // 啟動火箭動畫
  setTimeout(() => {
    rocket.style.transform = "translate(100vw, 0vh) rotate(45deg)";
  }, 500);

  // 掉落食物
  setTimeout(() => {
    foods.forEach((food, index) => {
      setTimeout(() => {
        food.style.opacity = 1;
        food.style.transform = "translateY(0)";
      }, index * 300); // 每個食物間隔掉落
    });
  }, 1200);
});

foods.forEach(food => {
  food.addEventListener('mouseenter', () => {
    // 顯示該食物的 info
    const info = food.querySelector('.info');
    info.style.opacity = 1;

    // 讓其他食物暗下來，這個食物高亮
    foods.forEach(f => {
      if (f !== food) {
        f.classList.add('dim');
        f.classList.remove('highlight');
      } else {
        f.classList.add('highlight');
        f.classList.remove('dim');
      }
    });
  });

  food.addEventListener('mouseleave', () => {
    // 隱藏 info
    const info = food.querySelector('.info');
    info.style.opacity = 0;

    // 恢復所有食物
    foods.forEach(f => {
      f.classList.remove('dim');
      f.classList.remove('highlight');
    });
  });
});
//     // 購物車功能
//     let cart = [];
//     let cartTotal = 0;

//     // 購物車面板元素
//     const cartPanel = document.querySelector('.cart-panel');
//     const cartItems = document.querySelector('.cart-items');
//     const cartCount = document.querySelector('.cart-count');
//     const cartTotalElement = document.querySelector('.cart-total');
//     const floatingCart = document.querySelector('.floating-cart');
//     const closeCartBtn = document.querySelector('.close-cart');

//     // 切換購物車面板
//     floatingCart.addEventListener('click', (e) => {
//         // 如果點擊的是購物車圖示本身（不包括面板）
//         if (e.target.closest('.floating-cart') && !e.target.closest('.cart-panel')) {
//             cartPanel.classList.toggle('active');
//         }
//     });

//     // 防止點擊購物車面板時關閉面板
//     cartPanel.addEventListener('click', (e) => {
//         e.stopPropagation();
//     });

//     // 關閉購物車面板
//     closeCartBtn.addEventListener('click', () => {
//         cartPanel.classList.remove('active');
//     });

//     // 添加商品到購物車
//     function addToCart(product) {
//         console.log('當前購物車:', cart); // 調試用
//         const existingItem = cart.find(item => item.name === product.name);
        
//         if (existingItem) {
//             existingItem.quantity += 1;
//             console.log('更新現有商品數量:', existingItem); // 調試用
//         } else {
//             cart.push({
//                 name: product.name,
//                 price: product.price,
//                 quantity: 1,
//                 image: product.image
//             });
//             console.log('添加新商品到購物車'); // 調試用
//         }
        
//         updateCart();
//     }

//     // 更新購物車顯示
//     function updateCart() {
//         // 更新購物車數量
//         const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
//         cartCount.textContent = totalItems;
        
//         // 更新購物車項目
//         cartItems.innerHTML = cart.map(item => `
//             <div class="cart-item">
//                 <img src="${item.image}" alt="${item.name}">
//                 <div class="cart-item-info">
//                     <h4 class="cart-item-title">${item.name}</h4>
//                     <div class="cart-item-price">$${item.price} × ${item.quantity} = $${item.price * item.quantity}</div>
//                 </div>
//                 <div class="cart-item-quantity">
//                     <button class="quantity-btn" onclick="updateQuantity('${item.name}', -1)">-</button>
//                     <span class="item-quantity">${item.quantity}</span>
//                     <button class="quantity-btn" onclick="updateQuantity('${item.name}', 1)">+</button>
//                 </div>
//             </div>
//         `).join('');
        
//         // 更新總計
//         cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//         cartTotalElement.textContent = `總計: $${cartTotal}`;
//     }

//     // 更新商品數量
//     window.updateQuantity = function(productName, change) {
//         const item = cart.find(item => item.name === productName);
//         if (item) {
//             item.quantity += change;
//             if (item.quantity <= 0) {
//                 cart = cart.filter(item => item.name !== productName);
//             }
//             updateCart();
//         }
//     }

//     // 購買函數
//     window.buy = function(productName) {
//         // 找到對應的商品元素
//         const productElement = document.querySelector(`.product[data-product-name="${productName}"]`);
//         if (!productElement) {
//             console.error('找不到商品元素:', productName);
//             return;
//         }

//         // 獲取商品圖片
//         const productImage = productElement.querySelector('img').src;
        
//         // 設置商品價格（這裡可以根據不同商品設置不同價格）
//         let price = 100;
//         switch(productName) {
//             case '香蕉':
//                 price = 50;
//                 break;
//             case '紫米飯':
//                 price = 80;
//                 break;
//             case '鮭魚':
//                 price = 200;
//                 break;
//             case '盤子':
//                 price = 150;
//                 break;
//             case '太陽蛋':
//                 price = 30;
//                 break;
//             case '南瓜':
//                 price = 60;
//                 break;
//         }

//         const product = {
//             name: productName,
//             price: price,
//             quantity: 1,
//             image: productImage
//         };

//         console.log('添加商品到購物車:', product); // 調試用
//         addToCart(product);
//         cartPanel.classList.add('active');
//     }

//     // 結帳功能
//     const checkoutModal = document.getElementById('checkoutModal');
//     const closeModalBtn = document.querySelector('.close-modal');
//     const confirmOrderBtn = document.querySelector('.confirm-order-btn');
//     const orderItems = document.querySelector('.order-items');
//     const totalItemsElement = document.getElementById('totalItems');
//     const subtotalElement = document.getElementById('subtotal');
//     const shippingElement = document.getElementById('shipping');
//     const totalAmountElement = document.getElementById('totalAmount');

//     // 結帳按鈕點擊事件
//     document.querySelector('.checkout-btn').addEventListener('click', () => {
//         if (cart.length === 0) {
//             alert('購物車是空的！');
//             return;
//         }
//         showCheckoutSummary();
//     });

//     // 關閉結帳視窗
//     closeModalBtn.addEventListener('click', () => {
//         checkoutModal.classList.remove('active');
//     });

//     // 點擊視窗外部關閉
//     checkoutModal.addEventListener('click', (e) => {
//         if (e.target === checkoutModal) {
//             checkoutModal.classList.remove('active');
//         }
//     });

//     // 確認訂單
//     confirmOrderBtn.addEventListener('click', () => {
//         alert('訂單已確認！感謝您的購買！');
//         cart = [];
//         updateCart();
//         checkoutModal.classList.remove('active');
//         cartPanel.classList.remove('active');
//     });

//     // 顯示結帳總結
//     function showCheckoutSummary() {
//         // 更新訂單項目
//         orderItems.innerHTML = cart.map(item => `
//             <div class="order-item">
//                 <img src="${item.image}" alt="${item.name}">
//                 <div class="order-item-info">
//                     <h4 class="order-item-title">${item.name}</h4>
//                     <div class="order-item-details">
//                         數量: ${item.quantity} × $${item.price} = $${item.price * item.quantity}
//                     </div>
//                 </div>
//             </div>
//         `).join('');

//         // 計算總數和金額
//         const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
//         const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//         const shipping = subtotal > 500 ? 0 : 60; // 滿500免運費
//         const totalAmount = subtotal + shipping;

//         // 更新總結資訊
//         totalItemsElement.textContent = totalItems;
//         subtotalElement.textContent = `$${subtotal}`;
//         shippingElement.textContent = `$${shipping}`;
//         totalAmountElement.textContent = `$${totalAmount}`;

     