// =========================================
// DATA.JS - Dane bloga
// Posty i kategorie
// =========================================

export const CATEGORIES = [
    { id: 'all', label: '📋 Wszystkie' },
    { id: 'html-css', label: '🎨 HTML & CSS' },
    { id: 'javascript', label: '⚡ JavaScript' },
    { id: 'narzedzia', label: '🛠️ Narzędzia' },
    { id: 'porady', label: '💡 Porady' },
];

export const POSTS = [
    {
        id: 1,
        title: 'CSS Grid vs Flexbox - kiedy co używać?',
        excerpt: 'Dwa najpotężniejsze narzędzia do layoutu w CSS. Poznaj różnice i naucz się kiedy sięgać po każde z nich.',
        content: `
            <h2>Wprowadzenie</h2>
            <p>CSS Grid i Flexbox to dwa fundamentalne narzędzia do tworzenia layoutów w nowoczesnym CSS. Wiele osób jest zdezorientowanych - kiedy używać jednego, a kiedy drugiego?</p>

            <h2>Flexbox - jednowymiomiarowy</h2>
            <p>Flexbox jest zaprojektowany do układania elementów w <strong>jednym kierunku</strong> - poziomo lub pionowo. Świetnie nadaje się do:</p>
            <pre>/* Nawigacja pozioma */
.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
}</pre>
            <p>Używaj Flexboxa gdy masz rząd przycisków, menu nawigacyjne, lub chcesz wyśrodkować element.</p>

            <h2>CSS Grid - dwuwymiarowy</h2>
            <p>Grid działa w <strong>dwóch wymiarach</strong> jednocześnie - rzędy I kolumny. Idealny do:</p>
            <pre>/* Siatka kart */
.cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
}</pre>

            <h2>Złota zasada</h2>
            <p>Pamiętaj: <code>Flexbox = 1D, Grid = 2D</code>. Często używasz ich razem - Grid do głównego layoutu strony, Flexbox do elementów wewnątrz kart.</p>
        `,
        category: 'html-css',
        emoji: '🎨',
        date: '2026-04-15',
        readTime: 5,
        tags: ['CSS', 'Flexbox', 'Grid', 'Layout']
    },
    {
        id: 2,
        title: 'Async/Await - koniec z callback hell',
        excerpt: 'Jak nowoczesny JavaScript rozwiązał problem zagnieżdżonych callbacków. Praktyczny przewodnik po async/await.',
        content: `
            <h2>Problem callbacków</h2>
            <p>Jeszcze kilka lat temu kod asynchroniczny w JavaScript wyglądał tak:</p>
            <pre>pobierz(url, function(err, data) {
    przetworz(data, function(err, wynik) {
        zapisz(wynik, function(err) {
            console.log("Gotowe!");
        });
    });
});</pre>
            <p>To tzw. <strong>callback hell</strong> - kod trudny do czytania i debugowania.</p>

            <h2>Rozwiązanie: async/await</h2>
            <p>Dzięki async/await ten sam kod wygląda jak synchroniczny:</p>
            <pre>async function wykonaj() {
    try {
        const data = await pobierz(url);
        const wynik = await przetworz(data);
        await zapisz(wynik);
        console.log("Gotowe!");
    } catch (err) {
        console.error(err);
    }
}</pre>

            <h2>Kluczowe zasady</h2>
            <p><code>async</code> przed funkcją sprawia że zwraca Promise. <code>await</code> czeka na Promise - ale tylko wewnątrz funkcji async. Zawsze używaj <code>try/catch</code> do obsługi błędów!</p>
        `,
        category: 'javascript',
        emoji: '⚡',
        date: '2026-04-22',
        readTime: 7,
        tags: ['JavaScript', 'Async', 'Promises', 'ES6']
    },
    {
        id: 3,
        title: 'Git w 10 minut - niezbędnik dewelopera',
        excerpt: 'Podstawy Gita które musisz znać zanim zaczniesz jakikolwiek projekt. Commit, push, pull i branches w praktyce.',
        content: `
            <h2>Dlaczego Git?</h2>
            <p>Git to system kontroli wersji. Wyobraź sobie że masz nieograniczony "cofnij" dla swojego kodu - to właśnie Git.</p>

            <h2>Codzienne komendy</h2>
            <pre>git status          # co się zmieniło?
git add .           # dodaj wszystkie zmiany
git commit -m "opis"  # zapisz wersję
git push            # wyślij na GitHub</pre>

            <h2>Branches - gałęzie</h2>
            <p>Branch to równoległa wersja projektu. Eksperymentujesz na branchu, a jeśli działa - łączysz z main.</p>
            <pre>git checkout -b nowa-funkcja  # stwórz branch
git checkout main              # wróć do main
git merge nowa-funkcja         # połącz</pre>

            <h2>Złota zasada commitów</h2>
            <p>Commituj często, z opisowymi wiadomościami. <code>"Dodano formularz kontaktowy"</code> jest dużo lepsze niż <code>"update"</code>.</p>
        `,
        category: 'narzedzia',
        emoji: '🛠️',
        date: '2026-04-28',
        readTime: 6,
        tags: ['Git', 'GitHub', 'DevOps', 'Narzędzia']
    },
    {
        id: 4,
        title: '10 błędów początkujących w HTML/CSS',
        excerpt: 'Najczęstsze pułapki na które wpadają osoby uczące się web developmentu. Czy popełniasz któryś z tych błędów?',
        content: `
            <h2>1. Brak semantycznego HTML</h2>
            <p>Używanie samych <code>div</code> zamiast <code>header</code>, <code>nav</code>, <code>main</code>, <code>footer</code>. Semantyczny HTML to lepszy SEO i dostępność.</p>

            <h2>2. CSS bez box-sizing</h2>
            <p>Zawsze dodawaj na początku pliku CSS:</p>
            <pre>* {
    box-sizing: border-box;
}</pre>
            <p>Bez tego padding i border "powiększają" elementy w nieoczekiwany sposób.</p>

            <h2>3. Inline styles</h2>
            <p>Pisanie styli bezpośrednio w HTML (<code>style="color: red"</code>) to zły nawyk. Używaj klas CSS.</p>

            <h2>4. Brak meta viewport</h2>
            <p>Bez <code>&lt;meta name="viewport"&gt;</code> strona nie będzie responsywna na telefonach. To jeden z najważniejszych tagów!</p>

            <h2>5. Nieużywanie CSS Variables</h2>
            <p>Zamiast powtarzać te same kolory w 20 miejscach, używaj zmiennych:</p>
            <pre>:root {
    --primary: #6366f1;
}

button { background: var(--primary); }</pre>
        `,
        category: 'porady',
        emoji: '💡',
        date: '2026-05-02',
        readTime: 4,
        tags: ['HTML', 'CSS', 'Błędy', 'Porady']
    },
    {
        id: 5,
        title: 'Fetch API i REST API - pobieranie danych',
        excerpt: 'Jak komunikować się z zewnętrznymi API w JavaScript. Od podstaw do praktycznego przykładu z obsługą błędów.',
        content: `
            <h2>Czym jest REST API?</h2>
            <p>API (Application Programming Interface) to interfejs który pozwala aplikacjom "rozmawiać" ze sobą. REST API to najpopularniejszy standard - używa HTTP i zwraca dane w formacie JSON.</p>

            <h2>Podstawowy Fetch</h2>
            <pre>async function pobierz() {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
}</pre>

            <h2>Pełna obsługa błędów</h2>
            <pre>async function pobierz(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(\`HTTP \${response.status}\`);
        }

        return await response.json();
    } catch (error) {
        console.error('Błąd:', error.message);
        throw error;
    } finally {
        hideLoader(); // Zawsze ukryj loader!
    }
}</pre>

            <h2>Pamiętaj o finally!</h2>
            <p>Blok <code>finally</code> wykona się zawsze - idealny do ukrywania loaderów i odblokowywania przycisków.</p>
        `,
        category: 'javascript',
        emoji: '🌐',
        date: '2026-05-05',
        readTime: 8,
        tags: ['JavaScript', 'Fetch', 'API', 'Async']
    },
    {
        id: 6,
        title: 'VS Code - niezbędne rozszerzenia',
        excerpt: 'Zestawienie rozszerzeń które zwiększą Twoją produktywność jako web developer. Live Server, Prettier i inne.',
        content: `
            <h2>Live Server</h2>
            <p>Automatycznie odświeża stronę po każdym zapisie. Absolutny must-have! Autor: Ritwick Dey.</p>

            <h2>Prettier</h2>
            <p>Automatyczne formatowanie kodu. Nigdy więcej martwienia się o wcięcia i spacje. Skonfiguruj "format on save" i zapomnij o bałaganie w kodzie.</p>

            <h2>GitLens</h2>
            <p>Pokazuje kto i kiedy zmienił każdą linię kodu. Niezbędne przy pracy zespołowej.</p>

            <h2>Auto Rename Tag</h2>
            <p>Zmienasz otwierający tag HTML? Zamykający zmieni się automatycznie. Oszczędność czasu!</p>

            <h2>CSS Peek</h2>
            <p>Kliknij na klasę CSS w HTML i przejdź bezpośrednio do definicji stylu. Koniec z szukaniem.</p>

            <h2>Skróty klawiaturowe warte poznania</h2>
            <pre>Ctrl+D          → zaznacz kolejne wystąpienie
Alt+klik        → wiele kursorów
Ctrl+Shift+P    → paleta poleceń
Ctrl+/          → komentarz
Alt+↑↓          → przesuń linię</pre>
        `,
        category: 'narzedzia',
        emoji: '⚙️',
        date: '2026-05-07',
        readTime: 3,
        tags: ['VS Code', 'Narzędzia', 'Produktywność']
    }
];