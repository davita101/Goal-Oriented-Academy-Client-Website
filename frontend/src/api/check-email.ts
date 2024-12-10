const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 5173;

// Parse JSON bodies
app.use(express.json());

const uri = 'mongodb+srv://root:XsV9BuaCUYllcE7R@cluster0.ydffj.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);

app.post('/api/check-email', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    await client.connect();
    const db = client.db('gaol-oriented-academy-auth');
    const usersCollection = db.collection('users');

    const user = await usersCollection.findOne({ email });

    if (user) {
      return res.status(200).json({ message: 'Email exists' }); // If the email exists
    } else {
      return res.status(404).json({ message: 'Email not found' }); // If the email doesn't exist
    }
  } catch (error) {
    console.error('Error checking email:', error);
    return res.status(500).json({ message: 'Server error' });
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
