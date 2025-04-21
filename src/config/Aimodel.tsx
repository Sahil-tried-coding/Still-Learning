// // To run this code you need to install the following dependencies:
// // npm install @google/genai mime
// // npm install -D @types/node

// import {
//     GoogleGenAI,
//   } from '@google/genai';
  
//   export  const ai = new GoogleGenAI({
//       apiKey: process.env.NEXT_PUBLIC_GEMINI_API,
//     });
//     const config = {
//       responseMimeType: 'application/json',
//     };
//     const model = 'gemini-2.5-pro-preview-03-25';
//     const contents = [
//       {
//         role: 'user',
//         parts: [
//           {
//             text: `Generate A Course Tutorial on Following Detail With field as Course Name, Description, Along with Chapter Name, about, Duration. Category: 'Programming', Topic: Python, Level: Basic, Duration: 1 hours, NoOf Chapters: 5, in JSON format
//   `,
//           },
//         ],
//       },
//       {
//         role: 'model',
//         parts: [
//           {
//             text: `Here's my thinking process for generating the Python course tutorial JSON:
  
//   1.  **Understand the Request:** The user wants a course tutorial structure in JSON format. The tutorial should cover Python programming at a basic level. Specific details are provided:
//       *   **Category:** Programming
//       *   **Topic:** Python
//       *   **Level:** Basic
//       *   **Total Duration:** 1 hour (60 minutes)
//       *   **Number of Chapters:** 5
//       *   **Required Fields:** Course Name, Description, Chapter Name, Chapter About, Chapter Duration.
  
//   2.  **Structure the JSON:** The core request is for JSON output. A good structure would be a main JSON object representing the course. This object should contain the top-level course details (Name, Description, Category, Topic, Level, Total Duration). Inside this object, there should be a list (array) to hold the chapters, as there are multiple chapters (5). Each element in the chapter list should be an object containing the chapter-specific details (Chapter Name, About, Duration).
  
//       \`\`\`json
//       {
//         "courseName": "...",
//         "description": "...",
//         "category": "Programming",
//         "topic": "Python",
//         "level": "Basic",
//         "totalDuration": "1 hour",
//         "chapters": [
//           {
//             "chapterName": "...",
//             "about": "...",
//             "duration": "..."
//           },
//           {
//             "chapterName": "...",
//             "about": "...",
//             "duration": "..."
//           },
//           // ... more chapters
//         ]
//       }
//       \`\`\`
  
//   3.  **Populate Top-Level Course Details:**
//       *   **Category:** "Programming" (Given)
//       *   **Topic:** "Python" (Given)
//       *   **Level:** "Basic" (Given)
//       *   **Total Duration:** "1 hour" (Given)
//       *   **Course Name:** Needs to be descriptive and appropriate for a basic, 1-hour Python intro. Something like "Python Quick Start", "Introduction to Python Basics", "Python Fundamentals in 1 Hour". Let's go with "Python Fundamentals in 1 Hour".
//       *   **Description:** Should summarize the course content and target audience. Since it's basic and short, it should focus on core concepts. "A beginner-friendly introduction to the fundamental concepts of Python programming, designed to get you started in just one hour."
  
//   4.  **Plan the Chapters (5 Chapters, Total 60 minutes):**
//       *   The content needs to be logical for a basic Python introduction.
//       *   The total time is 60 minutes, to be divided among 5 chapters. This means an average of 12 minutes per chapter.
//       *   Need to cover essential starting points: What is Python? Setup? Basic syntax? Variables? Data types? Simple operations? Maybe a basic control flow structure?
  
//       *   **Chapter 1: Introduction & Setup**
//           *   *Content:* What is Python? Why learn it? Simple installation check/online interpreter suggestion.
//           *   *Duration:* ~10 minutes (Slightly less, as setup can vary)
//           *   *Name:* "Introduction to Python & Setup"
//           *   *About:* "Understand what Python is, its common uses, and how to set up your environment or use an online interpreter."
  
