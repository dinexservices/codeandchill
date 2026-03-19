"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function UsersPage() {
  const { eventId } = useParams();

  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/events/participation/${eventId}`,
        );

        if (!res.ok) throw new Error("Failed to fetch participants");

        const data = await res.json();

        // 🔥 FIX HERE
        setParticipants(data.data || []);
      } catch (err) {
        console.error(err);
        setError("Unable to load participants");
      } finally {
        setLoading(false);
      }
    };

    if (eventId) fetchParticipants();
  }, [eventId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading participants...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-red-500 flex items-center justify-center">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Event Participants</h1>

        <div className="bg-blue-600 px-4 py-2 rounded-lg font-semibold">
          Total: {participants.length}
        </div>
      </div>

      {participants.length === 0 ? (
        <p className="text-gray-400">No participants yet.</p>
      ) : (
        <div className="w-full">
          {/* ================= MOBILE VIEW ================= */}
          <div className="md:hidden space-y-4">
            {participants.map((user, index) => (
              <div
                key={index}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-4 shadow-lg hover:shadow-xl transition duration-300"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-white font-semibold text-base">
                    {user.name}
                  </h3>
                  <span className="text-xs text-gray-400">#{index + 1}</span>
                </div>

                <div className="space-y-2 text-sm text-gray-400">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Registration</span>
                    <span className="bg-gray-800 px-2 py-1 rounded-md text-xs">
                      {user.registrationNumber}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Email</span>
                    <span className="truncate max-w-[150px]">{user.email}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Phone</span>
                    <span>{user.phoneNum || user.phone}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">College</span>
                    <span className="truncate max-w-[150px]">
                      {user.collegeName || user.college}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ================= TABLET + DESKTOP VIEW ================= */}
          <div className="hidden md:block">
            <div className="overflow-x-auto rounded-2xl border border-gray-800 bg-gray-950 shadow-xl">
              <table className="min-w-full text-sm text-gray-300">
                {/* Header */}
                <thead className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-400 uppercase text-xs tracking-wider sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-4 text-left">#</th>
                    <th className="px-6 py-4 text-left">Name</th>
                    <th className="px-6 py-4 text-left">Registration No.</th>
                    <th className="px-6 py-4 text-left">Email</th>
                    <th className="px-6 py-4 text-left">Phone</th>
                    <th className="px-6 py-4 text-left">College</th>
                  </tr>
                </thead>

                {/* Body */}
                <tbody className="divide-y divide-gray-800">
                  {participants.map((user, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-900/60 transition duration-200"
                    >
                      <td className="px-6 py-4 text-gray-500">{index + 1}</td>

                      <td className="px-6 py-4 font-semibold text-white">
                        {user.name}
                      </td>

                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full bg-gray-800 text-gray-300 text-xs">
                          {user.registrationNumber}
                        </span>
                      </td>

                      <td className="px-6 py-4 max-w-[200px] truncate">
                        {user.email}
                      </td>

                      <td className="px-6 py-4">{user.phoneNum || user.phone}</td>

                      <td className="px-6 py-4">{user.collegeName || user.college}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
