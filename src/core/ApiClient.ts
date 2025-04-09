import { APIRequest, APIResponse, ActionMap, Message } from '../types';

export class ApiClient {
  private apiKey: string;
  private endpoint: string;
  private sessionId: string | null = null;

  constructor(apiKey: string, endpoint: string = 'https://api.notific.ai/v1') {
    this.apiKey = apiKey;
    // Remove trailing slash to avoid double slashes in URL paths
    this.endpoint = endpoint.endsWith('/') ? endpoint.slice(0, -1) : endpoint;
  }

  /**
   * Send a user message and action map to the API
   */
  public async sendMessage(
    message: string, 
    actionMap: ActionMap, 
    pageContext: any = {}
  ): Promise<APIResponse> {
    const url = `${this.endpoint}/process`;
    
    const request: APIRequest = {
      message,
      actionMap,
      ...(this.sessionId ? { sessionId: this.sessionId } : {}),
      pageContext
    };
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
          // Removing X-Notific-SDK-Version header to avoid CORS issues
        },
        body: JSON.stringify(request),
        mode: 'cors',
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data: APIResponse = await response.json();
      
      // Store the session ID for future requests
      if (data.sessionId) {
        this.sessionId = data.sessionId;
      }
      
      return data;
    } catch (error) {
      console.error('Error sending message to API:', error);
      
      // Return a fallback response
      return {
        response: {
          actions: [],
          message: {
            id: `error-${Date.now()}`,
            role: 'assistant',
            content: 'Sorry, I encountered an error processing your request. Please try again later.',
            timestamp: Date.now()
          }
        },
        sessionId: this.sessionId || `fallback-${Date.now()}`
      };
    }
  }

  /**
   * Send feedback about an interaction
   */
  public async sendFeedback(
    messageId: string, 
    feedback: 'positive' | 'negative', 
    comment?: string
  ): Promise<boolean> {
    if (!this.sessionId) {
      return false;
    }
    
    const url = `${this.endpoint}/feedback`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
          // Removing X-Notific-SDK-Version header to avoid CORS issues
        },
        body: JSON.stringify({
          sessionId: this.sessionId,
          messageId,
          feedback,
          comment
        }),
        mode: 'cors',
        credentials: 'include'
      });
      
      return response.ok;
    } catch (error) {
      console.error('Error sending feedback:', error);
      return false;
    }
  }

  /**
   * Get the conversation history
   */
  public async getConversationHistory(): Promise<Message[]> {
    if (!this.sessionId) {
      return [];
    }
    
    const url = `${this.endpoint}/conversation/${this.sessionId}`;
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
          // Removing X-Notific-SDK-Version header to avoid CORS issues
        },
        mode: 'cors',
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      return data.messages || [];
    } catch (error) {
      console.error('Error fetching conversation history:', error);
      return [];
    }
  }
}