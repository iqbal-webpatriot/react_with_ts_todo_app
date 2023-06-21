import React, { useContext } from "react";
import { AuthContext } from "../../ContextApi/UserAuthContext/AuthContext";

const UserProfile = () => {
    const {loggedUser}= useContext(AuthContext)
  return (
    <div className=" w-1/2 mx-auto bg-white p-4 rounded shadow-md my-32">
      <div className="flex flex-col md:flex-row items-center content-center mb-4">
        <img src={'https://mdbootstrap.com/img/new/avatars/2.jpg'} alt="User" className="w-16 h-16 rounded-full mb-4 md:mb-0 md:mr-4" />
        <div>
          <h2 className="text-xl font-semibold mb-2">{`${loggedUser?.firstName} ${loggedUser?.lastName}`}</h2>
          <div className="flex flex-col md:flex-row">
            <p className="mr-4 mb-2 md:mb-0">
              <strong>Gender:</strong> {loggedUser?.gender}
            </p>
            <p>
              <strong>Email:</strong> {loggedUser?.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
