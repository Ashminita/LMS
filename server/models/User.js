import express from 'express'
import mongoose from 'mongoose'

const userSchema=new mongoose.Schema(
    {
        _id:{
            type:String,
            required:true
        },
        name:{

        },
        email:{

        },
        imageUrl:{

        },
        enrolledCourses:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Course'
            }
        ],
    },{timestamps:true}
);

const User=mongoose.model('User',userSchema);

export default User