export type Course = {
  id: string;
  title: string;
  description: string;
  credits: number;
  isElective?: boolean;
  is_elective?: boolean;
  likes: number;
};
 
export type Enrollment = {
  id: number;
  courseId: string;
  studentName: string;
};
 
const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
if (!API_URL) throw new Error("API_URL is not set: create .env.local");
 
export async function getCourses(): Promise<Course[]> {
  const res = await fetch(`${API_URL}/courses`, { cache: "no-store" });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}
 
export async function getCourse(id: string): Promise<Course | undefined> {
  const res = await fetch(`${API_URL}/courses/${id}`, { cache: "no-store" });
  if (res.status === 404) return undefined;
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function createCourse(data: any): Promise<Course> {
  const res = await fetch(`${API_URL}/courses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function deleteCourse(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/courses/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
}

export async function likeCourse(id: string): Promise<Course> {
  const res = await fetch(`${API_URL}/courses/${id}/like`, {
    method: "POST",
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}