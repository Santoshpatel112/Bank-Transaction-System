import expres from 'express';
const app=expres();

const PORT=process.env.PORT ||3000;

app.get('/',(req,res)=>{
    res.send("MahaShivratri Ki Hardik Subhkamanye | 🌸Har Har Mahadev🌸");
})

app.listen(PORT,()=>{
    console.log(`Server is Listning on ${PORT}`);
})