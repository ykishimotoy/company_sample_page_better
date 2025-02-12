document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const header = document.getElementById('header');
    let lastScrollTop = 0;

    // Cursor effect
    const cursor = document.getElementById('cursor');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });

    // Show/hide header on scroll
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            header.style.top = '-100px'; // hide header
        } else {
            header.style.top = '0'; // show header
        }
        lastScrollTop = scrollTop;

        // Show sections on scroll
        const servicesContainer = document.querySelector('.services-container');
        const casesContainer = document.querySelector('.cases-container');
        const servicesPosition = servicesContainer.getBoundingClientRect().top + window.scrollY;
        const casesPosition = casesContainer.getBoundingClientRect().top + window.scrollY;
        const windowHeight = window.innerHeight;

        if (window.scrollY + windowHeight >= servicesPosition) {
            servicesContainer.classList.add('visible');
        }
        if (window.scrollY + windowHeight >= casesPosition) {
            casesContainer.classList.add('visible');
        }
    });

    // Background animation
    const canvas = document.getElementById('backgroundCanvas');
    const ctx = canvas.getContext('2d');
    let width, height;

    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const points = [];
    const numPoints = 100;

    for (let i = 0; i < numPoints; i++) {
        points.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
        });
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < numPoints; i++) {
            const p1 = points[i];
            p1.x += p1.vx;
            p1.y += p1.vy;

            if (p1.x < 0 || p1.x > width) p1.vx *= -1;
            if (p1.y < 0 || p1.y > height) p1.vy *= -1;

            for (let j = i + 1; j < numPoints; j++) {
                const p2 = points[j];
                const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

                if (dist < 100) {
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = 'rgba(173, 216, 230, 0.2)';
                    ctx.stroke();
                }

                for (let k = j + 1; k < numPoints; k++) {
                    const p3 = points[k];
                    const dist2 = Math.hypot(p1.x - p3.x, p1.y - p3.y);
                    const dist3 = Math.hypot(p2.x - p3.x, p2.y - p3.y);

                    if (dist < 100 && dist2 < 100 && dist3 < 100) {
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.lineTo(p3.x, p3.y);
                        ctx.closePath();
                        ctx.fillStyle = 'rgba(173, 216, 230, 0.1)';
                        ctx.fill();
                    }
                }
            }

            ctx.beginPath();
            ctx.arc(p1.x, p1.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = '#add8e6';
            ctx.fill();
        }

        requestAnimationFrame(draw);
    }

    draw();

    // Line animation
    setTimeout(() => {
        document.querySelectorAll('.line').forEach(line => {
            line.style.width = '100%';
        });
    }, 500);
});