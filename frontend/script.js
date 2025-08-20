// async function summarizeNotes() {
//   const text = document.getElementById('summarizeInput').value;

//   try {
//     // const response = await fetch('https://note-genius-nine.vercel.app/api/ai/summarize', {
//       const response = await fetch('https://note-genius-nine.vercel.app/api/ai/summarize', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ text })
//     });

//     const data = await response.json();
//     document.getElementById('summaryOutput').innerText = data.summary || 'No summary.';
//   } catch (err) {
//     document.getElementById('summaryOutput').innerText = `❌ ${err.message}`;
//   }
// }

// async function expandBullets() {
//   const bullets = document.getElementById('expandInput').value;

//   try {
//     const response = await fetch('https://note-genius-nine.vercel.app/api/ai/expand', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ bullets })
//     });

//     const data = await response.json();
//     document.getElementById('expandOutput').innerText = data.expansion || 'No expansion.';
//   } catch (err) {
//     document.getElementById('expandOutput').innerText = `❌ ${err.message}`;
//   }
// }

// async function generateQuiz() {
//   const text = document.getElementById('quizInput').value;

//   try {
//     const response = await fetch('https://note-genius-nine.vercel.app/api/ai/quiz', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ text })
//     });

//     const data = await response.json();
//     document.getElementById('quizOutput').innerText = data.quiz || 'No quiz.';
//   } catch (err) {
//     document.getElementById('quizOutput').innerText = `❌ ${err.message}`;
//   }
// }

// async function translateText() {
//   const text = document.getElementById('translateInput').value;
//   const targetLanguage = document.getElementById('targetLanguage').value;

//   try {
//     const response = await fetch('https://note-genius-nine.vercel.app/api/ai/translate', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ text, targetLanguage })
//     });

//     const data = await response.json();
//     document.getElementById('translateOutput').innerText = data.translation || 'No translation.';
//   } catch (err) {
//     document.getElementById('translateOutput').innerText = `❌ ${err.message}`;
//   }
// }


























// ✅ Common helper function
async function safeFetch(url, body) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const raw = await response.text(); // pehle hamesha raw text lo
  try {
    return JSON.parse(raw); // JSON parse koshish karo
  } catch (e) {
    throw new Error(`Not JSON. Status: ${response.status}. Body: ${raw}`);
  }
}

// ✅ Ab aapke functions

async function summarizeNotes() {
  const text = document.getElementById('summarizeInput').value;

  try {
    const data = await safeFetch('https://note-genius-nine.vercel.app/api/ai/summarize', { text });
    document.getElementById('summaryOutput').innerText = data.summary || 'No summary.';
  } catch (err) {
    document.getElementById('summaryOutput').innerText = `❌ ${err.message}`;
  }
}

async function expandBullets() {
  const bullets = document.getElementById('expandInput').value;

  try {
    const data = await safeFetch('https://note-genius-nine.vercel.app/api/ai/expand', { bullets });
    document.getElementById('expandOutput').innerText = data.expansion || 'No expansion.';
  } catch (err) {
    document.getElementById('expandOutput').innerText = `❌ ${err.message}`;
  }
}

async function generateQuiz() {
  const text = document.getElementById('quizInput').value;

  try {
    const data = await safeFetch('https://note-genius-nine.vercel.app/api/ai/quiz', { text });
    document.getElementById('quizOutput').innerText = data.quiz || 'No quiz.';
  } catch (err) {
    document.getElementById('quizOutput').innerText = `❌ ${err.message}`;
  }
}

async function translateText() {
  const text = document.getElementById('translateInput').value;
  const targetLanguage = document.getElementById('targetLanguage').value;

  try {
    const data = await safeFetch('https://note-genius-nine.vercel.app/api/ai/translate', { text, targetLanguage });
    document.getElementById('translateOutput').innerText = data.translation || 'No translation.';
  } catch (err) {
    document.getElementById('translateOutput').innerText = `❌ ${err.message}`;
  }
}
