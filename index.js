const express = require('express');
const app = express();
const crypto = require('crypto');
const bodyParser = require('body-parser');
require('dotenv').config();

const jwt = require('jsonwebtoken');
const { UserModel } = require("./db");
const { Telegraf } = require('telegraf');

// SETTINGS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply('welcome'));
bot.command('start', (ctx) => ctx.reply('ping'));

bot.launch(
    // {
    //     webhook: {
    //         domain: 'taroai-546ac6a4db3b.herokuapp.com/payment/status',
    //         path: '/telegraf/' + process.env.WEBHOOK_SECRET
    //     }
    // }
);

// SETTINGS

const expToken = '1d';

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send("Unauthorized: No token provided");
    }

    jwt.verify(token, process.env.SALT, (err, decoded) => {
        if (err) {
            return res.status(401).send("Unauthorized: Invalid token");
        }
        req.user = decoded;
        next();
    });
};

const generateToken = (id) => {
    return jwt.sign({ _id: id }, process.env.SALT, { expiresIn: expToken });
};

function checkTelegramAuth(initData) {
    const decoded = decodeURIComponent(initData);
    // Разделяем строки параметров и находим значение 'hash'
    const arr = decoded.split('&');
    const hashIndex = arr.findIndex(str => str.startsWith('hash='));
    const hash = arr.splice(hashIndex)[0].split('=')[1];
    // Удаляем параметр 'hash' из массива
    arr.sort((a, b) => a.localeCompare(b));
    // Создаем строку для проверки
    const dataCheckString = arr.join('\n');
    // Создаем HMAC-SHA-256 signature
    const secret = crypto.createHmac('sha256', 'WebAppData')
        .update(process.env.BOT_TOKEN)
        .digest();
    const computedHash = crypto.createHmac('sha256', secret)
        .update(dataCheckString)
        .digest('hex');
    
    const verify = computedHash === hash;
    return verify;
}
async function getUserAvatar(userId) {
    const userProfilePhotos = await bot.telegram.getUserProfilePhotos(userId);
    let avatarUrl = null;

    if (userProfilePhotos.total_count > 0) {
        const photo = userProfilePhotos.photos[0][0];
        const fileId = photo.file_id;

        const file = await bot.telegram.getFile(fileId);
        avatarUrl = `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${file.file_path}`;
    }
    return avatarUrl;
}
function getUserData(initData) {
    const parsedData = new URLSearchParams(initData);
    const userJson = decodeURIComponent(parsedData.get('user'));
    const user = JSON.parse(userJson);
    return user;

}

function generateRefKey(userId) {
    const randomPart = crypto.randomBytes(3).toString('hex');
    const userPart = Buffer.from(userId.toString()).toString('hex');
    return `${randomPart}-${userPart}`;
}

app.get('/', async (req, res) => {
    const user = await UserModel.find();
    console.log(user);
    res.send('Tg mini app work1');
})

app.post('/api/auth', async (req, res) => {
    try {
        const initData = req.body.initData;
        const verifyData = checkTelegramAuth(initData);
        const startParams = false;
        if(verifyData) {
            const userData = getUserData(initData);
            const isPremium = userData.is_premium;
            const avatarUrl = await getUserAvatar(userData.id);
            const visit = Date.now();

            let existingUser = await UserModel.findOneAndUpdate({ id: userData.id }, { last_visit: visit }, { new: true });
            if(!existingUser) {
                const refKey = generateRefKey(userData.id);
                const data = {...userData, avatar: avatarUrl, ref_key: refKey};
                existingUser = await UserModel.insertMany(data);
                const token = generateToken(existingUser._id);
                if(startParams && !existingUser.invited) {
                    console.log('refferal');
                }
                res.status(200).json({
                    token: token,
                    user: existingUser
                })
            } else {
                if(existingUser.avatar !== avatarUrl) {
                    existingUser.avatar = avatarUrl;
                    await UserModel.updateOne(
                        { _id: existingUser._id },
                        { $set: { avatar: avatarUrl } }
                    )
                }
                if(startParams && existingUser.invited) {
                    console.log('ref');
                }
                const token = generateToken(existingUser._id);
                res.status(200).json({
                    token: token,
                    user: existingUser
                })
            }
        }
    }catch (e) {
        res.status(403).json({sucess: false, message: e})
    }
})

app.get('/api/profile', verifyToken, async(req, res) => {
    try {
        const { _id } = req.user;
        const user = await UserModel.findOne({ _id: _id });

        res.status(200).json(user);
    } catch (e) {
        res.status(403).json({ message: "internal error", error: e })
    }
})


module.exports = app;