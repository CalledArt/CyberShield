import React, { useEffect, useState } from "react";
import axios from 'axios';


export default function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
        setPosts(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="p-6 font-sans">
      <h1 className="text-2xl font-bold mb-4">📦 JSONPlaceholder Posts (Axios)</h1>
      {loading && <p>Loading posts...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {!loading && !error && (
        <ul className="space-y-4">
          {posts.slice(0, 10).map((post) => (
            <li key={post.id} className="border p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold">{post.title}</h2>
              <p className="text-gray-700">{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
