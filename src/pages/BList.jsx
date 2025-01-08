import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function BList() {
  const [board, setBoard] = useState([]);

  function getBoard() {
    axios
      .get("http://localhost:4000/board")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setBoard(response.data);
        } else {
          console.error("응답 데이터가 배열이 아닙니다.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getBoard();
  }, []);

  const navigate = useNavigate();
  const searchDetail = (bno) => navigate(`/board/detail/${bno}`);

  return (
    <>
      <h3 className="mt-5" style={{ fontWeight: "bolder" }}>
        REACT SPRING BOARD
      </h3>
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th style={{ width: "15%" }}>번호</th>
            <th style={{ width: "35%" }}>제목</th>
            <th style={{ width: "25%" }}>작성자</th>
            <th style={{ width: "25%" }}>날짜</th>
          </tr>
        </thead>
        <tbody>
          {board?.length ? (
            board.map((li, index) => (
              <tr key={li.id} onClick={() => searchDetail(li.id)}>
                <td>{index + 1}</td>
                <td>{li.title}</td>
                <td>{li.name}</td>
                <td>{li.createDate}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>게시글이 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="text-end">
        <Link to="/board/write" className="btn btn-outline-primary">
          글쓰기
        </Link>
      </div>
    </>
  );
}
