export interface SDKConfig {
  apiKey: string;
  endpoint?: string;
  debug?: boolean;
  chatWidget?: {
    enable: boolean;
    position?: 'left' | 'right';
    customCSS?: string;
  };
}

export interface NavigationStep {
  action: string;
  param?: string;
}

export interface ActionableElement {
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
  // New properties for accessibility and navigation
  providesAccess?: string[];
  accessParam?: string;
}

export interface ActionCatalogEntry {
  navigationSteps: NavigationStep[];
}

export interface ActionCatalog {
  [actionName: string]: ActionCatalogEntry;
}

export interface ActionMap {
  url: string;
  title: string;
  elements: ActionableElement[];
  timestamp: number;
  // New properties for improved navigation
  actionCatalog: ActionCatalog;
  currentContext?: {
    section?: string;
    page?: string;
    [key: string]: string | undefined;
  };
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

export interface Action {
  type: 'fill' | 'click' | 'select' | 'scroll' | 'custom';
  elementId: string;
  value?: string;
  options?: any;
}

export interface ActionResponse {
  actions: Action[];
  message?: Message;
}

export interface APIRequest {
  message: string;
  actionMap: ActionMap;
  sessionId?: string;
  pageContext?: any;
}

export interface APIResponse {
  response: ActionResponse;
  sessionId: string;
}

export interface ChatWidgetOptions {
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