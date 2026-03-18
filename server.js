import express from "express";
import path from "path";
import jsonServer from "json-server";
import cors from "cors";

const app = express();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// CORS 허용
app.use(cors());

// JSON Server API를 /api 경로로
app.use("/api", router);

// React 빌드 폴더 서빙
const __dirname = path.resolve(); // ES 모듈 환경에서 __dirname 사용
app.use(express.static(path.join(__dirname, "dist")));

// SPA 라우팅 처리
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});