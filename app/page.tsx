"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users, Award, CheckCircle, Star, Rocket, GraduationCap } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const staggerChildren = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
   

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              className="mb-8"
            >
              <Rocket className="h-16 w-16 text-indigo-600 mx-auto animate-bounce" />
            </motion.div>
            
            <h1 className="text-5xl sm:text-7xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Transform Your Future with
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Expert Learning
              </span>
            </h1>
            
            <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join our vibrant community of learners and unlock your potential with industry-leading courses, 
              hands-on projects, and career-changing certifications.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Button 
                onClick={() => router.push('/courses')} 
                size="lg" 
                className="text-lg px-10 py-7 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg transition-all"
              >
                <Rocket className="mr-3 h-5 w-5" />
                Explore Courses
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-10 py-7 border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-700"
              >
                <GraduationCap className="mr-3 h-5 w-5" />
                Meet Our Instructors
              </Button>
            </div>
          </motion.div>

          {/* Floating Shapes Animation */}
          <motion.div 
            className="absolute top-0 left-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-gradient-to-r from-purple-400/20 to-indigo-400/20 rounded-full blur-lg"
                style={{
                  width: `${Math.random() * 100 + 50}px`,
                  height: `${Math.random() * 100 + 50}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
                animate={{
                  y: [0, -100, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Why Choose Us?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the features that make our platform the best choice for your learning journey
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {[
              { icon: BookOpen, title: "300+ Courses", color: "from-blue-400 to-indigo-500" },
              { icon: Users, title: "1M+ Students", color: "from-purple-400 to-fuchsia-500" },
              { icon: Award, title: "Certifications", color: "from-pink-400 to-rose-500" },
            ].map((feature, i) => (
              <motion.div 
                key={i}
                variants={fadeIn}
                className="group relative bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-all rounded-3xl`} />
                <div className={`mb-6 w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mx-auto`}>
                  <feature.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {i === 0 && "Comprehensive curriculum covering latest technologies and trends"}
                  {i === 1 && "Join our global community of passionate learners and experts"}
                  {i === 2 && "Earn industry-recognized certificates to boost your career"}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="rounded-[40px] p-12 shadow-2xl relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-noise opacity-10" />
            <div className="text-center max-w-3xl mx-auto relative z-10">
              <h2 className="text-4xl font-bold text-white mb-6">
                Start Learning Today with
                <span className="block text-5xl mt-4">7-Day Free Trial</span>
              </h2>
              <p className="text-xl text-indigo-100 mb-12 max-w-2xl mx-auto">
                Join thousands of successful learners who transformed their careers with us
              </p>
              <Button 
                size="lg" 
                className="text-lg px-14 py-8 bg-white text-indigo-600 hover:bg-gray-100 hover:scale-105 transform transition-all"
              >
                <Star className="mr-3 h-6 w-6 fill-yellow-400 stroke-yellow-500" />
                Start Free Trial
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {[
              { number: "100K+", label: "Certificates Issued" },
              { number: "95%", label: "Success Rate" },
              { number: "4.9/5", label: "Student Rating" },
              { number: "50+", label: "Expert Instructors" },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                variants={fadeIn}
                className="p-8 text-center border-2 border-indigo-50 rounded-3xl bg-white hover:bg-gradient-to-b from-white to-indigo-50 transition-all"
              >
                <div className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  {stat.number}
                </div>
                <div className="text-xl font-medium text-gray-700">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}