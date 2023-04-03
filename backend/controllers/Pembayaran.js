import Price from "../models/PriceModel.js";
import Users from "../models/UserModel.js";
export const getDataPembayaran = async (req, res) => {
  try {
    const response = await Users.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};
export const updatePembayaran = async (req, res) => {
  try {
    await Users.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "User Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

export const getHargaById = async (req, res) => {
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

export const updateHarga = async (req, res) => {
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
