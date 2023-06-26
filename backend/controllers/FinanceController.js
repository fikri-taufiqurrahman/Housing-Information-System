import Finance from "../model/FinanceModel.js"
import path from "path";
import fs from "fs";

export const getFinancialReport = async(req, res) => {
    try {
        const response = await Finance.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const postSpendingReport = async(req, res) => {
    const tanggal = new Date().getDate();
    const bulan = new Date().getMonth() + 1;
    const tahun = new Date().getFullYear();
    const { pengeluaran, keterangan } = req.body
    try {
        const response = await Finance.findOne({
            order: [
                ["id", "DESC"]
            ],
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }

    const saldoAwal = response.saldo
    const saldoAkhir = parseFloat(saldoAwal) - parseFloat(pengeluaran)
    try {
        await Finance.create({
            saldo: saldoAkhir,
            tanggal: tanggal.toString(),
            bulan: bulan.toString(),
            tahun: tahun.toString(),
            pengeluaran: pengeluaran,
            keterangan: keterangan,
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}