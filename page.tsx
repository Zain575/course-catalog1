import { redirect } from "next/navigation";

export default function NewCoursePage() {
  async function handleSubmit(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const credits = Number(formData.get("credits"));
    const isElective = formData.get("isElective") === "on";

    const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

    const res = await fetch(`${API_URL}/courses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, credits, isElective }),
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    redirect("/");
  }

  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Course</h1>
      <form action={handleSubmit} className="flex flex-col gap-4">
        <input
          name="title"
          type="text"
          placeholder="Course Title"
          className="border p-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="border p-2 rounded"
          required
        />
        <input
          name="credits"
          type="number"
          placeholder="Credits"
          className="border p-2 rounded"
          required
        />
        <label className="flex items-center gap-2">
          <input name="isElective" type="checkbox" />
          Elective course
        </label>
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Save Course
        </button>
      </form>
    </main>
  );
}