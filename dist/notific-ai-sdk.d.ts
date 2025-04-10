interface SDKConfig {
    apiKey: string;
    endpoint?: string;
    debug?: boolean;
    chatWidget?: {
        enable: boolean;
        position?: 'left' | 'right';
        customCSS?: string;
    };
}
interface NavigationStep {
    action: string;
    param?: string;
}
interface ActionableElement {
    id: string;
    type: 'field' | 'action' | 'navigation';
    name: string;
    value?: string;
    position: {
        x: number;
        y: number;
    };
    elementType: string;
    label?: string;
    options?: string[];
    required?: boolean;
    disabled?: boolean;
    path: string[];
    providesAccess?: string[];
    accessParam?: string;
}
interface ActionCatalogEntry {
    navigationSteps: NavigationStep[];
}
interface ActionCatalog {
    [actionName: string]: ActionCatalogEntry;
}
interface ActionMap {
    url: string;
    title: string;
    elements: ActionableElement[];
    timestamp: number;
    actionCatalog: ActionCatalog;
    currentContext?: {
        section?: string;
        page?: string;
        [key: string]: string | undefined;
    };
}
interface Message {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: number;
}
interface Action {
    type: 'fill' | 'click' | 'select' | 'scroll' | 'custom';
    elementId: string;
    value?: string;
    options?: any;
}
interface ActionResponse {
    actions: Action[];
    message?: Message;
}
interface APIRequest {
    message: string;
    actionMap: ActionMap;
    sessionId?: string;
    pageContext?: any;
}
interface APIResponse {
    response: ActionResponse;
    sessionId: string;
}
interface ChatWidgetOptions {
    position: 'left' | 'right';
    theme?: {
        primaryColor?: string;
        textColor?: string;
        fontFamily?: string;
    };
    placeholder?: string;
    greeting?: string;
    customCSS?: string;
}

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
declare const NotificAI: typeof NotificAIClass;

export { APIRequest, APIResponse, Action, ActionMap, ActionResponse, ActionableElement, ChatWidgetOptions, Message, NotificAI, SDKConfig, NotificAIClass as default };
