import { Router } from 'express';
import  generatelyric  from '../controllers/generatelyric.controller.js';

const lyricllm = Router();

lyricllm.get("/generate-lyric", generatelyric);

export default lyricllm;