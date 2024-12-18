// Import Modules
import React,
{
    useState,
    useEffect,
    useLayoutEffect
} from 'react';
import axios from 'axios';
import { connect, useDispatch } from 'react-redux';
import { setBreadcrumb, clearBreadcrumb } from '../actions/breadcrumbs.action';

// Quiz Component
const Quiz = () => {
    const [quiz, setQuiz] = useState([]);
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
        axios.get(
            process.env.REACT_APP_API_URL + '/quiz'
        ).then(res => {
            if (res.status === 200) {
                const data = res.data;
                setQuiz(data);
            } else {
                console.log(res.msg);
            }
        }).catch(err => console.log(err.response.data.msg))
    }, []);

    // Return user form
    return (
        <div>
            <div className="float-sm-right">
                <div className="d-flex flex-column flex-md-row p-4 gap-4 py-md-5 align-items-center justify-content-center">
                    <div className="list-group quiz-container">
                        {quiz.map((value, idx) => {
                            return (
                            
                                <a href={process.env.REACT_APP_URL + 'quiz/' + value._id} className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                                    <div className="d-flex gap-2 w-100 justify-content-between">
                                        <div><h6 className="mb-0">{value.name}</h6></div>
                                        <small className="opacity-50 text-nowrap">{value.createdAt}</small>
                                    </div>
                                </a>
                            
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default connect()(Quiz);
