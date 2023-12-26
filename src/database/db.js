import mongoose from 'mongoose';

const connectDatabase = () => {
    mongoose.connect("mongodb+srv://root:root@gdev.rbyghrq.mongodb.net/?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log("MongoDB Atlas conectado!")).catch((error) => console.log(error));
}

export default connectDatabase;
