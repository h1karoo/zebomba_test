document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    let currentSlide = 0; 
    const visibleSlides = 8;
    const totalSlides = slides.length; 
    const slideWidth = slides[0].offsetWidth + 10; 
    function updateSlider() {
        slider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    }
    leftArrow.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlider();
        }
    });
    rightArrow.addEventListener('click', () => {
        if (currentSlide < totalSlides - visibleSlides) {
            currentSlide++;
            updateSlider();
        }
    });
    window.addEventListener('resize', () => {
        updateSlider();
    });
});
