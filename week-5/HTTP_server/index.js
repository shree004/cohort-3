const express = require('express');
const app = express();
const port = 3000;

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    if (b === 0) {
        return 'Error: Division by zero';
    }
    return a / b;
}

// app.get('/add', (req, res) => {
//     const a=req.query.a;
//     const b=req.query.b;
//     res.send(`Result: ${add(Number(a), Number(b))}`);
// });

app.get('/add/:a/:b', (req, res) => {
    const a=req.params.a;
    const b=req.params.b;
    res.send(`Result: ${add(Number(a), Number(b))}`);
});

app.get('/subtract', (req, res) => {
    const a=req.query.a;
    const b=req.query.b;
    res.send(`Result: ${subtract(Number(a), Number(b))}`);
});

app.get('/multiply', (req, res) => {
    const a=req.query.a;
    const b=req.query.b;
    res.send(`Result: ${multiply(Number(a), Number(b))}`);
});

app.get('/divide', (req, res) => {
    const a=req.query.a;
    const b=req.query.b;
    res.send(`Result: ${divide(Number(a), Number(b))}`);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});     

