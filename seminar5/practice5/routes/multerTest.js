const express = require('express')
const router = express.Router();

const multer = require('multer')
const upload = multer({
    dest: 'uploads/'
})

router.post('/profile', upload.single('avatar'), (req, res) => {
    // req.file 은 `avatar` 라는 필드의 파일 정보입니다.
    // 텍스트 필드가 있는 경우, req.body가 이를 포함할 것입니다.
    console.log(req.file);
    console.log(req.body.id);
    res.send({
        file: req.file,
        body: req.body
    });
})

router.post('/photos/upload', upload.array('photos', 12), (req, res) => {
    // req.files 는 `photos` 라는 파일정보를 배열로 가지고 있습니다.
    // 텍스트 필드가 있는 경우, req.body가 이를 포함할 것입니다.
    console.log(req.files);
    console.log(req.body);
    res.send({
        file: req.files,
        body: req.body
    });
})

var cpUpload = upload.fields([{
    name: 'avatar',
    maxCount: 1
}, {
    name: 'gallery',
    maxCount: 8
}])

router.post('/cool-profile', cpUpload, (req, res, next) => {
    // req.files는 (String -> Array) 형태의 객체 입니다.
    // 필드명은 객체의 key에, 파일 정보는 배열로 value에 저장됩니다.
    //
    // e.g.
    //  req.files['avatar'][0] -> File
    //  req.files['gallery'] -> Array
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
