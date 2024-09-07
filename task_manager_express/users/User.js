import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = Schema(
    {
        userName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: {
            createdAt: 'userCreated',
            updatedAt: 'userUpdated'
        }
    },
    {
        toJSON: {
            virtuals: true,
            transform(doc, ret) {
                delete ret.__v
                ret.id = ret._id
                delete ret._id
            }
        }
    }
)

export default mongoose.model('users', userSchema);