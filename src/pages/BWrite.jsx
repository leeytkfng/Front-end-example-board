import { useState } from "react";
import { useNavigate } from "react-router-dom"; //
import axios from "axios"; //
//export  default  function Bwrite(){return}

export default function Bwrite() {
  /////////// code
  //1.  {title, content, name}
  const navigate = useNavigate();
  let [inputs, setInputs] = useState({ title: "", content: "", name: "" });

  //2.  글쓰기 버튼을 클릭했을때
  const btnWrite = () => {
    const { title, content, name } = inputs;
    // 데이터있으면 true
    if (!title || !content || !name) {
      alert("빈칸입니다.\n데이터를 확인해주세요");
      return;
    }
    // 입력값
    let userInput = { ...inputs, createDate: new Date().toLocaleDateString() };
    axios
      .post("http://localhost:4000/board/", userInput)
      .then((response) => {
        alert("글쓰기에 성공했습니다.");
        navigate("/board/list");
      })
      .catch((error) => console.log(error));

    setInputs({ title: "", content: "", name: "" });
  };

  //3.  글리스트를  버튼을 클릭했을때
  const btnList = () => {
    navigate("/board/list");
  };

  /////////// view
  return (
    <>
      <h3> WRITE</h3>
      <div className="alert alert-secondary">
        <div className="my-3">
          <label htmlFor="bname" className="form-label">
            Writer
          </label>
          <input
            type="text"
            className="form-control"
            id="bname"
            name="name"
            value={inputs.name}
            onChange={function (e) {
              setInputs({ ...inputs, [e.target.name]: e.target.value });
            }}
          />
        </div>
        <div className="my-3">
          <label htmlFor="btitle" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="btitle"
            name="title"
            value={inputs.title}
            onChange={function (e) {
              setInputs({ ...inputs, [e.target.name]: e.target.value });
            }}
          />
        </div>
        <div className="my-3">
          <label htmlFor="bcontent" className="form-label">
            Content
          </label>
          <textarea
            className="form-control"
            id="bcontent"
            name="content"
            value={inputs.content}
            onChange={function (e) {
              setInputs({ ...inputs, [e.target.name]: e.target.value });
            }}
          ></textarea>
        </div>
        <div className="my-3">
          <button type="button" className="btn btn-primary me-2" onClick={btnWrite}>
            Write
          </button>
          <button type="button" className="btn btn-primary me-2" onClick={btnList}>
            List
          </button>
        </div>
      </div>
    </>
  );
}
