'use client'
import React, { useState, useRef } from 'react';
import { Mic, Square } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

const VoiceNavigation = () => {
  const router = useRouter();
  const [isRecording, setIsRecording] = useState(false);
  const [processing, setProcessing] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/wav' });
        stream.getTracks().forEach(track => track.stop());
        await processAudioAndNavigate(audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      toast.success('Listening for navigation command...');
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast.error('Unable to access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const processAudioAndNavigate = async (audioBlob: Blob) => {
    setProcessing(true);
    const formData = new FormData();
    formData.append('audio', new File([audioBlob], 'command.wav', { type: 'audio/wav' }));

    try {
      const response = await fetch('/api/voice-navigation', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (data.route) {
        toast.success(`Navigating to: ${data.route}`);
        router.push(data.route);
      } else {
        toast.error('Could not understand navigation command');
      }
    } catch (error) {
      console.error('Error processing voice command:', error);
      toast.error('Failed to process voice command');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8">
      <AnimatePresence mode="wait">
        {!isRecording && !processing && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={startRecording}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-lg"
          >
            <Mic className="w-5 h-5" />
            <span>Voice Navigation</span>
          </motion.button>
        )}

        {isRecording && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={stopRecording}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow-lg"
          >
            <Square className="w-5 h-5" />
            <span>Stop</span>
          </motion.button>
        )}

        {processing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-full shadow-lg"
          >
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Processing...</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VoiceNavigation;