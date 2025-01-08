import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function BUpdate() {
  /////// code
  //1. 수정할 글 가져오기
  const navigate = useNavigate();
  let { id } = useParams(); //해당글번호 가져오기
  const [detail, setDetail] = useState({ name: "", title: "", content: "", createDate: "" });
  let getDetail = () => {
    axios
      .get(`/board/${id}`)
      .then((response) => {
        setDetail(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getDetail();
  }, []);
  //2. 글 수정하기
  const btnUpdate = () => {
    const { name, title, content, createDate } = detail;
    if (!title || !content) {
      alert("빈칸입니다.");
      return;
    }
    axios
      .put(`/board/${id}`, detail)
      .then((response) => {
        alert("글수정 성공!");
        navigate(`/board/detail/${id}`);
      })
      .catch((error) => console.error(error));

    setDetail({ name: "", title: "", content: "", createDate: "" });
  };

  //3. 취소 - 뒤로돌아가기
  const btnCancle = () => {
    navigate(-1);
  }; // window.history.go(-1)

  /////// view
  return (
    <>
      <h3> UPDATE</h3>
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
            value={detail.name}
            onChange={function (e) {
              setDetail({ ...detail, [e.target.name]: e.target.value });
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
            value={detail.title}
            onChange={function (e) {
              setDetail({ ...detail, [e.target.name]: e.target.value });
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
            value={detail.content}
            onChange={function (e) {
              setDetail({ ...detail, [e.target.name]: e.target.value });
            }}
          ></textarea>
        </div>
        <div className="my-3">
          <button type="button" className="btn btn-primary me-2" onClick={btnUpdate}>
            UPDATE
          </button>
          <button type="button" className="btn btn-primary me-2" onClick={btnCancle}>
            CANCLE
          </button>
        </div>
      </div>
    </>
  );
}
