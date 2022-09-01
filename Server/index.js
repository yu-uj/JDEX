const express = require('express');

const port = 5000;
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!')
});


app.listen(port, () => {
    console.log(`Server is on ${port}...`);
})

//git clone -b server --single-branch 
//git branch --server
//git remote -v -- origin
//git add .
//git commit -m "dasdasd"
//git push origin server
//git에서 풀리퀘스트 누르기