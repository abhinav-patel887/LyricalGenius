import mongoose from 'mongoose';
const { Schema } = mongoose;

const answerschema = new Schema({
  title: String, 
  lyrics:[String]
});

export const Answers=mongoose.model('Answers',answerschema);