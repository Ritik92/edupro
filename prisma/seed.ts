// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// async function main() {
//   // Clean existing data
//   await prisma.video.deleteMany({});
//   await prisma.enrollment.deleteMany({});
//   await prisma.question.deleteMany({});
//   await prisma.quiz.deleteMany({});
//   await prisma.chapter.deleteMany({});
//   await prisma.course.deleteMany({});
//   await prisma.user.deleteMany({});
//  let name='user'
//   // Create Users (unchanged)
//   const user1 = await prisma.user.create({
//     data: {
//       email: 'john.doe@example.com',
//       name: 'John Doe',
//       password: '121245',
//       preferredLang: 'en',
//     },
//   });

//   const user2 = await prisma.user.create({
//     data: {
//       email: 'jane.smith@example.com',
//       name: 'Jane Smith',
//       password: '121254',
//       preferredLang: 'hi',
//     },
//   });

//   // Create Course with enhanced chapters
//   const course = await prisma.course.create({
//     data: {
//       title: 'Web Development Fundamentals',
//       description: 'Master HTML, CSS, and JavaScript with bilingual support',
//       price: 99.99,
//       chapters: {
//         create: [
//           {
//             title: 'HTML Fundamentals',
//             sequenceOrder: 1,
//             contentSummary: 'Learn the basics of HTML, document structure, and semantic markup',
//             content: {
//               sections: [
//                 {
//                   title: 'Introduction to HTML',
//                   type: 'text',
//                   content: 'HTML (HyperText Markup Language) is the backbone of web development. It provides the structure and semantics for web content through a system of tags and attributes. Modern HTML5 introduces powerful features for building rich, interactive web applications.'
//                 },
//                 {
//                   title: 'Document Structure',
//                   type: 'code',
//                   language: 'html',
//                   content: `<!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>My First Webpage</title>
// </head>
// <body>
//     <header>
//         <h1>Welcome to My Website</h1>
//         <nav>
//             <ul>
//                 <li><a href="#home">Home</a></li>
//                 <li><a href="#about">About</a></li>
//             </ul>
//         </nav>
//     </header>
//     <main>
//         <article>
//             <h2>Main Content</h2>
//             <p>This is the main content area.</p>
//         </article>
//     </main>
//     <footer>
//         <p>&copy; 2025 My Website</p>
//     </footer>
// </body>
// </html>`
//                 },
//                 {
//                   title: 'HTML Best Practices',
//                   type: 'list',
//                   items: [
//                     'Always declare the document type with <!DOCTYPE html>',
//                     'Use semantic elements to improve accessibility and SEO',
//                     'Include proper meta tags for character encoding and viewport',
//                     'Ensure all images have meaningful alt attributes',
//                     'Use appropriate heading hierarchy (h1-h6)',
//                     'Validate your HTML using W3C Validator'
//                   ]
//                 },
//                 {
//                   title: 'Forms and Input Elements',
//                   type: 'code',
//                   language: 'html',
//                   content: `<form action="/submit" method="POST">
//     <div class="form-group">
//         <label for="username">Username:</label>
//         <input type="text" id="username" name="username" required>
//     </div>
    
//     <div class="form-group">
//         <label for="email">Email:</label>
//         <input type="email" id="email" name="email" required>
//     </div>
    
//     <div class="form-group">
//         <label for="interests">Interests:</label>
//         <select id="interests" name="interests" multiple>
//             <option value="coding">Coding</option>
//             <option value="design">Design</option>
//             <option value="marketing">Marketing</option>
//         </select>
//     </div>
    
