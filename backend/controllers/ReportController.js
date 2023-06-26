import Reports from "../model/ReportModel.js";
export const getDataLaporan = async(req, res) => {
    try {
        const response = await Reports.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
};

export const addLaporan = (req, res) => {
    if (req.files === null)
        return res.status(400).json({ msg: "No File Uploaded" });
    const description = req.body.description;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = Date.now() + file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
        return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000)
        return res.status(422).json({ msg: "Image must be less than 5MB" });

    file.mv(`./public/images/${fileName}`, async(err) => {
        if (err) return res.status(500).json({ msg: err.message });
        try {
            await News.create({
                description: description,
                image: fileName,
                url: url,
            });
            res.status(201).json({ msg: "News Created Successfuly" });
        } catch (error) {
            console.log(error.message);
        }
    });
};

export const updateLaporan = async(req, res) => {
    try {
        await Reports.update(req.body, {
            where: {
                userId: req.params.id,
            },
        });
        res.status(200).json({ msg: "User Updated" });
    } catch (error) {
        console.log(error.message);
    }
};

export const addFeedback = (req, res) => {
    if (req.files === null)
        return res.status(400).json({ msg: "No File Uploaded" });
    const description = req.body.description;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = Date.now() + file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
        return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000)
        return res.status(422).json({ msg: "Image must be less than 5MB" });

    file.mv(`./public/images/${fileName}`, async(err) => {
        if (err) return res.status(500).json({ msg: err.message });
        try {
            await News.create({
                description: description,
                image: fileName,
                url: url,
            });
            res.status(201).json({ msg: "News Created Successfuly" });
        } catch (error) {
            console.log(error.message);
        }
    });
};

export const updateFeedback = async(req, res) => {
    try {
        await Reports.update(req.body, {
            where: {
                userId: req.params.id,
            },
        });
        res.status(200).json({ msg: "User Updated" });
    } catch (error) {
        console.log(error.message);
    }
};