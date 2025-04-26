// =========================== ABOUT SECTION =================================

document.addEventListener('DOMContentLoaded', function () {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    const counterNumbers = document.querySelectorAll('.counter-number');

    const animateCounter = (el) => {
        const target = parseInt(el.innerText);
        const duration = 2000; // 2 seconds
        const start = 0;
        const increment = Math.ceil(target / (duration / 20)); // Update every 20ms

        let current = start;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.innerText = target + (el.innerText.includes('+') ? '+' : '');
                clearInterval(timer);
            } else {
                el.innerText = current + (el.innerText.includes('+') ? '+' : '');
            }
        }, 20);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counterNumbers.forEach(counter => {
        observer.observe(counter);
    });

    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.addEventListener('mouseenter', function () {
        });

        card.addEventListener('mouseleave', function () {
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });
});


// =========================== TEAM SECTION =================================


document.addEventListener('DOMContentLoaded', function () {
    // Initialize AOS animation
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // Additional animations for team members
    const teamMembers = document.querySelectorAll('.team-member');

    // Staggered animation on load
    teamMembers.forEach((member, index) => {
        setTimeout(() => {
            member.style.opacity = '1';
        }, 200 * index);
    });

    // Animate on hover
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px)';
        });

        member.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });
});