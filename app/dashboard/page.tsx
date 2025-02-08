'use client'
import UserDashboard from "@/components/userDashboard";
import axios from "axios";
import { useEffect, useState } from "react";

export default function dashboard(){
const [res,setRes]=useState<any>(null);
    useEffect(() => {
        const fetchChapters = async () => {
          try {
            const response = await axios.get(`/api/dashboard`);
            console.log('this is data',response.data);
            setRes(response.data);
          } catch (err) {
          console.error(err);
          } 
        };
        fetchChapters();
      }, []);
    return (
        <div>
        {res &&  <UserDashboard user={res.user} enrollments={res.courseProgress} achievements={res.achievements} quizAttempts={res.recentQuizAttempts} />
      }
         </div>
    );
}