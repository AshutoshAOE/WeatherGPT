export const roadmapData = [
  {
    id: "tier-1",
    tierName: "Tier 1 — Client Layer",
    features: [
      {
        id: "f-1-1",
        name: "Web App (React + Tailwind)",
        description: "The current primary interface. Built with Vite, React, and Tailwind CSS. Will host the chat interface, map view, and eventually this progress tracker itself as a sub-page.",
        implementation: "React, Tailwind, Vite",
        behavior: "Serves as the main entry point for end users.",
        integration: "Communicates directly with the FastAPI orchestration layer.",
        isFuture: false
      },
      {
        id: "f-1-2",
        name: "Voice Call Interface",
        description: "Entry point for voice-based interaction, feeding into the Bhashini language layer.",
        implementation: "Web Audio API / WebRTC (future telephony bridge)",
        behavior: "User speaks a query either through a browser mic input or an actual phone call; system treats it identically to a typed query once transcribed.",
        integration: "Audio flows directly into the Bhashini ASR layer before reaching the backend.",
        isFuture: false
      },
      {
        id: "f-1-3",
        name: "Mobile App (React Native)",
        description: "Cross-platform entry point for end users.",
        implementation: "React Native, Expo",
        behavior: "Provides native experience on iOS and Android.",
        integration: "Will reuse the same backend API as the web app.",
        isFuture: true
      }
    ]
  },
  {
    id: "tier-2",
    tierName: "Tier 2 — Language Layer (Bhashini)",
    features: [
      {
        id: "f-2-1",
        name: "ASR (Speech-to-Text)",
        description: "Converts spoken queries into text using Bhashini's ASR API.",
        implementation: "Bhashini ASR integration",
        behavior: "Silently transcribes user audio in near real-time.",
        integration: "Integrates as the first step for any voice input before it reaches the classifier.",
        isFuture: false
      },
      {
        id: "f-2-2",
        name: "IndicTrans2 NMT (Translation)",
        description: "Translates non-English queries to English before reasoning, and translates responses back to the user's language.",
        implementation: "IndicTrans2 API via Bhashini",
        behavior: "The system reasons only in English internally, but the user always sees/hears their own language.",
        integration: "Sits between the user input and the Gateway layer, and again before the output layer.",
        isFuture: false
      },
      {
        id: "f-2-3",
        name: "Bhashini TTS (Text-to-Speech)",
        description: "Converts the final English response (after translation) into spoken audio in the user's language.",
        implementation: "Bhashini TTS integration",
        behavior: "Reads the generated advisory aloud to the user.",
        integration: "Final step in the Output Layer for voice-based queries.",
        isFuture: false
      }
    ]
  },
  {
    id: "tier-3",
    tierName: "Tier 3 — Gateway Layer",
    features: [
      {
        id: "f-3-1",
        name: "Intent & Domain Classifier",
        description: "A lightweight check run before any LLM call to confirm the query is weather-related.",
        implementation: "Fast heuristic or small classification model",
        behavior: "Off-topic queries get an immediate scripted redirect; no LLM cost is incurred for those.",
        integration: "First computational step inside the FastAPI backend.",
        isFuture: false
      },
      {
        id: "f-3-2",
        name: "FastAPI Orchestration / Session Manager",
        description: "Routes each request to the right downstream service and maintains conversational context.",
        implementation: "FastAPI, PostgreSQL (Sessions)",
        behavior: "Remembers user location, sector, and last topic discussed across a session.",
        integration: "Acts as the central nervous system coordinating the Fusion core and LLM core.",
        isFuture: false
      }
    ]
  },
  {
    id: "tier-4",
    tierName: "Tier 4 — AI & Data Fusion Core",
    features: [
      {
        id: "f-4-1",
        name: "RAG Engine (pgvector)",
        description: "Retrieves reference/explanatory text (glossaries, advisory guidance, sector rules) from a PostgreSQL + pgvector store.",
        implementation: "PostgreSQL, pgvector, custom embedding pipeline",
        behavior: "Fetches relevant rules based on the user's query context.",
        integration: "Explicitly never used for live numeric forecast values.",
        isFuture: false
      },
      {
        id: "f-4-2",
        name: "Multi-Model Fusion + Confidence Engine",
        description: "Pulls live forecasts from GFS and ECMWF, compares them, and computes an agreement/confidence score.",
        implementation: "Python data processing, external API calls",
        behavior: "Instead of stating one forecast as fact, the system communicates how confident it actually is.",
        integration: "Feeds raw numerical data and confidence metrics into the LLM Reasoning Core.",
        isFuture: false
      },
      {
        id: "f-4-3",
        name: "Sector Intelligence Engine (Agriculture)",
        description: "Applies agriculture-specific decision rules (e.g., spraying/irrigation timing) to the fused forecast.",
        implementation: "Rule-based engine",
        behavior: "Transforms raw weather data into actionable farming advice.",
        integration: "Operates in parallel with the RAG and Fusion engines.",
        isFuture: false
      },
      {
        id: "f-4-4",
        name: "Sector Intelligence Engine (Disaster Management)",
        description: "Applies disaster-management-specific rules and prioritization to fused forecast and alert data.",
        implementation: "Rule-based engine with NDMA alert priority",
        behavior: "Elevates critical alerts and maps them to standard operating procedures.",
        integration: "Operates in parallel with the RAG and Fusion engines.",
        isFuture: false
      },
      {
        id: "f-4-5",
        name: "Sector Intelligence — Aviation, Marine, Transport, Urban Planning",
        description: "Additional domain-specific rules engines for other critical sectors.",
        implementation: "Rule-based engines",
        behavior: "Provides specialized advisories for pilots, captains, and city planners.",
        integration: "Will plug into the existing Sector Intelligence architecture.",
        isFuture: true
      }
    ]
  },
  {
    id: "tier-5",
    tierName: "Tier 5 — LLM Reasoning Core",
    features: [
      {
        id: "f-5-1",
        name: "Core LLM Integration (Gemini 2.5 Flash)",
        description: "Combines RAG context, fused forecast data, and sector rules into one grounded, function-called response.",
        implementation: "Google Generative AI SDK, Function Calling",
        behavior: "Synthesizes complex technical data into natural language.",
        integration: "Called only after Tier 4 has already produced its outputs — never generates forecasts independently.",
        isFuture: false
      },
      {
        id: "f-5-2",
        name: "Tool-Forced Generation Architecture",
        description: "Ensures the LLM has no 'free chat' path.",
        implementation: "Strict prompt engineering and API constraints",
        behavior: "Every response must originate from an actual tool call, preventing hallucination.",
        integration: "Baked into the Gemini API call structure.",
        isFuture: false
      },
      {
        id: "f-5-3",
        name: "Output Validation Pass",
        description: "A lightweight second check on generated responses before they're returned.",
        implementation: "Secondary fast LLM call or regex/heuristic check",
        behavior: "Catches topic drift or hallucination before the user sees it.",
        integration: "Acts as a final guardrail in the LLM pipeline.",
        isFuture: false
      }
    ]
  },
  {
    id: "tier-6",
    tierName: "Tier 6 — Output Layer",
    features: [
      {
        id: "f-6-1",
        name: "Response Composer",
        description: "Assembles the final natural-language answer from the LLM's output.",
        implementation: "Formatting and template logic",
        behavior: "Structures the text for readability or speech synthesis.",
        integration: "Feeds the Delivery Layer.",
        isFuture: false
      },
      {
        id: "f-6-2",
        name: "Return-Path Translation & TTS",
        description: "Routes the response back through IndicTrans2 and Bhashini TTS for non-English/voice users.",
        implementation: "Bhashini integration",
        behavior: "User receives the final advisory in their native language and preferred format.",
        integration: "Acts on the Output Composer's final payload.",
        isFuture: false
      }
    ]
  },
  {
    id: "tier-7",
    tierName: "Tier 7 — Delivery Layer",
    features: [
      {
        id: "f-7-1",
        name: "Chat Interface",
        description: "Text-based conversational UI in the web app.",
        implementation: "React components",
        behavior: "Displays messages, typing indicators, and structured data.",
        integration: "Frontend consuming the FastAPI WebSocket/REST endpoints.",
        isFuture: false
      },
      {
        id: "f-7-2",
        name: "Voice Response Playback",
        description: "Audio playback of the spoken response.",
        implementation: "HTML5 Audio / WebRTC",
        behavior: "Plays the synthesized voice advisory seamlessly.",
        integration: "Triggered upon receipt of audio payload from backend.",
        isFuture: false
      },
      {
        id: "f-7-3",
        name: "Map / Alert Visualization (Leaflet)",
        description: "Geospatial display of forecasts, confidence zones, or active alerts.",
        implementation: "React-Leaflet, GeoJSON",
        behavior: "Provides a visual complement to the text/voice advisory.",
        integration: "Renders spatial data returned alongside chat responses.",
        isFuture: false
      }
    ]
  },
  {
    id: "tier-foundation",
    tierName: "Supporting Infrastructure",
    isFoundation: true,
    features: [
      {
        id: "f-found-1",
        name: "Database Setup (PostgreSQL + PostGIS + pgvector)",
        description: "Unified database for geospatial data, sessions, and vector search.",
        implementation: "PostgreSQL 15+, PostGIS, pgvector",
        behavior: "Stores all persistent and RAG data securely.",
        integration: "Backend connects via asyncpg.",
        isFuture: false
      },
      {
        id: "f-found-2",
        name: "External API Integrations",
        description: "Connections to GFS, ECMWF, IMD, Sachet/NDMA.",
        implementation: "Python requests/httpx clients",
        behavior: "Fetches live authoritative weather and disaster data.",
        integration: "Feeds directly into the Tier 4 Data Fusion Core.",
        isFuture: false
      },
      {
        id: "f-found-3",
        name: "Containerized Deployment",
        description: "Production infrastructure.",
        implementation: "Docker + Kubernetes",
        behavior: "Ensures scalable, reproducible deployments.",
        integration: "Wraps the entire application stack.",
        isFuture: true
      }
    ]
  }
];
