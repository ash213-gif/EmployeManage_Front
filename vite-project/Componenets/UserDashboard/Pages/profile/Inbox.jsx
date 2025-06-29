import React from 'react';

const Inbox = () => {
  return (
    <div className="inbox">
      <h2>Inbox</h2>
      <ul>
        <li>
          <img src="stephanie.jpg" alt="Stephanie" />
          <p>I got your first assignment. It was quite good</p>
        </li>
        <li>
          <img src="william.jpg" alt="William" />
          <p>I want some changes in previous work you sent me. Waiting for your reply.</p>
        </li>
      </ul>
    </div>
  );
};

export default Inbox;