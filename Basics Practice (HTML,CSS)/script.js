document.addEventListener("DOMContentLoaded", function () {
    // Set up variables
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slider > div');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let slideIndex = 0;

    // Function to show the current slide
    function showSlide(index) {
        if (index < 0) {
            slideIndex = slides.length - 1;
        } else if (index >= slides.length) {
            slideIndex = 0;
        } else {
            slideIndex = index;
        }

        // Move the slider to the current slide
        slider.style.transform = `translateX(${-slideIndex * 100}%)`;
    }

    // Event listener for previous button
    prevBtn.addEventListener('click', function () {
        showSlide(slideIndex - 1);
    });

    // Event listener for next button
    nextBtn.addEventListener('click', function () {
        showSlide(slideIndex + 1);
    });

    // Auto-play the slider (optional)
    function autoPlay() {
        showSlide(slideIndex + 1);
    }

    // Set an interval for auto-play (adjust the time as needed)
    setInterval(autoPlay, 5000);
});

