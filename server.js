// server.js
const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Đường dẫn POST để nhận dữ liệu người thắng
app.post('/save', (req, res) => {
    const newData = req.body;
    let existing = [];

    try {
        existing = JSON.parse(fs.readFileSync('log.json', 'utf8'));
    } catch (e) {
        console.log('⚠️ Không tìm thấy file log.json, tạo mới...');
    }

    existing.push(newData);
    fs.writeFileSync('log.json', JSON.stringify(existing, null, 2));
    console.log('📦 Dữ liệu đã lưu:', newData);

    res.sendStatus(200);
});

// Chạy server
app.listen(3000, () => {
    console.log('🚀 Server đang chạy tại http://localhost:3000');
});
