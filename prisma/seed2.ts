// Function to execute code using Judge0 API
async function executeCode(sourceCode, languageId) {
    const JUDGE0_API = 'https://judge0-ce.p.rapidapi.com';
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '2ee3a55a0cmshc3e0ffd722788eep18d130jsna2f63e06e300',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      },
      body: JSON.stringify({
        source_code: sourceCode,
        language_id: languageId,
        stdin: ''
      })
    };
  
    // Submit code for execution
    const submission = await fetch(`${JUDGE0_API}/submissions`, options);
    const { token } = await submission.json();
  
    // Poll for results
    const getOptions = {
      method: 'GET',
      headers: options.headers
    };
  
    while (true) {
      const response = await fetch(`${JUDGE0_API}/submissions/${token}`, getOptions);
      const result = await response.json();
      
      if (result.status.id > 2) { // Status > 2 means processing is complete
        return {
          output: result.stdout || result.stderr,
          error: result.stderr,
          executionTime: result.time,
          memory: result.memory
        };
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000)); // Poll every second
    }
  }
  async function hi() {
    const editorContent ="<!DOCTYPE html><html><head><title>Page Title</title></head><body><h1>This is a Heading</h1><p>This is a paragraph.</p></body></html>";
    const output = await executeCode(editorContent, 54); // 54 is for HTML
    document.querySelector('#output').textContent = output.output;
  }
  hi()
