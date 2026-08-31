// === BIRTHDAY STORY + COUNTDOWN ===

// Loading
function simulateLoading() {
    const progress = document.getElementById('progress1');
    let p = 0;
    const interval = setInterval(() => {
        p += Math.random() * 15 + 10;
        progress.style.width = Math.min(p, 100) + '%';
        if (p >= 100) {
            clearInterval(interval);
            document.getElementById('loading').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('loading').style.display = 'none';
                document.getElementById('main').style.display = 'block';
                startStorySequence();
            }, 800);
        }
    }, 80);
}

// Step-by-step story messages
function startStorySequence() {
    const msg1 = document.getElementById('message1');
    const msg2 = document.getElementById('message2');
    const msg3 = document.getElementById('message3');
    const countdownPage = document.getElementById('countdown-page');

    // Show messages one by one
    setTimeout(() => { msg1.style.opacity = 1; }, 800);
    setTimeout(() => { msg1.style.opacity = 0; msg2.style.opacity = 1; }, 4500);
    setTimeout(() => { msg2.style.opacity = 0; msg3.style.opacity = 1; }, 8500);
    setTimeout(() => { 
        msg3.style.opacity = 0; 
        countdownPage.style.display = 'block';
        startCountdown(); 
    }, 12500);
}

// ==================== COUNTDOWN SETTINGS ====================
// Change these values easily for testing or final version

const COUNTDOWN_SECONDS = 300;     // 5mins
// For testing: use 3 or 10
// For real use: use 120 (2 minutes) or more

// ===========================================================

// 2-minute demo countdown
function startCountdown() {
    let timeLeft = COUNTDOWN_SECONDS;   

    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const subtitleEl = document.getElementById('dynamic-subtitle');

    const subtitles = [
        "Every second brings us closer to your smile...",
        "Some people wait for New Year. I'm waiting for your birthday.",
        "The world gains another beautiful year with you.",
        "You're worth every second of this countdown.",
        "Almost there...",
        "Can you hear my heart counting too?"
    ];
    let subtitleIndex = 0;

    countdownInterval = setInterval(() => {
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;

        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');

        // Pulse effect
        const timerDisplay = document.getElementById('timer-display');
        timerDisplay.classList.add('pulse');
        setTimeout(() => timerDisplay.classList.remove('pulse'), 400);

        // Change subtitle every 12 seconds (good for both 3s test and 120s real)
        if (timeLeft % 12 === 0 && timeLeft > 0) {
            subtitleIndex = (subtitleIndex + 1) % subtitles.length;
            subtitleEl.style.opacity = 0;
            setTimeout(() => {
                subtitleEl.textContent = subtitles[subtitleIndex];
                subtitleEl.style.opacity = 1;
            }, 500);
        }

        timeLeft--;
        if (timeLeft < 0) {
            clearInterval(countdownInterval);
            triggerCelebration();
        }
    }, 1000);
}

function triggerCelebration() {
    BGM.playBgm1(); // Guarantees playback starts on the exact click gesture

    const countdownPage = document.getElementById('countdown-page');
    const celebration = document.getElementById('celebration');
    const dateDisplay = document.getElementById('date-display');
    const timerDisplay = document.getElementById('timer-display');

    // Stop heart rain during countdown celebration
    stopHeartRain();

    timerDisplay.style.transition = 'opacity 1s ease';
    timerDisplay.style.opacity = '0';

    setTimeout(() => {
        dateDisplay.style.transition = 'all 1.5s ease';
        dateDisplay.style.transform = 'scale(1.15)';
        dateDisplay.style.color = '#ff77aa';
        dateDisplay.textContent = "03 September ✨";
    }, 600);

    setTimeout(() => {
        dateDisplay.style.transform = 'scale(1)';

        // Fireworks + big heart burst only at this moment
        launchFireworks(14);    //More Fireworks
        createHearts(40);

        countdownPage.style.transition = 'opacity 1.2s ease';
        countdownPage.style.opacity = '0';
        
        setTimeout(() => {
            countdownPage.style.display = 'none';
            celebration.style.display = 'block';
            celebration.style.opacity = '1';

            // Restart gentle heart rain after celebration
            setTimeout(() => {
                startHeartRain();
            }, 3000);
        }, 1200);
    }, 3800);
document.getElementById('bottom-nav').style.display = 'flex';
}

// Celebration animations
// ==================== CONTROLLED HEART RAIN ====================
let heartRainInterval = null;
let isHeartRainActive = false;

function startHeartRain() {
    if (isHeartRainActive) return;
    isHeartRainActive = true;

    function rainCycle() {
        // Fall for 2 seconds
        createHearts(18);

        // After 2s pause, then rain again
        setTimeout(() => {
            if (isHeartRainActive) {
                rainCycle();
            }
        }, 4500); // 2s falling + 2.5s pause = 4.5s total cycle
    }

    rainCycle();
}

function stopHeartRain() {
    isHeartRainActive = false;
}

// Simple heart creator
function createHearts(count = 15) {
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.textContent = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '-60px';
        heart.style.fontSize = (Math.random() * 35 + 22) + 'px';
        heart.style.opacity = '0.85';
        heart.style.zIndex = '9999';
        heart.style.pointerEvents = 'none';
        document.body.appendChild(heart);

        setTimeout(() => {
            heart.style.transition = 'all 4s linear';
            heart.style.top = '110vh';
            heart.style.transform = `rotate(${Math.random() * 720 - 360}deg)`;
        }, 30);

        setTimeout(() => heart.remove(), 4500);
    }
}

