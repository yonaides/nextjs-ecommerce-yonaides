import mongoose from "mongoose";

const connectDB = () => {
  if (mongoose.connections[0].readyState) {
    return;
  }

  mongoose.connect(process.env.MONGODB_URL, {    
    useUnifiedTopology: true,
  },err =>{
      if(err) throw err;
      console.log('connected ');
  });
};

export default connectDB;
