const container = document.querySelector(".container");
let currentPage = 0;
const totalPages = 6;
let isScrolling = false;

// 데스크탑 여부 확인 함수
function isDesktop() {
  return window.innerWidth > 1280;
}

function scrollToPage(index) {
  if (isDesktop()) {
    container.style.transform = `translateX(-${index * 100}vw)`;
  }
}

function handleScroll(event) {
  if (!isDesktop()) return;

  event.preventDefault(); // 기본 스크롤 막기
  if (isScrolling) return;

  isScrolling = true;
  setTimeout(() => (isScrolling = false), 800); // 디바운스

  if (event.deltaY > 0) {
    // 아래로 스크롤
    currentPage = (currentPage + 1) % totalPages;
  } else {
    // 위로 스크롤
    currentPage = (currentPage - 1 + totalPages) % totalPages;
  }

  scrollToPage(currentPage);
}

window.addEventListener("wheel", handleScroll, { passive: false });

// 모바일 터치 스와이프 감지
let startX = 0;
let endX = 0;

container.addEventListener("touchstart", (e) => {
  if (!isDesktop()) return;
  startX = e.touches[0].clientX;
});

container.addEventListener("touchend", (e) => {
  if (!isDesktop()) return;
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  const swipeDistance = startX - endX;
  const threshold = 50; // 민감도

  if (Math.abs(swipeDistance) > threshold && !isScrolling) {
    isScrolling = true;
    setTimeout(() => (isScrolling = false), 800);

    if (swipeDistance > 0) {
      // 왼쪽으로 스와이프 → 다음 페이지
      currentPage = (currentPage + 1) % totalPages;
    } else {
      // 오른쪽으로 스와이프 → 이전 페이지
      currentPage = (currentPage - 1 + totalPages) % totalPages;
    }

    scrollToPage(currentPage);
  }
}
