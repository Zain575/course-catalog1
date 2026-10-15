"use client";

import { useState } from "react";
import type { Course } from "@/lib/courses";

type CourseListProps = {
  initialCourses: Course[];
};

export function CourseList({ initialCourses }: CourseListProps) {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [credits, setCredits] = useState<number>(3);
  const [isElective, setIsElective] = useState(false);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, credits, isElective }),
      });
      if (!res.ok) throw new Error();
      const newCourse: Course = await res.json();
      setCourses([...courses, newCourse]);
      setTitle("");
      setDescription("");
    } catch {
      alert("Failed to create course");
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      setCourses(courses.filter((c) => c.id !== id));
    } catch {
      alert("Failed to delete course");
    }
  }

  return (
    <div>
      <form onSubmit={handleAdd} className="mb-6 flex flex-col gap-2 max-w-md">
        <input
          type="text"
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Credits"
          value={credits}
          onChange={(e) => setCredits(Number(e.target.value))}
          className="border p-2 rounded"
          required
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isElective}
            onChange={(e) => setIsElective(e.target.checked)}
          />
          Elective course
        </label>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Course
        </button>
      </form>

      <ul className="space-y-2">
        {courses.map((c) => (
          <li key={c.id} className="border p-4 rounded flex justify-between items-center">
            <div>
              <h3 className="font-bold">{c.title}</h3>
              <p className="text-sm text-gray-600">{c.description}</p>
              <p className="text-xs">Credits: {c.credits} {c.isElective && "· Elective"}</p>
            </div>
            <button
              onClick={() => handleDelete(c.id)}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}