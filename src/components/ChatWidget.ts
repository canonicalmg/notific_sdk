import { Message, ChatWidgetOptions } from '../types';

export class ChatWidget {
  private container: HTMLElement | null = null;
  private messageList: HTMLElement | null = null;
  private inputField: HTMLTextAreaElement | null = null;
  private isOpen: boolean = false;
  private options: ChatWidgetOptions;
  private onSendMessage: (message: string) => void;

  constructor(
    onSendMessage: (message: string) => void,
    options: ChatWidgetOptions = { position: 'right' }
  ) {
    this.onSendMessage = onSendMessage;
    this.options = this.mergeWithDefaultOptions(options);
  }

  /**
   * Initialize the chat widget
   */
  public init(): void {
    this.createWidgetDOM();
    this.attachEventListeners();
  }

  /**
   * Show the chat widget
   */
  public show(): void {
    if (this.container) {
      this.container.style.display = 'block';
      setTimeout(() => {
        if (this.container) {
          this.container.classList.add('notific-widget-visible');
        }
      }, 10);
      this.isOpen = true;
    }
  }

  /**
   * Hide the chat widget
   */
  public hide(): void {
    if (this.container) {
      this.container.classList.remove('notific-widget-visible');
      setTimeout(() => {
        if (this.container) {
          this.container.style.display = 'none';
        }
      }, 300);
      this.isOpen = false;
    }
  }

  /**
   * Toggle the chat widget visibility
   */
  public toggle(): void {
    if (this.isOpen) {
      this.hide();
    } else {
      this.show();
    }
  }

  /**
   * Add a new message to the chat
   */
  public addMessage(message: Message): void {
    if (!this.messageList) return;

    const messageElement = document.createElement('div');
    messageElement.className = `notific-message notific-message-${message.role}`;
    messageElement.setAttribute('data-message-id', message.id);

    const contentElement = document.createElement('div');
    contentElement.className = 'notific-message-content';
    contentElement.textContent = message.content;

    messageElement.appendChild(contentElement);
    this.messageList.appendChild(messageElement);

    // Scroll to the bottom
    this.messageList.scrollTop = this.messageList.scrollHeight;
  }

  /**
   * Update the messages in the chat
   */
  public updateMessages(messages: Message[]): void {
    if (!this.messageList) return;

    // Clear existing messages
    this.messageList.innerHTML = '';

    // Add all messages
    for (const message of messages) {
      this.addMessage(message);
    }
  }

  /**
   * Destroy the chat widget
   */
  public destroy(): void {
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }

