// Smart AI Quiz & Assessment Hub - Question Bank & AI Template Engine

export const quizTopics = [
  {
    id: "dsa",
    title: "Data Structures & Algorithms",
    icon: "BrainCircuit",
    description: "Arrays, Binary Trees, Graph Traversal, Big-O Analysis, and Dynamic Programming.",
    badge: "Core CS",
    color: "from-amber-500 to-yellow-500",
    questionsCount: 5,
    estimatedMinutes: 5
  },
  {
    id: "fullstack",
    title: "Full-Stack & React 19",
    icon: "Code2",
    description: "React Components, Custom Hooks, State Management, Node.js & Express REST APIs.",
    badge: "Web Eng",
    color: "from-amber-400 to-amber-600",
    questionsCount: 5,
    estimatedMinutes: 5
  },
  {
    id: "ai_llm",
    title: "Artificial Intelligence & LLMs",
    icon: "Sparkles",
    description: "Neural Networks, Transformer Architecture, RAG Pipeline, Python ML, Prompting.",
    badge: "AI Trending",
    color: "from-yellow-400 to-amber-500",
    questionsCount: 5,
    estimatedMinutes: 5
  },
  {
    id: "database",
    title: "Database & System Architecture",
    icon: "Database",
    description: "SQL vs NoSQL, Indexing, B-Trees, Caching Strategies, REST vs GraphQL, Microservices.",
    badge: "Backend",
    color: "from-amber-600 to-amber-800",
    questionsCount: 5,
    estimatedMinutes: 5
  }
];

