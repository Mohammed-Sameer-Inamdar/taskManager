import mongoose from "mongoose";
const Schema = mongoose.Schema;
const Task = Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    status: {
        type: Boolean,
        default: false
    },
    endDate: {
        type: Schema.Types.Date
    },
    position: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        required: true
    }
},
    {
        timestamps: {
            createdAt: 'taskCreated',
            updated: 'taskUpdated'
        },
    },

);
export default mongoose.model('tasks', Task);