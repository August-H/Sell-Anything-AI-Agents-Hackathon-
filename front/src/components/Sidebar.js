import React, { memo } from 'react';
import { Menu, Plus, MessageSquare, Settings, Moon, Sun } from 'lucide-react';
import { useChat } from '../contexts/ChatContext';
import { useTheme } from '../contexts/ThemeContext';

const Sidebar = () => {
  const { 
    conversations, 
    currentChat, 
    sidebarOpen, 
    toggleSidebar, 
    createNewChat, 
    loadConversation 
  } = useChat();
  
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className={`fixed md:relative z-20 sidebar-bg sidebar-text h-full ${
      sidebarOpen ? 'w-64' : 'w-0 md:w-16'
    } transition-all duration-300 ease-in-out overflow-hidden`}>
      <div className="flex flex-col h-full">
        {/* Sidebar header */}
        <div className="p-4 border-b sidebar-border flex items-center justify-between">
          {sidebarOpen && <h1 className="text-xl font-semibold">Chat UI</h1>}
          <button 
            onClick={toggleSidebar} 
            className="p-1 rounded-md sidebar-hover"
            aria-label="Toggle sidebar"
          >
            <Menu size={sidebarOpen ? 24 : 20} className="mx-auto" />
          </button>
        </div>
        
        {/* New chat button */}
        <button 
          onClick={createNewChat}
          className={`flex items-center gap-3 p-3 m-2 rounded-md border sidebar-border sidebar-hover transition-all ${
            sidebarOpen ? '' : 'justify-center'
          }`}
          aria-label="New chat"
        >
          <Plus size={18} />
          {sidebarOpen && <span>New chat</span>}
        </button>
        
        {/* Conversations list */}
        <div className="flex-grow overflow-y-auto">
          {sidebarOpen && (
            <h2 className="px-4 py-2 text-sm text-accent font-medium">Recent chats</h2>
          )}
          <div className="space-y-1 px-2">
            {conversations.map(conv => (
              <button 
                key={conv.id}
                onClick={() => loadConversation(conv.id)}
                className={`w-full text-left flex items-center gap-3 px-2 py-3 rounded-md sidebar-hover transition-all ${
                  currentChat === conv.id ? 'sidebar-active' : ''
                } ${sidebarOpen ? '' : 'justify-center'}`}
                aria-label={`Load chat: ${conv.title}`}
              >
                <MessageSquare size={18} />
                {sidebarOpen && (
                  <div className="flex-grow overflow-hidden">
                    <div className="truncate">{conv.title}</div>
                    <div className="text-xs text-accent">{conv.date}</div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
        
        {/* Theme toggle and settings */}
        <div className="p-4 border-t sidebar-border">
          {/* Theme toggle button */}
          <button 
            onClick={toggleTheme}
            className={`flex items-center gap-3 p-2 mb-2 rounded-md sidebar-hover w-full ${
              sidebarOpen ? '' : 'justify-center'
            }`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' 
              ? <Sun size={18} className="text-yellow-300" /> 
              : <Moon size={18} className="text-indigo-400" />
            }
            {sidebarOpen && <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>}
          </button>
          
          {/* Settings button */}
          <button 
            className={`flex items-center gap-3 p-2 rounded-md sidebar-hover w-full ${
              sidebarOpen ? '' : 'justify-center'
            }`}
            aria-label="Settings"
          >
            <Settings size={18} />
            {sidebarOpen && <span>Settings</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(Sidebar);