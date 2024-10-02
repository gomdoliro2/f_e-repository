import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const apiUrl = 'https://port-0-b-e-repository-m1qaons0275b16c0.sel4.cloudtype.app';

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/data', async (req, res) => {
    try {
        const response = await fetch(apiUrl); 
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json(); 
        res.json(data); 
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data from external API' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
