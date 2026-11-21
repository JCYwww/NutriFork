const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spinBtn");
const resultDiv = document.getElementById("result");
const speechA = document.getElementById("speechA");
const speechB = document.getElementById("speechB");

const segments = [
  "每日超值餐",
  "素食健康餐",
  "地中海健康餐",
  "低GI控糖餐",
  "低碳生酮餐",
  "高蛋白健康餐"
];

const colors = ["#ffadad", "#ffd6a5", "#fdffb6", "#caffbf", "#a0c4ff", "#bdb2ff"];
const segAngle = 360 / segments.length;
let startAngle = 0;
let isSpinning = false;
let spinAngle = 0;

function drawWheel() {
  for (let i = 0; i < segments.length; i++) {
    const angle = (startAngle + i * segAngle) * Math.PI / 180;
    ctx.beginPath();
    ctx.moveTo(250, 250);
    ctx.fillStyle = colors[i];
    ctx.arc(250, 250, 250, angle, angle + segAngle * Math.PI / 180);
    ctx.fill();
    ctx.save();

    ctx.translate(250, 250);
    ctx.rotate(angle + segAngle * Math.PI / 360);
    ctx.textAlign = "right";
    ctx.fillStyle = "#333";
    ctx.font = "20px 'Segoe UI'";
    ctx.fillText(segments[i], 190, 10);
    ctx.restore();
  }

  // 外圍圓點
  for (let i = 0; i < segments.length; i++) {
    const angle = (startAngle + i * segAngle + segAngle / 2) * Math.PI / 180;
    const x = 250 + Math.cos(angle) * 230;
    const y = 250 + Math.sin(angle) * 230;
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, 2 * Math.PI);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.strokeStyle = "#999";
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.arc(250, 250, 30, 0, 2 * Math.PI);
  ctx.fillStyle = "#fff";
  ctx.fill();
}

drawWheel();

spinBtn.addEventListener("click", () => {
  if (isSpinning) return;

  isSpinning = true;
  resultDiv.textContent = "";
  speechA.textContent = "「讓我們看看轉到什麼！」";
  speechB.textContent = "「轉起來～」";

  let duration = 5000;
  let finalAngle = Math.random() * 360 + 360 * 6;
  let startTime = null;

  function animate(time) {
    if (!startTime) startTime = time;
    let elapsed = time - startTime;
    let progress = elapsed / duration;
    if (progress > 1) progress = 1;

    let easeOut = 1 - Math.pow(1 - progress, 3);
    spinAngle = finalAngle * easeOut;
    startAngle = spinAngle % 360;

    ctx.clearRect(0, 0, 500, 500);
    drawWheel();

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      isSpinning = false;

      let selected = Math.floor(((270 - spinAngle % 360 + 360) % 360) / segAngle) % segments.length;
      const result = segments[selected];
      resultDiv.textContent = "轉到：「" + result + "」！";
      speechA.textContent = "「那就吃 " + result + " 吧！」";
      speechB.textContent = "「好啊～」";
    }
  }

  requestAnimationFrame(animate);
}); 