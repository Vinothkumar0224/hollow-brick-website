// Toggle mobile nav
function toggleMenu() {
    document.querySelector(".header-nav").classList.toggle("active");
}

// About section animations
const aboutImgs = document.querySelectorAll(".about-img img");
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.2 });
aboutImgs.forEach(img => observer.observe(img));

// Product card flip
document.querySelectorAll(".flip-btn").forEach(btn => {
    btn.addEventListener("click", function () {
        this.closest(".card").classList.toggle("is-flipped");
    });
});

// Gallery Carousel
const galleryTrack = document.querySelector(".gallery-track");
const galleryCards = [...document.querySelectorAll(".gallery-track .g-card")];
const galleryPrev = document.querySelector(".gallery-prev");
const galleryNext = document.querySelector(".gallery-next");
const galleryCarousel = document.querySelector(".carousel-gallery");

// Modal Elements
const modal = document.getElementById("galleryModal");
const modalImg = document.getElementById("modalImage");
const closeBtn = document.querySelector(".modal .close");

// Responsive slides per view 
let slidesToShow = 3; 
const updateSlidesToShow = () => {
    const width = window.innerWidth;
    if (width <= 600) slidesToShow = 1;
    else if (width <= 992) slidesToShow = 2; 
    else slidesToShow = 3;
};

// Clone slides for infinite loop
const cloneSlides = () => {
    // remove old clones
    galleryTrack.querySelectorAll(".clone").forEach(c => c.remove());

    const totalCards = galleryCards.length;
    const firstClones = galleryCards.slice(0, slidesToShow).map(card => {
        const clone = card.cloneNode(true);
        clone.classList.add("clone");
        return clone;
    });
    const lastClones = galleryCards.slice(-slidesToShow).map(card => {
        const clone = card.cloneNode(true);
        clone.classList.add("clone");
        return clone;
    });

    firstClones.forEach(clone => galleryTrack.appendChild(clone));
    lastClones.reverse().forEach(clone => galleryTrack.prepend(clone));
};

// Calculate card width dynamically
const cardWidth = () => {
    const style = getComputedStyle(galleryCards[0]);
    const margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    return galleryCards[0].offsetWidth + margin;
};

let galleryIndex;

// Set transform
const setTransform = (transition = true) => {
    galleryTrack.style.transition = transition ? "transform 0.5s ease-in-out" : "none";
    galleryTrack.style.transform = `translateX(-${galleryIndex * cardWidth()}px)`;
};

// Move slide
const moveSlide = (dir) => {
    galleryIndex += dir;
    setTransform();
};

// Infinite loop handling
galleryTrack.addEventListener("transitionend", () => {
    const total = galleryTrack.children.length;
    if (galleryIndex >= total - slidesToShow) {
        galleryIndex = slidesToShow;
        setTransform(false);
    } else if (galleryIndex < slidesToShow) {
        galleryIndex = total - slidesToShow * 2;
        setTransform(false);
    }
});

// Button controls
galleryNext.addEventListener("click", () => moveSlide(slidesToShow));
galleryPrev.addEventListener("click", () => moveSlide(-slidesToShow));

// Auto slide
let autoSlide = setInterval(() => moveSlide(slidesToShow), 4000);
galleryCarousel.addEventListener("mouseenter", () => clearInterval(autoSlide));
galleryCarousel.addEventListener("mouseleave", () => {
    autoSlide = setInterval(() => moveSlide(slidesToShow), 4000);
});

// Initialize gallery
const initGallery = () => {
    updateSlidesToShow();
    cloneSlides();
    galleryIndex = slidesToShow;
    setTransform(false);
};
window.addEventListener("resize", initGallery);
initGallery();

// Modal functionality
galleryCards.forEach(card => {
    const img = card.querySelector("img");
    img.addEventListener("click", () => {
        modal.style.display = "flex";
        modalImg.src = img.src;
    });
});

closeBtn.addEventListener("click", () => modal.style.display = "none");
modal.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
});


// Testimonials carousel
const track = document.querySelector(".review-carousel-track");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const cards = document.querySelectorAll(".review-card");

let index = 0;
const testimonialCardWidth = document.querySelector(".review-card").offsetWidth + 20;

function moveToSlide(newIndex) {
    index = newIndex;
    if (index < 0) index = cards.length - 1;
    if (index >= cards.length) index = 0;
    track.style.transform = `translateX(-${index * testimonialCardWidth}px)`;
}
next.addEventListener("click", () => moveToSlide(index + 1));
prev.addEventListener("click", () => moveToSlide(index - 1));

let testimonialAutoSlide = setInterval(() => {
    moveToSlide(index + 1);
}, 4000);

const carousel = document.querySelector(".review-carousel");
carousel.addEventListener("mouseenter", () => {
    clearInterval(testimonialAutoSlide);
});
carousel.addEventListener("mouseleave", () => {
    testimonialAutoSlide = setInterval(() => {
        moveToSlide(index + 1);
    }, 4000);
});
