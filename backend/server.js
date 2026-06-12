import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';

let app = express();
let PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);

app.listen(PORT, () => {
    console.log(`Server running smoothly on http://localhost:${PORT}`);
});
