import React from "react";
import { Bell, HelpCircle, Search } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // Example click handlers
  const handleSearchClick = () => {
    alert("Search clicked - You can open a search input or modal.");
  };

  const handleHelpClick = () => {
    alert("Help clicked - You can show FAQs or help modal.");
  };

  const handleNotificationClick = () => {
    alert("Notifications clicked - You can show notification list.");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md px-4 py-3 md:px-6 flex items-center justify-between">
        {/* App Title */}
        <h1 className="text-lg md:text-2xl font-bold text-gray-800">DemoApp</h1>

        {/* Icon Actions */}
        <div className="flex items-center gap-4 md:gap-6 text-gray-600">
          <button
            onClick={handleSearchClick}
            className="hover:text-gray-800 transition"
            aria-label="Search"
          >
            <Search className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button
            onClick={handleHelpClick}
            className="hover:text-gray-800 transition"
            aria-label="Help"
          >
            <HelpCircle className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button
            onClick={handleNotificationClick}
            className="hover:text-gray-800 transition"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1 px-4 py-4 md:px-6">{children}</main>
    </div>
  );
};

export default Layout;
