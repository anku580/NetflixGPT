import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const selectedLang = useSelector((store) => store.config.lang);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // navigate("/");
      })
      .catch((error) => {
        console.error(error);
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsub();
  }, []);

  const handleGPTSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLangChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute px-8 py-2 bg-gradient-to-b from-black w-full flex flex-col md:flex-row justify-between z-10">
      <img src={LOGO} className="w-44 mx-auto md:mx-0" alt="logo" />
      {user && (
        <div className="flex p-2 gap-2 justify-between">
          {showGptSearch && (
            <select
              onChange={handleLangChange}
              value={selectedLang}
              className="p-2 bg-gray-900 text-white m-2 rounded-lg"
            >
              {SUPPORTED_LANGUAGES.map(({ identifier, name }) => (
                <option key={identifier} value={identifier}>
                  {name}
                </option>
              ))}
            </select>
          )}
          <button
            className="text-white px-4 m-2 bg-purple-800 rounded-lg"
            onClick={handleGPTSearchClick}
          >
            {!showGptSearch ? "GPT search" : "Home Page"}
          </button>
          <img
            src={user?.photoURL}
            alt="profile"
            className="w-12 h-12 hidden md:block"
          />
          <button className="font-bold text-white" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