//       *   **Chapter 2: Your First Python Code**
//           *   *Content:* Running a simple script, the \`print()\` function, comments. Basic syntax rules (indentation - maybe just mention it briefly).
//           *   *Duration:* ~10 minutes
//           *   *Name:* "Running Your First Python Program"
//           *   *About:* "Write and execute your very first Python code using the print function. Learn about basic syntax and comments."
  
//       *   **Chapter 3: Variables and Basic Data Types**
//           *   *Content:* What variables are. Assigning values. Introduce core data types: integers (\`int\`), floats (\`float\`), strings (\`str\`), booleans (\`bool\`). Simple type checking maybe (\`type()\`).
//           *   *Duration:* ~15 minutes (This is fundamental)
//           *   *Name:* "Variables and Data Types"
//           *   *About:* "Learn how to store information using variables and understand Python's fundamental data types like numbers, text (strings), and booleans."
  
//       *   **Chapter 4: Basic Operators**
//           *   *Content:* Arithmetic operators (+, -, *, /). Maybe string concatenation (+). Comparison operators (==, !=, <, >) could be briefly mentioned.
//           *   *Duration:* ~10 minutes
//           *   *Name:* "Working with Operators"
//           *   *About:* "Explore basic arithmetic operations (addition, subtraction, multiplication, division) and how to combine strings."
  
//       *   **Chapter 5: Simple Input/Output & Wrap-up**
//           *   *Content:* Getting user input using \`input()\`. Combining \`input()\` and \`print()\`. Brief recap of concepts learned. Next steps.
//           *   *Duration:* ~15 minutes (Input/Output is interactive and important)
//           *   *Name:* "User Input and Next Steps"
//           *   *About:* "Learn how to interact with your programs by getting input from the user. Recap the course and get pointers on where to go next."
  
//   5.  **Verify Durations:** 10 + 10 + 15 + 10 + 15 = 60 minutes. This fits the total duration requirement.
  
//   6.  **Format Durations:** The request didn't specify the format, but "X minutes" is clear and consistent.
  
//   7.  **Assemble the JSON:** Now, put all the pieces together into the JSON structure defined in step 2.
  
//       \`\`\`json
//       {
//         "courseName": "Python Fundamentals in 1 Hour",
//         "description": "A beginner-friendly introduction to the fundamental concepts of Python programming, designed to get you started in just one hour.",
//         "category": "Programming",
//         "topic": "Python",
//         "level": "Basic",
//         "totalDuration": "1 hour",
//         "chapters": [
//           {
//             "chapterName": "Introduction to Python & Setup",
//             "about": "Understand what Python is, its common uses, and how to set up your environment or use an online interpreter.",
//             "duration": "10 minutes"
//           },
//           {
//             "chapterName": "Running Your First Python Program",
//             "about": "Write and execute your very first Python code using the print function. Learn about basic syntax and comments.",
//             "duration": "10 minutes"
//           },
//           {
//             "chapterName": "Variables and Data Types",
//             "about": "Learn how to store information using variables and understand Python's fundamental data types like numbers, text (strings), and booleans.",
//             "duration": "15 minutes"
//           },
//           {
//             "chapterName": "Working with Operators",
//             "about": "Explore basic arithmetic operations (addition, subtraction, multiplication, division) and how to combine strings.",
//             "duration": "10 minutes"
//           },
//           {
//             "chapterName": "User Input and Next Steps",
//             "about": "Learn how to interact with your programs by getting input from the user. Recap the course and get pointers on where to go next.",
//             "duration": "15 minutes"
//           }
//         ]
//       }
//       \`\`\`
  
