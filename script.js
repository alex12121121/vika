// Слайд-шоу
document.addEventListener('DOMContentLoaded', function() {
    const slideshow = {
        slides: [
            "photo_2025-07-27_20-05-15.jpg",
            "photo_2025-07-27_19-24-01.jpg",
            "photo_2025-07-27_19-24-01 (2).jpg",
            "photo_2025-07-27_19-24-04.jpg",
            "photo_2025-07-27_20-05-15 (2).jpg",
            "photo_2025-07-27_20-05-16 (2).jpg",
            "photo_2025-07-27_19-24-04 (2).jpg",
            "photo_2025-07-27_20-05-16.jpg",
            "photo_2025-07-27_19-24-03.jpg",
            "photo_2025-07-27_20-39-00.jpg"
        ],
        currentIndex: 0,
        interval: null,
        delay: 6000, // 3 секунд
        
        init: function() {
            const slidesContainer = document.querySelector('.slideshow-slides');
            const dotsContainer = document.querySelector('.slideshow-dots');
            
            // Создаем слайды
            this.slides.forEach((slide, index) => {
                // Добавляем слайд
                const slideDiv = document.createElement('div');
                slideDiv.className = 'slideshow-slide';
                slideDiv.innerHTML = `<img src="${slide}" alt="Момент ${index + 1}">`;
                slidesContainer.appendChild(slideDiv);
                
                // Добавляем точку
                const dot = document.createElement('div');
                dot.className = 'slideshow-dot';
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => this.goToSlide(index));
                dotsContainer.appendChild(dot);
            });
            
            // Навигационные кнопки
            document.querySelector('.slideshow-prev').addEventListener('click', () => this.prevSlide());
            document.querySelector('.slideshow-next').addEventListener('click', () => this.nextSlide());
            
            // Запускаем автоматическое перелистывание
            this.startAutoPlay();
            
            // Пауза при наведении
            slidesContainer.parentElement.addEventListener('mouseenter', () => this.stopAutoPlay());
            slidesContainer.parentElement.addEventListener('mouseleave', () => this.startAutoPlay());
        },
        
        updateSlide: function() {
            const slidesContainer = document.querySelector('.slideshow-slides');
            const dots = document.querySelectorAll('.slideshow-dot');
            
            slidesContainer.style.transform = `translateX(-${this.currentIndex * 100}%)`;
            
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === this.currentIndex);
            });
        },
        
        nextSlide: function() {
            this.currentIndex = (this.currentIndex + 1) % this.slides.length;
            this.updateSlide();
        },
        
        prevSlide: function() {
            this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
            this.updateSlide();
        },
        
        goToSlide: function(index) {
            this.currentIndex = index;
            this.updateSlide();
        },
        
        startAutoPlay: function() {
            this.stopAutoPlay();
            this.interval = setInterval(() => this.nextSlide(), this.delay);
        },
        
        stopAutoPlay: function() {
            if (this.interval) {
                clearInterval(this.interval);
                this.interval = null;
            }
        }
    };
    
    slideshow.init();
});
document.addEventListener('DOMContentLoaded', function() {
    // Музыка и кнопка управления
const music = document.getElementById('birthdayMusic');
const musicButton = document.getElementById('musicButton');
let isMusicPlaying = false;

musicButton.addEventListener('click', function() {
    if (isMusicPlaying) {
        music.pause();
        musicButton.textContent = '🎵 Включить музыку';
        musicButton.classList.remove('playing');
    } else {
        music.play()
            .then(() => {
                musicButton.textContent = '🔊 Музыка играет';
                musicButton.classList.add('playing');
            })
            .catch(error => {
                console.log('Автовоспроизведение заблокировано:', error);
                musicButton.textContent = '▶ Разблокировать музыку';
                // Показываем уведомление, что нужно взаимодействие
                alert('Пожалуйста, нажмите на кнопку "Разблокировать музыку" чтобы включить звук');
            });
    }
    isMusicPlaying = !isMusicPlaying;
});

// Автоплей с задержкой (может не работать без взаимодействия пользователя)
setTimeout(() => {
    music.play().catch(error => {
        console.log('Автовоспроизведение заблокировано, ждем взаимодействия');
    });
}, 1000);
    // Плавная прокрутка при нажатии на ссылки
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Инициализация конфетти
    const canvas = document.getElementById('confetti');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Эффект конфетти при загрузке страницы
    setTimeout(() => {
        triggerConfetti();
    }, 1000);

    // Эффект конфетти при скролле к секциям
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                triggerConfetti();
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // Анимация конфетти
    let particles = [];
    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'];

    function triggerConfetti() {
        for (let i = 0; i < 100; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height - canvas.height,
                size: Math.random() * 10 + 5,
                color: colors[Math.floor(Math.random() * colors.length)],
                speed: Math.random() * 3 + 2,
                angle: Math.random() * 360,
                rotation: Math.random() * 0.2 - 0.1
            });
        }
    }

    function updateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.angle * Math.PI / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            ctx.restore();
            
            p.y += p.speed;
            p.angle += p.rotation;
            
            if (p.y > canvas.height) {
                particles.splice(i, 1);
                i--;
            }
        }
        
        if (particles.length > 0) {
            requestAnimationFrame(updateParticles);
        }
    }

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});

// Функция для переворота открытки
// Замените текущую функцию flipCard() на эту:
function flipCard() {
    const card = document.querySelector('.card');
    card.classList.toggle('flipped');
    triggerConfetti();
    updateParticles();
}

// Добавьте обработчики для touch-событий
document.querySelector('.card').addEventListener('touchstart', function(e) {
    e.preventDefault(); // Предотвращаем поведение по умолчанию
    flipCard();
}, {passive: false});

// Конфетти для функции flipCard
let particles = [];
const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'];
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function triggerConfetti() {
    for (let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: -10,
            size: Math.random() * 10 + 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            speed: Math.random() * 3 + 2,
            angle: Math.random() * 360,
            rotation: Math.random() * 0.2 - 0.1
        });
    }
}

function updateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle * Math.PI / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
        
        p.y += p.speed;
        p.angle += p.rotation;
        
        if (p.y > canvas.height) {
            particles.splice(i, 1);
            i--;
        }
    }
    
    if (particles.length > 0) {
        requestAnimationFrame(updateParticles);
    }
}