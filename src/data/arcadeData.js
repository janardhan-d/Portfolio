// Shared static data for the Dev PlaySpace arcade games.

// Game: Code Speed Typer
export const codeSnippets = [
  "import sqlite3",
  "def train_model(x, y):",
  "const [state, setState] = useState()",
  "fig, ax = plt.subplots()",
  "app.get('/api/stats', (req, res))",
  "import torch.nn as nn",
  "cursor.execute('SELECT * FROM visits')",
  "export default function App()",
  "np.linspace(0, 10, num=50)",
  "df.groupby('category').mean()"
];

// Game: Stack Memory Matcher
export const memoryCardsList = [
  { id: 1, name: 'Python', icon: '🐍' },
  { id: 2, name: 'React', icon: '⚛️' },
  { id: 3, name: 'SQLite', icon: '🗄️' },
  { id: 4, name: 'Node.js', icon: '🟢' },
  { id: 5, name: 'AI / ML', icon: '🤖' },
  { id: 6, name: 'Tailwind', icon: '🎨' }
];

// Game: LLM Prompt Tuner
export const promptChallenges = [
  {
    id: 1,
    title: "Optimize LLM Code Generator",
    description: "Adjust Temperature and Top-P to make LLM output deterministic Python code without hallucinations.",
    optimalTemp: 0.2,
    optimalTopP: 0.9,
    task: "Set Temperature <= 0.3 and Top-P >= 0.8 for deterministic Python code."
  },
  {
    id: 2,
    title: "Creative Storytelling AI",
    description: "Adjust settings to generate imaginative AI responses for interactive dialogue.",
    optimalTemp: 0.85,
    optimalTopP: 0.95,
    task: "Set Temperature >= 0.7 for high creative variance."
  }
];

// Game: Bug Smasher
export const bugItemsList = [
  { id: 1, label: "SyntaxError: missing ':'", type: "syntax" },
  { id: 2, label: "Uncaught ReferenceError: x is not defined", type: "reference" },
  { id: 3, label: "TypeError: Cannot read property 'map' of undefined", type: "type" },
  { id: 4, label: "IndentationError: unexpected indent", type: "indent" },
  { id: 5, label: "UnhandledPromiseRejection: Missing await", type: "async" },
  { id: 6, label: "RecursionError: maximum depth exceeded", type: "recursion" }
];
