Notific.ai System Overview
System Architecture
Notific.ai is a B2B SaaS product that enables websites to have AI assistants that can actively navigate and interact with UI elements based on natural language user requests. The system consists of three main components:

Frontend SDK - Installed on customer websites
Backend AI Service - Processes natural language and determines actions
Integration Layer - Connects with existing chat solutions (optional)

How It Works
1. Website Implementation

Website owners install the Notific.ai SDK via npm or CDN
Developers add special data attributes to HTML elements:

data-ai-field="field-name" for input fields, dropdowns, etc.
data-ai-action="action-name" for buttons and interactive elements


These tags create a "semantic map" of what actions are possible on each page

2. User Interaction Flow

User visits a website with Notific.ai installed
User types a natural language request into the chat widget (e.g., "I need to update my shipping address")
The SDK captures this request along with the current page context

3. SDK Responsibilities

Build and maintain an up-to-date "action map" of all tagged elements
Send user requests to the backend along with the action map
Execute actions returned from the backend (fill forms, click buttons, etc.)
Provide visual feedback to users as actions are performed
Handle DOM mutations to keep the action map current

4. Backend Processing

Natural language understanding to determine user intent
Matching intent to available actions from the action map
Planning a sequence of steps to accomplish the task
Returning specific action instructions to the SDK

5. Action Execution

SDK receives structured instructions from backend
Executes actions in sequence (with appropriate timing)
Reports success/failure back to the backend
Provides user feedback through the chat interface

Technical Implementation Details
SDK Components

Action Map Builder: Scans DOM for tagged elements
Chat Widget: UI for user interaction (or integration with existing)
Action Executor: Performs DOM manipulations based on instructions
API Client: Communicates with Notific.ai backend
Main Controller: Orchestrates all components

Backend Components

Natural Language Processing Service
Action Planning System
Conversation Management
Analytics and Reporting

Business Value

Reduces support costs by automating common "how-to" questions
Improves user activation and retention by reducing friction
Creates scalable, 24/7 interactive guidance without human support agents
Collects valuable data on common user challenges

Integration Options

Standalone chat widget
Integration with existing chat solutions (Intercom, Drift, etc.)
API-only mode for custom implementations

This system creates a new category of AI assistants that can actively help users accomplish tasks by interacting directly with website interfaces, bridging the gap between static chatbots and human support.
