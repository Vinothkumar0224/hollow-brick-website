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

// Gallery carousel
const galleryTrack = document.querySelector(".gallery-track");
const galleryCards = [...document.querySelectorAll(".gallery-track .card")];
const galleryPrev = document.querySelector(".gallery-prev");
const galleryNext = document.querySelector(".gallery-next");
const galleryCarousel = document.querySelector(".carousel-gallery");
const modal = document.getElementById("galleryModal");
const modalImg = document.getElementById("modalImage");
const closeBtn = document.querySelector(".modal .close");

// Clone first & last slides
const firstClone = galleryCards[0].cloneNode(true);
const lastClone = galleryCards.at(-1).cloneNode(true);
galleryTrack.append(firstClone);
galleryTrack.prepend(lastClone);

let galleryIndex = 1;
const cardWidth = () => {
    const style = getComputedStyle(galleryCards[0]);
    const margin = parseInt(style.marginLeft) + parseInt(style.marginRight);
    return galleryCards[0].offsetWidth + margin;
};

const setTransform = (transition = true) => {
    galleryTrack.style.transition = transition ? "transform 0.5s ease-in-out" : "none";
    galleryTrack.style.transform = `translateX(-${galleryIndex * cardWidth()}px)`;
};
setTransform(false);

const moveSlide = (dir) => {
    galleryIndex += dir;
    setTransform();
};
galleryNext.addEventListener("click", () => moveSlide(1));
galleryPrev.addEventListener("click", () => moveSlide(-1));
galleryTrack.addEventListener("transitionend", () => {
    const total = galleryTrack.children.length;
    if (galleryIndex === 0) {
        galleryIndex = total - 2;
        setTransform(false);
    }
    if (galleryIndex === total - 1) {
        galleryIndex = 1;
        setTransform(false);
    }
});
let autoSlide = setInterval(() => moveSlide(1), 4000);
galleryCarousel.addEventListener("mouseenter", () => clearInterval(autoSlide));
galleryCarousel.addEventListener("mouseleave", () => {
    autoSlide = setInterval(() => moveSlide(1), 4000);
});
window.addEventListener("resize", () => setTransform(false));
document.querySelectorAll(".gallery-track .card img").forEach(img => {
    img.addEventListener("click", () => {
        modal.style.display = "flex";
        modalImg.src = img.src;
    });
});
closeBtn.addEventListener("click", () => modal.style.display = "none");
modal.addEventListener("click", (e) => {
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
