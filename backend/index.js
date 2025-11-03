import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post('/recommend', async (req, res) => {
    const { ingredients } = req.body;
    try {
        const response = await axios.post('http://127.0.0.1:5000/recommend', { ingredients });
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: 'AI service not responding' });
    }
});

app.listen(3001, () => console.log('Backend running on http://localhost:3001'));
