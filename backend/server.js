const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Client } = require('pg');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Add your Google Generative AI API key here
const apiKey = 'AIzaSyCg_juynG4u8vlgAbDg7RuQ8kMo5PG-iJw'; // Replace with your actual API key
const modelName = "gemini-1.5-flash";

// Configuration for generating responses
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
};

// PostgreSQL client setup
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'NewDB',
  password: '123',
  port: 5432,
});

// Function to fetch dataset from PostgreSQL
const fetchDataset = async () => {
  try {
    await client.connect();
    const res = await client.query('SELECT * FROM your_table_name'); // Adjust your table name
    await client.end();
    return res.rows; // Return the rows retrieved
  } catch (error) {
    console.error('Error fetching dataset:', error);
    throw error;
  }
};

// Function to read CSV file and return data
const readCSV = async (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        resolve(results);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};

// Function to call Google Generative AI to generate SQL queries
const generateSQLQuery = async (prompt) => {
  const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: prompt,
      temperature: generationConfig.temperature,
      topP: generationConfig.topP,
      topK: generationConfig.topK,
      maxOutputTokens: generationConfig.maxOutputTokens,
    }),
  });

  if (!response.ok) {
    throw new Error(`Error generating SQL query: ${response.statusText}`);
  }

  const data = await response.json();
  return data.completions[0].text; // Assuming completions returns an array
};

// Endpoint for generating SQL queries using Google Generative AI
app.post('/generate-query', async (req, res) => {
  const { prompt } = req.body;

  try {
    const sqlQuery = await generateSQLQuery(prompt);

    if (!sqlQuery) {
      throw new Error("The generated query is not valid.");
    }

    console.log('Successfully generated SQL query:', sqlQuery);
    res.json({ query: sqlQuery });
  } catch (error) {
    console.error('Error in /generate-query:', error);
    res.status(500).json({ error: `Error generating SQL query: ${error.message}` });
  }
});

// New endpoint for fetching data and generating SQL queries from CSV
app.get('/test-dataset', async (req, res) => {
  try {
    const dataset = await fetchDataset();
    const csvData = await readCSV('../Postgres/Long_Preparation_Time.csv'); // Adjust to your CSV file path
    const results = [];

    for (const item of dataset) {
      const prompt = `Generate an SQL query for: ${item.description}`; // Adjust based on your data structure

      const generatedQuery = await generateSQLQuery(prompt);
      results.push({ prompt, generatedQuery });
    }

    res.json(results);
  } catch (error) {
    console.error('Error testing dataset:', error);
    res.status(500).json({ error: `Error testing dataset: ${error.message}` });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
    