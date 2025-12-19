const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(cors());

//frontend in same origin
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

app.post('/data', (req, res) => {
    const a= parseInt(req.body.a);
    const b= parseInt(req.body.b);

    res.json({ sum: a + b } );
}
);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});