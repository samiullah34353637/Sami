import { BrandBible } from '../types';

export interface BrandPreset {
  id: string;
  name: string;
  category: string;
  mission: string;
  personality: string;
  initialBible: BrandBible;
}

export const CURATED_FONT_PAIRINGS = [
  {
    name: 'Modern Neo-Grotesk',
    headerFont: { name: 'Plus Jakarta Sans', category: 'Sans-Serif', weights: ['600', '700', '800'], usage: 'Clean geometric authority for tech display headlines' },
    bodyFont: { name: 'Inter', category: 'Sans-Serif', weights: ['400', '500'], usage: 'Exceptional digital micro-legibility at all pixel densities' },
    rationale: 'Crisp geometric precision combined with universal clarity. The gold standard for modern tech platforms.',
  },
  {
    name: 'Editorial Luxury & Heritage',
    headerFont: { name: 'Playfair Display', category: 'Serif', weights: ['600', '700'], usage: 'High-contrast elegant serifs for prestigious headlines' },
    bodyFont: { name: 'Plus Jakarta Sans', category: 'Sans-Serif', weights: ['400', '500'], usage: 'Clean contemporary grounding to balance editorial drama' },
    rationale: 'High-contrast serif drama paired with a restrained modern sans creates timeless, luxury distinction.',
  },
  {
    name: 'Futuristic Avant-Garde',
    headerFont: { name: 'Space Grotesk', category: 'Display', weights: ['600', '700'], usage: 'Tech-forward idiosyncratic glyphs for bold title cards' },
    bodyFont: { name: 'DM Sans', category: 'Sans-Serif', weights: ['400', '500'], usage: 'Balanced humanist geometry for extended readability' },
    rationale: 'Idiosyncratic space-age letterforms grounded by effortless humanist geometric readability.',
  },
  {
    name: 'Artisan Warmth & Botanical',
    headerFont: { name: 'Cinzel', category: 'Serif', weights: ['600', '700'], usage: 'Classical Roman proportions for enduring prestige' },
    bodyFont: { name: 'Lora', category: 'Serif', weights: ['400', '500'], usage: 'Contemporary calligraphic rhythm for comfortable reading' },
    rationale: 'Classical proportions paired with warm calligraphic curves evoke craft, legacy, and natural purity.',
  },
  {
    name: 'High-Energy Contemporary',
    headerFont: { name: 'Syne', category: 'Display', weights: ['700', '800'], usage: 'Bold, expressive, sculptural letterforms' },
    bodyFont: { name: 'Outfit', category: 'Sans-Serif', weights: ['400', '500'], usage: 'Smooth circular geometry that echoes the energetic titles' },
    rationale: 'Sculptural, wide letterforms bring fearless creative energy, complemented by clean circular geometry.',
  },
];

