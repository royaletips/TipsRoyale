document.addEventListener('DOMContentLoaded', () => {
    // === Selektory DOM ===
    const showRegisterBtn = document.getElementById('show-register-btn');
    const showLoginBtn = document.getElementById('show-login-btn');
    const accountPanelBtn = document.getElementById('account-panel-btn');
    const logoutBtn = document.getElementById('logout-btn');

    const loginFormSection = document.getElementById('login-form');
    const registerFormSection = document.getElementById('register-form');
    const accountPanelSection = document.getElementById('account-panel');

    const loginDataForm = document.getElementById('login-data-form');
    const registerDataForm = document.getElementById('register-data-form');
    const createTipForm = document.getElementById('create-tip-form');

    const welcomeUserSpan = document.getElementById('welcome-user');
    const userTipsCountSpan = document.getElementById('user-tips-count');
    const myTipsList = document.getElementById('my-tips-list');
    const tipSearchInput = document.getElementById('tip-search-input');
    const searchTipsBtn = document.getElementById('search-tips-btn');
    const allTipsList = document.getElementById('all-tips-list');

    const showCreateTipBtn = document.getElementById('show-create-tip-btn');
    const showMyTipsBtn = document.getElementById('show-my-tips-btn');
    const createTipArea = document.getElementById('create-tip-area');
    const myTipsArea = document.getElementById('my-tips-area');

    // === Zmienne Stanu (Symulacja Danych) ===
    let currentUser = null; // Przechowuje zalogowanego użytkownika { username: '...', tips: [] }
    let communityTips = [
        // Tipy z HTML są tutaj symulowane w JS
        { title: 'Szybkie Przeciwstawienie Lavy', content: 'Zawsze miej Inferno Dragon lub P.E.K.K.A. gotowe na Lavę. Użyj Tego samego (ID/Pekka) na Tank (Lava) i dodaj Zap na support (np. Minions).', category: 'combat', author: 'ProGamerPL' },
        { title: '3-Crown Risk', content: 'W końcówce, jeśli masz przewagę HP na wieżach, nie spiesz się z atakiem. Czekaj na błąd przeciwnika, aby wygrać na przewagę Eliksiru i 1 koronę, zamiast ryzykować kontrę na 3 korony.', category: 'economy', author: 'KingSlayer' }
    ];

    // === Funkcje UI ===

    function hideAllForms() {
        loginFormSection.style.display = 'none';
        registerFormSection.style.display = 'none';
        accountPanelSection.style.display = 'none';
    }

    function updateHeaderButtons() {
        if (currentUser) {
            showRegisterBtn.style.display = 'none';
            showLoginBtn.style.display = 'none';
            accountPanelBtn.style.display = 'inline-block';
            logoutBtn.style.display = 'inline-block';
            welcomeUserSpan.textContent = currentUser.username;
            userTipsCountSpan.textContent = currentUser.tips.length;
        } else {
            showRegisterBtn.style.display = 'inline-block';
            showLoginBtn.style.display = 'inline-block';
            accountPanelBtn.style.display = 'none';
            logoutBtn.style.display = 'none';
        }
    }

    function renderTips(tips, targetElement) {
        targetElement.innerHTML = ''; // Czyści listę
        
        if (targetElement.id === 'all-tips-list') {
             targetElement.classList.add('tip-grid');
        } else {
             targetElement.classList.remove('tip-grid');
        }

        if (tips.length === 0) {
            targetElement.innerHTML = `<p style="text-align: center; font-style: italic;">Brak tipów do wyświetlenia.</p>`;
            return;
        }

        tips.forEach(tip => {
            const tipEl = document.createElement('div');
            tipEl.className = 'tip-item community-tip';
            tipEl.setAttribute('data-category', tip.category);
            tipEl.innerHTML = `
                <h3>${tip.title}</h3>
                <p>${tip.content.substring(0, 100)}...</p>
                <small>Kategoria: ${tip.category} | Autor: ${tip.author}</small>
            `;
            targetElement.appendChild(tipEl);
        });
    }

    // === Obsługa Zdarzeń ===

    // 1. Rejestracja (tylko symulacja)
    showRegisterBtn.addEventListener('click', () => {
        hideAllForms();
        registerFormSection.style.display = 'block';
    });

    registerDataForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('register-username').value;
        // W prawdziwej aplikacji: zapis do bazy danych
        
        currentUser = { 
            username: username, 
            tips: [], 
            joinDate: new Date().toLocaleDateString('pl-PL') 
        };
        
        document.getElementById('register-message').textContent = `Udało się! Konto ${username} założone. Zalogowano automatycznie.`;
        document.getElementById('join-date').textContent = currentUser.joinDate;
        
        // Przejście do Panelu Konta
        setTimeout(() => {
            hideAllForms();
            accountPanelSection.style.display = 'block';
            updateHeaderButtons();
            document.getElementById('register-message').textContent = '';
        }, 1500);
    });

    // 2. Logowanie (tylko symulacja)
    showLoginBtn.addEventListener('click', () => {
        hideAllForms();
        loginFormSection.style.display = 'block';
    });

    loginDataForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        // W prawdziwej aplikacji: weryfikacja hasła
        
        // Symulacja udanego logowania
        currentUser = { 
            username: email.split('@')[0], // Używamy części emaila jako nazwy
            tips: [], // Prawdziwe dane byłyby pobrane z bazy
            joinDate: new Date(Date.now() - 86400000).toLocaleDateString('pl-PL') // Symulowana data
        }; 
        
        // Zostawiamy istniejące tipy (jeśli użytkownik je dodał)
        communityTips.filter(tip => tip.author === currentUser.username).forEach(tip => currentUser.tips.push(tip));

        hideAllForms();
        accountPanelSection.style.display = 'block';
        updateHeaderButtons();
        document.getElementById('join-date').textContent = currentUser.joinDate;
    });

    // 3. Wylogowanie
    logoutBtn.addEventListener('click', () => {
        currentUser = null;
        hideAllForms();
        updateHeaderButtons();
        alert('Wylogowano pomyślnie.');
    });

    // 4. Panel Konta
    accountPanelBtn.addEventListener('click', () => {
        hideAllForms();
        accountPanelSection.style.display = 'block';
        // Zapewnienie ukrycia podsekcji przy otwarciu panelu
        createTipArea.style.display = 'none';
        myTipsArea.style.display = 'none';
        updateHeaderButtons();
    });

    // 5. Tworzenie Tipów
    showCreateTipBtn.addEventListener('click', () => {
        myTipsArea.style.display = 'none';
        createTipArea.style.display = 'block';
    });

    createTipForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!currentUser) return alert("Musisz być zalogowany, aby dodać tipa.");

        const newTip = {
            title: document.getElementById('tip-title').value,
            category: document.getElementById('tip-category').value,
            content: document.getElementById('tip-content').value,
            author: currentUser.username,
            id: Date.now() // Prosta symulacja ID
        };

        currentUser.tips.push(newTip);
        communityTips.push(newTip); // Dodanie do listy wszystkich tipów
        updateHeaderButtons();
        createTipForm.reset();
        alert(`Tip "${newTip.title}" został opublikowany!`);
        createTipArea.style.display = 'none'; // Ukrycie formularza
    });
    
    // 6. Pokazywanie Moich Tipów
    showMyTipsBtn.addEventListener('click', () => {
        if (!currentUser) return;
        createTipArea.style.display = 'none';
        myTipsArea.style.display = 'block';
        // Renderowanie tipów zalogowanego użytkownika
        renderTips(currentUser.tips.map(tip => ({ 
            ...tip, 
            content: tip.content 
        })), myTipsList); // Dodanie mapowania, żeby renderTips działał na ul/div
    });
    
    // 7. Wyszukiwanie Tipów Społeczności
    searchTipsBtn.addEventListener('click', () => {
        const query = tipSearchInput.value.toLowerCase();
        
        const filteredTips = communityTips.filter(tip => 
            tip.title.toLowerCase().includes(query) ||
            tip.content.toLowerCase().includes(query) ||
            tip.author.toLowerCase().includes(query) ||
            tip.category.toLowerCase().includes(query)
        );
        
        renderTips(filteredTips, allTipsList);
    });

    // Domyślne ładowanie wszystkich tipów na start
    renderTips(communityTips, allTipsList);

    // Inicjalizacja stanu przy ładowaniu strony
    updateHeaderButtons();
});
