// import { streamText } from "ai";
// import { LanguageModelV1StreamPart } from "@ai-sdk/provider";

// export const runtime = "edge";

// async function parseAndValidateRequest(req: Request) {
//   const { messages } = await req.json();
//   if (!messages || !Array.isArray(messages) || messages.length === 0) {
//     throw new Error("'messages' must be a non-empty array.");
//   }
//   return { messages };
// }

// async function fetchBackendResponse(payload: object) {
//   const response = await fetch("https://combinedbotbackend.onrender.com/query", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(payload),
//   });

//   if (!response.ok) {
//     const errorText = await response.text();
//     throw new Error(`Backend returned ${response.status}: ${errorText}`);
//   }

//   if (!response.body) {
//     throw new Error("No response body from backend");
//   }

//   return response.body as ReadableStream<LanguageModelV1StreamPart>;
// }

// async function handleStream(responseBody: ReadableStream<LanguageModelV1StreamPart>, messages: any) {
//   return streamText({
//     model: {
//       doStream: async () => ({
//         stream: responseBody,
//         rawCall: { rawPrompt: messages, rawSettings: {} },
//       }),
//       specificationVersion: "v1",
//       provider: "custom-backend",
//       modelId: "custom-model",
//       defaultObjectGenerationMode: undefined,
//       doGenerate: async function () {
//         throw new Error("Generate not implemented - use streaming only");
//       },
//     },
//     messages,
//   }).toDataStreamResponse({
//     getErrorMessage: (error) => `Error: ${error instanceof Error ? error.message : String(error)}`,
//   });
// }

// export async function POST(req: Request) {
//   console.log("✅ Received request at /api/chat");

//   try {
//     const { messages } = await parseAndValidateRequest(req);

//     const payload = { query: { messages } };
//     console.log("📤 Sending payload to backend:", JSON.stringify(payload, null, 2));

//     const responseBody = await fetchBackendResponse(payload);
//     console.log("✅ Starting streamText processing...");

//     const result = await handleStream(responseBody, messages);
//     console.log("✅ Returning stream response...");

//     return result;
//   } catch (error) {
//     console.error("❌ API route error:", error);
//     return new Response(
//       JSON.stringify({ error: error instanceof Error ? error.message : String(error) }),
//       { status: 500, headers: { "Content-Type": "application/json" } }
//     );
//   }
// }
