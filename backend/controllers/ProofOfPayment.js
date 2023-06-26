import Users from "../model/UserModel.js";
import path from "path";
import fs from "fs";
import Payment from "../model/PaymentModel.js";

export const getProofOfPayment = async(req, res) => {
    try {
        const data = await Payment.findAll({
            where: {
                id: req.params.id,
            },
        });
        res.json(data);
    } catch (error) {
        console.log(error);
    }
};
export const uploadProofOfPayment = async(req, res) => {
    const news = await Payment.findOne({
        where: {
            id: req.params.paymentId,
        },
    });
    if (!news) return res.status(404).json({ msg: "No Data Found" });
    let fileName = "";
    if (req.files === null) {
        fileName = news.image;
    } else {
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = Date.now() + file.md5 + ext;
        const allowedType = [".png", ".jpg", ".jpeg"];

        if (!allowedType.includes(ext.toLowerCase()))
            return res.status(422).json({ msg: "Invalid Images" });
        if (fileSize > 5000000)
            return res.status(422).json({ msg: "Image must be less than 5MB" });
        const filepath = `./public/images/${news.image}`;
        if (news.image) {
            fs.unlinkSync(filepath);
        }

        file.mv(`./public/images/${fileName}`, (err) => {
            if (err) return res.status(500).json({ msg: err.message });
        });
    }
    const status = req.body.status;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    try {
        await Payment.update({ image: fileName, url: url, status: status }, {
            where: {
                id: req.params.paymentId,
            },
        });
        res.status(200).json({ msg: " Users Updated Successfuly" });
    } catch (error) {
        console.log(error.message);
    }
};

export const deleteProofOfPayment = async(req, res) => {
    const news = await Users.findOne({
        where: {
            id: req.params.id,
        },
    });
    if (!news) return res.status(404).json({ msg: "No Data Found" });

    try {
        const filepath = `./public/images/${news.image}`;
        fs.unlinkSync(filepath);
        await Users.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json({ msg: "Proof Delete Successfully" });
    } catch (error) {
        console.log(error.message);
    }
};