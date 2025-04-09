import { ActionMap } from '../types';
export declare class ActionMapBuilder {
    private observer;
    private actionMap;
    constructor();
    /**
     * Initialize the action map builder and start observing DOM changes
     */
    init(): void;
    /**
     * Destroy the action map builder and stop observing DOM changes
     */
    destroy(): void;
    /**
     * Get the current action map
     */
    getActionMap(): ActionMap;
    /**
     * Create an empty action map structure
     */
    private createEmptyActionMap;
    /**
     * Build the action map by scanning the DOM for actionable elements
     */
    private buildActionMap;
    /**
     * Process a field element and convert it to an ActionableElement
     */
    private processFieldElement;
    /**
     * Process an action element and convert it to an ActionableElement
     */
    private processActionElement;
    /**
     * Find a label element associated with an input element
     */
    private findLabelForElement;
    /**
     * Generate a unique ID for an element
     */
    private generateElementId;
    /**
     * Get the DOM path for an element
     */
    private getDomPath;
    /**
     * Observe DOM mutations to keep the action map updated
     */
    private observeDOM;
}
