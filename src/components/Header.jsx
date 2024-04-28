import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const Header = () => {
  const user = useSelector(store => store.user);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth).
      then(() => {
        navigate("/login");
      }).
      catch((error) => {
        console.log(error);
        navigate("/error");
      })
  }
  return (
    <div className="w-full px-4 lg:px-32  mt-6 text-center">
      <div className="flex justify-between flex-col gap-5 lg:flex-row">
        <img src="/src/assets/logo.png" alt="" width="60" height="60" className="lg:w-[120px] lg:h-[120px]" />
        
        {user === null ? (
          <div className="lg:h-[120px] items-center flex gap-5 flex-col lg:flex-row">
            <div className="flex  gap-10 h-[120px] items-center flex-col lg:flex-row">
            <Link to="/" className="font-bold">Home</Link>
            <Link to="/team" className="font-bold">Our Team</Link>
            </div>
            <button className="bg-[#1247e6] text-white px-3 py-2 rounded-sm" onClick={() => navigate("/login")}>SignIn</button>
          </div>
        ) : (
          <>
          <div className="flex  gap-10 lg:h-[120px]  items-center  lg:flex-row">
          <Link to="/" className="font-bold">Home</Link>
          <Link to="/cars" className="font-bold">Cars</Link>
          <Link to="/bookings" className="font-bold">Bookings</Link>
          <Link to="/team" className="font-bold">Our Team</Link>
         {(user && user.role === 2) && <Link to="/license" className="font-bold">License</Link>}
        </div>
          <div className="lg:h-[120px] items-center flex absolute right-4 top-8 lg:static">
          <button className="bg-[#1247e6] text-white px-3 py-2 rounded-md" onClick={() => handleSignOut()}>SignOut</button>
          </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;