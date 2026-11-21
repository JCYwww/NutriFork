document.addEventListener('DOMContentLoaded', function() {
    // 為所有商品卡片添加點擊事件
    const productCards = document.querySelectorAll('.product');
    productCards.forEach(card => {
        card.addEventListener('click', function() {
            const cardElement = this.querySelector('.card');
            if (cardElement) {
                cardElement.classList.toggle('flipped');
            }
        });
    });

    // 輪播圖功能
    const imageUrls = [
        "LINE_ALBUM_菜單_250416_5.jpg",
        "LINE_ALBUM_菜單_250416_6.jpg",
        "LINE_ALBUM_菜單_250416_4.jpg"
    ];
    
    let currentIndex = Math.floor(Math.random() * imageUrls.length);
    
    const imageElement = document.getElementById('slide-image');
    const dotsContainer = document.getElementById('dots-container');
    const counter = document.getElementById('counter');
    
    function createDots() {
        dotsContainer.innerHTML = "";
        for (let i = 0; i < imageUrls.length; i++) {
            const dot = document.createElement("span");
            dot.classList.add("dot");
            if (i === currentIndex) dot.classList.add("active");
            dot.addEventListener('click', () => {
                showImage(i);
            });
            dotsContainer.appendChild(dot);
        }
    }
    
    function showImage(index) {
        currentIndex = index;
        imageElement.src = imageUrls[index];
        createDots();
        counter.textContent = `${index + 1}/${imageUrls.length}`;
    }
    
    document.querySelector('.next').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % imageUrls.length;
        showImage(currentIndex);
    });
    
    document.querySelector('.prev').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + imageUrls.length) % imageUrls.length;
        showImage(currentIndex);
    });
    
    showImage(currentIndex);
});