import { createServer } from 'http';
import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
dotenv.config();

const SOCKET_IO_PORT = process.env.SOCKET_IO_PORT;
var app = express();
app.use(cors());
var server = createServer(app);
server.listen(SOCKET_IO_PORT);
const io = new Server(server);

let users = [];
const addUser = (userId, quizId, socketId) => {
    const uuid = quizId + ':' + userId;
    if (!users.some((user) => user.userID === uuid)) {
        users.push({
            userId: uuid,
            socketId,
            score: 0
        });
    }
};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};

const updateScore = (quizId, userId, score) => {
    const uuid = quizId + ':' + userId;
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if (user.userId === uuid) {
            users[i].score = score;
        }
    }
};

const getQuizUsers = (quizId, userId, score) => {
    const cloneUsers = [...users];
    const usersFilter = cloneUsers.filter((user) => user.userId.includes(quizId));
    if (usersFilter.length === 0) {
        return [];
    }

    let quizUsers = [];
    for (let i = 0; i < usersFilter.length; i++) {
        const user = usersFilter[i];
        const userId = user.userId.split(':')[1];
        quizUsers.push({
            userId,
            score: user.score
        })
    }
    quizUsers = quizUsers.sort((a, b) => b.score - a.score);

    return quizUsers.filter((value, index, self) =>
        index === self.findIndex((t) => (
            t.userId === value.userId
        ))
    );
}

io.sockets.on('connection', (socket) => {
    //when connect
    console.log('a user connected.');

    //take userId and socketId from user
    socket.on('addUser', (data) => {
        console.log('add a user');
        const { userID, quizID } = data;
        addUser(userID, quizID, socket.id);
        // io.emit('getUsers', users);
    });

    socket.on('sendQuizUsers', () => {
        io.emit('getQuizUsers', users.length);
    });

    socket.on('updateScore', (data) => {
        const { quizID, userID, score } = data;
        updateScore(quizID, userID, score);
    });

    socket.on('updateLeaderboard', (data) => {
        const { quizID, userID, score } = data;
        io.emit('getLeaderboard', getQuizUsers(quizID, userID, score));
    });

    //when disconnect
    socket.on('disconnect', () => {
        console.log('a user disconnected!');
        removeUser(socket.id);
        // io.emit('getUsers', users);
    });
});
