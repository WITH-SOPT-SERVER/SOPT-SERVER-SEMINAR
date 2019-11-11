const express = require('express')
const router = express.Router();

/*
// server에 저장하는 경우 
const multer = require('multer');
const upload = multer({
    dest: 'uploads/'
}); */
const upload = require('../config/multer');

router.post('/single', upload.single('image'), (req, res) => {
    // req.file 은 `image` 라는 필드의 파일 정보입니다.
    // 텍스트 필드가 있는 경우, req.body가 이를 포함할 것입니다.
    console.log(req.file);
    console.log(req.body);
    res.send({
        file: req.file,
        body: req.body
    });
})

router.post('/array', upload.array('photos', 4), (req, res) => {
    // req.files 는 `photos` 라는 파일정보를 배열로 가지고 있습니다.
    // 이때 두 번째 파라미터인 4는 최대 이미지의 개수(maxCount)입니다.
    // 텍스트 필드가 있는 경우, req.body가 이를 포함할 것입니다.
    console.log(req.files);
    console.log(req.body);
    res.send({
        file: req.files,
        body: req.body
    });
})

var cpUpload = upload.fields([{
    name: 'thumbnail',
    maxCount: 1
}, {
    name: 'images',
    maxCount: 8
}])

router.post('/fields', cpUpload, (req, res) => {
    // req.files는 (String -> Array) 형태의 객체 입니다.
    // 필드명은 객체의 key에, 파일 정보는 배열로 value에 저장됩니다.
    //
    // e.g.
    //  req.files['thumbnail'][0] -> File
    //  req.files['images'] -> Array
    //
    // 텍스트 필드가 있는 경우, req.body가 이를 포함할 것입니다.
    console.log(req.files);
    console.log(req.body);
    res.send({
        file: req.files,
        body: req.body
    });
})

module.exports = router;
