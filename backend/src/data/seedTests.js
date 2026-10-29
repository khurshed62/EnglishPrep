"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedTests = void 0;
exports.seedTests = [
    // ==========================================
    // READING TESTS (Reading Test 79 to 90)
    // ==========================================
    {
        id: 'reading-79',
        title: 'Reading Test 79',
        skill: 'reading',
        durationMinutes: 60,
        totalQuestions: 40,
        difficulty: 'Medium',
        description: 'Academic Reading test featuring passages on early aeronautics, coral reef degradation, and cognitive biases.',
        sections: [
            {
                id: 'r79-p1',
                title: 'Passage 1: The Dawn of Aviation and Aerodynamic Science',
                passage: `A. The quest for human flight spans centuries of trial, observation, and catastrophic miscalculations. While mythological accounts such as Daedalus and Icarus captured the ancient imagination, it was not until Sir George Cayley's pioneering work in 1799 that aviation began to transition from poetic fantasy to systematic scientific discipline. Cayley identified the four distinct aerodynamic forces that govern flight: lift, weight, thrust, and drag.\n\nB. Cayley's radical departure from previous thinking was separating the mechanism that produces lift from that which produces forward propulsion. Before Cayley, inventors stubbornly attempted to mimic bird flight through flapping-wing machines known as ornithopters. Cayley recognized that flapping wings imposed immense mechanical complexity and structural weakness that human or early steam engines could never overcome.\n\nC. In the late 19th century, Otto Lilienthal took Cayley's theoretical insights into the sky. Known as the 'Glider King', Lilienthal designed and constructed monoplane and biplane hang gliders, completing over 2,000 controlled glides from an artificial hill near Berlin. Lilienthal meticulously documented aerodynamic tables demonstrating that curved or cambered wings generate significantly greater lift than flat surfaces—a discovery that proved vital to all subsequent aeronautical progress.\n\nD. Despite Lilienthal's tragic death during a flight in 1896, his empirical data and published work galvanized Orville and Wilbur Wright in Dayton, Ohio. The Wright brothers realized that while lift and propulsion were solvable through wing camber and lightweight internal combustion engines, the critical unsolved challenge was aerodynamic control. By inventing 3-axis control via wing warping, a steerable rear rudder, and an elevator, the Wright brothers achieved the first powered, controlled, and sustained heavier-than-air human flight at Kitty Hawk in December 1903.`,
                questions: [
                    {
                        id: 'r79-q1',
                        type: 'multiple-choice',
                        question: 'What was Sir George Cayley’s pivotal conceptual breakthrough in aviation?',
                        options: [
                            'A. Developing the first lightweight steam engine for gliders',
                            'B. Separating the mechanism for generating lift from that generating thrust',
                            'C. Inventing the 3-axis steering system for monoplanes',
                            'D. Designing flapping-wing ornithopters that proved flight was possible'
                        ],
                        correctAnswer: 'B',
                        explanation: 'Paragraph B explicitly states that Cayley\'s radical departure was separating the mechanism that produces lift from that which produces forward propulsion.'
                    },
                    {
                        id: 'r79-q2',
                        type: 'true-false-not-given',
                        question: 'Otto Lilienthal proved that flat wings generate superior lift compared to cambered wings.',
                        options: ['TRUE', 'FALSE', 'NOT GIVEN'],
                        correctAnswer: 'FALSE',
                        explanation: 'Paragraph C states Lilienthal demonstrated that curved or cambered wings generate significantly greater lift than flat surfaces.'
                    },
                    {
                        id: 'r79-q3',
                        type: 'fill-blank',
                        question: 'The Wright brothers solved the crucial challenge of aerodynamic flight by inventing a system known as 3-axis ______.',
                        correctAnswer: 'control',
                        explanation: 'Paragraph D states: "The critical unsolved challenge was aerodynamic control. By inventing 3-axis control..."'
                    }
                ]
            },
            {
                id: 'r79-p2',
                title: 'Passage 2: Marine Biodiversity and Coral Bleaching Dynamics',
                passage: `Coral reefs support over 25 percent of all marine species despite covering less than 0.1 percent of the ocean floor. The foundation of this extraordinary biodiversity is the symbiotic mutualism between scleractinian corals and microscopic dinoflagellate algae known as zooxanthellae. Under thermal stress caused by elevated sea surface temperatures, corals expel these symbionts, exposing their white calcium carbonate skeleton in an event known as coral bleaching. Prolonged bleaching impairs coral immune function and frequently causes mass mortality across thousands of kilometers of contiguous reef systems.`,
                questions: [
                    {
                        id: 'r79-q4',
                        type: 'multiple-choice',
                        question: 'What causes the physical appearance of coral bleaching?',
                        options: [
                            'A. Accumulation of calcium carbonate deposits on algae',
                            'B. Expulsion of symbiotic zooxanthellae algae due to elevated temperatures',
                            'C. Bacterial infection targeting only the coral polyps',
                            'D. Rapid reduction in oceanic salinity levels'
                        ],
                        correctAnswer: 'B',
                        explanation: 'The passage explains that under thermal stress, corals expel zooxanthellae, exposing their white skeleton.'
                    }
                ]
            }
        ]
    },
    {
        id: 'reading-80',
        title: 'Reading Test 80',
        skill: 'reading',
        durationMinutes: 60,
        totalQuestions: 40,
        difficulty: 'Medium',
        description: 'Passages detailing renewable energy transitions, Mesopotamian cuneiform, and the psychology of memory.',
        sections: [
            {
                id: 'r80-p1',
                title: 'Passage 1: The Transition to Grid-Scale Renewable Energy',
                passage: `Decarbonizing modern power grids requires addressing the intermittency inherent in solar photovoltaic and wind energy generation. While levelized costs of renewable electricity have plummeted below those of conventional fossil fuels, grid stability demands scalable energy storage solutions including pumped hydroelectric storage, lithium-ion battery arrays, and green hydrogen electrolysis.`,
                questions: [
                    {
                        id: 'r80-q1',
                        type: 'multiple-choice',
                        question: 'What is the primary technical barrier to completely replacing fossil fuels with solar and wind?',
                        options: [
                            'A. The exorbitant cost of producing photovoltaic cells',
                            'B. The intermittent nature of renewable energy generation',
                            'C. Public unwillingness to adopt electric vehicles',
                            'D. Inability to generate alternating current'
                        ],
                        correctAnswer: 'B',
                        explanation: 'The passage highlights addressing the intermittency inherent in solar and wind generation as the core requirement.'
                    }
                ]
            }
        ]
    },
    {
        id: 'reading-81',
        title: 'Reading Test 81',
        skill: 'reading',
        durationMinutes: 60,
        totalQuestions: 40,
        difficulty: 'Hard',
        description: 'Academic texts exploring urban architecture, evolutionary biology of sleep, and hydrothermal vents.',
        sections: [
            {
                id: 'r81-p1',
                title: 'Passage 1: Sustainable Architecture and Biophilic Design',
                passage: `Biophilic design integrates natural light, ventilation, and living flora into urban architectural structures, demonstrably lowering occupant stress markers and reducing energy consumption by up to 35 percent.`,
                questions: [
                    {
                        id: 'r81-q1',
                        type: 'true-false-not-given',
                        question: 'Biophilic architecture focuses exclusively on aesthetic appeal without measurable psychological or energy benefits.',
                        options: ['TRUE', 'FALSE', 'NOT GIVEN'],
                        correctAnswer: 'FALSE',
                        explanation: 'The passage states it demonstrably lowers stress markers and reduces energy consumption by up to 35%.'
                    }
                ]
            }
        ]
    },
    {
        id: 'reading-82',
        title: 'Reading Test 82',
        skill: 'reading',
        durationMinutes: 60,
        totalQuestions: 40,
        difficulty: 'Medium',
        description: 'Passages on Artificial Intelligence in oncology diagnostics, honeybee communication, and the Silk Road.',
        sections: [
            {
                id: 'r82-p1',
                title: 'Passage 1: Deep Learning Models in Diagnostic Radiology',
                passage: `Convolutional neural networks trained on millions of annotated radiological images now match or exceed board-certified radiologists in detecting pulmonary nodules and early-stage melanoma.`,
                questions: [
                    {
                        id: 'r82-q1',
                        type: 'fill-blank',
                        question: 'Convolutional neural networks have achieved diagnostic accuracy comparable to board-certified ______.',
                        correctAnswer: 'radiologists',
                        explanation: 'The passage notes they match or exceed board-certified radiologists.'
                    }
                ]
            }
        ]
    },
    {
        id: 'reading-83',
        title: 'Reading Test 83',
        skill: 'reading',
        durationMinutes: 60,
        totalQuestions: 40,
        difficulty: 'Hard',
        description: 'Exploration of climate adaptation strategies, origins of Sumerian script, and carbon nanomaterials.',
        sections: [
            {
                id: 'r83-p1',
                title: 'Passage 1: The Emergence of Graphene and 2D Materials',
                passage: `Discovered through mechanical exfoliation using adhesive tape in 2004, graphene consists of a single layer of carbon atoms arranged in a two-dimensional hexagonal lattice, possessing extraordinary ballistic electron mobility.`,
                questions: [
                    {
                        id: 'r83-q1',
                        type: 'multiple-choice',
                        question: 'How was graphene first isolated in 2004?',
                        options: [
                            'A. Chemical vapor deposition at 2000 degrees',
                            'B. Mechanical exfoliation using adhesive tape',
                            'C. High-energy laser ablation',
                            'D. Nuclear magnetic resonance'
                        ],
                        correctAnswer: 'B',
                        explanation: 'The text states graphene was discovered through mechanical exfoliation using adhesive tape.'
                    }
                ]
            }
        ]
    },
    {
        id: 'reading-84',
        title: 'Reading Test 84',
        skill: 'reading',
        durationMinutes: 60,
        totalQuestions: 40,
        difficulty: 'Medium',
        description: 'Cellular senescence, interplanetary missions to Mars, and global freshwater desalination technology.',
        sections: [
            {
                id: 'r84-p1',
                title: 'Passage 1: Reverse Osmosis in Global Desalination',
                passage: `Reverse osmosis utilizes semi-permeable polyamide membranes under hydraulic pressure exceeding osmotic pressure to purify seawater into potable water, providing vital water security in arid coastal nations.`,
                questions: [
                    {
                        id: 'r84-q1',
                        type: 'true-false-not-given',
                        question: 'Reverse osmosis relies on membrane technology rather than thermal distillation.',
                        options: ['TRUE', 'FALSE', 'NOT GIVEN'],
                        correctAnswer: 'TRUE',
                        explanation: 'The passage specifies semi-permeable polyamide membranes under pressure.'
                    }
                ]
            }
        ]
    },
    {
        id: 'reading-85',
        title: 'Reading Test 85',
        skill: 'reading',
        durationMinutes: 60,
        totalQuestions: 40,
        difficulty: 'Medium',
        description: 'Cetacean acoustic communication, urban heat islands, and mechanization during the Industrial Revolution.',
        sections: [
            {
                id: 'r85-p1',
                title: 'Passage 1: Acoustic Communication in Humpback Whales',
                passage: `Humpback whale songs exhibit complex hierarchical syntax composed of discrete acoustic units organized into phrases, themes, and extended vocal cycles that evolve culture-wide across migratory ocean basins.`,
                questions: [
                    {
                        id: 'r85-q1',
                        type: 'multiple-choice',
                        question: 'How do humpback whale songs change over time?',
                        options: [
                            'A. They remain genetically fixed and static',
                            'B. They undergo cultural evolution shared across entire ocean populations',
                            'C. Each individual sings an entirely random unrepeated pattern',
                            'D. They are only performed by juvenile females'
                        ],
                        correctAnswer: 'B',
                        explanation: 'The passage notes that extended vocal cycles evolve culture-wide across migratory basins.'
                    }
                ]
            }
        ]
    },
    {
        id: 'reading-86',
        title: 'Reading Test 86',
        skill: 'reading',
        durationMinutes: 60,
        totalQuestions: 40,
        difficulty: 'Hard',
        description: 'Precision agriculture using drones, neuroplasticity and musical training, and glacial retreat in Antarctica.',
        sections: [
            {
                id: 'r86-p1',
                title: 'Passage 1: Neuroplasticity and Musical Expertise',
                passage: `Neuroimaging studies reveal that early musical training enhances the structural volume of the corpus callosum and increases grey matter density in auditory and sensorimotor cortices.`,
                questions: [
                    {
                        id: 'r86-q1',
                        type: 'fill-blank',
                        question: 'Early musical training increases grey matter density in auditory and ______ cortices.',
                        correctAnswer: 'sensorimotor',
                        explanation: 'The passage explicitly mentions sensorimotor cortices.'
                    }
                ]
            }
        ]
    },
    {
        id: 'reading-87',
        title: 'Reading Test 87',
        skill: 'reading',
        durationMinutes: 60,
        totalQuestions: 40,
        difficulty: 'Medium',
        description: 'Episodic memory consolidation during sleep, supervolcano geological impacts, and bilingual language acquisition.',
        sections: [
            {
                id: 'r87-p1',
                title: 'Passage 1: Sleep Spindles and Memory Consolidation',
                passage: `During slow-wave non-REM sleep, synchronized thalamocortical oscillations called sleep spindles facilitate the transfer of recently acquired memories from the temporary hippocampus to the long-term neocortex.`,
                questions: [
                    {
                        id: 'r87-q1',
                        type: 'multiple-choice',
                        question: 'Where are short-term memories transferred to during slow-wave sleep?',
                        options: [
                            'A. The amygdala',
                            'B. The neocortex',
                            'C. The cerebellum',
                            'D. The spinal cord'
                        ],
                        correctAnswer: 'B',
                        explanation: 'The passage states memories are transferred from the temporary hippocampus to the long-term neocortex.'
                    }
                ]
            }
        ]
    },
    {
        id: 'reading-88',
        title: 'Reading Test 88',
        skill: 'reading',
        durationMinutes: 60,
        totalQuestions: 40,
        difficulty: 'Medium',
        description: 'Mycorrhizal fungal networks in temperate forests, blockchain consensus protocols, and deep-sea bioluminescence.',
        sections: [
            {
                id: 'r88-p1',
                title: 'Passage 1: The Wood Wide Web: Mycorrhizal Networks',
                passage: `Underground symbiotic fungal hyphae connect mature 'mother trees' with juvenile saplings, facilitating the active distribution of nitrogen, phosphorus, and defensive biochemical signaling molecules.`,
                questions: [
                    {
                        id: 'r88-q1',
                        type: 'true-false-not-given',
                        question: 'Mycorrhizal networks transmit both nutrients and defensive alarm signals between trees.',
                        options: ['TRUE', 'FALSE', 'NOT GIVEN'],
                        correctAnswer: 'TRUE',
                        explanation: 'The passage mentions the distribution of nutrients and defensive biochemical signaling molecules.'
                    }
                ]
            }
        ]
    },
    {
        id: 'reading-89',
        title: 'Reading Test 89',
        skill: 'reading',
        durationMinutes: 60,
        totalQuestions: 40,
        difficulty: 'Hard',
        description: 'Autonomous vehicle sensor fusion with LiDAR, historical Mercator projections, and CRISPR-Cas9 in agriculture.',
        sections: [
            {
                id: 'r89-p1',
                title: 'Passage 1: Sensor Fusion in Autonomous Vehicles',
                passage: `Autonomous driving systems deploy sensor fusion algorithms that combine complementary data streams: LiDAR provides high-precision 3D point clouds, radar operates reliably in fog and rain, while cameras recognize signs and lane markings.`,
                questions: [
                    {
                        id: 'r89-q1',
                        type: 'multiple-choice',
                        question: 'Why do autonomous navigation systems avoid relying on cameras alone?',
                        options: [
                            'A. Cameras cannot process color imagery',
                            'B. Different sensors offer complementary strengths in adverse weather and distance measurement',
                            'C. LiDAR is significantly cheaper than digital camera sensors',
                            'D. Radar cannot detect metal vehicles'
                        ],
                        correctAnswer: 'B',
                        explanation: 'The text highlights complementary data streams where radar operates in fog and LiDAR provides 3D point clouds.'
                    }
                ]
            }
        ]
    },
    {
        id: 'reading-90',
        title: 'Reading Test 90',
        skill: 'reading',
        durationMinutes: 60,
        totalQuestions: 40,
        difficulty: 'Hard',
        description: 'Superconducting qubits and quantum error correction, digital sociology, and chemosynthetic ecosystems.',
        sections: [
            {
                id: 'r90-p1',
                title: 'Passage 1: Quantum Supremacy and Fault-Tolerant Computation',
                passage: `Quantum computers exploit superposition and quantum entanglement to process complex combinatorial problems exponentially faster than classical supercomputers, though maintaining qubit coherence requires near absolute-zero dilution refrigeration.`,
                questions: [
                    {
                        id: 'r90-q1',
                        type: 'fill-blank',
                        question: 'Maintaining quantum coherence requires chilling qubits to temperatures near absolute ______.',
                        correctAnswer: 'zero',
                        explanation: 'The passage states maintaining coherence requires near absolute-zero dilution refrigeration.'
                    }
                ]
            }
        ]
    },
    // ==========================================
    // LISTENING TESTS (Listening Test 79 to 90)
    // ==========================================
    {
        id: 'listening-79',
        title: 'Listening Test 79',
        skill: 'listening',
        durationMinutes: 30,
        totalQuestions: 40,
        difficulty: 'Medium',
        description: 'IELTS Listening test covering rental apartment inquiries, regional community arts festival, and environmental science lecture.',
        sections: [
            {
                id: 'l79-s1',
                title: 'Section 1: Accommodation Booking and Tenancy Agreement',
                instructions: 'Complete the notes below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.',
                passage: `Agent: "Good morning, Bayview Properties. How can I help you today?"\nCaller: "Hello, I am calling regarding the two-bedroom apartment advertised on Parkside Road."\nAgent: "Certainly. That property is currently available from the 1st of November. The monthly rent is £850, which includes the water utility."`,
                questions: [
                    {
                        id: 'l79-q1',
                        type: 'fill-blank',
                        question: 'Apartment is available from the 1st of ______.',
                        correctAnswer: 'November',
                        explanation: 'Agent states: "That property is currently available from the 1st of November."'
                    },
                    {
                        id: 'l79-q2',
                        type: 'fill-blank',
                        question: 'Monthly rental price is £______ including water.',
                        correctAnswer: '850',
                        explanation: 'Agent states: "The monthly rent is £850, which includes the water utility."'
                    }
                ]
            },
            {
                id: 'l79-s2',
                title: 'Section 2: City Library Orientation and Digital Archives',
                instructions: 'Choose the correct letter, A, B, or C.',
                questions: [
                    {
                        id: 'l79-q3',
                        type: 'multiple-choice',
                        question: 'What is the main requirement for access to the Rare Manuscripts Room?',
                        options: [
                            'A. An annual subscription fee of £20',
                            'B. Written recommendation from an academic tutor',
                            'C. A student ID card and photo identification'
                        ],
                        correctAnswer: 'B',
                        explanation: 'Librarian emphasizes that rare documents require an academic tutor reference.'
                    }
                ]
            }
        ]
    },
    {
        id: 'listening-80',
        title: 'Listening Test 80',
        skill: 'listening',
        durationMinutes: 30,
        totalQuestions: 40,
        difficulty: 'Medium',
        description: 'Sports complex membership, wildlife sanctuary tour, and university tutorial on ancient agriculture.',
        sections: [
            {
                id: 'l80-s1',
                title: 'Section 1: Sports Center Membership Application',
                instructions: 'Complete the form below. Write NO MORE THAN TWO WORDS for each answer.',
                questions: [
                    {
                        id: 'l80-q1',
                        type: 'fill-blank',
                        question: 'Membership Tier chosen: ______ package.',
                        correctAnswer: 'Gold',
                        explanation: 'The applicant registers for the comprehensive Gold membership package.'
                    }
                ]
            }
        ]
    },
    {
        id: 'listening-81',
        title: 'Listening Test 81',
        skill: 'listening',
        durationMinutes: 30,
        totalQuestions: 40,
        difficulty: 'Medium',
        description: 'Job interview preparation service, botanical gardens map guidance, and renewable energy research presentation.',
        sections: [
            {
                id: 'l81-s1',
                title: 'Section 1: Career Advisory Consultation',
                instructions: 'Answer the question with the correct letter A, B, or C.',
                questions: [
                    {
                        id: 'l81-q1',
                        type: 'multiple-choice',
                        question: 'When is the CV optimization workshop held?',
                        options: ['A. Tuesday morning', 'B. Thursday evening', 'C. Saturday afternoon'],
                        correctAnswer: 'B',
                        explanation: 'The advisor states the resume session is held every Thursday evening at 6 PM.'
                    }
                ]
            }
        ]
    },
    {
        id: 'listening-82',
        title: 'Listening Test 82',
        skill: 'listening',
        durationMinutes: 30,
        totalQuestions: 40,
        difficulty: 'Hard',
        description: 'Conference hotel registration, maritime history exhibition, and geology lecture on plate tectonics.',
        sections: [
            {
                id: 'l82-s1',
                title: 'Section 4: Academic Lecture on Mantle Plumes and Hotspots',
                instructions: 'Complete the summary with ONE WORD ONLY.',
                questions: [
                    {
                        id: 'l82-q1',
                        type: 'fill-blank',
                        question: 'Volcanic island chains are formed as tectonic plates migrate across a stationary mantle ______.',
                        correctAnswer: 'plume',
                        explanation: 'The professor explains that island chains trace the movement of plates across a thermal mantle plume.'
                    }
                ]
            }
        ]
    },
    {
        id: 'listening-83',
        title: 'Listening Test 83',
        skill: 'listening',
        durationMinutes: 30,
        totalQuestions: 40,
        difficulty: 'Medium',
        description: 'Bicycle repair shop service quote, town heritage trail walking guide, and sociology seminar on urbanization.',
        sections: [
            {
                id: 'l83-s1',
                title: 'Section 1: Cycling Workshop Work Order',
                questions: [
                    {
                        id: 'l83-q1',
                        type: 'fill-blank',
                        question: 'Customer requested replacement of hydraulic ______ pads.',
                        correctAnswer: 'brake',
                        explanation: 'The customer specifically requests inspection and replacement of worn brake pads.'
                    }
                ]
            }
        ]
    },
    {
        id: 'listening-84',
        title: 'Listening Test 84',
        skill: 'listening',
        durationMinutes: 30,
        totalQuestions: 40,
        difficulty: 'Medium',
        description: 'Language exchange club enrollment, science museum planetarium show, and psychology lecture on circadian rhythms.',
        sections: [
            {
                id: 'l84-s1',
                title: 'Section 4: Circadian Rhythm and Melatonin Regulation',
                questions: [
                    {
                        id: 'l84-q1',
                        type: 'multiple-choice',
                        question: 'What type of photoreceptor cells primarily synchronize the suprachiasmatic nucleus?',
                        options: [
                            'A. Retinal ganglion cells sensitive to blue light',
                            'B. Traditional rod cells for monochrome night vision',
                            'C. Red-sensitive cone cells in the fovea'
                        ],
                        correctAnswer: 'A',
                        explanation: 'The lecturer notes intrinsically photosensitive retinal ganglion cells respond to blue wavelength light.'
                    }
                ]
            }
        ]
    },
    {
        id: 'listening-85',
        title: 'Listening Test 85',
        skill: 'listening',
        durationMinutes: 30,
        totalQuestions: 40,
        difficulty: 'Hard',
        description: 'Travel insurance inquiry, volunteer conservation project briefing, and lecture on architectural acoustic design.',
        sections: [
            {
                id: 'l85-s1',
                title: 'Section 1: Comprehensive Travel Insurance Policy',
                questions: [
                    {
                        id: 'l85-q1',
                        type: 'fill-blank',
                        question: 'Maximum emergency medical coverage limit is $______ million.',
                        correctAnswer: '5',
                        explanation: 'The insurance representative confirms the comprehensive plan covers up to 5 million dollars.'
                    }
                ]
            }
        ]
    },
    {
        id: 'listening-86',
        title: 'Listening Test 86',
        skill: 'listening',
        durationMinutes: 30,
        totalQuestions: 40,
        difficulty: 'Medium',
        description: 'Community gardening project, national park trail safety guidelines, and historical linguistics podcast.',
        sections: [
            {
                id: 'l86-s1',
                title: 'Section 2: Mountain Trail Safety and Weather Precautions',
                questions: [
                    {
                        id: 'l86-q1',
                        type: 'true-false-not-given',
                        question: 'Hikers are advised to begin descent no later than 3:00 PM during autumn.',
                        options: ['TRUE', 'FALSE', 'NOT GIVEN'],
                        correctAnswer: 'TRUE',
                        explanation: 'The ranger instructs all groups to begin their return before 3:00 PM.'
                    }
                ]
            }
        ]
    },
    {
        id: 'listening-87',
        title: 'Listening Test 87',
        skill: 'listening',
        durationMinutes: 30,
        totalQuestions: 40,
        difficulty: 'Hard',
        description: 'Student accommodation survey, wildlife corridor initiatives, and industrial robotics automated assembly.',
        sections: [
            {
                id: 'l87-s1',
                title: 'Section 3: Engineering Students Discussing Robocup Autonomous Navigation',
                questions: [
                    {
                        id: 'l87-q1',
                        type: 'multiple-choice',
                        question: 'What issue do the students report with their ultrasonic rangefinders?',
                        options: [
                            'A. False readings due to acoustic reflections at acute angles',
                            'B. Excessive power consumption draining battery in 10 minutes',
                            'C. Complete incompatibility with the central microcontroller'
                        ],
                        correctAnswer: 'A',
                        explanation: 'The student explains ultrasonic pulses reflected obliquely off smooth acrylic barriers.'
                    }
                ]
            }
        ]
    },
    {
        id: 'listening-88',
        title: 'Listening Test 88',
        skill: 'listening',
        durationMinutes: 30,
        totalQuestions: 40,
        difficulty: 'Medium',
        description: 'Music academy instrumental lesson signup, local radio report on recycling plant, and astrophysics lecture on exoplanets.',
        sections: [
            {
                id: 'l88-s1',
                title: 'Section 4: Detecting Exoplanets via the Transit Photometry Method',
                questions: [
                    {
                        id: 'l88-q1',
                        type: 'fill-blank',
                        question: 'Transit photometry measures the periodic dip in a star\'s ______ as a planet orbits in front.',
                        correctAnswer: 'brightness',
                        explanation: 'The lecturer defines transit photometry as measuring the decrease in stellar brightness.'
                    }
                ]
            }
        ]
    },
    {
        id: 'listening-89',
        title: 'Listening Test 89',
        skill: 'listening',
        durationMinutes: 30,
        totalQuestions: 40,
        difficulty: 'Hard',
        description: 'Art gallery docent program interview, harbor ferry schedule update, and cognitive psychology lecture on decision fatigue.',
        sections: [
            {
                id: 'l89-s1',
                title: 'Section 4: Decision Fatigue and Executive Function Depletion',
                questions: [
                    {
                        id: 'l89-q1',
                        type: 'multiple-choice',
                        question: 'How does decision fatigue impact judicial parole determinations according to referenced studies?',
                        options: [
                            'A. Judges become lenient and grant parole more frequently towards evening',
                            'B. Judges default to the status quo and deny parole significantly more often later in sessions',
                            'C. Judicial rulings show zero correlation with session timing'
                        ],
                        correctAnswer: 'B',
                        explanation: 'The lecture highlights that depleted mental reserves cause judges to default to safe denial decisions.'
                    }
                ]
            }
        ]
    },
    {
        id: 'listening-90',
        title: 'Listening Test 90',
        skill: 'listening',
        durationMinutes: 30,
        totalQuestions: 40,
        difficulty: 'Hard',
        description: 'Doctoral research funding proposal, wetland restoration initiative, and archaeology lecture on Gobekli Tepe.',
        sections: [
            {
                id: 'l90-s1',
                title: 'Section 4: Monumental Architecture at Göbekli Tepe',
                questions: [
                    {
                        id: 'l90-q1',
                        type: 'fill-blank',
                        question: 'T-shaped limestone pillars at the site depict bas-relief carvings of wild ______.',
                        correctAnswer: 'animals',
                        explanation: 'The archaeologist describes intricate carvings of wild animals including foxes, boars, and vultures.'
                    }
                ]
            }
        ]
    },
    // ==========================================
    // WRITING TESTS (Writing Test 79 to 90)
    // ==========================================
    {
        id: 'writing-79',
        title: 'Writing Test 79',
        skill: 'writing',
        durationMinutes: 60,
        totalQuestions: 2,
        difficulty: 'Medium',
        description: 'Academic Task 1: Comparative bar chart of renewable electricity production. Task 2: AI impact on creative arts and authorship.',
        sections: [
            {
                id: 'w79-t1',
                title: 'Task 1: Academic Report (Minimum 150 words)',
                instructions: 'You should spend about 20 minutes on this task. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
                passage: `The bar chart illustrates the percentage of national electricity generated from renewable sources (hydroelectric, wind, and solar) across five European nations (Norway, Germany, Spain, United Kingdom, and Poland) in 2010 and 2022.`,
                questions: [
                    {
                        id: 'w79-q1',
                        type: 'essay',
                        question: 'Summarise the chart comparing renewable electricity generation across 5 European countries between 2010 and 2022.',
                        explanation: 'Band 9 criteria: Overview stating general upward trajectory across all countries with Norway leading and Poland showing smallest proportion; accurate data comparisons; cohesive linkers.'
                    }
                ]
            },
            {
                id: 'w79-t2',
                title: 'Task 2: Discursive Essay (Minimum 250 words)',
                instructions: 'You should spend about 40 minutes on this task. Give reasons for your answer and include any relevant examples from your own knowledge or experience.',
                passage: `Some people believe that artificial intelligence tools will soon replace human artists, writers, and musicians. Others argue that AI can never replicate the genuine emotional depth of human creative expression. Discuss both views and give your own opinion.`,
                questions: [
                    {
                        id: 'w79-q2',
                        type: 'essay',
                        question: 'Discuss both views on whether AI will replace human artists or whether true emotional creativity is unique to humans, and give your own opinion.',
                        explanation: 'Band 9 response: Clear thesis statement, well-developed body paragraphs examining automated technical mimicry vs lived human emotional experience, nuanced conclusion.'
                    }
                ]
            }
        ]
    },
    {
        id: 'writing-80',
        title: 'Writing Test 80',
        skill: 'writing',
        durationMinutes: 60,
        totalQuestions: 2,
        difficulty: 'Medium',
        description: 'Task 1: Line graph on global urbanization trends. Task 2: Should universities prioritize vocational job skills over theoretical knowledge?',
        sections: [
            {
                id: 'w80-t1',
                title: 'Task 1: Global Urbanization Trends (1970–2030)',
                questions: [
                    {
                        id: 'w80-q1',
                        type: 'essay',
                        question: 'Describe the line graph illustrating urban population percentages across North America, Latin America, Europe, and Asia from 1970 to projected 2030.'
                    }
                ]
            },
            {
                id: 'w80-t2',
                title: 'Task 2: Vocational vs Theoretical University Education',
                questions: [
                    {
                        id: 'w80-q2',
                        type: 'essay',
                        question: 'Many employers state that university graduates lack practical workplace skills. Should higher education focus purely on vocational training? Discuss your view.'
                    }
                ]
            }
        ]
    },
    {
        id: 'writing-81',
        title: 'Writing Test 81',
        skill: 'writing',
        durationMinutes: 60,
        totalQuestions: 2,
        difficulty: 'Hard',
        description: 'Task 1: Industrial flow diagram showing recycled paper manufacturing. Task 2: Government taxation on ultra-processed foods.',
        sections: [
            {
                id: 'w81-t1',
                title: 'Task 1: Recycled Paper Manufacturing Process',
                questions: [
                    {
                        id: 'w81-q1',
                        type: 'essay',
                        question: 'Describe the multi-stage industrial process of collecting, de-inking, pulping, bleaching, and rolling recycled paper products.'
                    }
                ]
            },
            {
                id: 'w81-t2',
                title: 'Task 2: Public Health and Taxation on Sugary Foods',
                questions: [
                    {
                        id: 'w81-q2',
                        type: 'essay',
                        question: 'To what extent do you agree or disagree that governments should impose high taxes on sugary beverages and ultra-processed junk food?'
                    }
                ]
            }
        ]
    },
    {
        id: 'writing-82',
        title: 'Writing Test 82',
        skill: 'writing',
        durationMinutes: 60,
        totalQuestions: 2,
        difficulty: 'Medium',
        description: 'Task 1: Map comparison of a town harbor redevelopment. Task 2: Compulsory remote teleworking benefits vs social isolation.',
        sections: [
            {
                id: 'w82-t1',
                title: 'Task 1: Harbor Waterfront Redevelopment Map (2000 vs Present)',
                questions: [
                    {
                        id: 'w82-q1',
                        type: 'essay',
                        question: 'Summarize the commercial and residential alterations to South Haven Port between 2000 and the present day.'
                    }
                ]
            },
            {
                id: 'w82-t2',
                title: 'Task 2: Remote Work vs Traditional In-Office Collaboration',
                questions: [
                    {
                        id: 'w82-q2',
                        type: 'essay',
                        question: 'Do the advantages of widespread remote working outweigh its disadvantages for workers and organizations? Provide reasons and examples.'
                    }
                ]
            }
        ]
    },
    {
        id: 'writing-83',
        title: 'Writing Test 83',
        skill: 'writing',
        durationMinutes: 60,
        totalQuestions: 2,
        difficulty: 'Hard',
        description: 'Task 1: Pie charts of municipal water consumption. Task 2: Space exploration expenditure vs Earth environmental remediation.',
        sections: [
            {
                id: 'w83-t1',
                title: 'Task 1: Sectoral Water Consumption in 3 Continents',
                questions: [
                    {
                        id: 'w83-q1',
                        type: 'essay',
                        question: 'Compare water utilization percentages across agricultural, industrial, and domestic sectors in Asia, Europe, and North America.'
                    }
                ]
            },
            {
                id: 'w83-t2',
                title: 'Task 2: Space Exploration Funding vs Terrestrial Conservation',
                questions: [
                    {
                        id: 'w83-q2',
                        type: 'essay',
                        question: 'Billions of dollars are expended annually on planetary space exploration. Should these fiscal resources be reallocated to solve poverty and climate change?'
                    }
                ]
            }
        ]
    },
    {
        id: 'writing-84',
        title: 'Writing Test 84',
        skill: 'writing',
        durationMinutes: 60,
        totalQuestions: 2,
        difficulty: 'Medium',
        description: 'Task 1: Table comparing adult literacy and schooling years across 6 nations. Task 2: Universal Basic Income.',
        sections: [
            {
                id: 'w84-t1',
                title: 'Task 1: Educational Metrics Across Six Developed Nations',
                questions: [
                    {
                        id: 'w84-q1',
                        type: 'essay',
                        question: 'Summarise the data from the table comparing mandatory schooling duration and tertiary degree completion rates.'
                    }
                ]
            },
            {
                id: 'w84-t2',
                title: 'Task 2: Universal Basic Income and Automation',
                questions: [
                    {
                        id: 'w84-q2',
                        type: 'essay',
                        question: 'As automation disrupts workforce stability, some economists suggest implementing a Universal Basic Income. Evaluate the pros and cons.'
                    }
                ]
            }
        ]
    },
    {
        id: 'writing-85',
        title: 'Writing Test 85',
        skill: 'writing',
        durationMinutes: 60,
        totalQuestions: 2,
        difficulty: 'Medium',
        description: 'Task 1: Double line graphs of public transit ridership. Task 2: Impact of social media on teenage mental health.',
        sections: [
            {
                id: 'w85-t1',
                title: 'Task 1: Bus and Metro Passenger Volumes (2015–2023)',
                questions: [
                    {
                        id: 'w85-q1',
                        type: 'essay',
                        question: 'Analyze changes in daily passenger ridership across bus, light rail, and subway networks over an eight-year period.'
                    }
                ]
            },
            {
                id: 'w85-t2',
                title: 'Task 2: Social Media Age Restrictions and Adolescent Well-being',
                questions: [
                    {
                        id: 'w85-q2',
                        type: 'essay',
                        question: 'Some advocate banning social media access for individuals under sixteen years of age. To what extent do you agree or disagree?'
                    }
                ]
            }
        ]
    },
    {
        id: 'writing-86',
        title: 'Writing Test 86',
        skill: 'writing',
        durationMinutes: 60,
        totalQuestions: 2,
        difficulty: 'Hard',
        description: 'Task 1: Life cycle diagram of the Atlantic Salmon. Task 2: Preservation of endangered indigenous minority languages.',
        sections: [
            {
                id: 'w86-t1',
                title: 'Task 1: Biological Life Cycle of the Atlantic Salmon',
                questions: [
                    {
                        id: 'w86-q1',
                        type: 'essay',
                        question: 'Summarize the developmental stages of the Atlantic salmon from freshwater spawning grounds to open ocean migration and maturity.'
                    }
                ]
            },
            {
                id: 'w86-t2',
                title: 'Task 2: Should Governments Subsidize Endangered Languages?',
                questions: [
                    {
                        id: 'w86-q2',
                        type: 'essay',
                        question: 'Is it justifiable for governments to spend public revenues revitalizing minority languages spoken by few citizens? Discuss both viewpoints.'
                    }
                ]
            }
        ]
    },
    {
        id: 'writing-87',
        title: 'Writing Test 87',
        skill: 'writing',
        durationMinutes: 60,
        totalQuestions: 2,
        difficulty: 'Medium',
        description: 'Task 1: Bar chart of international tourism expenditures. Task 2: Plastic packaging reduction vs consumer convenience.',
        sections: [
            {
                id: 'w87-t1',
                title: 'Task 1: Inbound Tourism Expenditure (2018–2022)',
                questions: [
                    {
                        id: 'w87-q1',
                        type: 'essay',
                        question: 'Compare outbound international holiday expenditures by travelers from four major countries.'
                    }
                ]
            },
            {
                id: 'w87-t2',
                title: 'Task 2: Complete Prohibition of Single-Use Plastics',
                questions: [
                    {
                        id: 'w87-q2',
                        type: 'essay',
                        question: 'Should manufacturing companies be legally liable for the recycling and disposal of all single-use plastics they produce? Argue your case.'
                    }
                ]
            }
        ]
    },
    {
        id: 'writing-88',
        title: 'Writing Test 88',
        skill: 'writing',
        durationMinutes: 60,
        totalQuestions: 2,
        difficulty: 'Hard',
        description: 'Task 1: Two pie charts of primary energy consumption by fuel. Task 2: High salaries of professional athletes and entertainers.',
        sections: [
            {
                id: 'w88-t1',
                title: 'Task 1: Primary Energy Mix (1995 vs 2025 Projected)',
                questions: [
                    {
                        id: 'w88-q1',
                        type: 'essay',
                        question: 'Contrast the proportional contributions of coal, oil, natural gas, nuclear, and renewables to global power generation.'
                    }
                ]
            },
            {
                id: 'w88-t2',
                title: 'Task 2: Disproportionate Incomes in Sports and Entertainment',
                questions: [
                    {
                        id: 'w88-q2',
                        type: 'essay',
                        question: 'Professional sports figures earn vastly higher incomes than doctors, nurses, and teachers. Is this pay disparity justified or socially detrimental?'
                    }
                ]
            }
        ]
    },
    {
        id: 'writing-89',
        title: 'Writing Test 89',
        skill: 'writing',
        durationMinutes: 60,
        totalQuestions: 2,
        difficulty: 'Medium',
        description: 'Task 1: Map transformation of an abandoned railway corridor into a linear park. Task 2: Fast fashion and consumerism.',
        sections: [
            {
                id: 'w89-t1',
                title: 'Task 1: Urban Green Corridor Conversion',
                questions: [
                    {
                        id: 'w89-q1',
                        type: 'essay',
                        question: 'Describe how the decommissioned central railway line was transformed into an ecological pedestrian walkway and bicycle trail.'
                    }
                ]
            },
            {
                id: 'w89-t2',
                title: 'Task 2: Fast Fashion and Environmental Degradation',
                questions: [
                    {
                        id: 'w89-q2',
                        type: 'essay',
                        question: 'The rapid cycle of affordable fast fashion encourages excessive purchasing and landfill waste. What measures can be taken to counter this trend?'
                    }
                ]
            }
        ]
    },
    {
        id: 'writing-90',
        title: 'Writing Test 90',
        skill: 'writing',
        durationMinutes: 60,
        totalQuestions: 2,
        difficulty: 'Hard',
        description: 'Task 1: Multi-bar chart of greenhouse gas emissions per capita. Task 2: Genetic modification and bioethical regulation.',
        sections: [
            {
                id: 'w90-t1',
                title: 'Task 1: Greenhouse Gas Emissions per Capita Across Industrial Sectors',
                questions: [
                    {
                        id: 'w90-q1',
                        type: 'essay',
                        question: 'Compare emissions per person originating from transportation, heavy industry, power generation, and residential heating.'
                    }
                ]
            },
            {
                id: 'w90-t2',
                title: 'Task 2: Genetic Engineering in Human Health and Ethics',
                questions: [
                    {
                        id: 'w90-q2',
                        type: 'essay',
                        question: 'Recent breakthroughs in gene editing make eradicating hereditary diseases feasible, but critics fear genetic enhancement inequality. Discuss both sides and conclude.'
                    }
                ]
            }
        ]
    },
    // ==========================================
    // SPEAKING TESTS (Speaking Test 79 to 90)
    // ==========================================
    {
        id: 'speaking-79',
        title: 'Speaking Test 79',
        skill: 'speaking',
        durationMinutes: 14,
        totalQuestions: 3,
        difficulty: 'Medium',
        description: 'Speaking interview: Part 1 Hometown & Daily Routine, Part 2 Memorable Public Speech, Part 3 Rhetoric & Public Influence.',
        sections: [
            {
                id: 's79-p1',
                title: 'Part 1: Introduction and Interview (4–5 minutes)',
                instructions: 'The examiner will introduce themselves and ask general questions on familiar topics.',
                questions: [
                    {
                        id: 's79-q1',
                        type: 'speaking',
                        question: 'Let’s talk about your hometown. What is the most scenic or interesting part of where you grew up?',
                        explanation: 'Focus on varied adjectives, fluent compound sentences, and personal reflection.'
                    },
                    {
                        id: 's79-q2',
                        type: 'speaking',
                        question: 'Do you prefer planning your daily schedule strictly, or being spontaneous?',
                        explanation: 'Use contrastive discourse markers like "Whereas", "On the other hand", "It depends on whether..."'
                    }
                ]
            },
            {
                id: 's79-p2',
                title: 'Part 2: Individual Long Turn (3–4 minutes with 1-min prep)',
                instructions: 'You will have 1 minute to prepare your notes. Then speak for 1 to 2 minutes on the cue card topic.',
                passage: `Describe a memorable speech or lecture that you attended or listened to online.\nYou should say:\n- Who delivered the speech\n- Where and when you heard it\n- What the speaker talked about\nand explain why this speech left such a lasting impression on you.`,
                questions: [
                    {
                        id: 's79-q3',
                        type: 'speaking',
                        question: 'Describe a memorable speech or lecture you attended or watched online.',
                        explanation: 'Structure: Introduction (who/context) -> Main themes -> Delivery style -> Personal impact and legacy.'
                    }
                ]
            },
            {
                id: 's79-p3',
                title: 'Part 3: Two-way Discussion (4–5 minutes)',
                instructions: 'The examiner asks analytical, abstract questions linked to the Part 2 theme.',
                questions: [
                    {
                        id: 's79-q4',
                        type: 'speaking',
                        question: 'What qualities distinguish an exceptionally persuasive public speaker from an ordinary presenter?',
                        explanation: 'High scoring candidates discuss ethos, emotional connection, tonal cadence, and clarity of vision.'
                    },
                    {
                        id: 's79-q5',
                        type: 'speaking',
                        question: 'Do you believe oratory skills are inborn talents, or can they be methodically trained in schools?',
                        explanation: 'Evaluate both viewpoints using hypothetical structures and real-world debate examples.'
                    }
                ]
            }
        ]
    },
    {
        id: 'speaking-80',
        title: 'Speaking Test 80',
        skill: 'speaking',
        durationMinutes: 14,
        totalQuestions: 3,
        difficulty: 'Medium',
        description: 'Part 1 Technology & Communication, Part 2 A Historical Monument, Part 3 Cultural Heritage Preservation.',
        sections: [
            {
                id: 's80-p1',
                title: 'Part 1: Communication and Messaging Apps',
                questions: [
                    {
                        id: 's80-q1',
                        type: 'speaking',
                        question: 'How has the way you communicate with close friends changed compared to five years ago?'
                    }
                ]
            },
            {
                id: 's80-p2',
                title: 'Part 2: Cue Card: An Ancient or Historical Monument',
                passage: `Describe a historical monument or architectural building you visited.\nYou should say:\n- Where it is located\n- What it looks like\n- Its historical background\nand explain what feelings you experienced when visiting it.`,
                questions: [
                    {
                        id: 's80-q2',
                        type: 'speaking',
                        question: 'Deliver a 2-minute description of an ancient or historical monument you have visited.'
                    }
                ]
            },
            {
                id: 's80-p3',
                title: 'Part 3: Discussion: Heritage Conservation vs Urban Expansion',
                questions: [
                    {
                        id: 's80-q3',
                        type: 'speaking',
                        question: 'Should developing cities demolish older colonial buildings to construct high-density modern housing?'
                    }
                ]
            }
        ]
    },
    {
        id: 'speaking-81',
        title: 'Speaking Test 81',
        skill: 'speaking',
        durationMinutes: 14,
        totalQuestions: 3,
        difficulty: 'Medium',
        description: 'Part 1 Hobbies & Outdoor Activities, Part 2 An Environmental Initiative, Part 3 Global Ecological Responsibility.',
        sections: [
            {
                id: 's81-p1',
                title: 'Part 1: Nature and Outdoor Recreation',
                questions: [
                    {
                        id: 's81-q1',
                        type: 'speaking',
                        question: 'Do you spend much time in parks or natural reserves? Why or why not?'
                    }
                ]
            },
            {
                id: 's81-p2',
                title: 'Part 2: Cue Card: A Meaningful Environmental Project',
                passage: `Describe an environmental program or green initiative you know of.\nYou should say:\n- What the project aims to do\n- How it is organized\n- Who participates in it\nand explain why you believe it is effective.`,
                questions: [
                    {
                        id: 's81-q2',
                        type: 'speaking',
                        question: 'Speak for 2 minutes describing an environmental initiative you respect.'
                    }
                ]
            },
            {
                id: 's81-p3',
                title: 'Part 3: Discussion: International Environmental Treaties',
                questions: [
                    {
                        id: 's81-q3',
                        type: 'speaking',
                        question: 'Why do multinational environmental agreements often encounter enforcement difficulties?'
                    }
                ]
            }
        ]
    },
    {
        id: 'speaking-82',
        title: 'Speaking Test 82',
        skill: 'speaking',
        durationMinutes: 14,
        totalQuestions: 3,
        difficulty: 'Medium',
        description: 'Part 1 Reading habits & Digital Books, Part 2 A Difficult Decision You Made, Part 3 Decision-Making Psychology.',
        sections: [
            {
                id: 's82-p1',
                title: 'Part 1: Reading Preferences and e-Books',
                questions: [
                    {
                        id: 's82-q1',
                        type: 'speaking',
                        question: 'Do you read more physical paperback books or digital e-readers on smartphones?'
                    }
                ]
            },
            {
                id: 's82-p2',
                title: 'Part 2: Cue Card: A Crucial Decision',
                passage: `Describe a challenging decision that took you a long time to make.\nYou should say:\n- What the decision was\n- What different choices you had\n- Why it was so difficult\nand explain whether the outcome turned out to be successful.`,
                questions: [
                    {
                        id: 's82-q2',
                        type: 'speaking',
                        question: 'Speak for 2 minutes on a crucial decision you made.'
                    }
                ]
            },
            {
                id: 's82-p3',
                title: 'Part 3: Discussion: Intuition vs Logical Analysis',
                questions: [
                    {
                        id: 's82-q3',
                        type: 'speaking',
                        question: 'Under what circumstances should people trust their intuitive gut feeling over rigorous data analysis?'
                    }
                ]
            }
        ]
    },
    {
        id: 'speaking-83',
        title: 'Speaking Test 83',
        skill: 'speaking',
        durationMinutes: 14,
        totalQuestions: 3,
        difficulty: 'Hard',
        description: 'Part 1 Art & Galleries, Part 2 A Science Experiment or Project, Part 3 Scientific Education & Ethics.',
        sections: [
            {
                id: 's83-p1',
                title: 'Part 1: Visual Arts and Exhibitions',
                questions: [
                    {
                        id: 's83-q1',
                        type: 'speaking',
                        question: 'How often do you visit art exhibitions, and what art style resonates most with you?'
                    }
                ]
            },
            {
                id: 's83-p2',
                title: 'Part 2: Cue Card: A Fascinating Science Project',
                passage: `Describe a science project or experiment you conducted or learned about.\nYou should say:\n- What the scientific question was\n- What apparatus or methods were used\n- What the results demonstrated\nand explain why you found this investigation fascinating.`,
                questions: [
                    {
                        id: 's83-q2',
                        type: 'speaking',
                        question: 'Speak for 2 minutes about an engaging scientific project or discovery.'
                    }
                ]
            },
            {
                id: 's83-p3',
                title: 'Part 3: Discussion: Scientific Literacy in Society',
                questions: [
                    {
                        id: 's83-q3',
                        type: 'speaking',
                        question: 'How can primary education make complex scientific principles intuitive and engaging for children?'
                    }
                ]
            }
        ]
    },
    {
        id: 'speaking-84',
        title: 'Speaking Test 84',
        skill: 'speaking',
        durationMinutes: 14,
        totalQuestions: 3,
        difficulty: 'Medium',
        description: 'Part 1 Music & Concerts, Part 2 A Skill You Learned Online, Part 3 Self-Directed Learning & MOOCs.',
        sections: [
            {
                id: 's84-p1',
                title: 'Part 1: Musical Tastes',
                questions: [
                    {
                        id: 's84-q1',
                        type: 'speaking',
                        question: 'What genre of music do you listen to when you need to concentrate or study?'
                    }
                ]
            },
            {
                id: 's84-p2',
                title: 'Part 2: Cue Card: A Practical Skill Mastered Online',
                passage: `Describe a skill you learned using internet tutorials or video courses.\nYou should say:\n- What the skill is\n- How you discovered the resources\n- How much practice it required\nand explain how possessing this skill has helped you.`,
                questions: [
                    {
                        id: 's84-q2',
                        type: 'speaking',
                        question: 'Speak for 2 minutes on an autodidactic skill mastered online.'
                    }
                ]
            },
            {
                id: 's84-p3',
                title: 'Part 3: Discussion: The Future of Formal Degrees',
                questions: [
                    {
                        id: 's84-q3',
                        type: 'speaking',
                        question: 'Will online certifications and micro-credentials ever fully supersede standard four-year university degrees?'
                    }
                ]
            }
        ]
    },
    {
        id: 'speaking-85',
        title: 'Speaking Test 85',
        skill: 'speaking',
        durationMinutes: 14,
        totalQuestions: 3,
        difficulty: 'Medium',
        description: 'Part 1 Food & Cooking Habits, Part 2 An Inspiring Leader or Mentor, Part 3 Leadership Styles in Modern Workplaces.',
        sections: [
            {
                id: 's85-p1',
                title: 'Part 1: Cooking and Cuisine',
                questions: [
                    {
                        id: 's85-q1',
                        type: 'speaking',
                        question: 'Do you enjoy preparing meals at home, or do you prefer dining out at restaurants?'
                    }
                ]
            },
            {
                id: 's85-p2',
                title: 'Part 2: Cue Card: An Inspiring Mentor',
                passage: `Describe a person whose leadership or guidance has inspired you.\nYou should say:\n- Who this individual is\n- How you met or became acquainted\n- What leadership traits they exhibit\nand explain what impact their guidance had on your life.`,
                questions: [
                    {
                        id: 's85-q2',
                        type: 'speaking',
                        question: 'Speak for 2 minutes about an admirable mentor or leader.'
                    }
                ]
            },
            {
                id: 's85-p3',
                title: 'Part 3: Discussion: Democratic vs Authoritarian Leadership',
                questions: [
                    {
                        id: 's85-q3',
                        type: 'speaking',
                        question: 'Under what crisis circumstances might top-down directive leadership be superior to consensus-driven teamwork?'
                    }
                ]
            }
        ]
    },
    {
        id: 'speaking-86',
        title: 'Speaking Test 86',
        skill: 'speaking',
        durationMinutes: 14,
        totalQuestions: 3,
        difficulty: 'Hard',
        description: 'Part 1 Transportation & Commuting, Part 2 A Memorable Journey by Public Transit, Part 3 High-Speed Transit Infrastructure.',
        sections: [
            {
                id: 's86-p1',
                title: 'Part 1: Daily Commuting',
                questions: [
                    {
                        id: 's86-q1',
                        type: 'speaking',
                        question: 'How do you usually commute to work or university, and how long does it take?'
                    }
                ]
            },
            {
                id: 's86-p2',
                title: 'Part 2: Cue Card: An Unforgettable Train or Bus Journey',
                passage: `Describe a memorable journey you took by public transport.\nYou should say:\n- Where you were traveling to and from\n- What type of transport it was\n- Who accompanied you\nand explain why this specific journey made such an impression.`,
                questions: [
                    {
                        id: 's86-q2',
                        type: 'speaking',
                        question: 'Speak for 2 minutes on a memorable public transit journey.'
                    }
                ]
            },
            {
                id: 's86-p3',
                title: 'Part 3: Discussion: High-Speed Rail vs Aviation Subsidies',
                questions: [
                    {
                        id: 's86-q3',
                        type: 'speaking',
                        question: 'Should national governments ban short-haul domestic flights where high-speed bullet trains exist?'
                    }
                ]
            }
        ]
    },
    {
        id: 'speaking-87',
        title: 'Speaking Test 87',
        skill: 'speaking',
        durationMinutes: 14,
        totalQuestions: 3,
        difficulty: 'Medium',
        description: 'Part 1 Weather & Seasons, Part 2 A Gift That Took A Long Time to Choose, Part 3 Consumerism & Gift Giving Culture.',
        sections: [
            {
                id: 's87-p1',
                title: 'Part 1: Climate and Seasons',
                questions: [
                    {
                        id: 's87-q1',
                        type: 'speaking',
                        question: 'What is your favorite season of the year, and how does the weather affect your productivity?'
                    }
                ]
            },
            {
                id: 's87-p2',
                title: 'Part 2: Cue Card: A Carefully Chosen Gift',
                passage: `Describe a gift that took you a long time to choose for someone.\nYou should say:\n- Who the recipient was\n- What the occasion was\n- Why it was hard to select\nand explain how the person reacted when receiving it.`,
                questions: [
                    {
                        id: 's87-q2',
                        type: 'speaking',
                        question: 'Speak for 2 minutes on a gift you thoughtfully prepared.'
                    }
                ]
            },
            {
                id: 's87-p3',
                title: 'Part 3: Discussion: The Commercialization of Festivals',
                questions: [
                    {
                        id: 's87-q3',
                        type: 'speaking',
                        question: 'Has commercial advertising distorted traditional cultural holidays into materialistic consumption sprees?'
                    }
                ]
            }
        ]
    },
    {
        id: 'speaking-88',
        title: 'Speaking Test 88',
        skill: 'speaking',
        durationMinutes: 14,
        totalQuestions: 3,
        difficulty: 'Hard',
        description: 'Part 1 Languages & Dialects, Part 2 A Time You Resolved a Misunderstanding, Part 3 Cross-Cultural Diplomacy.',
        sections: [
            {
                id: 's88-p1',
                title: 'Part 1: Foreign Languages',
                questions: [
                    {
                        id: 's88-q1',
                        type: 'speaking',
                        question: 'Apart from English, what other languages have you studied or would you like to master?'
                    }
                ]
            },
            {
                id: 's88-p2',
                title: 'Part 2: Cue Card: Overcoming a Communication Breakdown',
                passage: `Describe a situation when you had a misunderstanding with someone and resolved it.\nYou should say:\n- Who the person was\n- What caused the initial misunderstanding\n- How you addressed the situation\nand explain what you learned from this resolution.`,
                questions: [
                    {
                        id: 's88-q2',
                        type: 'speaking',
                        question: 'Speak for 2 minutes on resolving an interpersonal misunderstanding.'
                    }
                ]
            },
            {
                id: 's88-p3',
                title: 'Part 3: Discussion: Non-Verbal Cues in International Negotiations',
                questions: [
                    {
                        id: 's88-q3',
                        type: 'speaking',
                        question: 'How significantly do differences in body language, eye contact, and silence impact diplomatic negotiations?'
                    }
                ]
            }
        ]
    },
    {
        id: 'speaking-89',
        title: 'Speaking Test 89',
        skill: 'speaking',
        durationMinutes: 14,
        totalQuestions: 3,
        difficulty: 'Medium',
        description: 'Part 1 Sleep & Rest Patterns, Part 2 An Item of Clothing for a Special Occasion, Part 3 Fashion Industry Influences.',
        sections: [
            {
                id: 's89-p1',
                title: 'Part 1: Sleep Patterns',
                questions: [
                    {
                        id: 's89-q1',
                        type: 'speaking',
                        question: 'Do you consider yourself an early morning bird or a night owl? How does this affect your focus?'
                    }
                ]
            },
            {
                id: 's89-p2',
                title: 'Part 2: Cue Card: Specialized Attire for a Ceremony',
                passage: `Describe a formal piece of clothing you wore for a special ceremony or event.\nYou should say:\n- What the clothing was\n- Where and why you wore it\n- How comfortable you felt\nand explain the cultural or personal significance of this outfit.`,
                questions: [
                    {
                        id: 's89-q2',
                        type: 'speaking',
                        question: 'Speak for 2 minutes on formal attire worn for a special occasion.'
                    }
                ]
            },
            {
                id: 's89-p3',
                title: 'Part 3: Discussion: Fast Fashion vs Sustainable Wardrobes',
                questions: [
                    {
                        id: 's89-q3',
                        type: 'speaking',
                        question: 'What incentives could encourage younger demographics to invest in durable, ethically manufactured apparel?'
                    }
                ]
            }
        ]
    },
    {
        id: 'speaking-90',
        title: 'Speaking Test 90',
        skill: 'speaking',
        durationMinutes: 14,
        totalQuestions: 3,
        difficulty: 'Hard',
        description: 'Part 1 Future aspirations & Goals, Part 2 An International Cultural Exchange Experience, Part 3 Globalization & Identity.',
        sections: [
            {
                id: 's90-p1',
                title: 'Part 1: Long-term Goals and Aspirations',
                questions: [
                    {
                        id: 's90-q1',
                        type: 'speaking',
                        question: 'Where do you envision yourself professionally in five years time after completing your IELTS?'
                    }
                ]
            },
            {
                id: 's90-p2',
                title: 'Part 2: Cue Card: An Encounter with Another Culture',
                passage: `Describe an occasion when you interacted closely with people from a completely different cultural background.\nYou should say:\n- Where and when this took place\n- What cultural differences you observed\n- How you adapted your behavior\nand explain what you found most enriching about the experience.`,
                questions: [
                    {
                        id: 's90-q2',
                        type: 'speaking',
                        question: 'Speak for 2 minutes about an enriching cross-cultural encounter.'
                    }
                ]
            },
            {
                id: 's90-p3',
                title: 'Part 3: Discussion: Homogenization vs Preservation of Local Cultures',
                questions: [
                    {
                        id: 's90-q3',
                        type: 'speaking',
                        question: 'Is globalization creating an identical worldwide monoculture, or is it fostering greater appreciation of unique regional traditions?'
                    }
                ]
            }
        ]
    }
];
