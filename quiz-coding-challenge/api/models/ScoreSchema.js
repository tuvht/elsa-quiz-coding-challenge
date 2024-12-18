import { Schema, model } from 'mongoose';

const ScoreSchema = Schema(
    {
        quiz: {
            type: Schema.Types.ObjectId,
            ref: 'Quiz'
        },
        sessionID: {
            type: String,
            required: [true, 'Session ID is required']
        },
        score: {
            type: Number,
            required: false,
            default: 0
        }
    },
    {
        collection: 'scores',
        timestamps: true
    }
);

export default model('Score', ScoreSchema);
