const router = require('express').Router();
const bcrypt = require('bcrypt');
const { findUserByLogin, createUser } = require('../database');

router.post('/login', async (req, res) => {
    try{
        const {login, password} = req.body;

        const user = await findUserByLogin(login)

        if (!user) {
			return res.status(400).json({ message: 'К сожалению, такого пользователя не существует.' });
		}

        const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: 'Неправильно введён пароль.' });
		}

        res.status(200).json({
			login: user.login,
			message: 'Вы успешно вошли в ваш аккаунт. Мы рады вас видеть!'
		});
    }catch(e) {
        res.status(400).send(e);
    }
})

router.post('/register', async (req, res) => {
    try{
        const {login, password, isAdmin} = req.body;

        const candidate = await findUserByLogin(login)

        if (candidate) {
			return res.status(400).json({
				message: 'Пользователь с таким логином уже создан.'
			});
		}

        const hashedPassword = await bcrypt.hash(password, 10);
		const user = await createUser({
            login,
            password: hashedPassword,
            isAdmin
        })
        res
			.status(200)
			.json({
				user,
				message: 'Пользователь успешно зарегистрирован!'
			});
    }catch(e) {
        console.log(e);
        res.status(400).send(e);
    }
})

module.exports = router;