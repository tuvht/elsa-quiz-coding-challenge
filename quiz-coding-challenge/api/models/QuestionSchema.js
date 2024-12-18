import { Schema, model } from 'mongoose';

const QuestionSchema = Schema(
    {
        quiz: {
            type: Schema.Types.ObjectId,
            ref: 'Quiz'
        },
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true
        },
        answers: {
            type: Array,
            required: [true, 'Answers is required']
        },
        correctAnswer: {
            type: String,
            required: [true, 'Correct answer is required'],
            trim: true
        },
        score: {
            type: Number,
            required: [true, 'Score is required'],
        }
    },
    {
        collection: 'questions',
        timestamps: true
    }
);

export default model('Question', QuestionSchema);
