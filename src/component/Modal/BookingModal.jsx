import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import DataLoadingSpinner from "../DataLoadingSpinner/DataLoadingSpinner";

export default function BookingModal({ setIsChecked, date, dbUser, updateState, setUpdateState }) {
    const [dataLoading, setDataLoading] = useState(false);
    const handleForm = (e) => {
        e.preventDefault();

        const now = new Date();
        now.setHours(0, 0, 0, 0);
        if (dbUser === null) {
            toast.error("Login to get booking service");
            return;
        }

        if (dbUser.role !== "admin") {
            toast.error("Only Admin can add slot !");
            return;
        }

        const form = e.target;
        const time = form.time.value;
        const date = form.SelectedDate.value;
        const title = form.title.value;

        if (new Date(date) < now) {
            toast.error("Selected date is in the past");
            return;
        }
        setDataLoading(true)
        axios
            .post("https://dev-soft-task.vercel.app/add-event", {
                title,
                start: new Date(`${date} ${time} GMT+0600 (East Kazakhstan Time)`),
            })
            .then((res) => {
                setIsChecked(false);
                toast.success("Slot created successfully");
                form.reset();
                setDataLoading(false);
                setUpdateState(!updateState);
            })
            .catch(err => { console.log(err); setDataLoading(false) })
    };

    if (dataLoading) {
        return <DataLoadingSpinner />;
    }

    return (
        <div className="modal">
            <div className="modal-box relative">
                <label
                    htmlFor="selectDate"
                    className="btn btn-sm btn-circle absolute right-2 top-2"
                    onClick={() => setIsChecked(false)}
                >
                    ✕
                </label>
                <form action="" onSubmit={(e) => handleForm(e)} className='flex flex-col mt-8'>
                    <input required type="time" name="time" placeholder="Time Slot" />
                    <input required type="text" name="SelectedDate" value={date} />
                    <input required type="text" name="title" />
                    <input type="submit" value="submit" className="my-2 btn bg-amber-300 text-black hover:text-white" />
                </form>
            </div>
        </div>
    );
}
