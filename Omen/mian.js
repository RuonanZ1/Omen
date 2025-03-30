const yesBtn = document.querySelector(".yes-btn");
const noBtn = document.querySelector(".no-btn");
const omenImg = document.getElementById("omen-img");
const app = document.getElementById("app");

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

// 图片库（替换为你自己的图片URL）
const imgUrls = [
  "./imgs/ku.jpg",
  "./imgs/motou.jpg",
  "./imgs/mao.jpg",
  "./imgs/za.jpg",
  "./imgs/dance.jpg",
  "./imgs/ku.jpg",
  "./imgs/motou.jpg",
  "./imgs/za.jpg",
  "./imgs/mao.jpg",
  "./imgs/ku.jpg",
];

let clickCount = 0;
let currentSize = 1;
let noBtnSize = 1;
let debounceTimer;

// 防抖函数
function debounce(func, delay) {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(func, delay);
}

noBtn.addEventListener("click", () => {
  debounce(() => {
    // 1. 改变"不给"按钮文字（循环使用）
    const textIndex = clickCount % noTexts.length;
    noBtn.textContent = noTexts[textIndex];

    // 2. 改变"不给"按钮样式
    noBtn.style.fontStyle = fontStyles[clickCount % fontStyles.length];

    // 3. "不给"按钮变小
    noBtnSize = Math.max(0.5, noBtnSize - 0.05);
    noBtn.style.transform = `scale(${noBtnSize})`;

    // 4. "给你"按钮变大（最大放大到1.5倍）
    currentSize = Math.min(3.5, currentSize + 0.1);
    yesBtn.style.transform = `scale(${currentSize})`;

    // 5. 改变图片（循环使用）
    const imgIndex = clickCount % imgUrls.length;
    omenImg.src = imgUrls[imgIndex];

    // 6. 增加计数
    clickCount++;
    // 7. 达到一定次数后，隐藏"不给"按钮
    if (clickCount >= 11) {
      noBtn.style.display = "none"; // 隐藏"不给"按钮
    }
  }, 200);
});

yesBtn.addEventListener("click", () => {
  omenImg.src = imgUrls[9];
  // 显示感谢信息
  const originalText = yesBtn.textContent;
  yesBtn.textContent = "谢谢老板！";
  noBtn.style.display = "none"; // 隐藏"不给"按钮
});
