const db=require("../db")

const addTask=(req,res)=>{
    let _id=res.locals.userId
    let {title,priority}=req.body
    if(!(typeof title==="string"&&title.length>0)){
        res.status(400).send({
            status:false
        })
    }
    if(!(typeof priority==="number"&&(priority>=0&&priority<=9))){
        priority=undefined
    }
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

const deleteTask = async(req, res) => {
    let _id = res.locals.userId;
    let { taskId } = req.body;
    console.log(taskId);
    let validTask = await db.users
        .find({
            _id,
            tasks: {
                $elemMatch: { _id: taskId },
            },
        })
        .then((data) => {
            console.log(data);
            if (data.length > 0) {
                return true;
            } else {
                throw "err";
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({
                status: false,
            });
            return false;
        });

    validTask&&db.users
        .findOneAndUpdate(
            { _id },
            {
                $pull: {
                    tasks: {
                        _id: taskId,
                    },
                },
                $inc: { deleteCount: 1 },
            }
        )
        .then((data) => {
            console.log(data);
            if (data) {
                res.status(200).send({
                    status: true,
                    // data
                });
            } else {
                res.status(400).send({
                    status: false,
                    // data
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({
                status: false,
            });
        });
};

const listTask=(req,res)=>{
    db.users.find({
        _id:res.locals.userId
    })
    .then(data=>{
        if(data.length===0){
            res.status(400).send({
                status:false
            })
        }
        let statusCode = {
            complete: "✓",
            cancel: "✗",
            pending: "-",
        };
        res.status(200).send({
            status:true,
            data:data[0].tasks.map(elt=>({
                id:elt.id,
                title:elt.title,
                status:elt.status,
                priority:elt.priority||null,
                formatted:`${elt.title} (${statusCode[elt.status]||""}) [${elt.priority||""}]`
            }))
        })
    })
    .catch(err=>[
        res.status(500).send({
            status:false
        })
    ])
}

const summarizeTask=(req,res)=>{
    db.users.find({
        _id:res.locals.userId
    })
    .then(data=>{
        let taskData={
            pending:[],
            cancel:[],
            complete:[]
        }
        data[0].tasks.forEach(elt=>{
            let {status}=elt;
            if(status==="pending"||status==="cancel"||status==="complete"){
                taskData[status].push(elt)
            }
        })
        res.status(200).send({
            status: true,
            data: {
                details: taskData,
                count: {
                    pending: taskData.pending.length,
                    cancel: taskData.cancel.length,
                    complete: taskData.complete.length,
                    delete:data[0].deleteCount||0
                },
            },
        });
    })
    .catch(err=>{
        res.status(500).send({
            status:false
        })
    })
}

module.exports={
    addTask,
    listTask,
    updateTask,
    deleteTask,
    summarizeTask
}