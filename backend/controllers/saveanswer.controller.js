import { Answers } from "../schema/answerschema.js";

const saveanswer=async(req,res)=>{
    const {title,lyrics} = req.body;
    const checktitle = await Answers.findOne({title: title});
    if(checktitle!=null){
        await Answers.findOneAndUpdate({title:title},{lyrics:lyrics});
        return res.json({message:"Title already exists, lyrics updated"});
    } else{
        const newAnswer = new Answers({
            title:req.body.title,
            lyrics:req.body.lyrics
        });
        try{
            const savedAnswer = await newAnswer.save();
            res.json(savedAnswer);
        }catch(error){
            res.json({message:error});
        }
    }
}
export default saveanswer;