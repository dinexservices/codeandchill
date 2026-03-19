"use client";

import { useState } from "react";
import RichTextEditor from "./RichTextEditor.js";

export default function CreateEventModal({ onClose }) {
  const [form, setForm] = useState({
    title: "",
    shortDescription: "",
    longDescription: "",
    eventDate: "",
    durationHours: "",
    location: "",
    registrationFee: "",
    registrationLink: "",
    coverImage: "",
    highlights: [],
    domains: [],
    tags: [],
  });

  const [highlightInput, setHighlightInput] = useState("");
  const [domainInput, setDomainInput] = useState("");
  const [tagInput, setTagInput] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addToArray = (key, value, setter) => {
    if (!value.trim()) return;

    setForm((prev) => ({
      ...prev,
      [key]: [...prev[key], value.trim()],
    }));

    setter("");
  };

  const removeFromArray = (key, index) => {
    setForm((prev) => ({
      ...prev,
      [key]: prev[key].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/events/event-create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        },
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      alert("Event Created Successfully!");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to create event");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="bg-gray-900 sm:w-[800px] md:w-[800px] lg:w-[1200px] max-h-[90vh] overflow-y-auto p-6 rounded-xl no-scrollbar">
        <h2 className="text-2xl font-bold mb-6">Create Event</h2>

        {/* Title */}
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full mb-4 p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition"
        />

        {/* Short Description */}
        <RichTextEditor
          value={form.shortDescription}
          onChange={(val) => setForm({ ...form, shortDescription: val })}
          className="w-full mb-4 p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-4"
        />
        <div className="w-full mb-2 p-1"></div>

        {/* Long Description */}
        <RichTextEditor
          value={form.longDescription}
          onChange={(val) => setForm({ ...form, longDescription: val })}
          className="w-full mb-4 p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition"
        />

        <div className="w-full mb-2 p-1"></div>




        <div className="flex flex-row gap-5"> 
            {/* Date */}
            <input
              type="datetime-local"
              name="eventDate"
              value={form.eventDate}
              onChange={handleChange}
              className="w-full mb-4 p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition"
            />
            {/* Duration */}
            <input
              type="text"
              name="durationHours"
              placeholder="Duration (hours)"
              value={form.durationHours}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setForm({ ...form, durationHours: value });
                }
              }}
              className="w-full mb-4 p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition"
            />
        </div>

        <div className="flex flex-row gap-5">
            {/* Location */}
            <input
              name="location"
              placeholder="Location"
              value={form.location}
              onChange={handleChange}
              className="w-full mb-4 p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition"
            />
            {/* Registration Fee */}
            <input
              type="text"
              name="registrationFee"
              placeholder="Registration Fee (₹)"
              value={form.registrationFee}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setForm({ ...form, registrationFee: value });
                }
              }}
              className="w-full mb-4 p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition"
            />
        </div>

        {/* Cover Image */}
        {/* <input
          name="coverImage"
          placeholder="Cover Image URL"
          value={form.coverImage}
          onChange={handleChange}
          className="w-full mb-4 p-2 bg-gray-800 rounded"
        /> */}

        {/* Highlights */}
        <div className="mb-6">
          <div className="flex gap-2">
            <input
              value={highlightInput}
              onChange={(e) => setHighlightInput(e.target.value)}
              placeholder="Add Highlight"
              className="w-full mb-4 p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition"
            />
            <button
              type="button"
              onClick={() =>
                addToArray("highlights", highlightInput, setHighlightInput)
              }
              className="bg-blue-600 mb-4 p-3 rounded"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            {form.highlights.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-gray-700 px-3 py-1 rounded-full text-sm"
              >
                {item}
                <button
                  type="button"
                  onClick={() => removeFromArray("highlights", index)}
                  className="text-red-400 hover:text-red-600"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Domains */}
        <div className="mb-6">
          <label className="block mb-2 text-gray-300 font-medium">
            Domains
          </label>

          <div className="flex gap-2">
            <input
              value={domainInput}
              onChange={(e) => setDomainInput(e.target.value)}
              placeholder="Add Domain"
              className="w-full mb-4 p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition"
            />
            <button
              type="button"
              onClick={() => addToArray("domains", domainInput, setDomainInput)}
              className="bg-blue-600 mb-4 p-3 rounded"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            {form.domains.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-gray-700 px-3 py-1 rounded-full text-sm"
              >
                {item}
                <button
                  type="button"
                  onClick={() => removeFromArray("domains", index)}
                  className="text-red-400 hover:text-red-600"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="mb-6">
          <label className="block mb-2 text-gray-300 font-medium">Tags</label>

          <div className="flex gap-2">
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Add Tag"
              className="w-full mb-4 p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition"
            />
            <button
              type="button"
              onClick={() => addToArray("tags", tagInput, setTagInput)}
              className="bg-blue-600 mb-4 p-3 rounded"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            {form.tags.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-gray-700 px-3 py-1 rounded-full text-sm"
              >
                {item}
                <button
                  type="button"
                  onClick={() => removeFromArray("tags", index)}
                  className="text-red-400 hover:text-red-600"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button onClick={onClose} className="bg-gray-600 px-4 py-2 rounded">
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-green-600 px-4 py-2 rounded"
          >
            Create Event
          </button>
        </div>
      </div>
    </div>
  );
}
