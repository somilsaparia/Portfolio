// Resume Section
function detectHoverSupport() {
    return window.matchMedia('(hover: hover)').matches;
}

var observer1;  // Declare observer globally with a unique name
var lastScrollTop1 = 0;  // Track last scroll position with a unique name
var lastAnimatedDiv1 = null;  // Track last animated div with a unique name

function applyObserverForSmallScreensUpdated() {
if (window.innerWidth < 992 && !detectHoverSupport()) {
    let options = {
    root: null,
    rootMargin: '0px 0px -50% 0px',  // 50% line at the middle of the viewport
    threshold: 0
    };

    let callback = (entries, observer) => {
    entries.forEach(entry => {
        const element = entry.target;

        if (entry.isIntersecting) {
        // Only animate the div that crosses the 50% line last
        if (lastAnimatedDiv1 && lastAnimatedDiv1 !== element) {
            lastAnimatedDiv1.classList.remove('animate');
        }
        element.classList.add('animate');
        lastAnimatedDiv1 = element;
        } else {
        if (element === lastAnimatedDiv1) {
            element.classList.remove('animate');
            lastAnimatedDiv1 = null;
        }
        }
    });
    };

    observer1 = new IntersectionObserver(callback, options);
    let itemsToAnimate = document.querySelectorAll('.resume-item');
    itemsToAnimate.forEach(item => {
    observer1.observe(item);
    });

    return observer1;
}
}

function removeAllAnimateClasses() {
    let items = document.querySelectorAll('.resume-item');
    items.forEach(item => {
        item.classList.remove('animate');
    });
    lastAnimatedDiv1 = null;  // Reset last animated div
}

function handleScrollDirectionUpdated() {
    window.addEventListener('scroll', function() {
        let currentScrollTop = window.scrollY || document.documentElement.scrollTop;

        if (currentScrollTop !== lastScrollTop1) {
        if (observer1) {
            observer1.disconnect();
        }
        observer1 = applyObserverForSmallScreensUpdated();
        }

        lastScrollTop1 = currentScrollTop <= 0 ? 0 : currentScrollTop;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    observer1 = applyObserverForSmallScreensUpdated();  // Apply observer initially with updated names
    handleScrollDirectionUpdated();                    // Handle scroll direction with updated names
    window.addEventListener('resize', () => {
        if (observer1) {
        observer1.disconnect();
        }
        removeAllAnimateClasses();
        observer1 = applyObserverForSmallScreensUpdated();  // Reapply observer on resize with updated names
    });
});

// Project Section
function applyObserverForSmallScreens() {
    let options = {
    root: null,
    rootMargin: '0px 0px -50% 0px',
    threshold: 0
    };

    let callback = (entries, observer) => {
    entries.forEach(entry => {
        const element = entry.target;

        if (entry.isIntersecting) {
        if (element.classList.contains('service-item')) {
            // Animate the service-item
            element.classList.add('animate');
            
            // Animate all sibling elements within the same row
            animateSiblingsInRow(element);
        }
        } else {
        if (element.classList.contains('service-item')) {
            element.classList.remove('animate');
            // Optionally, you can remove animation from sibling elements as well
            removeSiblingsAnimation(element);
        }
        }
    });
    };

    let observer = new IntersectionObserver(callback, options);
    let itemsToAnimate = document.querySelectorAll('.service-item');
    itemsToAnimate.forEach(item => {
    observer.observe(item);
    });

    return observer;
}

function animateSiblingsInRow(element) {
    let parent = element.parentElement;
    let itemsInRow = parent.querySelectorAll('.service-item');
    itemsInRow.forEach(item => {
        if (isInViewport(item)) {
        item.classList.add('animate');
        let icon = item.querySelector('.icon');
        if (icon) {
            icon.classList.add('animate');
        }
        }
    });
}

function removeSiblingsAnimation(element) {
    let parent = element.parentElement;
    let itemsInRow = parent.querySelectorAll('.service-item');
    itemsInRow.forEach(item => {
        item.classList.remove('animate');
        let icon = item.querySelector('.icon');
        if (icon) {
        icon.classList.remove('animate');
        }
    });
}

function isInViewport(el) {
    let rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom >= 0;
}

function handleScrollDirection() {
    let lastScrollTop = window.scrollY || document.documentElement.scrollTop;
    let observer = applyObserverForSmallScreens();

    window.addEventListener('scroll', function() {
        let currentScrollTop = window.scrollY || document.documentElement.scrollTop;

        if (currentScrollTop !== lastScrollTop) {
        if (observer) {
            observer.disconnect();
        }
        observer = applyObserverForSmallScreens();
        }

        lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    });
}

let observer = applyObserverForSmallScreens();
handleScrollDirection();
window.addEventListener('resize', () => {
    if (observer) {
        observer.disconnect();
    }
    observer = applyObserverForSmallScreens();
});

// Navbar Section
window.addEventListener('scroll', function() {
    var contactLink = document.querySelector('nav#navmenu a[href="#contact"]');
    var navLinks = document.querySelectorAll('nav#navmenu ul li a');
    
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
    navLinks.forEach(function(link) {
        link.classList.remove('active');
    });

    contactLink.classList.add('active');
    }
});

// Stats Section
document.addEventListener("DOMContentLoaded", function () {
    const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        }
    });
    });

    const h1 = document.querySelector('.scale-up');
    observer.observe(h1);
});