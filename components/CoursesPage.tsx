"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, BookOpen, GraduationCap, Star } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";

interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
}

interface Enrollment {
  courseId: number;
  userId: number;
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
      toast.error("Please sign in first!");

    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
          />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="text-center">
            <p className="text-destructive text-lg mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        </div>
      </div>
    );
  }

  const CourseButton = ({ course }: { course: Course }) => {
    if (isEnrolled(course.id)) {
      return (
        <Link href={`/courses/${course.id}`}>
          <Button className="w-full" size="lg">
            Continue Learning
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      );
    }

    return (
      <Button
        variant="default"
        size="lg"
        className="w-full"
        onClick={() => handleEnroll(course.id)}
      >
        Enroll Now
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" />

      {/* Header Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-6xl font-bold mb-6">
              Explore Our
              <span className="text-primary"> Expert Courses</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Choose from our wide range of professional courses and start your learning journey today.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {courses.map((course) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-card rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <GraduationCap className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-medium">4.8</span>
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold text-card-foreground mb-2">
                      {course.title}
                    </h2>
                    <p className="text-muted-foreground mb-4">{course.description}</p>
                    <div className="flex items-center justify-between mb-6">
                      <div className="text-lg font-bold text-primary">
                        ${course.price.toFixed(2)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {isEnrolled(course.id) ? "✓ Enrolled" : "8 weeks"}
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

export default CoursesPage;