import { Message, ChatWidgetOptions } from '../types';
export declare class ChatWidget {
    private container;
    private messageList;
    private inputField;
    private isOpen;
    private options;
    private onSendMessage;
    constructor(onSendMessage: (message: string) => void, options?: ChatWidgetOptions);
    /**
     * Initialize the chat widget
     */
    init(): void;
    /**
     * Show the chat widget
     */
    show(): void;
    /**
     * Hide the chat widget
     */
    hide(): void;
    /**
     * Toggle the chat widget visibility
     */
    toggle(): void;
    /**
     * Add a new message to the chat
     */
    addMessage(message: Message): void;
    /**
     * Update the messages in the chat
     */
    updateMessages(messages: Message[]): void;
    /**
     * Destroy the chat widget
     */
    destroy(): void;
    /**
     * Create the widget DOM structure
     */
    private createWidgetDOM;
    /**
     * Add the widget styles to the document
     */
    private addStyles;
    /**
     * Attach event listeners to the widget elements
     */
    private attachEventListeners;
    /**
     * Handle sending a message
     */
    private handleSendMessage;
    /**
     * Merge provided options with default options
     */
    private mergeWithDefaultOptions;
}
