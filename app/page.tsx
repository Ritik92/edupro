"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { ArrowRight, BookOpen, Users, Award, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router=useRouter();
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="min-h-screen">
    
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
              Transform Your Future with
              <span className="text-primary"> Expert-Led</span> Learning
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Access high-quality courses, interactive quizzes, and earn certificates. 
              Join thousands of learners advancing their careers today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button onClick={()=>{router.push('/courses')}} size="lg" className="text-lg px-8">
                Explore Courses
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={{
              initial: {},
              animate: {
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
          >
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-lg"
              variants={fadeIn}
            >
              <BookOpen className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expert-Led Courses</h3>
              <p className="text-gray-600">Learn from industry professionals with our comprehensive course library.</p>
            </motion.div>

            <motion.div 
              className="bg-white p-6 rounded-lg shadow-lg"
              variants={fadeIn}
            >
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Interactive Learning</h3>
              <p className="text-gray-600">Engage with quizzes, assignments, and a supportive community.</p>
            </motion.div>

            <motion.div 
              className="bg-white p-6 rounded-lg shadow-lg"
              variants={fadeIn}
            >
              <Award className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Earn Certificates</h3>
              <p className="text-gray-600">Get recognized for your achievements with verified certificates.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="bg-primary text-white rounded-2xl p-8 sm:p-12"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Start Your Learning Journey?</h2>
              <p className="text-lg mb-8 opacity-90">
                Join thousands of learners who are already advancing their careers with our platform.
              </p>
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white text-primary hover:bg-gray-100 text-lg px-8"
              >
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={{
              initial: {},
              animate: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            <motion.div
              variants={fadeIn}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <div className="text-4xl font-bold text-primary mb-2">100+</div>
              <div className="text-gray-600">Expert Courses</div>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <div className="text-4xl font-bold text-primary mb-2">10k+</div>
              <div className="text-gray-600">Active Students</div>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <div className="text-4xl font-bold text-primary mb-2">95%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <div className="text-4xl font-bold text-primary mb-2">50k+</div>
              <div className="text-gray-600">Certificates Awarded</div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}