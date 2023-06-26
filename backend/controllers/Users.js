import Users from "../model/UserModel.js";
import Water from "../model/WaterModel.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async(req, res) => {
    try {
        const users = await Users.findAll({
            include: [{
                model: Water,
                attributes: ["kelompokPelanggan", "jenisKelompokPelanggan"],
            }, ],
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
};

export const getUserById = async(req, res) => {
    try {
        const response = await Users.findOne({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
};
export const createUser = async(req, res) => {
    const {
        nik,
        name,
        role,
        email,
        password,
        confPassword,
        gender,
        telepon,
        no_rumah,
    } = req.body;
    if (password !== confPassword)
        return res
            .status(400)
            .json({ msg: "Password dan Confirm Password tidak cocok" });
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            nik: nik,
            name: name,
            role: role,
            email: email,
            password: hashPassword,
            gender: gender,
            telepon: telepon,
            no_rumah: no_rumah,
        });
        res.json({ msg: "Register Berhasil" });
    } catch (error) {
        console.log(error);
    }
};
export const updateUser = async(req, res) => {
    const {
        nik,
        role,
        name,
        email,
        password,
        confPassword,
        gender,
        telepon,
        no_rumah,
    } = req.body;
    if (password !== confPassword)
        return res
            .status(400)
            .json({ msg: "Password dan Confirm Password tidak cocok" });
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.update({
            nik: nik,
            role: role,
            name: name,
            email: email,
            password: hashPassword,
            gender: gender,
            telepon: telepon,
            no_rumah: no_rumah,
        }, {
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json({ msg: "User Updated" });
    } catch (error) {
        console.log(error.message);
    }
};
export const deleteUser = async(req, res) => {
    try {
        await Users.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json({ msg: "User Deleted" });
    } catch (error) {
        console.log(error.message);
    }
};

export const Register = async(req, res) => {
    const usersData = req.body;

    try {
        const registeredUsers = [];

        for (const userData of usersData) {
            const {
                name,
                role,
                email,
                password,
                confPassword,
                telepon,
                gender,
                nik,
                no_rumah,
                statusPemasanganAir,
                waterId,
            } = userData;

            if (password !== confPassword) {
                return res
                    .status(400)
                    .json({ msg: "Password dan Confirm Password tidak cocok" });
            }

            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(password, salt);

            await Users.create({
                name: name,
                role: role,
                email: email,
                password: hashPassword,
                telepon: telepon,
                nik: nik,
                gender: gender,
                no_rumah: no_rumah,
                statusPemasanganAir: statusPemasanganAir,
                waterId: waterId,
            });

            registeredUsers.push({ name, email });
        }

        res.json({
            msg: "Register Berhasil",
            registeredUsers: registeredUsers,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Gagal melakukan registrasi" });
    }
};

export const Login = async(req, res) => {
    try {
        const user = await Users.findAll({
            where: {
                email: req.body.email,
            },
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if (!match) return res.status(400).json({ msg: "Password Tidak Cocok" });
        const userId = user[0].id;
        const name = user[0].name;
        const email = user[0].email;
        const role = user[0].role;
        const accessToken = jwt.sign({ userId, name, email },
            process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "20s",
            }
        );
        const refreshToken = jwt.sign({ userId, name, email },
            process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: "1d",
            }
        );
        await Users.update({ refresh_token: refreshToken }, {
            where: {
                id: userId,
            },
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.json({ accessToken, role });
    } catch (error) {
        res.status(404).json({ msg: "Email tidak ditemukan" });
    }
};

export const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
        where: {
            refresh_token: refreshToken,
        },
    });
    if (!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await Users.update({ refresh_token: null }, {
        where: {
            id: userId,
        },
    });
    res.clearCookie("refreshToken");
    return res.sendStatus(200);
};