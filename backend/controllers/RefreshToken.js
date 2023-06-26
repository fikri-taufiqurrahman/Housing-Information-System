import Users from "../model/UserModel.js";
import jwt from "jsonwebtoken";
export const refreshToken = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.sendStatus(401);
        const user = await Users.findAll({
            where: {
                refresh_token: refreshToken,
            },
        });
        if (!user[0]) return res.sendStatus(403);
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err) return res.sendStatus(403);
                const userId = user[0].id;
                const nik = user[0].nik;
                const email = user[0].email;
                const name = user[0].name;
                const gender = user[0].gender;
                const telepon = user[0].telepon;
                const no_rumah = user[0].no_rumah;
                const air = user[0].air;
                const keamanan = user[0].keamanan;
                const kebersihan = user[0].kebersihan;
                const status = user[0].status;
                const accessToken = jwt.sign({
                        userId,
                        nik,
                        name,
                        email,
                        gender,
                        telepon,
                        no_rumah,
                        air,
                        keamanan,
                        kebersihan,
                        status,
                    },
                    process.env.ACCESS_TOKEN_SECRET, {
                        expiresIn: "15s",
                    }
                );
                res.json({ accessToken });
            }
        );
    } catch (error) {
        console.log(error);
    }
};