const tokensmodel = require("../models/tokens");

module.exports = {
    // token 저장함수 이게 client에서 요청해서 쓸이유가 있을까?
    savetoken : async (req, res) => {
        try {
            const TokenData = {
                token_address : req.body.token_address,
                token_symbol : req.body.token_symbol,
                token_name : req.body.token_name
            }
            const Token = await new tokensmodel(TokenData).saveToken();

            return res.status(200).send({
                data : Token,
                message: "success",
            });
        } catch (err) {
            console.log(err);
            res.status(400).send({
                message: "Can't execute request",
            });
        }
    },
    gettoken : async (req, res) => {
        try {
            const tokenList = await tokensmodel.getToken();
            console.log("모든 토큰 조회 완료");
            return res.status(200).send({data: tokenList, message:"조회 성공"});
        } catch (err) {
            console.error(err);
            return res.status(404).send({data : null});
        }
    },
    transfer : async (req, res) => {
        
    }
}