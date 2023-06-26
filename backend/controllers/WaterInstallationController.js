import Payment from "../model/PaymentModel.js";
import Users from "../model/UserModel.js";
import WaterInstallation from "../model/WaterInstallationModel.js";
import Water from "../model/WaterModel.js";

export const createWaterInstallationData = async(req, res) => {
    const data = req.body;

    data.forEach(async(item) => {
        try {
            await WaterInstallation.create(item);
            console.log("Data berhasil disimpan");
        } catch (error) {
            console.log(error);
        }
    });
};

export const getWaterInstallationData = async(req, res) => {

    try {
        const data = await WaterInstallation.findAll({
            where: {
                kelompokPelanggan: req.params.kelompokPelanggan
            }
        });
        // console.log(data)
        res.json(data);
    } catch (error) {
        res.json(error);
    }
};

export const getWaterInstallationDataPrice = async(req, res) => {

    try {
        const data = await WaterInstallation.findOne({
            where: {
                id: req.params.id
            }
        });
        res.json(data);
    } catch (error) {
        res.json(error);
    }
};

export const updateWaterInstallation = async(req, res) => {
    const { category } = req.body
    const kategoriAir = category.split("-")
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const monthNames = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
    ];
    const monthName = monthNames[month - 1];
    const waterInstallationData = await WaterInstallation.findOne({
        where: {
            id: req.params.waterInstallationId
        }
    })


    const userData = await Payment.findOne({
        where: {
            userId: req.params.userId,
            bulan: monthName
        }
    })

    const waterCategory = await Water.findOne({
        where: {
            kelompokPelanggan: kategoriAir[0],
            jenisKelompokPelanggan: kategoriAir[1]
        }
    })

    await Users.update({
        statusPemasanganAir: "In Process",
        waterInstallationId: req.params.waterInstallationId,
        waterId: waterCategory.id
    }, {
        where: {
            id: req.params.userId
        }
    })

    const total = parseFloat(userData.total) + parseFloat(waterInstallationData.total)
    await Payment.update({
        total: total.toString(),
        kategoriAir: waterCategory.id,
        pemakaianAir: "Doing The Installation"
    }, {
        where: {
            userId: req.params.userId,
            bulan: monthName
        }
    })
}

export const updateStatusWaterInstallation = async(req, res) => {
    const { status } = req.body
    await Payment.update({
        pemakaianAir: "0"
    }, {
        where: {
            userId: req.params.userId,
            pemakaianAir: "Doing The Installation"
        }
    })
    await Users.update({
        statusPemasanganAir: status,
    }, {
        where: {
            id: req.params.userId
        }
    })

}

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