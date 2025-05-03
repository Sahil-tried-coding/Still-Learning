import React from 'react';
import YouTube from 'react-youtube';

const opts = {
  height: '390',
  width: '1140',
  playerVars: {
    autoplay: 0,
  },
};

const ChapterContent = ({ chapter, content }) => {
  const isArrayContent = Array.isArray(content?.content);

  return (
    <div className="p-4 space-y-6">
      <h1 className="font-semibold text-2xl">
          {isArrayContent ? content?.content[0]?.title : content?.content?.chapter || content?.content?.Chapter}
      </h1>

      <p className="text-gray-700">
        {isArrayContent
          ? content?.content[0]?.explanation
          : content?.content?.topic}
      </p>

      {content?.videoId && <YouTube className='w-full mx-auto' videoId={content.videoId} opts={opts} />}

      {/* Render sections or subtopics */}
      <div className="space-y-4 mt-6">
        {(content?.content?.sections || content?.content?.[0]?.subtopics || content?.content?.Sections || content?.content?.concepts || []).map(
          (item, index) => (
            <div key={index} className="border bg-blue-100 p-4 rounded-lg bgwhite shadow-sm">
              <h2 className="font-semibold text-lg text-blue-600 mb-2">{item.title}</h2>
              <p className="text-gray-800">{item.explanation}</p>
              {
                item?.subsections && (
                  <div>🔥{item.subsections[1].title}</div>
                )
              }
              {item.code_example && (
                <div className="mt-4">
                  {item.code_example.description && (
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      {item.code_example.description}
                    </p>
                  )}
                  {item.code_example.code && (
                    <pre className="bg-black text-white text-sm p-4 rounded-lg overflow-auto whitespace-pre-wrap">
                      <code>{item.code_example.code}</code>
                    </pre>
                  )}
                </div>
              )}
              {item.codeExample && (
                <div className="mt-4">
                  {/* {item.code_example.description && (
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      {item.code_example.description}
                    </p>
                  )} */}
                  {/* {item.codeExample.example && ( */}
                    <pre className="bg-black text-white text-sm p-4 rounded-lg overflow-auto whitespace-pre-wrap">
                      <code>{item.codeExample.example || item.codeExample.exampleBase ||item.codeExample.exampleChild }</code>
                    </pre>
                  
                </div>
              )}
              {item?.example && (
                <div className="mt-4">
                 {/* {
                // item?.subsections && (
                //   <div>🔥{item.subsections[1].title}</div>
                // )
              } */}
                  {/* {item.codeExample.example && ( */}
                    <pre className="bg-black text-white text-sm p-4 rounded-lg overflow-auto whitespace-pre-wrap">
                      <code>{ item?.example?.code}</code>
                      {/* <code>{item.codeExample.example || item.codeExample.exampleBase ||item.codeExample.exampleChild || item?.subsections?.example?.code}</code> */}
                    </pre>
                  
                </div>
              )}
              {item?.code && item.examples && (
                <div className="mt-4">
                 
                {
                  item?.examples.map((item,index)=>{
                    <h1>{item.code}</h1>
                  })
                }
              
                  {/* {item.codeExample.example && ( */}
                    <pre className="bg-black text-white text-sm p-4 rounded-lg overflow-auto whitespace-pre-wrap">
                      <code>{ item?.code}</code>
                      {/* <code>{item.codeExample.example || item.codeExample.exampleBase ||item.codeExample.exampleChild || item?.subsections?.example?.code}</code> */}
                    </pre>
                  
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ChapterContent;
