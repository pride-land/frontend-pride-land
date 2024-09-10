import React, { ReactNode } from 'react';

interface ContentProps {
  content: ReactNode;
}

const Content: React.FC<ContentProps> = ({ content }) => {
  return (
    <div>
      {content}
    </div>
  );
};

export default Content;
