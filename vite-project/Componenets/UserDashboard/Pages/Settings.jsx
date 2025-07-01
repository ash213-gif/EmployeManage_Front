import React from 'react';


export default function Settings() {
  return (
    <div className='settingbody' >

    <div className="settings-root">
      
      <main className="settings-main">
        <h1>Settings</h1>
        <section className="settings-section">
          <h3>Account</h3>
          <div className="settings-row">
            <span className="settings-label">Email</span>
            <span className="settings-value">sophia.miller@email.com</span>
          </div>
          <div className="settings-row">
            <span className="settings-label">Password</span>
            <span className="settings-value">********</span>
          </div>
        </section>
        <section className="settings-section">
          <h3>Notifications</h3>
          <div className="settings-row">
            <span className="settings-label">Enable Notifications</span>
            <input type="checkbox" />
          </div>
        </section>
        <section className="settings-section">
          <h3>Preferences</h3>
          <div className="settings-row">
            <span className="settings-label">Language</span>
            <span className="settings-value">English</span>
          </div>
        </section>
        <div className="settings-logout">
          <button>Log Out</button>
        </div>
      </main>
    </div>
        </div>

  );
}