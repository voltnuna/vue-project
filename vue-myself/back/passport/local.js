const passport = require('passport');
const bcrypt = require('bcrypt');
const { Strategy: LocalStrategy } = require('passport-local');
const db = require('../models');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'email', //req.body.email
        passwordField: 'password',//req.body.password
    }, async (email, password, done) => {
        try {
            const exUser = await db.User.findOne({ where: { email } });
            if (!exUser) {
                return done(null, false, { reason: '존재하지 않는 사용자 입니다.' });//인수 의미 -> 에러 성공 실패 순
            }
            const result = await bcrypt.compare(password, exUser.password);
            if (result) {
                return done(null, exUser); //성공할 경우 성공 자리에 사용자 정보 넣어준다.
            } else {
                return done(null, false, { reason: '비밀번호가 틀립니다.' });
            }
        } catch (err) { 
            console.error(err);
            return done(err);
         }
    }));
};