//     <button type="submit">Submit</button>
// </form>`
//                 },
//                 {
//                   title: 'Practical Exercise',
//                   type: 'exercise',
//                   instructions: 'Create a simple portfolio page that includes a header with navigation, main content area with your bio and skills, and a footer with contact information.',
//                   starterCode: `<!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>My Portfolio</title>
// </head>
// <body>
//     <!-- Add your code here -->
// </body>
// </html>`,
//                   language: 'html'
//                 }
//               ],
//               resources: [
//                 {
//                   title: 'MDN HTML Guide',
//                   type: 'link',
//                   url: 'https://developer.mozilla.org/en-US/docs/Web/HTML'
//                 },
//                 {
//                   title: 'HTML5 Specification',
//                   type: 'link',
//                   url: 'https://html.spec.whatwg.org/'
//                 },
//                 {
//                   title: 'W3C HTML Validator',
//                   type: 'link',
//                   url: 'https://validator.w3.org/'
//                 }
//               ]
//             },
//             videos: {
//               create: [
//                 {
//                   title: 'HTML Basics',
//                   language: 'en',
//                   videoUrl: 'https://pub-1940a3f06c164501aeb26d4bb7b4098d.r2.dev/HTML in 100 Seconds.mp4'
//                 },
//                 {
//                   title: 'HTML की मूल बातें',
//                   language: 'hi',
//                   videoUrl: 'https://pub-1940a3f06c164501aeb26d4bb7b4098d.r2.dev/html_hindi.mp4'
//                 }
//               ]
//             },
//             quiz: {
//               create: {
//                 title: 'HTML Fundamentals Quiz',
//                 questions: {
//                   create: [
//                     {
//                       questionText: 'What does HTML stand for?',
//                       correctAnswer: 'HyperText Markup Language',
//                       option1: 'HyperText Markup Language',
//                       option2: 'HighText Machine Language',
//                       option3: 'HyperText and links Markup Language',
//                       option4: 'None of these'
//                     },
//                     {
//                       questionText: 'Which tag is used to create a hyperlink?',
//                       correctAnswer: '<a>',
//                       option1: '<link>',
//                       option2: '<a>',
//                       option3: '<href>',
//                       option4: '<hyperlink>'
//                     },
//                     {
//                       questionText: 'Which is the correct way to write DOCTYPE in HTML5?',
//                       correctAnswer: '<!DOCTYPE html>',
//                       option1: '<!DOCTYPE html>',
//                       option2: '<!DOCTYPE HTML5>',
//                       option3: '<!DOCTYPE>',
//                       option4: '<DOCTYPE html>'
//                     },
//                     {
//                       questionText: 'Which tag is used to create an unordered list?',
//                       correctAnswer: '<ul>',
//                       option1: '<ul>',
//                       option2: '<ol>',
//                       option3: '<list>',
//                       option4: '<unordered>'
//                     },
//                     {
//                       questionText: 'What is the purpose of the alt attribute in images?',
//                       correctAnswer: 'To provide alternative text for screen readers',
//                       option1: 'To provide alternative text for screen readers',
//                       option2: 'To make images load faster',
//                       option3: 'To create image borders',
//                       option4: 'To specify image dimensions'
//                     }
//                   ]
//                 }
//               }
//             }
          
//           },
         

// {
//   title: 'CSS Styling',
//   sequenceOrder: 2,
//   contentSummary: 'Master CSS styling, layouts, animations, and modern CSS techniques',
//   content: {
//     sections: [
//       {
//         title: 'CSS Fundamentals',
//         type: 'text',
//         content: 'CSS (Cascading Style Sheets) is a powerful styling language that controls the visual presentation of HTML elements. Modern CSS includes features like flexbox, grid, custom properties, and animations, making it possible to create responsive and dynamic web layouts.'
//       },
//       {
//         title: 'Selectors and Specificity',
//         type: 'code',
//         language: 'css',
//         content: `/* Basic selectors */
// .class-name {
//   color: blue;
// }

// #unique-id {
//   font-size: 1.2rem;
// }

// /* Combinators */
// div > p {
//   margin-bottom: 1rem;
// }

// /* Pseudo-classes and pseudo-elements */
// button:hover {
//   background-color: #f0f0f0;
// }

// p::first-line {
//   font-weight: bold;
// }

// /* Attribute selectors */
// input[type="email"] {
//   border: 2px solid #ccc;
// }

// /* Specificity examples */
// #header .nav-link.active {  /* Higher specificity */
//   color: #ff0000;
// }

// .nav-link {  /* Lower specificity */
//   color: #000000;
// }`
//       },
//       {
//         title: 'Modern Layout Techniques',
//         type: 'code',
//         language: 'css',
//         content: `/* Flexbox Layout */
// .container {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   gap: 1rem;
// }

