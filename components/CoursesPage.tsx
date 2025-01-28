'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRightIcon, BookOpenIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

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
  const [error, setError] = useState('');
  const { data: session, status } = useSession();

  // Fetch both courses and user enrollments
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesResponse, enrollmentsResponse] = await Promise.all([
          axios.get('/api/courses'),
          session ? axios.get('/api/enrollment') : Promise.resolve({ data: [] })
        ]);
        setCourses(coursesResponse.data);
        setEnrollments(enrollmentsResponse.data);
      } catch (err) {
        setError('Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session]);

  const isEnrolled = (courseId: number) => {
    return enrollments.some(enrollment => enrollment.courseId === courseId);
  };

  const handleEnroll = async (courseId: number) => {
    try {
      const response = await axios.post('/api/enrollment', { courseId });
      alert(`Successfully enrolled in course with ID: ${courseId}`);
      // Add the new enrollment to the state
      setEnrollments([...enrollments, { courseId, userId: response.data.userId }]);
      return response.data;
    } catch (error) {
      alert('Failed to enroll in course');
      console.error('Enrollment error:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );
  }

  const CourseButton = ({ course }: { course: Course }) => {
    if (isEnrolled(course.id)) {
      return (
        <Link href={`/courses/${course.id}`}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300"
          >
            <span>View Course</span>
            <BookOpenIcon size={20} />
          </motion.button>
        </Link>
      );
    }

    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleEnroll(course.id)}
        className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
      >
        <span>Enroll Now</span>
        <ArrowRightIcon size={20} />
      </motion.button>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600"
      >
        All Courses
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {courses.map((course) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold text-purple-800 mb-2">
                  {course.title}
                </h2>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <p className="text-lg font-semibold text-blue-600 mb-4">
                  ${course.price.toFixed(2)}
                </p>
                <CourseButton course={course} />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CoursesPage;