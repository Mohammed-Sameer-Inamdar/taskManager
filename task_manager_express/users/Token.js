import mongoose from "mongoose";

const Schema = mongoose.Schema;
const Token = Schema(
    {
        tokenName: {
            type: String,
            default: 'session'
        },
        token: {
            type: String,
            required: true
        },
        tokenUser: {
            type: Schema.ObjectId,
            required: true
        }
    },
    {
        timestamps: {
            createdAt: 'tokenCreated',
            updatedAt: 'tokenUpdated'
        }
    }
);
export default mongoose.model('token', Token);
