const db=require("../db")

const handler = (req, res) => {
    res.send("hello");
};

const userDetail=(req,res)=>{
    let {userId}=res.locals
    db.users.find({
        id:userId
    })
    .then(data=>{
        if(data.length>0){
            res.status(200).send({
                status:true,
                data:{
                    name:data[0].name
                }
            })
        }
    })
}

const frontendRedirect = (req, res)=>{
    res.status(200).send("<h1 style='font-family:sans-serif'>Sorry, Frontend Work under progress! Will be ready soon!</h1>")
};



module.exports = {
    handler,
    userDetail,
    frontendRedirect
};
