class UploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then(
      file =>
        new Promise((resolve, reject) => {
          this._initRequest();
          this._initListeners(resolve, reject, file);
          this._sendRequest(file);
        }),
    );
  }

  _initRequest() {
    const xhr = (this.xhr = new XMLHttpRequest());
    // 경로 변수화
    const currentUrl = window.location.origin;
    const uploadUrl = `/api/post/uploadImg`;
    xhr.open('POST', uploadUrl, true);
    xhr.responseType = 'json';
  }

  _initListeners(resolve, reject, file) {
    const xhr = this.xhr;
    const loader = this.loader;
    const genericErrorText = '파일을 업로드 할 수 없습니다.';

    xhr.addEventListener('error', () => {
      reject(genericErrorText);
    });
    xhr.addEventListener('abort', () => reject());
    xhr.addEventListener('load', () => {
      const response = xhr.response;
      if (!response || response.error) {
        return reject(
          response && response.error
            ? response.error.message
            : genericErrorText,
        );
      }

      resolve({
        // response = { "success": true, "msg": "파일이 성공적으로 업로드되었습니다.", url: "http://localhost:8000/static/profileImg/qwodqwo.jpg"}
        default: response.url, //업로드된 파일 주소
      });
    });
  }

  _sendRequest(file) {
    const data = new FormData();
    data.append('imageFiles', file);
    this.xhr.send(data);
  }
}

let editor;

function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = loader => {
    return new UploadAdapter(loader);
  };
}

ClassicEditor.create(document.querySelector('.editor'), {
  extraPlugins: [MyCustomUploadAdapterPlugin],
})
  .then(newEditor => {
    editor = newEditor;
  })
  .catch(error => {
    console.error(error);
  });

// 수정 완료
document.querySelector('#modifyBtn').addEventListener('click', async e => {
  e.preventDefault();

  const postId = document.querySelector('input').id;

  const editorData = editor.getData();
  const title = document.querySelector('.inputTitle').value;
  const board_id = document.querySelector('form').id;

  if (title.trim().length < 1) {
    alert('제목을 입력해주세요.');
    return;
  }

  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/post/${postId}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        title: title,
        content: editorData,
        board_id,
      }),
    });
    if (res.data.status === 'success') {
      location.href = `/post/${postId}`;
    }
  } catch (err) {
    console.log(err);
  }
});

// 취소
document.querySelector('#backBtn').addEventListener('click', async e => {
  e.preventDefault();
  const postId = document.querySelector('input').id;
  location.href = `/post/${postId}`;
});
