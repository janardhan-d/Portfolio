// Smart AI Quiz & Assessment Hub - Question Bank & Self-Learning Engine

export const quizCategories = [
  {
    id: "python",
    title: "Python & Core Backend",
    icon: "Terminal",
    description: "Decorators, Generators, Asyncio, Memory Management, and OOP Design.",
    badge: "Core Language",
    color: "from-red-600 to-rose-600",
    questionTypes: ["MCQ", "Debugging", "Scenario"]
  },
  {
    id: "dsa",
    title: "Data Structures & Algorithms",
    icon: "BrainCircuit",
    description: "Arrays, Binary Trees, Graphs, Big-O Analysis, Dynamic Programming.",
    badge: "CS Core",
    color: "from-red-700 to-rose-700",
    questionTypes: ["MCQ", "Code Completion", "Debugging"]
  },
  {
    id: "algorithms",
    title: "Algorithmic Problem Solving",
    icon: "Cpu",
    description: "Sliding Window, Two Pointers, Graph BFS/DFS, Greedy & DP Optimization.",
    badge: "Problem Solving",
    color: "from-rose-600 to-red-600",
    questionTypes: ["MCQ", "Debugging"]
  },
  {
    id: "webdev",
    title: "Web Engineering & React 19",
    icon: "Code2",
    description: "React Server Components, Custom Hooks, Node.js REST APIs, CORS, SQL.",
    badge: "Full-Stack",
    color: "from-red-600 to-rose-500",
    questionTypes: ["MCQ", "Code Debugging"]
  },
  {
    id: "ai_llm",
    title: "Artificial Intelligence & LLMs",
    icon: "Sparkles",
    description: "Transformers, RAG Pipelines, Vector DBs, Prompt Design, Fine-Tuning.",
    badge: "AI Trending",
    color: "from-rose-700 to-red-600",
    questionTypes: ["MCQ", "Scenario"]
  }
];

