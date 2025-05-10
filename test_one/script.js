document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const searchBtn = document.getElementById('search-btn');
    const searchExpandable = document.getElementById('search-expandable');
    const closeSearch = document.querySelector('.close-search');
    const searchInput = document.getElementById('search-input');
    
    const notificationsBtn = document.getElementById('notifications-btn');
    const notificationsDropdown = document.getElementById('notifications-dropdown');
    
    const helpBtn = document.getElementById('help-btn');
    const helpDrawer = document.getElementById('help-drawer');
    const closeHelpDrawer = document.querySelector('.close-drawer');
    
    const settingsBtn = document.getElementById('settings-btn');
    const settingsModal = document.getElementById('settings-modal');
    const closeSettingsModal = document.querySelector('.close-modal');
    
    const themeButtons = document.querySelectorAll('.theme-btn');
    
    const newItemBtn = document.getElementById('new-item-btn');
    const newItemsMenu = document.getElementById('new-items-menu');
    
    const collapseAllBtn = document.getElementById('collapse-all-btn');
    const chatSections = document.querySelectorAll('.chat-section');
    const sectionToggles = document.querySelectorAll('.section-toggle');
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    const chatItems = document.querySelectorAll('.chat-item');
    const emptyState = document.getElementById('empty-state');
    const activeChat = document.getElementById('active-chat');
    const backBtn = document.getElementById('back-btn');
    
    const chatMenuBtns = document.querySelectorAll('.chat-menu-btn');
    const chatContextMenu = document.getElementById('chat-context-menu');
    const moveToSubmenu = document.getElementById('move-to-submenu');
    
    const chatUser = document.querySelector('.chat-user');
    const profileDrawer = document.getElementById('profile-drawer');
    const closeProfileDrawer = document.getElementById('close-profile');
    
    const emojiBtn = document.getElementById('emoji-btn');
    const emojiPicker = document.getElementById('emoji-picker');
    const emojis = document.querySelectorAll('.emoji');
    const messageInput = document.getElementById('message-input');
    
    const sendBtn = document.getElementById('send-btn');
    const chatMessages = document.getElementById('chat-messages');
    
    const voiceCallBtn = document.getElementById('voice-call-btn');
    const videoCallBtn = document.getElementById('video-call-btn');
    const callActions = document.getElementById('call-actions');
    const endCallBtn = document.getElementById('end-call-btn');
    
    const mediaTabs = document.querySelectorAll('.media-tab');
    
    // Search functionality
    searchBtn.addEventListener('click', function() {
        searchExpandable.classList.add('show');
        searchInput.focus();
    });
    
    closeSearch.addEventListener('click', function() {
        searchExpandable.classList.remove('show');
    });
    
    searchInput.addEventListener('input', debounce(function() {
        // Simulate search results
        const searchResults = document.getElementById('search-results');
        const query = searchInput.value.trim().toLowerCase();
        
        if (query.length > 0) {
            // Simulate search results
            searchResults.innerHTML = '';
            
            chatItems.forEach(item => {
                const name = item.querySelector('.chat-name').textContent.toLowerCase();
                const preview = item.querySelector('.chat-preview').textContent.toLowerCase();
                
                if (name.includes(query) || preview.includes(query)) {
                    const clone = item.cloneNode(true);
                    searchResults.appendChild(clone);
                }
            });
            
            if (searchResults.children.length === 0) {
                searchResults.innerHTML = '<div class="no-results">No results found</div>';
            }
        } else {
            searchResults.innerHTML = '';
        }
    }, 300));
    
    // Notifications dropdown
    notificationsBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        notificationsDropdown.classList.toggle('show');
        
        // Close other dropdowns
        newItemsMenu.classList.remove('show');
        helpDrawer.classList.remove('show');
        settingsModal.classList.remove('show');
        profileDrawer.classList.remove('show');
        emojiPicker.classList.remove('show');
    });
    
    // Help drawer
    helpBtn.addEventListener('click', function() {
        helpDrawer.classList.add('show');
        
        // Close other dropdowns
        notificationsDropdown.classList.remove('show');
        newItemsMenu.classList.remove('show');
        settingsModal.classList.remove('show');
        profileDrawer.classList.remove('show');
        emojiPicker.classList.remove('show');
    });
    
    closeHelpDrawer.addEventListener('click', function() {
        helpDrawer.classList.remove('show');
    });
    
    // Settings modal
    settingsBtn.addEventListener('click', function() {
        settingsModal.classList.add('show');
        
        // Close other dropdowns
        notificationsDropdown.classList.remove('show');
        newItemsMenu.classList.remove('show');
        helpDrawer.classList.remove('show');
        profileDrawer.classList.remove('show');
        emojiPicker.classList.remove('show');
    });
    
    closeSettingsModal.addEventListener('click', function() {
        settingsModal.classList.remove('show');
    });
    
    // Theme toggle
    themeButtons.forEach(button => {
        button.addEventListener('click', function() {
            themeButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            if (this.dataset.theme === 'dark') {
                document.body.classList.add('dark-theme');
            } else {
                document.body.classList.remove('dark-theme');
            }
        });
    });
    
    // New item dropdown
    newItemBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        newItemsMenu.classList.toggle('show');
        
        // Close other dropdowns
        notificationsDropdown.classList.remove('show');
        helpDrawer.classList.remove('show');
        settingsModal.classList.remove('show');
        profileDrawer.classList.remove('show');
        emojiPicker.classList.remove('show');
    });
    
    // Collapse all sections
    collapseAllBtn.addEventListener('click', function() {
        chatSections.forEach(section => {
            section.classList.toggle('collapsed');
        });
    });
    
    // Section toggles
    sectionToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const section = this.closest('.chat-section');
            section.classList.toggle('collapsed');
        });
    });
    
    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            // Implement filtering logic here
            console.log('Filter selected:', filter);
        });
    });
    
    // Chat items
    chatItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (e.target.closest('.chat-menu-btn')) {
                return; // Don't open chat if menu button is clicked
            }
            
            chatItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // Show active chat
            emptyState.style.display = 'none';
            activeChat.classList.add('show');
            
            // On mobile, show back button
            if (window.innerWidth < 768) {
                backBtn.style.display = 'flex';
                document.querySelector('.chat-sidebar').style.display = 'none';
            }
        });
    });
    
    // Back button
    backBtn.addEventListener('click', function() {
        activeChat.classList.remove('show');
        emptyState.style.display = 'flex';
        
        if (window.innerWidth < 768) {
            document.querySelector('.chat-sidebar').style.display = 'block';
        }
    });
    
    // Chat menu buttons
    chatMenuBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const rect = this.getBoundingClientRect();
            chatContextMenu.style.top = `${rect.bottom + 5}px`;
            chatContextMenu.style.left = `${rect.left - 180}px`;
            chatContextMenu.classList.add('show');
            
            // Store the chat item for context menu actions
            chatContextMenu.dataset.chatId = this.closest('.chat-item').dataset.chatId;
            
            // Close other dropdowns
            moveToSubmenu.classList.remove('show');
        });
    });
    
    // Context menu items
    document.querySelectorAll('.context-menu-item').forEach(item => {
        item.addEventListener('click', function() {
            const action = this.dataset.action;
            const chatId = chatContextMenu.dataset.chatId;
            
            if (action === 'move-to') {
                const rect = this.getBoundingClientRect();
                moveToSubmenu.style.top = `${rect.top}px`;
                moveToSubmenu.style.left = `${rect.right + 5}px`;
                moveToSubmenu.classList.add('show');
            } else {
                // Handle other actions
                console.log(`Action: ${action}, Chat ID: ${chatId}`);
                chatContextMenu.classList.remove('show');
                moveToSubmenu.classList.remove('show');
            }
        });
    });
    
    // Profile drawer
    chatUser.addEventListener('click', function() {
        profileDrawer.classList.add('show');
        
        // Close other dropdowns
        notificationsDropdown.classList.remove('show');
        newItemsMenu.classList.remove('show');
        helpDrawer.classList.remove('show');
        settingsModal.classList.remove('show');
        emojiPicker.classList.remove('show');
    });
    
    closeProfileDrawer.addEventListener('click', function() {
        profileDrawer.classList.remove('show');
    });
    
    // Emoji picker
    emojiBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        emojiPicker.classList.toggle('show');
        
        // Position the emoji picker
        const rect = this.getBoundingClientRect();
        emojiPicker.style.bottom = `${window.innerHeight - rect.top + 10}px`;
        emojiPicker.style.right = `${window.innerWidth - rect.right + 30}px`;
        
        // Close other dropdowns
        notificationsDropdown.classList.remove('show');
        newItemsMenu.classList.remove('show');
        helpDrawer.classList.remove('show');
        settingsModal.classList.remove('show');
        profileDrawer.classList.remove('show');
    });
    
    // Emoji selection
    emojis.forEach(emoji => {
        emoji.addEventListener('click', function() {
            const emojiChar = this.dataset.emoji;
            messageInput.value += emojiChar;
            messageInput.focus();
        });
    });
    
    // Send message
    sendBtn.addEventListener('click', sendMessage);
    
    messageInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    function sendMessage() {
        const message = messageInput.value.trim();
        
        if (message) {
            // Create message element
            const messageElement = document.createElement('div');
            messageElement.className = 'message outgoing';
            
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const time = `${hours}:${minutes}`;
            
            messageElement.innerHTML = `
                <div class="message-content">
                    <div class="message-bubble">
                        <p>${message}</p>
                    </div>
                    <div class="message-time">${time}</div>
                </div>
            `;
            
            chatMessages.appendChild(messageElement);
            
            // Clear input
            messageInput.value = '';
            
            // Scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Simulate reply after 1 second
            setTimeout(() => {
                const replyElement = document.createElement('div');
                replyElement.className = 'message incoming';
                
                replyElement.innerHTML = `
                    <div class="message-avatar">
                        <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Bharathi Ragav">
                    </div>
                    <div class="message-content">
                        <div class="message-bubble">
                            <p>Can't wait for the weekend!</p>
                        </div>
                        <div class="message-time">${time}</div>
                    </div>
                `;
                
                chatMessages.appendChild(replyElement);
                
                // Scroll to bottom
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        }
    }
    
    // Call functionality
    voiceCallBtn.addEventListener('click', function() {
        callActions.style.display = 'flex';
    });
    
    videoCallBtn.addEventListener('click', function() {
        callActions.style.display = 'flex';
    });
    
    endCallBtn.addEventListener('click', function() {
        callActions.style.display = 'none';
    });
    
    // Media tabs
    mediaTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            mediaTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const tabId = this.dataset.tab;
            document.querySelectorAll('.media-content').forEach(content => {
                content.classList.remove('active');
            });
            
            document.getElementById(`${tabId}-content`).classList.add('active');
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('#notifications-dropdown') && !e.target.closest('#notifications-btn')) {
            notificationsDropdown.classList.remove('show');
        }
        
        if (!e.target.closest('#new-items-menu') && !e.target.closest('#new-item-btn')) {
            newItemsMenu.classList.remove('show');
        }
        
        if (!e.target.closest('#chat-context-menu') && !e.target.closest('.chat-menu-btn')) {
            chatContextMenu.classList.remove('show');
        }
        
        if (!e.target.closest('#move-to-submenu') && !e.target.closest('[data-action="move-to"]')) {
            moveToSubmenu.classList.remove('show');
        }
        
        if (!e.target.closest('#emoji-picker') && !e.target.closest('#emoji-btn')) {
            emojiPicker.classList.remove('show');
        }
    });
    
    // Responsive adjustments
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            document.querySelector('.chat-sidebar').style.display = 'block';
            backBtn.style.display = 'none';
        } else {
            if (activeChat.classList.contains('show')) {
                document.querySelector('.chat-sidebar').style.display = 'none';
                backBtn.style.display = 'flex';
            }
        }
    });
    
    // Initialize
    if (window.innerWidth < 768) {
        backBtn.style.display = 'flex';
    }
    
    // Utility functions
    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }
});