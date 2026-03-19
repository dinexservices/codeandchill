"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchEvents = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/events/all`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setEvents(Array.isArray(data.events) ? data.events : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEvents(); }, []);

  const handleDelete = async (e, eventId) => {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm("⚠️ Permanently delete this event and deactivate all its tickets?")) return;
    setDeletingId(eventId);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/events/event-delete/${eventId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed");
      showToast("success", "Event deleted!");
      setEvents(prev => prev.filter(ev => ev._id !== eventId));
    } catch (err) {
      showToast("error", err.message || "Could not delete event");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="h-full flex flex-col bg-black pt-2 px-6 gap-4">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-xl text-sm font-medium shadow-lg ${toast.type === "success" ? "bg-emerald-600" : "bg-red-600"} text-white`}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between h-12 px-4">
        <h1 className="text-white font-semibold text-lg">All Events</h1>
        <button
          onClick={() => router.push("/events/create")}
          className="text-white text-sm bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded-lg transition shadow-lg shadow-blue-600/20"
        >
          + Create Event
        </button>
      </div>

      {/* Events Grid */}
      <div className="h-full mx-auto py-8 w-full">
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-gray-800 rounded-xl overflow-hidden animate-pulse">
                <div className="h-40 bg-gray-700" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-700 rounded w-3/4" />
                  <div className="h-3 bg-gray-700 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-gray-400 text-lg mb-4">No events yet.</p>
            <button
              onClick={() => router.push("/events/create")}
              className="text-white text-sm bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl transition"
            >
              Create your first event
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-gray-800 text-white rounded-xl overflow-hidden shadow-lg flex flex-col group relative"
              >
                {/* Cover */}
                <Link href={`/event/${event._id}`} className="block">
                  <div className="h-40 bg-gray-700 overflow-hidden">
                    <img
                      src={event.coverImage}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="p-4 pb-2">
                    <h2 className="font-semibold text-sm leading-tight line-clamp-2">{event.title}</h2>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">{event.shortDescription}</p>
                  </div>
                </Link>

                {/* Action Buttons */}
                <div className="flex gap-1.5 px-4 pb-4 mt-auto pt-2 border-t border-gray-700">
                  {/* Edit */}
                  <Link href={`/events/edit/${event._id}`}
                    className="flex-1 text-center py-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 border border-blue-500/30 rounded-lg hover:bg-blue-500/10 transition">
                    ✏️ Edit
                  </Link>

                  {/* Tickets */}
                  <Link href={`/event/${event._id}/tickets`}
                    className="flex-1 text-center py-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 border border-emerald-500/30 rounded-lg hover:bg-emerald-500/10 transition">
                    🎟️
                  </Link>

                  {/* Delete */}
                  <button
                    type="button"
                    onClick={(e) => handleDelete(e, event._id)}
                    disabled={deletingId === event._id}
                    className="flex-1 text-center py-1.5 text-xs font-semibold text-red-400 hover:text-red-300 border border-red-500/30 rounded-lg hover:bg-red-500/10 transition disabled:opacity-50"
                  >
                    {deletingId === event._id ? "..." : "🗑️"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
