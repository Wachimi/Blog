// =========================================
// APP.JS - Główna logika bloga
// =========================================

import { POSTS } from './data.js';
import {
    isValidEmail,
    isValidText,
    generateId,
    formatDateTime,
    debounce
} from './utils.js';
import {
    showView,
    renderCategories,
    renderPosts,
    renderPost,
    showFieldError,
    clearFieldError,
    clearAllErrors,
    showFormSuccess,
    showForm,
    renderSavedMessages
} from './ui.js';

// =========================================
// STAN APLIKACJI
// =========================================

const state = {
    activeCategory: 'all',
    searchQuery: '',
    currentPostId: null
};

const MESSAGES_KEY = 'blogApp_messages';

// =========================================
// INICJALIZACJA
// =========================================

document.addEventListener('DOMContentLoaded', () => {
    renderCategories('all');
    renderPosts(POSTS);
    renderSavedMessages(getMessages());
    initEventListeners();
    console.log('📝 Blog App załadowana!');
});

// =========================================
// EVENT LISTENERS
// =========================================

function initEventListeners() {

    // NAWIGACJA
    document.querySelectorAll('[data-view]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showView(link.dataset.view);
            closeMobileMenu();
        });
    });

    // HAMBURGER MENU
    document.getElementById('hamburger').addEventListener('click', toggleMobileMenu);

    // KATEGORIE (delegacja eventów)
    document.getElementById('categoriesFilter').addEventListener('click', (e) => {
        const btn = e.target.closest('.cat-btn');
        if (!btn) return;

        state.activeCategory = btn.dataset.category;
        renderCategories(state.activeCategory);
        filterAndRender();
    });

    // WYSZUKIWARKA z debouncingiem
    document.getElementById('searchInput').addEventListener(
        'input',
        debounce((e) => {
            state.searchQuery = e.target.value.trim();
            filterAndRender();
        }, 300)
    );

    // KLIKNIĘCIE W POST (delegacja eventów)
    document.getElementById('postsGrid').addEventListener('click', (e) => {
        const card = e.target.closest('.post-card');
        if (!card) return;

        const postId = parseInt(card.dataset.id);
        openPost(postId);
    });

    // PRZYCISK WRÓĆ
    document.getElementById('backBtn').addEventListener('click', () => {
        showView('home');
    });

    // FORMULARZ KONTAKTOWY
    document.getElementById('contactForm').addEventListener('submit', handleFormSubmit);
    document.getElementById('sendAnotherBtn').addEventListener('click', showForm);
    document.getElementById('clearMessagesBtn').addEventListener('click', clearMessages);

    // LICZNIK ZNAKÓW
    document.getElementById('message').addEventListener('input', updateCharCounter);

    // Walidacja na bieżąco (live validation)
    initLiveValidation();
}

// =========================================
// FILTROWANIE POSTÓW
// =========================================

function filterAndRender() {
    let filtered = POSTS;

    // Filtruj po kategorii
    if (state.activeCategory !== 'all') {
        filtered = filtered.filter(p => p.category === state.activeCategory);
    }

    // Filtruj po wyszukiwaniu
    if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase();
        filtered = filtered.filter(p =>
            p.title.toLowerCase().includes(query) ||
            p.excerpt.toLowerCase().includes(query) ||
            p.tags.some(tag => tag.toLowerCase().includes(query))
        );
    }

    renderPosts(filtered, state.searchQuery);
}

// =========================================
// WIDOK POSTA
// =========================================

function openPost(postId) {
    const post = POSTS.find(p => p.id === postId);
    if (!post) return;

    state.currentPostId = postId;
    renderPost(post);
    showView('post');
}

// =========================================
// HAMBURGER MENU
// =========================================

function toggleMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('mobileMenu');

    hamburger.classList.toggle('active');
    menu.classList.toggle('hidden');
}

function closeMobileMenu() {
    document.getElementById('hamburger').classList.remove('active');
    document.getElementById('mobileMenu').classList.add('hidden');
}

// =========================================
// FORMULARZ - WALIDACJA
// =========================================

function initLiveValidation() {
    // Waliduj pole gdy użytkownik opuszcza je (blur)
    const fields = [
        { id: 'fname', validate: () => validateName('fname', 'Imię') },
        { id: 'lname', validate: () => validateName('lname', 'Nazwisko') },
        { id: 'email', validate: validateEmail },
        { id: 'subject', validate: validateSubject },
        { id: 'message', validate: validateMessage },
    ];

    fields.forEach(({ id, validate }) => {
        document.getElementById(id).addEventListener('blur', validate);
        document.getElementById(id).addEventListener('input', () => clearFieldError(id));
    });
}

function validateName(fieldId, label) {
    const value = document.getElementById(fieldId).value;
    if (!isValidText(value, 2)) {
        showFieldError(fieldId, `${label} musi mieć minimum 2 znaki`);
        return false;
    }
    clearFieldError(fieldId);
    return true;
}

function validateEmail() {
    const value = document.getElementById('email').value;
    if (!isValidEmail(value)) {
        showFieldError('email', 'Podaj prawidłowy adres email');
        return false;
    }
    clearFieldError('email');
    return true;
}

function validateSubject() {
    const value = document.getElementById('subject').value;
    if (!value) {
        showFieldError('subject', 'Wybierz temat wiadomości');
        return false;
    }
    clearFieldError('subject');
    return true;
}

function validateMessage() {
    const value = document.getElementById('message').value;
    if (!isValidText(value, 20)) {
        showFieldError('message', 'Wiadomość musi mieć minimum 20 znaków');
        return false;
    }
    clearFieldError('message');
    return true;
}

function validateConsent() {
    if (!document.getElementById('consent').checked) {
        showFieldError('consent', 'Musisz wyrazić zgodę na przetwarzanie danych');
        return false;
    }
    clearFieldError('consent');
    return true;
}

// =========================================
// FORMULARZ - SUBMIT
// =========================================

function handleFormSubmit(e) {
    e.preventDefault();
    clearAllErrors();

    // Waliduj wszystkie pola
    const isValid = [
        validateName('fname', 'Imię'),
        validateName('lname', 'Nazwisko'),
        validateEmail(),
        validateSubject(),
        validateMessage(),
        validateConsent()
    ].every(Boolean);

    if (!isValid) return;

    // Zbierz dane
    const message = {
        id: generateId(),
        fname: document.getElementById('fname').value.trim(),
        lname: document.getElementById('lname').value.trim(),
        email: document.getElementById('email').value.trim(),
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value.trim(),
        date: formatDateTime()
    };

    // Zapisz w Local Storage
    saveMessage(message);

    // Zaktualizuj panel wiadomości
    renderSavedMessages(getMessages());

    // Pokaż sukces
    showFormSuccess();
}

// =========================================
// LICZNIK ZNAKÓW
// =========================================

function updateCharCounter() {
    const length = document.getElementById('message').value.length;
    const counter = document.getElementById('charCounter');

    counter.textContent = `${length}/500`;
    counter.className = 'char-counter';

    if (length > 450) counter.classList.add('danger');
    else if (length > 350) counter.classList.add('warning');
}

// =========================================
// LOCAL STORAGE - WIADOMOŚCI
// =========================================

function getMessages() {
    return JSON.parse(localStorage.getItem(MESSAGES_KEY) || '[]');
}

function saveMessage(message) {
    const messages = getMessages();
    messages.unshift(message);
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages.slice(0, 20)));
}

function clearMessages() {
    localStorage.removeItem(MESSAGES_KEY);
    renderSavedMessages([]);
}