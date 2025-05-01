import React, { useState, useRef, useEffect } from "react";
import { Menu, Plus, MessageSquare, Send, Moon, Sun } from "lucide-react";
import "./App.css";

export default function ChatApp() {
  /* ── state ── */
  const [chatId, setChatId] = useState(null);
  const [dark, setDark] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [threads, setThreads] = useState([]);
  const [current, setCurrent] = useState(null);
  const [msgs, setMsgs] = useState([
    {
      id: "init",
      role: "assistant",
      content:
        "I will help you sell anything to anyone; first: who do you want to reach out to and what are you offering?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEnd = useRef(null);

  /* ── effects ── */
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("darkMode", dark ? "1" : "0");
  }, [dark]);

  useEffect(() => {
    if (msgs.length) messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  /* ── helpers ── */
  const newThread = () => {
    const id = Math.random().toString(36).slice(2, 9);
    setThreads((t) => [...t, { id, title: "Untitled" }]);
    setCurrent(id);
    setMsgs([]);
  };

  const send = async () => {
    if (!input.trim()) return;
    let id = chatId;
    if (!id) {
      const r = await fetch("/chat/new", { method: "POST" });
      id = (await r.json()).chat_id;
      setChatId(id);
    }
  
    setMsgs(m => [...m, { id: Date.now()+"u", role:"user", content: input }]);
    setInput("");
    setLoading(true);
  
    const res = await fetch(`/chat/${id}`, {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ message: input })
    });
    let { reply } = await res.json();
    const aid = Date.now()+"a";
    setMsgs(m => [...m, { id: aid, role:"assistant", content: reply }]);
    setLoading(false);
  
    if (reply === "Loading…") {
      let done = false;
      while (!done) {
        await new Promise(r => setTimeout(r, 1000));
        const r = await fetch(`/chat/${id}`, { method:"POST",
          headers:{ "Content-Type":"application/json" },
          body: JSON.stringify({ message: "" }) });
        const j = await r.json();
        if (j.reply !== "Loading…") {
          done = true;
          setMsgs(m => m.map(x => x.id===aid ? { ...x, content: j.reply } : x));
        }
      }
    }
  };  

  /* ── render ── */
  return (
    <div className="app">
      {/* sidebar */}
      <aside className={`bar ${sidebarOpen ? "" : "closed"}`}>
        <div className="bar-hdr">
          <span>Sell Anything</span>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu size={20} />
          </button>
        </div>

        <button className="newchat" onClick={newThread}>
          <Plus size={16} /> {sidebarOpen && "New chat"}
        </button>

        <div className="threads">
          {threads.map((t) => (
            <button
              key={t.id}
              className={`thread ${current === t.id ? "on" : ""}`}
              onClick={() => setCurrent(t.id)}
            >
              <MessageSquare size={16} />
              {sidebarOpen && t.title}
            </button>
          ))}
        </div>

        <button className="mode" onClick={() => setDark(!dark)}>
          {dark ? <Sun size={18} /> : <Moon size={18} />}
          {sidebarOpen && (dark ? "Light" : "Dark")}
        </button>
      </aside>

      {/* main */}
      <main>
        <div className="msgs">
          {msgs.map((m) => (
            <div key={m.id} className={`msg ${m.role}`}>
              {m.content}
            </div>
          ))}
          <div ref={messagesEnd} />
        </div>

        <div className="inputBox">
          <textarea
            rows={1}
            placeholder="Type here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
          />
          <button onClick={send} disabled={!input.trim() || loading}>
            <Send size={18} />
          </button>
        </div>
      </main>
    </div>
  );
}
