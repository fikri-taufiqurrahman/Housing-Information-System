import Price from "../model/PriceModel.js";

export const checkPrice = async(req, res) => {
    try {
        const response = await Price.findOne({
            order: [
                ["id", "DESC"]
            ],
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
};
export const createPrice = async(req, res) => {
    const { ppn, iuran, hargaKeamanan, hargaKebersihan } = req.body;
    try {
        await Price.create({
            ppn: ppn,
            iuran: iuran,
            hargaKeamanan: hargaKeamanan,
            hargaKebersihan: hargaKebersihan,
        });
        res.json({ msg: "Harga Berhasil Ditambahkan" });
    } catch (error) {
        console.log(error);
    }
};