export const prebuiltQuestions = {
  dsa: [
    {
      id: "dsa_1",
      topic: "Data Structures & Algorithms",
      subTopic: "Time Complexity",
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
      explanation: "When the input array is already sorted and the first element is selected as the pivot, quicksort splits the array into sizes 0 and n-1 at each step, resulting in O(n²) recursion depth and total operations."
    },
    {
      id: "dsa_2",
      topic: "Data Structures & Algorithms",
      subTopic: "Binary Search Trees",
      difficulty: "Beginner",
      question: "Which tree traversal order yields node values in strictly ascending order for a Binary Search Tree (BST)?",
      codeSnippet: `// Traversal order check
function traverse(node) {
  if (!node) return;
  traverse(node.left);
  console.log(node.val);
  traverse(node.right);
}`,
      options: [
        "Pre-order Traversal",
        "Post-order Traversal",
        "In-order Traversal",
        "Level-order Traversal"
      ],
      correctAnswerIndex: 2,
      explanation: "In-order traversal visits left subtree, current node, and right subtree. In a BST, all left descendants are smaller and right descendants are larger, producing a sorted sequence."
    },
    {
      id: "dsa_3",
      topic: "Data Structures & Algorithms",
      subTopic: "Graph Algorithms",
      difficulty: "Advanced",
      question: "Which algorithm is guaranteed to find the shortest path in a weighted graph with non-negative edge weights?",
      options: [
        "Breadth-First Search (BFS)",
        "Dijkstra's Algorithm",
        "Depth-First Search (DFS)",
        "Kruskal's Algorithm"
      ],
      correctAnswerIndex: 1,
      explanation: "Dijkstra's algorithm uses a priority queue to greedily explore the path with minimum distance in non-negatively weighted graphs, guaranteeing the shortest path."
    },
    {
      id: "dsa_4",
      topic: "Data Structures & Algorithms",
      subTopic: "Hash Tables",
      difficulty: "Intermediate",
      question: "What is the average time complexity for insertion, deletion, and lookup in a hash table with a good hash function?",
      options: [
        "O(1)",
        "O(log n)",
        "O(n)",
        "O(n log n)"
      ],
      correctAnswerIndex: 0,
      explanation: "With a uniform hash function and low load factor, collisions are rare, providing O(1) constant average time for hash table operations."
    },
    {
      id: "dsa_5",
      topic: "Data Structures & Algorithms",
      subTopic: "Dynamic Programming",
      difficulty: "Advanced",
      question: "In Dynamic Programming, what are the two core properties a problem must satisfy to be solved efficiently using DP?",
      options: [
        "Greedy Choice Property & Divide and Conquer",
        "Optimal Substructure & Overlapping Subproblems",
        "Binary Search Property & Sorting Constraint",
        "Depth Reduction & Tail Recursion"
      ],
      correctAnswerIndex: 1,
      explanation: "Dynamic Programming applies when an optimal solution can be constructed from optimal solutions to subproblems (Optimal Substructure) and the same subproblems are solved repeatedly (Overlapping Subproblems)."
    }
  ],

  fullstack: [
    {
      id: "fs_1",
      topic: "Full-Stack & React 19",
      subTopic: "React Hooks",
      difficulty: "Intermediate",
      question: "In React 18/19, what happens if you mutate state directly instead of calling the setState function?",
      codeSnippet: `const [user, setUser] = useState({ name: "Alex" });
// ❌ Direct mutation
user.name = "Janardhan";`,
      options: [
        "React triggers a warning in the console but updates UI immediately",
        "React fails to detect the reference change and will NOT trigger a component re-render",
        "React automatically converts it into a reactive Proxy",
        "It throws a Uncaught TypeError at runtime"
      ],
      correctAnswerIndex: 1,
      explanation: "React relies on shallow object reference equality (Object.is) to schedule re-renders. Mutating the object in-place keeps the same memory reference, so React skips rendering."
    },
    {
      id: "fs_2",
      topic: "Full-Stack & React 19",
      subTopic: "Express Middleware",
      difficulty: "Beginner",
      question: "In an Express.js backend, what MUST be invoked at the end of a custom middleware function to pass control to the next middleware?",
      codeSnippet: `app.use((req, res, next) => {
  console.log('Incoming Request:', req.url);
  // What should be called here?
});`,
      options: [
        "res.continue()",
        "next()",
        "return res.end()",
        "express.next()"
      ],
      correctAnswerIndex: 1,
      explanation: "The next() function signals Express to proceed to the next handler in the execution chain. Omitting next() leaves the request hanging without sending a response."
    },
    {
      id: "fs_3",
      topic: "Full-Stack & React 19",
      subTopic: "Async / Promises",
      difficulty: "Intermediate",
      question: "What is the result of using Promise.all() when one of the passed promises rejects?",
      options: [
        "Promise.all resolves with the remaining successful promises",
        "Promise.all immediately rejects with the error of the first rejected promise",
        "Promise.all retries the failed promise three times",
        "Promise.all returns null for the failed index"
      ],
      correctAnswerIndex: 1,
      explanation: "Promise.all has an 'all-or-nothing' behavior. If any promise in the array rejects, the entire returned promise immediately rejects with that reason."
    },
    {
      id: "fs_4",
      topic: "Full-Stack & React 19",
      subTopic: "React Performance",
      difficulty: "Advanced",
      question: "What is the primary use case of React's useMemo hook?",
      codeSnippet: `const memoizedValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);`,
      options: [
        "To persist state values across browser page reloads",
        "To memoize expensive calculation results between renders unless dependencies change",
        "To prevent initial component mounting",
        "To run asynchronous side-effects after layout paint"
      ],
      correctAnswerIndex: 1,
      explanation: "useMemo caches the returned value of a calculation function across re-renders and recomputes it only when one of its listed dependencies changes."
    },
    {
      id: "fs_5",
      topic: "Full-Stack & React 19",
      subTopic: "REST API Architecture",
      difficulty: "Intermediate",
      question: "Which HTTP method is idempotent and intended to replace an existing resource completely?",
      options: [
        "POST",
        "PUT",
        "PATCH",
        "DELETE"
      ],
      correctAnswerIndex: 1,
      explanation: "PUT is idempotent, meaning making multiple identical PUT requests yields the same server state as a single request. PUT completely replaces the target resource entity."
    }
  ],

  ai_llm: [
    {
      id: "ai_1",
      topic: "Artificial Intelligence & LLMs",
      subTopic: "Transformer Architecture",
      difficulty: "Advanced",
      question: "What mechanism in modern Large Language Models (LLMs) allows the model to dynamically focus on relevant tokens across long text context?",
      options: [
        "Convolutional Stride Filtering",
        "Self-Attention Mechanism",
        "Recurrent Hidden Pooling",
        "Gradient Boosting Trees"
      ],
      correctAnswerIndex: 1,
      explanation: "The Self-Attention mechanism computes Query-Key-Value dot products to weigh relative dependencies between every token in a sequence regardless of distance."
    },
    {
      id: "ai_2",
      topic: "Artificial Intelligence & LLMs",
      subTopic: "RAG Architecture",
      difficulty: "Intermediate",
      question: "In Retrieval-Augmented Generation (RAG), what is the role of Vector Databases (e.g. Chroma, Pinecone, FAISS)?",
      options: [
        "To compile Python ML code into WebAssembly binaries",
        "To store high-dimensional embeddings and execute similarity searches for domain knowledge retrieval",
        "To train deep neural networks from scratch using raw SQL tables",
        "To encrypt LLM API keys on client devices"
      ],
      correctAnswerIndex: 1,
      explanation: "Vector databases index high-dimensional vector embeddings generated by embedding models, enabling fast k-nearest neighbor (k-NN) semantic search to retrieve grounding facts for LLM prompts."
    },
    {
      id: "ai_3",
      topic: "Artificial Intelligence & LLMs",
      subTopic: "Python Machine Learning",
      difficulty: "Beginner",
      question: "Which Python library is standard for data manipulation and tabular DataFrame structures in ML pipelines?",
      codeSnippet: `import pandas as pd
df = pd.read_csv("dataset.csv")
print(df.head())`,
      options: [
        "NumPy",
        "Pandas",
        "Matplotlib",
        "Scikit-learn"
      ],
      correctAnswerIndex: 1,
      explanation: "Pandas is built on top of NumPy and provides high-performance DataFrames for data cleaning, aggregation, filtering, and preparation in AI/ML workflows."
    },
    {
      id: "ai_4",
      topic: "Artificial Intelligence & LLMs",
      subTopic: "Prompt Engineering",
      difficulty: "Intermediate",
      question: "What prompt engineering technique instructs an LLM to break down complex reasoning step-by-step before producing a final answer?",
      options: [
        "Few-Shot In-Context Prompting",
        "Chain-of-Thought (CoT) Prompting",
        "Zero-Shot System Directing",
        "Hallucination Suppression Penalty"
      ],
      correctAnswerIndex: 1,
      explanation: "Chain-of-Thought (CoT) prompting encourages the model to generate intermediate reasoning steps, significantly improving accuracy on multi-step math and logic problems."
    },
    {
      id: "ai_5",
      topic: "Artificial Intelligence & LLMs",
      subTopic: "Neural Networks",
      difficulty: "Advanced",
      question: "What optimization problem occurs when gradients shrink exponentially as they propagate backward through deep neural network layers during training?",
      options: [
        "Exploding Gradient Problem",
        "Vanishing Gradient Problem",
        "Overfitting Trap",
        "Dead Neuron Saturation"
      ],
      correctAnswerIndex: 1,
      explanation: "The Vanishing Gradient Problem occurs when small derivative values multiply layer by layer during backpropagation, causing early layer weights to stop updating."
    }
  ],

  database: [
    {
      id: "db_1",
      topic: "Database & System Architecture",
      subTopic: "SQL Indexing",
      difficulty: "Intermediate",
      question: "Why do B-Tree indexes speed up SELECT query lookup times in relational databases like SQLite and PostgreSQL?",
      options: [
        "They compress all data rows into a single binary blob",
        "They maintain balanced search tree structures reducing search complexity from O(n) scan to O(log n)",
        "They execute queries concurrently across GPU cores",
        "They bypass database transaction logging entirely"
      ],
      correctAnswerIndex: 1,
      explanation: "B-Tree indexes sort column keys in a balanced tree structure, allowing the storage engine to quickly traverse nodes in logarithmic time O(log n) rather than performing full table scans."
    },
    {
      id: "db_2",
      topic: "Database & System Architecture",
      subTopic: "ACID Guarantees",
      difficulty: "Intermediate",
      question: "In database transaction management, what does the 'Atomicity' property guarantee?",
      options: [
        "Data is mirrored across atomic physical storage drives",
        "All operations inside a transaction complete successfully, or the entire transaction is rolled back with 0 changes applied",
        "Multiple transactions execute concurrently without interfering with each other",
        "Committed data remains saved even during power outages"
      ],
      correctAnswerIndex: 1,
      explanation: "Atomicity ensures an 'all-or-nothing' execution guarantee. If any statement inside a transaction block fails, all previous operations in that transaction are reversed."
    },
    {
      id: "db_3",
      topic: "Database & System Architecture",
      subTopic: "Caching & Performance",
      difficulty: "Intermediate",
      question: "Which high-speed in-memory data store is commonly used as a cache layer to reduce load on primary SQL databases?",
      options: [
        "MongoDB",
        "Redis",
        "SQLite",
        "Cassandra"
      ],
      correctAnswerIndex: 1,
      explanation: "Redis is an in-memory key-value data store providing sub-millisecond data retrieval times, making it ideal for session caching, rate limiting, and fast lookup data."
    },
    {
      id: "db_4",
      topic: "Database & System Architecture",
      subTopic: "System Design",
      difficulty: "Advanced",
      question: "What system architecture pattern decouples services by having producers send events to a message queue and consumers process them asynchronously?",
      options: [
        "Monolithic Architecture",
        "Event-Driven Architecture (EDA)",
        "Model-View-Controller (MVC)",
        "Serverless Direct RPC"
      ],
      correctAnswerIndex: 1,
      explanation: "Event-Driven Architecture uses event brokers (like Kafka or RabbitMQ) to allow decoupled, scalable microservices to publish and consume state events asynchronously."
    },
    {
      id: "db_5",
      topic: "Database & System Architecture",
      subTopic: "NoSQL vs Relational",
      difficulty: "Beginner",
      question: "Which database type is designed primarily around JSON-like document collections without strict predefined schemas?",
      options: [
        "Relational SQL (PostgreSQL, MySQL)",
        "Document NoSQL (MongoDB, CouchDB)",
        "Graph Database (Neo4j)",
        "Time-Series Database (InfluxDB)"
      ],
      correctAnswerIndex: 1,
      explanation: "Document databases store flexible, hierarchical JSON/BSON records in collections without requiring rigid schema tables or multi-table migrations."
    }
  ]
};