// .flex-item {
//   flex: 1;
//   padding: 1rem;
// }

// /* Grid Layout */
// .grid-container {
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//   gap: 2rem;
//   padding: 1rem;
// }

// /* Responsive Design */
// @media (max-width: 768px) {
//   .grid-container {
//     grid-template-columns: 1fr;
//   }
// }

// /* CSS Custom Properties */
// :root {
//   --primary-color: #007bff;
//   --spacing-unit: 1rem;
// }

// .button {
//   background-color: var(--primary-color);
//   padding: var(--spacing-unit);
// }`
//       },
//       {
//         title: 'Animations and Transitions',
//         type: 'code',
//         language: 'css',
//         content: `/* Transitions */
// .card {
//   transition: transform 0.3s ease-in-out;
// }

// .card:hover {
//   transform: translateY(-5px);
// }

// /* Keyframe Animations */
// @keyframes fadeIn {
//   from {
//     opacity: 0;
//     transform: translateY(20px);
//   }
//   to {
//     opacity: 1;
//     transform: translateY(0);
//   }
// }

// .animate-fade-in {
//   animation: fadeIn 0.5s ease-out forwards;
// }`
//       },
//       {
//         title: 'CSS Best Practices',
//         type: 'list',
//         items: [
//           'Use a consistent naming convention (e.g., BEM methodology)',
//           'Organize CSS with a logical file structure',
//           'Minimize specificity conflicts',
//           'Utilize CSS custom properties for theme values',
//           'Implement mobile-first responsive design',
//           'Optimize performance with appropriate selectors',
//           'Comment complex CSS rules and animations'
//         ]
//       },
//       {
//         title: 'Practical Exercise',
//         type: 'exercise',
//         instructions: 'Create a responsive card component with hover effects, proper spacing, and a consistent color scheme using CSS custom properties.',
//         starterCode: `.card {
//   /* Add your styles here */
// }

// .card-title {
//   /* Add your styles here */
// }

// .card-content {
//   /* Add your styles here */
// }

// /* Add hover effects and media queries */`,
//         language: 'css'
//       }
//     ],
//     resources: [
//       {
//         title: 'MDN CSS Guide',
//         type: 'link',
//         url: 'https://developer.mozilla.org/en-US/docs/Web/CSS'
//       },
//       {
//         title: 'CSS Tricks',
//         type: 'link',
//         url: 'https://css-tricks.com'
//       },
//       {
//         title: 'Modern CSS Solutions',
//         type: 'link',
//         url: 'https://moderncss.dev'
//       }
//     ]
//   },
//   videos: {
//     create: [
//       {
//         title: 'CSS Fundamentals',
//         language: 'en',
//         videoUrl: 'https://pub-1940a3f06c164501aeb26d4bb7b4098d.r2.dev/CSS in 100 Seconds.mp4'
//       },
//       {
//         title: 'CSS की मूल बातें',
//         language: 'hi',
//         videoUrl: 'https://pub-1940a3f06c164501aeb26d4bb7b4098d.r2.dev/css_hindi.mp4'
//       }
//     ]
//   },
  
// },
// {
//   title: 'JavaScript Programming',
//   sequenceOrder: 3,
//   contentSummary: 'Master modern JavaScript fundamentals, DOM manipulation, and asynchronous programming',
//   content: {
//     sections: [
//       {
//         title: 'Modern JavaScript Fundamentals',
//         type: 'text',
//         content: 'JavaScript is a versatile programming language that enables interactive web applications. Modern JavaScript (ES6+) includes powerful features like arrow functions, destructuring, modules, and async/await for better code organization and asynchronous operations.'
//       },
//       {
//         title: 'Variables and Data Types',
//         type: 'code',
//         language: 'javascript',
//         content: `// Variable declarations
// const PI = 3.14159;
// let count = 0;

// // Data types
// const string = 'Hello, World!';
// const number = 42;
// const boolean = true;
// const array = [1, 2, 3, 4, 5];
// const object = {
//   name: 'John',
//   age: 30,
//   hobbies: ['reading', 'coding']
// };

// // Template literals
// const name = 'Alice';
// const greeting = \`Hello, ${name}! Welcome to JavaScript.\`;

