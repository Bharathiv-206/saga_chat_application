document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const sidebar = document.getElementById('sidebar');
    const newItemsBtn = document.getElementById('new-items-btn');
    const newItemsDropdown = document.getElementById('new-items-dropdown');
    const contactItems = document.querySelectorAll('.contact-item');
    const emptyState = document.getElementById('empty-state');
    const chatArea = document.getElementById('chat-area');
    const backBtn = document.getElementById('back-btn');
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');
    const emojiBtn = document.getElementById('emoji-btn');
    const emojiPicker = document.getElementById('emoji-picker');
    const emojis = document.querySelectorAll('.emoji');
    const attachmentBtn = document.getElementById('attachment-btn');
    const attachmentOptions = document.getElementById('attachment-options');
    const fileInput = document.getElementById('file-input');
    const voiceCallBtn = document.getElementById('voice-call-btn');
    const videoCallBtn = document.getElementById('video-call-btn');
    const callModal = document.getElementById('call-modal');
    const callType = document.getElementById('call-type');
    const callName = document.getElementById('call-name');
    const callAvatar = document.getElementById('call-avatar');
    const endCallBtn = document.getElementById('end-call-btn');
    const chatMessages = document.getElementById('chat-messages');
    const profileTrigger = document.getElementById('profile-trigger');
    const profileDrawer = document.getElementById('profile-drawer');
    const closeProfileBtn = document.getElementById('close-profile-btn');
    const chatMenuBtn = document.getElementById('chat-menu-btn');
    const chatMenuOptions = document.getElementById('chat-menu-options');
    const contextMenu = document.getElementById('context-menu');
    const reactionOptions = document.getElementById('reaction-options');
    const messageOptionsMenu = document.getElementById('message-options-menu');
    const helpBtn = document.getElementById('help-btn');
    const helpDrawer = document.getElementById('help-drawer');
    const closeHelpBtn = document.getElementById('close-help-btn');
    const notificationBtn = document.getElementById('notification-btn');
    const notificationDrawer = document.getElementById('notification-drawer');
    const closeNotificationBtn = document.getElementById('close-notification-btn');
    const settingsBtn = document.getElementById('settings-btn');
    const settingsModal = document.getElementById('settings-modal');
    const closeSettingsBtn = document.getElementById('close-settings-btn');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileActionsBtn = document.getElementById('mobile-actions-btn');

    // Contact data
    const contacts = {
        bharathi: {
            name: 'Bharathi Ragav',
            avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MessageContent.jpg-bNTN3Sh7g1SAg496Xv7wdx1Q5OIbTy.jpeg',
            about: "Hey there! I'm using Saga Chat",
            phone: '+91 98765 43210',
            messages: [
                { id: 1, text: "Hey Grace, how's it going?", sent: false, time: '06:20', status: 'read' },
                { id: 2, text: "Hi Jack! I'm doing well, thanks. Can't wait for the weekend!", sent: true, time: '06:20', status: 'read' },
                { id: 3, text: "Hiking sounds amazing! I might catch up on some reading and also meet up with a few friends on Sunday.", sent: true, time: '06:20', status: 'read' },
                { id: 4, text: "I know, right? Weekend plans are the best. Any exciting plans on your end?", sent: false, time: '06:21', status: 'read' },
                { id: 5, text: "I'm thinking of going for a hike on Saturday. How about you?", sent: true, time: '06:21', status: 'read' },
                { id: 6, text: "Can't wait for the weekend!", sent: false, time: '06:21', status: 'read' },
                { id: 7, text: "I know, right? Weekend plans are the best. Any exciting plans on your end?", sent: false, time: '06:21', status: 'read' },
                { id: 8, text: "That sounds like a great plan! Excited 😃", sent: true, time: '06:21', status: 'read' },
                { id: 9, text: "Can't wait for the weekend!", sent: false, time: '06:21', status: 'read', reactions: [{ emoji: '👍', count: 1 }] },
                { id: 10, type: 'image', url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MessageContent.jpg-bNTN3Sh7g1SAg496Xv7wdx1Q5OIbTy.jpeg', sent: true, time: '06:22', status: 'delivered' },
                { id: 11, type: 'file', name: 'Project_Report.pdf', size: '2.5 MB', sent: false, time: '06:23', status: 'delivered' },
                { id: 12, type: 'audio', url: '#', duration: '0:30', sent: true, time: '06:24', status: 'sent' },
                { id: 13, text: "Check out this document I sent", sent: false, time: '06:25', status: 'sent', replyTo: { id: 11, text: 'Project_Report.pdf' } }
            ]
        },
        thamizharan: {
            name: 'Thamizharan Raguraman',
            avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/All.jpg-4NF0XTn1zkBw2uMu3SduMwOz4JePAk.jpeg',
            about: "Available",
            phone: '+91 87654 32109',
            messages: [
                { id: 1, text: "This is a Figma Community file. Community is a...", sent: false, time: '10:15', status: 'delivered' },
                { id: 2, text: "Thanks for sharing this!", sent: true, time: '10:20', status: 'delivered' }
            ]
        },
        senkathir: {
            name: 'Senkathir Selvan Selvamani',
            avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/All.jpg-4NF0XTn1zkBw2uMu3SduMwOz4JePAk.jpeg',
            about: "At work",
            phone: '+91 76543 21098',
            messages: [
                { id: 1, text: "Hey team! Are we all set for the dashboard UI...", sent: false, time: '09:30', status: 'sent' },
                { id: 2, text: "Yes, I've reviewed the designs. Looking good!", sent: true, time: '09:35', status: 'sent' }
            ]
        },
        ethiraj: {
            name: 'Ethiraj Bro Sagasoft',
            avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/All.jpg-4NF0XTn1zkBw2uMu3SduMwOz4JePAk.jpeg',
            about: "Busy",
            phone: '+91 65432 10987',
            messages: [
                { id: 1, text: "Almost ready, just finishing a few points.", sent: false, time: '14:45', status: 'sent' },
                { id: 2, text: "Great! Let me know when it's done.", sent: true, time: '14:50', status: 'sent' }
            ]
        },
        janani: {
            name: 'Janani Radhakrishnan Sagasoft',
            avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/All.jpg-4NF0XTn1zkBw2uMu3SduMwOz4JePAk.jpeg',
            about: "In a meeting",
            phone: '+91 54321 09876',
            messages: [
                { id: 1, text: "Hi guys! I've added my wireframe ideas to the...", sent: false, time: '16:20', status: 'read' },
                { id: 2, text: "I'll take a look at them soon!", sent: true, time: '16:22', status: 'read' }
            ]
        }
    };

    let currentContact = null;
    let selectedFile = null;
    let activeMessageId = null;

    // Check for dark mode preference
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDarkMode) {
        document.body.classList.add('dark-mode');
        if (darkModeToggle) darkModeToggle.checked = true;
    }

    // Dark mode toggle
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', function() {
            document.body.classList.toggle('dark-mode', this.checked);
        });
    }

    // New items dropdown
    newItemsBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        newItemsDropdown.classList.toggle('show');
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!newItemsBtn.contains(e.target)) {
            newItemsDropdown.classList.remove('show');
        }
        
        if (!emojiBtn.contains(e.target) && !emojiPicker.contains(e.target)) {
            emojiPicker.style.display = 'none';
        }
        
        if (!attachmentBtn.contains(e.target) && !attachmentOptions.contains(e.target)) {
            attachmentOptions.style.display = 'none';
        }
        
        if (!chatMenuBtn.contains(e.target) && !chatMenuOptions.contains(e.target)) {
            chatMenuOptions.style.display = 'none';
        }
        
        // Hide context menu
        if (!e.target.closest('.contact-actions') && !contextMenu.contains(e.target)) {
            contextMenu.style.display = 'none';
        }
        
        // Hide reaction options
        if (!reactionOptions.contains(e.target)) {
            reactionOptions.style.display = 'none';
        }
        
        // Hide message options menu
        if (!messageOptionsMenu.contains(e.target) && !e.target.closest('.message-options-trigger')) {
            messageOptionsMenu.style.display = 'none';
        }
    });

    // Contact selection
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            const contactId = this.getAttribute('data-contact');
            selectContact(contactId);
            
            // On mobile, hide sidebar after selecting contact
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('show');
            }
        });
        
        // Context menu for contact items
        const actionsBtn = item.querySelector('.contact-actions');
        if (actionsBtn) {
            actionsBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const rect = this.getBoundingClientRect();
                contextMenu.style.display = 'block';
                contextMenu.style.top = `${rect.bottom + window.scrollY}px`;
                contextMenu.style.left = `${rect.left + window.scrollX - contextMenu.offsetWidth + rect.width}px`;
            });
        }
    });

    // Back button (mobile)
    backBtn.addEventListener('click', function() {
        chatArea.style.display = 'none';
        emptyState.style.display = 'flex';
        currentContact = null;
    });

    // Profile drawer
    profileTrigger.addEventListener('click', function() {
        profileDrawer.classList.add('show');
    });
    
    closeProfileBtn.addEventListener('click', function() {
        profileDrawer.classList.remove('show');
    });

    // Help drawer
    helpBtn.addEventListener('click', function() {
        helpDrawer.classList.add('show');
    });
    
    closeHelpBtn.addEventListener('click', function() {
        helpDrawer.classList.remove('show');
    });

    // Notification drawer
    notificationBtn.addEventListener('click', function() {
        notificationDrawer.classList.add('show');
    });
    
    closeNotificationBtn.addEventListener('click', function() {
        notificationDrawer.classList.remove('show');
    });

    // Settings modal
    settingsBtn.addEventListener('click', function() {
        settingsModal.style.display = 'flex';
    });
    
    closeSettingsBtn.addEventListener('click', function() {
        settingsModal.style.display = 'none';
    });

    // Chat menu
    chatMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        chatMenuOptions.style.display = chatMenuOptions.style.display === 'flex' ? 'none' : 'flex';
    });

    // Send message
    sendBtn.addEventListener('click', sendMessage);

    // Send message on Enter key
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Emoji picker
    emojiBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (emojiPicker.style.display === 'flex') {
            emojiPicker.style.display = 'none';
        } else {
            emojiPicker.style.display = 'flex';
            attachmentOptions.style.display = 'none';
        }
    });

    // Emoji selection
    emojis.forEach(emoji => {
        emoji.addEventListener('click', function() {
            const emojiChar = this.textContent;
            messageInput.value += emojiChar;
            messageInput.focus();
        });
    });

    // Attachment options
    attachmentBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (attachmentOptions.style.display === 'grid') {
            attachmentOptions.style.display = 'none';
        } else {
            attachmentOptions.style.display = 'grid';
            emojiPicker.style.display = 'none';
        }
    });

    // File attachment
    document.querySelectorAll('.attachment-option').forEach(option => {
        option.addEventListener('click', function() {
            if (this.querySelector('.attachment-icon').classList.contains('photo') || 
                this.querySelector('.attachment-icon').classList.contains('video') || 
                this.querySelector('.attachment-icon').classList.contains('document')) {
                fileInput.click();
            } else {
                alert('This feature is not implemented in the demo.');
            }
            attachmentOptions.style.display = 'none';
        });
    });

    // Voice call
    voiceCallBtn.addEventListener('click', function() {
        if (currentContact) {
            callType.textContent = 'Voice Call';
            callName.textContent = contacts[currentContact].name;
            callAvatar.src = contacts[currentContact].avatar;
            callModal.style.display = 'flex';
            
            // Simulate call connection after 2 seconds
            setTimeout(function() {
                document.getElementById('call-status').textContent = 'Connected';
                startCallTimer();
            }, 2000);
        }
    });

    // Video call
    videoCallBtn.addEventListener('click', function() {
        if (currentContact) {
            callType.textContent = 'Video Call';
            callName.textContent = contacts[currentContact].name;
            callAvatar.src = contacts[currentContact].avatar;
            callModal.style.display = 'flex';
            
            // Simulate call connection after 2 seconds
            setTimeout(function() {
                document.getElementById('call-status').textContent = 'Connected';
                startCallTimer();
            }, 2000);
        }
    });

    // End call
    endCallBtn.addEventListener('click', function() {
        callModal.style.display = 'none';
        document.getElementById('call-status').textContent = 'Calling...';
        document.getElementById('call-duration').textContent = '00:00';
        if (callTimerInterval) {
            clearInterval(callTimerInterval);
            callTimerInterval = null;
        }
    });

    // Mobile menu button
    mobileMenuBtn.addEventListener('click', function() {
        sidebar.classList.toggle('show');
    });

    // Functions

    // Select contact and load chat
    function selectContact(contactId) {
        if (contacts[contactId]) {
            currentContact = contactId;
            
            // Update contact items active state
            contactItems.forEach(item => {
                if (item.getAttribute('data-contact') === contactId) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
            
            // Update chat header
            document.getElementById('current-chat-name').textContent = contacts[contactId].name;
            document.getElementById('current-chat-avatar').src = contacts[contactId].avatar;
            document.getElementById('profile-name').textContent = contacts[contactId].name;
            document.getElementById('profile-avatar').src = contacts[contactId].avatar;
            
            // Clear chat messages
            chatMessages.innerHTML = '';
            
            // Load messages
            contacts[contactId].messages.forEach(msg => {
                if (msg.type) {
                    addMessage(msg.type, msg.sent, msg.type === 'file' ? { name: msg.name, size: msg.size } : 
                                                  msg.type === 'audio' ? { url: msg.url, duration: msg.duration } : 
                                                  { url: msg.url }, msg.time, msg.id, msg.reactions, msg.replyTo);
                } else {
                    addMessage('text', msg.sent, { text: msg.text }, msg.time, msg.id, msg.reactions, msg.replyTo);
                }
            });
            
            // Show chat area, hide empty state
            emptyState.style.display = 'none';
            chatArea.style.display = 'flex';
            
            // Scroll to bottom of messages
            scrollToBottom();
        }
    }

    // Send message
    function sendMessage() {
        const message = messageInput.value.trim();
        if (message && currentContact) {
            // Add message to UI
            const messageId = Date.now();
            addMessage('text', true, { text: message }, null, messageId);
            
            // Add message to contact data
            const now = new Date();
            const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
            contacts[currentContact].messages.push({
                id: messageId,
                text: message,
                sent: true,
                time: time,
                status: 'sent'
            });
            
            // Clear input
            messageInput.value = '';
            
            // Scroll to bottom
            scrollToBottom();
            
            // Simulate reply after 1-3 seconds
            if (Math.random() > 0.5) {
                const replyDelay = Math.floor(Math.random() * 2000) + 1000;
                setTimeout(function() {
                    const replies = [
                        "That's interesting!",
                        "I see what you mean.",
                        "Thanks for letting me know.",
                        "I'll get back to you on that.",
                        "Sounds good to me!",
                        "Let me think about it.",
                        "I appreciate your input.",
                        "Great idea!",
                        "I'll check and let you know.",
                        "Perfect!"
                    ];
                    const randomReply = replies[Math.floor(Math.random() * replies.length)];
                    
                    // Add reply to UI
                    const replyId = Date.now();
                    addMessage('text', false, { text: randomReply }, null, replyId);
                    
                    // Add reply to contact data
                    const replyTime = new Date();
                    const replyTimeStr = `${replyTime.getHours().toString().padStart(2, '0')}:${replyTime.getMinutes().toString().padStart(2, '0')}`;
                    contacts[currentContact].messages.push({
                        id: replyId,
                        text: randomReply,
                        sent: false,
                        time: replyTimeStr,
                        status: 'sent'
                    });
                    
                    // Scroll to bottom
                    scrollToBottom();
                }, replyDelay);
            }
        }
    }

    // Add message to chat
    function addMessage(type, sent, data, time, id, reactions, replyTo) {
        const now = new Date();
        const timeStr = time || `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        
        // Create message container
        const messageEl = document.createElement('div');
        messageEl.className = `message ${sent ? 'sent' : ''}`;
        messageEl.setAttribute('data-id', id || Date.now());
        
        // Create message content
        const contentEl = document.createElement('div');
        contentEl.className = 'message-content';
        
        // Add reply if exists
        if (replyTo) {
            const replyEl = document.createElement('div');
            replyEl.className = 'message-reply';
            replyEl.textContent = replyTo.text;
            contentEl.appendChild(replyEl);
        }
        
        // Create message based on type
        if (type === 'text') {
            const textEl = document.createElement('div');
            textEl.className = 'message-text';
            textEl.textContent = data.text;
            contentEl.appendChild(textEl);
        } else if (type === 'image') {
            const imgEl = document.createElement('img');
            imgEl.className = 'message-image';
            imgEl.src = data.url;
            imgEl.alt = 'Image';
            contentEl.appendChild(imgEl);
        } else if (type === 'file') {
            const fileEl = document.createElement('div');
            fileEl.className = 'message-file';
            
            const iconEl = document.createElement('div');
            iconEl.className = 'message-file-icon';
            iconEl.innerHTML = '<i class="fas fa-file"></i>';
            
            const infoEl = document.createElement('div');
            infoEl.className = 'message-file-info';
            
            const nameEl = document.createElement('div');
            nameEl.className = 'message-file-name';
            nameEl.textContent = data.name;
            
            const sizeEl = document.createElement('div');
            sizeEl.className = 'message-file-size';
            sizeEl.textContent = data.size;
            
            infoEl.appendChild(nameEl);
            infoEl.appendChild(sizeEl);
            fileEl.appendChild(iconEl);
            fileEl.appendChild(infoEl);
            contentEl.appendChild(fileEl);
        } else if (type === 'audio') {
            const audioEl = document.createElement('audio');
            audioEl.className = 'message-audio';
            audioEl.controls = true;
            audioEl.src = data.url || '#';
            contentEl.appendChild(audioEl);
        } else if (type === 'video')
        {
            const videoEl = document.createElement('video');
            videoEl.className = 'message-video';
            videoEl.controls = true;
            videoEl.src = data.url || '#';
            contentEl.appendChild(videoEl);
        }
        }
        else if (type === 'document') {
            const docEl = document.createElement('div');
            docEl.className = 'message-document';
            
            const iconEl = document.createElement('div');
            iconEl.className = 'message-document-icon';
            iconEl.innerHTML = '<i class="fas fa-file"></i>';
            
            const infoEl = document.createElement('div');
            infoEl.className = 'message-document-info';
            
            const nameEl = document.createElement('div');
            nameEl.className = 'message-document-name';
            nameEl.textContent = data.name;
            
            const sizeEl = document.createElement('div');
            sizeEl.className = 'message-document-size';
            sizeEl.textContent = data.size;
            
            infoEl.appendChild(nameEl);
            infoEl.appendChild(sizeEl);
            docEl.appendChild(iconEl);
            docEl.appendChild(infoEl);
            contentEl.appendChild(docEl);
        }
        else if (type === 'location') {
            const locationEl = document.createElement('div');
            locationEl.className = 'message-location';
            locationEl.textContent = 'Location shared';
            contentEl.appendChild(locationEl);
        }
        else if (type === 'contact') {
            const contactEl = document.createElement('div');
            contactEl.className = 'message-contact';
            contactEl.textContent = 'Contact shared';
            contentEl.appendChild(contactEl);
        }
        else if (type === 'sticker') {
            const stickerEl = document.createElement('img');
            stickerEl.className = 'message-sticker';
        }