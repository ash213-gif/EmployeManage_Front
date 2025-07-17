import React from 'react';

export default function Settings() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl shadow-purple-200/50 overflow-hidden">
        <main className="p-8 sm:p-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-500 mb-10">Manage your account and preferences.</p>
          
          {/* Account Section */}
          <section className="mb-12">
            <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-4 mb-6">Account</h3>
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-medium">Email</span>
                <span className="font-semibold text-gray-800">sophia.miller@email.com</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-medium">Password</span>
                <button className="font-semibold text-indigo-600 hover:text-indigo-500 text-sm transition-colors duration-300">Change password</button>
              </div>
            </div>
          </section>

          {/* Notifications Section */}
          <section className="mb-12">
            <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-4 mb-6">Notifications</h3>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 font-medium">Enable Notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" defaultChecked/>
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          </section>

          {/* Preferences Section */}
          <section className="mb-12">
            <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-4 mb-6">Preferences</h3>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 font-medium">Language</span>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-800">English</span>
                <button className="font-semibold text-indigo-600 hover:text-indigo-500 text-sm transition-colors duration-300">Change</button>
              </div>
            </div>
          </section>
          
          {/* Logout Section */}
          <div className="mt-12 border-t border-gray-200 pt-8">
            <button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 px-4 rounded-xl transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
              Log Out
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

