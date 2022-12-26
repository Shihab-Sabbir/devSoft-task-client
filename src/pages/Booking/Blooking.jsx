import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../UserContext/UserContext";
import { toast } from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";
import BookingModal from "../../component/Modal/BookingModal";
import DataLoadingSpinner from "../../component/DataLoadingSpinner/DataLoadingSpinner";
import image from '../../asset/images/banner.png'

function Blooking() {
    const [isChecked, setIsChecked] = useState(false);
    const [date, setDate] = useState(null);
    const [events, setEvents] = useState([]);
    const { dbUser, user } = useContext(AuthContext);
    const [dataLoading, setDataLoading] = useState(false);
    const [updateState, setUpdateState] = useState(false)

    useEffect(() => {
        setDataLoading(true)
        axios
            .get("http://localhost:5000/all-events")
            .then((res) => { setEvents(res.data); setDataLoading(false) })
            .catch(err => { console.log(err); setDataLoading(false) })
    }, [updateState]);

    const handleDateClick = (arg) => {
        setIsChecked(true);
        setDate(arg.dateStr);
    };



    const renderEventContent = (eventInfo) => {
        const booked = eventInfo.event._def.extendedProps.booked;
        const data = eventInfo.event._def.extendedProps._id;

        const handleEvent = () => {
            if (user === null) {
                toast.error("Login to get booking service");
                return;
            }
            if (booked) {
                toast.error('This slot is already booked');
                return;
            }
            confirmAlert({
                message: 'Are you sure to book this slot ?',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => {
                            setDataLoading(true)
                            axios
                                .put("http://localhost:5000/book-event", { data, user })
                                .then((res) => {
                                    { toast.success('Booked successfully'); setDataLoading(false); setUpdateState(!updateState) }
                                })
                                .catch(err => { console.log(err); setDataLoading(false) })
                        }
                    },
                    {
                        label: 'No',
                        onClick: () => { setDataLoading(false) }
                    }
                ]
            });
        };

        return (
            <div
                onClick={handleEvent}
                className={
                    booked
                        ? "bg-red-600 text-white !cursor-pointer"
                        : "bg-lime-400 text-white !cursor-pointer"
                }
            >
                <div>
                    <b>{eventInfo.timeText}</b>
                    <br className="lg:hidden" />
                    <span className="text-xs pl-1">{eventInfo.event.title}</span>
                    <br />
                    <b>{booked ? "Slot booked" : "Not booked"}</b>
                </div>
               
            </div>
        );
    }

    if (dataLoading) {
        return <DataLoadingSpinner />;
    }

    return (
        <div className="py-10 px-4 max-w-[800px] mx-auto">
            <div data-aos="zoom-in" data-aos-duration="2000" className="pb-8">
                <img src={image} className='lg:h-[650px] mx-auto brightness-110' alt="" />
            </div>
            <h1>Schedule</h1>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                weekends={false}
                events={events}
                eventContent={renderEventContent}
                dateClick={(event) => handleDateClick(event)}
            />
            <input
                type="checkbox"
                id="selectDate"
                checked={isChecked}
                className="modal-toggle"
            />
            <BookingModal setIsChecked={setIsChecked} date={date} dbUser={dbUser} setUpdateState={setUpdateState} updateState={updateState}></BookingModal>
            
        </div>
    );
}

export default Blooking;


