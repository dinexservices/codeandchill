"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventById, clearCurrentEvent } from "@/store/slices/eventSlice";
import EditableEvent from "./EditableEvent";
import { useParams } from "next/navigation";

export default function EventPage() {
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const { currentEvent, loading } = useSelector((state) => state.events);

  useEffect(() => {
    if (eventId) {
      dispatch(fetchEventById(eventId));
    }
    return () => {
      dispatch(clearCurrentEvent());
    };
  }, [dispatch, eventId]);

  if (loading) {
    return <div className="min-h-screen bg-black text-white p-10 flex items-center justify-center">Loading event...</div>;
  }

  if (!currentEvent) {
    return <div className="min-h-screen bg-black text-red-500 p-10 flex items-center justify-center">Event not found</div>;
  }

  return <EditableEvent initialEvent={currentEvent} />;
}
