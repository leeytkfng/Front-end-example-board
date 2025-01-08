import Header from "./components/Header";
import Footer from "./components/Footer";
import Outer from "./components/Outer";
import BList from "./pages/BList";
import BDetail from "./pages/BDetail";
import BUpdate from "./pages/BUpdate";
import BWrite from "./pages/BWrite";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* Header  */}
      <Header />
      {/* Routes  */}
      <div className="container my5">
        <Routes>
          <Route path="/" element={<BList />} />
          {/* 하위요소는 /board/list 가 됨 */}
          <Route path="/board" element={<Outer />}>
            <Route path="list" element={<BList />} />
            <Route path="write" element={<BWrite />} />
            <Route path="detail/:id" element={<BDetail />} />
            <Route path="update/:id" element={<BUpdate />} />
          </Route>
          {/* 사용자가 잘못된 URL을 입력했을때 에러페이지 - * 모든경로 항상 맨마지막에에 */}
          <Route
            path="*"
            element={
              <div>
                <h1 style={{ color: "red" }}>존재하지 않는 페이지입니다. </h1>
                <Link to="/">BACK</Link>
              </div>
            }
          />
        </Routes>
      </div>
      {/* footer  */}
      <Footer />
    </div>
  );
}

export default App;