// Dynamic AI Quiz Prompt Generator function
export function generateAIQuizFromPrompt(userPrompt, difficulty = "Intermediate") {
  const cleanPrompt = userPrompt.trim();
  const topicName = cleanPrompt ? cleanPrompt.charAt(0).toUpperCase() + cleanPrompt.slice(1) : "Software Engineering & AI";

  return [
    {
      id: `ai_gen_1`,
      topic: topicName,
      subTopic: "Core Concepts",
      difficulty,
      question: `In ${topicName}, what is the foundational principle underlying its core design and implementation pattern?`,
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
      difficulty,
      question: `When optimizing performance for ${topicName}, which strategy yields the greatest reduction in runtime bottleneck?`,
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
    },
    {
      id: `ai_gen_4`,
      topic: topicName,
      subTopic: "Scalability & State",
      difficulty,
      question: `How does ${topicName} handle state synchronization across distributed worker nodes?`,
      codeSnippet: `async function syncState(nodeId, statePayload) {
  const ack = await eventBroker.publish(\`sync:\${nodeId}\`, statePayload);
  return ack.status === "OK";
}`,
      options: [
        "By enforcing stateless worker nodes and centralized event broker synchronization",
        "By writing temporary state files directly to local client disk storage",
        "By restarting all worker servers on every state update",
        "By disabling concurrent user sessions"
      ],
      correctAnswerIndex: 0,
      explanation: "Stateless worker nodes paired with distributed message queues allow systems to scale horizontally without state corruption."
    },
    {
      id: `ai_gen_5`,
      topic: topicName,
      subTopic: "AI & Modern Integration",
      difficulty,
      question: `How can modern AI models and LLMs be integrated with ${topicName} for automated decision making?`,
      options: [
        "By embedding prompt-guided LLM API calls with structured JSON output schemas",
        "By replacing all database tables with raw text files",
        "By compiling Python scripts directly into CSS stylesheets",
        "By converting API calls into static hardcoded arrays"
      ],
      correctAnswerIndex: 0,
      explanation: "Structured output parsing and function calling allow AI models to return validated JSON data directly consumed by backend APIs."
    }
  ];
}
