import React, { useEffect, useState } from 'react';
import './RightSide.css';
import { User } from '../../interfaces/IUser';
import { useAppDispatch } from '../../app/hooks';
import { updateUser } from '../../features/users/usersSlice';
import type { SVGProps } from 'react';

export function CarbonUserAvatar(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={128}
      height={128}
      viewBox="0 0 32 32"
      {...props}>
      <path
        fill="currentColor"
        d="M16 8a5 5 0 1 0 5 5a5 5 0 0 0-5-5m0 8a3 3 0 1 1 3-3a3.003 3.003 0 0 1-3 3"></path>
      <path
        fill="currentColor"
        d="M16 2a14 14 0 1 0 14 14A14.016 14.016 0 0 0 16 2m-6 24.377V25a3.003 3.003 0 0 1 3-3h6a3.003 3.003 0 0 1 3 3v1.377a11.899 11.899 0 0 1-12 0m13.993-1.451A5.002 5.002 0 0 0 19 20h-6a5.002 5.002 0 0 0-4.992 4.926a12 12 0 1 1 15.985 0"></path>
    </svg>
  );
}
type RightSideProps = {
  user?: User;
};

const RightSide: React.FC<RightSideProps> = ({ user }) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<User | undefined>();

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData(
      (prevData) =>
        ({
          ...prevData,
          [name]: value || '',
        } as User),
    );
  };

  const handleSave = () => {
    if (formData) {
      dispatch(updateUser(formData));
    }
  };
  return (
    <div className="right-side">
      <div className="right-side__avatar">
        <CarbonUserAvatar />
        <span className="online-dot"></span>
      </div>
      {formData ? (
        <form className="right-side__form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="department">Department:</label>
            <input
              type="text"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="company">Company:</label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="jobTitle">Job Title:</label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <button
            type="button"
            onClick={handleSave}
            className="btn btn-primary">
            Save
          </button>
        </form>
      ) : (
        <p className="right-side__error">User not found</p>
      )}
    </div>
  );
};

export default RightSide;
