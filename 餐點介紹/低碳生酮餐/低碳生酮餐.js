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

    // 讓其他食物，這個食物亮
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