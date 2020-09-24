const mongoose = require('mongoose');
const Student = require('../Model/Student.js');

exports.insert_student =(req,res,next)=>{

    console.log("req.body.type", req.body.type);

        console.log("insrt function");
        var student=new Student({
            _id 		          :new mongoose.Types.ObjectId(),
            Name                 :req.body.Name,
            mail                 :req.body.mail,
            message              :req.body.message
           
            });
            
            student
            .save()
            .then((data)=>{
                res.status(200).json({
                    "message": "student data inserted Successfully",
                });
            })
            .catch((error)=>{
                res.status(500).json({
                    "message" : "Some error occured while inserting student",
                    "error"   : error
                })
            });
        }