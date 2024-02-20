import NavBar from "../header/NavBar";

function StandardLayout({ children }) {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
}

export default StandardLayout;
