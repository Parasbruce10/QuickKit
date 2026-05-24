import React, { useState, useEffect, useRef } from 'https://esm.sh/react@18.2.0';
import ReactDOM from 'https://esm.sh/react-dom@18.2.0/client';

const e = React.createElement;

// 1. Clean Header Component
// 1. Clean Header Component (Yahan humne toggle button aur right side positioning add ki hai)
// 1. Clean Header Component (Button left side par shift kiya aur sirf icons rakhe)
// 1. Clean Header Component (Title apni jagah, Button Right side par)
const Header = ({ title, theme, toggleTheme }) => {
    return e('header', { className: 'main-header' },
        e('div', { className: 'header-content-wrapper' },
            // Brand Title pehle (Left par rahega)
            e('h1', { className: 'brand-title' }, title),

            // Toggle Button baad mein (Right par jayega)
            e('button', {
                className: 'theme-toggle-btn',
                onClick: toggleTheme,
                title: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`
            }, theme === 'dark' ? '☀️' : '🌙')
        )
    );
};

// 2. The Engine (Main Body)
const Content = () => {
    // Har level ke liye alag text setup (Easy, Medium, Hard)
    const levelParagraphs = {
        1: "The quick brown fox jumps over the lazy dog every single day. Programming is a very fun activity that can help you build wonderful web utilities easily. You should practice typing regularly to improve your overall speed and accuracy metrics.",
        2: "Modern web development frameworks construct beautiful pixel perfect user experiences with high performance execution. Optimizing local state propagation schemes across client applications worldwide guarantees zero network latency. Developers must engineer clean component architectures to scale their digital applications smoothly over time.",
        3: "The swift dynamics of asynchronous JavaScript runtime engines enable highly scalable web architectures. Compiling pure client-side interactivity layers on top of modular frameworks completely bypasses standard handshake intervals. This enforces cryptographic cross-origin isolation pipelines, securing sensitive user workspace configurations efficiently."
    };

    // Core Engine States
    const [promptText, setPromptText] = useState('');
    // Pehle level ka dynamic default text load hoga
    const [activeParagraph, setActiveParagraph] = useState(levelParagraphs[1]);
    const [inputValue, setInputValue] = useState('');

    // Timer & Flow States
    // Timer, Flow & Level States
    const levelsConfig = {
        1: { time: 60, targetWords: 30 },
        2: { time: 45, targetWords: 25 },
        3: { time: 30, targetWords: 20 }
    };
    
    const [currentLevel, setCurrentLevel] = useState(1);
    const [timeLeft, setTimeLeft] = useState(levelsConfig[1].time);
    const [isTestRunning, setIsTestRunning] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    // Reference points for calculations
    const inputRef = useRef(null);
    const timerIntervalRef = useRef(null);

    // Dynamic Paragraph Generator from Search Input
    // Dynamic Paragraph Generator from Search Input
    const handlePromptChange = (event) => {
        const val = event.target.value;
        setPromptText(val);
        if (val.trim() === '') {
            setActiveParagraph(levelParagraphs[currentLevel]); // Level ke mutabiq reload hoga
        } else {
            setActiveParagraph(val);
        }
        // Agar aapke code mein resetTest error de raha ho to yahan startLevel(currentLevel) use kar sakte hain
        startLevel(currentLevel); 
    };

    // Main Countdown Matrix
    useEffect(() => {
        if (isTestRunning && timeLeft > 0) {
            timerIntervalRef.current = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(timerIntervalRef.current);
                        setIsTestRunning(false);
                        setIsFinished(true);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }

        return () => clearInterval(timerIntervalRef.current);
    }, [isTestRunning]);

    // Live Key stroke tracker
    // Live Key stroke tracker
    const handleTyping = (event) => {
        const val = event.target.value;
        if (isFinished) return;

        // Paragraph ke total length se aage typing block karne ke liye check
        if (val.length > activeParagraph.length) return;

        if (!isTestRunning && val.length === 1) {
            setIsTestRunning(true);
        }

        setInputValue(val);
    };

    // Ultimate Performance Metrics Calculations
    // Ultimate Performance Metrics Calculations
    // Ultimate Performance Metrics Calculations
    const calculateFinalStats = () => {
        const timeSpentInMinutes = (levelsConfig[currentLevel].time - timeLeft) / 60 || 1 / 60; 
        const totalCharactersTyped = inputValue.length;

        const computedWpm = Math.round((totalCharactersTyped / 5) / timeSpentInMinutes);

        let correctHits = 0;
        let totalErrors = 0;

        for (let i = 0; i < totalCharactersTyped; i++) {
            if (inputValue[i] === activeParagraph[i]) {
                correctHits++;
            } else {
                totalErrors++;
            }
        }

        const computedAccuracy = totalCharactersTyped > 0
            ? Math.round((correctHits / totalCharactersTyped) * 100)
            : 100;

        // NAYA LOGIC: Sahe words count karne ke liye (5 chars = 1 word)
        const correctWordsTyped = Math.floor(correctHits / 5);

        return {
            wpm: computedWpm,
            accuracy: computedAccuracy,
            errors: totalErrors,
            totalKeys: totalCharactersTyped,
            correctWords: correctWordsTyped // Yi naya pass kia hy
        };
    };

    

    // Reset Machine
    // Level Flow & Reset Machines
    // Level Flow & Reset Machines
    const startLevel = (lvl) => {
        clearInterval(timerIntervalRef.current);
        setInputValue('');
        setPromptText(''); // Custom prompt text clear ho jaye taake automatic level text load ho
        setActiveParagraph(levelParagraphs[lvl]); // Dynamic prompt logic apply yahan ho rahi hai
        setTimeLeft(levelsConfig[lvl].time); 
        setIsTestRunning(false);
        setIsFinished(false);
        setTimeout(() => {
            if (inputRef.current) inputRef.current.focus();
        }, 50);
    };

    const handleNextLevel = () => {
        const nextLvl = currentLevel + 1;
        setCurrentLevel(nextLvl);
        startLevel(nextLvl);
    };

    const handleRetry = () => {
        startLevel(currentLevel);
    };

    const handleRestartGame = () => {
        setCurrentLevel(1);
        startLevel(1);
    };
    
    // Status Trackers
    const stats = calculateFinalStats();
    const currentConfig = levelsConfig[currentLevel];
    const isPassed = stats.correctWords >= currentConfig.targetWords;
    const isGameWon = isPassed && currentLevel === 3;

    // Characters Highlighter Parser
    const renderedText = activeParagraph.split('').map((char, index) => {
        let className = '';
        if (index < inputValue.length) {
            className = inputValue[index] === char ? 'char-correct' : 'char-incorrect';
        } else if (index === inputValue.length) {
            className = 'char-current';
        }
        return e('span', { key: index, className }, char);
    });

    return e('main', { className: 'main-content' },
        e('div', { className: 'tester-section-wrapper' },

            // SCREEN 1: IS RUNNING / IDLE WORKSPACE
            !isFinished && e('div', { style: { display: 'flex', flexDirection: 'column', gap: '24px' } },

                // --- NAYI HEADING CORNERSTONE YAHAN ADD KAREIN ---
                e('h2', { className: 'tester-main-title', style: { textAlign: 'center' } }, 'Typing Speed Tester'),
                // Prompt Search Input Bar
                e('div', { className: 'prompt-search-container' },
                    e('span', { className: 'prompt-icon' }, '✦'),
                    e('input', {
                        type: 'text',
                        className: 'prompt-input-field',
                        placeholder: `Target: Type ${currentConfig.targetWords} words in ${currentConfig.time} seconds to clear Level ${currentLevel}!`,
                        value: promptText,
                        onChange: handlePromptChange,
                        disabled: isTestRunning
                    })
                ),

                // Core Card Interface
                e('div', {
                    className: `typing-container ${isTestRunning ? 'active-focus' : ''}`,
                    onClick: () => inputRef.current && inputRef.current.focus()
                },
                    // Dynamic Countdown Badge
                    e('div', { className: `timer-pill ${timeLeft <= 10 ? 'warning' : ''}` }, `${timeLeft}s Left`),

                    // Hidden mechanical input field
                    e('input', {
                        ref: inputRef,
                        type: 'text',
                        className: 'typing-input',
                        value: inputValue,
                        onChange: handleTyping,
                        autoComplete: 'off',
                        autoFocus: true
                    }),

                    // Realtime text stream board
                    e('div', { className: 'text-display' }, renderedText)
                )
            ),

            // SCREEN 2: HIGH-END METRIC RESULTS BREAKDOWN
            // SCREEN 2: HIGH-END METRIC RESULTS BREAKDOWN
            isFinished && e('div', { className: 'result-card' },
                
                // Dynamic Title Pass/Fail ke hisaab se
                e('h2', { 
                    className: 'result-title', 
                    style: { color: isGameWon ? '#22c55e' : (isPassed ? '#00f5ff' : '#ef4444') } 
                }, 
                    isGameWon ? '🏆 You Won The Game! Master Typist!' :
                    isPassed ? `⚡ Level ${currentLevel} Passed!` :
                    `❌ Level ${currentLevel} Failed!`
                ),

                // Target Words Message
                e('p', { style: { textAlign: 'center', color: '#94a3b8', marginBottom: '20px' } }, 
                    `You typed ${stats.correctWords} correct words. (Target was ${currentConfig.targetWords})`
                ),

                // Result Grid (Ye waise hi rahega)
                e('div', { className: 'result-grid' },
                    e('div', { className: 'result-box' },
                        e('div', { className: 'res-val cyan' }, stats.wpm),
                        e('div', { className: 'res-label' }, 'Words Per Min')
                    ),
                    e('div', { className: 'result-box' },
                        e('div', { className: 'res-val pink' }, `${stats.accuracy}%`),
                        e('div', { className: 'res-label' }, 'Accuracy Metric')
                    ),
                    e('div', { className: 'result-box' },
                        e('div', { className: 'res-val purple' }, stats.errors),
                        e('div', { className: 'res-label' }, 'Wrong Keys')
                    )
                ),

                // Conditional Buttons Level ke mutabiq
                e('div', { style: { display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '20px' } },
                    (!isPassed) && e('button', { className: 'action-btn', onClick: handleRetry }, '🔄 Retry Level'),
                    (isPassed && !isGameWon) && e('button', { className: 'action-btn', onClick: handleNextLevel }, '➡️ Next Level'),
                    (isGameWon) && e('button', { className: 'action-btn', onClick: handleRestartGame }, '🔄 Play Again')
                )
            )
        )
    );
};

// --- NEW: Bio Writer Component ---
// --- NEW: Bio Writer Component ---
const BioWriter = () => {
    // Name aur Field dono ke liye states
    const [userName, setUserName] = useState('');
    const [field, setField] = useState('');
    const [generatedBio, setGeneratedBio] = useState('');

    const handleGenerate = () => {
        // Dono fields check karega agar khali hain to generate nahi karega
        if (!userName.trim() || !field.trim()) return;

        // Name aur Field ke hisaab se premium aur stylish bio templates
        const templates = [
            `✨ Hey, I'm ${userName}! A creative ${field} crafting digital experiences, solving complex problems, and turning ideas into reality. Let's build something extraordinary! 🚀`,
            `⚡ Driven. Innovative. Passionate. I am ${userName}, a professional ${field} specializing in delivering high-impact solutions and pushing industry boundaries. 💼`,
            `🎯 Meet ${userName} — A dedicated ${field} blending technical expertise with out-of-the-box thinking to architect next-gen workflows. Always learning, always evolving. 🔥`,
            `🌟 Minimalist mindset, maximalist results. I'm ${userName}, working as a ${field}. Focused on growth, design aesthetics, and seamless user experiences. 🛠️`
        ];

        // Randomly ek stylish bio select karega
        const randomBio = templates[Math.floor(Math.random() * templates.length)];
        setGeneratedBio(randomBio);
    };

    return e('main', { className: 'main-content' },
        e('div', { className: 'tester-section-wrapper', style: { textAlign: 'center' } },
            e('h2', { className: 'tester-main-title' }, 'Stylish Bio Writer'),
            e('p', { style: { color: '#64748b', marginBottom: '30px' } }, 'Write your name and profession here to generate a beautiful bio'),

            // CONTAINER FOR INPUTS
            e('div', { style: { maxWidth: '500px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' } },

                // 1. Name Input Field
                e('div', { className: 'prompt-search-container' },
                    e('span', { className: 'prompt-icon' }, '👤'),
                    e('input', {
                        type: 'text',
                        className: 'prompt-input-field',
                        placeholder: 'Enter your name...',
                        value: userName,
                        onChange: (event) => setUserName(event.target.value)
                    })
                ),

                // 2. Field/Profession Input Field
                e('div', { className: 'prompt-search-container' },
                    e('span', { className: 'prompt-icon' }, '👨‍💻'),
                    e('input', {
                        type: 'text',
                        className: 'prompt-input-field',
                        placeholder: 'Enter your profession (e.g., Web Developer)',
                        value: field,
                        onChange: (event) => setField(event.target.value)
                    })
                )
            ),

            // Generate Button (Inputs ke neeche space ke sath)
            e('button', {
                className: 'action-btn',
                onClick: handleGenerate,
                style: { marginTop: '30px' }
            }, 'Generate Stylish Bio'),

            // Result Display
            generatedBio && e('div', { className: 'result-card', style: { marginTop: '40px', padding: '30px' } },
                e('h3', { className: 'result-title', style: { fontSize: '1.2rem', marginBottom: '15px' } }, 'Your Personalized Bio:'),
                e('p', { className: 'text-display', style: { color: '#fff', fontSize: '1.1rem', lineHeight: '1.6', textAlign: 'left' } }, generatedBio)
            )
        )
    );
};
// --- NEW: Password Strength Checker Component ---
const PasswordChecker = () => {
    const [password, setPassword] = useState('');

    // Strength evaluate karne ka logic
    const getStrength = (pass) => {
        if (!pass) return { score: 0, text: 'Empty', color: '#64748b' };

        let score = 0;
        if (pass.length >= 8) score++;
        if (/[A-Z]/.test(pass)) score++;
        if (/[0-9]/.test(pass)) score++;
        if (/[^A-Za-z0-9]/.test(pass)) score++;

        if (score <= 1) return { score, text: '🔴 Weak Password', color: '#ef4444' };
        if (score <= 3) return { score, text: '🟡 Medium Password', color: '#eab308' };
        return { score, text: '🟢 Strong Password (Secure)', color: '#22c55e' };
    };

    const strength = getStrength(password);

    return e('main', { className: 'main-content' },
        e('div', { className: 'tester-section-wrapper', style: { textAlign: 'center' } },
            e('h2', { className: 'tester-main-title' }, 'Password Strength Checker'),
            e('p', { style: { color: '#64748b', marginBottom: '30px' } }, 'Enter your password and check the strenght of your password'),

            // Input field wrapper
            e('div', { className: 'prompt-search-container', style: { maxWidth: '500px', margin: '0 auto 30px auto' } },
                e('span', { className: 'prompt-icon' }, '🔒'),
                e('input', {
                    type: 'text', // Text rakha hai taake user dekh sake, aap 'password' bhi kar sakte hain
                    className: 'prompt-input-field',
                    placeholder: 'Type your password here...',
                    value: password,
                    onChange: (event) => setPassword(event.target.value)
                })
            ),

            // Live Result Meter Card
            password && e('div', { className: 'result-card', style: { marginTop: '20px', padding: '25px', maxWidth: '500px', margin: '0 auto' } },
                e('h3', { style: { fontSize: '1.2rem', marginBottom: '10px', color: strength.color } }, strength.text),

                // Visual Indicator Bar
                e('div', { style: { background: 'rgba(255,255,255,0.1)', height: '8px', borderRadius: '4px', overflow: 'hidden', marginTop: '15px' } },
                    e('div', {
                        style: {
                            background: strength.color,
                            width: `${(strength.score / 4) * 100}%`,
                            height: '100%',
                            transition: 'all 0.3s ease'
                        }
                    })
                ),

                // Live Feedback Guidelines
                e('ul', { style: { textAlign: 'left', marginTop: '20px', color: '#94a3b8', fontSize: '0.9rem', listStyleType: 'none', padding: 0 } },
                    e('li', { style: { color: password.length >= 8 ? '#22c55e' : '' } }, `${password.length >= 8 ? '✓' : '○'} At least 8 characters`),
                    e('li', { style: { color: /[A-Z]/.test(password) ? '#22c55e' : '' } }, `${/[A-Z]/.test(password) ? '✓' : '○'} Contains Capital Letter (A-Z)`),
                    e('li', { style: { color: /[0-9]/.test(password) ? '#22c55e' : '' } }, `${/[0-9]/.test(password) ? '✓' : '○'} Contains Number (0-9)`),
                    e('li', { style: { color: /[^A-Za-z0-9]/.test(password) ? '#22c55e' : '' } }, `${/[^A-Za-z0-9]/.test(password) ? '✓' : '○'} Contains Special Character (@, #, $, etc.)`)
                )
            )
        )
    );
};// --- NEW: About Component ---
// --- About Component with English text ---
const About = () => {
    return e('main', { className: 'main-content' },
        e('div', { className: 'tester-section-wrapper', style: { textAlign: 'center', maxWidth: '800px', margin: '0 auto' } },
            e('h2', { className: 'tester-main-title' }, 'About QuickKit'),

            // Vision Card
            e('div', { className: 'result-card', style: { padding: '40px', marginTop: '20px', textAlign: 'left' } },
                e('h3', { className: 'result-title', style: { fontSize: '1.4rem', marginBottom: '15px', color: '#00f5ff' } }, 'Our Mission'),
                e('p', { style: { color: '#94a3b8', lineHeight: '1.8', fontSize: '1.05rem', marginBottom: '25px' } },
                    'At QuickKit, our goal is simple: to build high-performance web utilities that respect your privacy and maximize your efficiency. Whether you are testing your typing speed, generating a creative professional bio, or auditing your password security, QuickKit offers a seamless, premium user experience.'
                ),

                e('h3', { className: 'result-title', style: { fontSize: '1.2rem', marginBottom: '15px', color: '#22c55e' } }, 'Why Choose QuickKit?'),
                e('ul', { style: { listStyleType: 'none', padding: 0, color: '#f3f4f6', lineHeight: '1.8' } },
                    e('li', { style: { marginBottom: '10px' } }, '⚡ 100% Client-Side — Processed locally inside your browser.'),
                    e('li', { style: { marginBottom: '10px' } }, '🔒 Absolute Privacy — No backend tracking or data storage.'),
                    e('li', { style: { marginBottom: '10px' } }, '🎨 Dynamic UI — Adaptive dark and light theme architectures.')
                )
            ),

            // Developer Card
            e('div', { className: 'result-card', style: { padding: '40px', marginTop: '30px', textAlign: 'left', borderLeft: '4px solid #bd00ff' } },
                e('h3', { className: 'result-title', style: { fontSize: '1.4rem', marginBottom: '15px', color: '#bd00ff' } }, 'Meet the Developer'),
                e('p', { style: { color: '#94a3b8', lineHeight: '1.8', fontSize: '1.05rem' } },
                    'QuickKit was envisioned, designed, and engineered from scratch by ',
                    e('strong', { style: { color: '#ffffff' } }, 'Paras'),
                    '. With a passion for crafting pixel-perfect interfaces, clean codebase layouts, and user-first digital experiences, Paras built this platform to make everyday productivity accessible to everyone.'
                )
            )
        )
    );
};
// --- NEW: Terms & Conditions Component ---
const TermsConditions = () => {
    return e('main', { className: 'main-content' },
        e('div', { className: 'tester-section-wrapper', style: { maxWidth: '800px', margin: '0 auto', paddingBottom: '40px' } },
            e('h2', { className: 'tester-main-title', style: { textAlign: 'center' } }, 'Terms & Conditions'),
            e('p', { style: { color: '#64748b', textAlign: 'center', marginBottom: '40px', fontSize: '0.95rem' } }, 'Last Updated: May 24, 2026'),

            // Introduction Card
            e('div', { className: 'result-card', style: { padding: '25px', marginBottom: '25px', borderLeft: '4px solid #00f5ff' } },
                e('p', { style: { color: '#f3f4f6', lineHeight: '1.7', fontSize: '1rem', fontStyle: 'italic' } },
                    'Please read these Terms and Conditions ("Terms") carefully before using the QuickKit website and web utilities (the "Service"). By accessing or using the Service, you agree to be bound by these Terms.'
                )
            ),

            // 1. Use of Service
            e('div', { className: 'result-card', style: { padding: '25px', marginBottom: '20px' } },
                e('h3', { style: { color: '#00f5ff', fontSize: '1.15rem', marginBottom: '10px', fontWeight: '700' } }, '1. USE OF THE SERVICE'),
                e('p', { style: { color: '#94a3b8', lineHeight: '1.6', fontSize: '0.95rem' } },
                    'QuickKit provides free browser-based productivity tools (Typing Tester, Bio Writer, Password Strength Checker). You agree to use these tools only for lawful, personal, or professional purposes.'
                )
            ),

            // 2. Intellectual Property
            e('div', { className: 'result-card', style: { padding: '25px', marginBottom: '20px' } },
                e('h3', { style: { color: '#bd00ff', fontSize: '1.15rem', marginBottom: '10px', fontWeight: '700' } }, '2. INTELLECTUAL PROPERTY'),
                e('p', { style: { color: '#94a3b8', lineHeight: '1.6', fontSize: '0.95rem' } },
                    'All original UI layouts, code structure, custom themes, and branding elements associated with QuickKit are the intellectual property of the application developers (Created by Paras). You may not copy, redistribute, or reverse-engineer the core utility code for commercial purposes without explicit permission.'
                )
            ),

            // 3. Password Security Disclaimer
            e('div', { className: 'result-card', style: { padding: '25px', marginBottom: '20px' } },
                e('h3', { style: { color: '#ef4444', fontSize: '1.15rem', marginBottom: '10px', fontWeight: '700' } }, '3. PASSWORD SECURITY DISCLAIMER'),
                e('p', { style: { color: '#94a3b8', lineHeight: '1.6', fontSize: '0.95rem', marginBottom: '10px' } },
                    'The Password Strength Checker tool provides automated local feedback on password complexity based on length and character variance.'
                ),
                e('ul', { style: { color: '#94a3b8', paddingLeft: '20px', fontSize: '0.95rem', lineHeight: '1.6' } },
                    e('li', { style: { marginBottom: '5px' } }, 'It is an educational indicator tool, not an absolute guarantee of cybersecurity.'),
                    e('li', null, 'QuickKit does not save your passwords, and we are not liable for the strength or ultimate security of the passwords you choose to use on external platforms.')
                )
            ),

            // 4. Bio Writer Disclaimer
            e('div', { className: 'result-card', style: { padding: '25px', marginBottom: '20px' } },
                e('h3', { style: { color: '#eab308', fontSize: '1.15rem', marginBottom: '10px', fontWeight: '700' } }, '4. BIO WRITER DISCLAIMER'),
                e('p', { style: { color: '#94a3b8', lineHeight: '1.6', fontSize: '0.95rem' } },
                    'The text generated by the Bio Writer tool is produced using randomized creative templates based on your input. While it is intended to sound stylish and professional, you are solely responsible for reviewing, modifying, and verifying the accuracy of any generated text before using it in official professional settings.'
                )
            ),

            // 5. Limitation of Liability
            e('div', { className: 'result-card', style: { padding: '25px', marginBottom: '20px' } },
                e('h3', { style: { color: '#22c55e', fontSize: '1.15rem', marginBottom: '10px', fontWeight: '700' } }, '5. LIMITATION OF LIABILITY & "AS IS" WARRANTY'),
                e('p', { style: { color: '#94a3b8', lineHeight: '1.6', fontSize: '0.95rem' } },
                    'The Service is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind. QuickKit does not guarantee uninterrupted service. We shall not be held liable for any data loss, performance delays, or technical glitches originating from your browser environment or network connection.'
                )
            ),

            // 6. Termination
            e('div', { className: 'result-card', style: { padding: '25px', marginBottom: '20px' } },
                e('h3', { style: { color: '#00f5ff', fontSize: '1.15rem', marginBottom: '10px', fontWeight: '700' } }, '6. TERMINATION'),
                e('p', { style: { color: '#94a3b8', lineHeight: '1.6', fontSize: '0.95rem' } },
                    'We reserve the right to suspend, modify, or terminate access to our free web utilities at any time, without prior notice, for maintenance or application upgrades.'
                )
            ),

            // 7. Governing Law
            e('div', { className: 'result-card', style: { padding: '25px', marginBottom: '20px' } },
                e('h3', { style: { color: '#bd00ff', fontSize: '1.15rem', marginBottom: '10px', fontWeight: '700' } }, '7. GOVERNING LAW'),
                e('p', { style: { color: '#94a3b8', lineHeight: '1.6', fontSize: '0.95rem' } },
                    'These Terms shall be governed and construed in accordance with standard internet privacy frameworks and local digital regulations.'
                )
            ),

            // 8. Contact Information
            e('div', { className: 'result-card', style: { padding: '25px', marginBottom: '20px', background: 'rgba(0, 245, 255, 0.02)' } },
                e('h3', { style: { color: '#00f5ff', fontSize: '1.15rem', marginBottom: '10px', fontWeight: '700' } }, '8. CONTACT INFORMATION'),
                e('p', { style: { color: '#94a3b8', lineHeight: '1.6', fontSize: '0.95rem' } },
                    'For any support, feedback, or legal inquiries regarding these Terms, please use the Contact Us link provided in the application footer.'
                )
            )
        )
    );
};
// --- NEW: Privacy Policy Component ---
const PrivacyPolicy = () => {
    return e('main', { className: 'main-content' },
        e('div', { className: 'tester-section-wrapper', style: { maxWidth: '800px', margin: '0 auto', paddingBottom: '40px' } },
            e('h2', { className: 'tester-main-title', style: { textAlign: 'center' } }, 'Privacy Policy'),
            e('p', { style: { color: '#64748b', textAlign: 'center', marginBottom: '40px', fontSize: '0.95rem' } }, 'Last Updated: May 24, 2026'),

            // Introduction Card
            e('div', { className: 'result-card', style: { padding: '25px', marginBottom: '25px', borderLeft: '4px solid #00f5ff' } },
                e('p', { style: { color: '#f3f4f6', lineHeight: '1.7', fontSize: '1rem', fontStyle: 'italic' } },
                    'Welcome to QuickKit ("we," "our," or "us"). We are committed to protecting your privacy. This Privacy Policy explains how our application processes information when you use our services, including the Typing Tester, Bio Writer, and Password Strength Checker.'
                )
            ),

            // 1. No Data Collection
            e('div', { className: 'result-card', style: { padding: '25px', marginBottom: '20px' } },
                e('h3', { style: { color: '#00f5ff', fontSize: '1.15rem', marginBottom: '10px', fontWeight: '700' } }, '1. NO DATA COLLECTION (LOCAL PROCESSING)'),
                e('p', { style: { color: '#94a3b8', lineHeight: '1.6', fontSize: '0.95rem', marginBottom: '10px' } },
                    'QuickKit is a serverless, client-side application. This means:'
                ),
                e('ul', { style: { color: '#94a3b8', paddingLeft: '20px', fontSize: '0.95rem', lineHeight: '1.6' } },
                    e('li', { style: { marginBottom: '5px' } }, 'Personal Data: We do not collect, store, or share any personal information, usernames, typed text, generated bios, or passwords.'),
                    e('li', null, 'Local Processing: All data inputs (such as the text you type during tests, the profession fields you enter, or the passwords you evaluate) are processed entirely inside your own web browser. No data ever leaves your device or is transmitted to external servers.')
                )
            ),

            // 2. Third-Party Services
            e('div', { className: 'result-card', style: { padding: '25px', marginBottom: '20px' } },
                e('h3', { style: { color: '#bd00ff', fontSize: '1.15rem', marginBottom: '10px', fontWeight: '700' } }, '2. THIRD-PARTY SERVICES'),
                e('p', { style: { color: '#94a3b8', lineHeight: '1.6', fontSize: '0.95rem' } },
                    'Our application imports official React libraries via CDN links (such as esm.sh). These third-party networks may process basic technical requests (like your IP address) solely to deliver the required code files to your browser. They do not have access to your inputs inside QuickKit.'
                )
            ),

            // 3. Cookies and Local Storage
            e('div', { className: 'result-card', style: { padding: '25px', marginBottom: '20px' } },
                e('h3', { style: { color: '#22c55e', fontSize: '1.15rem', marginBottom: '10px', fontWeight: '700' } }, '3. COOKIES AND LOCAL STORAGE'),
                e('p', { style: { color: '#94a3b8', lineHeight: '1.6', fontSize: '0.95rem' } },
                    'QuickKit does not use persistent tracking cookies to profile users. We may use temporary browser states to manage UI configurations, such as your preference for Light Mode or Dark Mode.'
                )
            ),

            // 4. Security of Your Data
            e('div', { className: 'result-card', style: { padding: '25px', marginBottom: '20px' } },
                e('h3', { style: { color: '#ef4444', fontSize: '1.15rem', marginBottom: '10px', fontWeight: '700' } }, '4. SECURITY OF YOUR DATA'),
                e('p', { style: { color: '#94a3b8', lineHeight: '1.6', fontSize: '0.95rem' } },
                    'Since your data never leaves your local browser session, your inputs are safe from server-side breaches. However, you are responsible for maintaining the security of your physical device and browser to prevent unauthorized local access.'
                )
            ),

            // 5. Changes to This Privacy Policy
            e('div', { className: 'result-card', style: { padding: '25px', marginBottom: '20px' } },
                e('h3', { style: { color: '#eab308', fontSize: '1.15rem', marginBottom: '10px', fontWeight: '700' } }, '5. CHANGES TO THIS PRIVACY POLICY'),
                e('p', { style: { color: '#94a3b8', lineHeight: '1.6', fontSize: '0.95rem' } },
                    'We reserve the right to modify this Privacy Policy at any time. Any updates will be posted directly on this page with a revised "Last Updated" date.'
                )
            ),

            // 6. Contact Us
            e('div', { className: 'result-card', style: { padding: '25px', marginBottom: '20px', background: 'rgba(0, 245, 255, 0.02)' } },
                e('h3', { style: { color: '#00f5ff', fontSize: '1.15rem', marginBottom: '10px', fontWeight: '700' } }, '6. CONTACT US'),
                e('p', { style: { color: '#94a3b8', lineHeight: '1.6', fontSize: '0.95rem' } },
                    'If you have any questions about this Privacy Policy, please contact us through the official channels available on our platform.'
                )
            )
        )
    );
};
// --- NEW: Contact Us Component ---
const ContactUs = () => {
    // Formspree ka endpoint link aapke email ke sath connected hai
    const formspreeUrl = "https://formspree.io/f/mykvpdbb";

    return e('main', { className: 'main-content' },
        e('div', { className: 'tester-section-wrapper', style: { maxWidth: '600px', margin: '0 auto', paddingBottom: '40px' } },
            e('h2', { className: 'tester-main-title', style: { textAlign: 'center' } }, 'Contact Us'),
            e('p', { style: { color: '#64748b', textAlign: 'center', marginBottom: '30px' } }, 'Have any questions or feedback? Drop us a message below!'),

            // Native HTML Form tag for automatic submission handling
            e('form', {
                action: formspreeUrl,
                method: 'POST',
                className: 'result-card',
                style: { padding: '35px', display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }
            },

                // 1. Name Input Field
                e('div', null,
                    e('label', { style: { display: 'block', color: '#94a3b8', fontSize: '0.9rem', marginBottom: '8px', fontWeight: '600' } }, 'Your Name'),
                    e('div', { className: 'prompt-search-container' },
                        e('span', { className: 'prompt-icon' }, '👤'),
                        e('input', {
                            type: 'text',
                            name: 'name', // Formspree ke liye name attribute zaroori hai
                            className: 'prompt-input-field',
                            placeholder: 'Enter your full name',
                            required: true
                        })
                    )
                ),

                // 2. Email Input Field
                e('div', null,
                    e('label', { style: { display: 'block', color: '#94a3b8', fontSize: '0.9rem', marginBottom: '8px', fontWeight: '600' } }, 'Email Address'),
                    e('div', { className: 'prompt-search-container' },
                        e('span', { className: 'prompt-icon' }, '✉️'),
                        e('input', {
                            type: 'email',
                            name: '_replyto', // Automate reply mapping inside inbox
                            className: 'prompt-input-field',
                            placeholder: 'Enter your email address',
                            required: true
                        })
                    )
                ),

                // 3. Message Textarea Field
                e('div', null,
                    e('label', { style: { display: 'block', color: '#94a3b8', fontSize: '0.9rem', marginBottom: '8px', fontWeight: '600' } }, 'Your Message'),
                    e('textarea', {
                        name: 'message',
                        required: true,
                        placeholder: 'Type your message here...',
                        style: {
                            width: '100%',
                            minHeight: '120px',
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '12px',
                            padding: '14px',
                            color: '#ffffff',
                            fontFamily: 'inherit',
                            fontSize: '1rem',
                            resize: 'vertical',
                            outline: 'none',
                            transition: 'all 0.2s ease'
                        }
                    })
                ),

                // Submit Button
                e('button', {
                    type: 'submit',
                    className: 'action-btn',
                    style: { marginTop: '10px', width: '100%', justifyContent: 'center' }
                }, '✉️ Send Message')
            )
        )
    );
};
// --- NEW: Premium Home Component with Typewriter ---
const Home = ({ navigate }) => {
    const [typedText, setTypedText] = useState('');
    const fullText = "Premium digital utilities to supercharge your daily workflow.";

    useEffect(() => {
        let i = 0;
        const timer = setInterval(() => {
            setTypedText(fullText.slice(0, i + 1));
            i++;
            if (i >= fullText.length) clearInterval(timer);
        }, 50);
        return () => clearInterval(timer);
    }, []);

    return e('main', { className: 'main-content' },
        e('div', { className: 'tester-section-wrapper', style: { gap: '0' } },

            // ── HERO ──
            e('div', { className: 'home-hero' },
                e('span', { className: 'hero-badge' }, '✦ Free • Local • Fast'),
                e('h2', { className: 'hero-title' }, 'Your Digital Toolkit,', e('br'), 'Supercharged.'),
                e('p', { className: 'hero-subtitle' },
                    typedText,
                    e('span', { style: { color: '#00f5ff' } }, '|')
                ),
                e('div', { style: { display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' } },
                    e('button', { className: 'action-btn', onClick: () => navigate('typingtester') }, '🚀 Start Typing Test'),
                    // Updated Learn More Button with Glow Class
                e('button', { 
                    className: 'learn-more-btn', 
                    onClick: () => navigate('about') 
                }, 'Learn More')
                ),

                // Stats Row
                e('div', { className: 'hero-stats-row' },
                    e('div', { className: 'stat-item' },
                        e('div', { className: 'stat-number' }, '3+'),
                        e('div', { className: 'stat-label' }, 'Tools')
                    ),
                    e('div', { className: 'stat-item' },
                        e('div', { className: 'stat-number' }, '100%'),
                        e('div', { className: 'stat-label' }, 'Free')
                    ),
                    e('div', { className: 'stat-item' },
                        e('div', { className: 'stat-number' }, '0ms'),
                        e('div', { className: 'stat-label' }, 'Server Delay')
                    )
                )
            ),

            // ── FEATURE CARDS ──
            e('div', { className: 'features-grid' },
                e('div', { className: 'feature-card', onClick: () => navigate('typingtester') },
                    e('img', { className: 'feature-img', src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80', alt: 'Coding' }),
                    e('div', { className: 'feature-content' },
                        e('h3', { className: 'feature-title' }, '⌨️ Typing Tester'),
                        e('p', { style: { color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.6' } }, 'Test your coding speed with real paragraphs and get instant WPM results.')
                    )
                ),
                e('div', { className: 'feature-card', onClick: () => navigate('passwordchecker') },
                    e('img', { className: 'feature-img', src: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=600&q=80', alt: 'Security' }),
                    e('div', { className: 'feature-content' },
                        e('h3', { className: 'feature-title' }, '🔒 Password Strength'),
                        e('p', { style: { color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.6' } }, 'Evaluate password security locally with real-time smart scoring.')
                    )
                ),
                e('div', { className: 'feature-card', onClick: () => navigate('biowriter') },
                    e('img', { className: 'feature-img', src: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=600&q=80', alt: 'Writing' }),
                    e('div', { className: 'feature-content' },
                        e('h3', { className: 'feature-title' }, '✨ Bio Writer'),
                        e('p', { style: { color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.6' } }, 'Generate professional bios for social profiles in one click.')
                    )
                )
            ),

            // ── HOW IT WORKS ──
            e('div', { className: 'how-it-works' },
                e('p', { className: 'section-label' }, 'How it works'),
                e('h2', { className: 'section-title' }, 'Three Steps. Zero Friction.'),
                e('div', { className: 'steps-row' },
                    e('div', { className: 'step-card' },
                        e('span', { className: 'step-icon' }, '🎯'),
                        e('div', { className: 'step-num' }, 'Step 01'),
                        e('div', { className: 'step-title' }, 'Pick a Tool'),
                        e('div', { className: 'step-desc' }, 'Choose from typing tester, password checker, or bio writer — all free.')
                    ),
                    e('div', { className: 'step-card' },
                        e('span', { className: 'step-icon' }, '⚡'),
                        e('div', { className: 'step-num' }, 'Step 02'),
                        e('div', { className: 'step-title' }, 'Use Instantly'),
                        e('div', { className: 'step-desc' }, 'No signup, no loading — everything runs locally in your browser.')
                    ),
                    e('div', { className: 'step-card' },
                        e('span', { className: 'step-icon' }, '📊'),
                        e('div', { className: 'step-num' }, 'Step 03'),
                        e('div', { className: 'step-title' }, 'Get Results'),
                        e('div', { className: 'step-desc' }, 'See your stats, scores, and outputs instantly with zero server delay.')
                    )
                )
            ),
            // --- NEW: Ultra-Premium Additional Details Section with Images & Flow ---
        e('div', { className: 'detail-row-container' },
            
            // Row 1: Architecture (Image Left, Text Right)
            e('div', { className: 'detail-row animate-fade-up delay-1' },
                e('div', { className: 'detail-image-side' },
                    e('img', { 
                        className: 'detail-img-graphic', 
                        src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80', 
                        alt: 'Next-Gen Architecture Graphic' 
                    })
                ),
                e('div', { className: 'detail-text-side' },
                    e('div', { className: 'step-number' }, '01'),
                    e('h3', { className: 'step-title', style: { fontSize: '1.8rem', marginTop: '10px', background: 'linear-gradient(135deg, #ffffff, #94a3b8)', WebkitBackgroundClip: 'text', color: 'transparent' } }, 'Next-Gen Asynchronous Architecture'),
                    e('p', { className: 'step-desc', style: { fontSize: '1rem', lineHeight: '1.8', marginTop: '15px' } }, 
                        'QuickKit is engineered from the ground up using highly optimized asynchronous runtime loop execution engines. By compiling pure client-side interactivity layers on top of modular structural frameworks, the application completely bypasses standard handshake intervals, guaranteeing zero network latency and seamless browser thread execution.'
                    )
                )
            ),

            // Row 2: Data Isolation (Text Left, Image Right - Reverse)
            e('div', { className: 'detail-row reverse animate-fade-up delay-2' },
                e('div', { className: 'detail-image-side' },
                    e('img', { 
                        className: 'detail-img-graphic', 
                        src: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=800&q=80', 
                        alt: 'Data Security Graphic' 
                    })
                ),
                e('div', { className: 'detail-text-side' },
                    e('div', { className: 'step-number' }, '02'),
                    e('h3', { className: 'step-title', style: { fontSize: '1.8rem', marginTop: '10px', background: 'linear-gradient(135deg, #ffffff, #94a3b8)', WebkitBackgroundClip: 'text', color: 'transparent' } }, 'Absolute End-to-End Data Isolation'),
                    e('p', { className: 'step-desc', style: { fontSize: '1rem', lineHeight: '1.8', marginTop: '15px' } }, 
                        'Unlike typical cloud-reliant utilities that quietly capture your continuous keystrokes, newly generated biographies, or highly sensitive password phrases onto backend cloud arrays, QuickKit enforces cryptographic local cross-origin isolation pipelines. Your personal workspace configurations operate entirely within your sandbox container.'
                    )
                )
            ),

            // Row 3: Interface Design (Image Left, Text Right)
            e('div', { className: 'detail-row animate-fade-up delay-2' },
                e('div', { className: 'detail-image-side' },
                    e('img', { 
                        className: 'detail-img-graphic', 
                        src: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80', 
                        alt: 'UI Layer Graphic' 
                    })
                ),
                e('div', { className: 'detail-text-side' },
                    e('div', { className: 'step-number' }, '03'),
                    e('h3', { className: 'step-title', style: { fontSize: '1.8rem', marginTop: '10px', background: 'linear-gradient(135deg, #ffffff, #94a3b8)', WebkitBackgroundClip: 'text', color: 'transparent' } }, 'Fluid Unified Responsive Engineering'),
                    e('p', { className: 'step-desc', style: { fontSize: '1rem', lineHeight: '1.8', marginTop: '15px' } }, 
                        'Every micro-utility workspace inside our matrix is mapped into a unified fluid display container. Built to respect sub-pixel kerning alignments, modern color-contrast laws, and real-time interface viewport scaling, the platform dynamically reshapes visual components instantly to preserve deep focus and flow.'
                    )
                )
            )
        ),

            // ── CTA BANNER ──
            e('div', { className: 'cta-banner' },
                e('h2', { className: 'cta-title' }, 'Ready to level up?'),
                e('p', { className: 'cta-sub' }, 'Start with the Typing Tester — see your WPM in 60 seconds.'),
                e('button', { className: 'action-btn', onClick: () => navigate('typingtester') }, '🚀 Take the Test Now')
            )
        )
    );
};

// Footer ke parameter mein `Maps` add karein
const Footer = ({ company, navigate }) => {
    return e('footer', { className: 'main-footer' },
        e('div', { className: 'footer-container' },
            /* ... (Brand info waise hi rahega) ... */
            e('div', { className: 'footer-brand-section' },
                e('h3', { className: 'footer-brand-title' }, company),
                e('p', { className: 'footer-brand-desc' }, 'QuickKit is an ultra-premium, zero-latency web toolkit engineered to supercharge your workflow. Test your typing speed, evaluate password strength, and generate aesthetic bios instantly—all inside a high-performance visual interface that respects your absolute data privacy.')
            ),

            // Section 2: Quick Navigation Links (YAHAN CLICKS ADD KARNE HAIN)
            e('div', { className: 'footer-links-column' },
                e('h4', { className: 'footer-column-title' }, 'Quick Navigation'),
                e('ul', { className: 'footer-links-list' },
                    // onClick par navigate call kiya
                    e('li', null, e('button', { className: 'footer-nav-link', onClick: () => navigate('home') }, 'Home')),
                    e('li', null, e('button', { className: 'footer-nav-link', onClick: () => navigate('typingtester') }, 'Typing Tester')),
                    e('li', null, e('button', { className: 'footer-nav-link', onClick: () => navigate('biowriter') }, 'Bio Writer')),
                    e('li', null, e('button', { className: 'footer-nav-link', onClick: () => navigate('passwordchecker') }, 'Password Strength Checker'))
                )
            ),
            /* ... (Baqi legal wala hissa waise hi rahega) ... */

            // Section 3: Legal & Support
            e('div', { className: 'footer-links-column' },
                e('h4', { className: 'footer-column-title' }, 'Legal & Support'),
                e('ul', { className: 'footer-links-list' },
                    e('li', null, e('button', { className: 'footer-nav-link', onClick: () => navigate('contact') }, 'Contact Us')),
                    e('li', null, e('button', { className: 'footer-nav-link', onClick: () => navigate('privacy') }, 'Privacy Policy')),
                    e('li', null, e('button', { className: 'footer-nav-link', onClick: () => navigate('terms') }, 'Terms & Conditions')),
                    e('li', null, e('button', { className: 'footer-nav-link', onClick: () => navigate('about') }, 'About'))
                )
            )
        ),

        // Bottom Meta Credits
        e('div', { className: 'footer-bottom-bar' },
            e('p', { className: 'copyright-text' }, `Copyright © 2026 ${company}. All rights reserved.`),
            e('p', { className: 'creator-credits' }, 'Created with ❤️ by Paras')
        )
    );
};

// 4. Principal Main Application Container
// 4. Principal Main Application Container
// 4. Principal Main Application Container
// 4. Principal Main Application Container
const App = () => {
    const [siteName] = useState('QuickKit');
    const [theme, setTheme] = useState('dark');
    const [currentPage, setCurrentPage] = useState('home');

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
    };

    const navigate = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    // Conditional Rendering Logic for multi-pages
    let currentView;
    if (currentPage === 'home') {
        currentView = e(Home, { navigate: navigate }); // Home render hoga default
    } else if (currentPage === 'typingtester') {
        currentView = e(Content); // Content ab Typing Tester ban gaya
    } else if (currentPage === 'biowriter') {
        currentView = e(BioWriter);
    } else if (currentPage === 'passwordchecker') {
        currentView = e(PasswordChecker);
    } else if (currentPage === 'about') {
        currentView = e(About);
    } else if (currentPage === 'terms') {
        currentView = e(TermsConditions);
    } else if (currentPage === 'privacy') {
        currentView = e(PrivacyPolicy);
    } else if (currentPage === 'contact') {
        currentView = e(ContactUs);
    } else {
        currentView = e(Home, { navigate: navigate }); // Fallback bhi Home
    }

    return e('div', { className: `app-container ${theme}-theme` },
        e(Header, { title: siteName, theme, toggleTheme }),
        currentView,
        e(Footer, { company: siteName, navigate: navigate })
    );
};

// Injection into DOM
const rootElement = document.getElementById('root');
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(e(React.StrictMode, null, e(App)));
}