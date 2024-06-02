import express from "express";
import { PORT, MONGODBurl} from "./config.js";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());


app.use('/books', booksRoute);

mongoose.connect(MONGODBurl).then(() => {
    console.log("App connected to database")

    app.listen(PORT, () => {
        console.log(`you are listening to port: ${PORT}`)
    });

})
.catch((error) => {
    console.log(error);
});