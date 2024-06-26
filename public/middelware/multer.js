import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/image')
    },
    filename: (req, file, cb) => {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});

const multerFilter = (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
    }
    else {
        cb(new Error("Please upload the right image format (PNG, JPG, JPEG)."));
    }
};

const userImage = multer({ storage: storage, fileFilter: multerFilter, limits: { fileSize: 10 * 1024 * 1024 } });
export default userImage 