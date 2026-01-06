import { GoogleGenAI, Type } from "@google/genai";
import { 
  TabooCard, RolePlayScenario, TopicContent, WouldYouRatherScenario, 
  StoryStarter, CorrectionResult, WritingTask, WritingFeedback, 
  ReadingTask, SpeakingTask, VocabularyItem 
} from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const MODEL_NAME = 'gemini-3-flash-preview';

export const GeminiService = {
  /**
   * Generates content (Theses, Questions, Vocab, Phrases) for a specific topic.
   */
  async getTopicContent(topicTitle: string): Promise<TopicContent> {
    const prompt = `Erstelle Inhalte für den 1:1 Deutschunterricht (Niveau A2) zum Thema "${topicTitle}".
    Ich brauche:
    1. 4 interessante Thesen (Behauptungen), über die Lehrer und Schüler diskutieren können (einfaches Deutsch).
    2. 4 persönliche Fragen an den Schüler, um ein Gespräch zu starten.
    3. 6 wichtige Vokabeln (Nomen mit Artikel oder Verben) zu diesem Thema. Für jede Vokabel brauche ich: Das deutsche Wort, die englische Übersetzung und einen einfachen deutschen Beispielsatz.
    4. 5 nützliche Redemittel (ganze Sätze oder Phrasen), die der Schüler bei diesem Thema gut benutzen kann.
    Antworte im JSON Format.`;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            thesen: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Kontroverse oder interessante Behauptungen zum Thema (Niveau A2)"
            },
            fragen: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Persönliche Fragen an den Schüler (Niveau A2)"
            },
            vocabulary: {
              type: Type.ARRAY,
              items: { 
                type: Type.OBJECT,
                properties: {
                  word: { type: Type.STRING },
                  translation: { type: Type.STRING },
                  example: { type: Type.STRING }
                },
                required: ["word", "translation", "example"]
              },
              description: "Wichtige Wörter mit Übersetzung und Beispiel"
            },
            phrases: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Nützliche Sätze oder Redemittel zum Thema"
            }
          },
          required: ["thesen", "fragen", "vocabulary", "phrases"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");
    return JSON.parse(text) as TopicContent;
  },

  /**
   * NEW: Generates a large list of 20 vocabulary items for the separate Vocab Trainer.
   */
  async getExtendedVocabularyList(topicTitle: string): Promise<VocabularyItem[]> {
    const prompt = `Erstelle eine umfangreiche Vokabelliste für Deutschlerner (Niveau A2) zum Thema "${topicTitle}".
    Ich brauche exakt 20 relevante Wörter (Nomen mit Artikel, Verben oder wichtige Adjektive).
    
    Für jedes Wort:
    - Das deutsche Wort (mit Artikel bei Nomen)
    - Die englische Übersetzung
    - Einen kurzen, einfachen Beispielsatz auf Deutsch (A2)
    
    Antworte im JSON Format als Array.`;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              word: { type: Type.STRING },
              translation: { type: Type.STRING },
              example: { type: Type.STRING }
            },
            required: ["word", "translation", "example"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");
    return JSON.parse(text) as VocabularyItem[];
  },

  /**
   * Generates a random Taboo card (Word + Forbidden words).
   */
  async getTabooCard(): Promise<TabooCard> {
    const prompt = `Generiere eine "Tabu"-Spielkarte für Deutschlerner (Niveau A2).
    Das gesuchte Wort soll ein gängiges Nomen, Verb oder Adjektiv sein.
    Dazu 3 "verbotene Wörter", die man beim Erklären nicht benutzen darf.
    Antworte im JSON Format.`;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            word: { type: Type.STRING, description: "Das zu erratende Wort" },
            forbidden: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "3 Wörter, die nicht benutzt werden dürfen" 
            }
          },
          required: ["word", "forbidden"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");
    return JSON.parse(text) as TabooCard;
  },

  /**
   * Generates a Role Play scenario selected from 12 diverse options.
   */
  async getRolePlayScenario(): Promise<RolePlayScenario> {
    const prompt = `Wähle ZUFÄLLIG eines der folgenden 12 Rollenspiel-Szenarien für das Niveau A2 aus (bitte stark variieren):

    1. Im Restaurant: Der Gast hat ein Haar in der Suppe gefunden und beschwert sich beim Kellner.
    2. Beim Arzt: Der Patient braucht einen Termin, aber die Praxis ist voll.
    3. Im Hotel: Die Klimaanlage im Zimmer funktioniert nicht. Der Gast ruft die Rezeption an.
    4. Am Bahnhof: Der Zug hat Verspätung. Der Reisende fragt am Infoschalter nach Anschlusszügen.
    5. Im Supermarkt: Ein Kunde sucht ein bestimmtes Produkt, das nicht im Regal steht.
    6. Auf dem Wohnungsamt: Man muss sich anmelden und hat ein Dokument vergessen.
    7. Mit dem Nachbarn: Das Paket wurde beim Nachbarn abgegeben, man möchte es abholen.
    8. Im Bekleidungsgeschäft: Der Kunde möchte eine Hose umtauschen, hat aber keinen Kassenbon mehr.
    9. Party-Einladung: Ein Freund lädt einen anderen zur Geburtstagsparty ein, der andere hat aber keine Lust/Zeit.
    10. In der Apotheke: Der Kunde braucht etwas gegen eine starke Erkältung.
    11. Fundsachen: Jemand hat seinen Geldbeutel im Bus verloren und fragt im Fundbüro nach.
    12. Verabredung: Zwei Freunde wollen ins Kino, können sich aber nicht auf einen Film einigen.

    Erstelle für das ausgewählte Szenario:
    1. Einen passenden Titel.
    2. Eine Situationsbeschreibung.
    3. Anweisungen für Rolle A und Rolle B.
    4. Ein klares Ziel für das Gespräch.
    5. 6 nützliche Redemittel (ganze Sätze), die genau zu diesem Szenario passen und dem Schüler helfen.

    Antworte im JSON Format.`;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "Titel des Szenarios" },
            situation: { type: Type.STRING, description: "Beschreibung der Situation" },
            roleA: { type: Type.STRING, description: "Anweisung für Person A" },
            roleB: { type: Type.STRING, description: "Anweisung für Person B" },
            goal: { type: Type.STRING, description: "Ziel des Gesprächs" },
            phrases: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING }, 
              description: "5-6 nützliche Redemittel/Sätze für dieses Szenario" 
            }
          },
          required: ["title", "situation", "roleA", "roleB", "goal", "phrases"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");
    return JSON.parse(text) as RolePlayScenario;
  },

  /**
   * Generates a "Would You Rather" scenario.
   */
  async getWouldYouRather(): Promise<WouldYouRatherScenario> {
    const prompt = `Erstelle ein "Würdest du lieber..." Szenario für Deutschlerner (Niveau A2).
    Die beiden Optionen sollen lustig, interessant oder moralisch herausfordernd sein, aber in einfachem Deutsch formuliert.
    Antworte im JSON Format.`;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            optionA: { type: Type.STRING, description: "Erste Option (beginnt mit Verb oder Satzteil)" },
            optionB: { type: Type.STRING, description: "Zweite Option (beginnt mit Verb oder Satzteil)" }
          },
          required: ["optionA", "optionB"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");
    return JSON.parse(text) as WouldYouRatherScenario;
  },

  /**
   * Generates a Story Starter scenario.
   */
  async getStoryStarter(): Promise<StoryStarter> {
    const prompt = `Erstelle einen Anfang für eine gemeinsame Geschichte (Lehrer und Schüler abwechselnd) auf Niveau A2.
    1. Ein lustiger oder spannender Anfangssatz (ca. 10-15 Wörter).
    2. 3 zufällige Wörter (Nomen/Verben), die in der Geschichte später vorkommen MÜSSEN.
    3. Ein Genre (z.B. Krimi, Märchen, Komödie).
    Antworte im JSON Format.`;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sentence: { type: Type.STRING, description: "Der erste Satz der Geschichte" },
            words: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3 Pflichtwörter" },
            genre: { type: Type.STRING, description: "Das Genre der Geschichte" }
          },
          required: ["sentence", "words", "genre"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");
    return JSON.parse(text) as StoryStarter;
  },

  /**
   * Corrects a student sentence and explains grammar.
   */
  async correctStudentSentence(input: string): Promise<CorrectionResult> {
    const prompt = `Ein Deutschschüler (A2) hat diesen Satz gesagt: "${input}".
    Ist er grammatikalisch korrekt?
    Wenn nein, korrigiere ihn.
    Gib eine sehr kurze, einfache Erklärung für den Fehler (auf Deutsch, A2 Niveau), als wärst du ein netter Tutor.
    Wenn er richtig ist, sag "Der Satz ist perfekt!" und gib ein Lob.
    Antworte im JSON Format.`;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            corrected: { type: Type.STRING, description: "Der korrigierte Satz" },
            explanation: { type: Type.STRING, description: "Kurze Erklärung der Grammatikregel" }
          },
          required: ["corrected", "explanation"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");
    return JSON.parse(text) as CorrectionResult;
  },

  // --- EXAM PREP METHODS ---

  /**
   * Generates a Writing Task (SMS or Email) similar to Goethe A2.
   */
  async getExamWritingTask(): Promise<WritingTask> {
    const prompt = `Erstelle eine Schreibaufgabe für das Goethe-Zertifikat A2 (Schreiben Teil A oder B).
    Die Aufgabe sollte eine SMS oder E-Mail Situation sein (z.B. Einladung, Absage, Entschuldigung).
    Es MÜSSEN 3 Punkte enthalten sein, zu denen der Schüler etwas schreiben soll.
    Antworte im JSON Format.`;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            type: { type: Type.STRING, enum: ['SMS', 'EMAIL'] },
            situation: { type: Type.STRING, description: "Die Beschreibung der Situation (Sie bekommen eine Mail von...)" },
            points: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING }, 
              description: "3 Punkte, die bearbeitet werden müssen" 
            }
          },
          required: ["type", "situation", "points"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");
    return JSON.parse(text) as WritingTask;
  },

  /**
   * Evaluates the student's writing task.
   */
  async evaluateExamWriting(task: WritingTask, studentText: string): Promise<WritingFeedback> {
    const prompt = `Bewerte diesen Text eines A2-Schülers für das Goethe-Zertifikat.
    Aufgabe: ${task.situation}.
    Punkte, die enthalten sein müssen: ${task.points.join(', ')}.
    Schüler-Text: "${studentText}".
    
    Bewerte:
    1. Grammatik/Wortschatz korrigieren.
    2. Inhalt: Wurden alle 3 Punkte angesprochen?
    3. Gib eine Punktzahl von 0 bis 10.
    Antworte im JSON Format.`;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            correctedText: { type: Type.STRING, description: "Die korrigierte Version des Textes" },
            grammarFeedback: { type: Type.STRING, description: "Feedback zu Fehlern (A2 Niveau)" },
            contentFeedback: { type: Type.STRING, description: "Feedback zum Inhalt (Punkte erfüllt?)" },
            score: { type: Type.NUMBER, description: "Punkte 0-10" }
          },
          required: ["correctedText", "grammarFeedback", "contentFeedback", "score"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");
    return JSON.parse(text) as WritingFeedback;
  },

  /**
   * Generates a Reading Comprehension task (Short Text + MCQ) similar to Goethe A2.
   */
  async getExamReadingTask(): Promise<ReadingTask> {
    const prompt = `Erstelle eine Leseaufgabe für Goethe A2 (Teil 2: Anzeigen/Schilder oder kurze E-Mail).
    1. Ein kurzer Text (ca. 40-60 Wörter).
    2. Eine Multiple-Choice Frage dazu (a, b, c).
    Antworte im JSON Format.`;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            text: { type: Type.STRING, description: "Der Lesetext (Anzeige, Notiz, Email)" },
            question: { type: Type.STRING, description: "Die Frage zum Text" },
            options: {
              type: Type.OBJECT,
              properties: {
                a: { type: Type.STRING },
                b: { type: Type.STRING },
                c: { type: Type.STRING }
              },
              required: ["a", "b", "c"]
            },
            correctAnswer: { type: Type.STRING, enum: ["a", "b", "c"] }
          },
          required: ["text", "question", "options", "correctAnswer"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");
    return JSON.parse(text) as ReadingTask;
  },

  /**
   * Generates a Speaking Task Part 3 (Planning Together) based on varied Goethe-style scenarios.
   */
  async getExamSpeakingTask(): Promise<SpeakingTask> {
    const prompt = `Erstelle eine Sprechaufgabe für Goethe A2 Sprechen Teil 3 (Gemeinsam etwas planen).
    
    Wähle ZUFÄLLIG eines der folgenden, typischen Goethe-Szenarien (bitte variieren):
    1. Einen Krankenbesuch bei einem gemeinsamen Freund planen (Wann? Was mitbringen?).
    2. Ein Abschiedsgeschenk für einen Kollegen/eine Kollegin kaufen (Was? Wie teuer? Wer kauft es?).
    3. Gemeinsam am Wochenende kochen (Bei wem? Was essen? Wer kauft ein?).
    4. Einen Ausflug am Wochenende planen (Wohin? Wann? Wie fahren?).
    5. Eine Party für den Deutschkurs organisieren (Essen? Musik? Einladungen?).
    6. Einen Termin finden, um gemeinsam Sport zu machen.
    7. Jemandem beim Umzug helfen (Wann? Wer hilft noch? Auto?).

    Gib genau 4 konkrete inhaltliche Stichpunkte vor, über die gesprochen werden muss.
    Antworte im JSON Format.`;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            topic: { type: Type.STRING, description: "Das Thema (z.B. Ein Geschenk kaufen)" },
            task: { type: Type.STRING, description: "Die Anweisung (Sie wollen mit Ihrem Partner...)" },
            pointsToDiscuss: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING }, 
              description: "4 Stichpunkte (Was? Wann? Wie teuer? etc.)" 
            }
          },
          required: ["topic", "task", "pointsToDiscuss"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");
    return JSON.parse(text) as SpeakingTask;
  }
};