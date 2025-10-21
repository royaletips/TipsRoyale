document.addEventListener('DOMContentLoaded', () => {
    // === Selektory DOM (Dodane/Zmodyfikowane) ===
    const accountPanelBtn = document.getElementById('account-panel-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const loginDataForm = document.getElementById('login-data-form');
    const registerDataForm = document.getElementById('register-data-form');
    
    // Elementy Modalne
    const accountModal = document.getElementById('account-modal');
    const closeModalBtn = document.querySelector('.close-btn');

    // Elementy wewnątrz Modala
    const welcomeUserSpan = document.getElementById('welcome-user');
    const displayUsername = document.getElementById('display-username');
    const userTipsCountSpan = document.getElementById('user-tips-count');
    const userDescriptionDisplay = document.getElementById('user-description-display'); // NOWY
    const myTipsList = document.getElementById('my-tips-list');
    const createTipArea = document.getElementById('create-tip-area');
    const myTipsArea = document.getElementById('my-tips-area');
    const editProfileArea = document.getElementById('edit-profile-area'); // NOWY
    
    const showCreateTipBtn = document.getElementById('show-create-tip-btn');
    const showMyTipsBtn = document.getElementById('show-my-tips-btn');
    const showEditProfileBtn = document.getElementById('show-edit-profile-btn'); // NOWY
    
    const editProfileForm = document.getElementById('edit-profile-form'); // NOWY
    const editDescriptionInput = document.getElementById('edit-description'); // NOWY

    // Elementy Wyszukiwania
    const mainTipSearchInput = document.getElementById('main-tip-search-input'); // NOWY
    const mainSearchBtn = document.getElementById('main-search-btn'); // NOWY
    const allTipsList = document.getElementById('all-tips-list');
    
    // Stare elementy formularzy
    const loginFormSection = document.getElementById('login-form');
    const registerFormSection = document.getElementById('register-form');


    // === Zmienne Stanu (Symulacja Danych) ===
    let currentUser = null; 
    let communityTips = [
        // Tipy z HTML są tutaj symulowane w JS
        { title: 'Szybkie Przeciwstawienie Lavy', content: 'Zawsze miej Inferno Dragon lub P.E.K.K.A. gotowe na Lavę. Użyj Tego samego (ID/Pekka) na Tank (Lava) i dodaj Zap na support (np. Minions).', category: 'combat', author: 'ProGamerPL' },
        { title: '3-Crown Risk', content: 'W końcówce, jeśli masz przewagę HP na wieżach, nie spiesz się z atakiem. Czekaj na błąd przeciwnika, aby wygrać na przewagę Eliksiru i 1 koronę, zamiast ryzykować kontrę na 3 korony.', category: 'economy', author: 'KingSlayer' }
    ];

    // === Funkcje UI ===

    function hideAllForms() {
        loginFormSection.style.display = 'none';
        registerFormSection.style.display = 'none';
        // Panel konta jest teraz w osobnym modalnym oknie, więc nie jest tu ukrywany
    }
    
    function hideAllPanelAreas() { // NOWA FUNKCJA
        createTipArea.style.display = 'none';
        myTipsArea.style.display = 'none';
        editProfileArea.style.display = 'none';
    }

    function updateHeaderButtons() {
        if (currentUser) {
            document.getElementById('show-register-btn').style.display = 'none';
            document.getElementById('show-login-btn').style.display = 'none';
            accountPanelBtn.style.display = 'inline-block';
            logoutBtn.style.display = 'inline-block';
            
            // Aktualizacja danych w Modalu
            welcomeUserSpan.textContent = currentUser.username;
            displayUsername.textContent = currentUser.username;
            userTipsCountSpan.textContent = currentUser.tips.length;
            userDescriptionDisplay.textContent = currentUser.description || 'Brak opisu';
        } else {
            document.getElementById('show-register-btn').style.display = 'inline-block';
            document.getElementById('show-login-btn').style.display = 'inline-block';
            accountPanelBtn.style.display = 'none';
            logoutBtn.style.display = 'none';
            accountModal.style.display = 'none'; // Upewnienie się, że Modal jest zamknięty
        }
    }

    function renderTips(tips, targetElement) {
        targetElement.innerHTML = ''; 
        // Implementacja renderowania Tipów (jak w poprzedniej wersji)
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

    // === Obsługa Zdarzeń Autoryzacji ===

    // Rejestracja (symulacja)
    document.getElementById('show-register-btn').addEventListener('click', () => {
        hideAllForms();
        document.getElementById('register-form').style.display = 'block';
    });

    registerDataForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('register-username').value;
        
        currentUser = { 
            username: username, 
            tips: [], 
            description: '', // NOWY: pusty opis
            joinDate: new Date().toLocaleDateString('pl-PL') 
        };
        
        document.getElementById('register-message').textContent = `Udało się! Konto ${username} założone. Zalogowano automatycznie.`;
        
        setTimeout(() => {
            hideAllForms();
            accountModal.style.display = 'block'; // Otwarcie Modala po rejestracji
            updateHeaderButtons();
            document.getElementById('register-message').textContent = '';
        }, 1500);
    });

    // Logowanie (symulacja)
    document.getElementById('show-login-btn').addEventListener('click', () => {
        hideAllForms();
        document.getElementById('login-form').style.display = 'block';
    });

    loginDataForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        
        currentUser = { 
            username: email.split('@')[0], 
            tips: [], 
            description: 'Jestem doświadczonym graczem kontrolnym.', // Symulowany opis
            joinDate: new Date(Date.now() - 86400000).toLocaleDateString('pl-PL')
        }; 
        
        communityTips.filter(tip => tip.author === currentUser.username).forEach(tip => currentUser.tips.push(tip));

        hideAllForms();
        accountModal.style.display = 'block'; // Otwarcie Modala po zalogowaniu
        updateHeaderButtons();
    });

    // Wylogowanie
    logoutBtn.addEventListener('click', () => {
        currentUser = null;
        hideAllForms();
        updateHeaderButtons();
        alert('Wylogowano pomyślnie.');
    });

    // === Obsługa Modala i Panelu Konta ===

    // Otwórz Modal
    accountPanelBtn.addEventListener('click', () => {
        if (currentUser) {
            accountModal.style.display = 'block';
            hideAllPanelAreas(); // Ukryj wszystkie podsekcje przy otwarciu
            updateHeaderButtons(); // Upewnij się, że dane w modalu są aktualne
        }
    });

    // Zamknij Modal (przycisk X)
    closeModalBtn.addEventListener('click', () => {
        accountModal.style.display = 'none';
    });

    // Zamknij Modal (kliknięcie poza oknem)
    window.addEventListener('click', (event) => {
        if (event.target === accountModal) {
            accountModal.style.display = 'none';
        }
    });
    
    // === Podsekcje Panelu Konta ===
    
    // 1. Pokaż tworzenie Tipa
    showCreateTipBtn.addEventListener('click', () => {
        hideAllPanelAreas();
        createTipArea.style.display = 'block';
    });

    // 2. Pokaż Moje Tipy
    showMyTipsBtn.addEventListener('click', () => {
        if (!currentUser) return;
        hideAllPanelAreas();
        myTipsArea.style.display = 'block';
        renderTips(currentUser.tips, myTipsList);
    });
    
    // 3. Pokaż Edycję Profilu (NOWY)
    showEditProfileBtn.addEventListener('click', () => {
        if (!currentUser) return;
        hideAllPanelAreas();
        editProfileArea.style.display = 'block';
        // Wypełnij pole edycji aktualnym opisem
        editDescriptionInput.value = currentUser.description || '';
    });
    
    // 4. Zapis Edycji Profilu (NOWY)
    editProfileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!currentUser) return;
        
        const newDescription = editDescriptionInput.value.trim();
        currentUser.description = newDescription;
        
        alert('Opis konta został zaktualizowany (lokalnie).');
        updateHeaderButtons(); // Odświeżenie wyświetlania opisu
        hideAllPanelAreas(); // Ukrycie formularza po zapisie
    });

    // === Tworzenie Tipów (jak w poprzedniej wersji) ===
    document.getElementById('create-tip-form').addEventListener('submit', (e) => {
        e.preventDefault();
        if (!currentUser) return alert("Musisz być zalogowany, aby dodać tipa.");

        const newTip = {
            title: document.getElementById('tip-title').value,
            category: document.getElementById('tip-category').value,
            content: document.getElementById('tip-content').value,
            author: currentUser.username,
            id: Date.now() 
        };

        currentUser.tips.push(newTip);
        communityTips.push(newTip); 
        updateHeaderButtons();
        document.getElementById('create-tip-form').reset();
        alert(`Tip "${newTip.title}" został opublikowany!`);
        hideAllPanelAreas();
    });
    
    // === Globalne Wyszukiwanie Tipów (NOWY) ===
    const performSearch = () => {
        const query = (mainTipSearchInput.value || '').toLowerCase();
        
        const filteredTips = communityTips.filter(tip => 
            tip.title.toLowerCase().includes(query) ||
            tip.content.toLowerCase().includes(query) ||
            tip.author.toLowerCase().includes(query) ||
            tip.category.toLowerCase().includes(query)
        );
        
        renderTips(filteredTips, allTipsList);
        
        // Przewiń do sekcji z wynikami
        document.getElementById('tips-management').scrollIntoView({ behavior: 'smooth' });
    };

    mainSearchBtn.addEventListener('click', performSearch);
    
    mainTipSearchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Domyślne ładowanie wszystkich tipów na start
    renderTips(communityTips, allTipsList);

    // Inicjalizacja stanu przy ładowaniu strony
    updateHeaderButtons();
});
