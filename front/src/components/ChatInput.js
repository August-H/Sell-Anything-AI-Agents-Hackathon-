import React, { useState, useRef, useCallback, useEffect, memo } from 'react';
import { Paperclip, Send, X } from 'lucide-react';
import { useChat } from '../contexts/ChatContext';

const ChatInput = () => {
  const { sendMessage } = useChat();
  const [input, setInput] = useState('');
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  // Ensure text centering is maintained when component mounts
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.textAlign = 'center';
    }
  }, []);
  
  // Handle input change and auto-resize
  const handleInputChange = useCallback((e) => {
    setInput(e.target.value);
    // Auto-resize the textarea
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
    // Ensure text-align center is maintained
    e.target.style.textAlign = 'center';
  }, []);
  
  // Handle file upload button click
  const handleFileButtonClick = useCallback(() => {
    fileInputRef.current.click();
  }, []);
  
  // Handle file selection
  const handleFileChange = useCallback((e) => {
    if (e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file)
      }));
      
      setFiles(prev => [...prev, ...newFiles]);
    }
  }, []);
  
  // Handle removing a file
  const handleRemoveFile = useCallback((index) => {
    setFiles(files => files.filter((_, i) => i !== index));
  }, []);
  
  // Handle sending the message
  const handleSendMessage = useCallback(() => {
    if (input.trim() === '' && files.length === 0) return;
    
    sendMessage(input, files);
    
    // Clear input and files
    setInput('');
    setFiles([]);
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  }, [input, files, sendMessage]);
  
  // Handle keydown for submit on Enter (but new line on Shift+Enter)
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);
  
  return (
    <div className="p-4 bg-secondary transition-colors">
      <div className="max-w-4xl mx-auto">
        {files.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-2">
            {files.map((file, index) => (
              <div key={index} className="bg-gray-100 dark:bg-gray-800 rounded p-2 text-sm text-secondary flex items-center transition-colors">
                <Paperclip size={14} className="mr-1 flex-shrink-0" />
                <span className="truncate max-w-[200px]">{file.name}</span>
                <button 
                  className="ml-2 text-danger hover:text-danger-hover transition-colors"
                  onClick={() => handleRemoveFile(index)}
                  aria-label="Remove file"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
        
        <div className="relative">
          <textarea 
            ref={textareaRef}
            className="w-full p-3 py-4 max-h-[200px] min-h-[56px] outline-none resize-none bg-transparent text-primary text-center placeholder-gray-400 dark:placeholder-gray-500 rounded-lg"
            placeholder="Ask anything"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            rows={1}
            style={{ textAlign: 'center' }}
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              multiple 
            />
            <button 
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              onClick={handleFileButtonClick}
              aria-label="Attach files"
              title="Attach files"
            >
              <Paperclip size={20} />
            </button>
            <button 
              className={`p-2 ${input.trim() || files.length > 0 ? 'text-gray-700 dark:text-gray-200' : 'text-gray-400 dark:text-gray-600'}`}
              onClick={handleSendMessage}
              disabled={input.trim() === '' && files.length === 0}
              aria-label="Send message"
              title="Send message"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ChatInput);