// ==================== FIREWORKS (only for date change) ====================
// ==================== IMPROVED FIREWORKS ====================
function createFirework(x, y) {
    const colors = ['#ff00ff', '#00ffcc', '#ff77aa', '#ffff00', '#ff4444', '#00ffff', '#ffaa00'];
    
    // Create many particles for denser burst
    for (let i = 0; i < 28; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.borderRadius = '50%';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.boxShadow = `0 0 14px ${particle.style.background}`;
        particle.style.zIndex = '9998';
        particle.style.pointerEvents = 'none';
        document.body.appendChild(particle);

        const angle = (Math.PI * 2 * i) / 28 + (Math.random() * 0.3);
        const distance = 100 + Math.random() * 110;

        // Longer lasting trail
        setTimeout(() => {
            particle.style.transition = `all ${1.6 + Math.random() * 0.8}s cubic-bezier(0.1, 0.5, 0.2, 1)`;
            particle.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0.3)`;
            particle.style.opacity = '0';
        }, 30);

        // Stay longer before removing
        setTimeout(() => particle.remove(), 2800);
    }
}

// Launch more fireworks at random places
function launchFireworks(times = 12) {
    let count = 0;
    const interval = setInterval(() => {
        // Random positions across the screen
        const x = 50 + Math.random() * (window.innerWidth - 100);
        const y = 60 + Math.random() * (window.innerHeight * 0.55);
        
        createFirework(x, y);
        createHearts(5);   // small accompanying hearts
        
        count++;
        if (count >= times) clearInterval(interval);
    }, 280); // slightly faster interval for more bursts
}

// ========== ROBUST BACKGROUND MUSIC MANAGER ==========
const BGM = {
    bgm1: null,
    bgm2: null,
    current: null,

    init() {
        if (this.bgm1) return;

        // Updated path to match your 'Music' folder name
        this.bgm1 = new Audio('Music/bgm1.mp3');
        this.bgm2 = new Audio('Music/bgm2.mp3');

        this.bgm1.loop = true;
        this.bgm2.loop = true;
        this.bgm1.volume = 0.6;
        this.bgm2.volume = 0.6;
        this.bgm1.preload = 'auto';
        this.bgm2.preload = 'auto';

        this.bgm1.load();
        this.bgm2.load();
    },

    playBgm1() {
        this.init();
        if (this.current === this.bgm1) return;

        if (this.current) this.current.pause();

        this.bgm1.currentTime = 0;
        this.bgm1.play().then(() => {
            this.current = this.bgm1;
            console.log('BGM1 playing successfully!');
        }).catch(err => {
            console.error('Playback failed. Check if audio files exist in /Music folder:', err);
        });
    },

    switchToBgm2() {
        this.init();
        if (this.current === this.bgm2) return;

        if (this.bgm1) this.bgm1.pause();

        this.bgm2.currentTime = 0;
        this.bgm2.play().then(() => {
            this.current = this.bgm2;
            console.log('Switched to BGM2 successfully!');
        }).catch(err => {
            console.error('BGM2 play failed:', err);
        });
    }
};

// Start the journey to next pages
function startJourney() {
    // You can expand this later to show verification or prediction
    alert("🎉 Welcome to your full LoveAI surprise, Nikitha! (Next pages coming soon)");
    // TODO: Show verification or prediction here
}

// After startCountdown() function

function showVerification() {
    document.getElementById('celebration').style.display = 'none';
    document.getElementById('verification-gate').style.display = 'block';
    createHearts(20);
}

function verifyBoyfriend() {
    const input = document.getElementById('nameInput').value.trim();
    const message = document.getElementById('verifyMessage');
    
    if (input.toLowerCase() === "sharvesh") {
        message.innerHTML = "❤️ Verified! Opening Chapter 2...";
        message.style.color = "#00ffcc";
        createHearts(25);
        
        setTimeout(() => {
            document.getElementById('verification-gate').style.display = 'none';
            document.getElementById('chapter2').style.display = 'block';
        }, 1500);
    } else {
        message.innerHTML = "That's not quite right. Try again 😉";
        message.style.color = "#ff6666";
    }
}

function goToNext() {
    alert("🎉 Next chapter coming soon! (Gallery / Predictions etc.)");
}

// Reveal Card with flip animation
function revealCard(card) {
    if (card.getAttribute('data-revealed') === 'true') return;
    
    card.setAttribute('data-revealed', 'true');
    card.classList.add('revealed');
    
    // Add heart burst when revealed
    createHearts(12);
}

// Go to next chapter (you can expand later)
function goToNextChapter() {
    alert("🎉 Thank you for completing this journey with me, Nikitha! ❤️");
    // You can add more chapters here
}

// Update the button in Chapter 2 to go to Chapter 3
function showChapter3() {
    document.getElementById('chapter2').style.display = 'none';
    document.getElementById('chapter3').style.display = 'block';
    createHearts(25);
}

function revealCard(card) {
    if (card.getAttribute('data-revealed') === 'true') return;
    
    card.setAttribute('data-revealed', 'true');
    card.classList.add('revealed');
    
    createHearts(15);   // Nice heart burst on reveal
}

// Chapter 4 - Did You Know Facts with Slide-in Animation
const funFacts = [
    {
        title: "Did you Know?",
        text: "You’re the only person I’ve cried 😭,other than my family members. After a certain age, I didn’t even cry to them.. Itz juz me and my crying in the loneliness. You’re the only one whom I’ve cried a lot of times by hugging u tightly 🫂. I was truly myself for the first time while I’m crying to a person like you.. 🤗 "
    },
    {
        title: "Achievement Unlocked",
        text: "Most Trusted person in my lyf, most loving person and the caring person I’ve ever seen in my life 💞."
    },
    {
        title: "Fun Fact",
        text: "Accepted only your love proposal in his life, and rejected others 😉😄"
    },
    {
        title: "Did you know?",
        text: "You’re my secret keeper, my best-friend, my story teller, my caring Girlfriend, and my everything… I’ve never met a person like you, and I’ve never felt this comfortable with anyone. I always want this in my life even if life takes us on a different path of the journey😊."
    }
];

function loadFunFacts() {
    const container = document.getElementById('facts-container');
    container.innerHTML = '';

    funFacts.forEach((fact, index) => {
        const factHTML = `
            <div class="fact-card" onclick="this.style.transform = 'scale(1.08)'; createHearts(10);">
                <div class="fact-title">${fact.title}</div>
                <div class="fact-text">${fact.text}</div>
            </div>
        `;
        container.innerHTML += factHTML;
    });

    // Trigger slide-in animation one by one
    const cards = document.querySelectorAll('.fact-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('visible');
        }, 300 + (index * 220));   // Staggered delay
    });
}

// Show Chapter 4 from Chapter 3
function goToFinalChapter() {
    // For now it shows alert, you can add Chapter 5 later
    alert("🎉 Thank you for being the most amazing person in my life, Nikitha! ❤️");
}

// Update Chapter 3 button to go to Chapter 4
function showChapter4() {
    document.getElementById('chapter3').style.display = 'none';
    document.getElementById('chapter4').style.display = 'block';
    loadFunFacts();
    createHearts(25);
}


// === Floating Particles for All Pages ===
function createFloatingParticles() {
    const container = document.createElement('div');
    container.className = 'particles-container';
    document.body.appendChild(container);

    // Create 35 particles
    for (let i = 0; i < 35; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Some particles will be hearts
        if (Math.random() > 0.7) {
            particle.classList.add('heart');
            particle.innerHTML = '❤️';
        }

        // Random size
        const size = Math.random() * 6 + 3;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        // Random position
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';

        // Random animation duration
        const duration = Math.random() * 12 + 10;
        particle.style.animationDuration = duration + 's';

        // Random delay
        particle.style.animationDelay = Math.random() * 8 + 's';

        container.appendChild(particle);
    }
}

// ==================== LOVE POINTS SYSTEM ====================
let lovePoints = 0;
let gameScores = { 1: 0, 2: 0, 3: 0, 4: 0 };

function updatePointsDisplay() {
    const el = document.getElementById('love-points-value');
    if (el) {
        el.textContent = lovePoints;
        el.style.transform = 'scale(1.25)';
        el.style.transition = 'transform 0.25s ease';
        setTimeout(() => el.style.transform = 'scale(1)', 250);
    }
}

function addLovePoints(amount) {
    lovePoints += amount;
    updatePointsDisplay();
    createHearts(12);
}

function awardGamePoints(gameNumber) {
    let points = 0;
    if (gameNumber === 1) points = Math.floor(Math.random() * 41) + 80;
    else if (gameNumber === 2) points = Math.floor(Math.random() * 51) + 90;
    else if (gameNumber === 3) points = Math.floor(Math.random() * 61) + 100;
    else if (gameNumber === 4) points = Math.floor(Math.random() * 71) + 120;

    gameScores[gameNumber] = points;
    addLovePoints(points);

    // Show +points message if result box exists
    const resultBox = document.getElementById(`game${gameNumber}-result`);
    if (resultBox) {
        const pointsMsg = document.createElement('p');
        pointsMsg.style.marginTop = '15px';
        pointsMsg.style.color = '#ff99cc';
        pointsMsg.style.fontSize = '1.25rem';
        pointsMsg.innerHTML = `+${points} Love Points ❤️`;
        resultBox.appendChild(pointsMsg);
    }
    return points;
}

// ==================== CHAPTER 5 - LOVE GAMES ====================

function showChapter5() {
    document.getElementById('chapter4').style.display = 'none';
    document.getElementById('chapter5').style.display = 'block';
    createHearts(20);
    
    initGame1();
}

// ---- Game 1: Multi-question Complete My Sentence ----
const game1Questions = [
    {
        question: "If I’m having a bad day...",
        options: [
            "A) I need some space",
            "B) I just need a distraction",
            "C) I want to talk it out with you",
            "D) I isolate until I'm okay"
        ],
        correct: "All of the above, depending on the hour—but mostly option C."
    },
    {
        question: "When I can't fall asleep at night...",
        options: [
            "A) I count down the minutes until morning",
            "B) I scroll through my phone pretending to be tired",
            "C) I think about the last time we talked",
            "D) I stare at the ceiling wondering what you're dreaming about"
        ],
        correct: "A, B, C, and D on a continuous loop until 3 AM."
    },
    {
        question: "If you suddenly showed up at my door right now...",
        options: [
            "A) I’d pretend I wasn't surprised",
            "B) I’d probably drop whatever I'm holding",
            "C) I’d pull you inside before you could even say hi",
            "D) I wouldn't let go of you for a solid hour"
        ],
        correct: "A seamless transition from B straight into C and D."
    },
    {
        question: "My absolute favorite thing about you is...",
        options: [
            "A) The way you smile when you think nobody's watching",
            "B) How effortlessly you make my worst days better",
            "C) The random little things you say that stick in my head",
            "D) Simply knowing that you're mine"
        ],
        correct: "It's an equal tie across all four, but D wraps them all up."
    },
    {
        question: "When my phone lights up with your name...",
        options: [
            "A) I drop everything I'm doing to look at it",
            "B) I smile like an absolute idiot",
            "C) I unlock it faster than humanly possible",
            "D) My entire mood instantly shifts for the better"
        ],
        correct: "A, B, C, and D happen simultaneously in about 0.2 seconds."
    },
    {
        question: "If we were stuck together on a deserted island...",
        options: [
            "A) I'd look for a way off immediately",
            "B) I'd panic about running out of supplies",
            "C) I wouldn't even care as long as you were there",
            "D) I'd spend the whole time complaining about the weather"
        ],
        correct: "C is the honest truth, though B and D definitely happen first."
    },
    {
        question: "When I hear a song that reminds me of you...",
        options: [
            "A) I instantly turn the volume all the way up",
            "B) I replay it five times in a row",
            "C) I send it to you immediately with no context",
            "D) I zone out and pretend we're driving somewhere together"
        ],
        correct: "A, B, C, and D are all mandatory steps."
    },
    {
        question: "If I had to describe you in one word...",
        options: [
            "A) Unstoppable",
            "B) Captivating",
            "C) Unforgettable",
            "D) Mine"
        ],
        correct: "Whichever one you pick first, but D is the ultimate spoiler."
    },
    {
        question: "When I'm working on something important and get distracted...",
        options: [
            "A) It's usually because my brain wandered off to you",
            "B) It's because I'm waiting for a text back",
            "C) It's because I'd rather be doing literally anything with you",
            "D) It's because I lost all my focus the second I woke up"
        ],
        correct: "A, B, C, and D—my productivity doesn't stand a chance."
    },
    {
        question: "If you ask me what I'm thinking about right now...",
        options: [
            "A) I'll try to change the subject to look mysterious",
            "B) I'll lie and say \"nothing much\"",
            "C) I'll blush and refuse to look you in the eye",
            "D) I'll confess that it's 100% about you"
        ],
        correct: "A, B, and C are just buying time before admitting D."
    }
];

let currentGame1Index = 0;
let game1Selected = new Set();

function initGame1() {
    currentGame1Index = 0;
    game1Selected.clear();
    loadGame1Question();
}

function loadGame1Question() {
    const q = game1Questions[currentGame1Index];
    
    // Safety check in case the elements don't exist yet
    const progressEl = document.getElementById('game1-progress');
    const questionEl = document.getElementById('game1-question');
    const optionsContainer = document.getElementById('game1-options');
    
    if (!progressEl || !questionEl || !optionsContainer) return;

    progressEl.textContent = `Question ${currentGame1Index + 1} of ${game1Questions.length}`;
    questionEl.textContent = q.question;

    optionsContainer.innerHTML = '';

    q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt;
        btn.dataset.index = idx;
        btn.onclick = () => toggleGame1Option(btn);
        optionsContainer.appendChild(btn);
    });

    // Reset UI state for the new question
    const resultEl = document.getElementById('game1-result');
    if (resultEl) {
        resultEl.style.display = 'none';
        resultEl.classList.remove('reveal-anim', 'reveal-glow');
        resultEl.innerHTML = '';
    }

    const revealBtn = document.getElementById('game1-reveal-btn');
    const nextBtn = document.getElementById('game1-next-btn');
    
    if (revealBtn) revealBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
    
    game1Selected.clear();

    // Trigger staggered entrance animation for options
    setTimeout(() => {
        document.querySelectorAll('#game1-options .option-btn').forEach(btn => {
            btn.classList.add('show');
        });
    }, 50);
}

function toggleGame1Option(btn) {
    if (btn.disabled) return;

    const idx = btn.dataset.index;
    if (game1Selected.has(idx)) {
        game1Selected.delete(idx);
        btn.classList.remove('selected');
    } else {
        game1Selected.add(idx);
        btn.classList.add('selected');
    }

    // Show / hide Reveal button
    const revealBtn = document.getElementById('game1-reveal-btn');
    revealBtn.style.display = game1Selected.size > 0 ? 'inline-block' : 'none';
}

function revealGame1Answer() {
    if (game1Selected.size === 0) return;

    // Disable all options
    document.querySelectorAll('#game1-options .option-btn').forEach(b => {
        b.disabled = true;
    });

    document.getElementById('game1-reveal-btn').style.display = 'none';

    const q = game1Questions[currentGame1Index];
    const result = document.getElementById('game1-result');
    result.style.display = 'block';
    result.innerHTML = `
        <p style="font-size:1.5rem; margin-bottom:12px;">❤️ My Truth</p>
        <p>${q.correct}</p>
    `;

    // Restart animation
    result.classList.remove('reveal-anim', 'reveal-glow');
    void result.offsetWidth;
    result.classList.add('reveal-anim');

    // Soft glow after main animation
    setTimeout(() => {
        result.classList.add('reveal-glow');
    }, 900);

    createHearts(18);

    // Show Next button
    setTimeout(() => {
        const nextBtn = document.getElementById('game1-next-btn');
        if (currentGame1Index < game1Questions.length - 1) {
            nextBtn.textContent = 'Next Question →';
        } else {
            nextBtn.textContent = 'Continue to Game 2 →';
        }
        nextBtn.style.display = 'inline-block';
    }, 700);
}

function nextGame1Question() {
    if (currentGame1Index < game1Questions.length - 1) {
        currentGame1Index++;
        loadGame1Question();
        createHearts(12);
    } else {
        // Finished all 10 questions → award points then go to Game 2
        awardGamePoints(1);
        setTimeout(() => {
            nextGame(2);
        }, 1200); // small delay so she sees the +points
    }
}

function toggleGame1Option(btn) {
    if (btn.disabled) return;

    const idx = btn.dataset.index;
    if (game1Selected.has(idx)) {
        game1Selected.delete(idx);
        btn.classList.remove('selected');
    } else {
        game1Selected.add(idx);
        btn.classList.add('selected');
    }

    // Show reveal button if at least one selected
    const revealBtn = document.getElementById('game1-reveal-btn');
    if (game1Selected.size > 0) {
        revealBtn.style.display = 'inline-block';
    } else {
        revealBtn.style.display = 'none';
    }
}

function revealGame1Answer() {
    if (game1Selected.size === 0) return;

    // Disable all options
    document.querySelectorAll('#game1-options .option-btn').forEach(b => {
        b.disabled = true;
    });

    document.getElementById('game1-reveal-btn').style.display = 'none';

    const q = game1Questions[currentGame1Index];
    const result = document.getElementById('game1-result');
    result.style.display = 'block';
    result.innerHTML = `
        <p style="font-size:1.5rem; margin-bottom:12px;">❤️ My Truth</p>
        <p>${q.correct}</p>
    `;
    result.classList.remove('reveal-anim', 'reveal-glow');
    // Trigger reflow for animation restart
    void result.offsetWidth;
    result.classList.add('reveal-anim');

    // Add soft glowing pulse after the main animation
    setTimeout(() => {
        result.classList.add('reveal-glow');
    }, 900);

    createHearts(18);

    // Show next button after a short delay
    setTimeout(() => {
        const nextBtn = document.getElementById('game1-next-btn');
        if (currentGame1Index < game1Questions.length - 1) {
            nextBtn.textContent = 'Next Question →';
            nextBtn.style.display = 'inline-block';
        } else {
            nextBtn.textContent = 'Continue to Game 2 →';
            nextBtn.style.display = 'inline-block';
        }
    }, 700);
}

function loadGame1Question() {
    const q = game1Questions[currentGame1Index];
    document.getElementById('game1-progress').textContent = `Question ${currentGame1Index + 1} of ${game1Questions.length}`;
    document.getElementById('game1-question').textContent = q.question;

    const optionsContainer = document.getElementById('game1-options');
    optionsContainer.innerHTML = '';

    q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt;
        btn.dataset.index = idx;
        btn.onclick = () => toggleGame1Option(btn);
        optionsContainer.appendChild(btn);
    });

    // Reset UI
    document.getElementById('game1-result').style.display = 'none';
    document.getElementById('game1-result').classList.remove('reveal-anim', 'reveal-glow');
    document.getElementById('game1-result').innerHTML = '';
    document.getElementById('game1-reveal-btn').style.display = 'none';
    document.getElementById('game1-next-btn').style.display = 'none';
    game1Selected.clear();

    // Trigger staggered entrance animation
    setTimeout(() => {
        document.querySelectorAll('#game1-options .option-btn').forEach(btn => {
            btn.classList.add('show');
        });
    }, 40);
}

// ---- Game 2: Our Love Story ----

const memoryCardsData = [
    {
        id: 1,
        title: "We Met",
        date: "October 2024 🍂",
        text: "This was where our story quietly began. Two people who had no idea how important they'd become in each other's lives..."
    },
    {
        id: 2,
        title: "Just Friends",
        date: "",
        text: "At first, we were just friends. Simple conversations. Random laughs. Nothing extraordinary... Or at least, that's what I thought."
    },
    {
        id: 3,
        title: "Best Friends",
        date: "",
        text: "Before the end of your first year, something had changed. Somewhere along the way, \"friends\" quietly became \"best friends.\""
    },
    {
        id: 4,
        title: "Your Secret",
        date: "",
        text: "Little did I know... You had been secretly admiring me all along. You never said a word, but somehow I could feel little hints here and there."
    },
    {
        id: 5,
        title: "Trying to Forget",
        date: "",
        text: "When your second year began... You tried to convince yourself to move on. You wanted us to stay \"just friends.\" You even tried to forget me."
    },
    {
        id: 6,
        title: "My Turn",
        date: "Autumn Semester 2025",
        text: "Something inside me quietly changed. I started wanting to spend more time with you. Without realizing it... I had started falling for you."
    },
    {
        id: 7,
        title: "The Distance Before Love",
        date: "",
        text: "We argued. We stopped talking for nearly a week. Sometimes even silence teaches two hearts how much they truly matter to each other."
    },
    {
        id: 8,
        title: "The Spark",
        date: "Spring Semester 2026 • Chinese New Year",
        text: "We grew closer than ever. The tiny spark that began during Diwali at Vasee's home slowly became something impossible to ignore."
    },
    {
        id: 9,
        title: "The Night Everything Changed (8th March)",
        date: "Vasee's Birthday",
        text: "There wasn't a dramatic proposal. Just two hearts that already knew the answer. That night, held safely in my arms... we silently confessed our love."
    },
    {
        id: 10,
        title: "Vietnam",
        date: "One week later",
        text: "I left for Vietnam with my family. For the first time, we truly understood what it meant to miss each other. Distance had felt so heavy."
    },
    {
        id: 11,
        title: "Our Little World",
        date: "Back at University",
        text: "We became inseparable. Studying, cooking, and my favourite moments of all... simply falling asleep beside you after a long day."
    },
    {
        id: 12,
        title: "Our LDR Chapter",
        date: "Present (24th May - 23rd September)",
        text: "Life asked us to love each other from different cities. The hardest chapter... yet somehow the strongest one. You'll always be mine. ❤️"
    }
];

let draggedCard = null;

function initGame2() {
    const container = document.getElementById('timeline-items');
    const dropzone = document.getElementById('timeline-dropzone');

    if (!container || !dropzone) return;

    container.innerHTML = '';
    dropzone.innerHTML = '<p class="drop-hint" id="drop-hint">Drop your memories here...</p>';
    dropzone.classList.remove('has-cards');

    // Shuffle cards
    const shuffled = [...memoryCardsData].sort(() => Math.random() - 0.5);

    shuffled.forEach(card => {
        const el = createMemoryCard(card);
        container.appendChild(el);
    });

    // Make both areas accept drops
    setupDropZone(container);
    setupDropZone(dropzone);

    document.getElementById('story-btn').style.display = 'none';
    const result = document.getElementById('game2-result');
    result.style.display = 'none';
    result.innerHTML = '';
}

function createMemoryCard(card) {
    const el = document.createElement('div');
    el.className = 'memory-card';
    el.draggable = true;
    el.dataset.id = card.id;

    el.innerHTML = `
        <div class="card-title">❤️ ${card.title}</div>
        ${card.date ? `<div class="card-date">${card.date}</div>` : ''}
        <div class="card-text">${card.text}</div>
    `;

    el.addEventListener('dragstart', (e) => {
        draggedCard = el;
        el.style.opacity = '0.4';
        e.dataTransfer.effectAllowed = 'move';
    });

    el.addEventListener('dragend', () => {
        el.style.opacity = '1';
        draggedCard = null;
    });

    return el;
}

function setupDropZone(zone) {
    zone.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    });

    zone.addEventListener('drop', (e) => {
        e.preventDefault();
        if (!draggedCard) return;

        // Remove hint if it exists
        const hint = document.getElementById('drop-hint');
        if (hint) hint.remove();

        // If dropping on another card → insert before it
        const targetCard = e.target.closest('.memory-card');
        if (targetCard && targetCard !== draggedCard) {
            zone.insertBefore(draggedCard, targetCard);
        } else {
            zone.appendChild(draggedCard);
        }

        // Update dropzone style
        const dropzone = document.getElementById('timeline-dropzone');
        if (dropzone.querySelectorAll('.memory-card').length > 0) {
            dropzone.classList.add('has-cards');
        }

        // Show "Our Story" button after placing a few cards
        const placed = dropzone.querySelectorAll('.memory-card').length;
        if (placed >= 3) {
            document.getElementById('story-btn').style.display = 'inline-block';
        }

        draggedCard = null;
    });
}

function playOurStory() {
    // Smooth scroll to top so the animations are fully visible
    window.scrollTo({ top: 300, behavior: 'smooth' });

    const dropzone = document.getElementById('timeline-dropzone');
    const storyBtn = document.getElementById('story-btn');
    const itemsContainer = document.getElementById('timeline-items');

    storyBtn.style.display = 'none';

    // Get all cards currently in the dropzone
    let cards = Array.from(dropzone.querySelectorAll('.memory-card'));

    // If she hasn't placed all cards, move the remaining ones too
    const remaining = Array.from(itemsContainer.querySelectorAll('.memory-card'));
    cards = cards.concat(remaining);

    // Sort by correct order (id)
    cards.sort((a, b) => parseInt(a.dataset.id) - parseInt(b.dataset.id));

    // Clear both areas
    dropzone.innerHTML = '';
    itemsContainer.innerHTML = '';
    dropzone.classList.add('has-cards');

    // Place them one by one with animation
    cards.forEach((card, index) => {
        card.draggable = false;
        card.classList.add('final');
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        dropzone.appendChild(card);

        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.classList.add('flipping');
            createHearts(5);
        }, index * 420);
    });

    // Final message + points after all cards appear
    setTimeout(() => {
        // Glowing line
        const line = document.createElement('div');
        line.className = 'story-line';
        dropzone.parentNode.insertBefore(line, dropzone.nextSibling);
        setTimeout(() => line.classList.add('show'), 80);

        const result = document.getElementById('game2-result');
        result.style.display = 'block';
        result.innerHTML = `
            <p style="font-size:1.55rem; margin-bottom:10px;">Every memory led us here...</p>
            <p style="font-size:1.35rem; color:#ff99cc;">and every tomorrow begins with you. ❤️</p>
        `;
        result.classList.add('reveal-anim');

        // Award points
        setTimeout(() => {
            awardGamePoints(2);

            // Continue button
            setTimeout(() => {
                const nextBtn = document.createElement('button');
                nextBtn.className = 'begin-btn';
                nextBtn.style.marginTop = '28px';
                nextBtn.textContent = 'Continue to Game 3 →';
                nextBtn.onclick = () => nextGame(3);
                result.appendChild(nextBtn);
            }, 900);
        }, 700);

    }, cards.length * 420 + 500);
}

// ---- Game 3: Catch Hearts ----

let heartScore = 0;
let heartTimer = 60;     // Change the timing to 60s
let catchInterval = null;
let spawnInterval = null;

function startHeartCatch() {
    document.getElementById('start-catch-btn').style.display = 'none';
    heartScore = 0;
    heartTimer = 60;    // Change the timing to 60s
    document.getElementById('heart-score').textContent = 0;
    document.getElementById('heart-timer').textContent = 5;

    const container = document.getElementById('heart-catcher');

    // Spawn hearts
    spawnInterval = setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'catch-heart';
        heart.textContent = '💙'; // Blue heart
        heart.style.left = Math.random() * 85 + '%';
        heart.style.top = Math.random() * 70 + 15 + '%';
        heart.onclick = () => {
            heart.remove();
            heartScore++;
            document.getElementById('heart-score').textContent = heartScore;
            createHearts(3);
        };
        container.appendChild(heart);
        setTimeout(() => heart.remove(), 2800);
    }, 450);

    // Timer
    catchInterval = setInterval(() => {
        heartTimer--;
        document.getElementById('heart-timer').textContent = heartTimer;
        if (heartTimer <= 0) {
            clearInterval(catchInterval);
            clearInterval(spawnInterval);
            endHeartCatch();
        }
    }, 1000);
}

function endHeartCatch() {
    const result = document.getElementById('game3-result');
    result.style.display = 'block';
    result.innerHTML = `
        <p>Congratulations!</p>
        <p>You collected <strong>${heartScore}</strong> Hearts ❤️</p>
        <p style="margin-top:12px;">Exactly how many pieces my heart became after meeting you.</p>
    `;
    createHearts(30);

    // Award Love Points for Game 3
    awardGamePoints(3);

    // Show continue button after points are added
    setTimeout(() => {
        const nextBtn = document.createElement('button');
        nextBtn.className = 'begin-btn';
        nextBtn.style.marginTop = '25px';
        nextBtn.textContent = 'Continue to Final Game →';
        nextBtn.onclick = () => nextGame(4);
        result.appendChild(nextBtn);
    }, 800);
}

// ---- Game 4: Build My Heart (Drag & Drop Puzzle) ----

let draggedPiece = null;

// ← CHANGE THIS to your local image name
const PUZZLE_IMAGE = "images/photof.jpeg";

function initGame4() {
    const container = document.getElementById('puzzle-container');
    if (!container) return;

    container.innerHTML = '';
    draggedPiece = null;

    // Create pieces in CORRECT order first (for the 5-second preview)
    const correctOrder = [0,1,2,3,4,5,6,7,8];

    correctOrder.forEach((pos) => {
        const piece = document.createElement('div');
        piece.className = 'puzzle-piece';
        piece.draggable = false;
        piece.dataset.correct = pos;

        const row = Math.floor(pos / 3);
        const col = pos % 3;

        piece.style.backgroundImage = `url('${PUZZLE_IMAGE}')`;
        piece.style.backgroundSize = '300% 300%';
        piece.style.backgroundPosition = `${col * 50}% ${row * 50}%`;

        container.appendChild(piece);
    });

    // Romantic preview text
    let previewText = document.getElementById('puzzle-preview-text');
    if (!previewText) {
        previewText = document.createElement('p');
        previewText.id = 'puzzle-preview-text';
        previewText.style.cssText = `
            text-align: center;
            color: #ff99cc;
            font-size: 1.25rem;
            margin: 18px 0 10px;
            opacity: 0;
            transition: opacity 0.6s ease;
        `;
        container.parentNode.insertBefore(previewText, container.nextSibling);
    }
    previewText.textContent = "This is how my heart looks when it's complete... because of you ❤️";
    previewText.style.opacity = '1';

    // After 5 seconds → hide text + shuffle
    setTimeout(() => {
        previewText.style.opacity = '0';

        setTimeout(() => {
            // Shuffle
            const pieces = Array.from(container.children);
            for (let i = pieces.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                container.appendChild(pieces[j]);
                pieces.splice(j, 1);
            }

            // Enable dragging
            document.querySelectorAll('.puzzle-piece').forEach((piece, index) => {
                piece.draggable = true;
                piece.style.transition = 'all 0.4s ease';
                piece.style.transform = 'scale(0.92)';
                piece.style.opacity = '0.7';

                setTimeout(() => {
                    piece.style.transform = 'scale(1)';
                    piece.style.opacity = '1';
                }, index * 60);

                piece.addEventListener('dragstart', (e) => {
                    draggedPiece = piece;
                    piece.style.opacity = '0.5';
                    e.dataTransfer.effectAllowed = 'move';
                });
                piece.addEventListener('dragend', () => {
                    piece.style.opacity = '1';
                    draggedPiece = null;
                });
                piece.addEventListener('dragover', (e) => e.preventDefault());
                piece.addEventListener('drop', (e) => {
                    e.preventDefault();
                    if (draggedPiece && draggedPiece !== piece) {
                        const tempPos = draggedPiece.style.backgroundPosition;
                        draggedPiece.style.backgroundPosition = piece.style.backgroundPosition;
                        piece.style.backgroundPosition = tempPos;

                        const tempCorrect = draggedPiece.dataset.correct;
                        draggedPiece.dataset.correct = piece.dataset.correct;
                        piece.dataset.correct = tempCorrect;
                    }
                });
            });

            // Show "I completed it" button after 9 seconds
            const completeBtn = document.getElementById('complete-puzzle-btn');
            if (completeBtn) {
                completeBtn.style.display = 'none';
                completeBtn.style.opacity = '0';
                setTimeout(() => {
                    completeBtn.style.display = 'inline-block';
                    setTimeout(() => completeBtn.style.opacity = '1', 50);
                }, 9000);
            }

            // Show "Help me build" button after 60 seconds
            setTimeout(() => {
                showHelpButton();
            }, 60000); // 1 minute

        }, 600);
    }, 5000);
}

// New function: show the Help button
function showHelpButton() {
    // Avoid creating multiple buttons
    if (document.getElementById('help-build-btn')) return;

    const helpBtn = document.createElement('button');
    helpBtn.id = 'help-build-btn';
    helpBtn.className = 'begin-btn';
    helpBtn.textContent = 'Help me build ❤️';
    helpBtn.style.cssText = `
        margin-top: 18px;
        margin-left: 12px;
        background: linear-gradient(90deg, #ff77aa, #ff00ff);
        font-size: 1.15rem;
        padding: 14px 32px;
        opacity: 0;
        transition: opacity 0.8s ease;
    `;
    helpBtn.onclick = autoSolvePuzzle;

    const completeBtn = document.getElementById('complete-puzzle-btn');
    if (completeBtn && completeBtn.parentNode) {
        completeBtn.parentNode.insertBefore(helpBtn, completeBtn.nextSibling);
    } else {
        document.getElementById('puzzle-container').parentNode.appendChild(helpBtn);
    }

    setTimeout(() => helpBtn.style.opacity = '1', 50);
}

// Auto-solve the puzzle when she presses "Help me build"
function autoSolvePuzzle() {
    const container = document.getElementById('puzzle-container');
    const pieces = Array.from(container.querySelectorAll('.puzzle-piece'));

    // Sort pieces back to correct order
    pieces.sort((a, b) => parseInt(a.dataset.correct) - parseInt(b.dataset.correct));

    // Clear and re-append with animation
    container.innerHTML = '';
    pieces.forEach((piece, index) => {
        piece.draggable = false;
        piece.style.opacity = '0';
        piece.style.transform = 'scale(0.8)';
        container.appendChild(piece);

        setTimeout(() => {
            piece.style.transition = 'all 0.5s ease';
            piece.style.opacity = '1';
            piece.style.transform = 'scale(1)';
            piece.classList.add('completed');
        }, index * 120);
    });

    // Hide both buttons
    const completeBtn = document.getElementById('complete-puzzle-btn');
    const helpBtn = document.getElementById('help-build-btn');
    if (completeBtn) completeBtn.style.display = 'none';
    if (helpBtn) helpBtn.style.display = 'none';

    // Show final result after the animation
    setTimeout(() => {
        completePuzzle();
    }, pieces.length * 120 + 400);
}

function completePuzzle() {
    const pieces = document.querySelectorAll('.puzzle-piece');
    let isSolved = true;

    // Check if every piece is in the correct position
    pieces.forEach((piece, index) => {
        // The correct position is stored in data-correct
        // When the puzzle is solved, the visual order should match data-correct 0→8
        if (parseInt(piece.dataset.correct) !== index) {
            isSolved = false;
        }
    });

    if (!isSolved) {
        // Puzzle is NOT solved → show motivating message
        const result = document.getElementById('game4-result');
        result.style.display = 'block';
        result.innerHTML = `
            <p style="font-size:1.4rem; color:#ff99cc;">Not quite there yet ❤️</p>
            <p style="margin-top:12px;">Keep going… every piece of my heart is waiting for you.</p>
        `;
        result.classList.add('reveal-anim');

        // Hide the message after a few seconds so she can continue trying
        setTimeout(() => {
            result.style.display = 'none';
            result.classList.remove('reveal-anim');
        }, 2800);

        createHearts(12);
        return; // stop here – do not give points or finish the game
    }

    // ========== Puzzle IS solved ==========
    pieces.forEach(p => {
        p.classList.add('completed');
        p.draggable = false;
    });

    // Hide the two buttons
    const completeBtn = document.getElementById('complete-puzzle-btn');
    const helpBtn = document.getElementById('help-build-btn');
    if (completeBtn) completeBtn.style.display = 'none';
    if (helpBtn) helpBtn.style.display = 'none';

    const result = document.getElementById('game4-result');
    result.style.display = 'block';
    result.innerHTML = `
        <p style="font-size:1.5rem;">You built my heart perfectly ❤️</p>
        <p style="margin-top:12px;">Every piece fits because of you.</p>
    `;
    result.classList.add('reveal-anim');

    createHearts(40);
    awardGamePoints(4);

    // Show final results button
    setTimeout(() => {
        const oldBtn = result.querySelector('.next-final-btn');
        if (oldBtn) oldBtn.remove();

        const nextBtn = document.createElement('button');
        nextBtn.className = 'begin-btn next-final-btn';
        nextBtn.style.marginTop = '28px';
        nextBtn.textContent = 'See My Final Results ❤️';
        nextBtn.onclick = () => startLoveCompiler();
        result.appendChild(nextBtn);
    }, 900);
}

// Navigation between games
function nextGame(num) {
    document.querySelectorAll('.game-screen').forEach(g => g.style.display = 'none');
    const gameEl = document.getElementById('game' + num);
    if (gameEl) {
        gameEl.style.display = 'block';
    }
    createHearts(15);

    if (num === 2) {
        // Small delay to make sure the element is visible before generating cards
        setTimeout(() => {
            initGame2();
        }, 100);
    }

    if (num === 4) {
        setTimeout(() => {
            initGame4();
            window.scrollTo({
                top: 400,
                behavior: 'smooth'
            });
        }, 150);
    }
}

function finishGames() {
    alert("🎉 All games completed! You made me the happiest person, Nikitha ❤️");
}

// Update the Chapter 4 button
function goToFinalChapter() {
    showChapter5();
}

// ========== LOVE COMPILER ==========
function startLoveCompiler() {
    // Hide everything else
    document.getElementById('chapter5').style.display = 'none';
    document.getElementById('final-scores').style.display = 'none';

    document.body.classList.add('overlay-open');
    const compiler = document.getElementById('love-compiler');
    compiler.style.display = 'flex';
    compiler.scrollTop = 0;

    // Add scanline effect
    if (!document.querySelector('.scanline')) {
        const scan = document.createElement('div');
        scan.className = 'scanline';
        compiler.appendChild(scan);
    }

    const output = document.getElementById('compiler-output');
    output.innerHTML = '';
    document.getElementById('compiler-continue').style.display = 'none';

    createHearts(18);

    const steps = [
        { text: "> Compiling Relationship...", type: "text", delay: 900 },
        { text: "> Checking Trust", type: "check", delay: 1600 },
        { text: "> Checking Care", type: "check", delay: 1600 },
        { text: "> Checking Memories", type: "check", delay: 1600 },
        { text: "> Checking Distance", type: "warning", delay: 2000 },
        { text: "> Applying Love Patch...", type: "text", delay: 1200 },
        { text: "progress", type: "progress", delay: 2400 },
        { text: "★ COMPILATION SUCCESSFUL ❤️", type: "final", delay: 1400 }
    ];

    let totalDelay = 500;

    steps.forEach((step, index) => {
        setTimeout(() => {
            if (step.type === "check") {
                // Line + mini progress bar
                const line = document.createElement('div');
                line.className = 'compiler-line';
                line.textContent = step.text + " ..........";
                output.appendChild(line);
                setTimeout(() => line.classList.add('visible'), 20);

                const bar = document.createElement('div');
                bar.className = 'mini-progress';
                bar.innerHTML = '<div class="mini-progress-fill"></div>';
                output.appendChild(bar);

                setTimeout(() => {
                    bar.querySelector('.mini-progress-fill').style.width = '100%';
                }, 80);

                setTimeout(() => {
                    line.textContent = step.text + " .......... ✔";
                    line.classList.add('success');
                }, 1200);

            } else if (step.type === "warning") {
                const line = document.createElement('div');
                line.className = 'compiler-line';
                line.textContent = step.text + " ..........";
                output.appendChild(line);
                setTimeout(() => line.classList.add('visible'), 20);

                const bar = document.createElement('div');
                bar.className = 'mini-progress';
                bar.innerHTML = '<div class="mini-progress-fill" style="background: linear-gradient(90deg, #ffaa00, #ff6600);"></div>';
                output.appendChild(bar);

                setTimeout(() => {
                    bar.querySelector('.mini-progress-fill').style.width = '100%';
                }, 80);

                setTimeout(() => {
                    line.textContent = step.text + " .......... ⚠ Long Distance Detected";
                    line.classList.add('warning');
                }, 1400);

            } else if (step.type === "progress") {
                const bar = document.createElement('div');
                bar.className = 'progress-bar';
                bar.innerHTML = '<div class="progress-fill" id="love-progress"></div>';
                output.appendChild(bar);
                setTimeout(() => {
                    document.getElementById('love-progress').style.width = '100%';
                }, 60);

            } else if (step.type === "final") {
                const line = document.createElement('div');
                line.className = 'compiler-line final';
                line.textContent = step.text;
                output.appendChild(line);
                setTimeout(() => line.classList.add('visible'), 30);

                // Different celebration (digital rain of hearts + glow)
                createDigitalHearts(25);
                setTimeout(() => {
                    document.getElementById('compiler-continue').style.display = 'block';
                }, 900);

            } else {
                // Normal text
                const line = document.createElement('div');
                line.className = 'compiler-line';
                line.textContent = step.text;
                output.appendChild(line);
                setTimeout(() => line.classList.add('visible'), 20);
            }
        }, totalDelay);

        totalDelay += step.delay;
    });
}

// Different celebration effect (digital style)
function createDigitalHearts(count = 20) {
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.textContent = Math.random() > 0.5 ? '❤️' : '💚';
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '-40px';
        heart.style.fontSize = (Math.random() * 22 + 14) + 'px';
        heart.style.opacity = '0.9';
        heart.style.zIndex = '10001';
        heart.style.pointerEvents = 'none';
        heart.style.textShadow = '0 0 8px #00ff41';
        document.body.appendChild(heart);

        setTimeout(() => {
            heart.style.transition = `all ${2.5 + Math.random()}s linear`;
            heart.style.top = '110vh';
            heart.style.transform = `rotate(${Math.random() * 360}deg)`;
        }, 30);

        setTimeout(() => heart.remove(), 4000);
    }
}

/* ========== TYPEWRITER HELPER ========== */
function typeWriter(element, text, speed = 38, callback) {
    return new Promise((resolve) => {
        element.innerHTML = '';
        const cursor = document.createElement('span');
        cursor.className = 'type-cursor';
        cursor.textContent = '▌';
        element.appendChild(cursor);

        let i = 0;

        function type() {
            if (i < text.length) {
                cursor.insertAdjacentText('beforebegin', text.charAt(i));
                i++;
                setTimeout(type, speed);
            } else {
                setTimeout(() => {
                    cursor.style.opacity = '0';
                    setTimeout(() => {
                        cursor.remove();
                        if (callback) callback();
                        resolve();
                    }, 400);
                }, 600);
            }
        }
        type();
    });
}

// Type a multi-line message (array of strings) with pauses between lines
async function typeLines(element, lines, charSpeed = 36, linePause = 550) {
    element.innerHTML = '';
    const cursor = document.createElement('span');
    cursor.className = 'type-cursor';
    cursor.textContent = '▌';
    element.appendChild(cursor);

    for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
        const line = lines[lineIdx];
        for (let i = 0; i < line.length; i++) {
            cursor.insertAdjacentText('beforebegin', line.charAt(i));
            await new Promise(r => setTimeout(r, charSpeed));
        }
        if (lineIdx < lines.length - 1) {
            cursor.insertAdjacentHTML('beforebegin', '<br>');
            await new Promise(r => setTimeout(r, linePause));
        }
    }

    await new Promise(r => setTimeout(r, 900));
    cursor.style.opacity = '0';
    await new Promise(r => setTimeout(r, 350));
    cursor.remove();
}

function showFinalScores() {
    document.getElementById('love-compiler').style.display = 'none';
    const scoresScreen = document.getElementById('final-scores');
    scoresScreen.style.display = 'flex';

    // Reset everything
    const titleEl = scoresScreen.querySelector('h1');
    const breakdown = document.getElementById('scores-breakdown');
    const totalEl = document.querySelector('.total-score');
    const msg = document.getElementById('congrats-message');
    const continueBtn = scoresScreen.querySelector('.begin-btn');

    breakdown.innerHTML = '';
    msg.innerHTML = '';
    totalEl.innerHTML = '';
    continueBtn.classList.remove('show');

    const originalTitle = "Your Love Score Report";
    titleEl.textContent = '';

    createHearts(25);

    // ========== SEQUENCE ==========
    (async () => {
        // 1. Type the title
        await typeWriter(titleEl, originalTitle, 55);
        await new Promise(r => setTimeout(r, 700));

        // 2. Reveal score rows one by one
        const games = [
            { num: 1, name: "Game 1: Complete My Sentence" },
            { num: 2, name: "Game 2: Our Love Story" },
            { num: 3, name: "Game 3: Catch the Hearts" },
            { num: 4, name: "Game 4: Build My Heart" }
        ];

        for (let i = 0; i < games.length; i++) {
            const g = games[i];
            const row = document.createElement('div');
            row.className = 'score-row';
            row.innerHTML = `
                <span>${g.name}</span>
                <span class="pts">${gameScores[g.num] || 0} pts</span>
            `;
            breakdown.appendChild(row);
            void row.offsetWidth;
            row.classList.add('visible');
            createHearts(4);
            await new Promise(r => setTimeout(r, 650));
        }

        await new Promise(r => setTimeout(r, 500));

        // 3. Type the total score
        const totalText = `Total Love Points: ${lovePoints} ❤️`;
        await typeWriter(totalEl, totalText, 45);
        createHearts(18);
        await new Promise(r => setTimeout(r, 800));

        // 4. Type the congratulatory message line by line
        const congratsLines = [
            "You didn’t just play the games...",
            "You walked through every memory, every feeling, every piece of us.",
            "",
            "Thank you for taking the time, for smiling,",
            "and for being the reason this whole surprise exists.",
            "",
            "I love you more than these points could ever measure. ❤️",
            "",
            "💕I LOVE YOUUU SOOO MUCH BABYYY💞... 🫂MY BUJUK BUJUK BABY GIRL💖 ... 💋UMAAHHHHH😘"
        ];

        await typeLines(msg, congratsLines, 32, 480);

        // 5. Soft fireworks + hearts + show button
        launchFireworks(8);
        createHearts(35);

        await new Promise(r => setTimeout(r, 600));
        continueBtn.classList.add('show');
    })();
}

// ========== LOVE LETTER ==========
function showLoveLetter() {
    document.getElementById('final-scores').style.display = 'none';
    document.getElementById('love-compiler').style.display = 'none';
    document.body.classList.remove('overlay-open');

    const letterPage = document.getElementById('love-letter');
    letterPage.style.display = 'flex';

    // Reset
    document.getElementById('envelope').classList.remove('open');
    document.getElementById('letter-card').classList.remove('fully-open');
    document.getElementById('letter-content').innerHTML = '';
    
    const nextBtn = document.querySelector('.letter-next-btn');
    nextBtn.style.display = 'none';
    nextBtn.classList.remove('show');

    createHearts(18);
}

function openEnvelope() {
    const envelope = document.getElementById('envelope');
    const wrapper = document.getElementById('envelope-wrapper');
    const card = document.getElementById('letter-card');

    // Open the flap
    envelope.classList.add('open');

    setTimeout(() => {
        wrapper.classList.add('opened');
        card.classList.add('show');
        writeLoveLetter();
    }, 900);
}

function writeLoveLetter() {
    const content = document.getElementById('letter-content');

    const paragraphs = [
        `Thank youu soo much babyy for entering into my life as a friend and choosing me as your boyfriend <span class="highlight">💗</span> within an year we’ve known each other.`,
        
        `I’m feeling grateful for being in a relationship with you. I know how much you cared for me while we were friends, and you took care of me as well ☺️. Always you wanted me to be a part of anything we do, even if everyone ignored me and though I distanced myself from it.`,
        
        `I loved your care and attention you give on me, and the little details you would check whether I had my dinner or not etc. Honestly, you’re the only person who cared for me even though I’ve hurted you a lot of times.`,
        
        `I apologise for all those mistakes I made in my past, which I didn’t do intentionally. <span class="highlight">I’m sryyy baby 🥺</span>`,
        
        `I’m genuinely feeling lucky that our paths crossed, from being friends and eventually ended up in a relationship 🤗. I’m mentioning this here coz honestly I don’t want to be in a relationship with anyone here in this Uni until my end of studies. But you changed my mind and that was a <span class="highlight">miracle moment ✨</span> I started liking you 💫 and fell in love with you 💘.`,
        
        `Two months together might sound shorter to others since we’ve been together at Uni, but those two months with you have given me so many memories. For the first time, I’ve watched a movie as a couple in the theatre, sitting beside you in the MRT, roaming KL with you by holding hands tightly 👩‍❤️‍👨. I liked all these memories with you.`,
        
        `And literally we’ve been on 4 dates, each week one in the last month before our LDR begins 💝. Yeahh, thinking about that makes me happy and excited..`,
        
        `And I know the distance hasn’t been easy. We had our bad days, fighting and arguing, crying 😭 but by the end of the day we would hug 🫂 and kiss each other 😘 in virtual through video call and that ends all our problems. There were days when I wished you to be physically beside me 🥲. But somehow the distance made us appreciate the little things even more. Every call, message, photo and especially the Good Morning 🌤️ / Good Night 😴 became something special.`,
        
        `Thank you soo much baby for being my love 💞. You’re my everything sweety 💖… I luv u to the moon and back 🫂.. 💋 Umaaahhh 😘`,
        
        `Once again I wish you a very <span class="highlight">🎆 HAPPY 21st BIRTHDAY 🎂</span> my lovee… 🫂😘💋`
    ];

    paragraphs.forEach((text, index) => {
        const p = document.createElement('p');
        p.innerHTML = text;
        content.appendChild(p);

        setTimeout(() => {
            p.classList.add('visible');
        }, 350 + index * 420);
    });

    // Signature
    setTimeout(() => {
        const sig = document.createElement('p');
        sig.className = 'signature';
        sig.innerHTML = `Forever yours,<br>Sharvesh ❤️`;
        content.appendChild(sig);
        setTimeout(() => sig.classList.add('visible'), 40);
    }, 350 + paragraphs.length * 420 + 250);

    // Show next button
    setTimeout(() => {
        const btn = document.querySelector('.letter-next-btn');
        btn.style.display = 'block';
        setTimeout(() => btn.classList.add('show'), 50);
        createHearts(22);
    }, 350 + paragraphs.length * 420 + 1600);
}

function goToPhotoMemories() {
    alert("Photo Memories coming next... ❤️");
    // Later we will replace this with the real photo memories page
}

// ========== PHOTO MEMORIES - CINEMA ROLLS ==========

// ← Put all your photo paths here (change according to your folder)
const memoryPhotos = [
    "images/1.jpeg", "images/2.jpeg", "images/3.jpeg", "images/4.jpeg", "images/5.jpeg",
    "images/6.jpeg", "images/7.jpeg", "images/8.jpeg", "images/9.jpeg", "images/10.jpeg",
    "images/11.jpeg", "images/12.jpeg", "images/13.jpeg", "images/14.jpeg", "images/15.jpeg",
    "images/16.jpeg", "images/17.jpeg", "images/18.jpeg", "images/19.jpeg", "images/20.jpeg",
    "images/21.jpeg", "images/22.jpeg", "images/23.jpeg", "images/24.jpeg", "images/25.jpeg",
    "images/26.jpeg", "images/27.jpeg", "images/28.jpeg", "images/29.jpeg", "images/30.jpeg",
    "images/31.jpeg", "images/32.jpeg", "images/33.jpeg", "images/34.jpeg", "images/35.jpeg",
    "images/36.jpeg", "images/37.jpeg", "images/38.jpeg", "images/39.jpeg", "images/40.jpeg",
    "images/41.jpeg", "images/42.jpeg", "images/43.jpeg", "images/44.jpeg", "images/45.jpeg",
    "images/46.jpeg", "images/47.jpeg", "images/48.jpeg", "images/49.jpeg", "images/50.jpeg",
    "images/51.jpeg", "images/52.jpeg", "images/53.jpeg", "images/54.jpeg", "images/55.jpeg",
    "images/56.jpeg", "images/57.jpeg", "images/58.jpeg", "images/59.jpeg", "images/60.jpeg",
    "images/61.jpeg", "images/62.jpeg", "images/photof.jpeg"
];

// Temporary duplicate padding if testing with fewer photos
while (memoryPhotos.length < 30) {
    memoryPhotos.push(...memoryPhotos.slice(0, 6));
}

let leftOffset = 0;
let rightOffset = 0;
let cycleCompleted = false;
let animationId = null;

function showPhotoMemories() {
    BGM.switchToBgm2(); // ← Crossfades bgm1 out and bgm2 in smoothly

    document.getElementById('love-letter').style.display = 'none';
    document.getElementById('final-scores').style.display = 'none';
    document.getElementById('love-compiler').style.display = 'none';

    const page = document.getElementById('photo-memories');
    page.style.display = 'flex';

    document.getElementById('memories-end-message').classList.remove('show');
    cycleCompleted = false;

    buildFilmStrips();
    startFilmScrolling();
    createHearts(15);
}

function buildFilmStrips() {
    const leftStrip = document.getElementById('left-strip');
    const rightStrip = document.getElementById('right-strip');
    leftStrip.innerHTML = '';
    rightStrip.innerHTML = '';

    const copies = 4; // Infinite loop buffer copies

    // LEFT: normal order (1 → 62)
    for (let c = 0; c < copies; c++) {
        memoryPhotos.forEach((src, i) => {
            const frame = document.createElement('div');
            frame.className = 'film-frame';
            frame.innerHTML = `<img src="${src}" alt="Memory ${i + 1}" loading="lazy">`;
            leftStrip.appendChild(frame);
        });
    }

    // RIGHT: normal order too, but we will offset and scroll it differently
    for (let c = 0; c < copies; c++) {
        memoryPhotos.forEach((src, i) => {
            const frame = document.createElement('div');
            frame.className = 'film-frame';
            // Label or index based on original count (62 down to 1)
            frame.innerHTML = `<img src="${src}" alt="Memory" loading="lazy">`;
            rightStrip.appendChild(frame);
        });
    }
}

function startFilmScrolling() {
    const leftStrip = document.getElementById('left-strip');
    const rightStrip = document.getElementById('right-strip');

    if (!leftStrip || !rightStrip) return;

    if (animationId) cancelAnimationFrame(animationId);

    const speed = 0.55;                    
    const frameHeight = 176;               
    const totalHeight = memoryPhotos.length * frameHeight;

    let leftOffset = 0;
    // Start right strip further down so it scrolls downwards starting from photo 62
    let rightOffset = -totalHeight * 2; 

    let distanceTravelled = 0;
    cycleCompleted = false;

    const msg = document.getElementById('memories-end-message');
    if (msg) msg.classList.remove('show');

    function animate() {
        // LEFT → UP (photos 1 → 62)
        leftOffset -= speed;
        distanceTravelled += speed;

        if (leftOffset <= -totalHeight) {
            leftOffset += totalHeight;
        }

        // RIGHT → DOWN (opposite direction, moving downwards through the normal array to count 62, 61, 60...)
        rightOffset += speed;

        if (rightOffset >= -totalHeight) {
            rightOffset -= totalHeight;
        }

        leftStrip.style.transform = `translateY(${leftOffset}px)`;
        rightStrip.style.transform = `translateY(${rightOffset}px)`;

        // Trigger end message reliably after completing one full loop height
        if (!cycleCompleted && distanceTravelled >= totalHeight) {
            cycleCompleted = true;
            showEndMessage();
        }

        animationId = requestAnimationFrame(animate);
    }

    animate();
}

function showEndMessage() {
    const msg = document.getElementById('memories-end-message');
    if (!msg) {
        console.warn('memories-end-message element not found');
        return;
    }
    msg.classList.add('show');
    createHearts(25);
}

function goToPhotoMemories() {
    showPhotoMemories();
}

// ========== BOTTOM NAVIGATION ==========
// Universal Chapter Controller to handle 2-way movement smoothly
function showChapter(chapterNum) {
    // Hide all main chapter blocks & gates
    const chapters = [
        'verification-gate', 'chapter2', 'chapter3', 'chapter4', 'chapter5',
        'love-compiler', 'final-scores', 'love-letter', 'photo-memories'
    ];

    document.getElementById('celebration').style.display = 'none';
    document.getElementById('countdown-page').style.display = 'none';

    chapters.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });

    // Show target chapter
    if (chapterNum === 1) {
        document.getElementById('celebration').style.display = 'block';
    } else if (chapterNum === 'verification') {
        document.getElementById('verification-gate').style.display = 'block';
    } else {
        const target = document.getElementById('chapter' + chapterNum);
        if (target) {
            target.style.display = 'block';

            // Chapter 4 facts
            if (chapterNum === 4 && document.getElementById('facts-container').children.length === 0) {
                loadFunFacts();
            }

            // Chapter 5 games — load Game 1 questions
            if (chapterNum === 5) {
                document.querySelectorAll('.game-screen').forEach(g => g.style.display = 'none');
                const g1 = document.getElementById('game1');
                if (g1) g1.style.display = 'block';
                initGame1();
            }
        }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    createHearts(12);
}

// Map existing specific jump functions to the new universal controller
function showChapter3() { showChapter(3); }
function showChapter4() { showChapter(4); }
function showChapter5() { showChapter(5); }
function goToFinalChapter() { showChapter(5); }


// Start particles when page loads
window.addEventListener('load', () => {
    createFloatingParticles();   // soft particles
    startHeartRain();            // big hearts with delay cycle
});
// Start everything
window.onload = simulateLoading;