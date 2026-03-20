// Acessibilidade: Painel
function toggleAccPanel() {
    document.getElementById('accPanel').classList.toggle('show');
}

// Acessibilidade: Tamanho da Fonte
let currentFontSize = 16;
function changeFontSize(delta) {
    currentFontSize += delta;
    if (currentFontSize < 12) currentFontSize = 12;
    if (currentFontSize > 24) currentFontSize = 24;
    document.documentElement.style.setProperty('--font-size-base', currentFontSize + 'px');
}

// Acessibilidade: Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Acessibilidade: Leitura de Voz
let synth = window.speechSynthesis;
let isReading = false;

function toggleReading() {
    if (isReading) {
        synth.cancel();
        isReading = false;
        document.getElementById('readBtn').innerText = "Ouvir Site";
        document.querySelectorAll('.reading-active').forEach(el => el.classList.remove('reading-active'));
    } else {
        isReading = true;
        document.getElementById('readBtn').innerText = "Parar Leitura";
        readNextSection(0);
    }
}

function readNextSection(index) {
    const sections = document.querySelectorAll('.readable-section');
    if (index >= sections.length || !isReading) {
        isReading = false;
        document.getElementById('readBtn').innerText = "Ouvir Site";
        return;
    }

    const text = sections[index].innerText;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.0;

    sections[index].classList.add('reading-active');

    utterance.onend = () => {
        sections[index].classList.remove('reading-active');
        readNextSection(index + 1);
    };

    synth.speak(utterance);
}

// Animação de Revelação
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// Fechar painel ao clicar fora
document.addEventListener('click', (e) => {
    if (!e.target.closest('.accessibility-menu')) {
        document.getElementById('accPanel').classList.remove('show');
    }
});