"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, BookOpen, GraduationCap, Star, Rocket, Zap } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";

interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
}

interface Enrollment {
  courseId: number;
  userId: number;
}
declare global {
  interface Window {
    Razorpay: any;
  }
}

const CoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesResponse, enrollmentsResponse] = await Promise.all([
          axios.get("/api/courses"),
          session ? axios.get("/api/enrollment") : Promise.resolve({ data: [] }),
        ]);
        setCourses(coursesResponse.data);
        setEnrollments(enrollmentsResponse.data);
      } catch (err) {
        setError("Failed to fetch courses. Please try again later.");
        toast.error("Failed to fetch courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session]);

  const isEnrolled = (courseId: number) => {
    return enrollments.some((enrollment) => enrollment.courseId === courseId);
  };

  const handleEnroll = async (courseId: number) => {
    try {
      const response = await axios.post("/api/enrollment", { courseId });
      setEnrollments([...enrollments, { courseId, userId: response.data.userId }]);
      toast.success("Enrollment successful! Start learning now.");
    } catch (error) {
      console.error("Enrollment error:", error);
      toast.error("Please sign in to enroll!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full"
          />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center p-8 bg-white rounded-2xl shadow-xl"
          >
            <div className="text-6xl mb-4">😞</div>
            <p className="text-xl text-gray-700 mb-6 max-w-md">{error}</p>
            <Button 
              onClick={() => window.location.reload()}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full"
            >
              <Zap className="mr-2 h-5 w-5" />
              Try Again
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const CourseButton = ({ course }: { course: Course }) => {
    const handlePayment = async () => {
      try {
        if (!session) {
          toast.error("Please sign in to enroll!");
          return;
        }

        const res = await loadRazorpay();
        if (!res) {
          toast.error("Razorpay SDK failed to load. Please try again.");
          return;
        }

        // Create order
        const orderResponse = await axios.post('/api/create-order', {
          courseId: course.id,
        });

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: orderResponse.data.amount,
          currency: orderResponse.data.currency,
          name: 'Learning Platform',
          description: `Payment for ${course.title}`,
          order_id: orderResponse.data.orderId,
          handler: async function (response: any) {
            try {
              // Verify payment
              await axios.post('/api/verify-payment', {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature
              });
              
              toast.success('Payment successful! You are now enrolled.');
              //@ts-ignore
              setEnrollments(prev => [...prev, { courseId: course.id, userId: session?.user?.id as number }]);
            } catch (error) {
              toast.error('Payment verification failed. Please contact support.');
            }
          },
          prefill: {
            name: session?.user?.name || '',
            email: session?.user?.email || '',
          },
          theme: {
            color: '#4F46E5',
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (error) {
        console.error('Payment error:', error);
        toast.error('Failed to initiate payment. Please try again.');
      }
    };

    if (isEnrolled(course.id)) {
      return (
        <Link href={`/courses/${course.id}`}>
          <Button className="w-full group" size="lg">
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Continue Learning
            </span>
            <ArrowRight className="ml-2 h-5 w-5 text-emerald-600 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      );
    }

    return (
      <Button
        size="lg"
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white hover:shadow-lg"
        onClick={handlePayment}
      >
        Enroll Now - ${course.price}
        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
      </Button>
    );
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <Toaster position="top-right" toastOptions={{ className: 'bg-white shadow-xl' }} />

      {/* Header Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8 inline-block bg-indigo-100 px-6 py-2 rounded-full">
              <span className="text-indigo-600 font-semibold flex items-center gap-2">
                <Rocket className="h-5 w-5" />
                Start Learning Today
              </span>
            </div>
            <h1 className="text-5xl sm:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Transform Your Career
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Choose from our expert-curated courses and join a community of passionate learners
            </p>
          </motion.div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {courses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="p-6 relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${getCategoryColor(course.category)}`}>
                        <BookOpen className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex items-center space-x-1 bg-indigo-50 px-3 py-1 rounded-full">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-medium text-gray-700">4.8</span>
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                      {course.title}
                    </h2>
                    <p className="text-gray-600 mb-6 min-h-[80px]">{course.description}</p>
                    <div className="flex items-center justify-between mb-6">
                      <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        ${course.price.toFixed(2)}
                      </div>
                      <div className="text-sm font-medium px-3 py-1 rounded-full bg-emerald-100 text-emerald-700">
                        {isEnrolled(course.id) ? "Enrolled ✓" : "8 Weeks • Beginner"}
                      </div>
                    </div>
                    <CourseButton course={course} />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
};

// Helper function for category colors
const getCategoryColor = (category: string) => {
  switch (category) {
    case 'technology':
      return 'from-blue-500 to-indigo-500';
    case 'business':
      return 'from-purple-500 to-fuchsia-500';
    case 'design':
      return 'from-pink-500 to-rose-500';
    default:
      return 'from-indigo-500 to-purple-500';
  }
};

export default CoursesPage;