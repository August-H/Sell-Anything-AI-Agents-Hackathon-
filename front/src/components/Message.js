import React, { memo } from 'react';
import { Paperclip } from 'lucide-react';

// User avatar component
const UserAvatar = () => (
  <div className="w-10 h-10 rounded-full avatar-user flex items-center justify-center text-white flex-shrink-0 shadow-sm">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2a7.2 7.2 0 01-6-3.22c.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08a7.2 7.2 0 01-6 3.22z" clipRule="evenodd" />
    </svg>
  </div>
);

// Assistant avatar component
const AssistantAvatar = () => (
  <div className="w-10 h-10 rounded-full avatar-assistant flex items-center justify-center text-white flex-shrink-0 shadow-sm">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 1.5c4.68 0 8.5 3.82 8.5 8.5 0 4.68-3.82 8.5-8.5 8.5-4.68 0-8.5-3.82-8.5-8.5 0-4.68 3.82-8.5 8.5-8.5zM7 13.75c.69 1.97 2.56 3.38 4.75 3.47v1.28c0 .28.22.5.5.5s.5-.22.5-.5v-1.28c2.19-.09 4.06-1.5 4.75-3.47h-1.08c-.64 1.48-2.09 2.5-3.77 2.5-1.69 0-3.14-1.02-3.77-2.5H7z" />
      <path d="M13.5 9c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5z" />
    </svg>
  </div>
);

// FileAttachment component
const FileAttachment = ({ file }) => (
  <div className="bg-gray-100 dark:bg-gray-700 rounded p-2 text-sm text-secondary flex items-center transition-colors">
    <Paperclip size={14} className="mr-1 flex-shrink-0" />
    <span className="truncate max-w-[200px]">{file.name}</span>
  </div>
);

// Message component
const Message = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div 
      className={`py-5 transition-theme ${isUser ? 'bg-secondary' : 'bg-accent'}`}
    >
      <div className="max-w-4xl mx-auto px-4 flex">
        {isUser ? <UserAvatar /> : <AssistantAvatar />}
        <div className="ml-4 flex-1 overflow-hidden">
          <div className="text-primary break-words whitespace-pre-wrap overflow-wrap-anywhere transition-theme">
            {message.content}
          </div>
          {message.files && message.files.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {message.files.map((file, index) => (
                <FileAttachment key={index} file={file} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Use memo to prevent unnecessary re-renders
export default memo(Message);