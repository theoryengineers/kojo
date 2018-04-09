import * as Express from 'express';

const app = Express();
const port = process.env.PORT || 1337;

app.use('/welcome', (req, res) => {
    res.send('hello world')
});

app.listen(port, () => console.log('Listening at ,', port));