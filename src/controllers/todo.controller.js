const db=require("../db")

const addTask=(req,res)=>{
    let _id=res.locals.userId
    let {title,priority}=req.body
    db.users.findOneAndUpdate(
        { _id },
        {
            $push: {
                tasks: {
                    title,
                    priority,
                    status:"pending"
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

const updateTask = (req, res) => {
    let _id = res.locals.userId;
    let type=req.params.updateType
    if(!(type==="complete"||type==="pending"||type==="cancel")){
        res.status(404).send({
            status:false
        })
        return
    }
    let { taskId } = req.body;
    console.log(taskId)
    db.users
        .findOneAndUpdate(
            { _id, "tasks._id": taskId },
            {
                "$set": {
                    "tasks.$.status": type,
                },
            }
        )
        .then((data) => {
            // console.log(data);
            if (data) {
                res.status(200).send({
                    status: true,
                    // data
                });
                
            }
            else{
                res.status(400).send({
                    status: false,
                    // data
                });

            }
            
        })
        .catch(err=>{
            console.log(err)
            res.status(500).send({
                status:false
            })
        });
};

const listTask=(req,res)=>{
    db.users.find({
        _id:res.locals.userId
    })
    .then(data=>{
        let statusCode = {
            complete: "✓",
            cancel: "✗",
            pending: "-",
            undefined: "-",
        };
        res.status(200).send({
            status:true,
            data:data[0].tasks.map(elt=>({
                id:elt.id,
                title:elt.title,
                status:elt.status,
                formatted:`${elt.title} (${statusCode[elt.status]}) [${elt.priority?elt.priority:""}]`
            }))
        })
    })
}

module.exports={
    addTask,
    listTask,
    updateTask
}