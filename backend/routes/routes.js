const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Session = require('../models/models'); // ✅ Correct file name

require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

async function generateContent(prompt) {
  const result = await model.generateContent(prompt);
  return result.response.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
}

// Summarize
router.post('/summarize', async (req, res) => {
  const { text } = req.body;
  const prompt = `Summarize the following text:\n\n${text}`;
  try {
    const summary = await generateContent(prompt);
    await Session.create({ type: 'summarize', input: text, output: summary });
    res.json({ summary });
  } catch (err) {
    res.status(500).json({ error: 'Failed to summarize text.' });
  }
});

// Expand
router.post('/expand', async (req, res) => {
  const { bullets } = req.body;
  const prompt = `Expand the following bullet points:\n\n${bullets}`;
  try {
    const expansion = await generateContent(prompt);
    await Session.create({ type: 'expand', input: bullets, output: expansion });
    res.json({ expansion });
  } catch (err) {
    res.status(500).json({ error: 'Failed to expand bullet points.' });
  }
});

// Quiz
router.post('/quiz', async (req, res) => {
  const { text } = req.body;
  const prompt = `Generate 5 quiz questions based on:\n\n${text}`;
  try {
    const quiz = await generateContent(prompt);
    await Session.create({ type: 'quiz', input: text, output: quiz });
    res.json({ quiz });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate quiz questions.' });
  }
});

// Translate
router.post('/translate', async (req, res) => {
  const { text, targetLanguage } = req.body;
  const prompt = `Translate the following to ${targetLanguage}:\n\n${text}`;
  try {
    const translation = await generateContent(prompt);
    await Session.create({ type: 'translate', input: text, output: translation });
    res.json({ translation });
  } catch (err) {
    res.status(500).json({ error: 'Failed to translate text.' });
  }
});

module.exports = router;
