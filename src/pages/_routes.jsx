import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Landing from "./Landing";
import Solutions from "./Solutions";
import EditSolutionpage from "./EditSolutionpage";
import Useraccount from "./Useraccount";
import Userprofile from "./Userprofile";
import Askquestion from "./Askquestion";
import Login from "../components/Forms/Login";
import Register from "../components/Forms/Register";
import Resetpassword from "../components/Forms/Resetpassword";
import EditQuiz from "./EditQuiz";
import Forgotpassword from "../components/Forms/Forgotpassword";

const Routing = () => (
  <Routes>
    <Route path="/" element={<Landing />}>
      <Route index element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="resetpassword" element={<Resetpassword />} />
      <Route path="forgotpassword" element={<Forgotpassword />} />
      <Route path="login" element={<Login />} />
    </Route>
    <Route path="/home" element={<Landing />}>
      <Route index element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="resetpassword" element={<Resetpassword />} />
      <Route path="forgotpassword" element={<Forgotpassword />} />
    </Route>
    <Route path="/questions" element={<Home />} />
    <Route path="/solutions" element={<Solutions />} />
    <Route path="/editsolutions" element={<EditSolutionpage />} />
    <Route path="/profile" element={<Userprofile />} />
    <Route path="/myaccount" element={<Useraccount />} />
    <Route path="/ask" element={<Askquestion />} />\{" "}
    <Route path="/editquestion" element={<EditQuiz />} />
  </Routes>
);
export default Routing;
