import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json({ limit: '20mb' }));

// Shared Gemini client with required User-Agent
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Helper for color contrast & luminance
function getContrastColor(hex: string): string {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16) || 0;
  const g = parseInt(cleanHex.substring(2, 4), 16) || 0;
  const b = parseInt(cleanHex.substring(4, 6), 16) || 0;
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? '#0f172a' : '#ffffff';
}

// 1. BRAND BIBLE GENERATION ENDPOINT
app.post('/api/brand/generate', async (req, res) => {
  try {
    const { brandName, mission, category, personality, preferences, colorMood } = req.body;

    if (!mission || !mission.trim()) {
      return res.status(400).json({ error: 'Company mission is required.' });
    }

    const effectiveBrandName = brandName && brandName.trim() ? brandName.trim() : 'The Brand';

    const prompt = `
You are a legendary Brand Director at Pentagram and Apple.
Generate a comprehensive, world-class "Brand Bible" for the following company:

Company Name: ${effectiveBrandName}
Company Mission: ${mission}
Industry / Category: ${category || 'Modern Technology & Lifestyle'}
Brand Personality / Vibe: ${personality || 'Visionary, intentional, polished, bold'}
Color Mood / Style Preference: ${colorMood || 'Balanced modern palette with high-contrast anchor'}
Additional Design Notes: ${preferences || 'Clean geometric vector logo concepts, pristine typography, timeless visual hierarchy'}

Produce a JSON response strictly matching this schema:
{
  "brandName": "${effectiveBrandName}",
  "tagline": "A punchy, unforgettable 4-8 word tagline",
  "missionStatement": "Polished, evocative mission statement based on user input",
  "visionStatement": "An inspiring future-facing vision statement (1-2 sentences)",
  "archetype": "Primary & secondary brand archetype (e.g. 'The Creator & The Outlaw')",
  "personalityAdjectives": ["Adjective1", "Adjective2", "Adjective3", "Adjective4", "Adjective5"],
  "targetAudience": "Concise profile of ideal customer and mindset",
  "brandPillars": [
    { "title": "Pillar 1 Title", "description": "1 sentence description" },
    { "title": "Pillar 2 Title", "description": "1 sentence description" },
    { "title": "Pillar 3 Title", "description": "1 sentence description" }
  ],
  "voiceGuidelines": {
    "tone": "Core tone description (1-2 sentences)",
    "dos": ["Do 1", "Do 2", "Do 3"],
    "donts": ["Don't 1", "Don't 2", "Don't 3"]
  },
  "palette": [
    {
      "role": "Dominant (60%)",
      "name": "Creative name for primary color",
      "hex": "#HEXCODE",
      "usage": "Specific rules: primary brand hero, headers, dominant packaging, or primary canvas"
    },
    {
      "role": "Secondary (30%)",
      "name": "Creative name for secondary color",
      "hex": "#HEXCODE",
      "usage": "Specific rules: supporting surfaces, secondary layout structures, cards, borders"
    },
    {
      "role": "Accent (10%)",
      "name": "Creative name for accent color",
      "hex": "#HEXCODE",
      "usage": "Specific rules: high-impact CTAs, active status, focal highlights, logo spark"
    },
    {
      "role": "Dark Neutral",
      "name": "Creative name for dark neutral",
      "hex": "#HEXCODE",
      "usage": "Specific rules: primary body typography, deep contrast framing, dark mode base"
    },
    {
      "role": "Light Neutral",
      "name": "Creative name for light neutral",
      "hex": "#HEXCODE",
      "usage": "Specific rules: light backgrounds, paper substrates, negative space breathing room"
    }
  ],
  "typography": {
    "headerFont": {
      "name": "Google Font Name (e.g. Plus Jakarta Sans, Playfair Display, Space Grotesk, Syne, Outfit, DM Sans, Instrument Serif, Cinzel, Urbanist, Fraunces)",
      "category": "Sans-Serif | Serif | Display",
      "weights": ["600", "700", "800"],
      "usage": "Guidelines for display headings, hero banners, and cover titles"
    },
    "bodyFont": {
      "name": "Google Font Name (e.g. Inter, DM Sans, Plus Jakarta Sans, Lora, Work Sans, Roboto, Merriweather, IBM Plex Sans)",
      "category": "Sans-Serif | Serif",
      "weights": ["400", "500", "600"],
      "usage": "Guidelines for body copy, user interface controls, and editorial paragraphs"
    },
    "pairingRationale": "Why this specific header and body pairing works harmoniously for this brand mission"
  },
  "logoPrompts": {
    "primary": "Detailed visual prompt to generate the primary logo emblem. Must be clean, vector graphic style, isolated on clean pure white background, no clutter, timeless iconic mark, modern graphic design.",
    "secondaryMarks": [
      {
        "type": "icon",
        "title": "App Favicon / Monogram Mark",
        "prompt": "Detailed prompt for app icon/monogram mark, centered on pure white background, crisp vector silhouette, recognizable at 16x16 pixels.",
        "usage": "Mobile app icon, web favicon, social avatar, compact profile badge"
      },
      {
        "type": "monochrome",
        "title": "Circular Seal / Stamp Mark",
        "prompt": "Detailed prompt for circular seal, stamp or etched emblem, monochrome black on clean white background, typographic border or minimal crest.",
        "usage": "Physical packaging stamps, embossing, wax seals, official certificates, merchandise labels"
      },
      {
        "type": "lockup",
        "title": "Horizontal Lockup / Modern Symbol",
        "prompt": "Detailed prompt for horizontal graphic mark or fluid vector insignia, sleek contemporary composition, centered on pure white background.",
        "usage": "Navigation headers, email signatures, vehicle branding, stationery header"
      }
    ]
  }
}

Return ONLY raw JSON, with no markdown code fences or backticks.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    });

    const text = response.text || '{}';
    let brandData;
    try {
      brandData = JSON.parse(text);
    } catch {
      // In case of slight formatting issues, clean fences
      const clean = text.replace(/```json/g, '').replace(/```/g, '').trim();
      brandData = JSON.parse(clean);
    }

    return res.json(brandData);
  } catch (error: any) {
    console.error('Error generating brand bible:', error);
    return res.status(500).json({
      error: error.message || 'Failed to generate brand identity.',
    });
  }
});

// 2. IMAGE GENERATION ENDPOINT (Using gemini-3-pro-image-preview with 1K, 2K, 4K affordance)
app.post('/api/image/generate', async (req, res) => {
  try {
    const { prompt, imageSize = '1K', aspectRatio = '1:1', style = 'minimalist' } = req.body;

    if (!prompt || !prompt.trim()) {
      return res.status(400).json({ error: 'Image prompt is required.' });
    }

    // Validate imageSize (affordance: 1K, 2K, 4K)
    const validSizes = ['1K', '2K', '4K'];
    const chosenSize = validSizes.includes(imageSize) ? imageSize : '1K';

    // Enhance prompt for brand identity quality: clean vector mark, pure white background for versatility
    const enhancedPrompt = `${prompt.trim()}, minimalist brand identity logo mark, professional graphic design, pristine vector art style, centered composition, isolated on solid white background, high contrast, clean sharp edges, timeless emblem, award-winning logo design.`;

    console.log(`Generating logo image with gemini-3-pro-image-preview [size=${chosenSize}, ratio=${aspectRatio}]`);

    let response;
    let usedModel = 'gemini-3-pro-image-preview';

    try {
      response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: {
          parts: [{ text: enhancedPrompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: aspectRatio as any,
            imageSize: chosenSize as any,
          },
        },
      });
    } catch (primaryErr: any) {
      console.warn('gemini-3-pro-image-preview attempt failed or unavailable, trying fallback models:', primaryErr?.message);
      
      // Try fallback to gemini-3-pro-image or gemini-nano-banana-2.1 or gemini-3.1-flash-lite-image
      try {
        usedModel = 'gemini-3-pro-image';
        response = await ai.models.generateContent({
          model: 'gemini-3-pro-image',
          contents: {
            parts: [{ text: enhancedPrompt }],
          },
          config: {
            imageConfig: {
              aspectRatio: aspectRatio as any,
              imageSize: chosenSize as any,
            },
          },
        });
      } catch (secondErr: any) {
        console.warn('gemini-3-pro-image failed, trying gemini-nano-banana-2.1:', secondErr?.message);
        try {
          usedModel = 'gemini-nano-banana-2.1';
          response = await ai.models.generateContent({
            model: 'gemini-nano-banana-2.1',
            contents: {
              parts: [{ text: enhancedPrompt }],
            },
            config: {
              imageConfig: {
                aspectRatio: aspectRatio as any,
                imageSize: chosenSize as any,
              },
            },
          });
        } catch (thirdErr: any) {
          console.warn('Trying gemini-3.1-flash-lite-image fallback:', thirdErr?.message);
          usedModel = 'gemini-3.1-flash-lite-image';
          response = await ai.models.generateContent({
            model: 'gemini-3.1-flash-lite-image',
            contents: {
              parts: [{ text: enhancedPrompt }],
            },
          });
        }
      }
    }

    // Extract image part
    let imageUrl: string | null = null;
    const parts = response.candidates?.[0]?.content?.parts || [];
    for (const part of parts) {
      if (part.inlineData && part.inlineData.data) {
        const mimeType = part.inlineData.mimeType || 'image/png';
        imageUrl = `data:${mimeType};base64,${part.inlineData.data}`;
        break;
      }
    }

    if (!imageUrl) {
      return res.status(500).json({ error: 'No image was returned from the model.' });
    }

    return res.json({
      imageUrl,
      modelUsed: usedModel,
      imageSize: chosenSize,
      aspectRatio,
    });
  } catch (error: any) {
    console.error('Error generating image:', error);
    return res.status(500).json({
      error: error.message || 'Failed to generate image.',
    });
  }
});

// 3. MULTI-TURN GEMINI CHATBOT ENDPOINT
// Supports:
// - gemini-3.1-pro-preview for complex tasks (deep strategy, positioning analysis)
// - gemini-3.5-flash for general tasks (standard brand consulting, guidelines)
// - gemini-3.1-flash-lite for fast tasks (quick copy tweaks, color rename, rapid answers)
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, modelType = 'general', brandContext } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

    // Determine model
    let targetModel = 'gemini-3.5-flash';
    let roleDescription = 'Brand Consultant & Creative Director';

    if (modelType === 'complex' || modelType === 'gemini-3.1-pro-preview') {
      targetModel = 'gemini-3.1-pro-preview';
      roleDescription = 'Executive Brand Strategist & Identity Architect specializing in high-stakes market positioning, trademark distinction, semiotics, and corporate design strategy';
    } else if (modelType === 'fast' || modelType === 'gemini-3.1-flash-lite') {
      targetModel = 'gemini-3.1-flash-lite';
      roleDescription = 'Rapid Brand Assistant delivering fast, punchy design critique, instant slogan iterations, and swift color/font recommendations';
    } else {
      targetModel = 'gemini-3.5-flash';
      roleDescription = 'Lead Brand Director & Design Strategist guiding visual identity, typography harmony, color psychology, and tone of voice';
    }

    const systemInstruction = `
You are the ${roleDescription} for this brand.
Your mission is to provide deeply thoughtful, expert, and actionable advice to the user as they build and refine their Brand Bible.

${brandContext ? `CURRENT ACTIVE BRAND BIBLE CONTEXT:
- Brand Name: ${brandContext.brandName || 'Untitled'}
- Tagline: ${brandContext.tagline || 'N/A'}
- Mission: ${brandContext.missionStatement || 'N/A'}
- Archetype: ${brandContext.archetype || 'N/A'}
- Palette: ${JSON.stringify(brandContext.palette?.map((c: any) => `${c.role}: ${c.hex} (${c.name})`) || [])}
- Typography: Headers: ${brandContext.typography?.headerFont?.name || 'N/A'}, Body: ${brandContext.typography?.bodyFont?.name || 'N/A'}
` : ''}

GUIDELINES:
1. Provide concrete, designer-grade suggestions (specify exact hex codes, real Google Font pairings, or revised copy lines).
2. Avoid generic platitudes. Reference design principles (e.g. 60-30-10 color harmony, optical kerning, x-height balance, WCAG AAA accessibility, semiotic tension).
3. If the user asks for new color codes, font pairings, or taglines, present them with crystal clarity and explain the psychological rationale.
4. Keep answers structured with bold subheadings and concise bullet points.
5. If you suggest specific updates to the current palette, fonts, or tagline, provide an optional quick summary at the bottom so the user can easily review it.
`;

    // Map conversation history
    const contents = messages.map((m: any) => ({
      role: m.role === 'assistant' || m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    let response;
    try {
      response = await ai.models.generateContent({
        model: targetModel,
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });
    } catch (err: any) {
      console.warn(`Model ${targetModel} failed, falling back to gemini-3.5-flash:`, err?.message);
      response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });
      targetModel = 'gemini-3.5-flash';
    }

    const reply = response.text || 'I could not generate a response. Please try asking again.';

    return res.json({
      reply,
      modelUsed: targetModel,
    });
  } catch (error: any) {
    console.error('Error in chat:', error);
    return res.status(500).json({
      error: error.message || 'Failed to complete chat response.',
    });
  }
});

// 4. QUICK SUGGESTIONS / FONT PAIRING ALTERNATIVES ENDPOINT (Fast task: gemini-3.1-flash-lite)
app.post('/api/brand/suggest-fonts', async (req, res) => {
  try {
    const { brandName, mission, currentHeader, currentBody } = req.body;
    const prompt = `Suggest 3 top alternative Google Font pairings for a brand named "${brandName}" with mission "${mission}".
Current fonts: Header: ${currentHeader}, Body: ${currentBody}.
Return JSON list:
[
  {
    "headerFont": "Google Font Name",
    "bodyFont": "Google Font Name",
    "styleLabel": "e.g. Neo-Brutalist Tech | Editorial Luxury | Warm Humanist",
    "rationale": "1 sentence why this works"
  }
]`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const suggestions = JSON.parse(response.text || '[]');
    return res.json({ suggestions });
  } catch (error: any) {
    console.error('Error suggesting fonts:', error);
    return res.status(500).json({ error: error.message });
  }
});

// START SERVER & VITE MIDDLEWARE
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Brand Identity Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
