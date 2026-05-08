// =========================================
// UI.JS - Renderowanie interfejsu
// =========================================

import { formatDate } from './utils.js';
import { CATEGORIES } from './data.js';

// ===== WIDOKI =====

export function showView(name) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(`view-${name}`).classList.add('active');

    // Zaktualizuj aktywny link w nawigacji
    document.querySelectorAll('.nav-link, .mobile-link').forEach(link => {
        link.classList.toggle('active', link.dataset.view === name);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== KATEGORIE =====

export function renderCategories(activeCategory = 'all') {
    const container = document.getElementById('categoriesFilter');

    container.innerHTML = CATEGORIES.map(cat => `
        <button
            class="cat-btn ${cat.id === activeCategory ? 'active' : ''}"
            data-category="${cat.id}"
        >
            ${cat.label}
        </button>
    `).join('');
}

// ===== LISTA POSTÓW =====

export function renderPosts(posts, searchQuery = '') {
    const grid = document.getElementById('postsGrid');
    const noResults = document.getElementById('noResults');
    const resultsInfo = document.getElementById('resultsInfo');

    resultsInfo.textContent = `Znaleziono ${posts.length} artykuł${posts.length === 1 ? '' : posts.length < 5 ? 'y' : 'ów'}`;

    if (!posts.length) {
        grid.innerHTML = '';
        noResults.classList.remove('hidden');
        return;
    }

    noResults.classList.add('hidden');

    grid.innerHTML = posts.map((post, i) => `
        <article
            class="post-card"
            data-id="${post.id}"
            style="animation-delay: ${i * 0.05}s"
        >
            <div class="post-image">${post.emoji}</div>
            <div class="post-body">
                <div class="post-meta">
                    <span class="post-category">${getCategoryLabel(post.category)}</span>
                    <span class="post-date">${formatDate(post.date)}</span>
                </div>
                <h2 class="post-title">${post.title}</h2>
                <p class="post-excerpt">${post.excerpt}</p>
            </div>
            <div class="post-footer">
                <span class="read-time">⏱️ ${post.readTime} min czytania</span>
                <span class="read-more">Czytaj →</span>
            </div>
        </article>
    `).join('');
}

// ===== POJEDYNCZY POST =====

export function renderPost(post) {
    document.getElementById('postContent').innerHTML = `
        <div class="article-hero">${post.emoji}</div>
        <header class="article-header">
            <div class="article-meta">
                <span class="post-category">${getCategoryLabel(post.category)}</span>
                <span class="post-date">📅 ${formatDate(post.date)}</span>
                <span class="read-time">⏱️ ${post.readTime} min czytania</span>
            </div>
            <h1 class="article-title">${post.title}</h1>
            <p class="article-excerpt">${post.excerpt}</p>
        </header>
        <div class="article-content">${post.content}</div>
        <div class="article-tags">
            ${post.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
        </div>
    `;
}

// ===== FORMULARZ =====

export function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(`${fieldId}Error`);

    field?.classList.add('error');
    if (error) error.textContent = message;
}

export function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(`${fieldId}Error`);

    field?.classList.remove('error');
    if (error) error.textContent = '';
}

export function clearAllErrors() {
    ['fname', 'lname', 'email', 'subject', 'message', 'consent'].forEach(clearFieldError);
}

export function showFormSuccess() {
    document.getElementById('contactForm').classList.add('hidden');
    document.getElementById('formSuccess').classList.remove('hidden');
}

export function showForm() {
    document.getElementById('contactForm').classList.remove('hidden');
    document.getElementById('formSuccess').classList.add('hidden');
    document.getElementById('contactForm').reset();
    document.getElementById('charCounter').textContent = '0/500';
    clearAllErrors();
}

// ===== ZAPISANE WIADOMOŚCI =====

export function renderSavedMessages(messages) {
    const container = document.getElementById('messagesList');
    const section = document.getElementById('savedMessages');

    if (!messages.length) {
        section.classList.add('hidden');
        return;
    }

    section.classList.remove('hidden');

    container.innerHTML = messages.map(msg => `
        <div class="message-item">
            <div class="message-item-header">
                <span>${msg.fname} ${msg.lname}</span>
                <span class="message-item-meta">${msg.date}</span>
            </div>
            <div class="message-item-meta">
                📧 ${msg.email} · 📌 ${msg.subject}
            </div>
            <div class="message-item-text">${msg.message.substring(0, 100)}${msg.message.length > 100 ? '...' : ''}</div>
        </div>
    `).join('');
}

// ===== HELPER =====

function getCategoryLabel(categoryId) {
    return CATEGORIES.find(c => c.id === categoryId)?.label || categoryId;
}