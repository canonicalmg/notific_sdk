import { SDKConfig, ActionMap, Message } from './types';
declare class NotificAIClass {
    private config;
    private actionMapBuilder;
    private actionExecutor;
    private apiClient;
    private chatWidget;
    private messages;
    private initialized;
    static _instance: NotificAIClass | null;
    constructor(config?: Partial<SDKConfig>);
    /**
     * Initialize the SDK
     */
    init(config?: Partial<SDKConfig>): NotificAIClass;
    /**
     * Show the chat widget
     */
    show(): void;
    /**
     * Hide the chat widget
     */
    hide(): void;
    /**
     * Destroy the SDK instance
     */
    destroy(): void;
    /**
     * Send a user message programmatically
     * @returns The response from the API
     */
    sendMessage(message: string): Promise<any>;
    /**
     * Handle a user message
     * @returns The response from the API
     */
    private handleUserMessage;
    /**
     * Get the current messages
     */
    getMessages(): Message[];
    /**
     * Get the current action map
     */
    getActionMap(): ActionMap | null;
}
export declare const NotificAI: typeof NotificAIClass;
export default NotificAIClass;
export type { SDKConfig, ActionMap, ActionableElement, Message, Action, ActionResponse, APIRequest, APIResponse, ChatWidgetOptions } from './types';
