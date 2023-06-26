import { createPaymentAutomaticWaterConnected } from "./controllers/PaymentController.js";
import Payment from "./model/PaymentModel.js";
import Water from "./model/WaterModel.js";
import WaterPenalty from "./model/WaterPenaltyModel.js";
import Users from "./model/UserModel.js";

export const addPaymentData = async() => {
    try {
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

        const statusPemasanganAir = await Users.findAll();

        for (let i = 0; i < statusPemasanganAir.length; i++) {
            const status = statusPemasanganAir[i];

            const data = await Payment.findAll({
                where: {
                    bulan: monthName,
                    tahun: year.toString(),
                },
            });
            console.log(data[0] == null);
            if (!data[0]) {
                await createPaymentAutomaticWaterConnected(status);
            }

        }


        let bulanDenda = [];
        let tahunDenda = [];
        for (let i = 0; i < 6; i++) {
            bulanDenda.push(monthNames[month - i - 2]);
            if (bulanDenda[i] === undefined) {
                bulanDenda[i] = monthNames[month - i - 2 + 12];
                if (bulanDenda[i] === "Desember") {
                    tahunDenda.push((year - 1).toString());
                } else {
                    tahunDenda.push(year.toString());
                }
            } else {
                tahunDenda.push(year.toString());
            }
        }
        console.log(bulanDenda, tahunDenda);

        let denda = [];
        let dataDenda;
        for (let i = 0; i < 6; i++) {
            dataDenda = await Payment.findAll({
                where: {
                    bulan: bulanDenda[i],
                    tahun: tahunDenda[i],
                    status: "Not Yet Paid",
                },
            });
            denda.push(dataDenda);
        }

        let kelompokPelanggan = []
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < denda[i].length; j++) {
                console.log(denda[i][j].kategoriAir)
                let data = await Water.findOne({
                    where: {
                        id: parseInt(denda[i][j].kategoriAir)
                    },
                    attributes: ["kelompokPelanggan"]
                })
                kelompokPelanggan.push(data)
                console.log(denda[i][j].kategoriAir)

            }
        }
        // console.log(kelompokPelanggan)

        let hargaDenda = []
        for (let i = 0; i < kelompokPelanggan.length; i++) {
            let data = await WaterPenalty.findOne({
                where: {
                    kelompokPelanggan: kelompokPelanggan[i].kelompokPelanggan
                }
            })
            hargaDenda.push(data)
        }


        for (let i = 0; i < denda.length; i++) {
            for (let j = 0; j < denda[i].length; j++) {
                if (denda[i][j].bulan == bulanDenda[0] && denda[i][j].denda != hargaDenda[j].denda) {
                    console.log("denda bulan ke 1")

                    await Payment.update({
                        denda: parseFloat(hargaDenda[j].denda)
                    }, {

                        where: {
                            id: denda[i][j].id
                        }
                    })

                } else if (denda[i][j].bulan == bulanDenda[1] && denda[i][j].denda != hargaDenda[j].denda) {
                    console.log("denda bulan ke 2")
                    await Payment.update({
                        denda: parseFloat(hargaDenda[j].denda) * 2
                    }, {

                        where: {
                            id: denda[i][j].id
                        }
                    })


                } else if (denda[i][j].bulan == bulanDenda[2] && denda[i][j].denda != hargaDenda[j].denda) {
                    console.log("denda bulan ke 3")
                    await Payment.update({
                        denda: parseFloat(hargaDenda[j].denda) * 3
                    }, {

                        where: {
                            id: denda[i][j].id
                        }
                    })

                } else if (denda[i][j].bulan == bulanDenda[3] && denda[i][j].denda != hargaDenda[j].denda) {
                    console.log("denda bulan ke 4")
                    await Payment.update({
                        denda: parseFloat(hargaDenda[j].denda) * 4
                    }, {

                        where: {
                            id: denda[i][j].id
                        }
                    })

                } else if (denda[i][j].bulan == bulanDenda[4] && denda[i][j].denda != hargaDenda[j].denda) {
                    console.log("denda bulan ke 5")
                    await Payment.update({
                        denda: parseFloat(hargaDenda[j].denda) * 5
                    }, {

                        where: {
                            id: denda[i][j].id
                        }
                    })

                } else {
                    console.log("Disconnected")
                    await Users.update({
                            statusPemasanganAir: "Disconnected"
                        }, {
                            where: {
                                id: denda[i][j].userId
                            }
                        }

                    )
                }
            }
        }


    } catch (error) {
        console.error("Gagal menambahkan data pembayaran:", error);
    }
};