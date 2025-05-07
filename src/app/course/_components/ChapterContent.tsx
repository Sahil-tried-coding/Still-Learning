"use client"
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";


const ChapterContent = ({ chapter, content,course }) => {


  const [isCompleted, setIsCompleted] = useState(false)

  const onCompleted = async(e)=>{
    setIsCompleted(e)
    console.log("this is completed",isCompleted)
  }



  function safeJsonContent(input: string | object) {
    if (typeof input !== "string") return input;
  
    try {
      const unescaped = input.replace(/\\n/g, "\n").replace(/\\"/g, '"');
      
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
    <div className="p-0 space-y-6 overflow-x-hidden">
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

      {content?.videoId && course?.includeVideo == "Yes" && (
  //       <YouTube
  //       // height: "390",
  // // width: "1140",
  //         // className="md:h-[390px] md:w-[1140px] h-[300px] w-[450px]"
  //         className="md:px-48"
  //         videoId={content.videoId}
  //         opts={opts}
          
  //       />
  <iframe
  width="1140"
  height="415"
  src={`https://www.youtube.com/embed/${content?.videoId}`}
  title="YouTube video player"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowFullScreen
  className="w-[400px] sm:w-[1140px] h-[248px] sm:h-[415px]"
></iframe>

      )}
       
            {/* <p className="">{item.explanation}</p> */}

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
 
      <div className="space-y-4 mt-6 ">
        {
          (content?.content || content[0]?.content || []).map((item,index)=>(
            <div className="border bg-blue-100 p-4 rounded-lg bgwhite shadow-sm" key={index}>
             <h2 className="font-semibold text-lg text-blue-600 mb-2">
              {item?.title}
            </h2>
            {item?.explanation && <h1 className="ml-4 text-gray-800 mb-2">{item?.explanation}</h1>}
              
              {
                item?.codeExample && <pre  className="bg-black text-white text-sm p-4 rounded-lg overflow-auto whitespace-pre-wrap">
                <h1 className="bg-blue-20 underline text-white p-2 mb-2">{item?.codeExample?.description} </h1>
                <code>{item?.codeExample?.code}</code>
              </pre>
              }
              
              <h1 className="font-semibold mt-1.5">Notes : - </h1>
              <h1 className="ml-4 mt-1.5">  {item.notes}</h1>
              {item.bestPractices&&<h1 className="font-semibold mt-1.5">Best Practises</h1>}
              {
               item.bestPractices && item.bestPractices.map((bp,index)=>(
                <div className="flex items-center ml-4 mt-1.5" key={index}>
                  <div className="w-[10%] md:w-[4%]">
                  <div className="md:min-h-7 py-1 md:text-lg text-xs md:min-w-8 md:h-8 h-6 w-6 bg-blue-600 font-semibold text-white rounded-full text-center">{index+1}</div>
                  </div>
                  <h1 className="ml-1.5 md:ml-0 flex flex-1/2" >
                    
                    {bp}</h1>
                </div>
               ))
              }
              {item.advantages&&<h1 className="font-semibold mt-1.5">Advantages</h1>}
              {
               item.advantages && item.advantages.map((bp,index)=>(
                <div className="flex items-center ml-4 mt-1.5" key={index}>
                  <div className="w-[10%] md:w-[4%] ">
                  <div className="md:min-h-7 py-1 md:text-lg text-xs md:min-w-8 md:h-8 h-6 w-6 bg-blue-600 font-semibold text-white rounded-full text-center">{index+1}</div>
                  </div>
                  <h1 className="flex flex-1/2" >
                    
                    {bp}</h1>
                </div>
                // <div key={index}>
                //   <h1 className="ml-4 mt-1.5 flex gap-1.5" >
                //     <div className="h-7 w-8">
                //     <div className=" bg-blue-600 font-semibold text-white border rounded-full text-center">{index+1}</div>
                //     </div>
                //     {bp}</h1>
                // </div>
               ))
              }
              {item.disadvantages&&<h1 className="font-semibold mt-1.5">Disadvantages</h1>}
              {
               item.disadvantages && item.disadvantages.map((bp,index)=>(
                <div className="flex items-center ml-4 mt-1.5" key={index}>
                  <div className="w-[10%] md:w-[4%]">
                  <div className="md:min-h-7 py-1 md:text-lg text-xs md:min-w-8 md:h-8 h-6 w-6 bg-red-500  font-semibold text-white rounded-full text-center">{index+1}</div>
                  </div>
                  <h1 className="  flex flex-1/2" >
                    
                    {bp}</h1>
                </div>
               ))
              }
              {item.coolStuff&&<h1 className="font-semibold mt-1.5">Cool Stuff</h1>}
              {
               item.coolStuff && item.coolStuff.map((bp,index)=>(
                <div className="flex items-center ml-4 mt-1.5" key={index}>
                  <div className="w-[10%] md:w-[4%]">
                  <div className="md:min-h-7 py-1 md:text-lg text-xs md:min-w-8 md:h-8 h-6 w-6 bg-blue-600 font-semibold text-white rounded-full text-center">{index+1}</div>
                  </div>
                  <h1 className="  flex flex-1/2" >
                    
                    {bp}</h1>
                </div>
               ))
              }
              {item.realWorldUseCases&&<h1 className="font-semibold mt-1.5">Real World Use Cases</h1>}

              {
               item.realWorldUseCases && item.realWorldUseCases.map((bp,index)=>(
                <div className="flex items-center ml-4 mt-1.5" key={index}>
                  <div className="w-[10%] md:w-[4%]">
                  <div className="md:min-h-7 py-1 md:text-lg text-xs md:min-w-8 md:h-8 h-6 w-6 bg-black  font-semibold text-white rounded-full text-center">{index+1}</div>
                  </div>
                  <h1 className="  flex flex-1/2" >
                    
                    {bp}</h1>
                </div>
               ))
              }
              {item.commonMistakes&&<h1 className="font-semibold mt-1.5">Common Mistakes</h1>}

              {
               item.commonMistakes && item.commonMistakes.map((bp,index)=>(
                <div className="flex items-center ml-4 mt-1.5" key={index}>
                  <div className="w-[10%] md:w-[4%]">
                  <div className="md:min-h-7 py-1 md:text-lg text-xs md:min-w-8 md:h-8 h-6 w-6 bg-red-500  font-semibold text-white rounded-full text-center">{index+1}</div>
                  </div>
                  <h1 className="  flex flex-1/2" >
                    
                    {bp}</h1>
                </div>
               ))
              }
              {item.interviewTips&&<h1 className="font-semibold mt-1.5">Interview Tips </h1>}

              {
               item.interviewTips && item.interviewTips.map((bp,index)=>(
                <div className="flex items-center ml-4 mt-1.5" key={index}>
                  <div className="w-[10%] md:w-[4%]">
                  <div className="md:min-h-7 py-1 md:text-lg text-xs md:min-w-8 md:h-8 h-6 w-6 bg-black  font-semibold text-white rounded-full text-center">{index+1}</div>
                  </div>
                  <h1 className=" flex flex-1/2" >
                    
                    {bp}</h1>
                </div>
               ))
              }
              {item.assignments&&<h1 className="font-semibold mt-1.5">Assignments </h1>}

              {
               item.assignments && item.assignments.map((bp,index)=>(
                <div className="flex items-center ml-4 mt-1.5" key={index}>
                  <div className="w-[10%] md:w-[4%]">
                  <div className="md:min-h-7 py-1 md:text-lg text-xs md:min-w-8 md:h-8 h-6 w-6 bg-green-500  font-semibold text-white rounded-full text-center">{index+1}</div>
                  </div>
                  <h1 className=" flex flex-1/2" >
                    
                    {bp}</h1>
                </div>
               ))
              }
            </div>
          ))

          
        }
        <div className="flex justify-end items-center gap-2">
        <Checkbox id="completed" checked={isCompleted}  onCheckedChange={e=>onCompleted(e)}/>
      <label htmlFor="completed" >
        {
          isCompleted ? "Completed ✅":"Mark as Completed"
        }
      </label>
        </div>
      </div>
    </div>
  );
};

export default ChapterContent;
