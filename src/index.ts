import { ActionMapBuilder } from './core/ActionMapBuilder';
import { ActionExecutor } from './core/ActionExecutor';
import { ApiClient } from './core/ApiClient';
import { ChatWidget } from './components/ChatWidget';
import { SDKConfig, ActionMap, Message, ChatWidgetOptions } from './types';
import { debugLog, getPageContext, generateId } from './utils';

class NotificAIClass {
  private config: SDKConfig;
  private actionMapBuilder: ActionMapBuilder | null = null;
  private actionExecutor: ActionExecutor | null = null;
  private apiClient: ApiClient | null = null;
  private chatWidget: ChatWidget | null = null;
  private messages: Message[] = [];
  private initialized: boolean = false;
  
  // Make instance publicly accessible for debug purposes
  static _instance: NotificAIClass | null = null;

  constructor(config?: Partial<SDKConfig>) {
    this.config = {
      apiKey: '',
      endpoint: 'https://api.notific.ai/v1',
      debug: false,
      chatWidget: {
        enable: true,
        position: 'right'
      },
      ...config
    };
    
    // Store instance reference
    NotificAIClass._instance = this;
  }

  /**
   * Initialize the SDK
   */
  public init(config?: Partial<SDKConfig>): NotificAIClass {
    if (this.initialized) {
      debugLog(this.config.debug || false, 'SDK already initialized');
      return this;
    }

    // Update config if provided
    if (config) {
      this.config = { ...this.config, ...config };
    }

    // Validate API key
    if (!this.config.apiKey) {
      throw new Error('API key is required');
    }

    debugLog(this.config.debug || false, 'Initializing SDK', this.config);

    // Initialize core components
    this.actionMapBuilder = new ActionMapBuilder();
    this.actionMapBuilder.init();

    const actionMap = this.actionMapBuilder.getActionMap();
    this.actionExecutor = new ActionExecutor(actionMap);
    
    this.apiClient = new ApiClient(
      this.config.apiKey,
      this.config.endpoint
    );

    // Initialize chat widget if enabled
    if (this.config.chatWidget?.enable) {
      const chatOptions: ChatWidgetOptions = {
        position: this.config.chatWidget.position || 'right',
        customCSS: this.config.chatWidget.customCSS
      };

      this.chatWidget = new ChatWidget(
        (message) => this.handleUserMessage(message),
        chatOptions
      );
      this.chatWidget.init();
    }

    this.initialized = true;
    return this;
  }

  /**
   * Show the chat widget
   */
  public show(): void {
    if (!this.initialized) {
      this.init();
    }

    if (this.chatWidget) {
      this.chatWidget.show();
    }
  }

  /**
   * Hide the chat widget
   */
  public hide(): void {
    if (this.chatWidget) {
      this.chatWidget.hide();
    }
  }

  /**
   * Destroy the SDK instance
   */
  public destroy(): void {
    if (this.actionMapBuilder) {
      this.actionMapBuilder.destroy();
      this.actionMapBuilder = null;
    }

    if (this.chatWidget) {
      this.chatWidget.destroy();
      this.chatWidget = null;
    }

    this.actionExecutor = null;
    this.apiClient = null;
    this.messages = [];
    this.initialized = false;

    debugLog(this.config.debug || false, 'SDK destroyed');
  }

  /**
   * Send a user message programmatically
   */
  public async sendMessage(message: string): Promise<void> {
    if (!this.initialized) {
      this.init();
    }

    await this.handleUserMessage(message);
  }

  /**
   * Handle a user message
   */
  private async handleUserMessage(message: string): Promise<void> {
    if (!this.actionMapBuilder || !this.actionExecutor || !this.apiClient) {
      throw new Error('SDK not initialized properly');
    }

    // Add user message to messages array
    const userMessage: Message = {
      id: generateId('user'),
      role: 'user',
      content: message,
      timestamp: Date.now()
    };
    this.messages.push(userMessage);

    // Add a loading message
    const loadingMessage: Message = {
      id: generateId('loading'),
      role: 'assistant',
      content: '...',
      timestamp: Date.now()
    };
    this.messages.push(loadingMessage);

    // Update the chat widget if available
    if (this.chatWidget) {
      this.chatWidget.updateMessages(this.messages);
    }

    try {
      // Get the latest action map
      const actionMap = this.actionMapBuilder.getActionMap();
      
      // Update the action executor with the latest action map
      this.actionExecutor.updateActionMap(actionMap);
      
      // Get page context
      const pageContext = getPageContext();
      
      // Send the message to the API
      const response = await this.apiClient.sendMessage(
        message,
        actionMap,
        pageContext
      );

      // Remove the loading message
      this.messages = this.messages.filter(msg => msg.id !== loadingMessage.id);

      // Add the assistant message if available
      if (response.response.message) {
        this.messages.push(response.response.message);
      }

      // Update the chat widget if available
      if (this.chatWidget) {
        this.chatWidget.updateMessages(this.messages);
      }

      // Execute actions if available
      if (response.response.actions && response.response.actions.length > 0) {
        debugLog(
          this.config.debug || false,
          'Executing actions',
          response.response.actions
        );
        
        this.actionExecutor.executeActions(response.response.actions);
      }
    } catch (error) {
      // Remove the loading message
      this.messages = this.messages.filter(msg => msg.id !== loadingMessage.id);

      // Add an error message
      const errorMessage: Message = {
        id: generateId('error'),
        role: 'system',
        content: 'Sorry, there was an error processing your request.',
        timestamp: Date.now()
      };
      this.messages.push(errorMessage);

      // Update the chat widget if available
      if (this.chatWidget) {
        this.chatWidget.updateMessages(this.messages);
      }

      console.error('Error handling user message:', error);
    }
  }

  /**
   * Get the current messages
   */
  public getMessages(): Message[] {
    return this.messages;
  }

  /**
   * Get the current action map
   */
  public getActionMap(): ActionMap | null {
    if (!this.actionMapBuilder) {
      return null;
    }

    return this.actionMapBuilder.getActionMap();
  }
}

// Auto-initialize if data-api-key attribute is present
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const scriptTag = document.querySelector('script[data-api-key]');
    if (scriptTag) {
      const apiKey = scriptTag.getAttribute('data-api-key');
      if (apiKey) {
        const position = scriptTag.getAttribute('data-position') as 'left' | 'right' | undefined;
        const debug = scriptTag.hasAttribute('data-debug');
        
        const notific = new NotificAIClass({
          apiKey,
          debug,
          chatWidget: { 
            enable: true,
            position: position || 'right'
          }
        });
        
        notific.init();
        
        // Make the instance available globally
        (window as any).NotificAI = notific;
      }
    }
  });
}

// Create a named export for ESM imports
export const NotificAI = NotificAIClass;

// Default export for UMD build
export default NotificAIClass;

// Export types
export type {
  SDKConfig,
  ActionMap,
  ActionableElement,
  Message,
  Action,
  ActionResponse,
  APIRequest,
  APIResponse,
  ChatWidgetOptions
} from './types';