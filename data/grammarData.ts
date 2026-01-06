export interface GrammarExerciseData {
  id: string;
  title: string;
  description: string;
  type: 'cloze' | 'choice';
  questions: {
    text: string;
    hint?: string;
    answer: string;
    options?: string[];
  }[];
}

export const GRAMMAR_EXERCISES: GrammarExerciseData[] = [
  {
    id: 'C15',
    title: 'Reflexive Verben',
    description: 'Ergänzen Sie die Reflexivpronomen (mich, dich, sich, uns, euch).',
    type: 'cloze',
    questions: [
      { text: "Ich erinnere ___ nicht gern an meine Schulzeit.", answer: "mich" },
      { text: "Er bedankt ___ für das Geschenk.", answer: "sich" },
      { text: "Ärgerst du ___ über die schlechte Note?", answer: "dich" },
      { text: "Interessieren Sie ___ für gefährliche Tiere?", answer: "sich" },
      { text: "Wir treffen ___ im BMW Museum.", answer: "uns" },
      { text: "In wen hat ___ Marianne verliebt?", answer: "sich" }
    ]
  },
  {
    id: 'C16',
    title: 'Verben im Perfekt',
    description: 'Setzen Sie das Verb in der richtigen Form ein (Partizip II).',
    type: 'cloze',
    questions: [
      { text: "arbeiten: Wie lange hast du ___?", answer: "gearbeitet" },
      { text: "fliegen: Wann ist Peter nach London ___?", answer: "geflogen" },
      { text: "lösen: Habt ihr das Problem ___?", answer: "gelöst" },
      { text: "einkaufen: Was hast du ___?", answer: "eingekauft" },
      { text: "aufstehen: Wann bist du ___?", answer: "aufgestanden" },
      { text: "essen: Was habt ihr ___?", answer: "gegessen" },
      { text: "lesen: Welches Buch hast du im Urlaub ___?", answer: "gelesen" },
      { text: "reparieren: Hat Carla den Computer schon ___?", answer: "repariert" }
    ]
  },
  {
    id: 'C23',
    title: 'Artikel ohne Nomen',
    description: 'Ergänzen Sie: (k)einen, (k)eins, (k)eine oder welche.',
    type: 'cloze',
    questions: [
      { text: "Hast du einen Stift für mich? - Ja, ich habe ___.", answer: "einen" },
      { text: "Hast du ein Radio für mich? - Nein, ich habe ___.", answer: "keins" },
      { text: "Hast du eine warme Mütze für mich? - Ja, ich habe ___.", answer: "eine" },
      { text: "Hast du ein paar Kopfschmerztabletten? - Ja, ich habe ___.", answer: "welche" },
      { text: "Hast du einen Fotoapparat für mich? - Nein, ich habe ___.", answer: "keinen" },
      { text: "Hast du ein Handy für mich? - Ja, ich habe ___.", answer: "eins" },
      { text: "Hast du ein paar Kekse für mich? - Ja, ich habe ___.", answer: "welche" }
    ]
  },
  {
    id: 'C29',
    title: 'Direkter Kasus (mir oder mich)',
    description: 'Wählen Sie das richtige Pronomen (Dativ oder Akkusativ).',
    type: 'choice',
    questions: [
      { text: "Wann kommst du ___ besuchen?", answer: "mich", options: ["mir", "mich"] },
      { text: "Kannst du ___ mal helfen?", answer: "mir", options: ["mir", "mich"] },
      { text: "Wann rufst du ___ wieder an?", answer: "mich", options: ["mir", "mich"] },
      { text: "Warum zeigst du ___ das Foto nicht?", answer: "mir", options: ["mir", "mich"] },
      { text: "Würden Sie ___ einen Kaffee bringen?", answer: "mir", options: ["mir", "mich"] },
      { text: "Warum liebst du ___ nicht?", answer: "mich", options: ["mir", "mich"] }
    ]
  },
  {
    id: 'C33',
    title: 'Wo oder Wohin?',
    description: 'Wählen Sie das passende Verb (stellen/stehen, legen/liegen...).',
    type: 'cloze',
    questions: [
      { text: "Die Katze ___ (liegen/legen) unter dem Sofa.", answer: "liegt" },
      { text: "Wo ___ (stehen/stellen) das Kopiergerät?", answer: "steht" },
      { text: "Frau Krumm ___ (legen/liegen) das Fax auf den Tisch.", answer: "legt" },
      { text: "Max ___ (stellen/stehen) die Gläser in die Maschine.", answer: "stellt" },
      { text: "Ist das deine Jacke, die dort an der Garderobe ___ (hängen)?", answer: "hängt" },
      { text: "Ich ___ (sitzen/setzen) bei Besprechungen immer neben dem Chef.", answer: "sitze" },
      { text: "Kannst du bitte die Lampe neben das Sofa ___ (stehen/stellen)?", answer: "stellen" }
    ]
  },
  {
    id: 'C34',
    title: 'Konnektoren (weil, wenn, denn)',
    description: 'Verbinden Sie die Sätze logisch.',
    type: 'choice',
    questions: [
      { text: "Ich kann die Rechnung nicht bezahlen, ___ ich mein Geld vergessen habe.", answer: "weil", options: ["weil", "wenn", "denn"] },
      { text: "Ich besuche dich, ___ ich Zeit habe.", answer: "wenn", options: ["weil", "wenn", "denn"] },
      { text: "Ich kaufe Brötchen beim Bäcker, ___ dort sind sie immer frisch.", answer: "denn", options: ["weil", "wenn", "denn"] },
      { text: "Anna kommt zu spät, ___ sie im Stau steht.", answer: "weil", options: ["weil", "wenn", "denn"] },
      { text: "Ich kann die Arbeit schaffen, ___ du mir hilfst.", answer: "wenn", options: ["weil", "wenn", "denn"] }
    ]
  }
];