export const prebuiltQuestions = {
  python: [
    {
      id: "py_1",
      topic: "Python & Core Backend",
      subTopic: "Decorators & Functions",
      type: "debugging",
      difficulty: "Intermediate",
      question: "Identify the bug in this Python decorator that causes wrapper functions to lose their original function name and docstrings.",
      codeSnippet: `def my_logger(func):
  def wrapper(*args, **kwargs):
    print(f"Calling {func.__name__}")
    return func(*args, **kwargs)
  return wrapper

@my_logger
def calculate_tax(amount):
  """Calculates 10% tax."""
  return amount * 0.10

# Bug: calculate_tax.__name__ returns 'wrapper' instead of 'calculate_tax'`,
      options: [
        "Decorate the inner wrapper with @functools.wraps(func)",
        "Change return func(*args) to return func(self)",
        "Pass *kwargs before *args in parameter list",
        "Replace def wrapper with lambda expression"
      ],
      correctAnswerIndex: 0,
      explanation: "@functools.wraps(func) copies the original function's __name__, __doc__, and module metadata to the inner wrapper function."
    },
    {
      id: "py_2",
      topic: "Python & Core Backend",
      subTopic: "Async / Asyncio",
      type: "mcq",
      difficulty: "Advanced",
      question: "In Python asyncio, what is the consequence of executing a blocking time.sleep(5) inside an async coroutine?",
      codeSnippet: `async def fetch_user_data():
  time.sleep(5) # ❌ Blocking call!
  return {"user_id": 101}`,
      options: [
        "Asyncio spawns a background thread automatically",
        "It blocks the entire event loop, freezing all concurrent coroutines for 5 seconds",
        "It throws a CoroutineRuntimeError immediately",
        "It executes non-blocking sleep in background"
      ],
      correctAnswerIndex: 1,
      explanation: "time.sleep() is synchronous and blocks the single main event loop thread. To sleep asynchronously without blocking, use await asyncio.sleep(5)."
    },
    {
      id: "py_3",
      topic: "Python & Core Backend",
      subTopic: "Memory & GIL",
      type: "scenario",
      difficulty: "Advanced",
      question: "Which Python approach bypasses the Global Interpreter Lock (GIL) for CPU-bound heavy mathematical computations?",
      options: [
        "Using asyncio task groups",
        "Using the multiprocessing module or C-extensions (NumPy / Cython)",
        "Using global variables across threads",
        "Increasing thread stack size"
      ],
      correctAnswerIndex: 1,
      explanation: "Multiprocessing creates separate OS processes with distinct Python interpreters and memory spaces, bypassing GIL restrictions across multi-core CPUs."
    }
  ],

  dsa: [
    {
      id: "dsa_1",
      topic: "Data Structures & Algorithms",
      subTopic: "Time Complexity",
      type: "mcq",
      difficulty: "Intermediate",
      question: "What is the worst-case time complexity of quicksort when using an unoptimized pivot selection strategy?",
      codeSnippet: `function quicksort(arr) {
  if (arr.length <= 1) return arr;
  let pivot = arr[0]; // First element chosen as pivot
  let left = arr.slice(1).filter(x => x < pivot);
  let right = arr.slice(1).filter(x => x >= pivot);
  return [...quicksort(left), pivot, ...quicksort(right)];
}`,
      options: [
        "O(n log n)",
        "O(n²)",
        "O(n)",
        "O(log n)"
      ],
      correctAnswerIndex: 1,
      explanation: "When the input array is already sorted and the first element is selected as the pivot, quicksort splits the array into sizes 0 and n-1 at each step, resulting in O(n²) recursion depth."
    },
    {
      id: "dsa_2",
      topic: "Data Structures & Algorithms",
      subTopic: "Binary Trees",
      type: "debugging",
      difficulty: "Beginner",
      question: "Fix the bug in this Binary Search Tree (BST) search function that causes infinite recursion when searching for missing keys.",
      codeSnippet: `function searchBST(root, val) {
  if (!root) return null;
  if (root.val === val) return root;
  if (val < root.val) return searchBST(root.left, val);
  // Bug: Missing return statement for right child search!
  searchBST(root.right, val);
}`,
      options: [
        "Add return statement: return searchBST(root.right, val);",
        "Change val < root.val to val > root.val",
        "Initialize root to empty object",
        "Replace recursive search with linear array map"
      ],
      correctAnswerIndex: 0,
      explanation: "Without the return keyword on the right child search call, the call returns undefined back up the call stack instead of returning the found node."
    },
    {
      id: "dsa_3",
      topic: "Data Structures & Algorithms",
      subTopic: "Dynamic Programming",
      type: "scenario",
      difficulty: "Advanced",
      question: "In Dynamic Programming, what are the two essential properties a problem MUST satisfy to be solved using DP?",
      options: [
        "Divide and Conquer & Sorting Constraint",
        "Optimal Substructure & Overlapping Subproblems",
        "Greedy Choice Property & Tail Recursion",
        "Binary Search Property & Monotonicity"
      ],
      correctAnswerIndex: 1,
      explanation: "DP applies when an optimal solution can be constructed from optimal solutions to subproblems (Optimal Substructure) and the same subproblems are solved repeatedly (Overlapping Subproblems)."
    }
  ],

  webdev: [
    {
      id: "web_1",
      topic: "Web Engineering & React 19",
      subTopic: "React State Mutation",
      type: "debugging",
      difficulty: "Intermediate",
      question: "Why does this React component fail to update the UI when the user clicks 'Update Name'?",
      codeSnippet: `const [profile, setProfile] = useState({ name: "Alex", score: 90 });

const handleUpdate = () => {
  profile.name = "Janardhan"; // ❌ Direct mutation
  setProfile(profile); // Reference hasn't changed!
};`,
      options: [
        "React uses shallow reference comparison Object.is(); mutating state in-place keeps the same reference so re-render is skipped",
        "React state cannot store JavaScript objects",
        "setProfile must be wrapped in a setTimeout block",
        "The component needs a key prop on handleUpdate"
      ],
      correctAnswerIndex: 0,
      explanation: "To trigger a re-render, pass a new object copy: setProfile({ ...profile, name: 'Janardhan' })."
    },
    {
      id: "web_2",
      topic: "Web Engineering & React 19",
      subTopic: "Express Middleware",
      type: "mcq",
      difficulty: "Beginner",
      question: "What function must be called inside custom Express middleware to pass control to the next handler?",
      codeSnippet: `app.use((req, res, next) => {
  console.log('Incoming Request:', req.url);
  // What should be invoked here?
});`,
      options: [
        "res.continue()",
        "next()",
        "return res.end()",
        "express.next()"
      ],
      correctAnswerIndex: 1,
      explanation: "The next() function signals Express to execute the next middleware or route handler in the chain."
    }
  ],

  ai_llm: [
    {
      id: "ai_1",
      topic: "Artificial Intelligence & LLMs",
      subTopic: "Transformer Attention",
      type: "scenario",
      difficulty: "Advanced",
      question: "What mechanism in Large Language Models allows the model to dynamically compute relative importance between tokens across long context windows?",
      options: [
        "Convolutional Stride Filtering",
        "Self-Attention Mechanism (Query-Key-Value dot products)",
        "Recurrent Pooling Layers",
        "Gradient Boosting Trees"
      ],
      correctAnswerIndex: 1,
      explanation: "Self-attention computes dot-product similarity between token Query and Key vectors to dynamically weigh token context relationships regardless of position distance."
    },
    {
      id: "ai_2",
      topic: "Artificial Intelligence & LLMs",
      subTopic: "RAG Architecture",
      type: "mcq",
      difficulty: "Intermediate",
      question: "In Retrieval-Augmented Generation (RAG), what is the role of high-dimensional vector embeddings?",
      options: [
        "To compile Python ML code into WebAssembly binaries",
        "To map semantic text meaning into numerical vector space for fast k-NN similarity retrieval",
        "To compress SQL database backups into ZIP archives",
        "To encrypt API secret keys"
      ],
      correctAnswerIndex: 1,
      explanation: "Vector embeddings represent semantic text meaning as mathematical vectors, allowing vector databases to perform fast semantic similarity searches to ground LLM prompts."
    }
  ]
};

