// components/CodeExecutor.tsx
'use client';
import { useState } from 'react';

const CodeExecutor = () => {
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const executeCode = async (sourceCode: string, languageId: number) => {
    const JUDGE0_API = 'https://judge0-ce.p.rapidapi.com';
    const headers = {
      'content-type': 'application/json',
      'X-RapidAPI-Key': '2ee3a55a0cmshc3e0ffd722788eep18d130jsna2f63e06e300',
      'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
    };

    try {
      // First, create a submission
      const createResponse = await fetch(`${JUDGE0_API}/submissions?base64_encoded=false&wait=false`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          source_code: sourceCode,
          language_id: languageId,
          stdin: '',
          redirect_stderr_to_stdout: true
        })
      });

      if (!createResponse.ok) {
        throw new Error(`Submission failed: ${createResponse.statusText}`);
      }

      const { token } = await createResponse.json();
      
      if (!token) {
        throw new Error('No token received from submission');
      }

      console.log('Submission token:', token);

      // Wait a bit before checking the result
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Get the result
      const getResult = async () => {
        const resultResponse = await fetch(
          `${JUDGE0_API}/submissions/${token}?base64_encoded=false&fields=stdout,stderr,status_id,time,memory`, 
          {
            method: 'GET',
            headers
          }
        );

        if (!resultResponse.ok) {
          throw new Error(`Failed to get results: ${resultResponse.statusText}`);
        }

        return await resultResponse.json();
      };

      // Poll for results with exponential backoff
      let attempts = 0;
      const maxAttempts = 5;
      let waitTime = 1000;

      while (attempts < maxAttempts) {
        const result = await getResult();
        console.log('Poll result:', result);

        if (result.status_id === 1 || result.status_id === 2) {
          // Still processing, wait and try again
          await new Promise(resolve => setTimeout(resolve, waitTime));
          waitTime *= 2; // Exponential backoff
          attempts++;
          continue;
        }

        return {
          output: result.stdout || 'No output',
          error: result.stderr,
          executionTime: result.time,
          memory: result.memory
        };
      }

      throw new Error('Execution timed out');

    } catch (error) {
      console.error('Error in executeCode:', error);
      throw error;
    }
  };

  const handleExecute = async () => {
    setIsLoading(true);
    setOutput('Executing code...');
    
    // Test with a simple Python code instead of HTML
    const sampleCode = `print("Hello, World!")`;

    try {
      const result = await executeCode(sampleCode, 71); // 71 is Python's language ID
      setOutput(
        `Output: ${result.output}\n` +
        `Error: ${result.error || 'None'}\n` +
        `Execution Time: ${result.executionTime || 'N/A'}\n` +
        `Memory Used: ${result.memory || 'N/A'}`
      );
    } catch (error: any) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <button 
        onClick={handleExecute}
        disabled={isLoading}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {isLoading ? 'Executing...' : 'Execute Code'}
      </button>
      <pre className="mt-4 p-4 border rounded bg-gray-50 whitespace-pre-wrap">
        {output}
      </pre>
    </div>
  );
};

export default CodeExecutor;