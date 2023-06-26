import Price from "../model/PriceModel.js";
import Users from "../model/UserModel.js";
import Payment from "../model/PaymentModel.js";
import Water from "../model/WaterModel.js";

export const getPayment = async(req, res) => {
    try {
        const response = await Payment.findAll({
            include: [{
                    model: Users,
                    attributes: ["name", "no_rumah"],
                    include: [{
                        model: Water,
                        attributes: ["jenisKelompokPelanggan"],
                    }, ],
                },
                { model: Price, attributes: ["ppn", "iuran"] },
            ],
            where: {
                bulan: req.params.bulan,
                tahun: req.params.tahun,
            },
        });

        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getPaymentById = async(req, res) => {
    try {
        const response = await Payment.findOne({
            include: [{
                    model: Users,
                    include: [{
                        model: Water,
                    }, ],
                },
                { model: Price, attributes: ["ppn", "iuran"] },
            ],
            where: {
                id: req.params.paymentId
            },
        });

        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateWaterUsage = async(req, res) => {
    const { pemakaianAir } = req.body
    const price = await Price.findOne({ where: { id: 1 } });
    const paymentData = await Payment.findOne({
        where: {
            id: req.params.paymentId
        }
    })
    const waterData = await Water.findOne({ where: { id: paymentData.kategoriAir } })

    let total = parseInt(price.hargaKeamanan) + parseInt(price.hargaKebersihan);

    let hargaAir;
    if (0 <= pemakaianAir && pemakaianAir <= 3) {
        hargaAir = parseFloat(pemakaianAir) * parseFloat(waterData.Tarif0to3);
    } else if (3 < pemakaianAir && pemakaianAir <= 10) {
        hargaAir = parseFloat(pemakaianAir) * parseFloat(waterData.Tarif3to10);
    } else if (10 < pemakaianAir && pemakaianAir <= 20) {
        hargaAir = parseFloat(pemakaianAir) * parseFloat(waterData.Tarif10to20);
    } else {
        hargaAir = parseFloat(pemakaianAir) * parseFloat(waterData.TarifAbove20);
    }


    total = total + parseFloat(hargaAir);
    total = (total * parseFloat(price.ppn)) / 100 + total;
    if (paymentData.denda) {
        total = total + parseFloat(paymentData.denda)
    }
    if (paymentData.dendaKebersihan) {
        total = total + parseFloat(paymentData.dendaKebersihan)
    }
    total = parseFloat(price.iuran) + total;


    await Payment.update({
        pemakaianAir: pemakaianAir,
        air: hargaAir,
        total: total
    }, {
        where: {
            id: req.params.paymentId
        }
    })
}

export const updateStatusPayment = async(req, res) => {
    const { status } = req.body
    await Payment.update({
        status: status,
    }, {
        where: {
            id: req.params.paymentId
        }
    })
}


export const createPaymentAutomaticWaterConnected = async() => {
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
    const users = await Users.findAll();
    const price = await Price.findOne({ where: { id: 1 } });

    for (const user of users) {
        let total = parseInt(price.hargaKeamanan) + parseInt(price.hargaKebersihan);
        const waterData = await Water.findOne({
            where: { id: user.waterId },
        });
        const pembayaranId =
            year.toString() + month.toString() + user.id.toString();

        const pemakaianAirData = await Payment.findOne({
            where: { userId: user.id },
            attributes: ["pemakaianAir"],
        });
        let pemakaianAir;
        if (user.statusPemasanganAir != "Connected") {
            total = (total * parseFloat(price.ppn)) / 100 + total;
            total = parseFloat(price.iuran) + total;

            await Payment.create({
                pembayaranId: pembayaranId,
                air: 0,
                kategoriAir: user.waterId,
                keamanan: price.hargaKeamanan,
                kebersihan: price.hargaKebersihan,
                pemakaianAir: "Water Not Installed",
                iuran: price.iuran,
                total: total,
                bulan: monthName,
                userId: user.id,
                tahun: year.toString(),
                status: "Not Yet Paid",
                priceId: 1,
            })
        } else if (pemakaianAirData == null) {
            pemakaianAir = "0";
            transaction()
        } else {
            pemakaianAir = pemakaianAirData;
            transaction()
        }

        async function transaction() {

            let hargaAir;
            console.log;
            if (0 <= pemakaianAir && pemakaianAir <= 3) {
                hargaAir = parseFloat(pemakaianAir) * parseFloat(waterData.Tarif0to3);
            } else if (3 < pemakaianAir && pemakaianAir <= 10) {
                hargaAir = parseFloat(pemakaianAir) * parseFloat(waterData.Tarif3to10);
            } else if (10 < pemakaianAir && pemakaianAir <= 20) {
                hargaAir = parseFloat(pemakaianAir) * parseFloat(waterData.Tarif10to20);
            } else {
                hargaAir = parseFloat(pemakaianAir) * parseFloat(waterData.TarifAbove20);
            }

            total = total + parseFloat(hargaAir);
            total = (total * parseFloat(price.ppn)) / 100 + total;
            total = parseFloat(price.iuran) + total;



            await Payment.create({
                pembayaranId: pembayaranId,
                air: hargaAir,
                kategoriAir: user.waterId,
                keamanan: price.hargaKeamanan,
                kebersihan: price.hargaKebersihan,
                pemakaianAir: pemakaianAir,
                iuran: price.iuran,
                total: total,
                bulan: monthName,
                userId: user.id,
                tahun: year.toString(),
                status: "Not Yet Paid",
                priceId: 1,
            });
        }
    }
};




export const createPayment = async(req, res) => {


    for (let i = 0; i < 1; i++) {
        await Payment.create({
            pembayaranId: "1000",
            air: "1000",
            kategoriAir: 1,
            keamanan: "1000",
            kebersihan: "1000",
            pemakaianAir: "1000",
            iuran: "1000",
            total: "1000",
            bulan: "Mei",
            userId: 2,
            tahun: "2023",
            status: "Not Yet Paid",
            priceId: 1,
        });

    }

}
export const updatePaymentWater = async(req, res) => {
    let { pemakaianAir } = req.body;
    pemakaianAir = parseFloat(pemakaianAir);
    const data = await Payment.findOne({
        where: {
            userId: req.params.id,
        },
    });
    const user = await Users.findOne({
        where: {
            id: req.params.id,
        },
    });
    const price = await Price.findOne({
        where: { id: 1 },
    });
    const waterData = await Water.findOne({
        where: { id: user.waterId },
    });
    let air = 0;
    if (0 <= pemakaianAir && pemakaianAir <= 3) {
        air = parseFloat(pemakaianAir) * parseFloat(waterData.Tarif0to3);
    } else if (3 < pemakaianAir && pemakaianAir <= 10) {
        air = parseFloat(pemakaianAir) * parseFloat(waterData.Tarif3to10);
    } else if (10 < pemakaianAir && pemakaianAir <= 20) {
        air = parseFloat(pemakaianAir) * parseFloat(waterData.Tarif10to20);
    } else {
        air = parseFloat(pemakaianAir) * parseFloat(waterData.TarifAbove20);
    }
    console.log(air);
    air = air + air * (parseFloat(price.ppn) / 100);
    let total = 0;
    if (data.denda) {
        total =
            parseFloat(price.hargaKeamanan) +
            parseFloat(price.hargaKebersihan) +
            parseFloat(price.iuran) +
            parseFloat(denda) +
            air;
    } else {
        total =
            parseFloat(price.hargaKeamanan) +
            parseFloat(price.hargaKebersihan) +
            parseFloat(price.iuran) +
            air;
    }
    // console.log(total, air, pemakaianAir, price.ppn);

    await Payment.update({
        total: total,
        pemakaianAir: pemakaianAir,
        air: air,
    }, {
        where: {
            userId: req.params.id,
        },
    });
    res.json("berhasil");
};
export const updatePembayaran = async(req, res) => {
    try {
        await Users.update({
            nik: nik,
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

export const getHargaById = async(req, res) => {
    try {
        const response = await Price.findOne({
            where: {
                id: 1,
            },
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
};

export const updateHarga = async(req, res) => {
    try {
        await Price.update(req.body, {
            where: {
                id: 1,
            },
        });
        res.status(200).json({ msg: "Harga Updated" });
    } catch (error) {
        console.log(error.message);
    }
};


export const getPaymentByUserId = async(req, res) => {
    try {
        const response = await Payment.findAll({
            include: [{
                    model: Users,
                    include: [{
                        model: Water,
                    }, ],
                },
                { model: Price, attributes: ["ppn", "iuran"] },
            ],
            where: {
                userId: req.params.id
            },
        });

        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}