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
     * Check if an action requires navigation steps before execution
     * In simplified MVP, we don't use navigation steps
     */
    checkNavigationSteps(actionName: string): Action[] | null;
    /**
     * Execute a sequence of actions
     * Simplified for MVP to directly execute actions without navigation steps
     */
    executeActions(actions: Action[]): Promise<boolean>;
    /**
     * Execute a single action
     */
    private executeAction;
    /**
     * Find an element in the DOM by its ID
     * Simplified for MVP to use direct ID lookup and data-ai-* attributes
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
