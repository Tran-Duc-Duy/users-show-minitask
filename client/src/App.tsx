import { LeftSide } from './components/LeftSide';
import { RightSide } from './components/RightSide';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useEffect, useState } from 'react';
import { getUsers, showUser } from './features/users/usersSlice';
import './App.css';
import { Loading } from './components/Loading';

function App() {
  const dispatch = useAppDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { users, user, loading } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const handleSelectUser = (id: string) => {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
    dispatch(showUser(id));
  };
  const toggleMenu = () => {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="app">
      <div className={`app__left ${isMenuOpen ? 'is-open' : ''}`}>
        <LeftSide users={users} onSelectUser={handleSelectUser} />
      </div>
      <div className="app__right">
        <div className="app__right-header">
          {user && <p className="app__right-header__title">{user.name}</p>}
        </div>
        <div className="app__right-content">
          <RightSide user={user} />
        </div>
      </div>
      <button className="app__right-toggle-menu" onClick={toggleMenu}>
        Show all
      </button>
    </div>
  );
}

export default App;
