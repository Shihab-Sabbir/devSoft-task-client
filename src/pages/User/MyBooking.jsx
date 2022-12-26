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
function MyBooking() {
    const [bookings, setBookings] = useState([]);
    const [slots, setSlots] = useState([]);
    const [dataLoading, setDataLoading] = useState(false);
    const { user, loading, updateState, setUpdateState, setUser, setDbUser } =
        useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        setDataLoading(true);
        axios
            .get(`http://localhost:5000/my-events/${user?.uid}`)
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

        axios
            .get(`http://localhost:5000/all-events`)
            .then((res) => {
                setSlots(res.data.filter((slot) => slot.booked === false));
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

    console.log(slots);

    if (dataLoading) {
        return <DataLoadingSpinner />;
    }

    const handleDelete = (id) => {
        confirmAlert({
            message: "Are you sure to cancel this booking ?",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        setDataLoading(true);
                        fetch(`http://localhost:5000/cancel-booking/${id}`, {
                            method: "PUT",
                        })
                            .then((res) => {
                                console.log(res);
                                if (res.status == 403) {
                                    setDataLoading(false);
                                    return logOut(user, setUser, navigate, setDbUser);
                                } else {
                                    return res.json();
                                }
                            })
                            .then((data) => {
                                if (data.ok > 0) {
                                    toast.success("booking deleted");
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

    const handleEdit = (e, id) => {
        const newSlot = e.target.value;
        if (newSlot === 'Select Slot') { toast.error('Select valid slot'); return }
        if (newSlot === id) { toast.error('You already book this slot'); return }
        confirmAlert({
            message: "Are you sure to change this booking ?",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        setDataLoading(true);
                        fetch(`http://localhost:5000/edit-booking/${id}`, {
                            method: "PUT",
                            body: JSON.stringify({ newSlot, user })
                        })
                            .then((res) => {
                                console.log(res);
                                if (res.status == 403) {
                                    setDataLoading(false);
                                    return logOut(user, setUser, navigate, setDbUser);
                                } else {
                                    return res.json();
                                }
                            })
                            .then((data) => {
                                if (data.acknowledged) {
                                    toast.success("booking updated");
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
                                    Delete
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
                                    Status
                                </th>
                                <th
                                    scope="col"
                                    className="py-3 text-amber-500 px-6 text-center"
                                >
                                    Edit
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings?.map((booking) => (
                                <tr
                                    key={booking._id}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-center p-1"
                                >
                                    <td
                                        className="font-medium cursor-pointer text-red-600 dark:text-red-500 hover:underline"
                                        onClick={() => {
                                            handleDelete(booking.start);
                                        }}
                                    >
                                        Cancel
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
                                    <td className="py-4 px-6">
                                        <div className="flex justify-center items-center uppercase text-xs font-bold">
                                            {booking.status}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex justify-center items-center">
                                            {booking.booked ? (
                                                slots.length > 0 ? (<select
                                                    className="flex w-fit text-xs text-center"
                                                    onChange={(e) => handleEdit(e, booking.start)}
                                                >
                                                    <option defaultChecked aria-readonly>
                                                        Select Slot
                                                    </option>
                                                    {slots?.map((slot) => (
                                                        <option value={slot.start}>
                                                            {slot.title} {slot.start.split("T")[0]}{" "}
                                                            {slot.start.split("T")[1].split(".")[0]}
                                                        </option>
                                                    ))}
                                                </select>) : 'All slots are booked'
                                            ) : (
                                                "N/A"
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center uppercase font-bold py-[18%]">
                        No booking found !
                    </p>
                )}
            </div>
        </div>
    );
}

export default MyBooking;
