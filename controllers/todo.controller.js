const db=require("../db")

const addTask=(req,res)=>{
    let id=res.locals.userId
    let {title,priority}=req.body
    db.users.findOneAndUpdate(
        { id },
        {
            $push: {
                tasks: {
                    title,
                    priority,
                    completed: false,
                    cancelled: false,
                },
            },
        }
    )
    .then(data=>{
        res.status(200).send({
            status:true,
            // data
        })
    })
}

module.exports={
    addTask
}