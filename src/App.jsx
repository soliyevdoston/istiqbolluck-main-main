import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AIChat from "./components/AIChat";
import Home from "./pages/Home";
import Dtm from "./pages/Dtm";
import Team from "./pages/Team";
import Blog from "./pages/Blog";
import SchoolLife from "./pages/SchoolLife";
import BlogDetail from "./pages/BlogDetail";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dtm" element={<Dtm />} />
        <Route path="/team" element={<Team />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/life" element={<SchoolLife />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>

      <AIChat />
      <Footer />
    </Router>
  );
}
export default App;
