const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Clean existing data
  await prisma.video.deleteMany({});
  await prisma.enrollment.deleteMany({});
  await prisma.question.deleteMany({});
  await prisma.quiz.deleteMany({});
  await prisma.chapter.deleteMany({});
  await prisma.course.deleteMany({});
  await prisma.user.deleteMany({});

  // Create Users
  const user1 = await prisma.user.create({
    data: {
      email: 'john.doe@example.com',
      name: 'John Doe',
      password: '121245',
      preferredLang: 'en',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'jane.smith@example.com',
      name: 'Jane Smith',
      password: '121254',
      preferredLang: 'hi',
    },
  });

  // Create Course with chapters for HTML, CSS, and JavaScript
  const course = await prisma.course.create({
    data: {
      title: 'Web Development Fundamentals',
      description: 'Master HTML, CSS, and JavaScript with bilingual support',
      price: 99.99,
      chapters: {
        create: [
          {
            title: 'HTML Fundamentals',
            sequenceOrder: 1,
            contentSummary: 'Learn the basics of HTML and document structure',
            content: {
              sections: [
                {
                  title: 'Introduction to HTML',
                  type: 'text',
                  content: 'HTML is the foundation of web development.'
                }
              ],
              resources: [
                {
                  title: 'MDN HTML Guide',
                  type: 'link',
                  url: 'https://developer.mozilla.org/en-US/docs/Web/HTML'
                }
              ]
            },
            videos: {
              create: [
                {
                  title: 'HTML Basics',
                  language: 'en',
                  videoUrl: 'https://pub-1940a3f06c164501aeb26d4bb7b4098d.r2.dev'
                },
                {
                  title: 'HTML की मूल बातें',
                  language: 'hi',
                  videoUrl: 'https://pub-1940a3f06c164501aeb26d4bb7b4098d.r2.dev'
                }
              ]
            }
          },
          {
            title: 'CSS Styling',
            sequenceOrder: 2,
            contentSummary: 'Master CSS styling and layouts',
            content: {
              sections: [
                {
                  title: 'Introduction to CSS',
                  type: 'text',
                  content: 'CSS is used for styling web pages.'
                }
              ],
              resources: [
                {
                  title: 'MDN CSS Guide',
                  type: 'link',
                  url: 'https://developer.mozilla.org/en-US/docs/Web/CSS'
                }
              ]
            },
            videos: {
              create: [
                {
                  title: 'CSS Fundamentals',
                  language: 'en',
                  videoUrl: 'https://pub-1940a3f06c164501aeb26d4bb7b4098d.r2.dev'
                },
                {
                  title: 'CSS की मूल बातें',
                  language: 'hi',
                  videoUrl: 'https://pub-1940a3f06c164501aeb26d4bb7b4098d.r2.dev'
                }
              ]
            }
          },
          {
            title: 'JavaScript Programming',
            sequenceOrder: 3,
            contentSummary: 'Learn JavaScript programming fundamentals',
            content: {
              sections: [
                {
                  title: 'Introduction to JavaScript',
                  type: 'text',
                  content: 'JavaScript adds interactivity to web pages.'
                }
              ],
              resources: [
                {
                  title: 'MDN JavaScript Guide',
                  type: 'link',
                  url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'
                }
              ]
            },
            videos: {
              create: [
                {
                  title: 'JavaScript Basics',
                  language: 'en',
                  videoUrl: 'https://pub-1940a3f06c164501aeb26d4bb7b4098d.r2.dev/JavaScript in 100 Seconds.mp4'
                },
                {
                  title: 'JavaScript की मूल बातें',
                  language: 'hi',
                  videoUrl: 'https://pub-1940a3f06c164501aeb26d4bb7b4098d.r2.dev/js_hindi.mp4'
                }
              ]
            }
          }
        ]
      }
    }
  });

  // Create Enrollments
  await prisma.enrollment.create({
    data: {
      userId: user1.id,
      courseId: course.id
    }
  });

  await prisma.enrollment.create({
    data: {
      userId: user2.id,
      courseId: course.id
    }
  });

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });