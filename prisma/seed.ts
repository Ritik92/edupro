const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.question.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.chapter.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();

  // Create demo users
  const demoUser = await prisma.user.create({
    data: {
      email: 'demo@example.com',
      name: 'Demo User',
      password: '121245',
    },
  });

  const additionalUser = await prisma.user.create({
    data: {
      email: 'student@example.com',
      name: 'Student User',
      password: '121245',
    },
  });

  // Create Web Development course
  const webDevCourse = await prisma.course.create({
    data: {
      title: 'Complete Web Development Bootcamp',
      description: 'Learn full-stack web development from scratch with modern technologies and best practices. This comprehensive course covers front-end, back-end, and deployment.',
      price: 99.99,
    },
  });

  // Create additional course
  const reactCourse = await prisma.course.create({
    data: {
      title: 'Advanced React Development',
      description: 'Master modern React development with hooks, context, Redux, and advanced patterns',
      price: 79.99,
    },
  });

  // Create chapters
  const chapters = await Promise.all([
    prisma.chapter.create({
      data: {
        title: 'HTML Fundamentals',
        contentSummary: 'Dive deep into HTML5 fundamentals and modern web development practices. Learn about semantic HTML elements that improve accessibility and SEO, including header, nav, main, article, section, aside, and footer. Master form creation with various input types, validation attributes, and proper labeling. Understand metadata, viewport settings, and social media tags. Explore best practices for structure and organization, including proper nesting, comments, and code formatting. Cover advanced topics like custom data attributes, embedded content, and iframe usage. Learn about HTML5 APIs including Web Storage, Geolocation, and Canvas.',
        sequenceOrder: 1,
        courseId: webDevCourse.id,
        quiz: {
          create: {
            title: 'HTML Basics Quiz',
            questions: {
              create: [
                {
                  questionText: 'Which tag is used to create a hyperlink?',
                  correctAnswer: '<a>',
                  option1: '<a>',
                  option2: '<link>',
                  option3: '<href>',
                  option4: '<url>',
                },
                {
                  questionText: 'What does HTML stand for?',
                  correctAnswer: 'HyperText Markup Language',
                  option1: 'HyperText Markup Language',
                  option2: 'HighText Machine Language',
                  option3: 'HyperText Machine Language',
                  option4: 'HighText Markup Language',
                },
                {
                  questionText: 'Which HTML element is used to define important text?',
                  correctAnswer: '<strong>',
                  option1: '<strong>',
                  option2: '<b>',
                  option3: '<important>',
                  option4: '<em>',
                },
                {
                  questionText: 'What is the correct HTML element for inserting a line break?',
                  correctAnswer: '<br>',
                  option1: '<br>',
                  option2: '<break>',
                  option3: '<lb>',
                  option4: '<newline>',
                },
              ],
            },
          },
        },
      },
    }),
    prisma.chapter.create({
      data: {
        title: 'CSS Styling',
        contentSummary: 'Comprehensive exploration of CSS3 and modern styling techniques. Master the fundamentals of selectors, specificity, and the cascade. Deep dive into flexbox layout system for building flexible, responsive designs. Learn CSS Grid for complex two-dimensional layouts. Explore animations and transitions for creating engaging user experiences. Study responsive design principles including media queries, fluid layouts, and mobile-first approaches. Cover advanced topics like CSS custom properties, pseudo-elements, and CSS-in-JS solutions. Understand CSS architecture methodologies including BEM and SMACSS. Learn about CSS preprocessors like Sass and performance optimization techniques.',
        sequenceOrder: 2,
        courseId: webDevCourse.id,
        quiz: {
          create: {
            title: 'CSS Concepts Quiz',
            questions: {
              create: [
                {
                  questionText: 'Which property is used to change the text color?',
                  correctAnswer: 'color',
                  option1: 'color',
                  option2: 'text-color',
                  option3: 'font-color',
                  option4: 'text-style',
                },
                {
                  questionText: 'What does CSS stand for?',
                  correctAnswer: 'Cascading Style Sheets',
                  option1: 'Cascading Style Sheets',
                  option2: 'Creative Style System',
                  option3: 'Computer Style Sheets',
                  option4: 'Colorful Style Sheets',
                },
                {
                  questionText: 'Which property is used for creating a flexbox container?',
                  correctAnswer: 'display: flex',
                  option1: 'display: flex',
                  option2: 'flex: 1',
                  option3: 'position: flex',
                  option4: 'flex-box: true',
                },
                {
                  questionText: 'What is the correct way to apply a grid layout?',
                  correctAnswer: 'display: grid',
                  option1: 'display: grid',
                  option2: 'grid: true',
                  option3: 'display: grid-layout',
                  option4: 'grid-display: true',
                },
              ],
            },
          },
        },
      },
    }),
    prisma.chapter.create({
      data: {
        title: 'JavaScript Basics',
        contentSummary: 'Comprehensive introduction to modern JavaScript programming concepts and practices. Master fundamental concepts including variables, data types, operators, and control structures. Learn about functions, scope, and closure in JavaScript. Understand object-oriented programming with classes and prototypes. Deep dive into asynchronous programming with Promises and async/await. Study DOM manipulation and event handling for interactive web applications. Explore modern ES6+ features including arrow functions, destructuring, and modules. Learn about error handling, debugging techniques, and best practices. Cover important concepts like hoisting, the event loop, and memory management. Understand modern development tools and testing approaches.',
        sequenceOrder: 3,
        courseId: webDevCourse.id,
        quiz: {
          create: {
            title: 'JavaScript Fundamentals Quiz',
            questions: {
              create: [
                {
                  questionText: 'Which keyword is used to declare a variable in JavaScript?',
                  correctAnswer: 'let',
                  option1: 'let',
                  option2: 'var',
                  option3: 'const',
                  option4: 'all of the above',
                },
                {
                  questionText: 'What is the correct way to write a JavaScript array?',
                  correctAnswer: '["apple", "banana", "orange"]',
                  option1: '["apple", "banana", "orange"]',
                  option2: '("apple", "banana", "orange")',
                  option3: '{apple, banana, orange}',
                  option4: '<apple, banana, orange>',
                },
                {
                  questionText: 'What is the purpose of the Promise object?',
                  correctAnswer: 'To handle asynchronous operations',
                  option1: 'To handle asynchronous operations',
                  option2: 'To store multiple values',
                  option3: 'To create loops',
                  option4: 'To define functions',
                },
                {
                  questionText: 'What is the difference between == and === in JavaScript?',
                  correctAnswer: '=== checks both value and type',
                  option1: '=== checks both value and type',
                  option2: 'They are the same',
                  option3: '== is invalid in JavaScript',
                  option4: '=== is only for numbers',
                },
              ],
            },
          },
        },
      },
    }),
    prisma.chapter.create({
      data: {
        title: 'React Fundamentals',
        contentSummary: 'In-depth exploration of React fundamentals and modern development patterns. Master component architecture and the virtual DOM concept. Learn state management using useState and useReducer hooks. Understand side effects with useEffect and custom hooks. Deep dive into context API for state sharing between components. Study component lifecycle and optimization techniques. Learn about routing in React applications using React Router. Explore form handling and validation approaches. Master testing React components with Jest and React Testing Library. Cover best practices for project structure and component organization. Learn about React performance optimization and debugging techniques.',
        sequenceOrder: 1,
        courseId: reactCourse.id,
        quiz: {
          create: {
            title: 'React Basics Quiz',
            questions: {
              create: [
                {
                  questionText: 'What hook is used for managing state in React?',
                  correctAnswer: 'useState',
                  option1: 'useState',
                  option2: 'useState()',
                  option3: 'state()',
                  option4: 'setState',
                },
                {
                  questionText: 'What is the virtual DOM?',
                  correctAnswer: 'A lightweight copy of the actual DOM',
                  option1: 'A lightweight copy of the actual DOM',
                  option2: 'A new web browser',
                  option3: 'A JavaScript library',
                  option4: 'A programming language',
                },
                {
                  questionText: 'Which hook is used for side effects in React?',
                  correctAnswer: 'useEffect',
                  option1: 'useEffect',
                  option2: 'useSideEffect',
                  option3: 'useAction',
                  option4: 'useChange',
                },
              ],
            },
          },
        },
      },
    }),
  ]);

  // Enroll users in courses
  await Promise.all([
    prisma.enrollment.create({
      data: {
        userId: demoUser.id,
        courseId: webDevCourse.id,
      },
    }),
    prisma.enrollment.create({
      data: {
        userId: demoUser.id,
        courseId: reactCourse.id,
      },
    }),
    prisma.enrollment.create({
      data: {
        userId: additionalUser.id,
        courseId: webDevCourse.id,
      },
    }),
  ]);

  console.log('Enhanced seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });