🚀 Triggerflow
Triggerflow is a powerful, frontend-based event-driven rule engine designed to handle complex logic with ease. It features priority-based execution, rule chaining, and a real-time animated visualization of the execution flow.

Built with Next.js, TypeScript, and Tailwind CSS, Triggerflow allows developers to define rules that react to events, manage execution order, and see exactly how data flows through the system.


✨ Key Features
⚡ Event-Driven Architecture: Trigger actions based on specific input events.

🔝 Priority Handling: Fine-grained control over which rules execute first when multiple conditions are met.

🔗 Rule Chaining: Seamlessly pass the output of one rule as the input to another to create complex workflows.

📊 Animated Visualization: A dedicated UI to visualize the execution path, making debugging and understanding logic flows intuitive.

🛠️ Fully Typed: Built with TypeScript for a robust developer experience and type safety.


🛠️ Tech Stack
Framework: Next.js 15 (App Router)

Language: TypeScript

Styling: Tailwind CSS

Linting: ESLint


🚀 Getting Started
Prerequisites
Node.js 18.x or later
```
npm / yarn / pnpm

Installation
Clone the repository

Bash
git clone https://github.com/yash-2304/Triggerflow.git
cd Triggerflow
Install dependencies

Bash
npm install
Run the development server

Bash
npm run dev
Open the app
Navigate to http://localhost:3000 to see the rule engine in action.
```


📖 How It Works
Triggerflow operates on a Condition → Action model:

Events: The system listens for incoming data or triggers.

Rules: Defined with a specific priority. If the condition matches, the action is queued.

Engine: Processes the queue, handling chains where one rule's result triggers the next.

Visualization: The UI renders a graph or flow showing the sequence of triggered rules.



📁 Project Structure
Plaintext
├── app/              # Next.js App Router (Pages and Components)
├── public/           # Static assets
├── components/       # Reusable UI components
├── lib/              # Core Rule Engine logic and utilities
├── tsconfig.json     # TypeScript configuration
└── next.config.ts    # Next.js configuration
🤝 Contributing
Contributions are welcome! If you have ideas for new features or find a bug, feel free to open an issue or submit a pull request.

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request



📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

Developed by Yash Prajapati
