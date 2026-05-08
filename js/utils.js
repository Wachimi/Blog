// =========================================
// UTILS.JS - Funkcje pomocnicze
// =========================================

// Formatowanie daty
export function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('pl-PL', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

// Formatowanie daty i godziny
export function formatDateTime() {
    return new Date().toLocaleString('pl-PL', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Walidacja email
export function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Walidacja pola tekstowego
export function isValidText(text, minLength = 2) {
    return text.trim().length >= minLength;
}

// Podświetlanie tekstu przy wyszukiwaniu
export function highlightText(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Generowanie ID
export function generateId() {
    return Date.now().toString(36);
}

// Debounce - opóźnienie wykonania funkcji
// Przydatne przy wyszukiwaniu - nie szukaj po każdej literze!
export function debounce(fn, delay = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}