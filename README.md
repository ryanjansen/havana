## Getting Started

To run the project in development mode, use one of the following commands:

- With pnpm:
    ```
    pnpm dev
    ```
- With npm:
    ```
    npm run dev
    ```

## Main Parts of the Project

- **src/**: Contains the main source code for the application, including components, pages, and utilities.
- **public/**: Static assets such as images and icons that are publicly accessible.

The development server will start and you can view the application in your browser at http://localhost:1517.

## Chat States and Escalation

Each chat can be in one of three states:

- **AI**: The chatbot is handling the conversation.
- **Human**: A human agent has taken over the chat.
- **Handover Pending**: The user has requested a human agent, and the system is in the process of escalating.

Users can request a human agent at any time. When this happens, the chatbot uses OpenAI function calls to escalate the conversation to a human. Human agents can also directly take over any chat and are able to view messages in real time, regardless of the current chat state.

## Real-Time Communication with WebSockets

Both users and admins connect to a shared WebSocket manager, enabling real-time updates for all participants. This architecture ensures that any changes in chat state, new messages, or escalations are instantly broadcasted to all relevant clients.

AI-generated messages are also sent through the WebSocket connection, rather than via a REST API. This approach simplifies the message flow and execution, ensuring that all messages—whether from users, admins, or the AI—are delivered in real time through a single, unified channel.

### AI Use

- Used on the frontend for CSS styling with tailwind as well as general use with copilot in VSCode

### Time Taken

- About 4 hours