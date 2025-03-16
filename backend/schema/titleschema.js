import mongoose from 'mongoose';
const { Schema } = mongoose;

const titleschema = new Schema({
  title: String
});

const SongTitles = mongoose.model('SongTitles', titleschema);
export default SongTitles;