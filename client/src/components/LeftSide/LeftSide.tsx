import { useCallback, useState, type SVGProps } from 'react';
import './LeftSide.css';
import { User } from '../../interfaces/IUser';
export function MdiUser(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}>
      <path
        fill="currentColor"
        d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"></path>
    </svg>
  );
}

type LeftSideProps = {
  users: User[];
  onSelectUser: (id: string) => void;
};

const LeftSide: React.FC<LeftSideProps> = ({ users, onSelectUser }) => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const handleClickUser = useCallback(
    (id: string) => {
      onSelectUser(id);
      setSelectedUserId(id);
    },
    [onSelectUser],
  );
  return (
    <div className="left-side">
      <div className="left-side__list">
        {users.map((user) => (
          <div
            key={user.id}
            className={`user_item ${
              user.id === selectedUserId ? 'selected' : ''
            }`}
            onClick={() => handleClickUser(user.id)}>
            <MdiUser />
            <p className="left-side__item">{user.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftSide;
