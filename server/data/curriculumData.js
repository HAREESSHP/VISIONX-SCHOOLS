// Curriculum Data tailored for 10 distinct classes (Class 1 to Class 10 + Early Learners)

const CURRICULUM = {
  'Class 1': {
    badge: 'Beginner Spoken Phonics',
    description: 'Foundational speech, alphabet phonetics, daily greetings, and first sight words.',
    lessons: {
      'Spoken English': [
        {
          title: 'Daily Greetings & Magic Words',
          description: 'Say hello, good morning, please, and thank you with confidence',
          icon: '👋',
          duration: '8 min',
          topic: 'Greetings & Politeness',
          content: {
            introduction: 'Magic words help us make friends and speak politely every day!',
            learn: [
              { word: 'Good Morning', meaning: 'Polite morning greeting', example: 'Good morning, teacher!' },
              { word: 'Please', meaning: 'Used when asking nicely', example: 'Please give me a pencil.' },
              { word: 'Thank you', meaning: 'Used when receiving help', example: 'Thank you for your help.' }
            ],
            listen: {
              text: 'Good morning! Please pass the book. Thank you so much!',
              questions: [
                { question: 'What do you say in the morning?', options: ['Good night', 'Good morning', 'Goodbye'], answer: 1 },
                { question: 'What magic word do you say when someone gives you something?', options: ['Sorry', 'Please', 'Thank you'], answer: 2 }
              ]
            },
            practice: 'Say: "Good morning! Please help me. Thank you!"',
            speak: 'Record yourself saying: "Good morning teacher! My name is ______."'
          },
          objectives: ['Use polite greetings', 'Say magic words', 'Introduce yourself with a greeting']
        },
        {
          title: 'My Favorite Toys & Colors',
          description: 'Speak about what you love to play with and colors you see',
          icon: '🎨',
          duration: '10 min',
          topic: 'Colors & Play',
          content: {
            introduction: 'Let us name bright colors and our favorite toys in English!',
            learn: [
              { word: 'Red Ball', meaning: 'A round toy that bounces', example: 'I kick the red ball.' },
              { word: 'Blue Sky', meaning: 'The sky above us', example: 'The sky is bright blue.' },
              { word: 'Yellow Sun', meaning: 'The warm sun in the day', example: 'The yellow sun shines.' }
            ],
            listen: {
              text: 'I have a red ball and a blue car. My favorite color is yellow.',
              questions: [
                { question: 'What color is the ball?', options: ['Blue', 'Red', 'Yellow'], answer: 1 },
                { question: 'What is the favorite color?', options: ['Red', 'Blue', 'Yellow'], answer: 2 }
              ]
            },
            practice: 'Say out loud: "I have a red ball and a blue toy."',
            speak: 'Record: "My favorite color is ______ and I love playing with my ______."'
          },
          objectives: ['Name primary colors', 'Express toy preferences', 'Form simple descriptive sentences']
        }
      ],
      'Vocabulary': [
        {
          title: 'Farm Animals & Their Sounds',
          description: 'Learn animal names and the joyful sounds they make',
          icon: '🐄',
          duration: '10 min',
          topic: 'Farm Animals',
          content: {
            introduction: 'Animals have fun English names and unique sounds!',
            learn: [
              { word: 'Cow (Moo)', pronunciation: 'KOW', meaning: 'A gentle farm animal that gives milk', example: 'The cow says moo.', emoji: '🐄' },
              { word: 'Duck (Quack)', pronunciation: 'DUK', meaning: 'A bird that swims in ponds', example: 'The yellow duck quacks.', emoji: '🦆' },
              { word: 'Sheep (Baa)', pronunciation: 'SHEEP', meaning: 'An animal with soft white wool', example: 'The sheep has warm wool.', emoji: '🐑' }
            ],
            listen: {
              text: 'The cow eats grass in the farm. The duck swims in the pond. The sheep runs in the meadow.',
              questions: [
                { question: 'Who swims in the pond?', options: ['The cow', 'The duck', 'The sheep'], answer: 1 },
                { question: 'What does the cow eat?', options: ['Apples', 'Grass', 'Fish'], answer: 1 }
              ]
            },
            practice: 'Repeat: Cow, Duck, Sheep, Horse, Hen',
            speak: 'Say aloud: "A cow says moo and a duck says quack!"'
          },
          objectives: ['Identify farm animals', 'Match animals to sounds', 'Pronounce single-syllable nouns']
        }
      ],
      'Grammar': [
        {
          title: 'Naming Words (Nouns for Beginners)',
          description: 'Identify people, places, animals, and things around you',
          icon: '🏷️',
          duration: '10 min',
          topic: 'Basic Nouns',
          content: {
            introduction: 'Everything around us has a name! These naming words are called nouns.',
            learn: [
              { word: 'Boy / Girl', meaning: 'Person', example: 'The boy is smiling.' },
              { word: 'School', meaning: 'Place of learning', example: 'Our school is big.' },
              { word: 'Book', meaning: 'Thing to read', example: 'I open my book.' }
            ],
            listen: {
              text: 'The girl goes to school with her red bag and opens her book.',
              questions: [
                { question: 'What place is mentioned?', options: ['Park', 'School', 'Zoo'], answer: 1 },
                { question: 'What thing is red?', options: ['Book', 'Bag', 'Pencil'], answer: 1 }
              ]
            },
            practice: 'Spot the nouns: "Cat sits on a chair." (Cat, Chair)',
            speak: 'Name 3 things in your room: "I see a book, a pencil, and a chair."'
          },
          objectives: ['Recognize naming words', 'Classify people and objects', 'Use basic nouns in speech']
        }
      ],
      'Listening': [
        {
          title: 'Listen to Classroom Instructions',
          description: 'Understand basic instructions like stand up, sit down, open book',
          icon: '🎧',
          duration: '8 min',
          topic: 'Action Commands',
          content: {
            introduction: 'Listen carefully to teacher commands in class!',
            learn: [
              { word: 'Stand up', meaning: 'Rise to your feet', example: 'Stand up straight.' },
              { word: 'Sit down', meaning: 'Take a seat', example: 'Please sit down quietly.' },
              { word: 'Open your book', meaning: 'Begin reading', example: 'Open your book to page one.' }
            ],
            listen: {
              text: 'Good morning children! Please sit down quietly and open your English book.',
              questions: [
                { question: 'What should the children do first?', options: ['Run outside', 'Sit down quietly', 'Sing a song'], answer: 1 },
                { question: 'Which book should they open?', options: ['Math book', 'English book', 'Drawing book'], answer: 1 }
              ]
            },
            practice: 'Listen and act: Stand up! Sit down! Clap your hands!',
            speak: 'Record yourself saying: "Teacher said: Please sit down and open your book."'
          },
          objectives: ['Follow spoken instructions', 'Respond to classroom prompts', 'Active listening']
        }
      ],
      'Reading': [
        {
          title: 'The Friendly Kitten',
          description: 'Read a joyful 3-sentence story with phonics words',
          icon: '🐱',
          duration: '10 min',
          topic: 'Early Reading',
          content: {
            introduction: 'Let us read a sweet story about Mimi the little kitten!',
            learn: [
              { word: 'Little', meaning: 'Small in size', example: 'The kitten is little.' },
              { word: 'Warm Milk', meaning: 'Tasty healthy drink', example: 'Mimi drinks warm milk.' }
            ],
            listen: {
              text: 'Mimi is a little brown kitten. She loves to drink warm milk. Mimi plays with a soft yarn ball and purrs happily.',
              questions: [
                { question: 'What color is Mimi?', options: ['Black', 'Brown', 'White'], answer: 1 },
                { question: 'What does Mimi drink?', options: ['Cold water', 'Warm milk', 'Fruit juice'], answer: 1 }
              ]
            },
            practice: 'Read each sentence slowly: Mimi is a little brown kitten.',
            speak: 'Record your voice reading the short story about Mimi.'
          },
          objectives: ['Read sight words aloud', 'Comprehend story characters', 'Build reading fluency']
        }
      ]
    }
  },
  'Class 2': {
    badge: 'Foundational Sentence Builder',
    description: 'Daily routines, action verbs, describing words, and expressive family dialogue.',
    lessons: {
      'Spoken English': [
        {
          title: 'My Daily Morning Routine',
          description: 'Express what you do from waking up to reaching school',
          icon: '⏰',
          duration: '10 min',
          topic: 'Daily Habits',
          content: {
            introduction: 'How do you spend your morning? Let us talk about our habits!',
            learn: [
              { word: 'I wake up at', meaning: 'Time you leave bed', example: 'I wake up at 6 AM.' },
              { word: 'Brush my teeth', meaning: 'Clean teeth', example: 'I brush my teeth twice.' },
              { word: 'Eat breakfast', meaning: 'Morning meal', example: 'I eat healthy breakfast.' }
            ],
            listen: {
              text: 'Every morning, I wake up early. I brush my teeth and take a quick bath. Then I eat warm pancakes and pack my school bag.',
              questions: [
                { question: 'When does the speaker wake up?', options: ['Late', 'Early', 'At noon'], answer: 1 },
                { question: 'What does the speaker eat?', options: ['Pizza', 'Warm pancakes', 'Ice cream'], answer: 1 }
              ]
            },
            practice: 'Practice: "I wake up, brush my teeth, and eat breakfast."',
            speak: 'Tell us: "Every morning I wake up at ______ and eat ______ for breakfast."'
          },
          objectives: ['Order morning events', 'Use action verbs in sequence', 'Speak about personal routine']
        }
      ],
      'Vocabulary': [
        {
          title: 'Action Verbs in Motion',
          description: 'Learn dynamic action words: running, jumping, swimming, reading',
          icon: '🏃',
          duration: '10 min',
          topic: 'Action Words',
          content: {
            introduction: 'Verbs bring our sentences to life! Let us learn words in motion.',
            learn: [
              { word: 'Running', meaning: 'Moving fast', example: 'The dog is running in the yard.' },
              { word: 'Singing', meaning: 'Making musical sounds', example: 'The birds are singing sweetly.' },
              { word: 'Drawing', meaning: 'Making pictures', example: 'I am drawing a golden sun.' }
            ],
            listen: {
              text: 'Look at the playground! Rohan is running fast. Priya is singing a melody. Arjun is drawing a castle.',
              questions: [
                { question: 'Who is running fast?', options: ['Arjun', 'Rohan', 'Priya'], answer: 1 },
                { question: 'What is Priya doing?', options: ['Drawing', 'Singing', 'Sleeping'], answer: 1 }
              ]
            },
            practice: 'Act out: Running, Singing, Drawing, Dancing',
            speak: 'Say: "I enjoy running in the park and drawing colorful pictures."'
          },
          objectives: ['Express present actions', 'Identify continuous verbs', 'Enhance kinetic vocabulary']
        }
      ],
      'Grammar': [
        {
          title: 'Describing Words (Adjectives)',
          description: 'Use colors, sizes, and feelings to describe nouns',
          icon: '✨',
          duration: '10 min',
          topic: 'Adjectives',
          content: {
            introduction: 'Adjectives tell us more about people, places, and things!',
            learn: [
              { word: 'Big / Small', meaning: 'Size', example: 'An elephant is big; a mouse is small.' },
              { word: 'Happy / Excited', meaning: 'Feelings', example: 'The children are happy today.' },
              { word: 'Sweet / Crunchy', meaning: 'Taste & Texture', example: 'The apple is sweet and crunchy.' }
            ],
            listen: {
              text: 'The happy boy wore a bright red shirt and carried a big yellow balloon.',
              questions: [
                { question: 'What describes the shirt?', options: ['Big yellow', 'Bright red', 'Small green'], answer: 1 },
                { question: 'How did the boy feel?', options: ['Tired', 'Angry', 'Happy'], answer: 2 }
              ]
            },
            practice: 'Describe your favorite snack using 2 adjectives.',
            speak: 'Record: "My backpack is [color] and it is [size/quality]."'
          },
          objectives: ['Recognize adjectives', 'Enrich descriptions', 'Express feelings and attributes']
        }
      ],
      'Listening': [
        {
          title: 'A Day at the Sunny Zoo',
          description: 'Listen to a family trip to the zoo and answer details',
          icon: '🦒',
          duration: '10 min',
          topic: 'Narrative Listening',
          content: {
            introduction: 'Listen to Maya and her brother visit the animals at the zoo!',
            learn: [
              { word: 'Tall Giraffe', meaning: 'Animal with long neck', example: 'The tall giraffe eats high leaves.' },
              { word: 'Roaring Lion', meaning: 'King of the jungle', example: 'The roaring lion rests on a rock.' }
            ],
            listen: {
              text: 'On Sunday, Maya visited the city zoo with her parents. First, they saw the tall giraffes nibbling fresh leaves. Next, they watched playful penguins dive into cool water.',
              questions: [
                { question: 'On what day did Maya visit the zoo?', options: ['Monday', 'Friday', 'Sunday'], answer: 2 },
                { question: 'What were the penguins doing?', options: ['Flying', 'Diving into water', 'Climbing trees'], answer: 1 }
              ]
            },
            practice: 'Listen again and recall the animals mentioned in order.',
            speak: 'Tell us: "If I go to the zoo, I want to see a ______ because it is ______."'
          },
          objectives: ['Track sequence of events', 'Identify narrative key details', 'Recall auditory facts']
        }
      ],
      'Reading': [
        {
          title: 'The Thirsty Crow & The Pitcher',
          description: 'A classic moral story of clever problem-solving',
          icon: '🦅',
          duration: '12 min',
          topic: 'Classic Fables',
          content: {
            introduction: 'Read how a clever crow solved a hard problem using small pebbles!',
            learn: [
              { word: 'Pitcher', meaning: 'A tall clay pot for water', example: 'The water was deep in the pitcher.' },
              { word: 'Pebbles', meaning: 'Small smooth stones', example: 'He dropped pebbles one by one.' }
            ],
            listen: {
              text: 'A thirsty crow flew across the fields looking for water. He found a pitcher with water at the bottom. He dropped small pebbles into the pitcher until the water rose to the top. The crow drank and flew away happily.',
              questions: [
                { question: 'What problem did the crow face?', options: ['He lost his nest', 'He was thirsty and water was low', 'He was injured'], answer: 1 },
                { question: 'How did the crow raise the water?', options: ['Drank with straw', 'Dropped pebbles inside', 'Tipped the pot'], answer: 1 }
              ]
            },
            practice: 'Moral: Where there is a will, there is a way!',
            speak: 'Summarize the story in your own words: "The crow was thirsty so he..."'
          },
          objectives: ['Comprehend cause and effect', 'Infer story moral', 'Express narrative summary']
        }
      ]
    }
  },
  'Class 3': {
    badge: 'Elementary Conversationalist',
    description: 'Asking inquisitive questions, present tenses, family trees, and expressive storytelling.',
    lessons: {
      'Spoken English': [
        {
          title: 'Asking Helpful Questions (5 Ws & 1 H)',
          description: 'Master Who, What, Where, When, Why, and How in everyday dialogue',
          icon: '❓',
          duration: '12 min',
          topic: 'Question Formation',
          content: {
            introduction: 'Curious learners ask great questions! Learn how to use Who, What, Where, and Why.',
            learn: [
              { word: 'Where is...?', meaning: 'Asking about location', example: 'Where is the school library?' },
              { word: 'When will...?', meaning: 'Asking about time', example: 'When will the bus arrive?' },
              { word: 'Why is...?', meaning: 'Asking for reason', example: 'Why do leaves change color?' }
            ],
            listen: {
              text: 'Excuse me sir, where is the science lab? It is on the second floor next to the art room.',
              questions: [
                { question: 'What room is the speaker looking for?', options: ['Art room', 'Science lab', 'Music room'], answer: 1 },
                { question: 'Where is the lab located?', options: ['First floor', 'Second floor', 'Ground floor'], answer: 1 }
              ]
            },
            practice: 'Form 3 questions to ask your classmate about their favorite book.',
            speak: 'Record asking: "Hello, where is the library and when does it open?"'
          },
          objectives: ['Form correct question syntax', 'Ask for directions politely', 'Conversational inquiry']
        }
      ],
      'Vocabulary': [
        {
          title: 'Community Helpers & Professions',
          description: 'Doctors, firefighters, teachers, architects, and pilots',
          icon: '👨‍🚒',
          duration: '10 min',
          topic: 'Professions',
          content: {
            introduction: 'Community helpers make our society safe, healthy, and educated.',
            learn: [
              { word: 'Architect', meaning: 'Designs beautiful buildings and bridges', example: 'The architect drew a modern school.' },
              { word: 'Firefighter', meaning: 'Protects communities from fire danger', example: 'The brave firefighter rescued the cat.' },
              { word: 'Surgeon', meaning: 'A doctor who performs medical operations', example: 'The surgeon helped the patient heal.' }
            ],
            listen: {
              text: 'An architect designs the structure, while engineers ensure it is strong and safe for people.',
              questions: [
                { question: 'Who designs the layout of buildings?', options: ['Chef', 'Architect', 'Mechanic'], answer: 1 }
              ]
            },
            practice: 'Pair each helper with their tool: Doctor (Stethoscope), Painter (Brush)',
            speak: 'Tell us: "When I grow up, I want to become an ______ because ______."'
          },
          objectives: ['Recognize various career paths', 'Describe community responsibilities', 'Expand vocational vocabulary']
        }
      ],
      'Grammar': [
        {
          title: 'Simple Present Tense & Subject-Verb Agreement',
          description: 'Singular vs plural subjects: He plays, They play',
          icon: '⚖️',
          duration: '12 min',
          topic: 'Present Tense',
          content: {
            introduction: 'Singular subjects take verb + s/es (He walks), while plural subjects take the base verb (They walk).',
            learn: [
              { word: 'She reads / We read', meaning: 'Habitual action agreement', example: 'She reads every night. We read together.' },
              { word: 'The sun rises', meaning: 'Universal truth', example: 'The sun rises in the east.' }
            ],
            listen: {
              text: 'Aryan plays the violin every evening, while his sisters sing chorus melodies.',
              questions: [
                { question: 'Which sentence is grammatically correct?', options: ['He play football', 'He plays football', 'He playing football'], answer: 1 }
              ]
            },
            practice: 'Fill in: "The birds (fly/flies) in the sky. The cat (drink/drinks) milk."',
            speak: 'Record 2 sentences describing what your family members do every morning.'
          },
          objectives: ['Apply subject-verb agreement', 'Express habitual truths', 'Identify third-person singular rules']
        }
      ],
      'Listening': [
        {
          title: 'The Great School Science Fair',
          description: 'Follow audio instructions about school projects and awards',
          icon: '🔬',
          duration: '10 min',
          topic: 'Event Comprehension',
          content: {
            introduction: 'Listen to the principal announce the science fair winners!',
            learn: [
              { word: 'Volcano Model', meaning: 'Science demonstration', example: 'The baking soda volcano erupted safely.' },
              { word: 'First Prize', meaning: 'Top achievement award', example: 'Team Nebula won first prize.' }
            ],
            listen: {
              text: 'Welcome students! Today at the annual science fair, Class 3 presented a renewable solar windmill project that won the first innovation prize.',
              questions: [
                { question: 'What project won the innovation prize?', options: ['Robotic car', 'Solar windmill', 'Clay volcano'], answer: 1 }
              ]
            },
            practice: 'Listen and write down the key achievement mentioned.',
            speak: 'Record: "At the science fair, students demonstrated solar windmills."'
          },
          objectives: ['Extract main ideas from school announcements', 'Identify awards and milestones', 'Listen for specific details']
        }
      ],
      'Reading': [
        {
          title: 'The Honest Woodcutter & The Golden Axe',
          description: 'A tale of integrity, honesty, and divine reward',
          icon: '🪓',
          duration: '12 min',
          topic: 'Moral Literature',
          content: {
            introduction: 'A poor woodcutter lost his iron axe in a deep river. What happened next changed his life!',
            learn: [
              { word: 'Integrity', meaning: 'Doing the right thing always', example: 'His integrity earned him great respect.' },
              { word: 'Sparkling Gold', meaning: 'Shining precious metal', example: 'The fairy offered a golden axe.' }
            ],
            listen: {
              text: 'When the water spirit offered a glittering gold axe, the honest woodcutter said: "That is not mine; my axe is simple iron." Pleased by his honesty, the spirit gifted him all three axes.',
              questions: [
                { question: 'Why did the woodcutter refuse the golden axe?', options: ['It was too heavy', 'It was not his axe', 'He disliked gold'], answer: 1 }
              ]
            },
            practice: 'What is the moral of the story? (Honesty is the best policy)',
            speak: 'Explain why honesty is valuable in everyday life.'
          },
          objectives: ['Evaluate ethical dilemmas in literature', 'Recognize character virtues', 'Fluency in dialogue reading']
        }
      ]
    }
  },
  'Class 4': {
    badge: 'Narrative Communicator',
    description: 'Past and future tenses, environmental themes, descriptive paragraphs, and situational roleplay.',
    lessons: {
      'Spoken English': [
        {
          title: 'Expressing Preferences & Polite Disagreements',
          description: 'Say "I prefer...", "In my opinion...", and "I see your point, but..."',
          icon: '🗣️',
          duration: '12 min',
          topic: 'Opinions & Courtesy',
          content: {
            introduction: 'Learn how to share your thoughts politely while respecting other perspectives.',
            learn: [
              { word: 'I prefer... because...', meaning: 'Expressing a choice with reason', example: 'I prefer cycling because it is healthy.' },
              { word: 'In my view...', meaning: 'Sharing a personal perspective', example: 'In my view, reading builds imagination.' }
            ],
            listen: {
              text: 'I understand why you like football, but I personally prefer swimming because it exercises the whole body.',
              questions: [
                { question: 'What does the speaker prefer?', options: ['Football', 'Swimming', 'Tennis'], answer: 1 }
              ]
            },
            practice: 'State your preference between Mountains vs Beaches and give 1 reason.',
            speak: 'Record: "I prefer reading books over watching TV because books spark my creativity."'
          },
          objectives: ['State personal preferences clearly', 'Politely validate others', 'Construct reasoned arguments']
        }
      ],
      'Vocabulary': [
        {
          title: 'Weather Phenomena & Ecosystems',
          description: 'Precipitation, thunderstorms, rainforests, glaciers, and atmosphere',
          icon: '⛈️',
          duration: '12 min',
          topic: 'Nature & Science',
          content: {
            introduction: 'Expand your scientific and natural vocabulary with dynamic words!',
            learn: [
              { word: 'Precipitation', meaning: 'Rain, snow, or hail falling from clouds', example: 'Heavy precipitation filled the reservoirs.' },
              { word: 'Biodiversity', meaning: 'Variety of plant and animal life', example: 'Rainforests possess immense biodiversity.' }
            ],
            listen: {
              text: 'The Amazon rainforest is called the lungs of the Earth because its millions of trees produce vital oxygen.',
              questions: [
                { question: 'Why is the rainforest called the lungs of the Earth?', options: ['It has big animals', 'It produces vital oxygen', 'It receives no rain'], answer: 1 }
              ]
            },
            practice: 'Use "precipitation" and "biodiversity" in sentences.',
            speak: 'Explain why protecting trees is essential for our climate.'
          },
          objectives: ['Incorporate environmental terms', 'Describe natural cycles', 'Broaden academic lexicon']
        }
      ],
      'Grammar': [
        {
          title: 'Past Tense: Regular & Irregular Verbs',
          description: 'Walked, played vs Went, ate, wrote, thought',
          icon: '⏳',
          duration: '12 min',
          topic: 'Past Tense Forms',
          content: {
            introduction: 'Irregular verbs change their spelling in the past tense! Let us master common irregulars.',
            learn: [
              { word: 'Go -> Went', meaning: 'Past of go', example: 'We went to the heritage museum yesterday.' },
              { word: 'Write -> Wrote', meaning: 'Past of write', example: 'She wrote an inspiring poem.' }
            ],
            listen: {
              text: 'Last weekend, Rahul went to the stadium, bought tickets, and cheered as his team won the match.',
              questions: [
                { question: 'What is the past tense of "buy"?', options: ['Buyed', 'Bought', 'Buying'], answer: 1 }
              ]
            },
            practice: 'Convert to past tense: "I see a bird and eat breakfast." -> "I saw a bird and ate breakfast."',
            speak: 'Describe what you did last Sunday using at least 3 irregular past tense verbs.'
          },
          objectives: ['Master common irregular verbs', 'Recount past experiences accurately', 'Avoid past-tense overgeneralization']
        }
      ],
      'Listening': [
        {
          title: 'A Guided Tour of the Space Planetarium',
          description: 'Listen to an astronomer explain planets, stars, and constellations',
          icon: '🪐',
          duration: '12 min',
          topic: 'Educational Audio',
          content: {
            introduction: 'Put on your headphones and explore our solar system with Astronomer Dr. Rao!',
            learn: [
              { word: 'Constellation', meaning: 'A pattern of stars in the night sky', example: 'Orion is a famous winter constellation.' },
              { word: 'Orbit', meaning: 'The curved path of a celestial body', example: 'The Earth orbits the sun in 365 days.' }
            ],
            listen: {
              text: 'Look toward the dome ceiling! Jupiter is the largest planet in our solar system, famous for its Great Red Spot.',
              questions: [
                { question: 'Which planet is the largest in our solar system?', options: ['Mars', 'Jupiter', 'Saturn'], answer: 1 }
              ]
            },
            practice: 'Note down 2 interesting planetary facts from the audio.',
            speak: 'Record a brief fact: "Jupiter is the largest planet and has a giant storm called the Great Red Spot."'
          },
          objectives: ['Process multi-sentence informational audio', 'Identify astronomical concepts', 'Synthesize key insights']
        }
      ],
      'Reading': [
        {
          title: 'The Brave Lighthouse Keeper',
          description: 'A story of courage through stormy ocean waves',
          icon: '🗼',
          duration: '14 min',
          topic: 'Adventure Literature',
          content: {
            introduction: 'Old Captain Thomas maintained the coastal beacon through the heaviest storm of the decade.',
            learn: [
              { word: 'Beacon', meaning: 'A guiding light for ships', example: 'The beacon guided the lost sailors safely to harbor.' },
              { word: 'Turbulent', meaning: 'Rough and stormy', example: 'The turbulent waves crashed against the stone tower.' }
            ],
            listen: {
              text: 'Through howling winds and turbulent ocean spray, Captain Thomas climbed the ninety iron steps to ensure the beacon never flickered out. Thanks to his relentless dedication, three fishing boats navigated safely home.',
              questions: [
                { question: 'Why was the lighthouse keeper climbing the steps?', options: ['To sleep', 'To keep the light beacon burning', 'To catch fish'], answer: 1 }
              ]
            },
            practice: 'Identify the adjectives used to describe the storm and the keeper.',
            speak: 'Read aloud the climactic sentence with expressive emotion.'
          },
          objectives: ['Analyze narrative tension and atmosphere', 'Define nautical vocabulary in context', 'Expressive oral reading']
        }
      ]
    }
  },
  'Class 5': {
    badge: 'Intermediate Articulator',
    description: 'Paragraph construction, prepositions & conjunctions, public speaking confidence, and critical debate.',
    lessons: {
      'Spoken English': [
        {
          title: 'Constructing a 1-Minute Impromptu Speech',
          description: 'Structure ideas using: Hook -> Main Point -> Example -> Conclusion',
          icon: '🎤',
          duration: '14 min',
          topic: 'Impromptu Speaking',
          content: {
            introduction: 'Speaking on the spot is a superpower! Use the 4-step framework to deliver amazing mini-speeches.',
            learn: [
              { word: 'The Hook', meaning: 'An exciting opening question or fact', example: 'Have you ever wondered why kindness changes the world?' },
              { word: 'The Takeaway', meaning: 'A memorable closing thought', example: 'In conclusion, one small act of kindness creates a ripple effect.' }
            ],
            listen: {
              text: 'Have you ever considered why reading books is like having a passport to every country? When you read, you experience centuries of wisdom. Therefore, make reading a daily habit.',
              questions: [
                { question: 'What metaphor did the speaker use for books?', options: ['A gold coin', 'A passport to every country', 'A mirror'], answer: 1 }
              ]
            },
            practice: 'Deliver a 60-second speech on: "The Most Useful Invention in History".',
            speak: 'Record your 1-minute speech with an engaging hook and strong conclusion.'
          },
          objectives: ['Master 4-step speech structure', 'Eliminate filler pauses (um, uh)', 'Project clear vocal modulation']
        }
      ],
      'Vocabulary': [
        {
          title: 'Synonyms, Antonyms & Precise Lexicon',
          description: 'Upgrade basic words: Good -> Exceptional, Bad -> Detrimental, Big -> Immense',
          icon: '💎',
          duration: '12 min',
          topic: 'Vocabulary Elevation',
          content: {
            introduction: 'Replace overused words with rich, expressive vocabulary!',
            learn: [
              { word: 'Exceptional', meaning: 'Unusually good; outstanding', example: 'Her presentation was exceptional.' },
              { word: 'Perseverance', meaning: 'Never giving up despite difficulty', example: 'Through perseverance, he mastered coding.' }
            ],
            listen: {
              text: 'Instead of saying the movie was very good, articulate that the cinematic performance was exceptional and captivating.',
              questions: [
                { question: 'What is a sophisticated synonym for "very good"?', options: ['Dull', 'Exceptional', 'Mediocre'], answer: 1 }
              ]
            },
            practice: 'Replace 3 basic words in a paragraph with advanced synonyms.',
            speak: 'Say: "Her exceptional perseverance led to an outstanding achievement."'
          },
          objectives: ['Expand lexical diversity', 'Employ nuanced synonyms in speech', 'Avoid repetitive simple terminology']
        }
      ],
      'Grammar': [
        {
          title: 'Complex Prepositions & Conjunctions',
          description: 'Although, whereas, in spite of, alongside, regarding',
          icon: '🔗',
          duration: '14 min',
          topic: 'Connectors & Clauses',
          content: {
            introduction: 'Conjunctions connect contrasting ideas and demonstrate mature reasoning in English.',
            learn: [
              { word: 'Although / Even though', meaning: 'In spite of the fact that', example: 'Although it rained heavily, we finished the marathon.' },
              { word: 'Whereas', meaning: 'In contrast or comparison', example: 'Solar energy is renewable, whereas fossil fuels are finite.' }
            ],
            listen: {
              text: 'Although the challenge was formidable, the students collaborated effectively and engineered a winning solution.',
              questions: [
                { question: 'Which connector indicates contrast?', options: ['Because', 'Although', 'And'], answer: 1 }
              ]
            },
            practice: 'Join two sentences using "Although": "He was tired. He completed his research."',
            speak: 'Record a compound-complex sentence comparing two hobbies using "whereas".'
          },
          objectives: ['Construct complex sentence architectures', 'Employ subordinating conjunctions', 'Enhance cohesion in writing and speech']
        }
      ],
      'Listening': [
        {
          title: 'The Great Exploration: Deep Sea Trenches',
          description: 'Listen to oceanographers explore the Mariana Trench',
          icon: '🌊',
          duration: '12 min',
          topic: 'Science & Discovery',
          content: {
            introduction: 'Dive 11,000 meters underwater where bioluminescent creatures thrive in darkness.',
            learn: [
              { word: 'Bioluminescence', meaning: 'Light emitted by living organisms', example: 'Deep sea jellyfish glow with blue bioluminescence.' },
              { word: 'Atmospheric Pressure', meaning: 'Weight of the air and water', example: 'The pressure at the ocean floor is immense.' }
            ],
            listen: {
              text: 'At the bottom of the Mariana Trench, living organisms endure extreme cold and pressure by producing their own natural light through chemical bioluminescence.',
              questions: [
                { question: 'How do deep sea creatures create light in darkness?', options: ['Flashlights', 'Bioluminescence', 'Solar panels'], answer: 1 }
              ]
            },
            practice: 'Summarize the primary survival adaptation of deep-sea marine life.',
            speak: 'State: "Bioluminescence allows deep sea creatures to illuminate their environment."'
          },
          objectives: ['Comprehend specialized scientific discourse', 'Extract empirical facts from speech', 'Synthesize auditory technical data']
        }
      ],
      'Reading': [
        {
          title: 'The Young Inventor & The Clean Water Filter',
          description: 'A contemporary narrative of student innovation saving village water wells',
          icon: '💡',
          duration: '15 min',
          topic: 'Inspirational Fiction',
          content: {
            introduction: 'Twelve-year-old Ananya noticed muddy water in her neighborhood and set out to build an affordable charcoal-sand filter.',
            learn: [
              { word: 'Filtration', meaning: 'The process of removing impurities', example: 'The multi-layer filtration purified the stream water.' },
              { word: 'Innovation', meaning: 'A new method, idea, or product', example: 'Her cost-effective innovation earned a national grant.' }
            ],
            listen: {
              text: 'By combining activated charcoal, crushed moringa seeds, and fine quartz sand, Ananya engineered a gravity-powered purifier that cleared 99% of sediment without electricity.',
              questions: [
                { question: 'What natural seed did Ananya include in her filter?', options: ['Apple seed', 'Moringa seed', 'Sunflower seed'], answer: 1 }
              ]
            },
            practice: 'Identify the steps Ananya took from identifying a problem to developing a solution.',
            speak: 'Explain how young innovators can solve real-world community challenges.'
          },
          objectives: ['Analyze character problem-solving methodologies', 'Understand technical narrative contexts', 'Foster entrepreneurial thinking']
        }
      ]
    }
  },
  'Class 6': {
    badge: 'Fluent Conversationalist',
    description: 'Modal auxiliaries, formal dialogues, conditional hypotheses, and literary exposition.',
    lessons: {
      'Spoken English': [
        {
          title: 'Participating in a Group Discussion (Turn-Taking)',
          description: 'Politely agree, disagree, add points, and invite peers into the conversation',
          icon: '👥',
          duration: '14 min',
          topic: 'Group Dynamics',
          content: {
            introduction: 'Master conversational etiquette in group discussions: "May I add to that?", "Building on your point..."',
            learn: [
              { word: 'Building on your point...', meaning: 'Adding supporting information', example: 'Building on what Sarah mentioned, digital libraries save paper.' },
              { word: 'I respectfully see it differently...', meaning: 'Courteous disagreement', example: 'I respectfully see it differently because costs are also a factor.' }
            ],
            listen: {
              text: 'Thank you Alex. While I appreciate your viewpoint regarding homework, may I suggest that project-based learning improves practical retention more effectively?',
              questions: [
                { question: 'What polite phrase was used to introduce a counter-perspective?', options: ['You are completely wrong', 'While I appreciate your viewpoint, may I suggest...', 'Be quiet'], answer: 1 }
              ]
            },
            practice: 'Simulate a discussion response agreeing with a classmate and adding one new statistic.',
            speak: 'Record: "Building on your point, implementing renewable energy also creates future jobs."'
          },
          objectives: ['Master diplomatic conversational turn-taking', 'Articulate nuanced counter-arguments', 'Maintain collaborative group tone']
        }
      ],
      'Vocabulary': [
        {
          title: 'Idioms & Figurative Expressions',
          description: 'Bite the bullet, piece of cake, break the ice, blessing in disguise',
          icon: '🎭',
          duration: '12 min',
          topic: 'Idiomatic Mastery',
          content: {
            introduction: 'Idioms enrich conversational fluency and make speech vibrant and natural!',
            learn: [
              { word: 'Break the ice', meaning: 'Make people feel comfortable in a new setting', example: 'A friendly joke helped break the ice at the workshop.' },
              { word: 'Blessing in disguise', meaning: 'An apparent misfortune that yields good results', example: 'Missing that train was a blessing in disguise.' }
            ],
            listen: {
              text: 'The math quiz seemed daunting at first, but with thorough preparation, it turned out to be a piece of cake.',
              questions: [
                { question: 'What does "a piece of cake" signify?', options: ['Very delicious', 'Extremely easy and manageable', 'Full of sugar'], answer: 1 }
              ]
            },
            practice: 'Use "break the ice" in a dialogue scenario introducing yourself to a new team.',
            speak: 'Record a brief anecdote incorporating two idioms correctly.'
          },
          objectives: ['Interpret figurative meanings', 'Incorporate common idioms into speech', 'Differentiate literal vs figurative expressions']
        }
      ],
      'Grammar': [
        {
          title: 'Conditionals (Zero, First, and Second Conditional)',
          description: 'If it rains, we will stay inside vs If I had a spaceship, I would explore Mars',
          icon: '🔀',
          duration: '14 min',
          topic: 'Hypothetical Conditionals',
          content: {
            introduction: 'Conditionals express cause, real possibilities, and imaginative hypotheses.',
            learn: [
              { word: 'First Conditional (Real Future)', meaning: 'If + Present, Will + Verb', example: 'If you study consistently, you will achieve top grades.' },
              { word: 'Second Conditional (Hypothetical)', meaning: 'If + Past, Would + Verb', example: 'If I were the school president, I would build a planetarium.' }
            ],
            listen: {
              text: 'If communities reduce plastic consumption today, marine ecosystems will regenerate over the coming decade.',
              questions: [
                { question: 'Which sentence is a Second Conditional hypothesis?', options: ['If water boils, it turns to steam', 'If I had wings, I would fly across mountains', 'If you call, I will answer'], answer: 1 }
              ]
            },
            practice: 'Complete: "If I could travel anywhere in time, I would..."',
            speak: 'Record a First Conditional statement advising a friend on exam preparation.'
          },
          objectives: ['Distinguish real vs hypothetical conditions', 'Apply correct verb tenses in conditional clauses', 'Express speculative reasoning']
        }
      ],
      'Listening': [
        {
          title: 'The History of the Printing Press',
          description: 'Listen to how Gutenberg revolutionized global literacy',
          icon: '📰',
          duration: '14 min',
          topic: 'Historical Documentary',
          content: {
            introduction: 'Explore how movable metal type democratized books and scientific knowledge worldwide.',
            learn: [
              { word: 'Movable Type', meaning: 'System of printing using reusable components', example: 'Gutenberg perfected metal movable type in the 1440s.' },
              { word: 'Democratize', meaning: 'Make accessible to everyone', example: 'The printing press democratized education.' }
            ],
            listen: {
              text: 'Prior to the 15th century, each manuscript required months of manual copying by scribes. Gutenberg’s mechanical press enabled thousands of identical books to circulate across continents in weeks.',
              questions: [
                { question: 'What major change occurred with the invention of the printing press?', options: ['Books became handwritten', 'Thousands of identical copies could be produced rapidly', 'Paper was banned'], answer: 1 }
              ]
            },
            practice: 'List 2 global impacts of widespread book availability.',
            speak: 'Summarize the significance of Johannes Gutenberg in 2 sentences.'
          },
          objectives: ['Chronicle historical cause-and-effect', 'Interpret cultural transformations through audio', 'Develop analytical note-taking']
        }
      ],
      'Reading': [
        {
          title: 'The Starry Night & The Painter’s Vision',
          description: 'A study of Vincent van Gogh’s turbulent skies and artistic resilience',
          icon: '🎨',
          duration: '15 min',
          topic: 'Art & Biography',
          content: {
            introduction: 'Discover how swirling vibrant cobalt and golden yellows translated emotional energy onto canvas.',
            learn: [
              { word: 'Expressive', meaning: 'Effectively conveying thought or feeling', example: 'His expressive brushstrokes conveyed raw emotion.' },
              { word: 'Resilience', meaning: 'Capacity to withstand adversity', example: 'His artistic resilience produced timeless masterpieces.' }
            ],
            listen: {
              text: 'In his small studio in Saint-Rémy, Van Gogh looked past physical reality to paint the sky as a swirling, pulsating cosmos of light and kinetic energy.',
              questions: [
                { question: 'What technique did Van Gogh use to depict the night sky?', options: ['Flat gray shading', 'Swirling, pulsating brushstrokes of light', 'Geometric triangles'], answer: 1 }
              ]
            },
            practice: 'Analyze the tone of the passage: Is it descriptive, critical, or admiring? (Admiring)',
            speak: 'Express what art means to you in your own words.'
          },
          objectives: ['Analyze authorial perspective and tone', 'Appreciate descriptive aesthetic language', 'Connect visual art with literary description']
        }
      ]
    }
  },
  'Class 7': {
    badge: 'Debate & Rhetoric Scholar',
    description: 'Active vs Passive voice, persuasive speeches, formal debate arguments, and analytical synthesis.',
    lessons: {
      'Spoken English': [
        {
          title: 'The Art of Persuasion: Ethos, Pathos, and Logos',
          description: 'Employ credibility, emotion, and logic to influence an audience',
          icon: '🏛️',
          duration: '15 min',
          topic: 'Rhetoric & Persuasion',
          content: {
            introduction: 'Master Aristotle’s three pillars of persuasive speech: Ethos (Trust), Pathos (Heart), and Logos (Logic).',
            learn: [
              { word: 'Ethos (Credibility)', meaning: 'Establishing authority and trust', example: 'As someone who has researched solar technology for five years...' },
              { word: 'Logos (Logic & Data)', meaning: 'Using evidence, reasoning, and statistics', example: 'Data demonstrates a 40% reduction in emissions.' }
            ],
            listen: {
              text: 'To protect our planet, we cannot rely on hopeful sentiment alone. The statistical evidence is clear: transitioning to renewable grids reduces urban smog by 65%.',
              questions: [
                { question: 'Which rhetorical pillar is demonstrated by citing statistical evidence?', options: ['Pathos', 'Logos', 'Ethos'], answer: 1 }
              ]
            },
            practice: 'Write a 3-sentence argument combining both Logos (statistic) and Pathos (emotional call to action).',
            speak: 'Record a persuasive speech pitch for a community recycling initiative.'
          },
          objectives: ['Apply rhetorical devices in speech', 'Synthesize logical data with emotional resonance', 'Deliver authoritative oral arguments']
        }
      ],
      'Vocabulary': [
        {
          title: 'High-Utility Academic Vocabulary (Tier 2 Words)',
          description: 'Substantiate, articulate, scrutinize, delineate, comprehensive, pertinent',
          icon: '🎓',
          duration: '14 min',
          topic: 'Academic Lexicon',
          content: {
            introduction: 'Level up your academic vocabulary for presentations, essays, and formal debates.',
            learn: [
              { word: 'Substantiate', pronunciation: 'sub-STAN-shee-ayt', meaning: 'Provide evidence to support or prove the truth of', example: 'Always substantiate your claims with empirical evidence.' },
              { word: 'Delineate', pronunciation: 'dih-LIN-ee-ayt', meaning: 'Describe or portray precisely', example: 'The proposal clearly delineates each project phase.' }
            ],
            listen: {
              text: 'The lead scientist substantiated her hypothesis by delineating comprehensive data collected over three successive trials.',
              questions: [
                { question: 'What does "substantiate" mean?', options: ['To guess randomly', 'To support with evidence', 'To forget details'], answer: 1 }
              ]
            },
            practice: 'Construct sentences using "substantiate" and "delineate".',
            speak: 'State: "I will delineate our core strategy and substantiate every claim with documented findings."'
          },
          objectives: ['Incorporate Tier 2 academic vocabulary', 'Enhance formal scholastic discourse', 'Differentiate nuances between near-synonyms']
        }
      ],
      'Grammar': [
        {
          title: 'Active vs. Passive Voice for Stylistic Impact',
          description: 'When to emphasize the doer vs when to emphasize the action or outcome',
          icon: '🔄',
          duration: '14 min',
          topic: 'Voice & Syntax',
          content: {
            introduction: 'Active voice creates energetic, direct speech. Passive voice emphasizes scientific objectivity and outcomes.',
            learn: [
              { word: 'Active: The team discovered the cure.', meaning: 'Focus on the subject/actor', example: 'Scientists developed the breakthrough vaccine.' },
              { word: 'Passive: The breakthrough vaccine was developed.', meaning: 'Focus on the recipient or result', example: 'The historic monument was restored in 2024.' }
            ],
            listen: {
              text: 'Active: Dr. Fleming discovered penicillin in 1928. Passive: Penicillin was discovered in 1928 and revolutionized modern medicine.',
              questions: [
                { question: 'Which sentence is in the Passive Voice?', options: ['The committee approved the budget', 'The budget was approved by the committee', 'They will vote tomorrow'], answer: 1 }
              ]
            },
            practice: 'Convert to Passive: "Engineers designed the solar satellite." -> "The solar satellite was designed by engineers."',
            speak: 'Record 2 sentences explaining a scientific experiment in the Passive Voice.'
          },
          objectives: ['Transform active and passive voice effortlessly', 'Select voice based on communicative purpose', 'Employ passive voice in scientific reporting']
        }
      ],
      'Listening': [
        {
          title: 'The Great Debate: Artificial Intelligence in Education',
          description: 'Listen to contrasting viewpoints from educators and technologists',
          icon: '🤖',
          duration: '15 min',
          topic: 'Critical Audio Synthesis',
          content: {
            introduction: 'Analyze two debaters arguing the benefits versus potential risks of AI tutors in classrooms.',
            learn: [
              { word: 'Adaptive Learning', meaning: 'Software customizing pace for each student', example: 'Adaptive algorithms identify learning gaps.' },
              { word: 'Pedagogical', meaning: 'Relating to teaching methods', example: 'Human teachers provide vital pedagogical empathy.' }
            ],
            listen: {
              text: 'Speaker A highlights that AI provides 24/7 personalized practice. In rebuttal, Speaker B argues that human mentorship teaches critical empathy, creativity, and resilience.',
              questions: [
                { question: 'What is Speaker B’s primary counter-argument?', options: ['Computers are too cheap', 'Human mentorship provides empathy and emotional support', 'AI is too slow'], answer: 1 }
              ]
            },
            practice: 'Summarize both speakers’ arguments in a balanced 2-column table.',
            speak: 'Deliver your personal verdict in a 45-second reasoned speech.'
          },
          objectives: ['Synthesize conflicting oral viewpoints', 'Evaluate credibility of arguments', 'Formulate objective debate conclusions']
        }
      ],
      'Reading': [
        {
          title: 'The Odyssey of Antarctic Ice: The Ross Ice Shelf',
          description: 'An investigative science article on polar climatology and global sea levels',
          icon: '🧊',
          duration: '16 min',
          topic: 'Informational Text',
          content: {
            introduction: 'Explore the frozen frontier of Antarctica where massive glacial ice shelves hold the key to Earth’s climate future.',
            learn: [
              { word: 'Cryosphere', meaning: 'The frozen water part of the Earth system', example: 'The cryosphere regulates planetary solar reflection.' },
              { word: 'Equilibrium', meaning: 'A state of balance', example: 'Thermal equilibrium prevents runaway melting.' }
            ],
            listen: {
              text: 'The Ross Ice Shelf acts as a colossal retaining wall, slowing the flow of continental ice into Southern ocean waters and maintaining planetary climate equilibrium.',
              questions: [
                { question: 'What primary ecological role does the ice shelf fulfill?', options: ['Provides tourist resorts', 'Acts as a buffer slowing continental ice melt', 'Reflects no sunlight'], answer: 1 }
              ]
            },
            practice: 'Identify the cause-and-effect relationship between atmospheric warming and polar shelves.',
            speak: 'Explain why polar ice conservation impacts coastal cities thousands of miles away.'
          },
          objectives: ['Comprehend high-density informational prose', 'Extract thematic claims and supporting evidence', 'Synthesize ecological concepts']
        }
      ]
    }
  },
  'Class 8': {
    badge: 'Critical Orator & Analyst',
    description: 'Direct & Indirect Speech, formal essays, public discourse, nuanced listening, and thematic debate.',
    lessons: {
      'Spoken English': [
        {
          title: 'Mastering the Opening Speech in a Model UN',
          description: 'Represent a delegation, outline international policy, and call for multilateral cooperation',
          icon: '🌐',
          duration: '15 min',
          topic: 'Diplomatic Public Speaking',
          content: {
            introduction: 'Diplomatic discourse requires precision, gravitas, and constructive international vision.',
            learn: [
              { word: 'Distinguished Delegates', meaning: 'Formal address to assembly peers', example: 'Honorable Chair and distinguished delegates...' },
              { word: 'Multilateral Resolution', meaning: 'An agreed solution between many nations', example: 'We propose a multilateral framework for clean energy sharing.' }
            ],
            listen: {
              text: 'Honorable Chair, distinguished delegates: The delegation of India firmly believes that access to potable water is a fundamental human right, demanding immediate multilateral investment.',
              questions: [
                { question: 'What is the core diplomatic call made by the delegate?', options: ['Military expansion', 'Multilateral investment in clean water', 'Ignoring international treaties'], answer: 1 }
              ]
            },
            practice: 'Write and deliver a 60-second opening statement on global cybersecurity.',
            speak: 'Record your diplomatic opening address using formal vocal cadence.'
          },
          objectives: ['Adopt formal diplomatic register', 'Construct policy-driven oral statements', 'Command authority and stage presence']
        }
      ],
      'Vocabulary': [
        {
          title: 'Cognitive & Rhetorical Vocabulary',
          description: 'Paradigm, ubiquitous, dichotomy, pragmatic, empirical, quintessential',
          icon: '🧠',
          duration: '14 min',
          topic: 'Advanced Lexicon',
          content: {
            introduction: 'Master collegiate-level vocabulary that sharpens analytical writing and speech.',
            learn: [
              { word: 'Paradigm', pronunciation: 'PAIR-uh-dyme', meaning: 'A typical example or pattern of something; a model', example: 'Renewable technology represents a paradigm shift in global energy.' },
              { word: 'Pragmatic', pronunciation: 'prag-MAT-ik', meaning: 'Dealing with things sensibly and realistically', example: 'We need pragmatic solutions, not theoretical ideals.' }
            ],
            listen: {
              text: 'Rather than pursuing idealistic fantasies, the committee adopted a pragmatic paradigm rooted in verified empirical metrics.',
              questions: [
                { question: 'What does "pragmatic" mean?', options: ['Idealistic and unproven', 'Practical and realistic', 'Extremely expensive'], answer: 1 }
              ]
            },
            practice: 'Incorporate "paradigm" and "pragmatic" into an essay topic of your choice.',
            speak: 'Articulate: "This pragmatic approach signifies a fundamental paradigm shift."'
          },
          objectives: ['Deploy collegiate-level analytical words', 'Elevate academic speech sophistication', 'Contextualize conceptual vocabulary']
        }
      ],
      'Grammar': [
        {
          title: 'Reported (Indirect) Speech: Tense Shifts & Pronoun Rules',
          description: 'Convert "I am studying" -> He said that he was studying',
          icon: '💬',
          duration: '14 min',
          topic: 'Reported Speech',
          content: {
            introduction: 'Indirect speech allows us to accurately communicate what another person stated without direct quoting.',
            learn: [
              { word: 'Present -> Past', meaning: 'Backshift in reported tense', example: '"I love astronomy" -> She stated that she loved astronomy.' },
              { word: 'Will -> Would', meaning: 'Modal backshift', example: '"We will arrive at noon" -> They announced that they would arrive at noon.' }
            ],
            listen: {
              text: 'Direct: "We have discovered a new exoplanet," announced the astrophysicist. Indirect: The astrophysicist announced that they had discovered a new exoplanet.',
              questions: [
                { question: 'What is the correct reported version of: "I will finish the assignment"?', options: ['He said he will finish', 'He said that he would finish the assignment', 'He said he is finishing'], answer: 1 }
              ]
            },
            practice: 'Convert 3 direct quotes from a news article into reported indirect speech.',
            speak: 'Report what your friend told you yesterday using proper past backshift.'
          },
          objectives: ['Master tense backshift mechanics', 'Adjust pronouns and temporal adverbs accurately', 'Apply reported speech in journalistic writing']
        }
      ],
      'Listening': [
        {
          title: 'The Neuroscience of Habit Formation',
          description: 'Listen to a cognitive scientist explain the Cue -> Routine -> Reward loop',
          icon: '🧬',
          duration: '15 min',
          topic: 'Scientific Lecture',
          content: {
            introduction: 'How does the human brain automate behavior? Understand the neurobiology of the habit loop.',
            learn: [
              { word: 'Basal Ganglia', meaning: 'Brain region responsible for habit execution', example: 'The basal ganglia stores automated patterns.' },
              { word: 'Neuroplasticity', meaning: 'The brain\'s ability to reorganize and form new neural pathways', example: 'Neuroplasticity allows lifelong learning.' }
            ],
            listen: {
              text: 'Habits are encoded into a three-step neurological loop: an environmental cue triggers a behavioral routine, which subsequently delivers an intrinsic dopamine reward.',
              questions: [
                { question: 'What are the three components of the neurological habit loop?', options: ['Thought, Feeling, Action', 'Cue, Routine, Reward', 'Plan, Execute, Repeat'], answer: 1 }
              ]
            },
            practice: 'Analyze a personal habit and map its Cue, Routine, and Reward.',
            speak: 'Explain the concept of neuroplasticity in your own words.'
          },
          objectives: ['Comprehend multi-phase biological explanations', 'Map psychological models from spoken lectures', 'Synthesize cognitive science principles']
        }
      ],
      'Reading': [
        {
          title: 'The Architecture of the Biosphere 2 Experiment',
          description: 'A scientific retrospective on building an artificial closed ecosystem in Arizona',
          icon: '🌐',
          duration: '16 min',
          topic: 'Ecological Investigation',
          content: {
            introduction: 'Eight researchers locked themselves inside a sealed glass dome for two years to model self-sustaining Martian colonies.',
            learn: [
              { word: 'Closed Ecological System', meaning: 'Self-contained life support environment without external matter exchange', example: 'Biosphere 2 tested closed ecological parameters.' },
              { word: 'Oxygen Depletion', meaning: 'Loss of breathable air balance', example: 'Concrete absorption led to unexpected oxygen depletion.' }
            ],
            listen: {
              text: 'While the mission encountered unexpected atmospheric imbalances, Biosphere 2 proved that replicating Earth\'s delicate climatic equilibrium requires immense ecological humility and technological mastery.',
              questions: [
                { question: 'What did the Biosphere 2 experiment demonstrate about Earth\'s ecosystem?', options: ['It is easy to replace', 'It is remarkably complex and requires delicate balance', 'Ecosystems do not need carbon'], answer: 1 }
              ]
            },
            practice: 'Evaluate the primary scientific conclusions derived from the experiment.',
            speak: 'Discuss whether establishing permanent colonies on Mars is feasible based on the reading.'
          },
          objectives: ['Examine scientific experimental methodology', 'Critically evaluate experimental setbacks', 'Synthesize multidisciplinary STEM literature']
        }
      ]
    }
  },
  'Class 9': {
    badge: 'Advanced Academic Rhetorician',
    description: 'Subjunctive mood, literary critique, panel moderating, nuanced comprehension, and research discourse.',
    lessons: {
      'Spoken English': [
        {
          title: 'Moderating a Panel Discussion & Handling Q&A',
          description: 'Introduce speakers, bridge contrasting topics, manage time, and summarize key findings',
          icon: '🎙️',
          duration: '16 min',
          topic: 'Panel Moderation & Leadership',
          content: {
            introduction: 'Great moderators synthesize ideas in real-time, ask provocative questions, and ensure vibrant dialogue.',
            learn: [
              { word: 'To bridge this discussion...', meaning: 'Connecting two related speaker topics', example: 'To bridge Dr. Sen’s point on ethics with Mr. Khan’s view on scalability...' },
              { word: 'Opening the floor to questions', meaning: 'Inviting audience participation', example: 'We now open the floor to audience questions.' }
            ],
            listen: {
              text: 'Thank you both for those compelling presentations. To bridge these perspectives: how can policymakers balance aggressive economic growth with environmental conservation?',
              questions: [
                { question: 'What is the moderator’s primary goal when bridging perspectives?', options: ['End the event early', 'Synthesize connections between speakers to stimulate discussion', 'Tell personal stories'], answer: 1 }
              ]
            },
            practice: 'Simulate introducing 2 guest speakers on renewable energy and posing 1 thought-provoking question.',
            speak: 'Record your opening panel monologue welcoming delegates.'
          },
          objectives: ['Demonstrate conversational leadership', 'Synthesize real-time arguments smoothly', 'Command executive presence']
        }
      ],
      'Vocabulary': [
        {
          title: 'Advanced Socio-Political & Literary Lexicon',
          description: 'Anachronism, ubiquitous, juxtaposition, epiphanic, nuance, circumspect',
          icon: '📚',
          duration: '15 min',
          topic: 'Advanced Critical Vocabulary',
          content: {
            introduction: 'Master words that allow deep analytical insight in essays, literature reviews, and speeches.',
            learn: [
              { word: 'Juxtaposition', pronunciation: 'juk-stuh-puh-ZISH-un', meaning: 'Placing two contrasting things close together for effect', example: 'The author created a stark juxtaposition between poverty and opulent luxury.' },
              { word: 'Anachronism', pronunciation: 'uh-NAK-ruh-niz-um', meaning: 'Something belonging to a period other than that in which it exists', example: 'A digital clock in a medieval movie is an anachronism.' }
            ],
            listen: {
              text: 'Through the sharp juxtaposition of rural simplicity and towering industrial towers, the poet illustrated rapid urbanization.',
              questions: [
                { question: 'What literary device places contrasting elements side by side?', options: ['Alliteration', 'Juxtaposition', 'Hyperbole'], answer: 1 }
              ]
            },
            practice: 'Write a short critical sentence analyzing a painting or novel using "juxtaposition".',
            speak: 'State: "The striking juxtaposition highlights the poignant theme of societal change."'
          },
          objectives: ['Deploy high-register analytical terms', 'Critique literary devices with precision', 'Enhance expressive precision in speech']
        }
      ],
      'Grammar': [
        {
          title: 'The Subjunctive Mood & Inverted Sentence Structures',
          description: '"Had I known...", "I recommend that he be present", "Rarely have we witnessed..."',
          icon: '⚡',
          duration: '15 min',
          topic: 'Advanced Syntax & Inversions',
          content: {
            introduction: 'Inverted sentences and subjunctive forms elevate formal English into poetic, authoritative eloquence.',
            learn: [
              { word: 'Subjunctive Mood (Demands & Wishes)', meaning: 'Base verb after verbs of urgency', example: 'The committee demanded that the policy be revised immediately.' },
              { word: 'Negative Inversion (Dramatic Emphasis)', meaning: 'Negative adverb + Auxiliary + Subject', example: 'Seldom have we witnessed such remarkable scientific collaboration.' }
            ],
            listen: {
              text: 'Not only did the breakthrough reduce manufacturing costs, but it also curtailed environmental emissions by half.',
              questions: [
                { question: 'Which sentence demonstrates correct negative inversion?', options: ['Rarely we see such dedication', 'Rarely have we seen such dedication', 'Rarely we have seen'], answer: 1 }
              ]
            },
            practice: 'Rewrite using inversion: "We have rarely witnessed such resilience." -> "Rarely have we witnessed such resilience."',
            speak: 'Deliver an inverted rhetorical sentence emphasizing a scientific discovery.'
          },
          objectives: ['Master stylistic sentence inversion', 'Apply the subjunctive mood in formal proposals', 'Harness syntax for rhetorical impact']
        }
      ],
      'Listening': [
        {
          title: 'The Philosophy of Stoicism: Marcus Aurelius & Meditations',
          description: 'A philosophical examination of emotional mastery, duty, and resilience',
          icon: '🏛️',
          duration: '16 min',
          topic: 'Classical Philosophy',
          content: {
            introduction: 'Listen to an analysis of Emperor Marcus Aurelius writing personal reflections on virtue amid crises.',
            learn: [
              { word: 'Dichotomy of Control', meaning: 'Distinguishing what is within our power vs what is not', example: 'Focusing on the dichotomy of control relieves needless anxiety.' },
              { word: 'Equanimity', meaning: 'Mental calmness and composure in difficult situations', example: 'She handled the crisis with quiet equanimity.' }
            ],
            listen: {
              text: 'Stoic philosophy teaches that while we cannot control external circumstances, we maintain absolute sovereignty over our internal judgments and responses.',
              questions: [
                { question: 'According to Stoicism, what do humans maintain absolute sovereignty over?', options: ['The weather', 'Other people’s thoughts', 'Our internal judgments and responses'], answer: 2 }
              ]
            },
            practice: 'Summarize the core premise of the "Dichotomy of Control".',
            speak: 'Articulate how mental equanimity benefits leaders during moments of uncertainty.'
          },
          objectives: ['Analyze philosophical lectures and ethical concepts', 'Extract metaphysical arguments from audio', 'Synthesize classical reasoning in modern contexts']
        }
      ],
      'Reading': [
        {
          title: 'The Decipherment of the Rosetta Stone: Unlocking Hieroglyphs',
          description: 'How Jean-François Champollion cracked the code of ancient Egyptian inscriptions',
          icon: '📜',
          duration: '16 min',
          topic: 'Linguistic Archaeology',
          content: {
            introduction: 'For fourteen centuries, hieroglyphics remained silent until a trilingual black granodiorite slab yielded its linguistic secrets.',
            learn: [
              { word: 'Phonetic Value', meaning: 'The sound representation of a written symbol', example: 'Hieroglyphs served both as ideograms and phonetic characters.' },
              { word: 'Cartouche', meaning: 'An oval enclosing royal names in hieroglyphs', example: 'The cartouche of Ptolemy provided the key phonetic baseline.' }
            ],
            listen: {
              text: 'By comparing the Greek text with the Egyptian demotic script and the royal cartouches, Champollion deduced that hieroglyphs were not merely symbolic pictograms, but a sophisticated phonetic alphabet.',
              questions: [
                { question: 'What breakthrough did Champollion achieve regarding hieroglyphs?', options: ['Discovered they were musical notes', 'Realized they contained phonetic sounds representing letters', 'Proved they were fake'], answer: 1 }
              ]
            },
            practice: 'Describe the comparative method Champollion used across the three scripts.',
            speak: 'Explain why the decipherment of the Rosetta Stone revolutionized our understanding of world history.'
          },
          objectives: ['Trace complex historical deductions in literature', 'Comprehend historical linguistic principles', 'Evaluate cross-cultural textual evidence']
        }
      ]
    }
  },
  'Class 10': {
    badge: 'Master Diplomat & Global Communicator',
    description: 'Executive articulation, interview mastery, complex literary dissection, and competitive oratory.',
    lessons: {
      'Spoken English': [
        {
          title: 'The Masterclass in Executive Interviewing & Articulation',
          description: 'Answer complex behavioral prompts using the STAR methodology (Situation, Task, Action, Result)',
          icon: '👔',
          duration: '16 min',
          topic: 'Executive Interview Mastery',
          content: {
            introduction: 'Master the gold standard of professional communication: The STAR framework.',
            learn: [
              { word: 'STAR Framework', meaning: 'Situation -> Task -> Action -> Result structure', example: 'In my previous project (Situation), our deadline shifted (Task)...' },
              { word: 'Quantifiable Result', meaning: 'Measurable, specific outcome of your leadership', example: '...which increased team efficiency by 35%.' }
            ],
            listen: {
              text: 'When asked about handling adversity, articulate: First describe the Situation, specify the Task, delineate the decisive Action you spearheaded, and conclude with the measurable, positive Result.',
              questions: [
                { question: 'What does the acronym STAR represent?', options: ['Start, Think, Act, Repeat', 'Situation, Task, Action, Result', 'Speak, Talk, Ask, Reply'], answer: 1 }
              ]
            },
            practice: 'Draft a 90-second STAR response to: "Tell me about a time you led a team through a significant challenge."',
            speak: 'Record your executive STAR response with confident, polished articulation.'
          },
          objectives: ['Structure professional interviews with executive clarity', 'Deliver quantifiable impact narratives', 'Project commanding executive composure']
        }
      ],
      'Vocabulary': [
        {
          title: 'Diplomatic & Jurisprudential Lexicon',
          description: 'Sovereignty, caveat, quid pro quo, non sequitur, hegemony, unilateral',
          icon: '⚖️',
          duration: '15 min',
          topic: 'High-Stakes Legal & Diplomatic Terms',
          content: {
            introduction: 'Master international policy, legal, and boardroom terms for world-class spoken fluency.',
            learn: [
              { word: 'Caveat', pronunciation: 'KAV-ee-aht', meaning: 'A warning or proviso of specific stipulations', example: 'The agreement was ratified with one critical environmental caveat.' },
              { word: 'Hegemony', pronunciation: 'hih-JEM-uh-nee', meaning: 'Leadership or dominance, especially by one state or social group', example: 'Technological innovation prevents monopolistic market hegemony.' }
            ],
            listen: {
              text: 'The international treaty was executed with a key caveat guaranteeing national data sovereignty and preventing unilateral digital hegemony.',
              questions: [
                { question: 'What does "caveat" mean in formal agreements?', options: ['A celebration party', 'A warning or specific limiting condition', 'A monetary penalty'], answer: 1 }
              ]
            },
            practice: 'Use "caveat" and "sovereignty" in a formal policy proposal.',
            speak: 'State: "We endorse the framework with the imperative caveat that digital sovereignty remains inviolable."'
          },
          objectives: ['Incorporate legal and diplomatic idioms', 'Express nuanced governance concepts', 'Master high-stakes vocabulary in speech and writing']
        }
      ],
      'Grammar': [
        {
          title: 'Advanced Parallelism & Rhetorical Cadence',
          description: 'Parallel structures, chiasmus, tricolons, and climactic phrasing',
          icon: '🎶',
          duration: '16 min',
          topic: 'Rhetorical Grammar & Cadence',
          content: {
            introduction: 'Rhetorical parallelism creates memorable, rhythmic eloquence found in historic speeches.',
            learn: [
              { word: 'Tricolon (Rule of Three)', meaning: 'Three parallel clauses creating rhythmic power', example: 'We shall fight on the beaches, we shall fight on the landing grounds, we shall fight in the fields.' },
              { word: 'Faulty Parallelism (To Avoid)', meaning: 'Mismatched grammatical structures', example: 'Incorrect: He likes swimming, to run, and cycling. Correct: He likes swimming, running, and cycling.' }
            ],
            listen: {
              text: 'To lead is to listen, to empower is to inspire, and to succeed is to serve.',
              questions: [
                { question: 'What rhetorical device repeats three balanced parallel phrases?', options: ['Oxymoron', 'Tricolon', 'Euphemism'], answer: 1 }
              ]
            },
            practice: 'Craft a tricolon celebrating education, innovation, and courage.',
            speak: 'Deliver a parallel rhetorical crescendo: "For our community, for our future, and for generations to come."'
          },
          objectives: ['Master parallelism across complex sentences', 'Eliminate faulty grammatical imbalances', 'Craft memorable rhetorical climaxes']
        }
      ],
      'Listening': [
        {
          title: 'The Architecture of the Manhattan Project & Quantum Frontiers',
          description: 'A documentary audio analysis of the dawn of atomic physics and ethical dilemmas',
          icon: '⚛️',
          duration: '16 min',
          topic: 'Advanced STEM & Ethics',
          content: {
            introduction: 'Listen to historians and physicists discuss the profound ethical questions of technological power.',
            learn: [
              { word: 'Nuclear Fission', meaning: 'The splitting of an atomic nucleus releasing immense energy', example: 'Fission reactions released unprecedented thermodynamic energy.' },
              { word: 'Ethical Paradigm', meaning: 'A framework for determining moral responsibility', example: 'Scientific breakthroughs require robust ethical paradigms.' }
            ],
            listen: {
              text: 'J. Robert Oppenheimer reflected that the unleashing of atomic energy demonstrated humanity\'s technological power advancing far swifter than its moral and diplomatic consensus.',
              questions: [
                { question: 'What core dilemma was expressed regarding atomic physics?', options: ['It was too cheap', 'Technological power outpaced moral and diplomatic wisdom', 'It produced no heat'], answer: 1 }
              ]
            },
            practice: 'Summarize the ethical responsibility of scientists in emerging fields like AI and bioengineering.',
            speak: 'Deliver a 60-second reflection on balancing innovation with global ethics.'
          },
          objectives: ['Deconstruct complex historical-scientific audio', 'Analyze ethical quandaries in speech', 'Synthesize high-density technical interviews']
        }
      ],
      'Reading': [
        {
          title: 'The Gettysburg Address & The Architecture of Liberty',
          description: 'A line-by-line literary and rhetorical dissection of Abraham Lincoln’s 272-word masterpiece',
          icon: '📜',
          duration: '18 min',
          topic: 'Literary & Historical Masterpiece',
          content: {
            introduction: 'Analyze how 272 concise words redefined democratic governance and human equality forever.',
            learn: [
              { word: 'Consecrate', meaning: 'Declare or make sacred', example: 'We cannot dedicate, we cannot consecrate this ground.' },
              { word: 'Perish', meaning: 'Cease to exist; die', example: 'Government of the people, by the people, for the people, shall not perish from the earth.' }
            ],
            listen: {
              text: 'Four score and seven years ago our fathers brought forth on this continent, a new nation, conceived in Liberty, and dedicated to the proposition that all men are created equal... that government of the people, by the people, for the people, shall not perish from the earth.',
              questions: [
                { question: 'What famous tripartite definition of democracy concludes Lincoln’s address?', options: ['Of the king, by the lord, for the realm', 'Of the people, by the people, for the people', 'Of the army, by the state, for the law'], answer: 1 }
              ]
            },
            practice: 'Analyze the progression of time in the speech: Past (Four score...) -> Present (Now we are engaged...) -> Future (Shall have a new birth...).',
            speak: 'Recite the concluding sentence of the Gettysburg Address with solemn, inspiring cadence.'
          },
          objectives: ['Dissect world-class rhetorical literature', 'Examine structural brevity and emotional depth', 'Internalize foundational democratic rhetoric']
        }
      ]
    }
  }
};

module.exports = { CURRICULUM };
