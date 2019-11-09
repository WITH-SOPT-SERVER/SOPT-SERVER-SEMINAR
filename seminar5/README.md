# 5차 세미나

# index
1. [multer](#multer)
2. [multer with s3](#multer-with-s3)
3. [jwt](#jwt)

# multer

Multer는 파일 업로드를 위해 사용되는 multipart/form-data 를 다루기 위한 node.js 의 미들웨어 입니다. 

## 개요
database의 경우에는 파일을 저장할 수 있는 방법이 없습니다. 따라서 서버 혹은 외부 저장소에 저장을 시키고 URL을 DB에 저장을 시켜야 합니다.
이때 사용하는 방법중에 하나가 multer를 이용하는 방법입니다.
multer는 파일을 업로드하면 내부/외부 저장소에 저장을 하고 File객체를 request 객체에 추가합니다.


## 설치 
```
$ npm install --save multer
```

## 사용법
```

```

[출처](https://github.com/expressjs/multer/blob/master/doc/README-ko.md)


# multer with s3

# jwt