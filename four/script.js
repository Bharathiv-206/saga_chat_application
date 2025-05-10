document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const chatItems = document.querySelectorAll('.chat-item');
    const emptyState = document.querySelector('.empty-state');
    const activeChat = document.querySelector('.active-chat');
    const backButton = document.querySelector('.back-button');
    const messageInput = document.querySelector('.message-input');
    const sendButton = document.querySelector('.input-icon.send');
    const tabs = document.querySelectorAll('.tab');
    const newItemsButton = document.querySelector('.new-items-button');
    const newItemDropdown = document.querySelector('.new-item-dropdown');
    const helpIcon = document.querySelector('.nav-icon.help');
    const helpPanel = document.querySelector('.help-panel');
    const helpClose = document.querySelector('.help-close');
    const settingsIcon = document.querySelector('.nav-icon.settings');
    const settingsModal = document.querySelector('.settings-modal');
    const settingsClose = document.querySelector('.settings-modal .modal-close');
    const voiceCallIcon = document.querySelector('.action-icon.voice-call');
    const videoCallIcon = document.querySelector('.action-icon.video-call');
    const callModal = document.querySelector('.call-modal');
    const callClose = document.querySelector('.call-modal .modal-close');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const emojiButton = document.querySelector('.emoji-button');
    const emojiPicker = document.querySelector('.emoji-picker');
    const emojis = document.querySelectorAll('.emoji');
    const notificationIcon = document.querySelector('.nav-icon.notification');
    const notificationDropdown = document.querySelector('.notification-dropdown');
    const sectionToggles = document.querySelectorAll('.section-toggle');
    const collapseAllButton = document.querySelector('.collapse-all-button');
    const sectionOptions = document.querySelectorAll('.section-options');
    const chatOptions = document.querySelectorAll('.chat-options');
    const voiceRecord = document.querySelector('.voice-record');
    const recordingIndicator = document.querySelector('.recording-indicator');
    const attachmentButton = document.querySelector('.attachment-button');
    const fileInput = document.querySelector('.file-input');
    
    // User data
    const users = [
        {
            id: "1",
            name: "Bharathi Ragav",
            avatar: "/placeholder.svg?height=40&width=40",
            lastSeen: "14:03",
            lastMessage: "Hi! Why did you call?",
            timestamp: "10:30 AM",
            unread: true,
            favorite: true,
            important: false,
            active: true,
        },
        {
            id: "2",
            name: "Thamizharasan Raguraman",
            avatar: "/placeholder.svg?height=40&width=40",
            lastMessage: "This is a Figma Community file. Community is a...",
            timestamp: "Yesterday",
            unread: false,
            favorite: true,
            important: false,
            active: false,
        },
        {
            id: "3",
            name: "Senkathir Selvan Selvamani",
            avatar: "/placeholder.svg?height=40&width=40",
            lastMessage: "Hey team! Are we all set for the dashboard UI...",
            timestamp: "Yesterday",
            unread: true,
            favorite: true,
            important: true,
            active: false,
        },
        {
            id: "4",
            name: "Ethiraj Bro Sagasoft",
            avatar: "/placeholder.svg?height=40&width=40",
            lastMessage: "Almost ready, just finishing a few points.",
            timestamp: "Monday",
            unread: false,
            favorite: false,
            important: false,
            active: false,
        },
        {
            id: "5",
            name: "Janani Radhakrishnan Sagasoft",
            avatar: "/placeholder.svg?height=40&width=40",
            lastMessage: "Hi guys! I've added my wireframe ideas to the...",
            timestamp: "Monday",
            unread: false,
            favorite: false,
            important: true,
            active: false,
        },
        {
            id: "6",
            name: "Vasanth Kumar Sivamani",
            avatar: "/placeholder.svg?height=40&width=40",
            lastMessage: "Cool, let's hop on a quick call in 10 mins?",
            timestamp: "Last week",
            unread: true,
            favorite: false,
            important: true,
            active: false,
        },
        {
            id: "7",
            name: "Punitha senthil",
            avatar: "/placeholder.svg?height=40&width=40",
            lastMessage: "This is a Figma Community file.Community is a...",
            timestamp: "Last week",
            unread: false,
            favorite: false,
            important: false,
            active: false,
        }
    ];
    
    // Messages data
    const messages = [
        {
            id: "1",
            senderId: "current-user",
            text: "Hey Grace, how's it going?",
            timestamp: "06:20",
            status: "sent",
        },
        {
            id: "2",
            senderId: "1",
            text: "Hi Jack! I'm doing well, thanks. Can't wait for the weekend!",
            timestamp: "06:20",
            status: "read",
        },
        {
            id: "3",
            senderId: "1",
            text: "Hiking sounds amazing! I might catch up on some reading and also meet up with a few friends on Sunday.",
            timestamp: "06:20",
            status: "read",
        },
        {
            id: "4",
            senderId: "current-user",
            text: "I know, right? Weekend plans are the best. Any exciting plans on your end?",
            timestamp: "06:21",
            status: "sent",
        },
        {
            id: "5",
            senderId: "1",
            text: "I'm thinking of going for a hike on Saturday. How about you?",
            timestamp: "06:21",
            status: "read",
        },
        {
            id: "6",
            senderId: "current-user",
            text: "Can't wait for the weekend!",
            timestamp: "06:21",
            status: "sent",
        },
        {
            id: "7",
            senderId: "current-user",
            text: "I know, right? Weekend plans are the best. Any exciting plans on your end?",
            timestamp: "06:21",
            status: "sent",
        },
        {
            id: "8",
            senderId: "1",
            text: "That sounds like a great plan! Excited 😃",
            timestamp: "06:21",
            status: "read",
        }
    ];
    
    // Chat Item Click - Show user's chat
    chatItems.forEach(item => {
        item.addEventListener('click', function() {
            const userId = this.getAttribute('data-user-id');
            const user = users.find(u => u.id === userId);
            
            if (!user) return;
            
            // Update chat header with user info
            document.querySelector('.active-chat .user-name').textContent = user.name;
            document.querySelector('.active-chat .user-status').textContent = `Last seen ${user.lastSeen || 'recently'}`;
            
            // Remove active class from all chat items
            chatItems.forEach(chat => chat.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Remove unread indicator if present
            this.classList.remove('unread');
            
            // Show active chat, hide empty state
            emptyState.classList.add('hidden');
            activeChat.classList.remove('hidden');
            
            // Scroll to bottom of messages
            const messagesContainer = document.querySelector('.messages-container');
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        });
    });
    
    // Back Button Click
    if (backButton) {
        backButton.addEventListener('click', function() {
            emptyState.classList.remove('hidden');
            activeChat.classList.add('hidden');
            
            // Remove active class from all chat items
            chatItems.forEach(chat => chat.classList.remove('active'));
        });
    }
    
    // Send Message
    function sendMessage() {
        const messageText = messageInput.value.trim();
        if (!messageText) return;
        
        // Create new message element
        const messagesContainer = document.querySelector('.messages-container');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message outgoing';
        
        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${messageText}</p>
                <div class="message-time">${currentTime}</div>
            </div>
        `;
        
        // Add message to container and scroll to bottom
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Clear input
        messageInput.value = '';
        
        // Simulate reply after a short delay
        setTimeout(() => {
            simulateReply();
        }, 1500);
    }
    
    // Simulate reply from the other user
    function simulateReply() {
        const messagesContainer = document.querySelector('.messages-container');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message incoming';
        
        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const replies = [
            "That sounds great!",
            "I'll get back to you on that.",
            "Thanks for letting me know.",
            "Can we discuss this further tomorrow?",
            "I'm working on it right now.",
            "Perfect! Just what I needed.",
            "Perfect. Thanks for the clarity 👍.",
            "I appreciate your help!",
            "Let's catch up later.",
            "Sounds good to me.",
            "Thanks for the update!",
            "Thanks for the support! 😊."
        ];
        
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${randomReply}</p>
                <div class="message-time">${currentTime}</div>
            </div>
        `;
        
        // Add message to container and scroll to bottom
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    // Send button click
    if (sendButton) {
        sendButton.addEventListener('click', sendMessage);
    }
    
    // Enter key press in message input
    if (messageInput) {
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }
    
    // Tab switching
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // In a real app, we would filter the chat list based on the selected tab
            const tabType = this.getAttribute('data-tab');
            console.log(`Switched to ${tabType} tab`);
        });
    });
    

    
    // Section toggle (collapse/expand)
    sectionToggles.forEach(toggle => {
        toggle.addEventListener('click', function () {
            const section = this.closest('.chat-section');
            if (!section) {
                console.error('Chat section not found for toggle:', this);
                return;
            }

            const items = section.querySelector('.chat-items');
            if (!items) {
                console.error('Chat items not found in section:', section);
                return;
            }

            const isHidden = items.classList.toggle('hidden');
            this.classList.toggle('fa-chevron-down', !isHidden);
            this.classList.toggle('fa-chevron-right', isHidden);

            // Ensure users are visible within the section when expanded
            if (!isHidden) {
                const users = items.querySelectorAll('.user');
                users.forEach(user => {
                    user.classList.remove('hidden');
                });
            }
        });
    });
    

    
    // Collapse All button
    if (collapseAllButton) {
        collapseAllButton.addEventListener('click', function() {
            const isCollapsing = this.querySelector('i').classList.contains('fa-angles-down');
            
            if (isCollapsing) {
                // Collapse all sections
                sectionToggles.forEach(toggle => {
                    if (toggle.classList.contains('fa-chevron-down')) {
                        toggle.classList.remove('fa-chevron-down');
                        toggle.classList.add('fa-chevron-right');
                        toggle.closest('.chat-section').querySelector('.chat-items').style.display = 'none';
                    }
                });
                
                this.querySelector('i').classList.remove('fa-angles-down');
                this.querySelector('i').classList.add('fa-angles-right');
                this.innerHTML = '<i class="fa-solid fa-angles-right"></i> Expand All Sections';
            } else {
                // Expand all sections
                sectionToggles.forEach(toggle => {
                    if (toggle.classList.contains('fa-chevron-right')) {
                        toggle.classList.remove('fa-chevron-right');
                        toggle.classList.add('fa-chevron-down');
                        toggle.closest('.chat-section').querySelector('.chat-items').style.display = 'flex';
                    }
                });
                
                this.querySelector('i').classList.remove('fa-angles-right');
                this.querySelector('i').classList.add('fa-angles-down');
                this.innerHTML = '<i class="fa-solid fa-angles-down"></i> Collapse All Sections';
            }
        });
    }
    
    // Section options dropdown
    sectionOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Close all other dropdowns
            document.querySelectorAll('.section-dropdown').forEach(dropdown => {
                if (dropdown !== this.nextElementSibling) {
                    dropdown.classList.add('hidden');
                }
            });
            
            // Toggle this dropdown
            this.nextElementSibling.classList.toggle('hidden');
        });
    });
    
    // Chat options dropdown
    chatOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Close all other dropdowns
            document.querySelectorAll('.user-dropdown').forEach(dropdown => {
                if (dropdown !== this.querySelector('.user-dropdown')) {
                    dropdown.classList.add('hidden');
                }
            });
            
            // Toggle this dropdown
            const dropdown = this.querySelector('.user-dropdown');
            if (dropdown) {
                dropdown.classList.toggle('hidden');
            }
        });
    });


        const removeFromFavoriteItems = document.querySelectorAll(".user-dropdown .dropdown-item:nth-child(1)");
        const markAsImportantItems = document.querySelectorAll(".user-dropdown .dropdown-item:nth-child(2)");
        const chatSection = document.querySelector(".chat-section");
      
        // Move user to chat section from favorite
        removeFromFavoriteItems.forEach(item => {
          item.addEventListener("click", function () {
            const userElement = item.closest(".user");
            const parentSection = userElement.parentElement;
      
            // If it's already in chat section, do nothing
            if (chatSection.contains(userElement)) return;
      
            parentSection.removeChild(userElement);
            chatSection.appendChild(userElement);
          });
        });
      
        // Move user to chat section from important
        markAsImportantItems.forEach(item => {
          item.addEventListener("click", function () {
            const userElement = item.closest(".user");
            const parentSection = userElement.parentElement;
      
            // If it's already in chat section, do nothing
            if (chatSection.contains(userElement)) return;
      
            parentSection.removeChild(userElement);
            chatSection.appendChild(userElement);
          });
        });
      

        // Get all Rename buttons
        const renameButtons = document.querySelectorAll('.section-dropdown .dropdown-item:nth-child(1)');
          
        renameButtons.forEach(renameButton => {
          renameButton.addEventListener('click', function () {
            // Find the related section-title
            const section = renameButton.closest('.section-more').previousElementSibling;
          
            if (!section || !section.classList.contains('section-title')) return;
          
            // Check if an input already exists (avoid duplication)
            let input = section.querySelector('input');
            if (!input) {
              const currentText = section.innerText.trim();
              section.innerHTML = `
            <i class="fa-solid fa-chevron-down section-toggle"></i>
            <input type="text" class="editable-input" value="${currentText}" />
              `;
              input = section.querySelector('input');
              input.focus();
          
              // Save on blur
              input.addEventListener('blur', () => {
            const newText = input.value.trim() || "Untitled";
            section.innerHTML = `
              <i class="fa-solid fa-chevron-down section-toggle"></i> ${newText}
            `;
            // Reattach toggle functionality after renaming
            attachSectionToggle(section.querySelector('.section-toggle'));
              });
          
              // Save on Enter
              input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
              input.blur();
            }
              });
            } else {
              input.focus();
            }
          });
        });

        // Function to attach toggle functionality
        function attachSectionToggle(toggle) {
          toggle.addEventListener('click', function () {
            const section = this.closest('.chat-section');
            const items = section.querySelector('.chat-items');
            
            if (this.classList.contains('fa-chevron-down')) {
              // Collapse
              this.classList.remove('fa-chevron-down');
              this.classList.add('fa-chevron-right');
              items.style.display = 'none';
            } else {
              // Expand
              this.classList.remove('fa-chevron-right');
              this.classList.add('fa-chevron-down');
              items.style.display = 'flex';
            }
          });
        }

        // Attach toggle functionality to all existing toggles
        document.querySelectorAll('.section-toggle').forEach(attachSectionToggle);


        
    
    // Voice recording
    let isRecording = false;
    let mediaRecorder;
    let audioChunks = [];
    
    if (voiceRecord) {
        voiceRecord.addEventListener('click', function() {
            if (isRecording) {
                // Stop recording
                mediaRecorder.stop();
                isRecording = false;
                recordingIndicator.classList.add('hidden');
                this.style.color = '';
            } else {
                // Start recording
                navigator.mediaDevices.getUserMedia({ audio: true })
                    .then(stream => {
                        mediaRecorder = new MediaRecorder(stream);
                        mediaRecorder.start();
                        isRecording = true;
                        recordingIndicator.classList.remove('hidden');
                        this.style.color = 'var(--red)';
                        
                        audioChunks = [];
                        mediaRecorder.addEventListener("dataavailable", event => {
                            audioChunks.push(event.data);
                        });
                        
                        mediaRecorder.addEventListener("stop", () => {
                            const audioBlob = new Blob(audioChunks);
                            const audioUrl = URL.createObjectURL(audioBlob);
                            
                            // In a real app, you would send this audio file to the server
                            console.log("Audio recorded:", audioUrl);
                            
                            // Simulate sending a voice message
                            const messagesContainer = document.querySelector('.messages-container');
                            const messageDiv = document.createElement('div');
                            messageDiv.className = 'message outgoing';
                            
                            const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                            
                            messageDiv.innerHTML = `
                                <div class="message-content">
                                    <p>🎤 Voice message</p>
                                    <audio controls src="${audioUrl}"></audio>
                                    <div class="message-time">${currentTime}</div>
                                </div>
                            `;
                            
                            messagesContainer.appendChild(messageDiv);
                            messagesContainer.scrollTop = messagesContainer.scrollHeight;
                            
                            // Stop all tracks
                            stream.getTracks().forEach(track => track.stop());
                        });
                    })
                    .catch(err => {
                        console.error("Error accessing microphone:", err);
                        alert("Could not access microphone. Please check permissions.");
                    });
            }
        });
    }
    
    // File attachment
    if (attachmentButton) {
        attachmentButton.addEventListener('click', function() {
            fileInput.click();
        });
        
        fileInput.addEventListener('change', function() {
            if (this.files.length > 0) {
                const files = Array.from(this.files);
                
                files.forEach(file => {
                    // In a real app, you would upload this file to the server
                    console.log("File selected:", file.name, file.type);
                    
                    // Simulate sending a file message
                    const messagesContainer = document.querySelector('.messages-container');
                    const messageDiv = document.createElement('div');
                    messageDiv.className = 'message outgoing';
                    
                    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    const isImage = file.type.startsWith('image/');
                    
                    let filePreview = '';
                    if (isImage) {
                        const fileUrl = URL.createObjectURL(file);
                        filePreview = `<img src="${fileUrl}" style="max-width: 200px; max-height: 200px; margin-top: 8px; border-radius: 4px;">`;
                    }
                    
                    messageDiv.innerHTML = `
                        <div class="message-content">
                            <p>📎 ${file.name}</p>
                            ${filePreview}
                            <div class="message-time">${currentTime}</div>
                        </div>
                    `;
                    
                    messagesContainer.appendChild(messageDiv);
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                });
                
                // Reset file input
                this.value = '';
            }
        });
    }
    
    // Help Panel
    if (helpIcon) {
        helpIcon.addEventListener('click', function() {
            helpPanel.classList.remove('hidden');
        });
    }
    
    if (helpClose) {
        helpClose.addEventListener('click', function() {
            helpPanel.classList.add('hidden');
        });
    }
    
    // Settings Modal
    if (settingsIcon) {
        settingsIcon.addEventListener('click', function() {
            settingsModal.classList.remove('hidden');
        });
    }
    
    if (settingsClose) {
        settingsClose.addEventListener('click', function() {
            settingsModal.classList.add('hidden');
        });
    }
    
    // Dark Mode Toggle
    if (darkModeToggle) {
        // Check if user has a preference stored
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            darkModeToggle.checked = true;
        }
        
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
    
    // Call Modal
    if (voiceCallIcon) {
        voiceCallIcon.addEventListener('click', function() {
            callModal.classList.remove('hidden');
            document.querySelector('.call-action.video').style.display = 'none';
            // In a real app, we would set up the call type (voice)
        });
    }
    
    if (videoCallIcon) {
        videoCallIcon.addEventListener('click', function() {
            callModal.classList.remove('hidden');
            document.querySelector('.call-action.video').style.display = 'flex';
            // In a real app, we would set up the call type (video)
        });
    }
    
    if (callClose) {
        callClose.addEventListener('click', function() {
            callModal.classList.add('hidden');
        });
    }
    
    // Emoji Picker
    if (emojiButton) {
        emojiButton.addEventListener('click', function(e) {
            e.stopPropagation();
            emojiPicker.classList.toggle('hidden');
        });
        
        emojis.forEach(emoji => {
            emoji.addEventListener('click', function() {
                messageInput.value += this.textContent;
                messageInput.focus();
            });
        });
    }
    
    
    // Notification Dropdown
    if (notificationIcon) {
        notificationIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            notificationDropdown.classList.toggle('hidden');
        });
    }
    
    // Close dropdowns and modals when clicking outside
    document.addEventListener('click', function(e) {
        // Close emoji picker if open
        if (!emojiButton.contains(e.target) && !emojiPicker.contains(e.target)) {
            emojiPicker.classList.add('hidden');
        }
        
        // Close notification dropdown if open
        if (!notificationIcon.contains(e.target) && !notificationDropdown.contains(e.target)) {
            notificationDropdown.classList.add('hidden');
        }
        
        // Close section dropdowns if open
        document.querySelectorAll('.section-dropdown').forEach(dropdown => {
            const sectionMore = dropdown.previousElementSibling;
            if (!dropdown.classList.contains('hidden') && !dropdown.contains(e.target) && !sectionMore.contains(e.target)) {
                dropdown.classList.add('hidden');
            }
        });
        
        // Close user dropdowns if open
        document.querySelectorAll('.user-dropdown').forEach(dropdown => {
            const chatOptions = dropdown.parentElement;
            if (!dropdown.classList.contains('hidden') && !dropdown.contains(e.target) && !chatOptions.contains(e.target)) {
                dropdown.classList.add('hidden');
            }
        });
    });


        // // Function to remove from favorites (move the chat to another section)
        // function removeFromFavorites(element) {
        //     const chatItem = element.closest('.chat-item');
        //     if (chatItem) {
        //         const chatsSection = document.querySelector('[data-section="chats"] .chat-items');
        //         if (chatsSection) {
        //             chatsSection.appendChild(chatItem);
        //             alert("Chat removed from favorites!");
        //         }
        //     }
        // }

        // // Function to delete chat (remove the chat only from the favorites section)
        // function deleteFavoriteChat(element) {
        //     const chatItem = element.closest('.chat-item');
        //     const favoriteSection = document.querySelector('[data-section="favorite"] .chat-items');
        //     if (chatItem && favoriteSection.contains(chatItem)) {
        //         chatItem.remove();
        //         alert("Chat deleted from favorites!");
        //     }
        // }

function closeAllDropdowns() {
    document.querySelectorAll('.user-dropdown, .nested-dropdown').forEach(el => {
        el.classList.add('hidden');
    });
}

// Toggle user dropdown menu
document.querySelectorAll('.chat-options i').forEach(icon => {
    icon.addEventListener('click', function (e) {
        e.stopPropagation();
        closeAllDropdowns(); // close others
        const dropdown = this.nextElementSibling;
        if (dropdown) dropdown.classList.toggle('hidden');
    });
});

// Toggle nested dropdown ("Move to")
document.querySelectorAll('.has-submenu').forEach(item => {
    item.addEventListener('click', function (e) {
        e.stopPropagation();
        const nested = this.querySelector('.nested-dropdown');
        if (nested) nested.classList.toggle('hidden');
    });
});

// Close dropdowns on outside click
document.addEventListener('click', () => {
    closeAllDropdowns();
});

});