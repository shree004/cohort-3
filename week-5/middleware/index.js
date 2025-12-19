const express = require('express');
const app = express();
const port = 3000;

let requestCount = 0;
// Middleware to parse JSON bodies
app.use((req, res, next) => {
    requestCount++;
    next();
});

app.use((req, res, next) => {
    const method = req.method;
    const url = req.url;
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${method} ${url}`);
    next();
});
app.get('/', (_, res) => {
    res.send('Hello World!' + ` Total requests: ${requestCount}`);
});

app.post('/data', (_, res) => {
    res.send('Data received!');
});

app.put('/update', (_, res) => {
    res.send('Update successful!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
}
);