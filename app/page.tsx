'use client';
import { useRef, useState } from 'react';
import Hyperbeam from '@hyperbeam/web'; // Import the SDK

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  const startBrowser = async () => {
    if (loading) return;
    setLoading(true);
    
    try {
      const res = await fetch('/api/session', { method: 'POST' });
      const data = await res.json();

      if (data.embed_url && containerRef.current) {
        // Clear any old content first
        containerRef.current.innerHTML = "";

        // Use the SDK to load the browser into your div
        await Hyperbeam(containerRef.current, data.embed_url);
        
        console.log("Hyperbeam SDK loaded successfully");
      } else {
        alert("Error: " + (data.message || "Could not get embed URL"));
      }
    } catch (error) {
      console.error("Frontend Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: '20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>My Virtual Browser</h1>
      <button 
        onClick={startBrowser}
        disabled={loading}
        style={{ 
          padding: '10px 20px', 
          marginBottom: '20px', 
          cursor: loading ? 'not-allowed' : 'pointer',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '5px'
        }}
      >
        {loading ? 'Connecting...' : 'Launch Browser'}
      </button>

      {/* The SDK will turn this div into the browser window */}
      <div 
        ref={containerRef} 
        style={{ 
          width: '90vw', 
          height: '75vh', 
          margin: '0 auto', 
          background: '#000',
          borderRadius: '8px',
          overflow: 'hidden' 
        }} 
      />
    </main>
  );
}