const container = document.querySelector(".container");
let currentPage = 0;
const totalPages = 6;
let isScrolling = false;

function scrollToPage(index) {
  container.style.transform = `translateX(-${index * 100}vw)`;
}

function handleScroll(event) {
  event.preventDefault(); // 기본 스크롤 막기
  if (isScrolling) return;

  isScrolling = true;
  setTimeout(() => (isScrolling = false), 800); // 디바운스

  if (event.deltaY > 0) {
    // 아래로 스크롤
    if (currentPage === totalPages - 1) {
      // 마지막 페이지 → 첫 페이지로
      currentPage = 0;
    } else {
      currentPage++;
    }
  } else {
    // 위로 스크롤
    if (currentPage === 0) {
      // 첫 페이지 → 마지막 페이지로
      currentPage = totalPages - 1;
    } else {
      currentPage--;
    }
  }

  scrollToPage(currentPage);
}

window.addEventListener("wheel", handleScroll, { passive: false });
// 모바일 터치 스와이프 감지
let startX = 0;
let endX = 0;

container.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

container.addEventListener("touchend", (e) => {
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
