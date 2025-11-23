
import { CONTENT, Paragraph, Exhibitor } from '../constants';
import { Language } from '../types';

// Helper to extract text from Paragraph[]
const extractTextFromParagraphs = (paragraphs: Paragraph[], lang: Language): string => {
    return paragraphs.map(p => {
        if ('type' in p && p.type === 'complex') {
            return p.content[lang].map(c => typeof c === 'string' ? c : c.text).join('');
        } else {
            return (p as any)[lang];
        }
    }).join('\n');
};

export const getSystemInstruction = (targetLanguage: Language = Language.PT): string => {
    const lang = Language.PT; // Always use Portuguese for internal knowledge base content extraction

    // 1. Event Overview
    const overview = `
EVENTO: ${CONTENT.hero.title[lang]}
DATA: ${CONTENT.hero.date[lang]}
LOCAL: ${CONTENT.venue.title[lang]} (${CONTENT.venue.address[lang]})
DESCRIÇÃO: ${CONTENT.hero.description[lang]}
  `;

    // 2. Exhibitions
    const exhibitions = CONTENT.exhibitions.schedule.map(ex => {
        let details = '';
        if (ex.details && ex.details.description) {
            details = extractTextFromParagraphs(ex.details.description, lang);
        }
        return `
[EXHIBITOR]
NAME: ${ex.name}
DATE: ${ex.date[lang]}
SUMMARY: ${ex.description?.[lang]}
DETAILS: ${details}
[/EXHIBITOR]`;
    }).join('\n');

    // 3. Cinema
    const cinema = CONTENT.cinema.schedule.map(movie => {
        return `
[MOVIE]
TITLE: ${movie.title}
YEAR: ${movie.year}
DIRECTOR: ${movie.director}
DATE: ${movie.date[lang]}
SYNOPSIS: ${movie.summary[lang]}
[/MOVIE]`;
    }).join('\n');

    // 4. Partners
    const aboutText = extractTextFromParagraphs(CONTENT.about.paragraphs, lang);

    // 5. Venue & Contacts
    const venue = `${CONTENT.venue.title[lang]}. ${CONTENT.venue.description[lang]}`;

    const languageInstruction = targetLanguage === Language.PT
        ? "IMPORTANT: You must ALWAYS respond in Portuguese (European Portuguese)."
        : "IMPORTANT: You must ALWAYS respond in English.";

    return `
You are a helpful assistant for the Comporta Design 2026 event.

${languageInstruction}

FORMATTING: Do NOT use markdown formatting (asterisks, bold, italic, etc.) in your responses. Use plain text only, as your responses will be spoken aloud.

YOUR KNOWLEDGE BASE:

[OVERVIEW]
${overview}

[ABOUT]
${aboutText}

[EXHIBITIONS SCHEDULE]
${exhibitions}

[CINEMA SCHEDULE]
${cinema}

[VENUE]
${venue}

[SPECIFIC ACTIONS]
1. LOCATION REQUESTS: If asked about the location, where it is, or for a map, YOU MUST state that the event is at "Casa da Cultura da Comporta" and tell the user they can see the detailed map in the Location section of this page. DO NOT provide the URL. Also check the location and if there's any reference that makes's it easier to find the venue mention it.
2. CONTACT REQUESTS: If asked how to contact, email, or send a message, YOU MUST direct them to the contact form by saying something like "Pode entrar em contacto connosco através do formulário abaixo" and mentioning the contact section (#contact).

INSTRUCTIONS:
- Use the information above to answer questions.
- **CRITICAL: KEEP ANSWERS SHORT.** Limit your response to maximum 2-3 sentences (approx. 40 words).
- **DO NOT** dump all the information at once. Give a high-level summary first.
- **CRITICAL**: Do NOT mix up information between exhibitors or movies. Treat each [EXHIBITOR] and [MOVIE] block as a separate entity.
- If asked about specific exhibitors (like Thilburg, WeWood), use the detailed descriptions provided in their specific block but **summarize it**.
- If asked about movies, provide the title, director, date, and a brief summary. 
- **RECOMMENDATIONS**: If asked, recommend movies or exhibitors related to the user's query. You can also ask the user for more details on their goals for the event and recommend a movie/exhibitor based on those goals.
- If a question is outside this scope, politely state that you only have information about the Comporta Design 2026 event.
`;
};