// AI Tutor Step-by-Step Explanation Generator
export function getAITutorStepByStepExplanation(question, userAnswerIndex) {
  const isCorrect = userAnswerIndex === question.correctAnswerIndex;
  const userChoiceText = question.options[userAnswerIndex] || "No Answer Selected";
  const correctChoiceText = question.options[question.correctAnswerIndex];

  return {
    isCorrect,
    headline: isCorrect ? "🎉 Excellent Technical Reasoning!" : "💡 Step-by-Step AI Tutor Breakdown",
    steps: [
      {
        step: 1,
        title: "Core Mechanics",
        detail: `This problem tests your understanding of ${question.subTopic || question.topic}.`
      },
      {
        step: 2,
        title: "Selected Option Evaluation",
        detail: isCorrect
          ? `You selected "${userChoiceText}", which accurately models system behavior.`
          : `You selected "${userChoiceText}". While intuitive, this introduces subtle bugs or improper assumptions.`
      },
      {
        step: 3,
        title: "Correct Solution & Mechanic",
        detail: `The correct choice is "${correctChoiceText}". ${question.explanation}`
      },
      {
        step: 4,
        title: "AI Rule of Thumb",
        detail: `Always check for non-mutating updates, memory bounds, and explicit return handles when writing production ${question.subTopic || 'software'}.`
      }
    ]
  };
}

// Generate Flashcards from Missed Questions for Self-Learning AI Engine
export function generateFlashcardsFromMissedQuestions(missedQuestionList) {
  if (!missedQuestionList || missedQuestionList.length === 0) {
    return [
      {
        id: "fc_default_1",
        topic: "React 19 State Mechanics",
        front: "Why shouldn't you mutate state objects directly in React?",
        back: "React checks state using Object.is() shallow reference equality. In-place mutation keeps the same object memory pointer, so React skips re-rendering.",
        tag: "Frontend",
        mastered: false
      },
      {
        id: "fc_default_2",
        topic: "Data Structures & Hash Tables",
        front: "What is the average time complexity for Hash Table lookup?",
        back: "O(1) constant time, provided a good hash distribution function prevents excessive key collisions.",
        tag: "Core CS",
        mastered: false
      }
    ];
  }

  return missedQuestionList.map((q, idx) => ({
    id: `fc_${q.id}_${idx}`,
    topic: q.subTopic || q.topic,
    front: q.question,
    back: `Answer: ${q.options[q.correctAnswerIndex]}\n\nMechanic: ${q.explanation}`,
    tag: q.topic.split(' ')[0],
    mastered: false
  }));
}

// Dynamic AI Prompt Generator function
export function generateAIQuizFromPrompt(userPrompt, difficulty = "Intermediate") {
  const cleanPrompt = userPrompt.trim();
  const topicName = cleanPrompt ? cleanPrompt.charAt(0).toUpperCase() + cleanPrompt.slice(1) : "Software Engineering & AI";

  return [
    {
      id: `ai_gen_1`,
      topic: topicName,
      subTopic: "Core Concepts",
      type: "mcq",
      difficulty,
      question: `In ${topicName}, what is the foundational principle underlying its core architectural pattern?`,
      codeSnippet: `// ${topicName} Architecture Pattern
function initializeSystemConfig() {
  const mode = "OPTIMIZED_EXECUTION";
  return { active: true, topic: "${topicName}", status: mode };
}`,
      options: [
        `Enforcing strict modular separation of concerns and high cohesion in ${topicName}`,
        `Replacing static memory allocation with linear array scanning`,
        `Disabling error boundaries to maximize execution throughput`,
        `Hardcoding configuration parameters directly into global scope`
      ],
      correctAnswerIndex: 0,
      explanation: `Separation of concerns and modular component design ensure that ${topicName} systems remain scalable, testable, and resilient to failure.`
    },
    {
      id: `ai_gen_2`,
      topic: topicName,
      subTopic: "Performance & Optimization",
      type: "debugging",
      difficulty,
      question: `When optimizing performance for ${topicName}, which strategy yields the greatest reduction in runtime latency?`,
      options: [
        "Increasing redundant network payloads",
        "Implementing effective caching, lazy evaluation, and algorithm optimization",
        "Replacing non-blocking async operations with blocking synchronous loops",
        "Eliminating index structures from search routines"
      ],
      correctAnswerIndex: 1,
      explanation: "Caching frequent operations and reducing time complexity eliminate primary latency bottlenecks in software systems."
    },
    {
      id: `ai_gen_3`,
      topic: topicName,
      subTopic: "Security & Reliability",
      type: "scenario",
      difficulty,
      question: `Which industry best practice is critical when deploying ${topicName} in production environments?`,
      options: [
        "Storing sensitive API credentials in public client code",
        "Strict input validation, automated testing, and secure secret management",
        "Bypassing CORS headers and authentication middleware",
        "Ignoring stack trace logs during runtime exceptions"
      ],
      correctAnswerIndex: 1,
      explanation: "Validating user input and restricting credential exposure prevent security vulnerabilities like injection attacks and unauthorized access."
    }
  ];
}
