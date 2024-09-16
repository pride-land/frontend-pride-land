import { useEffect } from "react";
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css'; 

const AdminTextEditor = () => {
    const { quill, quillRef } = useQuill();
   
    useEffect(() => {
        if (quill) {
            quill.on('text-change', () => {
        });
      }
    }, [quill]);
  
    return (
      <div style={{ width: 500, height: 300, marginBottom: 70}}>
        <div ref={quillRef} />
      </div>
    );
  };

  export default AdminTextEditor