// --- REFERENCE DATA ---

export interface TopicSection {
  title: string;
  content: {
    type: 'text' | 'table' | 'list' | 'sentence-structure';
    data: any;
    headers?: string[];
    description?: string;
  }[];
}

export const GRAMMAR_REFERENCE_CONTENT: Record<string, TopicSection[]> = {
  nomen: [
    {
      title: 'Artikel & Kasus',
      content: [
        {
          type: 'text',
          data: 'Die Endungen der Artikel zeigen den Kasus und das Genus. Lernen Sie die Artikel immer mit dem Nomen zusammen.'
        },
        {
          type: 'table',
          headers: ['Kasus', 'Maskulin (Tisch)', 'Feminin (Lampe)', 'Neutral (Auto)', 'Plural (Bücher)'],
          data: [
            ['Nominativ', '<span class="text-blue-600 font-bold">der</span> Tisch / ein Tisch', '<span class="text-red-500 font-bold">die</span> Lampe / eine Lampe', '<span class="text-green-600 font-bold">das</span> Auto / ein Auto', '<span class="text-orange-500 font-bold">die</span> Bücher / - Bücher'],
            ['Akkusativ', '<span class="text-blue-600 font-bold">den</span> Tisch / einen Tisch', '<span class="text-red-500 font-bold">die</span> Lampe / eine Lampe', '<span class="text-green-600 font-bold">das</span> Auto / ein Auto', '<span class="text-orange-500 font-bold">die</span> Bücher / - Bücher'],
            ['Dativ', '<span class="text-blue-600 font-bold">dem</span> Tisch / einem Tisch', '<span class="text-red-500 font-bold">der</span> Lampe / einer Lampe', '<span class="text-green-600 font-bold">dem</span> Auto / einem Auto', '<span class="text-orange-500 font-bold">den</span> Büchern / - Büchern'],
            ['Genitiv', '<span class="text-blue-600 font-bold">des</span> Tisches / eines Tisches', '<span class="text-red-500 font-bold">der</span> Lampe / einer Lampe', '<span class="text-green-600 font-bold">des</span> Autos / eines Autos', '<span class="text-orange-500 font-bold">der</span> Bücher / - Bücher']
          ]
        }
      ]
    },
    {
      title: 'Adjektivdeklination (Nomengruppe)',
      content: [
        {
          type: 'text',
          data: 'Die Endung des Adjektivs hängt davon ab, welcher Artikel vor dem Nomen steht.'
        },
        {
          type: 'table',
          description: '1. Nach bestimmtem Artikel (der/die/das)',
          headers: ['Kasus', 'Maskulin', 'Feminin', 'Neutral', 'Plural'],
          data: [
            ['Nominativ', 'der groß<b>e</b> Tisch', 'die rot<b>e</b> Jacke', 'das klein<b>e</b> Bild', 'die alt<b>en</b> Bücher'],
            ['Akkusativ', 'den groß<b>en</b> Tisch', 'die rot<b>e</b> Jacke', 'das klein<b>e</b> Bild', 'die alt<b>en</b> Bücher'],
            ['Dativ', 'dem groß<b>en</b> Tisch', 'der rot<b>en</b> Jacke', 'dem klein<b>en</b> Bild', 'den alt<b>en</b> Büchern'],
          ]
        },
        {
          type: 'table',
          description: '2. Nach unbestimmtem Artikel (ein/eine/mein/kein)',
          headers: ['Kasus', 'Maskulin', 'Feminin', 'Neutral', 'Plural'],
          data: [
            ['Nominativ', 'ein groß<b>er</b> Tisch', 'eine rot<b>e</b> Jacke', 'ein klein<b>es</b> Bild', 'meine alt<b>en</b> Bücher'],
            ['Akkusativ', 'einen groß<b>en</b> Tisch', 'eine rot<b>e</b> Jacke', 'ein klein<b>es</b> Bild', 'meine alt<b>en</b> Bücher'],
            ['Dativ', 'einem groß<b>en</b> Tisch', 'einer rot<b>en</b> Jacke', 'einem klein<b>en</b> Bild', 'meinen alt<b>en</b> Büchern'],
          ]
        }
      ]
    },
    {
      title: 'Plural der Nomen',
      content: [
        {
          type: 'list',
          data: [
            '<b>-e</b>: Viele Maskulina (der Tisch → die Tisch<b>e</b>)',
            '<b>-er</b>: Viele Neutra (das Bild → die Bild<b>er</b>)',
            '<b>-n/-en</b>: Die meisten Feminina (die Frau → die Frau<b>en</b>, die Lampe → die Lampe<b>n</b>)',
            '<b>-s</b>: Wörter aus dem Englischen / Abkürzungen (das Auto → die Auto<b>s</b>)',
            '<b>-</b> (keine Endung): Wörter auf -er, -el, -en (der Lehrer → die Lehrer)',
            '<b>Umlaut (ä/ö/ü)</b>: Oft bei starken Maskulina (der Apfel → die Äpfel)'
          ]
        }
      ]
    },
    {
      title: 'Possessivartikel',
      content: [
        {
          type: 'table',
          headers: ['Person', 'Maskulin (Vater)', 'Feminin (Mutter)', 'Neutral (Kind)', 'Plural (Eltern)'],
          data: [
            ['ich', 'mein', 'meine', 'mein', 'meine'],
            ['du', 'dein', 'deine', 'dein', 'deine'],
            ['er (M)', 'sein', 'seine', 'sein', 'seine'],
            ['sie (F)', 'ihr', 'ihre', 'ihr', 'ihre'],
            ['es (N)', 'sein', 'seine', 'sein', 'seine'],
            ['wir', 'unser', 'unsere', 'unser', 'unsere'],
            ['ihr', 'euer', 'eure', 'euer', 'eure'],
            ['Sie/sie', 'Ihr/ihr', 'Ihre/ihre', 'Ihr/ihr', 'Ihre/ihre'],
          ]
        }
      ]
    }
  ],
  pronomen: [
    {
      title: 'Personalpronomen',
      content: [
        {
          type: 'table',
          headers: ['Nominativ', 'Akkusativ', 'Dativ', 'Beispiel'],
          data: [
            ['ich', 'mich', 'mir', 'Gib <b>mir</b> das Buch.'],
            ['du', 'dich', 'dir', 'Ich liebe <b>dich</b>.'],
            ['er', 'ihn', 'ihm', 'Ich sehe <b>ihn</b>.'],
            ['sie', 'sie', 'ihr', 'Das Buch gehört <b>ihr</b>.'],
            ['es', 'es', 'ihm', 'Es geht <b>ihm</b> gut.'],
            ['wir', 'uns', 'uns', 'Besuch <b>uns</b> mal.'],
            ['ihr', 'euch', 'euch', 'Ich helfe <b>euch</b>.'],
            ['sie / Sie', 'sie / Sie', 'ihnen / Ihnen', 'Ich danke <b>Ihnen</b>.'],
          ]
        }
      ]
    }
  ],
  verben: [
    {
      title: 'Konjugation & Zeiten',
      content: [
        {
          type: 'table',
          description: 'Präsens (Gegenwart)',
          headers: ['Person', 'lernen (Regel)', 'fahren (a->ä)', 'lesen (e->ie)'],
          data: [
            ['ich', 'lerne', 'fahre', 'lese'],
            ['du', 'lernst', 'f<b>ä</b>hrst', 'l<b>ie</b>st'],
            ['er/sie/es', 'lernt', 'f<b>ä</b>hrt', 'l<b>ie</b>st'],
            ['wir', 'lernen', 'fahren', 'lesen'],
            ['ihr', 'lernt', 'fahrt', 'lest'],
            ['sie/Sie', 'lernen', 'fahren', 'lesen'],
          ]
        },
        {
          type: 'table',
          description: 'Präteritum (Vergangenheit - Schriftlich)',
          headers: ['Person', 'sein', 'haben', 'können (Modal)'],
          data: [
            ['ich/er/sie/es', 'war', 'hatte', 'konnte'],
            ['du', 'warst', 'hattest', 'konntest'],
            ['wir/sie/Sie', 'waren', 'hatten', 'konnten'],
            ['ihr', 'wart', 'hattet', 'konntet'],
          ]
        },
        {
          type: 'text',
          data: '<b>Perfekt</b> (Vergangenheit - Mündlich): Hilfsverb (haben/sein) + Partizip II am Satzende.<br/><i>Beispiel: Ich <b>bin</b> nach Hause <b>gegangen</b>.</i>'
        }
      ]
    },
    {
      title: 'Rektion der Verben (Kasus)',
      content: [
         {
            type: 'text',
            data: 'Einige Verben bestimmen den Kasus des Nomens (oder Pronomens).'
         },
         {
            type: 'table',
            description: 'Verben mit festem Kasus',
            headers: ['Kasus', 'Frage', 'Verben (Beispiele)'],
            data: [
               ['<b>Nominativ</b>', 'Wer/Was?', '<b>sein</b> (Das ist ein Tisch), <b>werden</b>, <b>bleiben</b>, <b>heißen</b>'],
               ['<b>Akkusativ</b>', 'Wen/Was?', '<b>haben</b>, <b>brauchen</b>, <b>essen</b>, <b>trinken</b>, <b>sehen</b>, <b>suchen</b>, <b>finden</b>, <b>kaufen</b>, <b>lesen</b>, <b>lieben</b>, <b>kennen</b>, <b>kosten</b>, <b>machen</b>, <b>öffnen</b>, <b>parken</b>'],
               ['<b>Dativ</b>', 'Wem?', '<b>danken</b>, <b>gefallen</b>, <b>gehören</b>, <b>helfen</b>, <b>passen</b>, <b>schmecken</b>, <b>antworten</b>, <b>gratulieren</b>, <b>fehlen</b>'],
               ['<b>Dativ + Akkusativ</b>', 'Wem? (Person) + Wen/Was? (Sache)', '<b>geben</b>, <b>schenken</b>, <b>schicken</b>, <b>bringen</b>, <b>zeigen</b>, <b>erklären</b>, <b>kaufen</b> (Er kauft <u>mir</u> <u>ein Eis</u>)']
            ]
         }
      ]
    },
    {
      title: 'Verben mit Präpositionen',
      content: [
        {
           type: 'text',
           data: 'Viele Verben haben eine feste Präposition. Diese Präposition bestimmt den Kasus (Dativ oder Akkusativ).'
        },
        {
           type: 'table',
           description: 'Präpositionen mit Dativ',
           headers: ['Präposition', 'Wichtige Verben'],
           data: [
              ['<b>an</b> + Dativ', '<b>teilnehmen</b> (an einem Kurs, an der Konferenz)'],
              ['<b>bei</b> + Dativ', '<b>anrufen</b> (beim Arzt), <b>arbeiten</b> (bei Siemens), <b>sich entschuldigen</b> (bei dem Lehrer)'],
              ['<b>mit</b> + Dativ', '<b>sprechen</b> (mit dem Chef), <b>reden</b> (mit der Tante), <b>telefonieren</b>, <b>sich streiten</b>'],
              ['<b>nach</b> + Dativ', '<b>fragen</b> (nach dem Weg), <b>suchen</b> (nach der Brille)'],
              ['<b>zu</b> + Dativ', '<b>gratulieren</b> (zum Geburtstag), <b>zählen</b> (zu den Besten)'],
              ['<b>von</b> + Dativ', '<b>erzählen</b> (vom Urlaub), <b>träumen</b> (von der Reise), <b>handeln</b> (von einem Buch)'],
              ['<b>aus</b> + Dativ', '<b>kommen</b> (aus der Türkei), <b>bestehen</b> (aus Holz)']
           ]
        },
        {
           type: 'table',
           description: 'Präpositionen mit Akkusativ',
           headers: ['Präposition', 'Wichtige Verben'],
           data: [
              ['<b>an</b> + Akkusativ', '<b>denken</b> (an den Urlaub), <b>sich erinnern</b> (an die Schulzeit)'],
              ['<b>auf</b> + Akkusativ', '<b>warten</b> (auf den Bus), <b>sich freuen</b> (auf das Wochenende - Zukunft), <b>aufpassen</b> (auf das Kind)'],
              ['<b>für</b> + Akkusativ', '<b>sich bedanken</b> (für das Geschenk), <b>sich interessieren</b> (für Musik), <b>sich entscheiden</b> (für das Auto)'],
              ['<b>in</b> + Akkusativ', '<b>sich verlieben</b> (in eine Person)'],
              ['<b>um</b> + Akkusativ', '<b>sich bewerben</b> (um eine Stelle), <b>es geht</b> (um das Geld), <b>sich kümmern</b> (um den Hund)'],
              ['<b>über</b> + Akkusativ', '<b>sprechen</b> (über Politik), <b>reden</b>, <b>berichten</b>, <b>sich freuen</b> (über das Geschenk - Gegenwart), <b>sich beschweren</b>, <b>sich ärgern</b>, <b>sich streiten</b>']
           ]
        }
     ]
    },
    {
      title: 'Imperativ & Konjunktiv II',
      content: [
        {
          type: 'table',
          description: 'Imperativ (Aufforderung)',
          headers: ['Adressat', 'Form', 'Beispiel'],
          data: [
            ['du (1 Person)', 'Verbstamm (ohne -st)', '<b>Komm</b> her! / <b>Fahr</b> los!'],
            ['ihr (Gruppe)', 'Verbform "ihr"', '<b>Kommt</b> her! / <b>Fahrt</b> los!'],
            ['Sie (Formell)', 'Verb + Sie', '<b>Kommen</b> Sie! / <b>Fahren</b> Sie!'],
          ]
        },
        {
          type: 'table',
          description: 'Konjunktiv II (Wunsch / Höflichkeit)',
          headers: ['Person', 'haben -> hätte', 'sein -> wäre', 'würden + Infinitiv'],
          data: [
            ['ich/er/sie', 'hätte', 'wäre', 'würde ... machen'],
            ['du', 'hättest', 'wärst', 'würdest ... machen'],
            ['wir/sie', 'hätten', 'wären', 'würden ... machen'],
          ]
        }
      ]
    }
  ],
  satzbau: [
    {
      title: 'Satzstruktur (Satzklammer)',
      content: [
        {
          type: 'sentence-structure',
          description: '1. Aussagesatz: Verb steht immer auf Position 2',
          data: [
            { pos1: 'Ich', verb1: 'kaufe', mid: 'heute im Supermarkt', verb2: 'ein.', type: 'Trennbar' },
            { pos1: 'Wir', verb1: 'haben', mid: 'gestern Fußball', verb2: 'gespielt.', type: 'Perfekt' },
            { pos1: 'Er', verb1: 'muss', mid: 'noch Hausaufgaben', verb2: 'machen.', type: 'Modal' },
          ]
        },
        {
          type: 'sentence-structure',
          description: '2. Ja/Nein Frage: Verb steht auf Position 1',
          data: [
            { pos1: '-', verb1: 'Kommst', mid: 'du heute', verb2: 'vorbei?', type: 'Frage' },
            { pos1: '-', verb1: 'Hast', mid: 'du das', verb2: 'verstanden?', type: 'Frage' },
          ]
        }
      ]
    },
    {
      title: 'Satzverbindungen (Konnektoren)',
      content: [
        {
            type: 'text',
            data: 'Die Position des Verbs ändert sich je nach Verbindungswort (Konnektor).'
        },
        {
            type: 'table',
            description: '1. Hauptsatz + Hauptsatz (Position 0)',
            headers: ['Funktion', 'Hauptsatz 1', 'Konnektor (Pos 0)', 'Hauptsatz 2'],
            data: [
                ['Grund', 'Ich mache Urlaub,', '<span class="text-orange-600 font-bold bg-orange-50 px-2 rounded">denn</span>', 'ich <span class="text-blue-600 font-bold">liebe</span> den Schnee.'],
                ['Gegensatz', 'Früher war ich weg,', '<span class="text-orange-600 font-bold bg-orange-50 px-2 rounded">aber</span>', 'heute <span class="text-blue-600 font-bold">bleibe</span> ich hier.'],
                ['Alternative', 'Wir wandern', '<span class="text-orange-600 font-bold bg-orange-50 px-2 rounded">oder</span>', 'wir <span class="text-blue-600 font-bold">fahren</span> ans Meer.'],
                ['Addition', 'Wir reisen', '<span class="text-orange-600 font-bold bg-orange-50 px-2 rounded">und</span>', 'wir <span class="text-blue-600 font-bold">besuchen</span> Freunde.']
            ]
        },
        {
            type: 'table',
            description: '2. Hauptsatz + Nebensatz (Verb am Ende)',
            headers: ['Funktion', 'Hauptsatz', 'Subjunktion', 'Nebensatz (Verb am Ende)'],
            data: [
                ['Grund', 'Ich mache Urlaub,', '<span class="text-purple-600 font-bold bg-purple-50 px-2 rounded">weil</span>', 'ich den Schnee <span class="text-blue-600 font-bold">liebe</span>.'],
                ['Gegensatz', 'Ich mache Urlaub,', '<span class="text-purple-600 font-bold bg-purple-50 px-2 rounded">obwohl</span>', 'ich den Schnee <span class="text-blue-600 font-bold">hasse</span>.'],
                ['Bedingung', 'Ich besuche dich,', '<span class="text-purple-600 font-bold bg-purple-50 px-2 rounded">wenn</span>', 'ich Zeit <span class="text-blue-600 font-bold">habe</span>.'],
                ['Zeit', 'Ich habe dich besucht,', '<span class="text-purple-600 font-bold bg-purple-50 px-2 rounded">als</span>', 'ich in München <span class="text-blue-600 font-bold">war</span>.'],
                ['Objekt', 'Ich weiß,', '<span class="text-purple-600 font-bold bg-purple-50 px-2 rounded">dass</span>', 'er heute <span class="text-blue-600 font-bold">kommt</span>.']
            ]
        },
        {
            type: 'table',
            description: '3. Konjunktionaladverbien (Position 1)',
            headers: ['Funktion', 'Satz 1', 'Verbindung (Pos 1)', 'Satz 2 (Verb auf Pos 2)'],
            data: [
                ['Grund', 'Ich habe keine Zeit,', '<span class="text-emerald-600 font-bold bg-emerald-50 px-2 rounded">deshalb</span>', '<span class="text-blue-600 font-bold">komme</span> ich nicht.'],
                ['Gegensatz', 'Ich habe keine Zeit,', '<span class="text-emerald-600 font-bold bg-emerald-50 px-2 rounded">trotzdem</span>', '<span class="text-blue-600 font-bold">komme</span> ich zu dir.']
            ]
        }
      ]
    },
    {
      title: 'Infinitiv & Relativsätze',
      content: [
        {
           type: 'list',
           description: 'Infinitivkonstruktionen',
           data: [
             '<b>Infinitiv mit zu</b>: Ich habe keine Lust, <u>zu kochen</u>.',
             '<b>um... zu (Zweck/Ziel)</b>: Ich lerne Deutsch, <u>um</u> in Deutschland <u>zu arbeiten</u>.',
             '<b>Ausnahmen</b> (kein zu): Modalverben (wollen, können), gehen, bleiben, lassen, hören, sehen.'
           ]
        },
        {
           type: 'table',
           description: 'Relativpronomen (Bezugswort bestimmt Genus, Satz bestimmt Kasus)',
           headers: ['Kasus', 'Maskulin', 'Feminin', 'Neutral', 'Plural'],
           data: [
             ['Nom', 'der', 'die', 'das', 'die'],
             ['Akk', 'den', 'die', 'das', 'die'],
             ['Dat', 'dem', 'der', 'dem', 'denen'],
           ]
        }
      ]
    }
  ],
  praepositionen: [
    {
      title: 'Präpositionen (Zeit & Ort)',
      content: [
        {
          type: 'list',
          description: 'Temporale Präpositionen (Wann?)',
          data: [
             '<b>um</b>: Uhrzeit (um 8 Uhr)',
             '<b>am</b>: Tage, Tageszeiten, Datum (am Montag, am Morgen, am 1. Mai)',
             '<b>im</b>: Monate, Jahreszeiten (im August, im Sommer, im Jahr 2024)',
             '<b>seit</b>: Beginn in Vergangenheit, dauert noch an (seit 2 Jahren)',
             '<b>vor</b>: Zeitpunkt in Vergangenheit (vor 2 Jahren)'
          ]
        },
        {
           type: 'table',
           description: 'Wechselpräpositionen (Ort)',
           headers: ['Frage', 'Kasus', 'Beispiel'],
           data: [
              ['<b>Wo?</b> (Position)', 'Dativ', 'Das Buch liegt auf <b>dem</b> Tisch.'],
              ['<b>Wohin?</b> (Bewegung)', 'Akkusativ', 'Ich lege das Buch auf <b>den</b> Tisch.']
           ]
        }
      ]
    },
    {
      title: 'Komparation der Adjektive',
      content: [
        {
          type: 'table',
          headers: ['Positiv', 'Komparativ (-er)', 'Superlativ (am ...-sten)'],
          data: [
            ['schnell', 'schneller', 'am schnellsten'],
            ['schön', 'schöner', 'am schönsten'],
            ['groß', 'größer', 'am größten (ß -> ß)'],
            ['gut', 'besser', 'am besten (Sonderform)'],
            ['viel', 'mehr', 'am meisten (Sonderform)'],
            ['gern', 'lieber', 'am liebsten (Sonderform)'],
            ['hoch', 'höher', 'am höchsten (c entfällt)'],
            ['nah', 'näher', 'am nächsten'],
          ]
        },
        {
          type: 'text',
          data: '<b>Vergleich:</b><br/>Er ist so groß <b>wie</b> ich. (gleich)<br/>Er ist größer <b>als</b> ich. (ungleich)'
        }
      ]
    }
  ]
};