const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        );
    },
});

function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/;
    const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Apenas imagens JPG, JPEG ou PNG são permitidas');
    }
}

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});

// Rota de upload de imagem (protegida, apenas admin)
router.post('/', protect, admin, upload.single('image'), (req, res) => {
    res.status(201).json({
        imageUrl: `/uploads/${req.file.filename}`,
    });
});

module.exports = router;
