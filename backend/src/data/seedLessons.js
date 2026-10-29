"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedLessons = void 0;
exports.seedLessons = [
    // ==========================================
    // LEVEL A1 (Beginner) - 5 Lessons
    // ==========================================
    {
        id: 'lesson-a1-1',
        title: 'A1: The English Alphabet & Essential Pronunciation',
        level: 'a1',
        skill: 'speaking',
        durationMinutes: 20,
        orderIndex: 1,
        description: 'Learn the 26 letters of the English alphabet, vowel vs consonant sounds, and phonetic spelling for IELTS Listening names.',
        content: {
            overview: 'Mastering the sounds of English is the first step toward clear speaking and accurate listening.',
            objectives: [
                'Recognize and pronounce all 26 letters and 44 phonemes',
                'Distinguish between short and long vowel sounds',
                'Accurately transcribe spelled names and addresses in IELTS Listening Part 1'
            ],
            explanations: [
                'English has 26 letters but 44 distinct sounds (phonemes). In IELTS Listening Section 1, names, street names, and reference codes are frequently spelled out letter by letter.',
                'Watch out for letters that learners commonly confuse: B vs V, J vs G, P vs B, and vowels A, E, I, O, U.'
            ],
            vocabulary: [
                { word: 'Alphabet', meaning: 'A set of letters arranged in a fixed order', example: 'The English alphabet has 26 letters.' },
                { word: 'Vowel', meaning: 'A speech sound produced without blocking the breath (A, E, I, O, U)', example: 'Every English syllable has a vowel sound.' },
                { word: 'Consonant', meaning: 'A speech sound where breath is partially obstructed', example: 'The letter B is a voiced consonant.' }
            ],
            exercises: [
                {
                    id: 'a1-1-q1',
                    type: 'multiple-choice',
                    question: 'Which vowel sound is in the word "Cat"?',
                    options: ['A. Long /eɪ/ sound', 'B. Short /æ/ sound', 'C. Schwa /ə/ sound', 'D. Dipthong /aɪ/ sound'],
                    correctAnswer: 'B',
                    explanation: '"Cat" uses the short open front unrounded vowel /æ/.'
                },
                {
                    id: 'a1-1-q2',
                    type: 'fill-blank',
                    question: 'In IELTS Listening, when a surname is spelled "S-M-I-T-H", the third letter is ______.',
                    correctAnswer: 'I',
                    explanation: 'The spelling is S-M-I-T-H, making the third letter "I".'
                }
            ],
            tips: [
                'Practice reciting the alphabet backwards to test instant letter recognition.',
                'Pay special attention to the pronunciation of A (/eɪ/), E (/iː/), and I (/aɪ/).'
            ]
        }
    },
    {
        id: 'lesson-a1-2',
        title: 'A1: Present Simple: The Verb "To Be" & Introductions',
        level: 'a1',
        skill: 'grammar',
        durationMinutes: 20,
        orderIndex: 2,
        description: 'Learn how to use am, is, are, negative forms, questions, and personal pronouns for everyday introductions.',
        content: {
            overview: 'The verb "to be" is the bedrock of English sentence construction and self-introductions in IELTS Speaking Part 1.',
            objectives: [
                'Use am, is, are correctly with subject pronouns',
                'Form negative statements and yes/no questions with "to be"',
                'Introduce yourself confidently with name, age, and country'
            ],
            explanations: [
                'I am (I\'m), You are (You\'re), He/She/It is (He\'s/She\'s/It\'s), We are (We\'re), They are (They\'re).',
                'To ask a question, invert the subject and verb: "Are you a student?" or "Is he from Canada?"'
            ],
            grammarRules: [
                { rule: 'Affirmative: Subject + am/is/are + Complement', example: 'She is an architecture student from Madrid.' },
                { rule: 'Negative: Subject + am/is/are + not + Complement', example: 'They are not available at 10 AM.' },
                { rule: 'Question: Am/Is/Are + Subject + Complement?', example: 'Are you preparing for IELTS Academic?' }
            ],
            exercises: [
                {
                    id: 'a1-2-q1',
                    type: 'multiple-choice',
                    question: 'Complete the sentence: "Elena and Carlos ______ from Valencia."',
                    options: ['A. is', 'B. are', 'C. am', 'D. be'],
                    correctAnswer: 'B',
                    explanation: 'Elena and Carlos = "They", which takes "are".'
                },
                {
                    id: 'a1-2-q2',
                    type: 'fill-blank',
                    question: 'Make negative: "He ______ (not be) ready for the test today."',
                    correctAnswer: 'is not',
                    explanation: 'The negative form for "he" is "is not" or "isn\'t".'
                }
            ],
            tips: [
                'In Speaking Part 1, respond with full sentences: "I am currently living in Manchester."'
            ]
        }
    },
    {
        id: 'lesson-a1-3',
        title: 'A1: Numbers, Dates & Time for IELTS Listening',
        level: 'a1',
        skill: 'listening',
        durationMinutes: 25,
        orderIndex: 3,
        description: 'Master cardinal numbers, telephone digits, ordinal dates, currencies, and clock times.',
        content: {
            overview: 'Section 1 of IELTS Listening tests your ability to write phone numbers, dates, times, and prices without spelling errors.',
            objectives: [
                'Differentiate between "-teen" and "-ty" numbers (14 vs 40, 15 vs 50)',
                'Accurately format dates (e.g. 24th October or October 24)',
                'Write currency symbols and double numbers correctly'
            ],
            explanations: [
                'Double numbers: "77" is often read as "double seven". Zero is read as "oh" or "zero".',
                'Stress patterns distinguish 13 (thir-TEEN) from 30 (THIR-ty).'
            ],
            exercises: [
                {
                    id: 'a1-3-q1',
                    type: 'multiple-choice',
                    question: 'How is the telephone number 07700 900123 commonly dictated in British English?',
                    options: [
                        'A. zero seven seven zero zero nine zero zero one two three',
                        'B. oh double seven double oh nine double oh one two three',
                        'C. seven thousand seven hundred',
                        'D. oh seventy-seven hundred'
                    ],
                    correctAnswer: 'B',
                    explanation: 'In the UK, repeated digits are said as "double", and 0 is commonly pronounced "oh".'
                }
            ],
            tips: [
                'Check word limit instructions carefully: "NO MORE THAN ONE WORD AND/OR A NUMBER".'
            ]
        }
    },
    {
        id: 'lesson-a1-4',
        title: 'A1: Present Simple for Daily Routines & Habits',
        level: 'a1',
        skill: 'grammar',
        durationMinutes: 20,
        orderIndex: 4,
        description: 'Use the present simple tense with frequency adverbs (always, usually, sometimes, never) to describe lifestyle.',
        content: {
            overview: 'Describing habits and daily routines is a core requirement for IELTS Speaking Part 1 topics like Work, Study, and Weekends.',
            objectives: [
                'Apply third person singular -s/-es rule accurately',
                'Position adverbs of frequency correctly in sentences',
                'Form negative sentences using don\'t and doesn\'t'
            ],
            grammarRules: [
                { rule: 'Third person -s: He/She/It + verb + -s/-es', example: 'He wakes up at 7:00 AM every morning.' },
                { rule: 'Adverbs of frequency go before the main verb, but after the verb "to be"', example: 'I usually study in the library. She is always punctual.' }
            ],
            exercises: [
                {
                    id: 'a1-4-q1',
                    type: 'fill-blank',
                    question: 'Sarah ______ (study) English for two hours every evening.',
                    correctAnswer: 'studies',
                    explanation: 'For third person singular ending in consonant + y, change y to -ies: "studies".'
                }
            ],
            tips: [
                'Don\'t forget the third person -s! It is one of the most common grammar slips in IELTS Speaking.'
            ]
        }
    },
    {
        id: 'lesson-a1-5',
        title: 'A1: Question Words & Basic Dialogue (Wh- Questions)',
        level: 'a1',
        skill: 'speaking',
        durationMinutes: 20,
        orderIndex: 5,
        description: 'Understand and formulate questions using Who, What, Where, When, Why, and How.',
        content: {
            overview: 'Understanding the examiner\'s question word is vital so you answer what was actually asked.',
            objectives: [
                'Identify question words instantly',
                'Form Wh- questions with do/does auxiliary verbs',
                'Give extended answers rather than yes/no responses'
            ],
            explanations: [
                'Where = Place; When = Time; Why = Reason; Who = Person; How = Manner/Method.',
                'Formula: Question Word + Auxiliary (do/does/is/are) + Subject + Main Verb?'
            ],
            exercises: [
                {
                    id: 'a1-5-q1',
                    type: 'multiple-choice',
                    question: 'Choose the correct question: "______ do you usually travel to work?" - "By bus."',
                    options: ['A. Where', 'B. How', 'C. When', 'D. Which'],
                    correctAnswer: 'B',
                    explanation: 'The answer "By bus" indicates method of transportation, which requires "How".'
                }
            ],
            tips: [
                'In IELTS Speaking, never give a one-word answer. Always state your point and add a supporting detail.'
            ]
        }
    },
    // ==========================================
    // LEVEL A2 (Elementary) - 5 Lessons
    // ==========================================
    {
        id: 'lesson-a2-1',
        title: 'A2: Past Simple: Regular & Irregular Verbs',
        level: 'a2',
        skill: 'grammar',
        durationMinutes: 25,
        orderIndex: 1,
        description: 'Talk about past experiences, completed events, and personal history using regular and irregular past verbs.',
        content: {
            overview: 'The Past Simple is crucial for narrating personal experiences in IELTS Speaking Part 2.',
            objectives: [
                'Form regular past verbs with -ed and pronounce them correctly (/t/, /d/, /ɪd/)',
                'Memorize top 50 irregular verbs (went, took, bought, saw, etc.)',
                'Form negatives and questions using "did / didn\'t + base form"'
            ],
            grammarRules: [
                { rule: 'Regular: verb + -ed', example: 'We visited the British Museum yesterday.' },
                { rule: 'Negative: didn\'t + infinitive', example: 'I didn\'t notice the announcement.' }
            ],
            exercises: [
                {
                    id: 'a2-1-q1',
                    type: 'fill-blank',
                    question: 'Past tense of "buy": Yesterday I ______ a new IELTS Cambridge practice book.',
                    correctAnswer: 'bought',
                    explanation: '"Buy" is irregular: buy -> bought -> bought.'
                }
            ],
            tips: [
                'Remember that after "did" or "didn\'t", the verb returns to its base form: "Did you go?", not "Did you went?".'
            ]
        }
    },
    {
        id: 'lesson-a2-2',
        title: 'A2: Comparatives & Superlatives in IELTS Descriptions',
        level: 'a2',
        skill: 'writing',
        durationMinutes: 25,
        orderIndex: 2,
        description: 'Compare data, cities, objects, and lifestyles using comparative (-er / more) and superlative (-est / most) structures.',
        content: {
            overview: 'Comparing data features is the foundation of IELTS Academic Writing Task 1.',
            objectives: [
                'Form short adjective comparatives (-er than) and long adjective comparatives (more ... than)',
                'Use superlative structures with "the most" and "the -est"',
                'Apply irregular forms: good -> better -> best, bad -> worse -> worst'
            ],
            grammarRules: [
                { rule: 'Short adjective: adj + -er + than', example: 'Solar energy was cheaper than coal in 2022.' },
                { rule: 'Long adjective: more + adj + than', example: 'Subway transport is more reliable than city buses.' }
            ],
            exercises: [
                {
                    id: 'a2-2-q1',
                    type: 'multiple-choice',
                    question: 'Choose the correct comparison: "Living in London is ______ living in Newcastle."',
                    options: ['A. more expensive than', 'B. expensiver than', 'C. most expensive that', 'D. as expensive than'],
                    correctAnswer: 'A',
                    explanation: '"Expensive" has 3 syllables, requiring "more expensive than".'
                }
            ],
            tips: [
                'In Writing Task 1, avoid writing isolated facts. Always link them using comparative structures.'
            ]
        }
    },
    {
        id: 'lesson-a2-3',
        title: 'A2: Modals of Ability, Obligation & Advice (Can, Must, Should)',
        level: 'a2',
        skill: 'grammar',
        durationMinutes: 20,
        orderIndex: 3,
        description: 'Express ability with can/could, rules with must/have to, and suggestions with should.',
        content: {
            overview: 'Modal verbs allow you to express degrees of obligation, permission, and recommendation.',
            objectives: [
                'Use can/can\'t for physical and learned ability',
                'Use should/shouldn\'t for recommendations and advice in essay writing',
                'Use must/have to for mandatory rules'
            ],
            exercises: [
                {
                    id: 'a2-3-q1',
                    type: 'fill-blank',
                    question: 'You ______ (should / must) consult a dictionary if you encounter an unfamiliar technical term.',
                    correctAnswer: 'should',
                    explanation: '"Should" expresses good advice or recommendation.'
                }
            ],
            tips: [
                'Modal verbs are always followed by the bare infinitive (without "to"): "She can speak", not "She can to speak".'
            ]
        }
    },
    {
        id: 'lesson-a2-4',
        title: 'A2: Reading Techniques: Skimming & Scanning',
        level: 'a2',
        skill: 'reading',
        durationMinutes: 30,
        orderIndex: 4,
        description: 'Learn how to read fast: skimming for main ideas and scanning for specific dates, names, and figures.',
        content: {
            overview: 'In IELTS Reading you have 60 minutes for 3 long passages. Reading word-for-word is impossible.',
            objectives: [
                'Skim a 700-word passage in 90 seconds to grasp the topic and structure',
                'Scan rapidly with your eyes for capital letters, numbers, and key technical words',
                'Underline topic sentences in each paragraph'
            ],
            exercises: [
                {
                    id: 'a2-4-q1',
                    type: 'multiple-choice',
                    question: 'What is "scanning" in IELTS Reading?',
                    options: [
                        'A. Reading every single word from start to end',
                        'B. Looking quickly through the text to locate a specific name, number, or keyword',
                        'C. Translating every unknown word with a dictionary',
                        'D. Memorizing the text'
                    ],
                    correctAnswer: 'B',
                    explanation: 'Scanning is looking through the text specifically for a targeted word or number without reading every line.'
                }
            ],
            tips: [
                'Read the questions first before reading the passage so you know what keywords to scan for.'
            ]
        }
    },
    {
        id: 'lesson-a2-5',
        title: 'A2: Future Forms: Going to, Will & Present Continuous',
        level: 'a2',
        skill: 'speaking',
        durationMinutes: 20,
        orderIndex: 5,
        description: 'Express plans, future intentions, schedules, and predictions for IELTS Speaking Part 1 and Part 3.',
        content: {
            overview: 'Examiners frequently ask "What are your plans after graduating?" or "Where will you live in the future?"',
            objectives: [
                'Use "be going to" for intentions and premeditated plans',
                'Use "will" for spontaneous decisions and general predictions',
                'Use present continuous for fixed calendar appointments'
            ],
            exercises: [
                {
                    id: 'a2-5-q1',
                    type: 'fill-blank',
                    question: 'I have already booked my flight. I ______ (leave) for Toronto on September 15th.',
                    correctAnswer: 'am leaving',
                    explanation: 'Fixed calendar arrangements with tickets/bookings use the present continuous ("am leaving").'
                }
            ],
            tips: [
                'When asked about future aspirations, use varied phrases like "I intend to...", "I\'m planning on...", or "I hope to...".'
            ]
        }
    },
    // ==========================================
    // LEVEL B1 (Intermediate) - 5 Lessons
    // ==========================================
    {
        id: 'lesson-b1-1',
        title: 'B1: Present Perfect vs Past Simple in IELTS Contexts',
        level: 'b1',
        skill: 'grammar',
        durationMinutes: 25,
        orderIndex: 1,
        description: 'Master the distinction between completed past events (Past Simple) and unfinished or relevant life experience (Present Perfect).',
        content: {
            overview: 'Understanding when to use "I have studied" versus "I studied" demonstrates grammatical control to the IELTS examiner.',
            objectives: [
                'Differentiate between definite past time markers (yesterday, in 2019) and indefinite experience (ever, never, since, already)',
                'Use Present Perfect to describe trends that began in the past and continue into the present',
                'Form "have/has + past participle" without common mistakes'
            ],
            grammarRules: [
                { rule: 'Past Simple: Finished time period', example: 'Global temperatures rose by 0.5 degrees in the 1990s.' },
                { rule: 'Present Perfect: Continuing trend or unspecified time', example: 'Renewable energy investments have increased significantly since 2015.' }
            ],
            exercises: [
                {
                    id: 'b1-1-q1',
                    type: 'multiple-choice',
                    question: 'Which sentence is grammatically correct for Writing Task 1?',
                    options: [
                        'A. The population has increased by 10% in 2012.',
                        'B. The population increased by 10% in 2012.',
                        'C. The population was increasing in 2012 since 2010.',
                        'D. The population has been increase in 2012.'
                    ],
                    correctAnswer: 'B',
                    explanation: 'Because "in 2012" is a specific completed past time, the Past Simple ("increased") must be used.'
                }
            ],
            tips: [
                'Never use Present Perfect with a finished past time marker like "yesterday", "last year", or "in 2010".'
            ]
        }
    },
    {
        id: 'lesson-b1-2',
        title: 'B1: Cohesive Devices & Transition Signals for Essays',
        level: 'b1',
        skill: 'writing',
        durationMinutes: 30,
        orderIndex: 2,
        description: 'Enhance Coherence and Cohesion (25% of your writing score) using addition, contrast, cause, and concluding linkers.',
        content: {
            overview: 'Cohesive devices guide the reader through your line of reasoning smoothly and logically.',
            objectives: [
                'Use contrast linkers: However, In contrast, On the other hand, Whereas',
                'Use cause and effect linkers: Consequently, As a result, Due to, Therefore',
                'Avoid mechanical repetition of linkers like "Firstly", "Secondly", "Thirdly"'
            ],
            vocabulary: [
                { word: 'Furthermore', meaning: 'In addition; moreover', example: 'Furthermore, public transport diminishes carbon footprints.' },
                { word: 'Consequently', meaning: 'As a result; therefore', example: 'Taxes on fuel rose, and consequently, car sales fell.' },
                { word: 'Nevertheless', meaning: 'In spite of that; however', example: 'The weather was inclement; nevertheless, the expedition proceeded.' }
            ],
            exercises: [
                {
                    id: 'b1-2-q1',
                    type: 'fill-blank',
                    question: 'Electric vehicles produce zero tailpipe emissions. ______, battery manufacturing still entails ecological costs. (Contrast linker)',
                    correctAnswer: 'However',
                    explanation: '"However" or "Nevertheless" provides the appropriate contrast between the two sentences.'
                }
            ],
            tips: [
                'Do not start every single sentence with a cohesive device. Natural cohesion is achieved through referencing pronouns and synonyms.'
            ]
        }
    },
    {
        id: 'lesson-b1-3',
        title: 'B1: IELTS Reading: True, False, Not Given Strategies',
        level: 'b1',
        skill: 'reading',
        durationMinutes: 30,
        orderIndex: 3,
        description: 'Learn the exact logic behind TRUE (agrees), FALSE (contradicts), and NOT GIVEN (cannot be verified).',
        content: {
            overview: 'TRUE / FALSE / NOT GIVEN is widely considered the trickiest question type in IELTS Reading.',
            objectives: [
                'Identify 100% agreement for TRUE',
                'Identify direct factual contradiction for FALSE',
                'Recognize missing information for NOT GIVEN without assuming external facts'
            ],
            explanations: [
                'TRUE: The passage directly confirms the statement.',
                'FALSE: The passage explicitly contradicts the statement (opposite meaning).',
                'NOT GIVEN: The passage mentions the topic, but does not provide enough information to confirm or deny the specific claim.'
            ],
            exercises: [
                {
                    id: 'b1-3-q1',
                    type: 'multiple-choice',
                    question: 'Passage says: "The survey investigated 200 teenagers in urban Tokyo." Statement says: "The teenagers enjoyed the survey." What is the answer?',
                    options: ['A. TRUE', 'B. FALSE', 'C. NOT GIVEN'],
                    correctAnswer: 'C',
                    explanation: 'The passage tells us 200 teenagers were surveyed, but says nothing about whether they enjoyed it or not. Thus, NOT GIVEN.'
                }
            ],
            tips: [
                'Do not use your own general knowledge. Only rely strictly on what is written on the page.'
            ]
        }
    },
    {
        id: 'lesson-b1-4',
        title: 'B1: IELTS Listening: Paraphrasing & Distractor Traps',
        level: 'b1',
        skill: 'listening',
        durationMinutes: 25,
        orderIndex: 4,
        description: 'Detect synonyms and avoid common distractor traps where speakers change their mind mid-sentence.',
        content: {
            overview: 'IELTS audio will rarely use the exact words from the question. Instead, it tests synonyms and paraphrases.',
            objectives: [
                'Identify self-correction traps ("I thought Tuesday, but actually Wednesday")',
                'Recognize paraphrasing pairs (cheap -> affordable, increase -> grow)',
                'Predict the grammatical type of missing words (noun, adjective, verb)'
            ],
            exercises: [
                {
                    id: 'b1-4-q1',
                    type: 'multiple-choice',
                    question: 'Speaker says: "I initially wanted the annual gym membership, but seeing the cost, I went for the monthly option." Which option did they purchase?',
                    options: ['A. Annual pass', 'B. Monthly pass', 'C. Daily ticket'],
                    correctAnswer: 'B',
                    explanation: 'The speaker initially considered annual, but explicitly corrected their choice to the monthly pass.'
                }
            ],
            tips: [
                'Listen for words like "actually", "however", "instead", or "wait a second" which signal a speaker correction.'
            ]
        }
    },
    {
        id: 'lesson-b1-5',
        title: 'B1: Writing Task 1: Describing Trends & Data Movements',
        level: 'b1',
        skill: 'writing',
        durationMinutes: 30,
        orderIndex: 5,
        description: 'Acquire essential vocabulary for upward trends, downward trends, fluctuations, and plateaus.',
        content: {
            overview: 'Task 1 requires varied vocabulary beyond simply repeating "went up" and "went down".',
            objectives: [
                'Use verbs of increase: rise, climb, surge, escalate, increase',
                'Use verbs of decrease: fall, decline, drop, plummet, decrease',
                'Transform verbs into noun phrases: "rose sharply" -> "experienced a sharp rise"'
            ],
            vocabulary: [
                { word: 'Fluctuate', meaning: 'Rise and fall irregularly in number or amount', example: 'Oil prices fluctuated wildly between March and June.' },
                { word: 'Plateau', meaning: 'Reach a state of little or no change after a time of increase', example: 'Sales plateaued at 5,000 units in the final quarter.' },
                { word: 'Plummet', meaning: 'Fall or drop straight down at high speed', example: 'Exports plummeted by 45% following trade restrictions.' }
            ],
            exercises: [
                {
                    id: 'b1-5-q1',
                    type: 'fill-blank',
                    question: 'Transform the verb phrase: "Unemployment fell significantly" -> "There was a significant ______ in unemployment."',
                    correctAnswer: 'fall',
                    explanation: 'The noun corresponding to "fell" is "fall" or "decline".'
                }
            ],
            tips: [
                'Always write a clear 2-sentence Overview highlighting the general upward/downward pattern and the highest figure.'
            ]
        }
    },
    // ==========================================
    // LEVEL B2 (Upper-Intermediate) - 5 Lessons
    // ==========================================
    {
        id: 'lesson-b2-1',
        title: 'B2: Complex Sentences: Conditionals & Relative Clauses',
        level: 'b2',
        skill: 'grammar',
        durationMinutes: 30,
        orderIndex: 1,
        description: 'Construct Band 7+ grammatical range using second/third conditionals, defining and non-defining relative clauses.',
        content: {
            overview: 'To achieve Band 7 or higher in Grammatical Range & Accuracy, you must use a variety of complex structures with frequent error-free sentences.',
            objectives: [
                'Construct second conditional sentences for hypothetical arguments',
                'Use non-defining relative clauses with commas for extra background info',
                'Incorporate participle clauses for concise, academic phrasing'
            ],
            grammarRules: [
                { rule: 'Second conditional: If + Past Simple, would + base verb', example: 'If governments subsidized public transport, congestion would decrease.' },
                { rule: 'Non-defining relative clause: , which/who ... ,', example: 'Copenhagen, which has built extensive cycling lanes, boasts low emissions.' }
            ],
            exercises: [
                {
                    id: 'b2-1-q1',
                    type: 'multiple-choice',
                    question: 'Which relative clause sentence is punctuated correctly?',
                    options: [
                        'A. Electric cars which produce zero emissions are becoming popular.',
                        'B. Electric cars, which produce zero direct emissions, are becoming increasingly popular.',
                        'C. Electric cars, that produce zero emissions are becoming popular.',
                        'D. Electric cars which produce zero emissions, are popular.'
                    ],
                    correctAnswer: 'B',
                    explanation: 'Non-defining relative clauses take commas and use "which" (not "that") for non-restrictive information.'
                }
            ],
            tips: [
                'Do not write only simple sentences. Combine two related thoughts into a complex sentence using "although", "whereas", or "which".'
            ]
        }
    },
    {
        id: 'lesson-b2-2',
        title: 'B2: Writing Task 2: Mastering the 4-Paragraph Essay Structure',
        level: 'b2',
        skill: 'writing',
        durationMinutes: 35,
        orderIndex: 2,
        description: 'Learn the proven architecture of high-scoring IELTS essays: Introduction with thesis, 2 balanced body paragraphs, and conclusion.',
        content: {
            overview: 'Examiners look for a clear progression throughout your response. The 4-paragraph structure provides maximum clarity.',
            objectives: [
                'Paraphrase the prompt and write a direct thesis statement in the introduction',
                'Structure body paragraphs using PEEL (Point, Explanation, Example, Link)',
                'Summarize main ideas without introducing new arguments in the conclusion'
            ],
            explanations: [
                'Paragraph 1: Background paraphrase + Thesis statement (give your clear opinion).',
                'Paragraph 2: Topic sentence (Idea 1) + Explanation + Concrete example + Result.',
                'Paragraph 3: Topic sentence (Idea 2) + Explanation + Concrete example + Result.',
                'Paragraph 4: Restatement of thesis + Synthesis of main points.'
            ],
            exercises: [
                {
                    id: 'b2-2-q1',
                    type: 'multiple-choice',
                    question: 'Where should your thesis statement and personal opinion be stated in an IELTS Opinion essay?',
                    options: [
                        'A. Only at the very end of the conclusion',
                        'B. In both the introduction and the conclusion',
                        'C. Kept secret so the reader is surprised',
                        'D. In the body paragraphs only'
                    ],
                    correctAnswer: 'B',
                    explanation: 'Band 7+ criteria require a clear position presented throughout the response, starting in the introduction and restated in the conclusion.'
                }
            ],
            tips: [
                'Spend 5 full minutes planning your two main ideas before writing a single sentence of your essay.'
            ]
        }
    },
    {
        id: 'lesson-b2-3',
        title: 'B2: Speaking Part 2: The 1-Minute Prep & 2-Minute Long Turn',
        level: 'b2',
        skill: 'speaking',
        durationMinutes: 30,
        orderIndex: 3,
        description: 'Strategies to maximize your 1-minute preparation time and speak fluently without drying up for 2 full minutes.',
        content: {
            overview: 'Speaking Part 2 tests your fluency, coherence, and ability to develop a topic at length.',
            objectives: [
                'Make bullet-point notes using keywords rather than full sentences during the 1-minute prep',
                'Use a narrative storytelling arc (Past background -> Main event -> Personal feelings -> Future impact)',
                'Fill pauses with natural discourse markers instead of silence or "uhh"'
            ],
            exercises: [
                {
                    id: 'b2-3-q1',
                    type: 'multiple-choice',
                    question: 'What is the most effective use of the 1-minute preparation time in Speaking Part 2?',
                    options: [
                        'A. Writing out whole sentences word-for-word',
                        'B. Joting down 5-6 key vocabulary words, idioms, and a structural outline',
                        'C. Staring at the ceiling to memorize a script',
                        'D. Asking the examiner for an easier question'
                    ],
                    correctAnswer: 'B',
                    explanation: 'You do not have time to write sentences. Writing high-level vocabulary and a structure ensures you don\'t run out of things to say.'
                }
            ],
            tips: [
                'Divide your 2 minutes into 3 segments: 30 seconds context, 60 seconds core description, 30 seconds personal reflection.'
            ]
        }
    },
    {
        id: 'lesson-b2-4',
        title: 'B2: Academic Collocations & Topic-Specific Lexicon',
        level: 'b2',
        skill: 'vocabulary',
        durationMinutes: 25,
        orderIndex: 4,
        description: 'Learn high-frequency academic collocations for Education, Environment, Technology, and Health.',
        content: {
            overview: 'Lexical Resource accounts for 25% of your score. Natural collocations make your English sound sophisticated and native-like.',
            objectives: [
                'Master adjective + noun combinations (e.g. profound impact, pressing issue)',
                'Master verb + noun combinations (e.g. pose a threat, implement a policy)',
                'Replace basic words with academic collocations'
            ],
            vocabulary: [
                { word: 'Pressing issue', meaning: 'An urgent problem that requires immediate attention', example: 'Global warming represents the most pressing issue of our generation.' },
                { word: 'Profound impact', meaning: 'A very deep and widespread influence', example: 'The internet has exerted a profound impact on social interaction.' },
                { word: 'Pose a threat', meaning: 'Create a dangerous situation or hazard', example: 'Deforestation poses an existential threat to biodiversity.' }
            ],
            exercises: [
                {
                    id: 'b2-4-q1',
                    type: 'fill-blank',
                    question: 'Complete the academic collocation: Rising carbon emissions ______ (make / pose / create) a serious threat to marine life.',
                    correctAnswer: 'pose',
                    explanation: 'The standard collocation in academic English is "pose a threat".'
                }
            ],
            tips: [
                'Learn words in chunks (collocations) rather than isolated single words.'
            ]
        }
    },
    {
        id: 'lesson-b2-5',
        title: 'B2: Reading: Matching Headings & Summary Completion',
        level: 'b2',
        skill: 'reading',
        durationMinutes: 30,
        orderIndex: 5,
        description: 'Techniques for identifying main paragraph themes and completing text summaries with precision.',
        content: {
            overview: 'Matching Headings tests your ability to identify the overall topic of a paragraph rather than getting caught in minor details.',
            objectives: [
                'Distinguish between the general thesis of a paragraph and specific supporting examples',
                'Cross off used headings and eliminate distractor options',
                'Check summary completion questions for grammatical agreement'
            ],
            exercises: [
                {
                    id: 'b2-5-q1',
                    type: 'multiple-choice',
                    question: 'Where is the main idea of a paragraph most commonly stated in IELTS Academic texts?',
                    options: [
                        'A. In the first 1-2 sentences (topic sentence) or final concluding sentence',
                        'B. In the middle example',
                        'C. Inside the footnote',
                        'D. Headings never match topic sentences'
                    ],
                    correctAnswer: 'A',
                    explanation: 'In academic writing, paragraphs usually follow deductive structure where the topic sentence introduces the core claim.'
                }
            ],
            tips: [
                'Always do Matching Headings questions first before other questions on the same passage because it gives you an overview of the entire text.'
            ]
        }
    },
    // ==========================================
    // LEVEL C1 (Advanced) - 5 Lessons
    // ==========================================
    {
        id: 'lesson-c1-1',
        title: 'C1: Inversion & Cleft Sentences for Band 8+ Writing & Speaking',
        level: 'c1',
        skill: 'grammar',
        durationMinutes: 30,
        orderIndex: 1,
        description: 'Use advanced stylistic structures: negative inversions (Rarely, Not only... but also) and cleft sentences for emphatic precision.',
        content: {
            overview: 'Native speakers and top IELTS candidates use grammatical emphasis to draw attention to crucial arguments.',
            objectives: [
                'Construct negative inversions: "Not only does X occur, but Y also manifests"',
                'Use cleft sentences: "What needs to be addressed is..." and "It is X that..."',
                'Maintain subject-verb agreement under auxiliary inversion'
            ],
            grammarRules: [
                { rule: 'Negative adverb inversion: Negative adverb + auxiliary + subject + verb', example: 'Seldom have scientists observed such rapid glacier recession.' },
                { rule: 'Wh- cleft: What + clause + is/was + complement', example: 'What governments must prioritize is the deployment of renewable infrastructure.' }
            ],
            exercises: [
                {
                    id: 'c1-1-q1',
                    type: 'fill-blank',
                    question: 'Rewrite using inversion: "They had rarely seen such public consensus" -> "Rarely ______ they seen such public consensus."',
                    correctAnswer: 'had',
                    explanation: 'Inverted structure with past perfect: "Rarely had they seen...".'
                }
            ],
            tips: [
                'Use inversion sparingly (1-2 times per essay) so it feels natural and powerful rather than forced.'
            ]
        }
    },
    {
        id: 'lesson-c1-2',
        title: 'C1: Academic Hedging & Nuanced Epistemic Modality',
        level: 'c1',
        skill: 'writing',
        durationMinutes: 30,
        orderIndex: 2,
        description: 'Avoid overgeneralizations in IELTS Academic Writing by utilizing cautious academic language and probabilistic stance markers.',
        content: {
            overview: 'Dogmatic statements like "Smoking always causes immediate death" lower Task Achievement. Band 8+ writers use hedging.',
            objectives: [
                'Replace absolutes (always, never, proves) with hedged qualifiers (tends to, indicates, arguably)',
                'Use modal verbs of likelihood (could, might, may suggest)',
                'Frame claims using epistemic stance verbs (appears to be, seems plausible)'
            ],
            vocabulary: [
                { word: 'Arguably', meaning: 'It may be argued; plausibly', example: 'Education is arguably the most decisive determinant of social mobility.' },
                { word: 'Predominantly', meaning: 'Mainly; for the most part', example: 'The economic expansion was predominantly driven by exports.' },
                { word: 'Plausible', meaning: 'Seeming reasonable or probable', example: 'It is plausible that automated diagnostics will reduce healthcare expenses.' }
            ],
            exercises: [
                {
                    id: 'c1-2-q1',
                    type: 'multiple-choice',
                    question: 'Which sentence exhibits appropriate academic hedging?',
                    options: [
                        'A. Mobile phones completely destroy student cognitive abilities.',
                        'B. Excessive smartphone usage tends to correlate with reduced attention spans among adolescents.',
                        'C. It is 100% certain that smartphones ruin brains.',
                        'D. All students who use phones fail their examinations.'
                    ],
                    correctAnswer: 'B',
                    explanation: '"Tends to correlate" and "among adolescents" appropriately bounds the claim without sweeping generalizations.'
                }
            ],
            tips: [
                'Band 9 examiners look for nuance and balanced perspective in argumentative writing.'
            ]
        }
    },
    {
        id: 'lesson-c1-3',
        title: 'C1: Speaking Part 3: Nuanced Analysis & Abstract Discourse',
        level: 'c1',
        skill: 'speaking',
        durationMinutes: 30,
        orderIndex: 3,
        description: 'Handle high-level, philosophical, and societal questions by exploring multi-perspective ramifications.',
        content: {
            overview: 'Speaking Part 3 is an intellectual discussion with the examiner where you move beyond personal experience to societal issues.',
            objectives: [
                'Analyze societal trends from economic, sociological, and ethical dimensions',
                'Use concession markers: "While I concede that..., one cannot overlook..."',
                'Maintain natural prosody and intonation when debating complex topics'
            ],
            exercises: [
                {
                    id: 'c1-3-q1',
                    type: 'multiple-choice',
                    question: 'When asked: "Do you think artificial intelligence will widen income inequality?", what is the Band 8+ approach?',
                    options: [
                        'A. "Yes, I agree, because I read an article about it."',
                        'B. "On one hand, high-capital tech sectors will accumulate unprecedented wealth; however, democratization of AI tools could simultaneously empower freelance creators."',
                        'C. "No, AI is very cool and I like ChatGPT."',
                        'D. "I don\'t know about computers."'
                    ],
                    correctAnswer: 'B',
                    explanation: 'Examining multiple societal dimensions and counterweights demonstrates advanced critical thinking and high lexical range.'
                }
            ],
            tips: [
                'Buy yourself thinking time with academic framing phrases: "That is an intriguing dilemma; looking at it from an institutional standpoint..."'
            ]
        }
    },
    {
        id: 'lesson-c1-4',
        title: 'C1: Listening Section 4: Fast Academic Lectures',
        level: 'c1',
        skill: 'listening',
        durationMinutes: 25,
        orderIndex: 4,
        description: 'Master Section 4 monologues where university professors speak continuously without pauses between questions.',
        content: {
            overview: 'Section 4 offers no midway pause. You must track 10 consecutive answers while listening to dense university-level lecture content.',
            objectives: [
                'Predict 10 questions in the 30-45 seconds preparation window',
                'Track signposting language ("Turning now to...", "What surprised researchers was...")',
                'Transcribe scientific, anthropological, and historical vocabulary without spelling errors'
            ],
            exercises: [
                {
                    id: 'c1-4-q1',
                    type: 'multiple-choice',
                    question: 'What does a lecturer\'s signpost phrase "Having examined the historical context, let us now turn to..." indicate?',
                    options: [
                        'A. The lecture is ending immediately',
                        'B. The topic is shifting to the next section on the question paper',
                        'C. The speaker made a factual mistake and is apologizing',
                        'D. The question order is reversed'
                    ],
                    correctAnswer: 'B',
                    explanation: 'Signposts announce topic transitions, helping you jump to the corresponding section of the lecture notes.'
                }
            ],
            tips: [
                'Keep one eye on the current question and one eye on the next question so you do not get lost if you miss an answer.'
            ]
        }
    },
    {
        id: 'lesson-c1-5',
        title: 'C1: Writing Task 1: Multi-Chart Synthesis & Process Diagrams',
        level: 'c1',
        skill: 'writing',
        durationMinutes: 30,
        orderIndex: 5,
        description: 'Synthesize complex combined data (e.g. a bar chart + pie chart) or technical cyclical engineering processes.',
        content: {
            overview: 'Band 8+ reports on multiple visual inputs require synthesizing cross-chart correlations rather than treating them as separate essays.',
            objectives: [
                'Correlate variables between two distinct charts in the body paragraphs',
                'Use passive voice accurately for cyclical industrial manufacturing processes',
                'Structure a comprehensive overview encompassing both visual representations'
            ],
            exercises: [
                {
                    id: 'c1-5-q1',
                    type: 'fill-blank',
                    question: 'When describing an industrial process: "The raw ore ______ (transport) by conveyor belt to the crushing chamber."',
                    correctAnswer: 'is transported',
                    explanation: 'Present simple passive ("is transported") is required for manufacturing process descriptions.'
                }
            ],
            tips: [
                'For process diagrams, count the number of stages in the diagram and state that total in your overview.'
            ]
        }
    },
    // ==========================================
    // LEVEL C2 (Proficiency / Mastery) - 5 Lessons
    // ==========================================
    {
        id: 'lesson-c2-1',
        title: 'C2: Native-Like Idiomatic Competence & Collocational Mastery',
        level: 'c2',
        skill: 'speaking',
        durationMinutes: 30,
        orderIndex: 1,
        description: 'Incorporate natural, idiomatic phrasing effortlessly without sounding artificial or reciting cliches.',
        content: {
            overview: 'Band 9 descriptor for Lexical Resource states: "uses idiomatic language naturally and accurately".',
            objectives: [
                'Avoid outdated idioms like "raining cats and dogs" in favor of modern, sophisticated idioms',
                'Use metaphorical collocations: "tipping point", "double-edged sword", "paradigmatic shift"',
                'Modulate lexical register between formal academic writing and natural spontaneous speech'
            ],
            vocabulary: [
                { word: 'Tipping point', meaning: 'The point at which a series of small changes becomes significant enough to cause a larger, more important change', example: 'Ocean temperatures may soon reach an ecological tipping point.' },
                { word: 'Paradigm shift', meaning: 'A fundamental change in approach or underlying assumptions', example: 'Quantum computing represents a paradigm shift in data processing.' },
                { word: 'Double-edged sword', meaning: 'Something that has both favorable and unfavorable consequences', example: 'Algorithmic automation is a double-edged sword for employment.' }
            ],
            exercises: [
                {
                    id: 'c2-1-q1',
                    type: 'multiple-choice',
                    question: 'Which idiomatic phrase sounds most natural in an IELTS Speaking Part 3 academic context?',
                    options: [
                        'A. "Every coin has two sides, so let\'s talk about it."',
                        'B. "While technological advancement provides undeniable efficiencies, it proves to be a double-edged sword regarding data sovereignty."',
                        'C. "It rains cats and dogs on computer programmers."',
                        'D. "He is as busy as a bee."'
                    ],
                    correctAnswer: 'B',
                    explanation: '"Double-edged sword regarding data sovereignty" demonstrates sophisticated natural idiomaticity without cliché.'
                }
            ],
            tips: [
                'Never force idioms into answers where they do not fit naturally.'
            ]
        }
    },
    {
        id: 'lesson-c2-2',
        title: 'C2: Critical Discourse Analysis & Irony in Academic Texts',
        level: 'c2',
        skill: 'reading',
        durationMinutes: 30,
        orderIndex: 2,
        description: 'Decipher authorial stance, subtext, subtle skepticism, and rhetorical tone in high-level literary and scientific discourse.',
        content: {
            overview: 'Top-tier Reading passages frequently feature writers who express skepticism, irony, or subtle critiques through choice of vocabulary.',
            objectives: [
                'Detect tonal markers signaling author skepticism (so-called, ostensibly, purported)',
                'Distinguish between quotes cited for rebuttal versus quotes endorsed by the author',
                'Evaluate the implicit thesis behind controversial sociological texts'
            ],
            exercises: [
                {
                    id: 'c2-2-q1',
                    type: 'multiple-choice',
                    question: 'When an author describes an initiative as an "ostensible solution", what does this imply?',
                    options: [
                        'A. The solution is definitively proven to work perfectly',
                        'B. The solution appears to be valid on the surface, but may actually be flawed or deceptive',
                        'C. The solution was invented in Austria',
                        'D. The author enthusiastically supports the initiative'
                    ],
                    correctAnswer: 'B',
                    explanation: '"Ostensible" means stated or appearing to be true, but not necessarily so in reality.'
                }
            ],
            tips: [
                'Pay close attention to adjectives qualifying scientific claims: "claimed", "purported", and "presumed" signify doubt.'
            ]
        }
    },
    {
        id: 'lesson-c2-3',
        title: 'C2: Subtleties of Lexical Precision & Register Alignment',
        level: 'c2',
        skill: 'vocabulary',
        durationMinutes: 25,
        orderIndex: 3,
        description: 'Select words with microscopic precision where slight denotative and connotative differences change argument rigor.',
        content: {
            overview: 'At Band 9, vocabulary is not about using obscure 10-letter words; it is about absolute precision of thought.',
            objectives: [
                'Differentiate near-synonyms: aggravate vs exacerbate, elucidate vs explain, unprecedented vs novel',
                'Avoid register mismatches (mixing informal colloquialisms with formal academic prose)',
                'Use nominalization to pack dense information into academic sentences'
            ],
            vocabulary: [
                { word: 'Exacerbate', meaning: 'Make a problem, bad situation, or negative feeling worse', example: 'Deforestation exacerbates regional soil erosion.' },
                { word: 'Elucidate', meaning: 'Make something clear; explain with clarity', example: 'Recent neuroimaging studies elucidate the mechanics of memory.' },
                { word: 'Unprecedented', meaning: 'Never done or known before', example: 'The polar vortex resulted in unprecedented winter temperatures.' }
            ],
            exercises: [
                {
                    id: 'c2-3-q1',
                    type: 'fill-blank',
                    question: 'Complete the sentence: Rather than healing the diplomatic rift, the trade tariffs served only to ______ (exacerbate / cure) tensions.',
                    correctAnswer: 'exacerbate',
                    explanation: '"Exacerbate" means to severely worsen existing conflict or problems.'
                }
            ],
            tips: [
                'Use nominalization (e.g., "The economy expanded rapidly" -> "Rapid economic expansion...") to achieve dense academic phrasing.'
            ]
        }
    },
    {
        id: 'lesson-c2-4',
        title: 'C2: Rhetorical Devices & Parallelism for Band 9 Writing',
        level: 'c2',
        skill: 'writing',
        durationMinutes: 30,
        orderIndex: 4,
        description: 'Harness parallelism, rhetorical questions, and cadence to compose compelling, persuasive essays.',
        content: {
            overview: 'Band 9 writing reads like published academic essays from The Economist or Harvard Educational Review.',
            objectives: [
                'Implement structural parallelism in series and comparisons',
                'Balance sentence lengths (follow long complex sentences with punchy short sentences)',
                'Ensure faultless thematic progression across paragraph boundaries'
            ],
            grammarRules: [
                { rule: 'Parallelism: Balance items in series', example: 'The policy aimed to reduce emissions, to incentivize renewables, and to stabilize costs.' }
            ],
            exercises: [
                {
                    id: 'c2-4-q1',
                    type: 'multiple-choice',
                    question: 'Identify the sentence with faulty parallelism:',
                    options: [
                        'A. The program teaches writing, speaking, and reading.',
                        'B. The curriculum aims to foster critical thinking, encourage collaboration, and developing leadership.',
                        'C. The curriculum aims to foster critical thinking, encourage collaboration, and develop leadership.',
                        'D. He was intelligent, disciplined, and resourceful.'
                    ],
                    correctAnswer: 'B',
                    explanation: 'Option B mixes infinitives ("foster", "encourage") with a gerund ("developing"). Option C correctly maintains parallelism.'
                }
            ],
            tips: [
                'Read your essay mentally to check its rhythm. Alternating between complex and concise sentences makes writing compelling.'
            ]
        }
    },
    {
        id: 'lesson-c2-5',
        title: 'C2: Spontaneous Band 9 Speaking: Extended Coherence & Prosody',
        level: 'c2',
        skill: 'speaking',
        durationMinutes: 30,
        orderIndex: 5,
        description: 'Achieve native-level intonation, emotional resonance, and unhesitating coherence in open-ended debates.',
        content: {
            overview: 'Band 9 Speaking is characterized by effortless fluency, natural pausing at semantic boundaries, and precise pronunciation.',
            objectives: [
                'Deliver unhesitating discourse with native-like speech cadence',
                'Use intonation and tonic stress to emphasize contrastive nuances',
                'Conclude complex arguments decisively with rhetorical closure'
            ],
            exercises: [
                {
                    id: 'c2-5-q1',
                    type: 'multiple-choice',
                    question: 'What distinguishes Band 9 pronunciation from Band 7 pronunciation in IELTS?',
                    options: [
                        'A. Band 9 requires speaking with a fake British accent',
                        'B. Band 9 uses flexible features of connected speech, subtle sentence stress, and varied intonation to convey exact nuances',
                        'C. Band 9 means speaking at maximum speed without stopping',
                        'D. There is no difference'
                    ],
                    correctAnswer: 'B',
                    explanation: 'Pronunciation score evaluates stress, rhythm, chunking, and intonation rather than adopting a specific accent.'
                }
            ],
            tips: [
                'Relax and treat the IELTS Speaking test as an intellectual conversation with a colleague.'
            ]
        }
    }
];
