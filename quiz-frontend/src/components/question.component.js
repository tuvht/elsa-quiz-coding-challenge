// Import Modules
import React,
{
    useState,
    useEffect,
    useLayoutEffect,
    useRef
} from 'react';
import axios from 'axios';
import { connect, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { setBreadcrumb, clearBreadcrumb } from '../actions/breadcrumbs.action';
import socket from '../utils/socket.util';

// Question Component
const Question = () => {
    const { id } = useParams();
    const userSession = useRef(sessionStorage.getItem('userSession') || null);
    const [question, setQuestion] = useState([]);
    const [currentScore, setCurrentScore] = useState(0);
    // const [currentUsers, setCurrentUsers] = useState(0);
    const [leaderboard, setLeaderboard] = useState([]);
    const dispatch = useDispatch();
    useLayoutEffect(() => {
        dispatch(setBreadcrumb({
            title: 'Home',
            breadcrumbItems: [
                {
                    label: 'Quiz',
                    haslink: true,
                    path: '/'
                },
            ]
        }));
        return () => {
            dispatch(clearBreadcrumb());
        };
    }, [dispatch]);

    useEffect(() => {
        socket.connect();
        let currentUserSession = userSession.current;
        axios.get(
            process.env.REACT_APP_API_URL + '/question', {
            params: {
                    quiz: id,
                    userSession: currentUserSession
            }
        }
        ).then(res => {
            if (res.status === 200) {
                const { sessionID, data } = res.data;
                setQuestion(data);
                if (!currentUserSession) {
                    sessionStorage.setItem('userSession', sessionID);
                    currentUserSession = sessionID;
                }

                socket.emit('addUser', { quizID: id, userID: currentUserSession });
                socket.emit('sendQuizUsers');
                socket.emit('updateLeaderboard', { quizID: id, userID: userSession.current, score: 0 });
            } else {
                console.log(res.msg);
            }
        }).catch(err => console.log(err.response.data.msg));
        // socket.on('getQuizUsers', (userCount) => setCurrentUsers(userCount));
        socket.on('getLeaderboard', quizUsers => {
            getLeaderboard(quizUsers);
        });
    }, [id]);

    const handleSubmitAnswer = (e) => {
        const correctAnswer = e.target.value;
        const question = e.target.dataset.question;
        axios({
            url: process.env.REACT_APP_API_URL + '/question/validate',
            method: 'post',
            data: {
                question,
                correctAnswer,
                quiz: id,
                sessionID: userSession.current
            }
            
        }
        ).then(res => {
            if (res.status === 200) {
                const { score } = res.data;
                setCurrentScore(score);
                socket.emit('updateScore', { quizID: id, userID: userSession.current, score });
                socket.emit('updateLeaderboard', { quizID: id, userID: userSession.current, score });
            } else {
                console.log(res.msg);
            }
        }).catch(err => console.log(err.response.data.msg));
    }

    const getLeaderboard = (quizUsers) => {
        setLeaderboard(quizUsers);
    }

    // Return user form
    return (
        <div>
            <div className="current-score">Current score: {currentScore}</div>
            <div className="leaderboard">
                <h3>Leaderboard</h3>
                {leaderboard.map((board, boardIdx) => {
                    return (<div key={boardIdx}>
                        <p>
                            {boardIdx + 1}. {board.userId} {board.userId === userSession.current ? '(Me)' : ''}: {board.score}
                        </p>
                    </div>
                    );
                })}
            </div>
            {question.map((value, idx) => {
                return (
                    <div key={idx} className="d-flex flex-column flex-md-row p-4 gap-4 py-md-5 align-items-center justify-content-center">
                        <h3>{value.title}</h3>
                        {value.answers.map((answer, i) => {
                            return (
                                <div key={i} className="list-group list-group-checkable d-grid gap-2 border-0">
                                    <input onChange={handleSubmitAnswer} className="list-group-item-check pe-none" data-question={value._id} type="radio" name={'answer-' + value._id} id={'answer-' + value._id + '-' + i} value={answer.value}/>
                                    <label className="list-group-item rounded-3 py-3" htmlFor={'answer-' + value._id + '-' + i}>
                                        <span className="d-block small opacity-50">{answer.title}</span>
                                    </label>
                                </div>
                            )
                        })}
                    </div>
                );
            })}
        </div>
    );
}

export default connect()(Question);
