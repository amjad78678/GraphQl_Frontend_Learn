import { gql, useQuery } from "@apollo/client";
import { Button } from "flowbite-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Result = () => {
  const getUserData = gql`
    query GetAllUsers {
      getAllUsers {
        _id
        age
        email
        name
      }
    }
  `;
  const navigate = useNavigate();
  const { loading, error, data, refetch } = useQuery(getUserData);
  useEffect(() => {
    refetch();
  }, []);
  console.log(data);

  if (loading) return <div>Loading...</div>;
  return (
    <div className="flex justify-center items-center h-screen bg-black text-white gap-5">
      <div>
        <div className="flex justify-center items-center h-screen  text-black w-full">
          <div className="w-full">
            <table className=" bg-white rounded-lg shadow-md">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Age</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">User ID</th>
                </tr>
              </thead>
              <tbody>
                {data.getAllUsers.map((user) => (
                  <tr key={user._id} className="border-b hover:bg-gray-100">
                    <td className="py-3 px-6">{user.name}</td>
                    <td className="py-3 px-6">{user.age}</td>
                    <td className="py-3 px-6">{user.email}</td>
                    <td className="py-3 px-6">{user._id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div>
        <Button onClick={() => navigate("/")}>Go to Home</Button>
      </div>
    </div>
  );
};

export default Result;
