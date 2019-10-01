# GitHub 실습 (for 공유 문서 프로젝트) _ CLI

안녕하세요 서버파트 이동훈입니다.
 
지난 세미나에서 문서를 수정하면서 Pull Request를 하는 실습을 진행했습니다.

[SHARED-LEARNING](https://github.com/WITH-SOPT-SERVER/SHARED-LEARNING) 페이지에 가보면
참가자 목록의 이름이 추가된 것을 확인 할 수 있습니다.

하지만 Local Repository에 가보시면 새롭게 갱신이 안된걸 확인 할 수 있습니다. 

이를 해결하기 위해 공동작업 Repository에 있는 내용을 Local Repository로 가져오는 작업을 해줘야 합니다.

기존에 올라온 방법은 ``SourceTree``라는 **GUI(Graphical User Interface)**를 통해 자세하게 작성되어 있습니다. [링크 - git 내려받기 실습](https://github.com/WITH-SOPT-SERVER/SHARED-LEARNING) 

하지만 저와 같이 **GUI**보단 **CLI(Command Line Interface)**를 선호하시는 분들이 계실 수도 있을것 같아 CLI로 동일한 작업을 해보겠습니다. 

천천히 해보시고 막히는 부분은 언제든지 질문 주세요!!

1. 먼저 원본 repository를 remote repository로 추가해야 합니다. Fork한 repository에서 remote repository를 확인하면 아래와 같이 나오는걸 확인할 수 있습니다.

```
$ git remote -v
origin  https://github.com/YOUR_USERNAME/SHARED-LEARNING.git (fetch)
origin  https://github.com/YOUR_USERNAME/SHARED-LEARNING.git (push) 
```

주소의 YOUR_USERNAME은 자신의 github 아이디가 적혀 있을 것입니다. 
<br>
<br>


2. 다음으로 동기화 하고 싶은 원본 repository(내꺼 말고 SOPT꺼) 를 upstream이라는 이름으로 추가해줍니다.

```
$ git remote add upstream https://github.com/WITH-SOPT-SERVER/SHARED-LEARNING.git
```

꼭 원본 repository의 주소를 입력해 주세요!!
<br>
<br>

3. upstream repository가 제대로 추가되었는지 확인해볼게요~!!

```
$ git remote -v
origin    https://github.com/YOUR_USERNAME/SHARED-LEARNING.git (fetch)
origin    https://github.com/YOUR_USERNAME/SHARED-LEARNING.git (push)
upstream  https://github.com/WITH-SOPT-SERVER/SHARED-LEARNING.git (fetch)
upstream  https://github.com/WITH-SOPT-SERVER/SHARED-LEARNING.git (push)
```

잘 따라 오셨습니다. 이제 upstream repository의 내용을 가져오겠습니다.
<br>
<br>

4. git의 fetch 명령어를 통해 upstream repository 내용을 불러옵니다.

```
$ git fetch upstream
remote: Counting objects: 75, done.
remote: Compressing objects: 100% (53/53), done.
remote: Total 62 (delta 27), reused 44 (delta 9)
Unpacking objects: 100% (62/62), done.
From https://github.com/WITH-SOPT-SERVER/SHARED-LEARNING.git
 * [new branch]      master     -> upstream/master
```

거의 다 했습니다~~
<br>
<br>

5. upstream repository의 master branch로 부터 local master branch로 merge합니다.

```
$ git checkout master
Switched to branch 'master'

$ git merge upstream/master
Updating a422352..5fdff0f
Fast-forward
 README.md                 |    7 ++++++
 1 files changed, 7 insertions(+)
 create mode 100644 README.md
```

여기까지 하셨으면 마지막입니다!!
<br>
<br>

6. 마지막으로 push 명령어를 통해 remote repository(내 github repository)에도 적용시켜줍니다.

```
$git push origin master
```

수고하셨습니다~~ 사람마다 GUI를 선호하거나 CLI를 선호할 수 있습니다. 


경험상 둘다 알고있는게 나중에 상황에 따라 적용할 수 있어 편하더라구요~

막히는 부분 있으면 언제든 연락 주세요~!!! 여기까지 읽느라 수고하셨습니다!!!

---
# 참가자

- 이동훈