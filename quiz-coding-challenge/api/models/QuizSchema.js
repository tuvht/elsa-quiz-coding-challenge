import { Schema, model } from 'mongoose';

const QuizSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Quiz name is required'],
            trim: true
        },
        players: {
            type: Array
        },
    },
    {
        collection: 'quizes',
        timestamps: true
    }
);

export default model('Quiz', QuizSchema);
