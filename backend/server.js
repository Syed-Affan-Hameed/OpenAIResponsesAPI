import OpenAI from "openai";
import dotenv from "dotenv";


dotenv.config();

const openai = new OpenAI(process.env.OPENAI_API_KEY);

// const response = await openai.responses.create({
//     model:"gpt-4o-mini",
//     input:"answer me breifly, one single tip to improve my mental health and well-being",
// });

//const response = await openai.responses.create({
//     model:"gpt-4o-mini",
//     input:[
//         {
//             role:"user",
//             content:"describe the image?",
//         },
//         {
//             role:"user",
//             content:[
//                 {
//                     type:"input_image",
//                     image_url:"https://images.unsplash.com/photo-1719404363999-5145022af635?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y3Jpc3RpYW5vJTIwcm9uYWxkb3xlbnwwfHwwfHx8MA%3D%3D"
//                 }
//             ]
//         }
//     ]
// })

// console.log(response.output_text);

const stream = await openai.responses.create({
    model: "gpt-4o",
    input: [
        {
            role: "user",
            content: "were egyptians in contact with aliens?",
        },
    ],
    stream: true,
});

let fullText = "";

for await (const event of stream) {
    // Check if the event is a text delta event
    if (event.type === "response.output_text.delta") {
      // Append the delta text to our full output
      fullText += event.delta;
      // Write the delta text without creating a new line each time
      process.stdout.write(event.delta);
    }
  }
  
  console.log("\nFinal complete output:", fullText);