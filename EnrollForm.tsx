"use client";

import { useState, type FormEvent } from "react";
import type { Enrollment } from "@/lib/courses";

const API = process.env.NEXT_PUBLIC_API_URL;

type EnrollFormProps = {
  courseId: string;
};

type Status = "idle" | "sending" | "done" | "rejected" | "error";

export function EnrollForm({ courseId }: EnrollFormProps) {
  const [studentName, setStudentName] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(`${API}/enrollments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseId, studentName }),
      });
      if (res.status === 422) {
        const errData = await res.json();
        setMessage(errData.detail[0].msg);
        setStatus("rejected");
        return;
      }
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const enrollment: Enrollment = await res.json();
      setMessage(`Enrollment number: ${enrollment.id}`);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-sm flex-col gap-2 mt-6">
      <h3 className="font-semibold text-lg">Enroll in this course</h3>
      <label htmlFor="studentName" className="text-sm text-gray-600">Your name</label>
      <input
        id="studentName"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        className="rounded-md border border-slate-300 px-3 py-2"
        required
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-md bg-blue-600 text-white font-medium px-3 py-2 hover:bg-blue-700 disabled:opacity-50"
      >
        {status === "sending" ? "Enrolling..." : "Enroll"}
      </button>
      {status === "done" && <p className="text-green-600 text-sm">You are enrolled. {message}</p>}
      {status === "rejected" && (
        <p className="text-red-600 text-sm">The server rejected the data: {message}</p>
      )}
      {status === "error" && (
        <p className="text-red-600 text-sm">Could not submit the enrollment</p>
      )}
    </form>
  );
}