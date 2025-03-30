// 使用 jsDelivr CDN 加速图片
const CDN_PREFIX = 'https://cdn.jsdelivr.net/gh/likeasunflower/Omen@main';

const yesBtn = document.querySelector(".yes-btn");
const noBtn = document.querySelector(".no-btn");
const omenImg = document.getElementById("omen-img");
const app = document.getElementById("app");

// 常量定义
const MAX_CLICKS_BEFORE_HIDE = 10;
const MAX_YES_BTN_SCALE = 3.5;
const MIN_NO_BTN_SCALE = 0.5;
const SCALE_STEP = 0.1;

// 文字选项库
const noTexts = [
  "不给",
  "真的不给！",
  "想都别想",
  "没门儿",
  "做梦呢？",
  "死心吧",
  "求我也没用",
  "再问就哭给你看",
  "再点我我要消失了",
  "我真的消失了哦",
];

// 字体样式库
const fontStyles = ["normal", "italic", "oblique", "small-caps"];

// 图片库 - 使用 CDN 加速
const imgUrls = [
  `${CDN_PREFIX}/imgs/ku.jpg`,
  `${CDN_PREFIX}/imgs/motou.jpg`,
  // ...其他图片路径
];
// 图片库
const imgUrls = [
  `${CDN_PREFIX}/imgs/ku.jpg`,
  `${CDN_PREFIX}/imgs/motou.jpg`,
  `${CDN_PREFIX}/imgs/mao.jpg`,
  `${CDN_PREFIX}/imgs/za.jpg`,
  `${CDN_PREFIX}/imgs/dance.jpg`,
  `${CDN_PREFIX}/imgs/ku.jpg`,
  `${CDN_PREFIX}/imgs/motou.jpg`,
  `${CDN_PREFIX}/imgs/za.jpg`,
  `${CDN_PREFIX}/imgs/mao.jpg`,
  `${CDN_PREFIX}/imgs/ku.jpg`,
];
function confettiEffect() {
  // 实际调用 confetti 效果
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 }
  });
}
// 状态变量
let clickCount = 0;
let yesBtnScale = 1;
let noBtnScale = 1;

// 防抖函数改进版
function debounce(func, delay) {
  let timer;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, arguments), delay);
  };
}

// 处理"不给"按钮点击
function handleNoBtnClick() {
  // 1. 改变按钮文字
  noBtn.textContent = noTexts[clickCount % noTexts.length];
  
  // 2. 改变字体样式
  noBtn.style.fontStyle = fontStyles[clickCount % fontStyles.length];
  
  // 3. 缩小"不给"按钮
  noBtnScale = Math.max(MIN_NO_BTN_SCALE, noBtnScale - SCALE_STEP);
  noBtn.style.transform = `scale(${noBtnScale})`;
  
  // 4. 放大"给你"按钮
  yesBtnScale = Math.min(MAX_YES_BTN_SCALE, yesBtnScale + SCALE_STEP);
  yesBtn.style.transform = `scale(${yesBtnScale})`;
  
  // 5. 更换图片
  omenImg.src = imgUrls[clickCount % imgUrls.length];
  
  // 6. 增加计数
  clickCount++;
  
  // 7. 达到阈值后隐藏按钮
  if (clickCount >= MAX_CLICKS_BEFORE_HIDE) {
    noBtn.style.display = "none";
    // 可以添加消失动画
    noBtn.style.transition = "opacity 0.5s";
    noBtn.style.opacity = "0";
    setTimeout(() => noBtn.style.display = "none", 500);
  }
}

// 处理"给你"按钮点击
function handleYesBtnClick() {
  // 使用最后一张图片作为感谢图
  omenImg.src = imgUrls[imgUrls.length - 1];
  
  // 改变按钮文本和样式
  yesBtn.textContent = "谢谢老板！";
  yesBtn.style.backgroundColor = "#4CAF50";
  yesBtn.style.color = "white";
  
  // 隐藏"不给"按钮
  noBtn.style.display = "none";
  
  // 可以添加一些庆祝效果
  app.style.backgroundColor = "#f0f8ff";
  confettiEffect();
}

// 添加简单的庆祝效果
function confettiEffect() {
  // 这里可以添加实际的confetti库调用
  console.log("显示庆祝效果!");
  // 实际项目中可以使用confetti.js等库
}

// 事件监听（使用改进后的防抖）
noBtn.addEventListener("click", debounce(handleNoBtnClick, 200));
yesBtn.addEventListener("click", handleYesBtnClick);
