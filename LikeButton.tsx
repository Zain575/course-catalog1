"use client";

import { useState } from "react";
import type { Course } from "@/lib/courses";

const API = process.env.NEXT_PUBLIC_API_URL;

type LikeButtonProps = {
  courseId: string;
  initialLikes: number;
};

export function LikeButton({ courseId, initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState<number>(initialLikes);
  const [failed, setFailed] = useState(false);

  async function handleClick() {
    setFailed(false);
    try {
      const res = await fetch(`${API}/courses/${courseId}/like`, {
        method: "POST",
      });
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const course: Course = await res.json();
      setLikes(course.likes);
    } catch {
      setFailed(true);
    }
  }

  return (
    <div>
      <button
        onClick={handleClick}
        className="rounded-md border border-slate-300 px-3 py-1 bg-white hover:bg-gray-50"
      >
        ❤ {likes}
      </button>
      {failed && <p className="text-red-600 text-sm mt-1">Failed to like the course</p>}
    </div>
  );
}