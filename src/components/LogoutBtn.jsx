function LogOutBtn({ setIsToken }) {
  const logOut = () => {
    setIsToken(false);
    localStorage.removeItem("token");
    localStorage.removeItem("first name");
    localStorage.removeItem("user");
  };

  return <button onClick={logOut}>Logout</button>;
}

export default LogOutBtn;
