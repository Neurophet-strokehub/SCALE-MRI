// index.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/authenticate', (req, res) => {
    const { password } = req.body;
    const correctPassword = 'ksin'; // 서버 측에서만 비밀번호를 확인합니다.

    if (password === correctPassword) {
        res.status(200).send('Authenticated');
    } else {
        res.status(401).send('Unauthorized');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
