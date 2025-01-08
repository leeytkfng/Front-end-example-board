import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function BDetail() {
  //////  code
  // 1. 해당글번호 가져오기
  const { id } = useParams();
  const [detail, setDetail] = useState({});
  function getDetail() {
    axios
      .get(`/board/${id}`)
      .then((response) => {
        setDetail(response.data);
      })
      .catch((error) => console.error(error));
    console.log(detail);
  }
  useEffect(() => {
    getDetail();
  }, []);

  // 2. 글삭제하기 - 삭제하고나서 /board/list
  const naviate = useNavigate();
  const btnDelete = () => {
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      axios
        .delete(`/board/${id}`)
        .then((response) => console.lolg("삭제완료"))
        .catch((error) => console.error(error));
      naviate("/board/list");
    }
  };

  //////  view
  return (
    <>
      <h3 class="mt-5  text-center" style={{ fontWeight: "bold" }}>
        DETAIL
      </h3>
      <table className="table  table-striped  table-bordered table-hover">
        <caption>상세보기</caption>
        <tbody>
          <tr>
            <th scope="row">NAME</th>
            <td>{detail.name}</td>
            <th scope="row">DATE</th>
            <td>{detail.createDate}</td>
          </tr>
          <tr>
            <th scope="row">TITLE </th>
            <td colSpan={3}>{detail.title}</td>
          </tr>
          <tr>
            <th scope="row">CONTENT</th>
            <td colSpan={3} style={{ height: "200px", whiteSpac: "pre-wrap" }}>
              {detail.content}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="text-end">
        <Link to={"/board/update/" + detail.id} className="btn  btn-outline-primary me-2">
          Edit
        </Link>
        <button className="btn  btn-outline-primary me-2" onClick={btnDelete}>
          Delete
        </button>
        <Link to={"/board/list"} className="btn  btn-outline-primary me-2">
          List
        </Link>
      </div>
    </>
  );
}
