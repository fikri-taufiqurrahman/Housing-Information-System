import Water from "../model/WaterModel.js";
import WaterPenalty from "../model/WaterPenaltyModel.js";

export const createWaterData = async(req, res) => {
    const data = req.body;

    data.forEach(async(item) => {
        try {
            await Water.create(item);
            console.log("Data berhasil disimpan");
        } catch (error) {
            console.log(error);
        }
    });
};

export const getWaterData = async(req, res) => {
    try {
        const data = await Water.findAll();
        res.json(data);
    } catch (error) {
        res.json(error);
    }
};

export const UpdateWaterData = async(req, res) => {
    try {
        await Water.destroy({ truncate: true });

        const data = req.body;

        for (const item of data) {
            await Water.create(item);
            console.log("Data berhasil diubah");
        }

        res.status(200).json({ message: "Data berhasil diubah" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Terjadi kesalahan saat mengubah data" });
    }
};


export const waterPenalty = async(req, res) => {
    const data = req.body;

    data.forEach(async(item) => {
        try {
            await WaterPenalty.create(item);
            console.log("Data berhasil disimpan");
        } catch (error) {
            console.log(error);
        }
    });
}