document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const chatItems = document.querySelectorAll('.chat-item');
    const welcomeScreen = document.querySelector('.welcome-screen');
    const activeChat = document.querySelector('.active-chat');
    const profileDrawer = document.querySelector('.profile-drawer');
    const chatHeaderUser = document.querySelector('.chat-header-user');
    const closeProfile = document.querySelector('.close-profile');
    const searchInput = document.querySelector('.search-input');
    const searchResults = document.querySelector('.search-results');
    const collapseButton = document.querySelector('.collapse-button');
    const sectionHeaders = document.querySelectorAll('.section-header');
    const chatContextMenu = document.querySelector('.chat-context-menu');
    const sectionContextMenu = document.querySelector('.section-context-menu');
    const messageContextMenu = document.querySelector('.message-context-menu');
    const messages = document.querySelectorAll('.message');
    const chatInput = document.querySelector('.chat-input input');
    const sendBtn = document.querySelector('.send-btn');
    const voiceCallBtn = document.querySelector('.voice-call-btn');
    const videoCallBtn = document.querySelector('.video-call-btn');
    const callUI = document.querySelector('.call-ui');
    const videoCallUI = document.querySelector('.video-call-ui');
    const incomingCallUI = document.querySelector('.incoming-call-ui');
    const endCallBtn = document.querySelectorAll('.end-call-btn');
    const declineCallBtn = document.querySelector('.decline-call-btn');
    const acceptCallBtn = document.querySelector('.accept-call-btn');
    const acceptVideoCallBtn = document.querySelector('.accept-video-call-btn');
    const minimizeCall = document.querySelectorAll('.minimize-call');
    const newItemsDropdown = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const newChatModal = document.querySelector('.new-chat-modal');
    const newGroupModal = document.querySelector('.new-group-modal');
    const newSectionModal = document.querySelector('.new-section-modal');
    const renameSectionModal = document.querySelector('.rename-section-modal');
    const deleteSectionModal = document.querySelector('.delete-section-modal');
    const forwardMessageModal = document.querySelector('.forward-message-modal');
    const closeModals = document.querySelectorAll('.close-modal');
    const cancelBtns = document.querySelectorAll('.cancel-btn');
    const createBtns = document.querySelectorAll('.create-btn');
    const renameSectionBtn = document.querySelector('.rename-btn');
    const confirmDeleteBtn = document.querySelector('.confirm-delete-btn');
    const forwardBtn = document.querySelector('.forward-btn');
    const addUserBtns = document.querySelectorAll('.add-user-btn');
    const selectedUserList = document.querySelector('.selected-user-list');
    const seeMoreBtns = document.querySelectorAll('.see-more button');
    const chatSidebar = document.querySelector('.chat-sidebar');
    const chatHeaderBack = document.querySelector('.chat-header-back');
    const mobileFab = document.querySelector('.fab-main');
    const fabOptions = document.querySelector('.fab-options');
    const navButtons = document.querySelectorAll('.nav-button');
    const typingIndicator = document.querySelector('.typing-indicator');
    const attachmentBtn = document.querySelector('.attachment-btn');
    const attachmentOptions = document.querySelector('.attachment-options');
    const emojiBtn = document.querySelector('.emoji-btn');
    const emojiPicker = document.querySelector('.emoji-picker');
    const emojiItems = document.querySelectorAll('.emoji-item');
    const voiceInputBtn = document.querySelector('.voice-input-btn');
    const voiceRecordingUI = document.querySelector('.voice-recording-ui');
    const cancelRecordingBtn = document.querySelector('.cancel-recording-btn');
    const stopRecordingBtn = document.querySelector('.stop-recording-btn');
    const sendRecordingBtn = document.querySelector('.send-recording-btn');
    const recordingTimer = document.querySelector('.recording-timer');
    const reactionPanel = document.querySelector('.reaction-panel');
    const reactionEmojis = document.querySelectorAll('.reaction-emoji');
    const replyContainer = document.querySelector('.reply-container');
    const cancelReplyBtn = document.querySelector('.cancel-reply-btn');
    const messageActionBtns = document.querySelectorAll('.message-action-btn');
    const chatBtn = document.querySelector('.chat-btn');
    const chatOverlay = document.querySelector('.chat-overlay');
    const screenShareBtn = document.querySelector('.screen-share-btn');
    const sectionMenuTriggers = document.querySelectorAll('.section-menu-trigger');
    const chatMenuTriggers = document.querySelectorAll('.chat-menu-trigger');

    // Theme Toggle
    if (themeToggle) {
        themeToggle.addEventListener('change', function() {
            if (this.checked) {
                body.classList.add('dark-theme');
                localStorage.setItem('theme', 'dark');
            } else {
                body.classList.remove('dark-theme');
                localStorage.setItem('theme', 'light');
            }
        });
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            themeToggle.checked = true;
            body.classList.add('dark-theme');
        }
    }

    // Chat Item Click
    chatItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Prevent click if ellipsis is clicked
            if (e.target.classList.contains('fa-ellipsis-v')) {
                return;
            }
            
            // Remove active class from all chat items
            chatItems.forEach(chat => chat.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Hide welcome screen and show active chat
            if (welcomeScreen) welcomeScreen.classList.add('hidden');
            if (activeChat) activeChat.classList.remove('hidden');
            
            // Update chat header with user info
            const userName = this.querySelector('.chat-name').textContent;
            const userImg = this.querySelector('img').src;
            
            const chatHeaderName = document.querySelector('.chat-header-name');
            const chatHeaderImg = document.querySelector('.chat-header-user img');
            
            if (chatHeaderName) chatHeaderName.textContent = userName;
            if (chatHeaderImg) chatHeaderImg.src = userImg;
            
            // On mobile, hide sidebar after selecting a chat
            if (window.innerWidth <= 768) {
                chatSidebar.classList.remove('active');
            }
            
            // Simulate typing indicator
            simulateTyping();
        });
    });

    // Chat Menu Triggers
    chatMenuTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Position and show context menu
            chatContextMenu.style.top = `${e.pageY}px`;
            chatContextMenu.style.left = `${e.pageX}px`;
            chatContextMenu.classList.remove('hidden');
            
            // Hide menu when clicking elsewhere
            document.addEventListener('click', function hideMenu() {
                chatContextMenu.classList.add('hidden');
                document.removeEventListener('click', hideMenu);
            });
        });
    });

    // Section Menu Triggers
    sectionMenuTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const section = this.closest('.chat-section');
            const sectionId = section.dataset.section;
            
            // Position and show context menu
            sectionContextMenu.style.top = `${e.pageY}px`;
            sectionContextMenu.style.left = `${e.pageX}px`;
            sectionContextMenu.classList.remove('hidden');
            
            // Store section ID for rename/delete operations
            document.getElementById('section-to-rename').value = sectionId;
            document.getElementById('section-to-delete').value = sectionId;
            
            // Hide menu when clicking elsewhere
            document.addEventListener('click', function hideMenu() {
                sectionContextMenu.classList.add('hidden');
                document.removeEventListener('click', hideMenu);
            });
        });
    });

    // Chat Header User Click (Show Profile)
    if (chatHeaderUser) {
        chatHeaderUser.addEventListener('click', function() {
            profileDrawer.classList.remove('hidden');
            setTimeout(() => {
                profileDrawer.classList.add('active');
            }, 10);
        });
    }

    // Close Profile
    if (closeProfile) {
        closeProfile.addEventListener('click', function() {
            profileDrawer.classList.remove('active');
            setTimeout(() => {
                profileDrawer.classList.add('hidden');
            }, 300);
        });
    }

    // Search Input
    if (searchInput) {
        searchInput.addEventListener('focus', function() {
            // Simulate search results
            setTimeout(() => {
                searchResults.innerHTML = `
                    <div class="search-item">
                        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User">
                        <div class="search-info">
                            <div class="search-name">Bharathi Ragav</div>
                            <div class="search-message">Last message: Hi! Why did you call?</div>
                        </div>
                    </div>
                    <div class="search-item">
                        <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User">
                        <div class="search-info">
                            <div class="search-name">Senkathir Selvan</div>
                            <div class="search-message">Last message: Hey team! Are we all set for the dashboard UI...</div>
                        </div>
                    </div>
                `;
            }, 300);
        });
        
        // Debounce search
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                // Simulate search filtering
                console.log('Searching for:', this.value);
            }, 300);
        });
        
        // Hide search results when clicking elsewhere
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.style.display = 'none';
            }
        });
    }

    // Collapse All Sections
    if (collapseButton) {
        collapseButton.addEventListener('click', function() {
            const chatLists = document.querySelectorAll('.chat-list');
            chatLists.forEach(list => {
                list.classList.toggle('collapsed');
                if (list.classList.contains('collapsed')) {
                    list.style.display = 'none';
                } else {
                    list.style.display = 'block';
                }
            });
            
            // Update button text
            if (this.textContent.includes('Collapse')) {
                this.innerHTML = '<i class="fas fa-expand-alt"></i> Expand All';
            } else {
                this.innerHTML = '<i class="fas fa-compress-alt"></i> Collapse All';
            }
        });
    }

    // Section Headers (Collapse/Expand)
    sectionHeaders.forEach(header => {
        header.addEventListener('click', function(e) {
            // Ignore if ellipsis is clicked
            if (e.target.classList.contains('fa-ellipsis-v')) {
                return;
            }
            
            const chatList = this.nextElementSibling;
            chatList.classList.toggle('collapsed');
            
            if (chatList.classList.contains('collapsed')) {
                chatList.style.display = 'none';
                this.querySelector('.fa-chevron-down').classList.replace('fa-chevron-down', 'fa-chevron-right');
            } else {
                chatList.style.display = 'block';
                this.querySelector('.fa-chevron-right')?.classList.replace('fa-chevron-right', 'fa-chevron-down');
            }
        });
    });

    // Message Right-click
    messages.forEach(message => {
        message.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            
            // Position and show context menu
            messageContextMenu.style.top = `${e.pageY}px`;
            messageContextMenu.style.left = `${e.pageX}px`;
            messageContextMenu.classList.remove('hidden');
            
            // Store message ID for actions
            const messageId = this.dataset.messageId;
            document.getElementById('message-to-forward')?.setAttribute('value', messageId);
            
            // Hide menu when clicking elsewhere
            document.addEventListener('click', function hideMenu() {
                messageContextMenu.classList.add('hidden');
                document.removeEventListener('click', hideMenu);
            });
        });
        
        // Double-click for emoji reaction
        message.addEventListener('dblclick', function(e) {
            e.preventDefault();
            
            // Position and show reaction panel
            const rect = this.getBoundingClientRect();
            reactionPanel.style.top = `${rect.top - 50}px`;
            reactionPanel.style.left = `${rect.left + rect.width / 2 - 160}px`;
            reactionPanel.classList.remove('hidden');
            
            // Store message ID for reaction
            reactionPanel.dataset.messageId = this.dataset.messageId;
            
            // Hide panel when clicking elsewhere
            document.addEventListener('click', function hidePanel(e) {
                if (!reactionPanel.contains(e.target)) {
                    reactionPanel.classList.add('hidden');
                    document.removeEventListener('click', hidePanel);
                }
            });
        });
    });

    // Message Action Buttons
    messageActionBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const action = this.dataset.action;
            const message = this.closest('.message');
            const messageId = message.dataset.messageId;
            const messageText = message.querySelector('p').textContent;
            
            switch (action) {
                case 'reply':
                    // Show reply container
                    replyContainer.classList.remove('hidden');
                    replyContainer.querySelector('.reply-text').textContent = messageText;
                    replyContainer.dataset.replyTo = messageId;
                    break;
                    
                case 'forward':
                    // Show forward message modal
                    forwardMessageModal.classList.remove('hidden');
                    document.getElementById('forward-message-text').textContent = messageText;
                    document.getElementById('message-to-forward').value = messageId;
                    break;
                    
                case 'pin':
                    // Toggle pin status
                    message.classList.toggle('pinned');
                    if (message.classList.contains('pinned')) {
                        const pinIndicator = document.createElement('div');
                        pinIndicator.className = 'pin-indicator';
                        pinIndicator.innerHTML = '<i class="fas fa-thumbtack"></i>';
                        message.querySelector('.message-content').appendChild(pinIndicator);
                    } else {
                        message.querySelector('.pin-indicator')?.remove();
                    }
                    break;
                    
                case 'delete':
                    // Confirm and delete message
                    if (confirm('Are you sure you want to delete this message?')) {
                        message.style.opacity = '0.5';
                        setTimeout(() => {
                            message.remove();
                        }, 300);
                    }
                    break;
            }
        });
    });

    // Reaction Emojis
    reactionEmojis.forEach(emoji => {
        emoji.addEventListener('click', function() {
            const messageId = reactionPanel.dataset.messageId;
            const message = document.querySelector(`.message[data-message-id="${messageId}"]`);
            const reactionsContainer = message.querySelector('.message-reactions');
            const emojiValue = this.dataset.emoji;
            
            // Check if reaction already exists
            const existingReaction = reactionsContainer.querySelector(`[data-emoji="${emojiValue}"]`);
            
            if (existingReaction) {
                // Increment count
                const countEl = existingReaction.querySelector('.reaction-count');
                let count = parseInt(countEl.textContent);
                countEl.textContent = count + 1;
            } else {
                // Add new reaction
                const reaction = document.createElement('div');
                reaction.className = 'message-reaction';
                reaction.dataset.emoji = emojiValue;
                reaction.innerHTML = `${emojiValue} <span class="reaction-count">1</span>`;
                reactionsContainer.appendChild(reaction);
            }
            
            // Hide reaction panel
            reactionPanel.classList.add('hidden');
        });
    });

    // Cancel Reply
    if (cancelReplyBtn) {
        cancelReplyBtn.addEventListener('click', function() {
            replyContainer.classList.add('hidden');
            replyContainer.dataset.replyTo = '';
        });
    }

    // Chat Input and Send
    if (chatInput && sendBtn) {
        // Send on Enter key
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
        
        // Send button click
        sendBtn.addEventListener('click', sendMessage);
        
        function sendMessage() {
            const messageText = chatInput.value.trim();
            if (messageText) {
                // Check if replying to a message
                const isReply = !replyContainer.classList.contains('hidden');
                let replyHtml = '';
                
                if (isReply) {
                    const replyText = replyContainer.querySelector('.reply-text').textContent;
                    const replySender = replyContainer.querySelector('.reply-sender').textContent;
                    
                    replyHtml = `
                        <div class="reply-preview-in-message">
                            <div class="reply-sender-in-message">${replySender}</div>
                            <div class="reply-text-in-message">${replyText}</div>
                        </div>
                    `;
                    
                    // Hide reply container
                    replyContainer.classList.add('hidden');
                }
                
                // Create new message element
                const messageElement = document.createElement('div');
                messageElement.className = 'message outgoing';
                messageElement.dataset.messageId = Date.now();
                messageElement.innerHTML = `
                    <div class="message-content">
                        ${replyHtml}
                        <p>${messageText}</p>
                        <div class="message-reactions"></div>
                    </div>
                    <div class="message-time">${getCurrentTime()}</div>
                    <div class="message-actions">
                        <button class="message-action-btn" data-action="reply"><i class="fas fa-reply"></i></button>
                        <button class="message-action-btn" data-action="forward"><i class="fas fa-share"></i></button>
                        <button class="message-action-btn" data-action="pin"><i class="fas fa-thumbtack"></i></button>
                        <button class="message-action-btn" data-action="delete"><i class="fas fa-trash"></i></button>
                    </div>
                `;
                
                // Add event listeners to new action buttons
                const actionBtns = messageElement.querySelectorAll('.message-action-btn');
                actionBtns.forEach(btn => {
                    btn.addEventListener('click', function(e) {
                        e.stopPropagation();
                        
                        const action = this.dataset.action;
                        const message = this.closest('.message');
                        const messageId = message.dataset.messageId;
                        const messageText = message.querySelector('p').textContent;
                        
                        switch (action) {
                            case 'reply':
                                replyContainer.classList.remove('hidden');
                                replyContainer.querySelector('.reply-text').textContent = messageText;
                                replyContainer.dataset.replyTo = messageId;
                                break;
                                
                            case 'forward':
                                forwardMessageModal.classList.remove('hidden');
                                document.getElementById('forward-message-text').textContent = messageText;
                                document.getElementById('message-to-forward').value = messageId;
                                break;
                                
                            case 'pin':
                                message.classList.toggle('pinned');
                                if (message.classList.contains('pinned')) {
                                    const pinIndicator = document.createElement('div');
                                    pinIndicator.className = 'pin-indicator';
                                    pinIndicator.innerHTML = '<i class="fas fa-thumbtack"></i>';
                                    message.querySelector('.message-content').appendChild(pinIndicator);
                                } else {
                                    message.querySelector('.pin-indicator')?.remove();
                                }
                                break;
                                
                            case 'delete':
                                if (confirm('Are you sure you want to delete this message?')) {
                                    message.style.opacity = '0.5';
                                    setTimeout(() => {
                                        message.remove();
                                    }, 300);
                                }
                                break;
                        }
                    });
                });
                
                // Double-click for emoji reaction
                messageElement.addEventListener('dblclick', function(e) {
                    e.preventDefault();
                    
                    // Position and show reaction panel
                    const rect = this.getBoundingClientRect();
                    reactionPanel.style.top = `${rect.top - 50}px`;
                    reactionPanel.style.left = `${rect.left + rect.width / 2 - 160}px`;
                    reactionPanel.classList.remove('hidden');
                    
                    // Store message ID for reaction
                    reactionPanel.dataset.messageId = this.dataset.messageId;
                    
                    // Hide panel when clicking elsewhere
                    document.addEventListener('click', function hidePanel(e) {
                        if (!reactionPanel.contains(e.target)) {
                            reactionPanel.classList.add('hidden');
                            document.removeEventListener('click', hidePanel);
                        }
                    });
                });
                
                // Add to chat messages
                const chatMessages = document.querySelector('.chat-messages');
                chatMessages.appendChild(messageElement);
                
                // Clear input
                chatInput.value = '';
                
                // Scroll to bottom
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                // Simulate reply after delay
                setTimeout(() => {
                    simulateTyping();
                    
                    setTimeout(() => {
                        const replyElement = document.createElement('div');
                        replyElement.className = 'message incoming';
                        replyElement.dataset.messageId = Date.now() + 1;
                        replyElement.innerHTML = `
                            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User">
                            <div class="message-content">
                                <p>Thanks for your message! I'll get back to you soon.</p>
                                <div class="message-reactions"></div>
                            </div>
                            <div class="message-time">${getCurrentTime()}</div>
                            <div class="message-actions">
                                <button class="message-action-btn" data-action="reply"><i class="fas fa-reply"></i></button>
                                <button class="message-action-btn" data-action="forward"><i class="fas fa-share"></i></button>
                                <button class="message-action-btn" data-action="pin"><i class="fas fa-thumbtack"></i></button>
                                <button class="message-action-btn" data-action="delete"><i class="fas fa-trash"></i></button>
                            </div>
                        `;
                        
                        // Add event listeners to new action buttons
                        const actionBtns = replyElement.querySelectorAll('.message-action-btn');
                        actionBtns.forEach(btn => {
                            btn.addEventListener('click', function(e) {
                                e.stopPropagation();
                                
                                const action = this.dataset.action;
                                const message = this.closest('.message');
                                const messageId = message.dataset.messageId;
                                const messageText = message.querySelector('p').textContent;
                                
                                switch (action) {
                                    case 'reply':
                                        replyContainer.classList.remove('hidden');
                                        replyContainer.querySelector('.reply-text').textContent = messageText;
                                        replyContainer.dataset.replyTo = messageId;
                                        break;
                                        
                                    case 'forward':
                                        forwardMessageModal.classList.remove('hidden');
                                        document.getElementById('forward-message-text').textContent = messageText;
                                        document.getElementById('message-to-forward').value = messageId;
                                        break;
                                        
                                    case 'pin':
                                        message.classList.toggle('pinned');
                                        if (message.classList.contains('pinned')) {
                                            const pinIndicator = document.createElement('div');
                                            pinIndicator.className = 'pin-indicator';
                                            pinIndicator.innerHTML = '<i class="fas fa-thumbtack"></i>';
                                            message.querySelector('.message-content').appendChild(pinIndicator);
                                        } else {
                                            message.querySelector('.pin-indicator')?.remove();
                                        }
                                        break;
                                        
                                    case 'delete':
                                        if (confirm('Are you sure you want to delete this message?')) {
                                            message.style.opacity = '0.5';
                                            setTimeout(() => {
                                                message.remove();
                                            }, 300);
                                        }
                                        break;
                                }
                            });
                        });
                        
                        // Double-click for emoji reaction
                        replyElement.addEventListener('dblclick', function(e) {
                            e.preventDefault();
                            
                            // Position and show reaction panel
                            const rect = this.getBoundingClientRect();
                            reactionPanel.style.top = `${rect.top - 50}px`;
                            reactionPanel.style.left = `${rect.left + rect.width / 2 - 160}px`;
                            reactionPanel.classList.remove('hidden');
                            
                            // Store message ID for reaction
                            reactionPanel.dataset.messageId = this.dataset.messageId;
                            
                            // Hide panel when clicking elsewhere
                            document.addEventListener('click', function hidePanel(e) {
                                if (!reactionPanel.contains(e.target)) {
                                    reactionPanel.classList.add('hidden');
                                    document.removeEventListener('click', hidePanel);
                                }
                            });
                        });
                        
                        // Remove typing indicator
                        const typingIndicator = document.querySelector('.typing-indicator');
                        if (typingIndicator) {
                            typingIndicator.remove();
                        }
                        
                        // Add reply
                        chatMessages.appendChild(replyElement);
                        
                        // Scroll to bottom
                        chatMessages.scrollTop = chatMessages.scrollHeight;
                    }, 2000);
                }, 1000);
            }
        }
        
        function getCurrentTime() {
            const now = new Date();
            let hours = now.getHours();
            let minutes = now.getMinutes();
            
            // Add leading zero if needed
            hours = hours < 10 ? '0' + hours : hours;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            
            return `${hours}:${minutes}`;
        }
    }

    // Attachment Button
    if (attachmentBtn) {
        attachmentBtn.addEventListener('click', function() {
            attachmentOptions.classList.toggle('hidden');
            
            // Hide emoji picker if open
            emojiPicker.classList.add('hidden');
            
            // Hide when clicking elsewhere
            document.addEventListener('click', function hideOptions(e) {
                if (!attachmentBtn.contains(e.target) && !attachmentOptions.contains(e.target)) {
                    attachmentOptions.classList.add('hidden');
                    document.removeEventListener('click', hideOptions);
                }
            });
        });
    }

    // Attachment Options
    if (attachmentOptions) {
        const attachmentOptionBtns = attachmentOptions.querySelectorAll('.attachment-option');
        
        attachmentOptionBtns.forEach(option => {
            option.addEventListener('click', function() {
                const type = this.dataset.type;
                
                switch (type) {
                    case 'photo':
                    case 'video':
                    case 'document':
                        // Create file input and trigger click
                        const fileInput = document.createElement('input');
                        fileInput.type = 'file';
                        fileInput.accept = type === 'photo' ? 'image/*' : type === 'video' ? 'video/*' : '*/*';
                        fileInput.click();
                        
                        fileInput.addEventListener('change', function() {
                            if (this.files && this.files[0]) {
                                const file = this.files[0];
                                
                                // Simulate file upload
                                const chatMessages = document.querySelector('.chat-messages');
                                const messageElement = document.createElement('div');
                                messageElement.className = 'message outgoing';
                                messageElement.dataset.messageId = Date.now();
                                
                                if (type === 'photo') {
                                    const reader = new FileReader();
                                    reader.onload = function(e) {
                                        messageElement.innerHTML = `
                                            <div class="message-content">
                                                <div class="image-attachment">
                                                    <img src="${e.target.result}" alt="Uploaded image">
                                                </div>
                                                <p>Image: ${file.name}</p>
                                                <div class="message-reactions"></div>
                                            </div>
                                            <div class="message-time">${getCurrentTime()}</div>
                                            <div class="message-actions">
                                                <button class="message-action-btn" data-action="reply"><i class="fas fa-reply"></i></button>
                                                <button class="message-action-btn" data-action="forward"><i class="fas fa-share"></i></button>
                                                <button class="message-action-btn" data-action="pin"><i class="fas fa-thumbtack"></i></button>
                                                <button class="message-action-btn" data-action="delete"><i class="fas fa-trash"></i></button>
                                            </div>
                                        `;
                                        
                                        chatMessages.appendChild(messageElement);
                                        chatMessages.scrollTop = chatMessages.scrollHeight;
                                    };
                                    reader.readAsDataURL(file);
                                } else if (type === 'document') {
                                    messageElement.innerHTML = `
                                        <div class="message-content">
                                            <div class="file-attachment">
                                                <div class="file-preview">
                                                    <i class="fas fa-file"></i>
                                                </div>
                                                <div class="file-info">
                                                    <div class="file-name">${file.name}</div>
                                                    <div class="file-size">${(file.size / 1024).toFixed(1)} KB</div>
                                                </div>
                                                <div class="file-actions">
                                                    <button class="file-download-btn"><i class="fas fa-download"></i></button>
                                                </div>
                                            </div>
                                            <div class="message-reactions"></div>
                                        </div>
                                        <div class="message-time">${getCurrentTime()}</div>
                                        <div class="message-actions">
                                            <button class="message-action-btn" data-action="reply"><i class="fas fa-reply"></i></button>
                                            <button class="message-action-btn" data-action="forward"><i class="fas fa-share"></i></button>
                                            <button class="message-action-btn" data-action="pin"><i class="fas fa-thumbtack"></i></button>
                                            <button class="message-action-btn" data-action="delete"><i class="fas fa-trash"></i></button>
                                        </div>
                                    `;
                                    
                                    chatMessages.appendChild(messageElement);
                                    chatMessages.scrollTop = chatMessages.scrollHeight;
                                }
                            }
                        });
                        break;
                        
                    case 'location':
                        // Simulate location sharing
                        if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition(function(position) {
                                const lat = position.coords.latitude;
                                const lng = position.coords.longitude;
                                
                                const chatMessages = document.querySelector('.chat-messages');
                                const messageElement = document.createElement('div');
                                messageElement.className = 'message outgoing';
                                messageElement.dataset.messageId = Date.now();
                                messageElement.innerHTML = `
                                    <div class="message-content">
                                        <div class="image-attachment">
                                            <img src="https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=300x200&markers=color:red%7C${lat},${lng}" alt="Location">
                                        </div>
                                        <p>My current location</p>
                                        <div class="message-reactions"></div>
                                    </div>
                                    <div class="message-time">${getCurrentTime()}</div>
                                    <div class="message-actions">
                                        <button class="message-action-btn" data-action="reply"><i class="fas fa-reply"></i></button>
                                        <button class="message-action-btn" data-action="forward"><i class="fas fa-share"></i></button>
                                        <button class="message-action-btn" data-action="pin"><i class="fas fa-thumbtack"></i></button>
                                        <button class="message-action-btn" data-action="delete"><i class="fas fa-trash"></i></button>
                                    </div>
                                `;
                                
                                chatMessages.appendChild(messageElement);
                                chatMessages.scrollTop = chatMessages.scrollHeight;
                            });
                        }
                        break;
                }
                
                // Hide attachment options
                attachmentOptions.classList.add('hidden');
            });
        });
    }

    // Emoji Button
    if (emojiBtn) {
        emojiBtn.addEventListener('click', function() {
            emojiPicker.classList.toggle('hidden');
            
            // Hide attachment options if open
            attachmentOptions.classList.add('hidden');
            
            // Hide when clicking elsewhere
            document.addEventListener('click', function hideEmojiPicker(e) {
                if (!emojiBtn.contains(e.target) && !emojiPicker.contains(e.target)) {
                    emojiPicker.classList.add('hidden');
                    document.removeEventListener('click', hideEmojiPicker);
                }
            });
        });
    }

    // Emoji Items
    if (emojiItems) {
        emojiItems.forEach(item => {
            item.addEventListener('click', function() {
                const emoji = this.dataset.emoji;
                
                // Insert emoji at cursor position
                if (chatInput) {
                    const cursorPos = chatInput.selectionStart;
                    const text = chatInput.value;
                    const newText = text.slice(0, cursorPos) + emoji + text.slice(cursorPos);
                    
                    chatInput.value = newText;
                    chatInput.focus();
                    chatInput.selectionStart = cursorPos + emoji.length;
                    chatInput.selectionEnd = cursorPos + emoji.length;
                }
                
                // Hide emoji picker
                emojiPicker.classList.add('hidden');
            });
        });
    }

    // Voice Input Button
    if (voiceInputBtn) {
        voiceInputBtn.addEventListener('click', function() {
            // Show voice recording UI
            voiceRecordingUI.classList.remove('hidden');
            
            // Start timer
            let seconds = 0;
            const timerInterval = setInterval(() => {
                seconds++;
                const minutes = Math.floor(seconds / 60);
                const remainingSeconds = seconds % 60;
                recordingTimer.textContent = `${minutes < 10 ? '0' + minutes : minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`;
            }, 1000);
            
            // Simulate waveform animation
            const waveformBars = document.querySelectorAll('.recording-waveform .waveform-bar');
            waveformBars.forEach(bar => {
                bar.style.height = `${Math.floor(Math.random() * 20) + 10}px`;
            });
            
            // Cancel recording
            cancelRecordingBtn.addEventListener('click', function() {
                clearInterval(timerInterval);
                voiceRecordingUI.classList.add('hidden');
            });
            
            // Stop recording
            stopRecordingBtn.addEventListener('click', function() {
                clearInterval(timerInterval);
                
                // Show send button
                this.style.display = 'none';
                sendRecordingBtn.style.display = 'flex';
            });
            
            // Send recording
            sendRecordingBtn.addEventListener('click', function() {
                clearInterval(timerInterval);
                voiceRecordingUI.classList.add('hidden');
                
                // Reset UI
                stopRecordingBtn.style.display = 'flex';
                sendRecordingBtn.style.display = 'none';
                
                // Create voice message
                const chatMessages = document.querySelector('.chat-messages');
                const messageElement = document.createElement('div');
                messageElement.className = 'message outgoing';
                messageElement.dataset.messageId = Date.now();
                messageElement.innerHTML = `
                    <div class="message-content">
                        <div class="voice-message">
                            <button class="voice-play-btn"><i class="fas fa-play"></i></button>
                            <div class="voice-waveform">
                                <div class="waveform-bar" style="height: 15px;"></div>
                                <div class="waveform-bar" style="height: 10px;"></div>
                                <div class="waveform-bar" style="height: 20px;"></div>
                                <div class="waveform-bar" style="height: 25px;"></div>
                                <div class="waveform-bar" style="height: 15px;"></div>
                                <div class="waveform-bar" style="height: 10px;"></div>
                                <div class="waveform-bar" style="height: 20px;"></div>
                                <div class="waveform-bar" style="height: 15px;"></div>
                                <div class="waveform-bar" style="height: 10px;"></div>
                                <div class="waveform-bar" style="height: 20px;"></div>
                            </div>
                            <div class="voice-duration">${recordingTimer.textContent}</div>
                        </div>
                        <div class="message-reactions"></div>
                    </div>
                    <div class="message-time">${getCurrentTime()}</div>
                    <div class="message-actions">
                        <button class="message-action-btn" data-action="reply"><i class="fas fa-reply"></i></button>
                        <button class="message-action-btn" data-action="forward"><i class="fas fa-share"></i></button>
                        <button class="message-action-btn" data-action="pin"><i class="fas fa-thumbtack"></i></button>
                        <button class="message-action-btn" data-action="delete"><i class="fas fa-trash"></i></button>
                    </div>
                `;
                
                chatMessages.appendChild(messageElement);
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                // Add play button functionality
                const playBtn = messageElement.querySelector('.voice-play-btn');
                playBtn.addEventListener('click', function() {
                    const icon = this.querySelector('i');
                    
                    if (icon.classList.contains('fa-play')) {
                        icon.classList.replace('fa-play', 'fa-pause');
                        
                        // Simulate playing
                        setTimeout(() => {
                            icon.classList.replace('fa-pause', 'fa-play');
                        }, 3000);
                    } else {
                        icon.classList.replace('fa-pause', 'fa-play');
                    }
                });
            });
        });
    }

    // Voice Call Button
    if (voiceCallBtn) {
        voiceCallBtn.addEventListener('click', function() {
            // Show incoming call UI first (for demo)
            incomingCallUI.classList.remove('hidden');
            
            // Auto accept after 3 seconds
            setTimeout(() => {
                incomingCallUI.classList.add('hidden');
                callUI.classList.remove('hidden');
                
                // Start call timer
                let seconds = 0;
                const timerInterval = setInterval(() => {
                    seconds++;
                    const minutes = Math.floor(seconds / 60);
                    const remainingSeconds = seconds % 60;
                    document.querySelector('.call-duration').textContent = `${minutes < 10 ? '0' + minutes : minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`;
                }, 1000);
                
                // End call button
                document.querySelectorAll('.end-call-btn').forEach(btn => {
                    btn.addEventListener('click', function() {
                        clearInterval(timerInterval);
                        callUI.classList.add('hidden');
                    });
                });
            }, 3000);
        });
    }

    // Video Call Button
    if (videoCallBtn) {
        videoCallBtn.addEventListener('click', function() {
            // Show incoming call UI first (for demo)
            incomingCallUI.classList.remove('hidden');
            
            // Auto accept after 3 seconds
            setTimeout(() => {
                incomingCallUI.classList.add('hidden');
                videoCallUI.classList.remove('hidden');
                
                // Start call timer
                let seconds = 0;
                const timerInterval = setInterval(() => {
                    seconds++;
                    const minutes = Math.floor(seconds / 60);
                    const remainingSeconds = seconds % 60;
                    document.querySelector('.video-call-header .call-duration').textContent = `${minutes < 10 ? '0' + minutes : minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`;
                }, 1000);
                
                // End call button
                document.querySelectorAll('.end-call-btn').forEach(btn => {
                    btn.addEventListener('click', function() {
                        clearInterval(timerInterval);
                        videoCallUI.classList.add('hidden');
                    });
                });
            }, 3000);
        });
    }

    // Incoming Call Buttons
    if (declineCallBtn) {
        declineCallBtn.addEventListener('click', function() {
            incomingCallUI.classList.add('hidden');
        });
    }

    if (acceptCallBtn) {
        acceptCallBtn.addEventListener('click', function() {
            incomingCallUI.classList.add('hidden');
            callUI.classList.remove('hidden');
            
            // Start call timer
            let seconds = 0;
            const timerInterval = setInterval(() => {
                seconds++;
                const minutes = Math.floor(seconds / 60);
                const remainingSeconds = seconds % 60;
                document.querySelector('.call-duration').textContent = `${minutes < 10 ? '0' + minutes : minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`;
            }, 1000);
            
            // End call button
            document.querySelectorAll('.end-call-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    clearInterval(timerInterval);
                    callUI.classList.add('hidden');
                });
            });
        });
    }

    if (acceptVideoCallBtn) {
        acceptVideoCallBtn.addEventListener('click', function() {
            incomingCallUI.classList.add('hidden');
            videoCallUI.classList.remove('hidden');
            
            // Start call timer
            let seconds = 0;
            const timerInterval = setInterval(() => {
                seconds++;
                const minutes = Math.floor(seconds / 60);
                const remainingSeconds = seconds % 60;
                document.querySelector('.video-call-header .call-duration').textContent = `${minutes < 10 ? '0' + minutes : minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`;
            }, 1000);
            
            // End call button
            document.querySelectorAll('.end-call-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    clearInterval(timerInterval);
                    videoCallUI.classList.add('hidden');
                });
            });
        });
    }

    // Video Call UI Controls
    if (chatBtn) {
        chatBtn.addEventListener('click', function() {
            chatOverlay.classList.toggle('hidden');
        });
    }

    if (screenShareBtn) {
        screenShareBtn.addEventListener('click', function() {
            // Toggle screen sharing
            this.classList.toggle('active');
            
            if (this.classList.contains('active')) {
                this.style.backgroundColor = var(--primary-color);
                this.style.color = 'white';
                
                // Simulate screen sharing
                const mainVideo = document.querySelector('.main-participant video');
                mainVideo.poster = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Desktop%20-%20104.jpg-caZI8bHUqPJivLUmX1eqv8GXK3Ep1n.jpeg';
            } else {
                this.style.backgroundColor = '';
                this.style.color = '';
                
                // Revert to user video
                const mainVideo = document.querySelector('.main-participant video');
                mainVideo.poster = 'https://randomuser.me/api/portraits/men/32.jpg';
            }
        });
    }

    // Minimize Call Buttons
    minimizeCall.forEach(btn => {
        btn.addEventListener('click', function() {
            const callContainer = this.closest('.call-ui, .video-call-ui');
            callContainer.classList.toggle('minimized');
            
            if (callContainer.classList.contains('minimized')) {
                callContainer.style.height = '60px';
                callContainer.style.width = '200px';
                callContainer.querySelector('.call-body, .video-call-body, .call-actions, .video-call-actions').style.display = 'none';
            } else {
                callContainer.style.height = '';
                callContainer.style.width = '';
                callContainer.querySelector('.call-body, .video-call-body, .call-actions, .video-call-actions').style.display = '';
            }
        });
    });

    // New Items Dropdown
    if (newItemsDropdown) {
        newItemsDropdown.addEventListener('click', function() {
            dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
        });
        
        // Hide dropdown when clicking elsewhere
        document.addEventListener('click', function(e) {
            if (!newItemsDropdown.contains(e.target) && !dropdownMenu.contains(e.target)) {
                dropdownMenu.style.display = 'none';
            }
        });
        
        // Dropdown menu items
        const dropdownItems = dropdownMenu.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => {
            item.addEventListener('click', function() {
                const itemId = this.id;
                
                if (itemId === 'new-chat-btn') {
                    newChatModal.classList.remove('hidden');
                } else if (itemId === 'new-group-btn') {
                    newGroupModal.classList.remove('hidden');
                } else if (itemId === 'new-section-btn') {
                    newSectionModal.classList.remove('hidden');
                }
                
                dropdownMenu.style.display = 'none';
            });
        });
    }

    // Close Modals
    closeModals.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.classList.add('hidden');
        });
    });

    // Cancel Buttons
    cancelBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.classList.add('hidden');
        });
    });

    // Create Buttons
    createBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            const modalType = modal.classList[1]; // Get modal type from class
            
            if (modalType === 'new-chat-modal') {
                // Create new chat logic
                console.log('Creating new chat');
            } else if (modalType === 'new-group-modal') {
                // Create new group logic
                console.log('Creating new group');
            } else if (modalType === 'new-section-modal') {
                // Create new section logic
                const sectionName = modal.querySelector('input').value.trim();
                if (sectionName) {
                    createNewSection(sectionName);
                }
            }
            
            modal.classList.add('hidden');
        });
    });

    // Rename Section Button
    if (renameSectionBtn) {
        renameSectionBtn.addEventListener('click', function() {
            const sectionId = document.getElementById('section-to-rename').value;
            const newName = document.getElementById('rename-section-input').value.trim();
            
            if (newName) {
                const section = document.querySelector(`.chat-section[data-section="${sectionId}"]`);
                if (section) {
                    section.querySelector('.section-title span').textContent = newName;
                }
            }
            
            renameSectionModal.classList.add('hidden');
        });
    }

    // Confirm Delete Section Button
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', function() {
            const sectionId = document.getElementById('section-to-delete').value;
            const moveToDefault = document.getElementById('move-to-default').checked;
            
            const section = document.querySelector(`.chat-section[data-section="${sectionId}"]`);
            if (section) {
                if (moveToDefault) {
                    // Move chats to default section
                    const chats = section.querySelectorAll('.chat-item');
                    const defaultSection = document.querySelector('.chat-section[data-section="chats"]');
                    
                    if (defaultSection) {
                        const defaultChatList = defaultSection.querySelector('.chat-list');
                        chats.forEach(chat => {
                            defaultChatList.appendChild(chat);
                        });
                    }
                }
                
                // Remove section
                section.remove();
            }
            
            deleteSectionModal.classList.add('hidden');
        });
    }

    // Forward Button
    if (forwardBtn) {
        forwardBtn.addEventListener('click', function() {
            forwardMessageModal.classList.add('hidden');
            
            // Show success message
            alert('Message forwarded successfully!');
        });
    }

    // Add User Buttons
    addUserBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const userItem = this.closest('.user-item');
            const userName = userItem.querySelector('.user-name').textContent;
            const userImg = userItem.querySelector('img').src;
            
            // Add to selected users
            const selectedUser = document.createElement('div');
            selectedUser.className = 'selected-user';
            selectedUser.innerHTML = `
                <img src="${userImg}" alt="${userName}">
                <span>${userName}</span>
                <button class="remove-user"><i class="fas fa-times"></i></button>
            `;
            
            if (selectedUserList) {
                selectedUserList.appendChild(selectedUser);
                
                // Remove user when clicking X
                const removeBtn = selectedUser.querySelector('.remove-user');
                removeBtn.addEventListener('click', function() {
                    selectedUser.remove();
                });
            }
        });
    });

    // See More Buttons
    seeMoreBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const chatSection = this.closest('.chat-section');
            const chatList = chatSection.querySelector('.chat-list');
            
            // Toggle expanded class
            chatList.classList.toggle('expanded');
            
            if (chatList.classList.contains('expanded')) {
                // Show more chats
                for (let i = 0; i < 5; i++) {
                    const chatItem = document.createElement('div');
                    chatItem.className = 'chat-item';
                    chatItem.dataset.chatId = Date.now() + i;
                    chatItem.innerHTML = `
                        <img src="https://randomuser.me/api/portraits/men/${40 + i}.jpg" alt="User">
                        <div class="chat-info">
                            <div class="chat-name">Additional User ${i + 1}</div>
                            <div class="chat-message">This is an additional chat message.</div>
                        </div>
                        <div class="chat-meta">
                            <span class="chat-time">Yesterday</span>
                            <i class="fas fa-ellipsis-v chat-menu-trigger"></i>
                        </div>
                    `;
                    
                    // Add click event
                    chatItem.addEventListener('click', function(e) {
                        if (e.target.classList.contains('fa-ellipsis-v')) {
                            return;
                        }
                        
                        chatItems.forEach(chat => chat.classList.remove('active'));
                        this.classList.add('active');
                        
                        if (welcomeScreen) welcomeScreen.classList.add('hidden');
                        if (activeChat) activeChat.classList.remove('hidden');
                        
                        const userName = this.querySelector('.chat-name').textContent;
                        const userImg = this.querySelector('img').src;
                        
                        const chatHeaderName = document.querySelector('.chat-header-name');
                        const chatHeaderImg = document.querySelector('.chat-header-user img');
                        
                        if (chatHeaderName) chatHeaderName.textContent = userName;
                        if (chatHeaderImg) chatHeaderImg.src = userImg;
                        
                        if (window.innerWidth <= 768) {
                            chatSidebar.classList.remove('active');
                        }
                        
                        simulateTyping();
                    });
                    
                    chatList.appendChild(chatItem);
                }
                
                this.textContent = 'Show less';
            } else {
                // Remove additional chats
                const additionalChats = chatList.querySelectorAll('.chat-item:nth-child(n+5)');
                additionalChats.forEach(chat => chat.remove());
                
                this.textContent = 'See more...';
            }
        });
    });

    // Mobile: Chat Header Back Button
    if (chatHeaderBack) {
        chatHeaderBack.addEventListener('click', function() {
            if (activeChat) activeChat.classList.add('hidden');
            if (welcomeScreen) welcomeScreen.classList.remove('hidden');
            
            // Show sidebar on mobile
            if (window.innerWidth <= 768) {
                chatSidebar.classList.add('active');
            }
        });
    }

    // Mobile: FAB Button
    if (mobileFab) {
        mobileFab.addEventListener('click', function() {
            fabOptions.style.display = fabOptions.style.display === 'flex' ? 'none' : 'flex';
        });
        
        // Hide FAB options when clicking elsewhere
        document.addEventListener('click', function(e) {
            if (!mobileFab.contains(e.target) && !fabOptions.contains(e.target)) {
                fabOptions.style.display = 'none';
            }
        });
        
        // FAB options
        const fabOptionBtns = fabOptions.querySelectorAll('.fab-option');
        fabOptionBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const action = this.dataset.action;
                
                switch (action) {
                    case 'new-chat':
                        newChatModal.classList.remove('hidden');
                        break;
                        
                    case 'call':
                        // Show incoming call UI
                        incomingCallUI.classList.remove('hidden');
                        break;
                        
                    case 'new-group':
                        newGroupModal.classList.remove('hidden');
                        break;
                }
                
                fabOptions.style.display = 'none';
            });
        });
    }

    // Nav Buttons
    navButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            navButtons.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update content based on selected nav
            const navType = this.textContent.trim();
            console.log(`Switched to ${navType} view`);
            
            // For demonstration, we'll just log the action
            // In a real app, you would update the content accordingly
        });
    });

    // Context Menu Items
    const contextMenuItems = document.querySelectorAll('.context-menu-item');
    contextMenuItems.forEach(item => {
        item.addEventListener('click', function() {
            const action = this.dataset.action;
            
            switch (action) {
                case 'move-to-favorite':
                    // Move chat to favorites
                    console.log('Moving to favorites');
                    break;
                    
                case 'move-to-important':
                    // Move chat to important
                    console.log('Moving to important');
                    break;
                    
                case 'new-section':
                    // Show new section modal
                    newSectionModal.classList.remove('hidden');
                    break;
                    
                case 'mute':
                    // Mute notifications
                    console.log('Muting notifications');
                    break;
                    
                case 'sort':
                    // Sort chats
                    console.log('Sorting chats');
                    break;
                    
                case 'remove-from-section':
                    // Remove from section
                    console.log('Removing from section');
                    break;
                    
                case 'delete':
                    // Delete chat
                    console.log('Deleting chat');
                    break;
                    
                case 'mark-as-unread':
                    // Mark as unread
                    console.log('Marking as unread');
                    break;
                    
                case 'rename-section':
                    // Show rename section modal
                    renameSectionModal.classList.remove('hidden');
                    break;
                    
                case 'delete-section':
                    // Show delete section modal
                    deleteSectionModal.classList.remove('hidden');
                    break;
                    
                case 'reply':
                    // Show reply container
                    replyContainer.classList.remove('hidden');
                    break;
                    
                case 'forward':
                    // Show forward message modal
                    forwardMessageModal.classList.remove('hidden');
                    break;
                    
                case 'pin':
                    // Pin message
                    console.log('Pinning message');
                    break;
            }
            
            // Hide context menu
            document.querySelectorAll('.context-menu').forEach(menu => {
                menu.classList.add('hidden');
            });
        });
    });

    // Helper Functions
    function simulateTyping() {
        // Create typing indicator if it doesn't exist
        if (!document.querySelector('.typing-indicator')) {
            const typingElement = document.createElement('div');
            typingElement.className = 'typing-indicator';
            typingElement.innerHTML = '<span></span><span></span><span></span>';
            
            const chatMessages = document.querySelector('.chat-messages');
            if (chatMessages) {
                chatMessages.appendChild(typingElement);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
            
            // Remove typing indicator after a delay
            setTimeout(() => {
                if (typingElement.parentNode) {
                    typingElement.parentNode.removeChild(typingElement);
                }
            }, 3000);
        }
    }

    function createNewSection(sectionName) {
        // Create new section element
        const newSection = document.createElement('div');
        newSection.className = 'chat-section';
        newSection.dataset.section = sectionName.toLowerCase().replace(/\s+/g, '-');
        newSection.innerHTML = `
            <div class="section-header">
                <div class="section-title">
                    <i class="fas fa-folder"></i>
                    <span>${sectionName}</span>
                </div>
                <div class="section-actions">
                    <i class="fas fa-chevron-down"></i>
                    <i class="fas fa-ellipsis-v section-menu-trigger"></i>
                </div>
            </div>
            <div class="chat-list">
                <!-- Empty section -->
                <div class="empty-section">
                    <p>No chats in this section yet.</p>
                </div>
            </div>
        `;
        
        // Add to chat sidebar
        const chatSidebar = document.querySelector('.chat-sidebar');
        chatSidebar.appendChild(newSection);
        
        // Add event listeners to new section header
        const sectionHeader = newSection.querySelector('.section-header');
        sectionHeader.addEventListener('click', function(e) {
            // Ignore if ellipsis is clicked
            if (e.target.classList.contains('fa-ellipsis-v')) {
                return;
            }
            
            const chatList = this.nextElementSibling;
            chatList.classList.toggle('collapsed');
            
            if (chatList.classList.contains('collapsed')) {
                chatList.style.display = 'none';
                this.querySelector('.fa-chevron-down').classList.replace('fa-chevron-down', 'fa-chevron-right');
            } else {
                chatList.style.display = 'block';
                this.querySelector('.fa-chevron-right')?.classList.replace('fa-chevron-right', 'fa-chevron-down');
            }
        });
        
        // Add event listener to section menu trigger
        const sectionMenuTrigger = newSection.querySelector('.section-menu-trigger');
        sectionMenuTrigger.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const section = this.closest('.chat-section');
            const sectionId = section.dataset.section;
            
            // Position and show context menu
            sectionContextMenu.style.top = `${e.pageY}px`;
            sectionContextMenu.style.left = `${e.pageX}px`;
            sectionContextMenu.classList.remove('hidden');
            
            // Store section ID for rename/delete operations
            sectionContextMenu.dataset.sectionId = sectionId;
        });
        // Add event listener to chat list items
        const chatItems = newSection.querySelectorAll('.chat-item');
        chatItems.forEach(chat => {
            chat.addEventListener('click', function(e) {
                if (e.target.classList.contains('chat-menu-trigger')) {
                    return;
                }
                
                chatItems.forEach(c => c.classList.remove('active'));
                this.classList.add('active');
                
                if (welcomeScreen) welcomeScreen.classList.add('hidden');
                if (activeChat) activeChat.classList.remove('hidden');
                
                const userName = this.querySelector('.chat-name').textContent;
                const userImg = this.querySelector('img').src;
                
                const chatHeaderName = document.querySelector('.chat-header-name');
                const chatHeaderImg = document.querySelector('.chat-header-user img');
                
                if (chatHeaderName) chatHeaderName.textContent = userName;
                if (chatHeaderImg) chatHeaderImg.src = userImg;
                
                if (window.innerWidth <= 768) {
                    chatSidebar.classList.remove('active');
                }
                
                simulateTyping();
            });
        });
        // Add event listener to section menu items
        const sectionMenuItems = sectionContextMenu.querySelectorAll('.context-menu-item');
        