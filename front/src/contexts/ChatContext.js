import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';

// Create chat context
const ChatContext = createContext();

// Custom hook to use the chat context
export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

// Chat provider component
export const ChatProvider = ({ children }) => {
  // State variables
  const [conversations, setConversations] = useState([
    { id: '1', title: 'Previous Chat 1', date: '2 days ago' },
    { id: '2', title: 'Previous Chat 2', date: '1 week ago' },
    { id: '3', title: 'Previous Chat 3', date: '2 weeks ago' },
  ]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768); // Default to open on larger screens
  const messagesEndRef = useRef(null);
  
  // Create a new chat
  const createNewChat = useCallback(() => {
    const newChatId = Math.random().toString(36).substring(2, 9);
    setCurrentChat(newChatId);
    setMessages([]);
  }, []);
  
  // Auto-scroll to bottom of messages
  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);
  
  // Effect to auto-scroll on new messages
  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, scrollToBottom]);
  
  // Toggle sidebar
  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);
  
  // Add a message
  const addMessage = useCallback((role, content, files = []) => {
    // Create a new chat if one doesn't exist
    if (!currentChat) {
      createNewChat();
    }
    
    // Create the message
    const newMessage = {
      id: Date.now().toString(),
      role,
      content,
      files: [...files], 
      timestamp: new Date().toISOString()
    };
    
    setMessages(prevMessages => [...prevMessages, newMessage]);
    
    // If it's the first user message, add to conversations list
    if (role === 'user' && messages.length === 0) {
      const newTitle = content.length > 30 ? content.substring(0, 30) + '...' : content;
      const newConversation = {
        id: currentChat,
        title: newTitle,
        date: 'Just now'
      };
      setConversations(prev => [newConversation, ...prev]);
    }
    
    return newMessage;
  }, [currentChat, createNewChat, messages.length]);
  
  // Send user message and get AI response
  const sendMessage = useCallback((content, files = []) => {
    if (!content.trim() && files.length === 0) return;
    
    // Add user message
    addMessage('user', content, files);
    
    // Simulate AI response (would be replaced with actual API call)
    setIsLoading(true);
    setTimeout(() => {
      addMessage('assistant', `This is a simulated response to: "${content}"`);
      setIsLoading(false);
    }, 1000);
  }, [addMessage]);
  
  // Load a conversation
  const loadConversation = useCallback((id) => {
    setCurrentChat(id);
    // This would typically load the conversation from an API
    // For this demo, we'll just simulate a conversation
    setMessages([
      {
        id: '1',
        role: 'user',
        content: 'This is a previous message from conversation ' + id,
        timestamp: new Date().toISOString()
      },
      {
        id: '2',
        role: 'assistant',
        content: 'This is a response in conversation ' + id,
        timestamp: new Date().toISOString()
      }
    ]);
  }, []);
  
  // Provide the context
  return (
    <ChatContext.Provider value={{
      conversations,
      currentChat,
      messages,
      isLoading,
      sidebarOpen,
      messagesEndRef,
      createNewChat,
      scrollToBottom,
      toggleSidebar,
      addMessage,
      sendMessage,
      loadConversation
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext;