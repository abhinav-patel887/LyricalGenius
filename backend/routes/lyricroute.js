import express from 'express';
import  SongTitles  from '../schema/titleschema.js';
const lyricroute = express.Router();
lyricroute.get('/titles', async (req, res) => {
  try {
    const titles = await SongTitles.find();
    res.json(titles);
  } catch (error) {
    res.json({ message: error });
  }
});
lyricroute.post('/add-title', async (req, res) => {
  const newTitle = new SongTitles({ title: req.body.title });
  try {
    const savedTitle = await newTitle.save();
    res.json(savedTitle);
  } catch (error) {
    res.json({ message: error });
  }
});
export default lyricroute;