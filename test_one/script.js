document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const chatItems = document.querySelectorAll('.chat-item');
    const emptyState = document.getElementById('empty-state');
    const activeChat = document.getElementById('active-chat');
    const backButton = document.getElementById('back-to-chats');
    const settingsBtn = document.getElementById('settings-btn');
    const settingsModal = document.getElementById('settings-modal');
    const helpBtn = document.getElementById('help-btn');
    const helpPanel = document.getElementById('help-panel');
    const notificationsBtn = document.getElementById('notifications-btn');
    const notificationsPanel = document.getElementById('notifications-panel');
    const logoutBtn = document.getElementById('logout-btn');
    const logoutModal = document.getElementById('logout-modal');
    const newItemsDropdown = document.getElementById('new-items-dropdown');
    const newItemsMenu = document.getElementById('new-items-menu');
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    const sidePanelCloseButtons = document.querySelectorAll('.side-panel-close');
    const messageInput = document.querySelector('.message-input');
    const sendBtn = document.querySelector('.send-btn');
    const messagesContainer = document.querySelector('.messages-container');
    const sectionToggles = document.querySelectorAll('.section-toggle');
    const chatMoreButtons = document.querySelectorAll('.chat-more');
    const navTabs = document.querySelectorAll('.nav-tab');
    const collapseAllBtn = document.getElementById('collapse-all-btn');
    const searchContainer = document.getElementById('search-container');
    const fileUploadBtn = document.getElementById('file-upload-btn');
    const fileUploadMenu = document.getElementById('file-upload-menu');
    const fileInput = document.getElementById('file-input');
    const emojiBtn = document.getElementById('emoji-btn');
    const emojiPicker = document.getElementById('emoji-picker');
    const emojis = document.querySelectorAll('.emoji');
    const voiceBtn = document.getElementById('voice-btn');
    const voiceRecordingPanel = document.getElementById('voice-recording-panel');
    const voiceRecordingClose = document.querySelector('.voice-recording-close');
    const messageFiles = document.querySelectorAll('.message-file');
    const filePreviewModal = document.getElementById('file-preview-modal');
    const filePreviewContainer = document.getElementById('file-preview-container');
    const filePreviewTitle = document.getElementById('file-preview-title');
    const filePreviewDownload = document.getElementById('file-preview-download');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const messages = document.querySelectorAll('.message');
    const messageReactionPanel = document.getElementById('message-reaction-panel');

    // Initialize dark mode from localStorage
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        if (darkModeToggle) darkModeToggle.checked = true;
    }

    // Dark mode toggle
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('darkMode', 'true');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('darkMode', 'false');
            }
        });
    }

    // Show active chat when clicking on a chat item
    chatItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all chat items
            chatItems.forEach(chat => chat.classList.remove('active'));
            
            // Add active class to clicked chat item
            this.classList.add('active');
            
            // Show active chat, hide empty state
            emptyState.classList.add('hidden');
            activeChat.classList.remove('hidden');
            
            // On mobile, hide the chat sidebar
            if (window.innerWidth <= 768) {
                document.querySelector('.chat-sidebar').classList.remove('show');
            }
        });
    });

    // Back button functionality (mobile)
    if (backButton) {
        backButton.addEventListener('click', function() {
            emptyState.classList.remove('hidden');
            activeChat.classList.add('hidden');
            
            // Remove active class from all chat items
            chatItems.forEach(chat => chat.classList.remove('active'));
        });
    }

    // Settings modal
    if (settingsBtn && settingsModal) {
        settingsBtn.addEventListener('click', function() {
            settingsModal.classList.add('show');
        });
    }

    // Help panel
    if (helpBtn && helpPanel) {
        helpBtn.addEventListener('click', function() {
            helpPanel.classList.add('show');
        });
    }

    // Notifications panel
    if (notificationsBtn && notificationsPanel) {
        notificationsBtn.addEventListener('click', function() {
            notificationsPanel.classList.add('show');
        });
    }

    // New items dropdown
    if (newItemsDropdown && newItemsMenu) {
        newItemsDropdown.addEventListener('click', function(e) {
            e.preventDefault();
            newItemsMenu.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!newItemsDropdown.contains(e.target) && !newItemsMenu.contains(e.target)) {
                newItemsMenu.classList.remove('show');
            }
        });
    }

    // Close modals
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.classList.remove('show');
            }
        });
    });

    // Close side panels
    sidePanelCloseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const panel = this.closest('.side-panel');
            if (panel) {
                panel.classList.remove('show');
            }
        });
    });

    // Close modals when clicking outside
    document.addEventListener('click', function(e) {
        const modals = document.querySelectorAll('.modal.show');
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    });

    // Send message functionality
    if (messageInput && sendBtn) {
        // Send message on button click
        sendBtn.addEventListener('click', sendMessage);
        
        // Send message on Enter key
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage();
            }
        });
    }

    // Function to send a message
    function sendMessage() {
        const message = messageInput.value.trim();
        if (message) {
            // Create message element
            const messageTime = getCurrentTime();
            const messageElement = document.createElement('div');
            messageElement.className = 'message outgoing';
            messageElement.innerHTML = `
                <div class="message-content">
                    <p>${message}</p>
                    <div class="message-time">${messageTime}</div>
                    <div class="message-actions-menu">
                        <button class="message-action-btn"><i class="fas fa-reply"></i></button>
                        <button class="message-action-btn"><i class="fas fa-forward"></i></button>
                        <button class="message-action-btn"><i class="fas fa-thumbtack"></i></button>
                        <button class="message-action-btn"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            `;
            
            // Add message to container
            messagesContainer.appendChild(messageElement);
            
            // Clear input
            messageInput.value = '';
            
            // Scroll to bottom
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            
            // Add event listeners for the new message
            addMessageEventListeners(messageElement);
            
            // Simulate reply after 1 second
            setTimeout(simulateReply, 1000);
        }
    }

    // Function to simulate a reply
    function simulateReply() {
        const replies = [
            "That sounds great!",
            "I'll get back to you on that.",
            "Let me check and get back to you.",
            "Interesting! Tell me more.",
            "I agree with you on that.",
            "Can we discuss this further tomorrow?",
            "Thanks for letting me know!",
            "I appreciate your input on this matter."
        ];
        
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        const messageTime = getCurrentTime();
        
        const replyElement = document.createElement('div');
        replyElement.className = 'message incoming';
        replyElement.innerHTML = `
            <div class="message-avatar">
                <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Desktop%20-%20127.jpg-InwRZl1SyaMJ0Qr3ReO84inFBY7S5o.jpeg" alt="Bharathi Ragav" class="avatar-img small">
            </div>
            <div class="message-content">
                <div class="message-sender">Bharathi Ragav</div>
                <p>${randomReply}</p>
                <div class="message-time">${messageTime}</div>
                <div class="message-actions-menu">
                    <button class="message-action-btn"><i class="fas fa-reply"></i></button>
                    <button class="message-action-btn"><i class="fas fa-forward"></i></button>
                    <button class="message-action-btn"><i class="fas fa-thumbtack"></i></button>
                    <button class="message-action-btn"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `;
        
        // Add reply to container
        messagesContainer.appendChild(replyElement);
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Add event listeners for the new message
        addMessageEventListeners(replyElement);
    }

    // Function to get current time in HH:MM format
    function getCurrentTime() {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        
        // Add leading zeros if needed
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        
        return `${hours}:${minutes}`;
    }

    // Toggle sections
    sectionToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const section = this.closest('.chat-section');
            const chatList = section.querySelector('.chat-list');
            
            // Toggle icon
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-chevron-down')) {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-right');
                chatList.style.display = 'none';
            } else {
                icon.classList.remove('fa-chevron-right');
                icon.classList.add('fa-chevron-down');
                chatList.style.display = 'flex';
            }
        });
    });

    // Collapse All Sections
    if (collapseAllBtn) {
        collapseAllBtn.addEventListener('click', function() {
            const sections = document.querySelectorAll('.chat-section');
            sections.forEach(section => {
                const chatList = section.querySelector('.chat-list');
                const icon = section.querySelector('.section-toggle i');
                
                if (icon.classList.contains('fa-chevron-down')) {
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-right');
                    chatList.style.display = 'none';
                }
            });
        });
    }

    // Search container expand on focus
    if (searchContainer) {
        const searchInput = searchContainer.querySelector('.search-input');
        searchInput.addEventListener('focus', function() {
            searchContainer.classList.add('expanded');
        });
        
        searchInput.addEventListener('blur', function() {
            searchContainer.classList.remove('expanded');
        });
    }

    // File upload menu
    if (fileUploadBtn && fileUploadMenu) {
        fileUploadBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            fileUploadMenu.classList.toggle('show');
            
            // Position the menu
            const rect = fileUploadBtn.getBoundingClientRect();
            fileUploadMenu.style.left = `${rect.left}px`;
            fileUploadMenu.style.bottom = `${window.innerHeight - rect.top}px`;
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!fileUploadBtn.contains(e.target) && !fileUploadMenu.contains(e.target)) {
                fileUploadMenu.classList.remove('show');
            }
        });
        
        // File type selection
        const fileTypeItems = fileUploadMenu.querySelectorAll('.dropdown-item');
        fileTypeItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const fileType = this.getAttribute('data-type');
                
                // Set accepted file types
                switch (fileType) {
                    case 'image':
                        fileInput.accept = 'image/*';
                        break;
                    case 'video':
                        fileInput.accept = 'video/*';
                        break;
                    case 'audio':
                        fileInput.accept = 'audio/*';
                        break;
                    case 'document':
                        fileInput.accept = '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt';
                        break;
                    case 'other':
                        fileInput.accept = '';
                        break;
                }
                
                // Trigger file input
                fileInput.click();
                
                // Hide menu
                fileUploadMenu.classList.remove('show');
            });
        });
    }

    // File input change
    if (fileInput) {
        fileInput.addEventListener('change', function() {
            if (this.files.length > 0) {
                const file = this.files[0];
                const messageTime = getCurrentTime();
                let messageElement = document.createElement('div');
                messageElement.className = 'message outgoing with-file';
                
                let fileContent = '';
                
                // Check file type
                if (file.type.startsWith('image/')) {
                    // Image file
                    const imageUrl = URL.createObjectURL(file);
                    fileContent = `
                        <div class="message-file image">
                            <img src="${imageUrl}" alt="Shared image">
                        </div>
                    `;
                } else if (file.type.startsWith('video/')) {
                    // Video file
                    const videoUrl = URL.createObjectURL(file);
                    fileContent = `
                        <div class="message-file video">
                            <video src="${videoUrl}" controls></video>
                        </div>
                    `;
                } else if (file.type.startsWith('audio/')) {
                    // Audio file
                    const audioUrl = URL.createObjectURL(file);
                    fileContent = `
                        <div class="message-file audio">
                            <i class="fas fa-microphone"></i>
                            <div class="audio-player">
                                <button class="audio-play-btn"><i class="fas fa-play"></i></button>
                                <div class="audio-progress">
                                    <div class="audio-progress-bar"></div>
                                </div>
                                <span class="audio-duration">0:00</span>
                            </div>
                        </div>
                    `;
                } else {
                    // Document or other file
                    fileContent = `
                        <div class="message-file document">
                            <i class="fas fa-file"></i>
                            <span>${file.name}</span>
                            <button class="file-download-btn"><i class="fas fa-download"></i></button>
                        </div>
                    `;
                }
                
                messageElement.innerHTML = `
                    <div class="message-content">
                        ${fileContent}
                        <div class="message-time">${messageTime}</div>
                        <div class="message-actions-menu">
                            <button class="message-action-btn"><i class="fas fa-reply"></i></button>
                            <button class="message-action-btn"><i class="fas fa-forward"></i></button>
                            <button class="message-action-btn"><i class="fas fa-thumbtack"></i></button>
                            <button class="message-action-btn"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                `;
                
                // Add message to container
                messagesContainer.appendChild(messageElement);
                
                // Scroll to bottom
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
                
                // Add event listeners for the new message
                addMessageEventListeners(messageElement);
                
                // Reset file input
                this.value = '';
            }
        });
    }

    // Emoji picker
    if (emojiBtn && emojiPicker) {
        emojiBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            emojiPicker.classList.toggle('show');
            
            // Position the picker
            const rect = emojiBtn.getBoundingClientRect();
            emojiPicker.style.left = `${rect.left}px`;
            emojiPicker.style.bottom = `${window.innerHeight - rect.top}px`;
        });
        
        // Close picker when clicking outside
        document.addEventListener('click', function(e) {
            if (!emojiBtn.contains(e.target) && !emojiPicker.contains(e.target)) {
                emojiPicker.classList.remove('show');
            }
        });
        
        // Emoji selection
        emojis.forEach(emoji => {
            emoji.addEventListener('click', function() {
                const emojiChar = this.textContent;
                
                // Insert emoji at cursor position
                const cursorPos = messageInput.selectionStart;
                const textBefore = messageInput.value.substring(0, cursorPos);
                const textAfter = messageInput.value.substring(cursorPos);
                
                messageInput.value = textBefore + emojiChar + textAfter;
                
                // Set cursor position after emoji
                messageInput.selectionStart = cursorPos + emojiChar.length;
                messageInput.selectionEnd = cursorPos + emojiChar.length;
                messageInput.focus();
                
                // Hide picker
                emojiPicker.classList.remove('show');
            });
        });
        
        // Close emoji picker button
        const emojiPickerClose = document.querySelector('.emoji-picker-close');
        if (emojiPickerClose) {
            emojiPickerClose.addEventListener('click', function() {
                emojiPicker.classList.remove('show');
            });
        }
    }

    // Voice recording
    if (voiceBtn && voiceRecordingPanel) {
        voiceBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            voiceRecordingPanel.classList.add('show');
        });
        
        // Close voice recording panel
        if (voiceRecordingClose) {
            voiceRecordingClose.addEventListener('click', function() {
                voiceRecordingPanel.classList.remove('show');
            });
        }
        
        // Voice recording controls
        const recordBtn = document.querySelector('.voice-recording-btn.record-btn');
        const cancelBtn = document.querySelector('.voice-recording-btn.cancel-btn');
        const sendVoiceBtn = document.querySelector('.voice-recording-btn.send-btn');
        const voiceTimer = document.querySelector('.voice-recording-timer');
        
        let isRecording = false;
        let recordingTimer;
        let seconds = 0;
        
        if (recordBtn) {
            recordBtn.addEventListener('click', function() {
                if (!isRecording) {
                    // Start recording
                    isRecording = true;
                    this.innerHTML = '<i class="fas fa-stop"></i>';
                    
                    // Start timer
                    seconds = 0;
                    updateVoiceTimer();
                    recordingTimer = setInterval(updateVoiceTimer, 1000);
                    
                    // Animate waveform
                    document.querySelectorAll('.waveform-bar').forEach(bar => {
                        bar.style.animationPlayState = 'running';
                    });
                } else {
                    // Stop recording
                    isRecording = false;
                    this.innerHTML = '<i class="fas fa-microphone"></i>';
                    
                    // Stop timer
                    clearInterval(recordingTimer);
                    
                    // Stop waveform animation
                    document.querySelectorAll('.waveform-bar').forEach(bar => {
                        bar.style.animationPlayState = 'paused';
                    });
                }
            });
        }
        
        if (cancelBtn) {
            cancelBtn.addEventListener('click', function() {
                // Reset recording
                isRecording = false;
                if (recordBtn) recordBtn.innerHTML = '<i class="fas fa-microphone"></i>';
                
                // Stop timer
                clearInterval(recordingTimer);
                seconds = 0;
                if (voiceTimer) voiceTimer.textContent = '00:00';
                
                // Stop waveform animation
                document.querySelectorAll('.waveform-bar').forEach(bar => {
                    bar.style.animationPlayState = 'paused';
                });
                
                // Hide panel
                voiceRecordingPanel.classList.remove('show');
            });
        }
        
        if (sendVoiceBtn) {
            sendVoiceBtn.addEventListener('click', function() {
                // Only send if we have recorded something
                if (seconds > 0) {
                    // Create voice message
                    const messageTime = getCurrentTime();
                    const duration = formatTime(seconds);
                    
                    const messageElement = document.createElement('div');
                    messageElement.className = 'message outgoing with-file';
                    messageElement.innerHTML = `
                        <div class="message-content">
                            <div class="message-file audio">
                                <i class="fas fa-microphone"></i>
                                <div class="audio-player">
                                    <button class="audio-play-btn"><i class="fas fa-play"></i></button>
                                    <div class="audio-progress">
                                        <div class="audio-progress-bar"></div>
                                    </div>
                                    <span class="audio-duration">${duration}</span>
                                </div>
                            </div>
                            <div class="message-time">${messageTime}</div>
                            <div class="message-actions-menu">
                                <button class="message-action-btn"><i class="fas fa-reply"></i></button>
                                <button class="message-action-btn"><i class="fas fa-forward"></i></button>
                                <button class="message-action-btn"><i class="fas fa-thumbtack"></i></button>
                                <button class="message-action-btn"><i class="fas fa-trash"></i></button>
                            </div>
                        </div>
                    `;
                    
                    // Add message to container
                    messagesContainer.appendChild(messageElement);
                    
                    // Scroll to bottom
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                    
                    // Add event listeners for the new message
                    addMessageEventListeners(messageElement);
                    
                    // Reset recording
                    isRecording = false;
                    if (recordBtn) recordBtn.innerHTML = '<i class="fas fa-microphone"></i>';
                    
                    // Stop timer
                    clearInterval(recordingTimer);
                    seconds = 0;
                    if (voiceTimer) voiceTimer.textContent = '00:00';
                    
                    // Stop waveform animation
                    document.querySelectorAll('.waveform-bar').forEach(bar => {
                        bar.style.animationPlayState = 'paused';
                    });
                    
                    // Hide panel
                    voiceRecordingPanel.classList.remove('show');
                }
            });
        }
        
        function updateVoiceTimer() {
            seconds++;
            if (voiceTimer) {
                voiceTimer.textContent = formatTime(seconds);
            }
        }
        
        function formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
        }
    }

    // File preview
    function setupFilePreview() {
        const messageFiles = document.querySelectorAll('.message-file');
        messageFiles.forEach(file => {
            file.addEventListener('click', function(e) {
                e.stopPropagation();
                
                // Determine file type
                if (this.classList.contains('image')) {
                    // Image preview
                    const img = this.querySelector('img');
                    if (img) {
                        filePreviewTitle.textContent = 'Image Preview';
                        filePreviewContainer.innerHTML = `<img src="${img.src}" alt="Image preview">`;
                        filePreviewModal.classList.add('show');
                    }
                } else if (this.classList.contains('document')) {
                    // Document preview
                    const fileName = this.querySelector('span').textContent;
                    filePreviewTitle.textContent = fileName;
                    filePreviewContainer.innerHTML = `
                        <div class="document-preview">
                            <i class="fas fa-file-pdf"></i>
                            <span>${fileName}</span>
                        </div>
                    `;
                    filePreviewModal.classList.add('show');
                } else if (this.classList.contains('audio')) {
                    // Audio preview
                    filePreviewTitle.textContent = 'Audio Preview';
                    filePreviewContainer.innerHTML = `
                        <audio controls>
                            <source src="data:audio/mp3;base64,AAAAAAAA" type="audio/mp3">
                            Your browser does not support the audio element.
                        </audio>
                    `;
                    filePreviewModal.classList.add('show');
                }
            });
        });
    }

    // Setup file preview for initial files
    setupFilePreview();

    // Add message event listeners
    function addMessageEventListeners(messageElement) {
        // Double-click to show reaction panel
        messageElement.addEventListener('dblclick', function(e) {
            e.preventDefault();
            
            // Position the reaction panel
            const rect = this.getBoundingClientRect();
            messageReactionPanel.style.top = `${rect.top - 50}px`;
            messageReactionPanel.style.left = `${rect.left + rect.width / 2}px`;
            
            // Show the panel
            messageReactionPanel.classList.add('show');
            
            // Hide after 3 seconds if no interaction
            setTimeout(() => {
                if (messageReactionPanel.classList.contains('show')) {
                    messageReactionPanel.classList.remove('show');
                }
            }, 3000);
        });
        
        // Setup file preview for new files
        const newFiles = messageElement.querySelectorAll('.message-file');
        newFiles.forEach(file => {
            file.addEventListener('click', function(e) {
                e.stopPropagation();
                
                // Determine file type
                if (this.classList.contains('image')) {
                    // Image preview
                    const img = this.querySelector('img');
                    if (img) {
                        filePreviewTitle.textContent = 'Image Preview';
                        filePreviewContainer.innerHTML = `<img src="${img.src}" alt="Image preview">`;
                        filePreviewModal.classList.add('show');
                    }
                } else if (this.classList.contains('document')) {
                    // Document preview
                    const fileName = this.querySelector('span').textContent;
                    filePreviewTitle.textContent = fileName;
                    filePreviewContainer.innerHTML = `
                        <div class="document-preview">
                            <i class="fas fa-file-pdf"></i>
                            <span>${fileName}</span>
                        </div>
                    `;
                    filePreviewModal.classList.add('show');
                } else if (this.classList.contains('audio')) {
                    // Audio preview
                    filePreviewTitle.textContent = 'Audio Preview';
                    filePreviewContainer.innerHTML = `
                        <audio controls>
                            <source src="data:audio/mp3;base64,AAAAAAAA" type="audio/mp3">
                            Your browser does not support the audio element.
                        </audio>
                    `;
                    filePreviewModal.classList.add('show');
                }
            });
        });
    }

    // Setup message event listeners for initial messages
    messages.forEach(message => {
        addMessageEventListeners(message);
    });

    // Reaction emoji buttons
    const reactionEmojis = document.querySelectorAll('.reaction-emoji');
    reactionEmojis.forEach(emoji => {
        emoji.addEventListener('click', function() {
            // Add reaction logic here
            alert(`Added reaction: ${this.textContent}`);
            messageReactionPanel.classList.remove('show');
        });
    });

    // Initialize the UI
    function initUI() {
        // Scroll messages container to bottom
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }

    // Call init function
    initUI();
});