    // Remove the style element if it exists
    const styleElement = document.getElementById('notific-chat-widget-styles');
    if (styleElement && styleElement.parentNode) {
      styleElement.parentNode.removeChild(styleElement);
    }
  }

  /**
   * Create the widget DOM structure
   */
  private createWidgetDOM(): void {
    // Add styles
    this.addStyles();

    // Create container
    this.container = document.createElement('div');
    this.container.className = 'notific-chat-widget';
    this.container.classList.add(`notific-position-${this.options.position}`);

    // Create toggle button
    const toggleButton = document.createElement('button');
    toggleButton.className = 'notific-toggle-button';
    toggleButton.setAttribute('aria-label', 'Toggle chat assistant');
    toggleButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    `;

    // Create chat container
    const chatContainer = document.createElement('div');
    chatContainer.className = 'notific-chat-container';

    // Create chat header
    const chatHeader = document.createElement('div');
    chatHeader.className = 'notific-chat-header';
    
    const headerTitle = document.createElement('div');
    headerTitle.className = 'notific-header-title';
    headerTitle.textContent = 'AI Assistant';
    
    const closeButton = document.createElement('button');
    closeButton.className = 'notific-close-button';
    closeButton.setAttribute('aria-label', 'Close chat');
    closeButton.innerHTML = '&times;';
    
    chatHeader.appendChild(headerTitle);
    chatHeader.appendChild(closeButton);

    // Create message list
    this.messageList = document.createElement('div');
    this.messageList.className = 'notific-message-list';

    // Create input area
    const inputArea = document.createElement('div');
    inputArea.className = 'notific-input-area';
    
    this.inputField = document.createElement('textarea');
    this.inputField.className = 'notific-input-field';
    this.inputField.placeholder = this.options.placeholder || 'Type your message...';
    this.inputField.rows = 1;
    
    const sendButton = document.createElement('button');
    sendButton.className = 'notific-send-button';
    sendButton.setAttribute('aria-label', 'Send message');
    sendButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
      </svg>
    `;
    
    inputArea.appendChild(this.inputField);
    inputArea.appendChild(sendButton);

    // Assemble components
    chatContainer.appendChild(chatHeader);
    chatContainer.appendChild(this.messageList);
    chatContainer.appendChild(inputArea);

    this.container.appendChild(toggleButton);
    this.container.appendChild(chatContainer);

    // Add to DOM
    document.body.appendChild(this.container);

    // Add system greeting if provided
    if (this.options.greeting) {
      this.addMessage({
        id: 'greeting',
        role: 'system',
        content: this.options.greeting,
        timestamp: Date.now()
      });
    }
  }

  /**
   * Add the widget styles to the document
   */
  private addStyles(): void {
    const { primaryColor = '#0088ff', textColor = '#333', fontFamily = 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' } = this.options.theme || {};

    const styles = `
      .notific-chat-widget {
        position: fixed;
        bottom: 20px;
        z-index: 9999;
        display: none;
        font-family: ${fontFamily};
        transition: opacity 0.3s, transform 0.3s;
        opacity: 0;
        transform: translateY(20px);
      }

      .notific-widget-visible {
        opacity: 1;
        transform: translateY(0);
      }

      .notific-position-right {
        right: 20px;
      }

      .notific-position-left {
        left: 20px;
      }

      .notific-toggle-button {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: ${primaryColor};
        color: white;
        border: none;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2;
      }

      .notific-chat-container {
        position: absolute;
        bottom: 70px;
        right: 0;
        width: 320px;
        height: 400px;
        border-radius: 12px;
        background-color: white;
        box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }

      .notific-position-left .notific-chat-container {
        right: auto;
        left: 0;
      }

      .notific-chat-header {
        padding: 12px 16px;
        background-color: ${primaryColor};
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .notific-header-title {
        font-weight: bold;
      }

      .notific-close-button {
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
        padding: 0;
        line-height: 1;
      }

      .notific-message-list {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .notific-message {
        max-width: 80%;
        padding: 10px 14px;
        border-radius: 16px;
        position: relative;
        word-wrap: break-word;
      }

      .notific-message-user {
        align-self: flex-end;
        background-color: ${primaryColor};
        color: white;
        border-bottom-right-radius: 4px;
      }

      .notific-message-assistant {
        align-self: flex-start;
        background-color: #f0f0f0;
        color: ${textColor};
        border-bottom-left-radius: 4px;
      }

      .notific-message-system {
        align-self: center;
        background-color: #f8f8f8;
        color: #666;
        border-radius: 8px;
        font-style: italic;
        max-width: 90%;
      }

      .notific-input-area {
        padding: 12px;
        border-top: 1px solid #eee;
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .notific-input-field {
        flex: 1;
        resize: none;
        height: 40px;
        max-height: 120px;
        padding: 10px 14px;
        border: 1px solid #ddd;
        border-radius: 20px;
        font-family: inherit;
        font-size: 14px;
        outline: none;
      }

      .notific-input-field:focus {
        border-color: ${primaryColor};
      }

      .notific-send-button {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: ${primaryColor};
        color: white;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .notific-send-button:disabled {
        background-color: #ccc;
        cursor: not-allowed;
      }

      @media (max-width: 480px) {
        .notific-chat-container {
          width: 280px;
          height: 350px;
        }
      }
    `;

    // Add custom CSS if provided
    const customCSS = this.options.customCSS || '';
    const combinedStyles = styles + customCSS;

    const styleElement = document.createElement('style');
    styleElement.id = 'notific-chat-widget-styles';
    styleElement.textContent = combinedStyles;
    document.head.appendChild(styleElement);
  }

  /**
   * Attach event listeners to the widget elements
   */
  private attachEventListeners(): void {
    if (!this.container) return;

    // Toggle button click
    const toggleButton = this.container.querySelector('.notific-toggle-button');
    if (toggleButton) {
      toggleButton.addEventListener('click', () => this.toggle());
    }

    // Close button click
    const closeButton = this.container.querySelector('.notific-close-button');
    if (closeButton) {
      closeButton.addEventListener('click', () => this.hide());
    }

    // Send button click
    const sendButton = this.container.querySelector('.notific-send-button');
    if (sendButton && this.inputField) {
      sendButton.addEventListener('click', () => this.handleSendMessage());
    }

    // Input field keypress
    if (this.inputField) {
      this.inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.handleSendMessage();
        }
      });

      // Auto-resize the input field
      this.inputField.addEventListener('input', () => {
        this.inputField!.style.height = 'auto';
        this.inputField!.style.height = Math.min(this.inputField!.scrollHeight, 120) + 'px';
      });
    }
  }

  /**
   * Handle sending a message
   */
  private handleSendMessage(): void {
    if (!this.inputField) return;

    const message = this.inputField.value.trim();
    if (!message) return;

    // Clear the input field
    this.inputField.value = '';
    this.inputField.style.height = 'auto';

    // Add the message to the UI
    this.addMessage({
      id: `user-${Date.now()}`,
      role: 'user',
      content: message,
      timestamp: Date.now()
    });

    // Call the onSendMessage callback
    this.onSendMessage(message);
  }

  /**
   * Merge provided options with default options
   */
  private mergeWithDefaultOptions(options: ChatWidgetOptions): ChatWidgetOptions {
    return {
      position: options.position || 'right',
      theme: {
        primaryColor: options.theme?.primaryColor || '#0088ff',
        textColor: options.theme?.textColor || '#333',
        fontFamily: options.theme?.fontFamily || 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
      },
      placeholder: options.placeholder || 'Type your message...',
      greeting: options.greeting || 'Hello! How can I help you today?',
      customCSS: options.customCSS || ''
    };
  }
}