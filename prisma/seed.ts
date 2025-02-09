const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {


  const course = await prisma.course.create({
    data: {
      title: 'Introduction to Calculus',
      description: 'Master the fundamentals of calculus, from limits to derivatives and integrals',
      price: 89.99,
      chapters: {
        create: [
          {
            title: 'Limits and Continuity',
            sequenceOrder: 1,
            contentSummary: 'Understanding the foundation of calculus through limits and continuity',
            content: {
              sections: [
                {
                  title: 'Introduction to Limits',
                  type: 'text',
                  content: 'Limits form the foundation of calculus. A limit describes the value that a function approaches as the input approaches a particular value. This concept is crucial for understanding derivatives and continuous functions.'
                },
                {
                  title: 'Computing Limits',
                  type: 'code',
                  language: 'latex',
                  content: `# Example 1: Direct Substitution
lim(x→2) x² + 3x + 1 = 4 + 6 + 1 = 11

# Example 2: Factor and Cancel
lim(x→3) (x² - 9)/(x - 3) = lim(x→3) (x + 3)(x - 3)/(x - 3) = lim(x→3) (x + 3) = 6

# Example 3: Rationalize
lim(x→0) (√(1 + x) - 1)/x = lim(x→0) (√(1 + x) - 1)(√(1 + x) + 1)/(x(√(1 + x) + 1)) = 1/2`
                },
                {
                  title: 'Continuous Functions',
                  type: 'text',
                  content: 'A function is continuous at a point if the limit at that point exists and equals the function value. Three conditions must be met:\n1. f(a) exists\n2. lim(x→a) f(x) exists\n3. lim(x→a) f(x) = f(a)'
                },
                {
                  title: 'Key Theorems',
                  type: 'list',
                  items: [
                    'Intermediate Value Theorem: If f is continuous on [a,b] and y is between f(a) and f(b), then there exists c in [a,b] where f(c) = y',
                    'Extreme Value Theorem: If f is continuous on [a,b], then f attains both a maximum and minimum value on [a,b]',
                    'Squeeze Theorem: If g(x) ≤ f(x) ≤ h(x) and lim g(x) = lim h(x) = L, then lim f(x) = L',
                    'Mean Value Theorem: If f is continuous on [a,b] and differentiable on (a,b), then there exists c in (a,b) where f\'(c) = [f(b)-f(a)]/(b-a)'
                  ]
                },
                {
                  title: 'Practice Problems',
                  type: 'exercise',
                  instructions: 'Evaluate the following limits:',
                  problems: [
                    'lim(x→2) (x² - 4)/(x - 2)',
                    'lim(x→0) sin(x)/x',
                    'lim(x→∞) (3x² + 2x)/(x² + 1)',
                    'lim(x→1) (x³ - 1)/(x - 1)'
                  ]
                }
              ],
              resources: [
                {
                  title: 'Khan Academy - Limits',
                  type: 'link',
                  url: 'https://www.khanacademy.org/math/calculus-1/cs1-limits-and-continuity'
                },
                {
                  title: 'MIT OpenCourseWare - Continuity',
                  type: 'link',
                  url: 'https://ocw.mit.edu/courses/mathematics/18-01sc-single-variable-calculus'
                }
              ]
            }
          },
          {
            title: 'Derivatives and Differentiation',
            sequenceOrder: 2,
            contentSummary: 'Learn about derivatives, differentiation rules, and their applications',
            content: {
              sections: [
                {
                  title: 'Introduction to Derivatives',
                  type: 'text',
                  content: 'The derivative measures the instantaneous rate of change of a function at any given point.'
                }
              ]
            }
          },
          {
            title: 'Applications of Derivatives',
            sequenceOrder: 3,
            contentSummary: 'Explore real-world applications of derivatives in optimization and related rates',
            content: {
              sections: [
                {
                  title: 'Optimization Problems',
                  type: 'text',
                  content: 'Learn how to find maximum and minimum values in practical scenarios.'
                }
              ]
            }
          },
          {
            title: 'Integration',
            sequenceOrder: 4,
            contentSummary: 'Master the techniques of integration and understand its relationship with differentiation',
            content: {
              sections: [
                {
                  title: 'Definite and Indefinite Integrals',
                  type: 'text',
                  content: 'Understanding the fundamental theorem of calculus and basic integration techniques.'
                }
              ]
            }
          },
          {
            title: 'Applications of Integration',
            sequenceOrder: 5,
            contentSummary: 'Learn how to apply integration to find areas, volumes, and solve physical problems',
            content: {
              sections: [
                {
                  title: 'Area and Volume',
                  type: 'text',
                  content: 'Calculate areas between curves and volumes of revolution.'
                }
              ]
            }
          }
        ]
      }
    }
  });

  console.log('Calculus course seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });