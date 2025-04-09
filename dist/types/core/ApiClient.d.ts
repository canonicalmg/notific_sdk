import { APIResponse, ActionMap, Message } from '../types';
export declare class ApiClient {
    private apiKey;
    private endpoint;
    private sessionId;
    constructor(apiKey: string, endpoint?: string);
    /**
     * Send a user message and action map to the API
     */
    sendMessage(message: string, actionMap: ActionMap, pageContext?: any): Promise<APIResponse>;
    /**
     * Send feedback about an interaction
     */
    sendFeedback(messageId: string, feedback: 'positive' | 'negative', comment?: string): Promise<boolean>;
    /**
     * Get the conversation history
     */
    getConversationHistory(): Promise<Message[]>;
}
