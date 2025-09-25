# Havana Take Home Task (Real time chatbot with human intervention)

This project implements a real-time chatbot application with seamless human intervention capabilities. It features a user-facing chat interface and an admin dashboard for human agents to monitor and take over conversations as needed.

![Havana Chatbot Screenshot](https://github.com/ryanjansen/havana/blob/main/screenshot-user.png?raw=true)
![Admin Interface](https://github.com/ryanjansen/havana/blob/main/screenshot-admin.png?raw=true)

## Getting Started

To run the project in development mode, use one of the following commands:

-   With pnpm:
    ```
    pnpm dev
    ```
-   With npm:
    ```
    npm run dev
    ```

The frontend will then be up and running at http://localhost:5173

## Main Parts of the Project

-   **src/**: Contains the main source code for the application, including components, pages, and utilities.
    -   **hooks/**: Custom React hooks for chat and websockets
    -   **components/**: Reusable React components such as chat windows, message bubbles, and UI controls
    -   **pages/**: UserChat page (home page) and Admin pages
-   **public/**: Static assets such as images and icons that are publicly accessible.

## Chat States and Escalation

Each chat can be in one of three states:

-   **AI**: The chatbot is handling the conversation.
-   **Human**: A human agent has taken over the chat.
-   **Handover Pending**: The user has requested a human agent, and the system is in the process of escalating.

Users can request a human agent at any time. When this happens, the chatbot uses OpenAI function calls to escalate the conversation to a human. Human agents can also directly take over any chat and are able to view messages in real time, regardless of the current chat state.

## Real-Time Communication with WebSockets

Both users and admins connect to a shared WebSocket manager, enabling real-time updates for all participants. This architecture ensures that any changes in chat state, new messages, or escalations are instantly broadcasted to all relevant clients.

AI-generated messages are also sent through the WebSocket connection, rather than via a REST API. This approach simplifies the message flow and execution, ensuring that all messages—whether from users, admins, or the AI—are delivered in real time through a single, unified channel.

### AI Use

-   Used on the frontend for CSS styling with tailwind as well as general use with copilot in VSCode

### Time Taken

-   About 4 hours
