import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../UserContext/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import toast from "react-hot-toast";
import axios from "axios";
import DataLoadingSpinner from "../../component/DataLoadingSpinner/DataLoadingSpinner";
import { logOut } from "../../Utility/logout";
function AdminPanel() {
  const [bookings, setBookings] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const { user, loading, updateState, setUpdateState, setUser, setDbUser } =
    useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    setDataLoading(true);
    axios
      .get(`https://dev-soft-task.vercel.app/all-events`)
      .then((res) => {
        setBookings(res.data);
        setDataLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setDataLoading(false);
        if (err.response.status == 403) {
          logOut(user, setUser, navigate, setDbUser);
        }
      });
  }, [updateState, loading, user]);

  if (dataLoading) {
    return <DataLoadingSpinner />;
  }

  const handleStatus = (e, id) => {
    const status = e.target.value;
    confirmAlert({
      message: `Are you sure to ${status} this booking ?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            setDataLoading(true);
            fetch(`https://dev-soft-task.vercel.app/update-event/${id}`, {
              method: "PUT",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({ status }),
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                if (data.ok > 0) {
                  toast.success("status updated");
                  setUpdateState(!updateState);
                  setDataLoading(false);
                }
              });
          },
        },
        {
          label: "No",
          onClick: () => {
            setDataLoading(false);
          },
        },
      ],
    });
  };

  return (
    <div className="w-full lg:w-[1176px] p-2 mx-auto pt-10">
      <Helmet>
        <title>Schedule - Buyer Orders</title>
      </Helmet>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        {bookings?.length > 0 ? (
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 overflow-x-auto">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th
                  scope="col"
                  className="py-3 text-amber-500  px-6 text-center"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="py-3 text-amber-500 px-6 text-center"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="py-3 text-amber-500 px-6 text-center"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="py-3 text-amber-500 px-6 text-center"
                >
                  Time
                </th>
                <th
                  scope="col"
                  className="py-3 text-amber-500 px-6 text-center"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="py-3 text-amber-500 px-6 text-center"
                >
                  Email
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings?.map((booking) => (
                <tr
                  key={booking._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-center p-1"
                >
                  <td className="flex justify-center items-center font-medium cursor-pointer text-red-600 dark:text-red-500 hover:underline">
                    {booking.status === "canceled by user" ? (
                      <p className="uppercase text-xs pt-4">canceled by user</p>
                    ) : (
                      <select
                        name=""
                        id=""
                        className="w-fit text-center text-xs uppercase justify-center items-center mt-4 lg:mt-2 ml-2"
                        onChange={(e) => handleStatus(e, booking.start)}
                      >
                        <option
                          className="text-center"
                          defaultChecked
                          desabled="true"
                        >
                          {booking.status}
                        </option>
                        <option className="text-center" value="pending">
                          Pending
                        </option>
                        <option className="text-center" value="canceled">
                          Cancel
                        </option>
                        <option className="text-center" value="confirmed">
                          Confirm
                        </option>
                      </select>
                    )}
                  </td>
                  <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white uppercase">
                    {booking.title}
                  </td>
                  <td className="py-4 px-6 font-thin text-justify  max-w-fit text-gray-900 dark:text-white">
                    <p className="font-semibold text-center">
                      {" "}
                      {booking.start.split("T")[0]}
                    </p>
                  </td>
                  <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                    {booking.start.split("T")[1].split(".")[0]}
                  </td>
                  <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                    {booking.name}
                  </td>
                  <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                    {booking.email}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center uppercase font-bold py-[18%]">
            No order found !
          </p>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;