// // Destructuring
// const { name: userName, age } = object;
// const [first, second, ...rest] = array;`
//       },
//       {
//         title: 'Functions and Arrow Functions',
//         type: 'code',
//         language: 'javascript',
//         content: `// Traditional function
// function add(a, b) {
//   return a + b;
// }

// // Arrow function
// const multiply = (a, b) => a * b;

// // Default parameters
// const greet = (name = 'Guest') => \`Hello, ${name}!\`;

// // Higher-order functions
// const numbers = [1, 2, 3, 4, 5];
// const doubled = numbers.map(num => num * 2);
// const evenNumbers = numbers.filter(num => num % 2 === 0);
// const sum = numbers.reduce((acc, curr) => acc + curr, 0);`
//       },
//       {
//         title: 'DOM Manipulation',
//         type: 'code',
//         language: 'javascript',
//         content: `// Selecting elements
// const container = document.querySelector('.container');
// const buttons = document.querySelectorAll('.btn');

// // Creating elements
// const newDiv = document.createElement('div');
// newDiv.className = 'new-element';
// newDiv.textContent = 'Hello, DOM!';
// container.appendChild(newDiv);

// // Event handling
// buttons.forEach(button => {
//   button.addEventListener('click', (event) => {
//     console.log('Button clicked:', event.target.textContent);
//     event.target.classList.toggle('active');
//   });
// });

// // DOM manipulation with data attributes
// const updateUI = (data) => {
//   const element = document.querySelector('[data-content]');
//   element.dataset.status = 'updated';
//   element.textContent = data;
// };`
//       },
//       {
//         title: 'Asynchronous JavaScript',
//         type: 'code',
//         language: 'javascript',
//         content: `// Promises
// const fetchData = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const data = { id: 1, name: 'Example' };
//       resolve(data);
//     }, 1000);
//   });
// };

// // Async/Await
// async function getData() {
//   try {
//     const response = await fetch('https://api.example.com/data');
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// }

// // Error handling
// async function processData() {
//   try {
//     const result = await getData();
//     console.log(result);
//   } catch (error) {
//     console.error('Error:', error);
//   } finally {
//     console.log('Processing complete');
//   }
// }`
//       },
//       {
//         title: 'JavaScript Best Practices',
//         type: 'list',
//         items: [
//           'Use const by default, let when needed, avoid var',
//           'Implement proper error handling with try/catch',
//           'Write pure functions when possible',
//           'Use meaningful variable and function names',
//           'Comment complex algorithms and business logic',
//           'Avoid global scope pollution',
//           'Use modern ES6+ features appropriately',
//           'Implement proper memory management'
//         ]
//       },
//       {
//         title: 'Practical Exercise',
//         type: 'exercise',
//         instructions: 'Create a todo list application that allows adding, completing, and deleting tasks. Implement data persistence using localStorage.',
//         starterCode: `// Todo List App
// class TodoList {
//   constructor() {
//     // Initialize your todo list here
//   }

//   addTask(title) {
//     // Implement add task
//   }

//   completeTask(id) {
//     // Implement complete task
//   }

//   deleteTask(id) {
//     // Implement delete task
//   }
// }

// // Add your event listeners and UI logic here`,
//         language: 'javascript'
//       }
//     ],
//     resources: [
//       {
//         title: 'MDN JavaScript Guide',
//         type: 'link',
//         url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'
//       },
//       {
//         title: 'JavaScript.info',
//         type: 'link',
//         url: 'https://javascript.info'
//       },
//       {
//         title: 'Clean Code JavaScript',
//         type: 'link',
//         url: 'https://github.com/ryanmcdermott/clean-code-javascript'
//       }
//     ]
//   },
//   videos: {
//     create: [
//       {
//         title: 'JavaScript Basics',
//         language: 'en',
//         videoUrl: 'https://pub-1940a3f06c164501aeb26d4bb7b4098d.r2.dev/JavaScript in 100 Seconds.mp4'
//       },
//       {
//         title: 'JavaScript की मूल बातें',
//         language: 'hi',
//         videoUrl: 'https://pub-1940a3f06c164501aeb26d4bb7b4098d.r2.dev/js_hindi.mp4'
//       }
//     ]
//   }
// }
//         ]
//       }
//     }
//   });

