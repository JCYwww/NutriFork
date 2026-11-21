const item = document.getElementsByClassName("item")[0];
const item1 = document.getElementsByClassName("item1")[0];
const photos = document.getElementsByClassName("photo");
for(let photo of photos){
    photo.addEventListener("click", function () {
  let imageUrl = "";
  if (this.classList.contains("tomato")) {
    imageUrl = "./番茄知識.png";
  } else if (this.classList.contains("pepper")) {
    imageUrl = "./青椒知識.png";
  } else if (this.classList.contains("carrot")) {
    imageUrl = "./胡蘿蔔知識.png";
  }
  item1.style.backgroundImage = `url('${imageUrl}')`;
  item1.style.backgroundSize = "contain";
  item.style.display = "flex";
});

}

// 遊戲
item.addEventListener("click", function () {
        item.style.display = "none";
    });

const questions = [
    { q: "哪一種食物富含優質蛋白質？", options: ["白飯", "雞胸肉", "洋芋片", "糖果"], answer: 1 },
    { q: "以下哪一項屬於高纖維食物？", options: ["全麥吐司", "奶油", "白吐司", "炸雞"], answer: 0 },
    { q: "哪一種脂肪對心臟比較友善？", options: ["反式脂肪", "飽和脂肪", "不飽和脂肪", "奶油"], answer: 2 },
    { q: "每日五蔬果的建議是？", options: ["吃5種水果", "吃5種蔬菜", "吃3蔬2果", "吃2蔬3肉"], answer: 2 },
    { q: "升糖指數低的食物有？", options: ["糙米", "白麵包", "可樂", "蛋糕"], answer: 0 },
    { q: "維生素C豐富的水果是？", options: ["香蕉", "橘子", "蘋果", "鳳梨酥"], answer: 1 },
    { q: "以下哪個不是天然食材？", options: ["番茄", "魚", "罐頭香腸", "南瓜"], answer: 2 },
    { q: "要控制膽固醇，應避免？", options: ["橄欖油", "蛋白", "動物內臟", "豆腐"], answer: 2 },
    { q: "哪種飲食最有助於減重？", options: ["高糖飲食", "均衡飲食＋控制熱量", "純水果飲食", "吃宵夜"], answer: 1 },
    { q: "以下哪項有助於保護眼睛？", options: ["β-胡蘿蔔素", "反式脂肪", "糖", "鹽"], answer: 0 }
  ];

  let currentQ = 0;
  let score = 0;

  function startGame() {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("quiz-container").classList.remove("hidden");
    loadQuestion();
  }

  document.getElementById("restart-btn").addEventListener("click", () => {
  resetGame();
});

document.getElementById("back-btn").addEventListener("click", () => {
  document.getElementById("quiz-container").classList.add("hidden");
  document.getElementById("start-screen").style.display = "block";
});

function resetGame() {
  currentQ = 0;
  score = 0;
  document.getElementById("score").textContent = "目前得分：0";
  document.getElementById("feedback").textContent = "";
  document.getElementById("correct-answer").textContent = "";
  document.getElementById("restart-btn").style.display = "none"; // 若遊戲結束才會顯示
  loadQuestion();
}

  function loadQuestion() {
    if (currentQ >= questions.length) {
      document.getElementById("question").innerText = "🎉 遊戲結束！你的總得分是：" + score + " 分";
      document.getElementById("options").innerHTML = "";
      document.getElementById("restart-btn").style.display = "inline-block";
      document.getElementById("feedback").innerText = "";
      document.getElementById("correct-answer").innerText = "";
      return;
    }

    const q = questions[currentQ];
    document.getElementById("question").innerText = `第 ${currentQ + 1} 題：${q.q}`;
    let optionsHTML = "";
    q.options.forEach((opt, idx) => {
      optionsHTML += `<div class="option" onclick="choose(${idx})">${opt}</div>`;
    });
    document.getElementById("options").innerHTML = optionsHTML;
    document.getElementById("feedback").innerText = "";
    document.getElementById("correct-answer").innerText = "";
  }

  function choose(index) {
    const q = questions[currentQ];
    const isCorrect = index === q.answer;
    document.getElementById("feedback").innerText = isCorrect ? "✅ 答對了！好棒～" : "❌ 答錯了喔，沒關係再接再厲！";
    document.getElementById("correct-answer").innerText = `正確答案是：${q.options[q.answer]}`;
    if (isCorrect) score += 10;

    document.getElementById("score").innerText = "目前得分：" + score;
    currentQ++;
    setTimeout(loadQuestion, 2000);
  }

  function goBack() {
    window.history.back();
  }

  // 食物掉落
  const foodImages = ['4.0.png', '5.0.png', '6.0.png', '7.0.png'];
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const dropCount = 30; // 掉 30 顆

  const foodContainer = document.getElementById("food-container");
  const allFoods = [];

  function createFood() {
    const food = document.createElement('img');
    food.src = foodImages[Math.floor(Math.random() * foodImages.length)];
    food.classList.add('food');

    const randomSizeVW = 10 + Math.random() * 8; // 10vw ~ 18vw
    const randomLeft = Math.random() * screenWidth;
    const randomDuration = 1 + Math.random() * 1.5; // 1 ~ 1.5 秒內掉落

    food.style.width = `${randomSizeVW}vw`;
    food.style.height = `${randomSizeVW}vw`;
    food.style.left = `${randomLeft}px`;
    food.style.top = `-150px`;
    food.style.transition = `top ${randomDuration}s ease-in`;

    foodContainer.appendChild(food);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        food.style.top = `${screenHeight - 100}px`;
      });
    });

    allFoods.push(food);
  }

  function clearFoods() {
    allFoods.forEach(f => {
      f.style.transition = "opacity 0.5s ease";
      f.style.opacity = 0;
    });
    setTimeout(() => {
      allFoods.forEach(f => f.remove());
      allFoods.length = 0;
    }, 800);
  }

  // 開始掉落
  let i = 0;
  const dropInterval = setInterval(() => {
    if (i >= dropCount) {
      clearInterval(dropInterval);
      setTimeout(clearFoods, 2000); // 掉完過 2 秒就消失
    } else {
      createFood();
      i++;
    }
  }, 80); // 每 80 毫秒掉出一顆

  // 按一下畫面就讓掉落的食物消失，並停止繼續生成
  let isFoodClearedByClick = false;
  window.addEventListener("click", () => {
    if (isFoodClearedByClick) return;
    isFoodClearedByClick = true;
    clearInterval(dropInterval);
    clearFoods();
  });

  window.addEventListener('resize', () => location.reload());