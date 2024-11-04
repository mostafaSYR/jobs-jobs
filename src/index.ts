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
/* app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Job Board</title>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
        </head>
        <body>
            <div class="container">
                <h1 class="mt-5">Welcome to the Job Board</h1>
                <nav class="nav nav-pills flex-column flex-sm-row mb-3">
                    <a class="flex-sm-fill text-sm-center nav-link" href="/jobs">View Job Listings</a>
                    <a class="flex-sm-fill text-sm-center nav-link" href="/jobPost">Post a Job</a>
                </nav>
            </div>
            <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.0.7/dist/umd/popper.min.js"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
        </body>
        </html>
    `);
}); */


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
