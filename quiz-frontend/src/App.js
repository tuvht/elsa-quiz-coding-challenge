// Import React
import React, { useLayoutEffect } from 'react';

// Import Bootstrap
import { Container, Row, Col }
  from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

// Import Custom CSS
import './App.css';

// Import from react-router-dom
import {
  BrowserRouter as Router, Routes,
  Route
} from 'react-router-dom';

import Quiz from
  './components/quiz.component';
import Question from
  './components/question.component';
import NavBar from
  './components/navbar.component';
import { setBreadcrumb, clearBreadcrumb } from './actions/breadcrumbs.action';
import { connect, useSelector, useDispatch } from 'react-redux';

// App Component
const App = () => {
  const breadcrumbs = useSelector((state) => state.breadcrumbs.breadcrumbs);
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(setBreadcrumb({
      title: 'Quiz',
      breadcrumbItems: [
        {
          label: 'Quiz',
          haslink: false,
          path: '/'
        }
      ]
    }));
    return () => {
      dispatch(clearBreadcrumb());
    };
  }, [dispatch]);

  const breadcrumbsEl = breadcrumbs.breadcrumbItems.map((item, index) => {
    if (item.haslink) {
      return (
        <li key={index}><a href={item.path}>{item.label}</a></li>
      );
    }
    return (<li key={index}>{item.label ? item.label : item.varLabel}</li>);
  });
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <NavBar></NavBar>
        </header>
      </div>
      <Container>
        <Row>
          <Col md={12}>
            <div className="wrapper">
              <div className="breadcrumbs float-sm-left">
                <ul >
                  {breadcrumbsEl}
                </ul>
              </div>
              <Routes>
                <Route exact path="/"
                  element={<Quiz />} />
                <Route exact path="/quiz/:id" element={<Question/>} />
              </Routes>
            </div>
          </Col>
        </Row>
      </Container>
    </Router>
  );
};

export default connect()(App);