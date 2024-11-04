import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import jobRoutes from './routes/jobRoutes';

const app = express();
const PORT = process.env.PORT || 3000;



app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views')); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));


app.get('/jobPost', (req, res) => {
    res.render('jobPost');
});

app.use('/', jobRoutes); 

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
