'use client';
import { useState, useEffect } from 'react';
import { useUser } from "@clerk/nextjs"; // 👈 add this

export default function AddTodo() {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);

  const { user } = useUser(); // 👈 get Clerk user

  const fetchTodos = async () => {
    try {
      const res = await fetch("/api/todos");
      const data = await res.json();
      if (data.success) {
        setTodos(data.data);
      }
    } catch (err) {
      console.error("❌ Failed to fetch todos:", err);
    }
  };

  const handleAddTodo = async () => {
    if (!title.trim() || !user?.id) return;

    setLoading(true);
    try {
      const res = await fetch("/api/todos/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          userId: user.id, // 👈 send userId
        }),
      });

      const data = await res.json();
      if (data.success) {
        setTitle('');
        fetchTodos(); // refresh list after adding
      }
    } catch (err) {
      console.error("❌ Failed to add todo:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos(); // initial load
  }, []);

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2"
        />
        <button
          onClick={handleAddTodo}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 ml-2 rounded"
        >
          {loading ? 'Adding...' : 'Add Todo'}
        </button>
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-semibold">Your Todos:</h2>
        {todos.length === 0 ? (
          <p className="text-gray-500 mt-2">No todos found.</p>
        ) : (
          <ul className="list-disc ml-5">
            {todos.map((todo: any) => (
              <li key={todo._id} className="mt-1">
                {todo.title} {todo.completed ? "✅" : ""}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
