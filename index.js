const express = require('express');
const app = express();

const cors = require('cors');
const axios = require('axios');
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use('*', (req, res) => {
    const url = req.params[0].replace(/^\//, '');

    if (!url) {
        return res.send('url을 입력하세요. ex) /https://example.com/');
    }
    axios[req.method.toLowerCase()](url)
    .then(({data}) => {
        res.type(typeof data === 'object' ? "json" : "html");
        res.send(data);
    })
    .catch(err => {
        res.send(err.message);
    })
});

app.listen(PORT, () => {
    console.log(`App listens port ${PORT}`)
})