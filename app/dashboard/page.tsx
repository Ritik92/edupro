'use client'
import UserDashboard from "@/components/userDashboard";
import axios from "axios";
import { useEffect, useState } from "react";

export default function dashboard(){
let res={
  "user": {
    "id": 1,
    "name": "Sarah Johnson",
    "email": "sarah.j@example.com",
    "level": 15,
    "experiencePoints": 2850,
    "totalCoins": 1240,
    "streakDays": 23,
    "preferredLang": "en"
  },
  "enrollments": [
    {
      "id": 1,
      "course": {
        "id": 1,
        "title": "Introduction to Python",
        "description": "Learn the fundamentals of Python programming language."
      },
      "progress": 85,
      "enrolledAt": "2024-01-15T08:30:00Z"
    },
    {
      "id": 2,
      "course": {
        "id": 2,
        "title": "Web Development with HTML & CSS",
        "description": "Build your first website using HTML and CSS."
      },
      "progress": 45,
      "enrolledAt": "2024-01-28T14:20:00Z"
    },
    {
      "id": 3,
      "course": {
        "id": 7,
        "title": "Mobile App Development with Flutter",
        "description": "Build beautiful native mobile applications using Flutter."
      },
      "progress": 12,
      "enrolledAt": "2024-02-05T10:15:00Z"
    }
  ],
  "achievements": [
    {
      "id": 1,
      "achievement": {
        "id": 1,
        "title": "Quick Learner",
        "description": "Complete your first course chapter in under 24 hours",
        "badge": "quick-learner",
        "xpReward": 100
      },
      "unlockedAt": "2024-01-16T09:45:00Z"
    },
    {
      "id": 2,
      "achievement": {
        "id": 2,
        "title": "Code Warrior",
        "description": "Submit 10 successful code exercises",
        "badge": "code-warrior",
        "xpReward": 250
      },
      "unlockedAt": "2024-01-25T16:30:00Z"
    },
    {
      "id": 3,
      "achievement": {
        "id": 3,
        "title": "Streak Master",
        "description": "Maintain a 20-day learning streak",
        "badge": "streak-master",
        "xpReward": 500
      },
      "unlockedAt": "2024-02-07T11:20:00Z"
    }
  ],
  "quizAttempts": [
    {
      "id": 1,
      "quizId": 1,
      "score": 90,
      "passed": true,
      "attemptedAt": "2024-01-20T15:30:00Z",
      "quiz": {
        "title": "Python Basics Quiz",
        "chapter": {
          "title": "Python Basics",
          "course": {
            "title": "Introduction to Python"
          }
        }
      }
    },
    {
      "id": 2,
      "quizId": 2,
      "score": 85,
      "passed": true,
      "attemptedAt": "2024-02-01T11:45:00Z",
      "quiz": {
        "title": "HTML Fundamentals Quiz",
        "chapter": {
          "title": "HTML & CSS Fundamentals",
          "course": {
            "title": "Web Development with HTML & CSS"
          }
        }
      }
    }
  ]
}
    return (
        <div>
        {res &&  <UserDashboard user={res.user} enrollments={res.enrollments} achievements={res.achievements} quizAttempts={res.quizAttempts} />
      }
         </div>
    );
}