export const BRAND_PRESETS: BrandPreset[] = [
  {
    id: 'aurora-neuro',
    name: 'Aura Intelligence',
    category: 'Spatial & Ambient AI',
    mission: 'To harmonize human intention with ambient technology through frictionless, ethical intelligence that recedes into the background.',
    personality: 'Quietly visionary, transcendent, ultra-minimalist, sophisticated',
    initialBible: {
      brandName: 'Aura Intelligence',
      tagline: 'Ambient computing that understands you before you speak.',
      missionStatement: 'To harmonize human intention with ambient technology through frictionless, ethical intelligence that recedes into the background.',
      visionStatement: 'A world where technology recedes into invisible harmony, liberating human presence and intentional living.',
      archetype: 'The Sage & The Magician',
      personalityAdjectives: ['Transcendent', 'Frictionless', 'Harmonious', 'Precise', 'Invisible'],
      targetAudience: 'Forward-thinking knowledge workers, creative technologists, and design purists seeking calm computing.',
      brandPillars: [
        { title: 'Invisible Architecture', description: 'Zero intrusive notifications; ambient systems that only appear when summoned.' },
        { title: 'Ethical Sovereignty', description: 'Complete zero-retention on-device privacy as an absolute constitutional guarantee.' },
        { title: 'Sensory Balance', description: 'Tactile, auditory, and visual feedback tuned to human circadian rhythms.' },
      ],
      voiceGuidelines: {
        tone: 'Quietly confident, poetically precise, never bombastic or hyper-technical.',
        dos: [
          'Use clear, active verbs that highlight calm intelligence',
          'Speak with quiet confidence and human warmth',
          'Focus on clarity of thought and intentional simplicity',
        ],
        donts: [
          'Avoid corporate jargon, buzzwords, or hype ("disruptive", "synergy")',
          'Don\'t overwhelm with excessive technical specs in headlines',
          'Avoid cold, sterile, or robotic phrasing',
        ],
      },
      palette: [
        {
          role: 'Dominant (60%)',
          name: 'Obsidian Slate',
          hex: '#0B0F17',
          usage: 'Primary brand anchor, header text, dark mode backgrounds, high-contrast surfaces.',
        },
        {
          role: 'Secondary (30%)',
          name: 'Mist Silver',
          hex: '#E2E8F0',
          usage: 'Card surfaces, structural borders, secondary panels, light contrast grounding.',
        },
        {
          role: 'Accent (10%)',
          name: 'Electric Indigo',
          hex: '#6366F1',
          usage: 'Key calls-to-action, active indicators, focal logo accents, focal typography.',
        },
        {
          role: 'Dark Neutral',
          name: 'Deep Graphite',
          hex: '#1E293B',
          usage: 'Body typography on light surfaces, subtle borders, secondary navigation.',
        },
        {
          role: 'Light Neutral',
          name: 'Ambient Cream',
          hex: '#F8FAFC',
          usage: 'Main canvas background, clean negative space, paper substrate simulation.',
        },
      ],
      typography: {
        headerFont: {
          name: 'Plus Jakarta Sans',
          category: 'Sans-Serif',
          weights: ['600', '700', '800'],
          usage: 'Display titles, section headlines, brand wordmarks. Styled with tight tracking (-0.02em).',
        },
        bodyFont: {
          name: 'Inter',
          category: 'Sans-Serif',
          weights: ['400', '500'],
          usage: 'Body prose, interface labels, metadata, captions. Optimally spaced at 1.6 line height.',
        },
        pairingRationale: 'Plus Jakarta Sans provides geometric personality and modern authority, while Inter guarantees pristine micro-legibility across all digital scales.',
      },
      logoPrompts: {
        primary: 'Modern minimalist logo for Aura Intelligence, abstract ambient neural node emblem with crisp geometric balance, luxury tech aesthetic, vector icon style, isolated on clean pure white background, high contrast, clean vector curves, no realistic gradients, timeless graphic design.',
        secondaryMarks: [
          {
            type: 'icon',
            title: 'App Favicon / Monogram',
            prompt: 'Minimalist app icon mark for Aura Intelligence, stylized abstract glowing neural pulse emblem, centered, clean vector mark, high contrast on solid pure white background, crisp silhouette, flat design.',
            usage: 'Favicon, iOS/Android home screen icon, avatar, social profile mark.',
          },
          {
            type: 'monochrome',
            title: 'Circular Seal / Stamp',
            prompt: 'Minimalist circular monogram seal mark for Aura Intelligence, solid black on pure white, vintage modern typographic stamp badge, sharp geometry, crisp vector aesthetic.',
            usage: 'Embossing, packaging tape, watermarks, physical merchandise stamps.',
          },
          {
            type: 'lockup',
            title: 'Horizontal Wordmark Symbol',
            prompt: 'Horizontal modern tech emblem for Aura Intelligence brand lockup, sleek dynamic wave symbol, minimalist vector graphics, clean white background, balanced proportions.',
            usage: 'Website navbar header, letterheads, email signatures, presentation decks.',
          },
        ],
      },
      primaryLogo: {
        prompt: 'Modern minimalist logo for Aura Intelligence, abstract ambient neural node emblem with crisp geometric balance, luxury tech aesthetic, vector icon style, isolated on clean pure white background, high contrast, clean vector curves, no realistic gradients, timeless graphic design.',
      },
    },
  },
  {
    id: 'solstice-botanicals',
    name: 'Solstice Botanicals',
    category: 'Holistic Adaptogens & Wellness',
    mission: 'To restore natural circadian vitality using cold-extracted regenerative adaptogens rooted in ancient herbal wisdom and verified by modern clinical botany.',
    personality: 'Earthy, luxurious, medicinal, deeply grounding, sensorial',
    initialBible: {
      brandName: 'Solstice Botanicals',
      tagline: 'Regenerative plant medicine for circadian rhythm alignment.',
      missionStatement: 'To restore natural circadian vitality using cold-extracted regenerative adaptogens rooted in ancient herbal wisdom and verified by modern clinical botany.',
      visionStatement: 'A culture that reclaims ancestral sleep, calm, and vital energy through living botanical alchemy.',
      archetype: 'The Caregiver & The Alchemist',
      personalityAdjectives: ['Grounded', 'Sensorial', 'Regenerative', 'Medicinal', 'Pure'],
      targetAudience: 'Conscious wellness seekers, biohackers, and mindful urbanites craving holistic vitality.',
      brandPillars: [
        { title: 'Regenerative Soil First', description: 'Every herb is grown on pesticide-free polyculture family micro-farms.' },
        { title: 'Cold Acoustic Extraction', description: 'Zero petrochemical solvents; ultrasonic cellular extraction preserving raw terpene potency.' },
        { title: 'Full-Spectrum Veracity', description: 'Third-party heavy metal and purity batch certificates printed on every bottle.' },
      ],
      voiceGuidelines: {
        tone: 'Warm, reassuring, scientifically grounded, respectful of ancestral botany.',
        dos: [
          'Emphasize the symbiotic connection between earth and human circadian cycles',
          'Use sensory vocabulary describing textures, botanicals, and aromas',
          'Cite clinical evidence alongside herbal traditions',
        ],
        donts: [
          'Avoid miracle cure claims or fear-based wellness marketing',
          'Don\'t use overly clinical cold hospital jargon',
          'Avoid flimsy, superficial lifestyle tropes',
        ],
      },
      palette: [
        {
          role: 'Dominant (60%)',
          name: 'Forest Cypress',
          hex: '#1B3B2B',
          usage: 'Packaging carton base, luxury glass labels, primary editorial headers.',
        },
        {
          role: 'Secondary (30%)',
          name: 'Earthy Ochre',
          hex: '#C89352',
          usage: 'Foil embossing accents, secondary subheadings, badge containers.',
        },
        {
          role: 'Accent (10%)',
          name: 'Sunlight Amber',
          hex: '#E5A93C',
          usage: 'Call-to-action highlights, seasonal badges, primary logo focal mark.',
        },
        {
          role: 'Dark Neutral',
          name: 'Deep Espresso',
          hex: '#231B16',
          usage: 'Body typography on paper backgrounds, ingredient lists, back-panel legal.',
        },
        {
          role: 'Light Neutral',
          name: 'Linen Parchment',
          hex: '#FAF6EF',
          usage: 'Uncoated paper texture, website background, clean negative space.',
        },
      ],
      typography: {
        headerFont: {
          name: 'Playfair Display',
          category: 'Serif',
          weights: ['600', '700'],
          usage: 'Product title bottles, luxury brand story hero headlines.',
        },
        bodyFont: {
          name: 'Lora',
          category: 'Serif',
          weights: ['400', '500'],
          usage: 'Botanical monograph descriptions, ritual guides, editorial articles.',
        },
        pairingRationale: 'Playfair Display infuses timeless apothecary prestige, while Lora brings lyrical, human warmth for immersive editorial readability.',
      },
      logoPrompts: {
        primary: 'Minimalist luxury botanical emblem for Solstice Botanicals, stylized sun and medicinal leaf fusion, clean line art vector logo, pure white background, elegant organic geometry, timeless graphic design.',
        secondaryMarks: [
          {
            type: 'icon',
            title: 'Botanical Seal Monogram',
            prompt: 'Geometric leaf and sun botanical icon for Solstice Botanicals, vector art on white background, minimal luxury apothecary stamp, clean lines.',
            usage: 'Bottle caps, dropper bulbs, seal stickers, favicon.',
          },
          {
            type: 'monochrome',
            title: 'Circular Apothecary Stamp',
            prompt: 'Circular botanical stamp emblem for Solstice Botanicals, monochrome deep green line art on white background, circular text border, vintage modern apothecary stamp.',
            usage: 'Kraft paper packaging, shipping boxes, wax seals, linen bags.',
          },
          {
            type: 'lockup',
            title: 'Horizontal Heritage Crest',
            prompt: 'Horizontal botanical crest emblem for Solstice Botanicals, refined balanced laurel and sun mark, vector on white background, clean luxury emblem.',
            usage: 'Header wordmark lockup, wholesale invoices, certificates.',
          },
        ],
      },
      primaryLogo: {
        prompt: 'Minimalist luxury botanical emblem for Solstice Botanicals, stylized sun and medicinal leaf fusion, clean line art vector logo, pure white background, elegant organic geometry, timeless graphic design.',
      },
    },
  },
  {
    id: 'velox-autonomous',
    name: 'Velox Fleet',
    category: 'Electric Autonomous Logistics',
    mission: 'To eliminate urban congestion and carbon emissions through whisper-quiet autonomous electric freight pods connected by algorithmic routing.',
    personality: 'Kinetic, industrial, hyper-efficient, resilient, purposeful',
    initialBible: {
      brandName: 'Velox Fleet',
      tagline: 'Zero-emission autonomous urban logistics at orbital speed.',
      missionStatement: 'To eliminate urban congestion and carbon emissions through whisper-quiet autonomous electric freight pods connected by algorithmic routing.',
      visionStatement: 'Cities unburdened by diesel trucks, powered by silent subterranean and street-level robotic supply webs.',
      archetype: 'The Hero & The Ruler',
      personalityAdjectives: ['Kinetic', 'Resilient', 'Algorithmic', 'Carbon-Zero', 'Rugged'],
      targetAudience: 'Municipal planners, global enterprise shippers, and sustainable supply chain leaders.',
      brandPillars: [
        { title: '99.999% On-Time Precision', description: 'Autonomous swarm dispatching that bypasses congestion bottlenecks in real time.' },
        { title: 'True Carbon Zero', description: '100% solar micro-depots and ultra-light composite electric pod architectures.' },
        { title: 'City-Friendly Safety', description: 'Sub-second optical LIDAR detection with pedestrian-first deceleration protocols.' },
      ],
      voiceGuidelines: {
        tone: 'Direct, engineered, authoritative, metric-driven, future-forward.',
        dos: [
          'State verifiable efficiency statistics and carbon offset metrics',
          'Use crisp industrial and aeronautical terminology',
          'Emphasize urban safety, silence, and reliability',
        ],
        donts: [
          'Avoid whimsical or cutesy tech startup language',
          'Don\'t gloss over physical safety or engineering realities',
          'Avoid sluggish or passive sentence structures',
        ],
      },
      palette: [
        {
          role: 'Dominant (60%)',
          name: 'Industrial Carbon',
          hex: '#0F172A',
          usage: 'Fleet chassis base, primary vehicle wraps, interface console headers.',
        },
        {
          role: 'Secondary (30%)',
          name: 'Steel Slate',
          hex: '#334155',
          usage: 'Secondary pod panels, telemetry graphs, structural interface modules.',
        },
        {
          role: 'Accent (10%)',
          name: 'Kinetic Volt',
          hex: '#00F0FF',
          usage: 'Safety LED indicators, urgent status alerts, primary logo kinetic spark.',
        },
        {
          role: 'Dark Neutral',
          name: 'Deep Asphalt',
          hex: '#020617',
          usage: 'Console backgrounds, dark interface container frames.',
        },
        {
          role: 'Light Neutral',
          name: 'Signal White',
          hex: '#F1F5F9',
          usage: 'High-contrast typography on dark vehicle wraps and data dashboards.',
        },
      ],
      typography: {
        headerFont: {
          name: 'Space Grotesk',
          category: 'Display',
          weights: ['600', '700'],
          usage: 'Vehicle fleet typography, telemetry headlines, executive data decks.',
        },
        bodyFont: {
          name: 'DM Sans',
          category: 'Sans-Serif',
          weights: ['400', '500'],
          usage: 'Operational telemetry feeds, dispatch alerts, enterprise contracts.',
        },
        pairingRationale: 'Space Grotesk projects industrial engineering rigor, while DM Sans delivers crisp optical legibility for fast-scanning operations monitors.',
      },
      logoPrompts: {
        primary: 'High-tech minimalist logo mark for Velox Fleet autonomous logistics, sleek kinetic geometric chevron arrow forming an infinity loop, cyber industrial aesthetic, sharp clean lines, vector logo on pure white background, futuristic transport brand mark.',
        secondaryMarks: [
          {
            type: 'icon',
            title: 'Fleet Monogram Mark',
            prompt: 'Futuristic V monogram emblem for Velox Fleet, sharp angular aerodynamic vector mark on white background, tech company app icon.',
            usage: 'Fleet telemetry app, driverless pod front badge, mobile status app.',
          },
          {
            type: 'monochrome',
            title: 'Stenciled Freight Badge',
            prompt: 'Industrial stenciled circular badge for Velox Fleet cargo, monochrome black on white background, barcode and geometric border details, heavy duty transport emblem.',
            usage: 'Shipping container doors, chassis stencils, safety inspection decals.',
          },
          {
            type: 'lockup',
            title: 'Aerodynamic Horizontal Vector',
            prompt: 'Streamlined aerodynamic horizontal speed-line mark for Velox Fleet, clean vector art on white background, modern aerospace brand symbol.',
            usage: 'Pod flank livery, website header, safety vests, shipping manifests.',
          },
        ],
      },
      primaryLogo: {
        prompt: 'High-tech minimalist logo mark for Velox Fleet autonomous logistics, sleek kinetic geometric chevron arrow forming an infinity loop, cyber industrial aesthetic, sharp clean lines, vector logo on pure white background, futuristic transport brand mark.',
      },
    },
  },
];
