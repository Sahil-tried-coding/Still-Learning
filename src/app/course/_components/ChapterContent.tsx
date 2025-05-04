import React from "react";
import YouTube from "react-youtube";

const opts = {
  height: "390",
  width: "1140",
  playerVars: {
    autoplay: 0,
  },
};

const ChapterContent = ({ chapter, content }) => {


  function safeJsonContent(input: string | object) {
    if (typeof input !== "string") return input;
  
    try {
      // First: Unescape the JSON string
      const unescaped = input.replace(/\\n/g, "\n").replace(/\\"/g, '"');
      
      // Second: Parse the clean JSON string
      return JSON.parse(unescaped);
    } catch (err) {
      console.warn("Failed to parse JSON content:", err);
      return {};
    }
  }
  

  let parsedContent = safeJsonContent(content.content) ;

  try {
    parsedContent = typeof(content.content) == "string" ? JSON.parse(content.content) : content.content
  } catch (error) {
    console.log(error)
  }





  const isArrayContent = Array.isArray(parsedContent);
  // const isArrayContent = Array.isArray(content?.content);
  // console.log("Raw content string:", content.content);


  return (
    <div className="p-4 space-y-6">
      <h1 className="font-semibold text-2xl">
        {isArrayContent
          ? content?.content[0]?.title
          : content?.content?.chapter || content?.content?.Chapter || content[0]?.content?.title}
      </h1>

      <p className="text-gray-700">
        {isArrayContent
          ? content?.content[0]?.explanation
          : content?.content?.topic}
      </p>

      {content?.videoId && (
        <YouTube
          className="w-full mx-auto"
          videoId={content.videoId}
          opts={opts}
        />
      )}

      {/* <div className="space-y-4 mt-6">
        {(
          content.content ||
          content?.content?.sections ||
          content?.content?.[0]?.subtopics ||
          content?.content?.Sections ||
          content?.content?.concepts ||
          []
        ).map((item, index) => (
          <div
            key={index}
            className="border bg-blue-100 p-4 rounded-lg bgwhite shadow-sm"
          >
            <h2 className="font-semibold text-lg text-blue-600 mb-2">
              {item?.title}
            </h2>
            <p className="text-gray-800">{item.explanation}</p>
            {item?.subsections && <div>🔥{item.subsections[1].title}</div>}
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
                <pre className="bg-black text-white text-sm p-4 rounded-lg overflow-auto whitespace-pre-wrap">
                  <code>
                    {item.codeExample||item.codeExample?.code||item.codeExample.example ||
                      item.codeExample.exampleBase ||
                      item.codeExample.exampleChild}
                  </code>
                </pre>
                <h1>{item?.codeExample?.description}</h1>
              </div>
            )}
            {item.code && (
              <div className="mt-4">
                <pre className="bg-black text-white text-sm p-4 rounded-lg overflow-auto whitespace-pre-wrap">
                  <code>
                    {item.code}
                  </code>
                </pre>
              </div>
            )}
            {item?.codeExamples && (
              <div className="mt-4">
                {item?.codeExamples.map((char, index) => (
                  <div key={index} className="mt-3">
                    <pre className="bg-black text-white text-sm p-4 rounded-lg overflow-auto whitespace-pre-wrap">
                      <code>{char.code}</code>
                    </pre>
                  </div>
                ))}
              </div>
            )}
            {item?.techniques && (
              <div className="mt-4">
                {item?.techniques.map((char, index) => (
                  <div key={index} className="mt-3">
                    <h1 className='font-bold'>{char.title}</h1>
                    <pre className="bg-black text-white text-sm p-4 rounded-lg overflow-auto whitespace-pre-wrap">
                      <code>{char.codeExample}</code>
                    </pre>
                    <h1 className="ml-4">{char.explanation}</h1>
                  </div>
                ))}
              </div>
            )}
            {item?.concepts && (
              <div className="mt-4">
                {item?.concepts.map((char, index) => (
                  <div key={index} className="mt-3">
                    <h1 className='font-bold'>{char.title}</h1>
                    <pre className="bg-black text-white text-sm p-4 rounded-lg overflow-auto whitespace-pre-wrap">
                      <code>{char.codeExample}</code>
                    </pre>
                    <h1 className="ml-4">{char.explanation}</h1>
                  </div>
                ))}
              </div>
            )}
            {item?.example  && (
              <div className="mt-4">
                <pre className="bg-black text-white text-sm p-4 rounded-lg overflow-auto whitespace-pre-wrap">
                  <code>{item?.example?.code || item?.examples?.code }</code>
                </pre>
              </div>
            )}
            {item?.examples  && (
              <div className="mt-4">
              {item?.examples.map((char, index) => (
                <div key={index} className="mt-3">
                    <h1 className='font-bold'>{char.title}</h1>
                    <h1>{char.explanation}</h1>
                  <pre className="bg-black text-white text-sm p-4 rounded-lg overflow-auto whitespace-pre-wrap">
                    <br />
                    <code>{char.code}</code>
                  </pre>
                </div>
              ))}
            </div>
            )}
            {item?.subsections && (
              <div className="mt-4">
                {item?.subsections.map((char, index) => (
                  <div key={index} className="mt-3">
                    <pre className="bg-black text-white text-sm p-4 rounded-lg overflow-auto whitespace-pre-wrap">
                      <code>{char.example.code}</code>
                    </pre>
                  </div>
                ))}
              </div>
            )}
            {item?.applications && (
              <div className="mt-4">
                <h1 className="font-semibold capitalize">Applications :- </h1>
                {item?.applications.map((char, index) => (
                  <div className="ml-4 mt-3" key={index}>
                    <h1 className="font-bold">{index+1}  {char.title}</h1>
                    <h1 className="">{char.explanation}</h1>
                    <pre className="bg-black text-white text-sm p-4 rounded-lg overflow-auto whitespace-pre-wrap">
                      <code>{char.example.code}</code>
                    </pre>
                  </div>
                ))}
              </div>
            )}
            {item?.benefits  && (
              <div className="mt-4">
                <h1 className="font-semibold capitalize">benefits :- </h1>
                {item?.benefits.map((char, index) => (
                  <div className="ml-4 mt-3" key={index}>
                    <h1 className="font-bold">{char}</h1>
                    
                  </div>
                ))}
              </div>
            )}
            { item.practices && (
              <div className="mt-4">
                <h1 className="font-md capitalize">practices :- </h1>
                { item?.practices.map((char, index) => (
                  <div className="ml-4 mt-3" key={index}>
                    <h1 className="font-bold">{char}</h1>
                    
                  </div>
                ))}
              </div>
            )}
            {item?.key_characteristics && (
              <div className="mt-4">
                <h1 className="font-semibold">Key Characteristics :- </h1>
                {item?.key_characteristics.map((char, index) => (
                  <div key={index}>
                    <h1>{char}</h1>
                  </div>
                ))}
              </div>
            )}
            {item?.best_practices && (
              <div className="mt-4">
                <h1 className="font-semibold">Best Practices :- </h1>
                {item?.best_practices.map((char, index) => (
                  <div className="ml-4" key={index}>
                    <h1>{char}</h1>
                  </div>
                ))}
              </div>
            )}
            {item?.integration && (
              <div className="mt-4">
                <h1 className="font-semibold">Integration :-</h1>
                <h1 className="ml-4">{item.integration}</h1>
              </div>
            )}
            {item?.considerations  && (
              <div className="mt-4">
                <h1 className="font-semibold">Considerations :- </h1>
                {item?.considerations.map((char, index) => (
                  <div className="ml-4" key={index}>
                    <h1>{char}</h1>
                  </div>
                ))}
              </div>
            )}
            {item?.caveats  && (
              <div className="mt-4">
                <h1 className="font-semibold capitalize">caveats :- </h1>
                {item?.caveats.map((char, index) => (
                  <div className="ml-4" key={index}>
                    <h1>{char}</h1>
                  </div>
                ))}
              </div>
              // considerations
            )}
            {item?.metrics  && (
              <div className="mt-4">
                <h1 className="font-semibold capitalize">metrics :- </h1>
                {item?.metrics.map((char, index) => (
                  <div className="ml-4" key={index}>
                    <h1>{char}</h1>
                  </div>
                ))}
              </div>
              // considerations
            )}
            {item?.points  && (
              <div className="mt-4">
                <h1 className="font-semibold capitalize">points :- </h1>
                {item?.points.map((char, index) => (
                  <div className="ml-4" key={index}>
                    <h1>{char}</h1>
                  </div>
                ))}
              </div>
            )}
            {item?.tools  && (
              <div className="mt-4">
                <h1 className="font-semibold capitalize">tools :- </h1>
                {item?.tools.map((char, index) => (
                  <div className="ml-4 flex flex-col gap-1 mt-3" key={index}>
                    <h1 className="font-semibold">{char.name}</h1>
                    <h1 className="ml-2">{char.description}</h1>
                  </div>
                ))}
              </div>
            )}
            {item?.code && item.examples && (
              <div className="mt-4">
                {item?.examples.map((item, index) => {
                  <h1>{item.code}</h1>;
                })}

                <pre className="bg-black text-white text-sm p-4 rounded-lg overflow-auto whitespace-pre-wrap">
                  <code>{item?.code}</code>
                </pre>
              </div>
            )}
          </div>
        ))}
      </div> */}
 
      <div className="space-y-4 mt-6">
        {
          
        }
      </div>
    </div>
  );
};

export default ChapterContent;
