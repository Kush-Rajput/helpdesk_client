import { BsFillBookmarkFill, BsFillPatchQuestionFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import {
  AvatarFallbackLg,
  AvatarImage,
  AvatarLg,
} from "../components/radixUI/avatar";
import { MdEmail, MdAccountCircle } from "react-icons/md";
import { Label } from "../components/radixUI/Label";

function Useraccount() {
  return (
    <section className="main-section">
      {/* side bar */}
      <aside className="aside">
        <NavLink className="side__nav__links" to="/questions">
          <BsFillPatchQuestionFill className="link__icons" />
          <h3>Questions</h3>
        </NavLink>
        <NavLink className="side__nav__links" to="/questions">
          <BsFillBookmarkFill className="link__icons" />
          <h3>Bookmarks</h3>
        </NavLink>
        <NavLink className="side__nav__links" to="/profile">
          <MdAccountCircle className="link__icons" />
          <h3>Profile</h3>
        </NavLink>
      </aside>
      {/* main content area  */}
      <main className="main-section-content">
        <div className="user-account">
          <AvatarLg>
            <AvatarImage src=" " alt="Avatar" />
            {/* if image isnt available revert to user initials */}
            <AvatarFallbackLg>EB</AvatarFallbackLg>
          </AvatarLg>
          <span>
            <h3>Ebenezar</h3>
            <small>
              <MdEmail /> ebenezar.bukosia@student.moringaschool.com
            </small>
          </span>
          <button className="btn sec-btn">Edit profile</button>
        </div>
        <article className="user-articles">
          <form className="edit-profile">
            <span className="input_group">
              <Label htmlFor="image" css={{ lineHeight: "35px" }}>
                Profile image
              </Label>
              <AvatarLg>
                <AvatarImage src=" " alt="Avatar" />
                {/* if image isnt available revert to user initials */}
                <AvatarFallbackLg>EB</AvatarFallbackLg>
              </AvatarLg>
            </span>
            <span className="input_group">
              <Label htmlFor="email" css={{ lineHeight: "35px" }}>
                Email
              </Label>
              <input
                type="email"
                id="email"
                className="inputs"
                placeholder="name@student.moringaschool.com"
              ></input>
            </span>
            <span className="input_group">
              <Label htmlFor="full_name" css={{ lineHeight: "35px" }}>
                Full Name
              </Label>
              <input
                type="text"
                id="full_name"
                className="inputs"
                placeholder="Jon Doe"
              ></input>
            </span>
            <span className="input_group">
              <Label htmlFor="user_name" css={{ lineHeight: "35px" }}>
                Full Name
              </Label>
              <input
                type="text"
                id="full_name"
                className="inputs"
                placeholder="Jon Doe"
              ></input>
            </span>
            <span className="input_group">
              <Label htmlFor="password" css={{ lineHeight: "35px" }}>
                Password
              </Label>
              <input
                type="text"
                id="password"
                className="inputs"
                placeholder="*******"
              ></input>
            </span>
            <span className="input_group">
              <Label htmlFor="cornfirm_password" css={{ lineHeight: "35px" }}>
                Confirm Password
              </Label>
              <input
                type="text"
                id="password"
                className="inputs"
                placeholder="*******"
              ></input>
            </span>
          </form>
        </article>
      </main>
    </section>
  );
}

export default Useraccount;
