"use client";

import Toast from "@/component/Toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { updateEvent } from "@/store/slices/eventSlice";

export default function EditableEvent({ initialEvent }) {
  const router = useRouter();
  const [event, setEvent] = useState(initialEvent);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
  };

  const dispatch = useDispatch();

  const handleSave = async () => {
    try {
      setLoading(true);

      await dispatch(updateEvent({
        eventId: event._id,
        eventData: event
      })).unwrap();

      setIsEditing(false);
      setToast({
        message: "Event Updated Successfully!",
        type: "success",
      });
    } catch (err) {
      console.error(err);
      setToast({
        message: "Event Updated Failed!",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">
      {/* Cover Image */}
      {isEditing ? (
        <input
          type="text"
          name="coverImage"
          value={event.coverImage}
          onChange={handleChange}
          className="w-full p-2 mb-4 bg-gray-800 rounded"
        />
      ) : (
        <img
          src={event.coverImage}
          alt={event.title}
          className="w-full max-h-[400px] object-cover rounded-xl mb-6"
        />
      )}

      {/* Title */}
      {isEditing ? (
        <input
          type="text"
          name="title"
          value={event.title}
          onChange={handleChange}
          className="text-4xl font-bold mb-4 bg-gray-800 p-2 rounded w-full"
        />
      ) : (
        <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
      )}

      {/* Date */}
      {isEditing ? (
        <input
          type="date"
          name="eventDate"
          value={event.eventDate?.split("T")[0]}
          onChange={handleChange}
          className="bg-gray-800 p-2 rounded mb-4"
        />
      ) : (
        <p className="text-gray-400 mb-4">
          {new Date(event.eventDate).toLocaleDateString("en-IN")}
        </p>
      )}

      {/* Description */}
      {isEditing ? (
        <textarea
          name="longDescription"
          value={event.longDescription}
          onChange={handleChange}
          className="w-full bg-gray-800 p-2 rounded mb-6"
          rows={4}
        />
      ) : (
        <p className="mb-6">{event.longDescription}</p>
      )}

      {/* Location */}
      <div className="bg-gray-800 p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-2">Location</h2>
        {isEditing ? (
          <input
            type="text"
            name="location"
            value={event.location}
            onChange={handleChange}
            className="w-full bg-gray-700 p-2 rounded"
          />
        ) : (
          <p>{event.location}</p>
        )}

        <h2 className="text-xl font-semibold mt-4 mb-2">Registration Fee</h2>

        {isEditing ? (
          <input
            type="number"
            name="registrationFee"
            value={event.registrationFee}
            onChange={handleChange}
            className="w-full bg-gray-700 p-2 rounded"
          />
        ) : (
          <p>₹ {event.registrationFee}</p>
        )}
      </div>

      {/* Buttons */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={() => router.push(`/events/edit/${event._id}`)}
          className="bg-purple-600 hover:bg-purple-500 px-6 py-2 rounded"
        >
          ✏️ Edit Full Event
        </button>
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              disabled={loading}
              className="bg-green-600 px-6 py-2 rounded"
            >
              {loading ? "Saving..." : "Save"}
            </button>

            <button
              onClick={() => setIsEditing(false)}
              className="bg-red-600 px-6 py-2 rounded"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 px-6 py-2 rounded"
          >
            Edit Event
          </button>
        )}
      </div>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
