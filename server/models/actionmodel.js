import mongoose from 'mongoose';

const actionSchema = mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: true
    },
    projectId: String
}, { timestamps: true }, );

export default mongoose.model('Action', actionSchema);