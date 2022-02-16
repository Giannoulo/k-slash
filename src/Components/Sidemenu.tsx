import React from "react";
import {Link} from "react-router-dom";

const Sidemenu = () => {
  return (
    <div className="sidemenu">
      <Link to="/">
        <div className="sidemenu__logo">k.</div>
      </Link>
      <Link to="/">Gallery</Link>
      <Link to="/favorites">Favorites</Link>
    </div>
  );
};

export default Sidemenu;
