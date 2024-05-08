/*


// other component 

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles


const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });


export default function QuillEditorComponent({editorContent, setEditorContent}) {

const quillModules = {
toolbar: [
[{ header: [1, 2, 3, false] }],
['bold', 'italic', 'underline', 'strike', 'blockquote'],
[{ list: 'ordered' }, { list: 'bullet' }],
['link', 'image'],
[{ align: [] }],
[{ color: [] }],

['clean'],
],
};

const quillFormats = [
'header',
'bold',
'italic',
'underline',
'strike',
'blockquote',
'list',
'bullet',
'link',
'image',
'align',
'color',
'code-block',

];

const handleEditorChange = (newContent) => {
    setEditorContent(newContent);
};


  return (<>
  

    <QuillEditor
    value={editorContent}
    onChange={handleEditorChange}
    modules={quillModules}
    formats={quillFormats}

  />
    </>
  );
}





another component :


 <QuillEditorComponent
             setEditorContent={setEditorContent}
             editorContent={editorContent}
            />

  ****************************** show jsx ***************************

  <div dangerouslySetInnerHTML={ { __html: singleProduct?.product?.description }}></div>

*/