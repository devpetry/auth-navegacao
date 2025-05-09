const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const crypto = require('crypto');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const app = express();
const db = new sqlite3.Database('./database.db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'segredo_super_secreto',
    resave: false,
    saveUninitialized: false
}));

app.get('/dashboard.html', (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/index.html');
    }
    next();
}, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.use(express.static('public'));

db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  password TEXT
)`);

function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

function authMiddleware(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.status(401).json({ error: 'Não autorizado. Faça login primeiro.' });
    }
}

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const hashed = hashPassword(password);

    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashed], function (err) {
        if (err) return res.status(400).json({ error: 'Usuário já existe.' });
        res.json({ success: true });
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const hashed = hashPassword(password);

    db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, hashed], (err, row) => {
        if (row) {
            req.session.user = row.username; // 🔐 Guarda info do usuário logado
            res.json({ success: true });
        } else {
            res.status(401).json({ error: 'Credenciais inválidas' });
        }
    });
});

app.post('/logout', (req, res) => {
    req.session.destroy();
    res.json({ success: true });
});

app.get('/area-protegida', authMiddleware, (req, res) => {
    res.json({ message: `Bem-vindo, ${req.session.user}! Você está logado.` });
});

app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));