//   // Create Enrollments
//   await prisma.enrollment.create({
//     data: {
//       userId: user1.id,
//       courseId: course.id
//     }
//   });

//   await prisma.enrollment.create({
//     data: {
//       userId: user2.id,
//       courseId: course.id
//     }
//   });

//   console.log('Seed data created successfully');
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });


const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const coursesData = [
    {
      title: 'Introduction to Python',
      description: 'Learn the fundamentals of Python programming language.',
      price: 49.99,
      chapters: {
        create: [
          {
            title: 'Python Basics',
            sequenceOrder: 1,
            contentSummary: 'Get started with Python basics.',
            content: {
              sections: [
                {
                  title: 'What is Python?',
                  type: 'text',
                  content: 'Python is a popular, easy-to-learn programming language used for web, data science, automation, and more.'
                }
              ]
            }
          }
        ]
      }
    },
    {
      title: 'Web Development with HTML & CSS',
      description: 'Build your first website using HTML and CSS.',
      price: 39.99,
      chapters: {
        create: [
          {
            title: 'HTML & CSS Fundamentals',
            sequenceOrder: 1,
            contentSummary: 'Learn the building blocks of web development.',
            content: {
              sections: [
                {
                  title: 'Introduction to HTML',
                  type: 'text',
                  content: 'HTML provides the structure for web pages, while CSS is used to style them.'
                }
              ]
            }
          }
        ]
      }
    },
    {
      title: 'JavaScript Essentials',
      description: 'Master the basics of JavaScript programming.',
      price: 59.99,
      chapters: {
        create: [
          {
            title: 'JavaScript Basics',
            sequenceOrder: 1,
            contentSummary: 'Understand variables, functions, and control structures in JavaScript.',
            content: {
              sections: [
                {
                  title: 'JavaScript Fundamentals',
                  type: 'text',
                  content: 'JavaScript is the language of the web. It brings interactivity to websites.'
                }
              ]
            }
          }
        ]
      }
    },
    {
      title: 'Data Structures and Algorithms',
      description: 'Learn essential data structures and algorithms for problem-solving.',
      price: 79.99,
      chapters: {
        create: [
          {
            title: 'Introduction to Data Structures',
            sequenceOrder: 1,
            contentSummary: 'Familiarize yourself with arrays, lists, and more.',
            content: {
              sections: [
                {
                  title: 'Arrays and Lists',
                  type: 'text',
                  content: 'Arrays and lists are fundamental structures that store collections of data.'
                }
              ]
            }
          }
        ]
      }
    },
    {
      title: 'Introduction to Machine Learning',
      description: 'Discover the basics of machine learning and its applications.',
      price: 99.99,
      chapters: {
        create: [
          {
            title: 'Machine Learning Overview',
            sequenceOrder: 1,
            contentSummary: 'An overview of machine learning concepts and terminologies.',
            content: {
              sections: [
                {
                  title: 'What is Machine Learning?',
                  type: 'text',
                  content: 'Machine learning uses algorithms to parse data, learn from it, and make informed decisions.'
                }
              ]
            }
          }
        ]
      }
    },
    {
      title: 'UI/UX Design Fundamentals',
      description: 'Learn the basics of user interface and user experience design.',
      price: 44.99,
      chapters: {
        create: [
          {
            title: 'Design Principles',
            sequenceOrder: 1,
            contentSummary: 'Understand the core principles of UI/UX design.',
            content: {
              sections: [
                {
                  title: 'Principles of Design',
                  type: 'text',
                  content: 'Learn about balance, contrast, and hierarchy to create visually appealing designs.'
                }
              ]
            }
          }
        ]
      }
    },
    {
      title: 'Mobile App Development with Flutter',
      description: 'Build beautiful native mobile applications using Flutter.',
      price: 109.99,
      chapters: {
        create: [
          {
            title: 'Getting Started with Flutter',
            sequenceOrder: 1,
            contentSummary: 'Introduction to Flutter and its development environment.',
            content: {
              sections: [
                {
                  title: 'Flutter Overview',
                  type: 'text',
                  content: 'Flutter is an open-source UI toolkit for building natively compiled applications across mobile, web, and desktop from a single codebase.'
                }
              ]
            }
          }
        ]
      }
    },
    {
      title: 'Digital Marketing Basics',
      description: 'Learn the essentials of digital marketing and online promotion.',
      price: 29.99,
      chapters: {
        create: [
          {
            title: 'Introduction to Digital Marketing',
            sequenceOrder: 1,
            contentSummary: 'Understand digital marketing strategies and tools.',
            content: {
              sections: [
                {
                  title: 'What is Digital Marketing?',
                  type: 'text',
                  content: 'Digital marketing involves promoting products or services using digital channels to reach consumers.'
                }
              ]
            }
          }
        ]
      }
    },
    {
      title: 'Cybersecurity Essentials',
      description: 'Learn how to protect systems and data in the digital world.',
      price: 89.99,
      chapters: {
        create: [
          {
            title: 'Cybersecurity Fundamentals',
            sequenceOrder: 1,
            contentSummary: 'An introduction to cybersecurity concepts.',
            content: {
              sections: [
                {
                  title: 'Basic Security Concepts',
                  type: 'text',
                  content: 'Learn about threats, vulnerabilities, and best practices to secure digital assets.'
                }
              ]
            }
          }
        ]
      }
    },
    {
      title: 'Cloud Computing with AWS',
      description: 'Explore cloud computing and learn how to use AWS services.',
      price: 119.99,
      chapters: {
        create: [
          {
            title: 'Getting Started with AWS',
            sequenceOrder: 1,
            contentSummary: 'Learn the basics of Amazon Web Services.',
            content: {
              sections: [
                {
                  title: 'Introduction to AWS',
                  type: 'text',
                  content: 'AWS offers reliable, scalable, and inexpensive cloud computing services.'
                }
              ]
            }
          }
        ]
      }
    }
  ];

  // Loop through each course and create it in the database.
  for (const courseData of coursesData) {
    await prisma.course.create({ data: courseData });
    console.log(`Created course: ${courseData.title}`);
  }
}

