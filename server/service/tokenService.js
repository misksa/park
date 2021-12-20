const jwt = require('jsonwebtoken')
const {token} = require('../models/models')
class tokenService {
    generateToken(payload) {
        const accessToken = jwt.sign(payload, process.env.SECRET_KEY_ACCESS, {expiresIn: '5d'})
        const refreshToken = jwt.sign(payload, process.env.SECRET_KEY_REFRESH, {expiresIn: '15d'})
        return {
            accessToken,
            refreshToken
        }
    }
    validateAccessToken (token) {
        try {
            const userData = jwt.verify(token, process.env.SECRET_KEY_ACCESS)
            return userData
        } catch (e) {
            return null
        }
    }

    validateRefreshToken (token) {
        try {
            const userData = jwt.verify(token, process.env.SECRET_KEY_REFRESH)
            return userData
        } catch (e) {
            return null
        }
    }
    async saveToken(userId, refreshToken) {
        const tokenData  =  await token.findOne( {where:{userId} })
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const TokenN = await token.create({userId: userId, refreshToken})
        return TokenN
    }
    async removeToken (refreshToken) {
        const TokenData = await token.destroy({where: {refreshToken}})
            return TokenData
    }
    async findToken (refreshToken) {
        const TokenData = await token.findOne({where: {refreshToken}})
        return TokenData
    }

}

module.exports = new tokenService
