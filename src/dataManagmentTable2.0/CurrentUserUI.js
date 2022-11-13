import React from "react";
import { curUser } from "./curUserData";
function CurrentUserUI() {
  return (
    <React.Fragment>
      <div className="curuser">
        <h3>Current User</h3>
        <h2>{curUser.userName} </h2>
        <p className="p1">{curUser.userAccess} </p>
      </div>
    </React.Fragment>
  );
}

export default CurrentUserUI;