//   8.  **Final Review:** Check the JSON for validity (correct syntax: quotes, commas, brackets, braces). Ensure all requested fields are present and the content aligns with the requirements (Basic Python, 1 hour, 5 chapters). The content seems appropriate for a quick beginner's introduction.`,
//           },
//           {
//             text: `\`\`\`json
//   {
//     "courseName": "Python Quick Start for Beginners",
//     "description": "A fast-paced introduction to the fundamental concepts of Python programming. Learn the basics of syntax, variables, data types, and simple operations within an hour.",
//     "category": "Programming",
//     "topic": "Python",
//     "level": "Basic",
//     "totalDuration": "1 hour",
//     "noOfChapters": 5,
//     "chapters": [
//       {
//         "chapterName": "Chapter 1: Welcome to Python",
//         "about": "What is Python? Why learn it? Setting up your environment (or using an online interpreter) and understanding the Python interactive shell.",
//         "duration": "10 minutes"
//       },
//       {
//         "chapterName": "Chapter 2: Your First Python Code",
//         "about": "Writing and running your first script. Understanding the \`print()\` function for output. Basic syntax rules and the importance of indentation (brief overview). Adding comments to your code.",
//         "duration": "10 minutes"
//       },
//       {
//         "chapterName": "Chapter 3: Variables and Simple Data Types",
//         "about": "Introduction to variables for storing data. Exploring fundamental data types: Integers (int), Floating-Point Numbers (float), Strings (str), and Booleans (bool). Assigning values to variables.",
//         "duration": "15 minutes"
//       },
//       {
//         "chapterName": "Chapter 4: Basic Operators",
//         "about": "Performing calculations with Arithmetic Operators (+, -, *, /). Introduction to String Concatenation (+). Basic Comparison Operators (==, !=, <, >).",
//         "duration": "10 minutes"
//       },
//       {
//         "chapterName": "Chapter 5: Simple Input and Putting It Together",
//         "about": "Getting input from the user using the \`input()\` function. Combining input, variables, and print statements to create a simple interactive program. Quick recap and next steps.",
//         "duration": "15 minutes"
//       }
//     ]
//   }
//   \`\`\``,
//           },
//         ],
//       },
//       {
//         role: 'user',
//         parts: [
//           {
//             text: `INSERT_INPUT_HERE`,
//           },
//         ],
//       },
//     ];
  
//     const response = await ai.models.generateContentStream({
//       model,
//       config,
//       contents,
//     });
//     for await (const chunk of response) {
//       console.log(chunk.text);
//     }
  
  // ✅✅✅✅
  // lib/ai/generateCourse.ts
// import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({
//   apiKey: process.env.NEXT_PUBLIC_GEMINI_API!,
// });

// export const generateCourseContent = async ({
//   category,
//   topic,
//   level,
//   duration,
//   noOfChapters,
// }: {
//   category: string;
//   topic: string;
//   level: string;
//   duration: string;
//   noOfChapters: number;
// }) => {
//   const model = "gemini-2.5-pro-preview-03-25";
//   const config = {
//     responseMimeType: "application/json",
//   };

//   const prompt = `Generate a course tutorial with the following details:
// - Category: '${category}'
// - Topic: ${topic}
// - Level: ${level}
// - Duration: ${duration}
// - NoOfChapters: ${noOfChapters}

// Return the result in JSON format with these fields:
// - courseName
// - description
// - category
// - topic
// - level
// - totalDuration
// - noOfChapters
// - chapters (array of objects with chapterName, about, duration)`;

//   const contents = [
//     {
//       role: "user",
//       parts: [{ text: prompt }],
//     },
//   ];

//   // const response = await ai.models.generateContent({
//   //   model,
//   //   config,
//   //   contents,
//   // });

//   const response = await ai.models.generateContent({
//     model,
//     contents,
//   });
//   return response.text;
  
// };


// import { GoogleGenerativeAI } from "@google/generative-ai";

// // Initialize the Gemini model
// const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

// export async function generateCourseContent(prompt: string) {
//   try {
//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });

//     const result = await model.generateContent([
//       { text: prompt }  // ✅ only 'text' is needed
//     ]);

//     const response = result.response;
//     const text = await response.text();
//     return text;
//   } catch (error) {
//     console.error("Error generating course content:", error);
//     throw error;
//   }
// }



// src/config/Aimodel.tsx

export const generateCourseContent = async (prompt: string) => {

  const api_key = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${api_key}`,
        "HTTP-Referer": "https://your-site.com", // Replace with your actual site (optional)
        "X-Title": "Still Learning", // App/site name (optional)
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-pro-exp-03-25:free", // or switch to another model if needed
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      console.error("Error body:", errorBody);
      throw new Error("Failed to fetch from OpenRouter.");
    }

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content;
    return result;
  } catch (error) {
    console.error("Error generating course content:", error);
    throw error;
  }
};