async function deleteCourse(courseId) {
  try {
    console.log(`Starting deletion process for course ID: ${courseId}`)

    // 1. Delete all quiz attempts related to the course's quizzes
    await prisma.quizAttempt.deleteMany({
      where: {
        quiz: {
          chapter: {
            courseId: courseId
          }
        }
      }
    })
    console.log('Deleted quiz attempts')

    // 2. Delete all questions related to the course's quizzes
    await prisma.question.deleteMany({
      where: {
        quiz: {
          chapter: {
            courseId: courseId
          }
        }
      }
    })
    console.log('Deleted questions')

    // 3. Delete all quizzes related to the course's chapters
    await prisma.quiz.deleteMany({
      where: {
        chapter: {
          courseId: courseId
        }
      }
    })
    console.log('Deleted quizzes')

    // 4. Delete all user progress records for the course's chapters
    await prisma.userProgress.deleteMany({
      where: {
        chapter: {
          courseId: courseId
        }
      }
    })
    console.log('Deleted user progress')

    // 5. Delete all videos related to the course's chapters
    await prisma.video.deleteMany({
      where: {
        chapter: {
          courseId: courseId
        }
      }
    })
    console.log('Deleted videos')

    // 6. Delete all chapters of the course
    await prisma.chapter.deleteMany({
      where: {
        courseId: courseId
      }
    })
    console.log('Deleted chapters')

    // 7. Delete all enrollments for the course
    await prisma.enrollment.deleteMany({
      where: {
        courseId: courseId
      }
    })
    console.log('Deleted enrollments')

    // 8. Delete all payments related to the course
    await prisma.payment.deleteMany({
      where: {
        courseId: courseId
      }
    })
    console.log('Deleted payments')

    // 9. Finally, delete the course itself
    await prisma.course.delete({
      where: {
        id: courseId
      }
    })
    console.log('Deleted course')

    console.log('Successfully deleted all data related to the course')
  } catch (error) {
    console.error('Error during deletion:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Execute the deletion
 // Replace with your actual course ID
deleteCourse(49)
  .catch((error) => {
    console.error('Failed to delete course:', error)
    process.exit(1)
  })

