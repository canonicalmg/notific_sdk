import { Action, ActionMap } from '../types';
export declare class ActionExecutor {
    private actionMap;
    private elementCache;
    constructor(actionMap: ActionMap);
    /**
     * Update the action map
     */
    updateActionMap(actionMap: ActionMap): void;
    /**
     * Execute a sequence of actions
     */
    executeActions(actions: Action[]): Promise<boolean>;
    /**
     * Execute a single action
     */
    private executeAction;
    /**
     * Find an element in the DOM by its ID
     */
    private findElementById;
    /**
     * Add a visual highlight effect to an element
     */
    private highlightElement;
    /**
     * Fill an input field with the given value
     */
    private fillField;
    /**
     * Click an element
     */
    private clickElement;
    /**
     * Select an option in a dropdown
     */
    private selectOption;
    /**
     * Scroll to make an element visible
     */
    private scrollToElement;
    /**
     * Execute a custom action
     */
    private executeCustomAction;
    /**
     * Create a promise that resolves after a delay
     */
    private delay;
}
