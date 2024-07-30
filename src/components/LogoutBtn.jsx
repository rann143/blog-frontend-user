import { useState } from "react";

function LogOutBtn({ logOut }) {
  return <button onClick={logOut}>Logout</button>;
}

export default LogOutBtn;
