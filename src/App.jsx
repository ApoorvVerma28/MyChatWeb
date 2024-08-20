import { useEffect } from "react";
import { useState } from "react";
import "./index.css";
import { push, set, ref, onChildAdded } from "firebase/database";
import { db } from "./firebaseConfig";
import { googleLogin } from "./auth"; 

const App = () => {
  const [user, setUser] = useState("");
  const [chats, setChats] = useState([]);
  const [msg, setMsg] = useState("");

  const chatListRef = ref(db, "chats");

  const heightControl = () => {
    const chat = document.getElementById("chat");
    if (chat){
      chat.scrollTop= chat.scrollHeight;
    }
   
  }
  useEffect(() => {
    // Adding the listener once
    const unsubscribe = onChildAdded(chatListRef, (data) => {
        setChats((chats) => [...chats, data.val()]);
        setTimeout(() => {
            heightControl();
        }, 100);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
}, []);

  const sendChat = () => {
    const chatPostRef = push(chatListRef);
    set(chatPostRef, {
      user,
      message: msg,
    });
    setMsg("");
  };

  return (
    <>
      {user.email? null:
        <div className="InputNameDiv">
          {/* <input
            className="InputName"
            type="text"
            placeholder="Enter your name to Start Chat"
            onBlur={(e) => setName(e.target.value)}
          /> */}
          <button className="InputName" onClick={e=>{googleLogin(setUser)}}>Google SignIn</button>
        </div>
      }

      {user.email? (
        <div>
          <h2 className="user">User: {user.name}</h2>
          <div id="chat" className="chat-container">
            {chats.map((c, i) => (
              <div
                key={i}
                className={`container ${c.user.email === user.email ? "me" : ""}`}
              >
                <p className="chatbox">
                  <strong>{c.user.name}: </strong>
                  <span>{c.message}</span>
                </p>
              </div>
            ))}
          </div>
          <div className="btn">
            <input
              type="text"
              onInput={(e) => setMsg(e.target.value)}
              value={msg}
              placeholder="Enter your message"
            />
            <button onClick={(e) => sendChat()}>Send</button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default App;
