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
// --- UPDATED: Bio Writer Component with 10+ Templates & Non-Repeating Logic ---
const BioWriter = () => {
    // Name aur Field dono ke liye states
    const [userName, setUserName] = useState('');
    const [field, setField] = useState('');
    const [generatedBio, setGeneratedBio] = useState('');

    const handleGenerate = () => {
        if (!userName.trim() || !field.trim()) return;

        // User ke input ko lowercase mein convert kar rahe hain taake matching aasani se ho sake
        const professionLower = field.trim().toLowerCase();

        // 1. MEDICAL / DOCTOR FIELD TEMPLATES (10 Variations)
        const doctorTemplates = [
            `Nordic Healthcare Professional | My name is ${userName} and I am a dedicated ${field}. Committed to patient care, medical excellence, and clinical innovation. Transforming healthcare with empathy and precision. 🌟`,
            `✨ Driven by healing, guided by science. I'm ${userName}, a professional ${field}. Specializing in diagnostics, medical research, and compassionate patient wellness. 🏥`,
            `🩺 Lifesaver mode: ON. I am ${userName}, practicing as a ${field}. Healing hands, caring heart, and a mind dedicated to medical breakthroughs. 🩺`,
            `🌟 Medical Excellence & Empathy | Hello! I am ${userName}, a proud ${field}. Balancing cutting-edge medical procedures with deep patient care. 💊`,
            `🔬 Stethoscopes, scrubs, and clinical precision. I'm ${userName}, your friendly neighborhood ${field}. Making the world healthier, one patient at a time. 🩺`,
            `🏥 Healthcare Architect | I am ${userName}, working as a passionate ${field}. Specializing in emergency response, internal medicine, and critical patient care. ✨`,
            `🌿 Healing with compassion. I am ${userName}, a certified ${field}. Dedicated to bringing wellness, smiles, and healthier lives to our community. 💖`,
            `🧬 Medicine is an art, and I'm ${userName}, a dedicated ${field} painting a healthier future. Focus: Clinical trials, diagnostics, and patient safety. 📊`,
            `⚡ Saving lives and chasing smiles. Meet ${userName}, a high-performance ${field} navigating the frontlines of modern medical science. 🏥`,
            `🎯 Precision in diagnosis, warmth in treatment. I am ${userName}, serving proudly as a ${field}. Your health is my lifelong mission. 🌟`
        ];

        // 8a. TEACHER / EDUCATOR TEMPLATES (10 Variations)
        const teacherTemplates = [
            `📚 Shaping Minds & Inspiring Futures | I am ${userName}, a passionate ${field}. Dedicated to cultivating knowledge, fostering curiosity, and empowering the next generation. 🎓`,
            `✨ Education is the movement from darkness to light. My name is ${userName}, working as a dedicated ${field}. Mentoring students and building strong intellectual foundations. 📝`,
            `🎓 Classroom leader mode: ON. I'm ${userName}, your friendly ${field}. Lesson plans, grading scales, and a heart devoted to student success. 🍎`,
            `🌟 Academic Excellence & Mentorship | Hello! I am ${userName}, a proud ${field}. Combining modern pedagogy with interactive teaching methods. 📖`,
            `💡 Igniting young minds one lesson at a time. Meet ${userName}, an enthusiastic ${field} navigating the frontlines of modern education. 🏫`,
            `🏫 Knowledge Architect | I am ${userName}, serving as a ${field}. Specializing in curriculum design, cognitive growth, and classroom management. ✨`,
            `🌱 Planting seeds of knowledge that grow forever. I am ${userName}, a certified ${field}. Bringing smiles, clarity, and education to our community. 💖`,
            `📐 Teaching is an art, and I'm ${userName}, a professional ${field} scripting a brighter future. Focus: Conceptual learning and student development. 📊`,
            `⚡ Empowering voices through education. Meet ${userName}, a high-performance ${field} breaking down complex concepts effortlessly. 🏫`,
            `🎯 Precision in explanation, warmth in guidance. I am ${userName}, serving proudly as a ${field}. Your academic growth is my lifelong mission. 🌟`
        ];

        // 8b. MECHANIC / AUTOMOTIVE TECHNICIAN TEMPLATES (10 Variations)
        const mechanicTemplates = [
            `🔧 Precision Grease Monkey | I am ${userName}, an expert ${field}. Diagnosing engine faults, tuning horsepower, and keeping heavy machinery running smoothly. 🚗`,
            `⚙️ Engineering on the asphalt. My name is ${userName}, working as an experienced ${field}. Wrenches, gearboxes, and absolute mechanical precision. 🛠️`,
            `🏎️ Performance tuning & custom builds. I'm ${userName}, a professional ${field}. Fixing internal combustion loops and restoring classic engines to life. ⚡`,
            `🚀 High-torque troubleshooting. Meet ${userName}, a practical ${field} bridging the gap between electronic diagnostics and heavy metal gear execution. 🛠️`,
            `🔩 Torque wrenches, bolts, and system overhauls. I am ${userName}, a dedicated ${field}. Optimizing automotive performance and structural alignment. ⚙️`,
            `🔋 Powering mechanical reliability. My name is ${userName}, an elite ${field} handling everything from brake systems to suspension matrix modifications. 🔧`,
            `🌟 If it's broken, I fix it. I'm ${userName}, a qualified ${field} focused on hydraulic systems, custom engine blueprints, and total vehicle safety. 📐`,
            `⚡ Spark plugs, timing belts, and pure mechanical logic. Meet ${userName}, a deep-tech ${field} redefining automotive reliability. 🛠️`,
            `💡 Transforming raw mechanical friction into smooth acceleration. I am ${userName}, a standard-setting ${field} crafting premium repair solutions. ⚡`,
            `🚗 Master of the garage workshop. My name is ${userName}, working as a progressive ${field}. Shaping automotive performance every single day. 🚀`
        ];

        // 8c. YOUTUBER TEMPLATES (10 Variations)
        const youtuberTemplates = [
            `🎥 Press Play on Premium Content | Hey everyone, I'm ${userName}, a full-time ${field}. Scripting, filming, and editing high-retention videos for my amazing subscribers. 🚀`,
            `🔔 Don't forget to subscribe! My name is ${userName}, an independent ${field}. Reviewing tech, vlogging daily, and decoding the YouTube algorithm. 🎬`,
            `🌟 High-retention digital storyteller. I am ${userName}, working as a creative ${field}. Creating custom thumbnails, render pipelines, and viral video structures. 🎥`,
            `🚀 Smashing that like button daily. Meet ${userName}, a professional ${field} building an organic audience community through video monetization frameworks. 📸`,
            `💎 Render buffers, standard frame rates, and 4K sequences. I'm ${userName}, a passionate ${field}. Bringing cinematic value to your subscription feed. 📊`,
            `🎬 From conceptual scripting to final export rendering. My name is ${userName}, a high-energy ${field}. Welcome to my official creative hub. ✨`,
            `⚡ Attention retention architect. I am ${userName}, a viral ${field} generating premium informational and entertaining content arrays daily. 🎥`,
            `🎯 Cultivating genuine digital connections. Meet ${userName}, a content-driven ${field}. Elevating casual viewers into a powerful global community. 🔥`,
            `🎨 Creative director of my own digital channel space. I am ${userName}, an independent ${field} dropping new videos every week. Stay tuned! 🚀`,
            `🌟 Capturing reality through a wide-angle lens. My name is ${userName}, working as a progressive ${field}. Transforming ideas into global internet streams. 🎬`
        ];

        // 8d. TIKTOKER TEMPLATES (10 Variations)
        const tiktokerTemplates = [
            `⚡ Catch Me On Your FYP! | Hello! I'm ${userName}, a dynamic ${field}. Dropping viral transitions, short-form lifestyle aesthetics, and trending audios. 🚀`,
            `✨ Hyper-retention vertical video creator. My name is ${userName}, working as an engaging ${field}. Cultivating massive organic community growth. 💎`,
            `📱 Pushing the boundaries of 15-second entertainment. I am ${userName}, a full-time ${field}. Tracking algorithmic sounds and lighting up your feed. 🌟`,
            `🚀 Curating micro-trends and lifestyle edits. Meet ${userName}, a professional ${field} dominating mobile screen interfaces globally. 📸`,
            `🔥 Vertical loop visual specialist. I'm ${userName}, a high-performance ${field} crafting seamless cuts and high-impact organic trends. 📈`,
            `🌟 Quick cuts, neon color gradients, and algorithmic pacing. My name is ${userName}, working as a digital ${field}. Spreading positive vibes daily. 🎨`,
            `💎 Hooking your attention in the first 2 seconds. I am ${userName}, a native short-form ${field}. Merging audio trends with aesthetic visuals. ⚡`,
            `🎨 Creative cell-phone cinema director. Meet ${userName}, a global ${field} sharing real, raw, and highly engaging vertical micro-stories. 🚀`,
            `🎯 Influencing modern mobile sub-cultures. I am ${userName}, a trending ${field}. Elevating casual swipers into loyal community fans. 🔥`,
            `🎬 Press tap for high-energy mobile entertainment. My name is ${userName}, working as an independent ${field}. Catch my next transition video! ✨`
        ];

        // 2. ENGINEERING FIELD TEMPLATES (10 Variations)
        const engineeringTemplates = [
            `🛠️ Problem Solver & Innovator | I am ${userName}, an analytical ${field}. Turning blueprints into reality, optimizing complex machinery, and architecting sustainable designs. 🚀`,
            `⚙️ Engineering the future, one project at a time. My name is ${userName}, working as an enthusiastic ${field}. Focused on technical precision and cutting-edge mechanisms. 📐`,
            `📐 Code, steel, and concrete structures. I'm ${userName}, an ambitious ${field}. Designing infrastructure and deploying systems that withstand time. ⚡`,
            `🚀 Innovation in every dimension. Meet ${userName}, a professional ${field} bridging the gap between imaginative designs and real-world execution. 🛠️`,
            `💻 System Architect & Engineer | I am ${userName}, a dedicated ${field}. Optimizing industrial systems, structural designs, and automated pipelines. ⚙️`,
            `🔋 Powering progress through design. My name is ${userName}, an expert ${field} creating resilient systems and smart mechanical integrations. 🔧`,
            `🌟 Building what matters. I'm ${userName}, a qualified ${field} focused on high-efficiency projects, advanced analytics, and technical blueprints. 📐`,
            `🔬 Mechanics, equations, and absolute logic. Meet ${userName}, a deep-tech ${field} redefining the benchmarks of structural engineering. 🛠️`,
            `💡 Transforming complex physics into seamless utility. I am ${userName}, a practical ${field} crafting standard-setting industrial solutions. ⚡`,
            `🎨 Where creativity meets physical math. My name is ${userName}, working as a progressive ${field}. Shaping tomorrow's landscape today. 🚀`
        ];

        // 3. BBA / BUSINESS / MANAGEMENT FIELD TEMPLATES (10 Variations)
        const businessTemplates = [
            `📊 Strategist & Business Leader | Hello! I'm ${userName}, a sharp ${field}. Driving corporate growth, optimizing financial models, and scaling performance. 📈`,
            `💼 Corporate Mindset | I am ${userName}, working in the field of ${field}. Specializing in brand management, operations strategy, and data analytics. 🎯`,
            `💸 Capitalist heart, analytical mind. I'm ${userName}, a dynamic ${field}. Building startups, liquidating portfolios, and crushing quarterly KPIs. 📈`,
            `🔥 Entrepreneurial Spirit | Meet ${userName}, a visionary ${field}. Merging corporate strategy with disruptive marketing campaigns to scale global brands. 🚀`,
            `👑 Master of Management | I am ${userName}, an expert ${field}. Streamlining supply chains, driving venture capital investments, and building market authority. 📊`,
            `🤝 Negotiation & Growth Hacking | Hello, I'm ${userName}, a results-driven ${field}. Creating high-ROI opportunities and engineering financial synergy. 💎`,
            `🌟 Corporate Consultant | My name is ${userName}, a qualified ${field}. Redefining fiscal strategies, operational logic, and organizational health. 💼`,
            `📈 Scaling ventures from zero to millions. Meet ${userName}, an elite ${field}. Focus on data-driven business modeling and strategic leadership. 🎯`,
            `🎯 Execution is everything. I am ${userName}, a market-savvy ${field}. Transforming traditional business operations into hyper-profitable assets. 🔥`,
            `💎 Premium asset manager and corporate advisor. I'm ${userName}, working full-time as a ${field}. Shaping the dynamics of modern commerce. 💼`
        ];

        // 4. DEVELOPMENT / CODING FIELD TEMPLATES (10 Variations)
        const developerTemplates = [
            `💻 Full-Stack Architecture | I'm ${userName}, a high-performance ${field}. Turning complex logic into fluid browser tabs, writing scalable microservices, and debugging the web. ⚡`,
            `🚀 Digital Craftsman | My name is ${userName}, a creative ${field}. Building responsive interfaces, working locally with ultra-low latency frameworks, and pushing pixels to production. 🎨`,
            `👾 Compiling dreams into reality. I am ${userName}, an elite ${field}. Eating syntax errors for breakfast and pushing production-ready micro-apps. 💻`,
            `🔒 Cyber-minded logic wrangler. Meet ${userName}, a fast-paced ${field}. Writing clean, secure, open-source code and decoupling legacy monoliths. ⚡`,
            `🎨 UI/UX focused engineer. I'm ${userName}, a frontend-native ${field}. Crafting premium web layouts, smooth animations, and zero-latency user workspaces. 🚀`,
            `🌐 Cloud Native Architect | My name is ${userName}, a modern ${field}. Spinning up serverless clusters, orchestrating APIs, and managing local sandboxes. 🛠️`,
            `☕ Coffee in, production code out. Meet ${userName}, an agile ${field} dedicated to automation, reactive state management, and semantic elements. 💻`,
            `⚡ Performance optimization specialist. I am ${userName}, a tech-driven ${field} fixing layout shifts, memory leaks, and render blockers. 🎨`,
            `🚀 Coding with sub-pixel perfection. My name is ${userName}, working as a high-end ${field}. Building web utilities to supercharge daily workflows. 🔥`,
            `🧠 AI & Algorithm Enthusiast | I'm ${userName}, a progressive ${field}. Mapping computational models, training custom pipelines, and refining client logic. 🤖`
        ];

        // 5. ARMY / MILITARY TEMPLATES (10 Variations)
        const armyTemplates = [
            `🎖️ Serving with Honor | I am ${userName}, a disciplined ${field} in the armed forces. Guarding the nation, defending freedom, and living by loyalty. ⚔️`,
            `🦁 Courage over fear, duty before self. My name is ${userName}, working proudly as an active ${field}. Standing tall on the frontlines. 🪖`,
            `🪖 Tactical precision, absolute discipline. I'm ${userName}, a dedicated ${field}. Trained to lead, born to protect, and bound by ultimate honor. 🎖️`,
            `⚔️ Professional Warrior | Meet ${userName}, an elite ${field}. Defending sovereignty, executing high-stakes tactical deployments, and maintaining peace. 🛡️`,
            `🦅 Sky is the limit, nation is the priority. I am ${userName}, working as a resilient ${field}. Proud member of the defense matrix. 🪖`,
            `🛡️ Integrity, resilience, and valor. My name is ${userName}, serving my country as a active ${field}. Freedom isn't free, we guard it. 🎖️`,
            `⚡ Elite operational mindset. I am ${userName}, a trained ${field}. Specializing in strategic operations, safety logistics, and defense deployments. ⚔️`,
            `🌟 Born to serve, sworn to protect. Meet ${userName}, an official ${field}. Living a life of extreme challenge, core discipline, and national pride. 🪖`,
            `🔥 Iron will, steel brotherhood. I am ${userName}, a passionate ${field}. Operating under high-pressure scenarios to keep our borders secure. 🦅`,
            `🎖️ Guardian of the realm. My name is ${userName}, serving as a tactical ${field}. Loyalty to the flag, commitment to the mission. 🛡️`
        ];

        // 6. POLICE / LAW ENFORCEMENT TEMPLATES (10 Variations)
        const policeTemplates = [
            `👮 To Protect & To Serve | I am ${userName}, a vigilant ${field}. Maintaining law and order, securing neighborhoods, and fighting crime daily. 🚔`,
            `🚨 Law Enforcement Professional | My name is ${userName}, working as a ${field}. Upholding justice with transparency, integrity, and extreme courage. 🛡️`,
            `🚔 City guardian mode active. I'm ${userName}, your local ${field}. Keeping our streets safe, investigating cases, and implementing justice. 🚨`,
            `⚖️ Shielding the innocent, arresting the lawbreakers. Meet ${userName}, a frontline ${field}. Dedicated to community safety and public order. 👮`,
            `🛡️ Badge of honor, heart of justice. I am ${userName}, a professional ${field}. Standing against crime and fostering peaceful communities. 🚔`,
            `🚨 Crime investigator & tracker. My name is ${userName}, working passionately as a ${field}. Cracking complex cases and restoring public trust. ⚖️`,
            `👮 Community protector. I'm ${userName}, serving diligently as a ${field}. Building bridges between law enforcement and citizens for a safer tomorrow. 🌟`,
            `⚡ High-alert tactical responder. Meet ${userName}, an active ${field}. Managing emergency interventions and neutralizing urban security threats. 🚔`,
            `🎯 Justice is non-negotiable. I am ${userName}, a standard-setting ${field}. Pledging my life to counter crime and corruption. 🛡️`,
            `🚨 Zero tolerance for chaos. My name is ${userName}, executing operations as a dedicated ${field}. Patrolling the grid to keep you secure. 👮`
        ];

        // 7. ACTOR / PERFORMING ARTS TEMPLATES (10 Variations)
        const actorTemplates = [
            `🎭 Storyteller & Performer | I am ${userName}, a versatile ${field}. Breathing life into characters, mastering scripts, and lighting up the screen. 🎬`,
            `✨ Lights, Camera, Expression! My name is ${userName}, working as a professional ${field}. Capturing emotions and defining cinematic moments. 🌟`,
            `🎬 Living a thousand lives in one. I'm ${userName}, a dedicated ${field}. From theatrical drama to silver screen blockbusters, acting is my soul. 🎭`,
            `🌟 Creative Artist & Entertainer | Meet ${userName}, an expressive ${field}. Transforming dynamic scripts into unforgettable cinematic experiences. 🎥`,
            `🎭 Methods, expressions, and deep monologues. I am ${userName}, a passionate ${field} always chasing the perfect shot. 🎬`,
            `🎥 Cinematic Craftsman | My name is ${userName}, a freelance ${field}. Exploring indie cinemas, commercial dramas, and powerful character arts. ✨`,
            `🔥 The stage is my playground. I'm ${userName}, a trained ${field}. Connecting audiences with raw human emotions and artistic storytelling. 🎭`,
            `✨ Red carpets and rigorous screen auditions. Meet ${userName}, a rising ${field}. Dedicated to authentic acting and visual excellence. 🎬`,
            `🎬 Bringing words to life from script to screen. I am ${userName}, an innovative ${field}. Shaping cultural narratives through media. 🎥`,
            `💎 Pure performance artist. My name is ${userName}, serving as a cinematic ${field}. Creating timeless art, one scene at a time. 🌟`
        ];
        // 8e. POLITICIAN / PUBLIC LEADER TEMPLATES (10 Variations)
        const politicianTemplates = [
            `🏛️ Serving the People, Shaping the Nation | I am ${userName}, a dedicated ${field}. Committed to public welfare, policy reform, and transparent governance. 🇵🇰`,
            `🌟 Leadership is action, not position. My name is ${userName}, working as a progressive ${field}. Voice of the community, driving grassroots development. 📢`,
            `📈 Building a stronger future together. I'm ${userName}, your local ${field}. Focusing on economic stability, social justice, and public empowerment. 🏛️`,
            `🤝 Driven by integrity, united by purpose. Meet ${userName}, an active ${field} striving to bring positive change and policy execution to our society. ✨`,
            `💡 Empowering citizens, amplifying voices. I am ${userName}, serving proudly as a ${field}. Dedicated to community leadership and political strategy. 🏛️`,
            `🌍 Strategic governance and social equity. My name is ${userName}, a passionate ${field}. Working around the clock for legislative reforms and public advocacy. 🗳️`,
            `🗳️ Democracy in action. I'm ${userName}, a community-driven ${field}. Transforming public trust into real-world developmental progress. 🏛️`,
            `⚡ Visionary leadership for a brighter tomorrow. Meet ${userName}, a visionary ${field}. Focusing on state policy analysis, human rights, and public welfare. 🌟`,
            `🎯 Accountability, development, and progress. I am ${userName}, an independent ${field} working toward systemic transparency and institutional strength. 📈`,
            `🏛️ Dedicated to the service of our constituency. My name is ${userName}, working actively as a ${field}. Let's build a prosperous future together. 🤝`
        ];

        // 8f. CRICKETER / CRICKET PLAYER TEMPLATES (10 Variations)
        const cricketerTemplates = [
            `🏏 Bleeding Green & Chasing Targets | I am ${userName}, a passionate ${field}. Living life 22 yards at a time, timing boundaries, and winning matches. 🔥`,
            `⚡ Middle of the bat consistency. My name is ${userName}, playing as a professional ${field}. Fast bowling formulas, spin variations, and match-winning knocks. 🏆`,
            `🏆 Hard work, discipline, and cricket logic. I'm ${userName}, an elite ${field}. From net practice routines to high-pressure stadium finishes. 🏏`,
            `🔥 Swing king / Power hitter mode: ALWAYS ON. Meet ${userName}, a dedicated ${field} mastering the art of modern-day cricket execution. 🌟`,
            `🏏 Cricket isn't just a game, it's an emotion. I am ${userName}, a standard-setting ${field}. Focused on athletic fitness, tactical field placement, and clean striking. ⚡`,
            `🎯 Precision line and length, flawless cover drives. My name is ${userName}, an active ${field} contributing to team victory through raw athletic performance. 🏆`,
            `🌟 Stadium lights, roaring crowds, pure adrenaline. I'm ${userName}, a competitive ${field}. Scripting glory for my team, one ball at a time. 🏏`,
            `📈 Tactical cricket brain. Meet ${userName}, a professional ${field} managing strike rates, bowling economies, and high-performance sports training. ⚡`,
            `💎 Pure talent meets endless grind. I am ${userName}, a registered ${field}. Dominating tournaments and elevating sportsmanship standards. 🏆`,
            `🏏 Pad up, guard on, ready to conquer. My name is ${userName}, working and playing as a dynamic ${field}. Catch me live on the pitch! 🔥`
        ];

        // 8g. FOOTBALLER / SOCCER PLAYER TEMPLATES (10 Variations)
        const footballerTemplates = [
            `⚽ Ninety Minutes of Pure Passion | I am ${userName}, a high-octane ${field}. Tactical dribbles, clean clean-sheets, and top-corner finishes. 🏃‍♂️`,
            `⚡ Speed, stamina, and standard goal execution. My name is ${userName}, working as a professional ${field}. Living for the beautiful game. 🏆`,
            `🏆 Total pitch domination. I'm ${userName}, an elite ${field}. Tactical playmaking, defensive matrix setups, and high-retention ball control. ⚽`,
            `🏃‍♂️ Training hard in silence, shining on match day. Meet ${userName}, a dedicated ${field} pushing the physical and tactical boundaries of football. 🔥`,
            `💎 Striker instinct, midfielder vision, defender grit. I am ${userName}, a certified ${field}. Chasing trophies and building athletic history. ⚽`,
            `⚡ From the training ground to the championship league. My name is ${userName}, a competitive ${field}. Nutmegs, assists, and high-energy pressing. 🏆`,
            `🎯 Boot physics and perfect tactical positioning. I'm ${userName}, a progressive ${field} engineering victory through teamwork and intense training. 🏃‍♂️`,
            `🌟 Roaring stadiums, standard 4-3-3 formations. Meet ${userName}, an agile ${field} dedicated to sports performance and visual entertainment. ⚽`,
            `🔥 Work hard, play fair, score goals. I am ${userName}, an independent ${field}. Transforming strategic formations into real-world match wins. 🏆`,
            `⚽ Lace up the boots, hear the whistle, dominate. My name is ${userName}, working proudly as a tactical ${field}. The pitch is my kingdom. 🏃‍♂️`
        ];

        // 8h. CARPENTER / WOODWORKING ARTISAN TEMPLATES (10 Variations)
        const carpenterTemplates = [
            `🪚 Crafting Wood into Fine Art | I am ${userName}, a professional ${field}. Saws, chisels, sanders, and bespoke furniture engineering. 🪵`,
            `📐 Measure twice, cut once. My name is ${userName}, working as a traditional ${field}. Custom cabinetry, structural layout framing, and wooden blueprints. 🛠️`,
            `🪵 Bringing raw timber to life. I'm ${userName}, an experienced ${field}. Transforming solid oak and walnut into premium, durable living space utilities. ✨`,
            `🔨 Hardwood aesthetics and structural precision. Meet ${userName}, a dedicated ${field} specializing in vintage restoration and modern joinery. 🪚`,
            `⚡ Power tools, routing matrices, and flawless wood finish. I am ${userName}, a standard-setting ${field} sculpting architectural wood structures. 🛠️`,
            `🏠 Transforming houses into homes with custom woodwork. My name is ${userName}, a qualified ${field}. Handcrafted furniture with lifetime durability guarantees. 🪵`,
            `🎨 Creative wood design architect. I'm ${userName}, an independent ${field}. Merging geometric alignment with pure organic timber textures. 🪚`,
            `📐 Wood shavings, dovetail joints, and pure manual layout logic. Meet ${userName}, a progressive ${field} redefining manual craftsmanship. 🛠️`,
            `🌟 If you can dream it, I can build it in wood. I am ${userName}, a premium ${field}. Custom closets, modular kitchens, and structural roofing. 🪵`,
            `🪚 Master of the woodworking studio shop. My name is ${userName}, working as an elite ${field}. Designing heritage items, one block at a time. 🔨`
        ];

        // 8i. MANUFACTURER / INDUSTRIAL PRODUCER TEMPLATES (10 Variations)
        const manufacturerTemplates = [
            `🏭 Driving Industrial Innovation & Scale | I am ${userName}, a professional ${field}. Supply chain optimization, assembly line engineering, and bulk production. 🚀`,
            `⚙️ Transforming raw materials into global consumer goods. My name is ${userName}, working as a progressive ${field}. Quality control and plant automation. 📊`,
            `🏭 High-output fabrication matrix. I'm ${userName}, an elite ${field}. Managing inventory workflows, industrial machinery setups, and production lines. 🛠️`,
            `🚀 Mass production with zero compromise on precision. Meet ${userName}, a leading ${field} scaling industrial operations and manufacturing plants. ⚙️`,
            `📦 Factory floors, lean manufacturing, and global standard safety. I am ${userName}, a dedicated ${field} designing high-efficiency manufacturing pipelines. 🏭`,
            `⚡ Engineering the goods that power our economy. My name is ${userName}, an experienced ${field}. From prototype design blueprints to bulk cargo distribution. 📈`,
            `🌟 Scaling local industries to global market heights. I'm ${userName}, a qualified ${field} focusing on sustainable raw material processing. 🏭`,
            `⚙️ Plant operations, supply chain metrics, and automated output arrays. Meet ${userName}, a high-performance ${field} managing industrial logistics. 🔧`,
            `💡 Innovation on the assembly line. I am ${userName}, a standard-setting ${field}. Redefining product manufacturing, tool calibration, and material yield. 📊`,
            `🏭 Industrial scale architect. My name is ${userName}, working actively as a ${field}. Shaping commercial consumer landscapes every single day. 🚀`
        ];
        // 8. INFLUENCER / CONTENT CREATOR TEMPLATES (10 Variations)
        const influencerTemplates = [
            `📸 Digital Creator & Trendsetter | Hello! I'm ${userName}, a dynamic ${field}. Sharing lifestyle insights, building a viral community, and creating impact. 🚀`,
            `✨ Cultivating authentic digital vibes. My name is ${userName}, working as an engaging ${field}. Curating aesthetics and building premium brand partnerships. 💎`,
            `🎥 Content King/Queen | I am ${userName}, a full-time ${field}. Pushing creative boundaries, editing viral reels, and inspiring millions daily. 🌟`,
            `🚀 Monetizing my lifestyle and aesthetic ideas. Meet ${userName}, a professional ${field}. Focus: Tech reviews, travel vlogs, and daily vlogs. 📸`,
            `💎 Niche authority & community builder. I'm ${userName}, a proud ${field}. Connecting brands with hyper-engaged organic audiences worldwide. 📈`,
            `🌟 Storytelling via grid aesthetics. My name is ${userName}, working as a digital ${field}. Spreading positivity, trends, and smart lifestyles. 🎨`,
            `⚡ Attention architect. I am ${userName}, a viral ${field}. Merging visual arts with data analytics to dominate social media algorithms. 📊`,
            `🎨 Creative director of my own brand space. Meet ${userName}, a global ${field}. Sharing unfiltered real stories and aesthetic journeys. 🚀`,
            `🎯 Influencing cultures, inspiring mindsets. I am ${userName}, a leading ${field}. Elevating casual viewers into a powerful community. 🔥`,
            `🎬 Press play on premium digital experiences. My name is ${userName}, working as an independent ${field}. Catch my latest lifestyle dropping soon! ✨`
        ];

        // 9. GENERAL / FALLBACK TEMPLATES (10 Variations)
        const generalTemplates = [
            `✨ Creative Mind | Hey, I'm ${userName}! A passionate ${field} crafting impactful workflows, solving complex problems, and turning ideas into reality. 🚀`,
            `🎯 Professional Profile | Driven. Innovative. Dedicated. I am ${userName}, specializing as a ${field} with a focus on operational efficiency. 🔥`,
            `🌟 Hustle, heart, and high performance. Meet ${userName}, working full-time as a ${field}. Always learning, growing, and scaling limits. 💎`,
            `💡 Idea Generator & Executor | Hello world! I am ${userName}, an independent ${field}. Bridging creative vision with pixel-perfect execution. ⚡`,
            `🚀 Modern Practitioner | My name is ${userName}, managing projects as a ${field}. Dedicated to absolute precision and game-changing solutions. ✨`,
            `🔥 Focused on impact, driven by results. I'm ${userName}, an ambitious ${field} continuously updating my skill arrays to lead my niche. 🎯`,
            `💎 Elite productivity enthusiast. Hello, I am ${userName}, a certified ${field}. Optimizing workflows and maintaining zero downtime. 🚀`,
            `🌿 Living intentionally, working professionally. My name is ${userName}, making a difference as a standard-setting ${field}. Let's build! 🌟`,
            `📊 Analytical vision, creative output. Meet ${userName}, an adaptable ${field} turning raw problems into polished success blueprints. 🔧`,
            `⚡ Breaking boundaries, setting new trends. I am ${userName}, a passionate ${field}. Welcome to my official professional workspace. 💼`
        ];

        // Dynamic Field Matching System
        let selectedTemplates = generalTemplates; // Default sets to general

        if (professionLower.includes('doctor') || professionLower.includes('medical') || professionLower.includes('mbbs') || professionLower.includes('nurse')) {
            selectedTemplates = doctorTemplates;
        } else if (professionLower.includes('engineer') || professionLower.includes('mechanical') || professionLower.includes('civil') || professionLower.includes('electrical')) {
            selectedTemplates = engineeringTemplates;
        } else if (professionLower.includes('bba') || professionLower.includes('business') || professionLower.includes('manager') || professionLower.includes('finance') || professionLower.includes('marketing')) {
            selectedTemplates = businessTemplates;
        } else if (professionLower.includes('developer') || professionLower.includes('coder') || professionLower.includes('programmer') || professionLower.includes('software') || professionLower.includes('web')) {
            selectedTemplates = developerTemplates;
        } else if (professionLower.includes('army') || professionLower.includes('military') || professionLower.includes('soldier') || professionLower.includes('airforce') || professionLower.includes('navy')) {
            selectedTemplates = armyTemplates;
        } else if (professionLower.includes('police') || professionLower.includes('cop') || professionLower.includes('inspector') || professionLower.includes('constable')) {
            selectedTemplates = policeTemplates;
        } else if (professionLower.includes('actor') || professionLower.includes('actress') || professionLower.includes('hero') || professionLower.includes('theatre') || professionLower.includes('model')) {
            selectedTemplates = actorTemplates;
        } else if (professionLower.includes('influencer') || professionLower.includes('creator') || professionLower.includes('vlogger') || professionLower.includes('blogger') || professionLower.includes('youtuber')) {
            selectedTemplates = influencerTemplates;
        } else if (professionLower.includes('teacher') || professionLower.includes('educator') || professionLower.includes('professor') || professionLower.includes('lecturer') || professionLower.includes('school')) {
            selectedTemplates = teacherTemplates;
        } else if (professionLower.includes('mechanic') || professionLower.includes('repair') || professionLower.includes('automotive') || professionLower.includes('car') || professionLower.includes('technician')) {
            selectedTemplates = mechanicTemplates;
        } else if (professionLower.includes('youtuber') || professionLower.includes('youtube') || professionLower.includes('channel') || professionLower.includes('vlog')) {
            selectedTemplates = youtuberTemplates;
        } else if (professionLower.includes('tiktoker') || professionLower.includes('tiktok') || professionLower.includes('reel') || professionLower.includes('shorts')) {
            selectedTemplates = tiktokerTemplates;
        } else if (professionLower.includes('politician') || professionLower.includes('leader') || professionLower.includes('minister') || professionLower.includes('mna') || professionLower.includes('mpa')) {
            selectedTemplates = politicianTemplates;
        } else if (professionLower.includes('cricketer') || professionLower.includes('cricket') || professionLower.includes('batsman') || professionLower.includes('bowler')) {
            selectedTemplates = cricketerTemplates;
        } else if (professionLower.includes('footballer') || professionLower.includes('football') || professionLower.includes('soccer') || professionLower.includes('player')) {
            selectedTemplates = footballerTemplates;
        } else if (professionLower.includes('carpenter') || professionLower.includes('wood') || professionLower.includes('furniture') || professionLower.includes('carpentry')) {
            selectedTemplates = carpenterTemplates;
        } else if (professionLower.includes('manufacturer') || professionLower.includes('factory') || professionLower.includes('manufacturing') || professionLower.includes('production')) {
            selectedTemplates = manufacturerTemplates;
        } else {
            selectedTemplates = generalTemplates;
        }

        // --- NON-REPEATING LOGIC: Loop tab tak chalay ga jab tak purani bio se match na kare ---
        let finalBio = '';
        let securityCounter = 0; // Infinite loop protection layer

        do {
            finalBio = selectedTemplates[Math.floor(Math.random() * selectedTemplates.length)];
            securityCounter++;
        } while (finalBio === generatedBio && selectedTemplates.length > 1 && securityCounter < 20);

        setGeneratedBio(finalBio);
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
                        placeholder: 'Enter your profession (e.g., Doctor, Army, Influencer)',
                        value: field,
                        onChange: (event) => setField(event.target.value)
                    })
                )
            ),

            // Generate Button
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
// --- NEW: Password Strength Checker Component (Strict Version with Suggestion) ---
const PasswordChecker = () => {
    const [password, setPassword] = useState('');
    const [suggestedPassword, setSuggestedPassword] = useState('');

    // Secure Password Generator Logic
    const generateSuggestion = () => {
        const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lowercase = "abcdefghijklmnopqrstuvwxyz";
        const numbers = "0123456789";
        const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
        const allChars = uppercase + lowercase + numbers + symbols;

        let pass = "";
        // Yeh ensure karega ke rules satisfy hon (1 Upper, 1 Lower, 1 Num, 1 Symbol)
        pass += uppercase[Math.floor(Math.random() * uppercase.length)];
        pass += lowercase[Math.floor(Math.random() * lowercase.length)];
        pass += numbers[Math.floor(Math.random() * numbers.length)];
        pass += symbols[Math.floor(Math.random() * symbols.length)];

        // Baki length pure random pool se generate hogi (Total Length: 14)
        for (let i = 0; i < 10; i++) {
            pass += allChars[Math.floor(Math.random() * allChars.length)];
        }

        // Generated text array ko random array shuffle algorithm se pass kiya
        const shuffledPass = pass.split('').sort(() => 0.5 - Math.random()).join('');
        setSuggestedPassword(shuffledPass);
    };

    // Ultra-Strict Strength Evaluator Matrix
    const getStrength = (pass) => {
        if (!pass) return { score: 0, text: 'Empty', color: '#64748b' };

        let score = 0;
        if (pass.length >= 12) score++;          // Rule 1: Min 12 chars strict rule
        if (/[A-Z]/.test(pass)) score++;         // Rule 2: Capital Letter
        if (/[a-z]/.test(pass)) score++;         // Rule 3: Lowercase Letter
        if (/[0-9]/.test(pass)) score++;         // Rule 4: Numbers
        if (/[^A-Za-z0-9]/.test(pass)) score++;  // Rule 5: Special Character

        if (score <= 2) return { score, text: '🔴 Weak Password (Highly Unsafe)', color: '#ef4444' };
        if (score <= 4) return { score, text: '🟡 Medium Password (Needs Improvement)', color: '#eab308' };
        return { score, text: '🟢 Ultra Secure Password (Excellent)', color: '#22c55e' };
    };

    const strength = getStrength(password);

    return e('main', { className: 'main-content' },
        e('div', { className: 'tester-section-wrapper', style: { textAlign: 'center' } },
            e('h2', { className: 'tester-main-title' }, 'Password Strength Checker'),
            e('p', { style: { color: '#64748b', marginBottom: '30px' } }, 'Enter your password and evaluate its security status under strict compliance algorithms.'),

            // Main Input Field Box Wrapper
            e('div', { className: 'prompt-search-container', style: { maxWidth: '500px', margin: '0 auto 20px auto' } },
                e('span', { className: 'prompt-icon' }, '🔒'),
                e('input', {
                    type: 'text',
                    className: 'prompt-input-field',
                    placeholder: 'Type your password here...',
                    value: password,
                    onChange: (event) => setPassword(event.target.value)
                })
            ),

            // Suggestion Engine Trigger Button
            e('button', {
                className: 'action-btn',
                onClick: generateSuggestion,
                style: { marginBottom: '30px', padding: '12px 24px', fontSize: '0.95rem' }
            }, '💡 Suggest a Strong Password'),

            // Custom Display Layout for Suggested Outputs
            suggestedPassword && e('div', {
                className: 'result-card',
                style: { maxWidth: '500px', margin: '0 auto 25px auto', padding: '20px', border: '1px dashed #00f5ff' }
            },
                e('p', { style: { color: '#94a3b8', margin: 0, fontSize: '0.9rem' } }, 'Try using this high-entropy password:'),
                e('code', {
                    style: {
                        color: '#00f5ff',
                        fontSize: '1.25rem',
                        fontWeight: 'bold',
                        display: 'block',
                        marginTop: '8px',
                        letterSpacing: '1.5px',
                        userSelect: 'all',
                        cursor: 'pointer'
                    },
                    title: 'Click to select all text'
                }, window.navigator.clipboard ? suggestedPassword : suggestedPassword)
            ),

            // Live Performance Progress Indicator Tracker Grid
            password && e('div', { className: 'result-card', style: { marginTop: '20px', padding: '25px', maxWidth: '500px', margin: '0 auto' } },
                e('h3', { style: { fontSize: '1.2rem', marginBottom: '10px', color: strength.color } }, strength.text),

                // Visual Status Progress Pipeline Bar
                e('div', { style: { background: 'rgba(255,255,255,0.1)', height: '8px', borderRadius: '4px', overflow: 'hidden', marginTop: '15px' } },
                    e('div', {
                        style: {
                            background: strength.color,
                            width: `${(strength.score / 5) * 100}%`,
                            height: '100%',
                            transition: 'all 0.3s ease'
                        }
                    })
                ),

                // Dynamic Checklist Matrix
                e('ul', { style: { textAlign: 'left', marginTop: '20px', color: '#94a3b8', fontSize: '0.9rem', listStyleType: 'none', padding: 0 } },
                    e('li', { style: { color: password.length >= 12 ? '#22c55e' : '', marginBottom: '8px' } }, `${password.length >= 12 ? '✓' : '○'} At least 12 characters length (Strict)`),
                    e('li', { style: { color: /[A-Z]/.test(password) ? '#22c55e' : '', marginBottom: '8px' } }, `${/[A-Z]/.test(password) ? '✓' : '○'} Contains Capital Letter (A-Z)`),
                    e('li', { style: { color: /[a-z]/.test(password) ? '#22c55e' : '', marginBottom: '8px' } }, `${/[a-z]/.test(password) ? '✓' : '○'} Contains Lowercase Letter (a-z)`),
                    e('li', { style: { color: /[0-9]/.test(password) ? '#22c55e' : '', marginBottom: '8px' } }, `${/[0-9]/.test(password) ? '✓' : '○'} Contains Number (0-9)`),
                    e('li', { style: { color: /[^A-Za-z0-9]/.test(password) ? '#22c55e' : '' } }, `${/[^A-Za-z0-9]/.test(password) ? '✓' : '○'} Contains Special Character (@, #, $, %, etc.)`)
                )
            )
        )
    );
};
// --- About Component with English text ---
const About = () => {
    return e('main', { className: 'main-content' },
        e('div', { className: 'tester-section-wrapper', style: { textAlign: 'center', maxWidth: '800px', margin: '0 auto' } },
            e('h2', { className: 'tester-main-title' }, 'About QuickKit'),

            // Vision Card
            e('div', { className: 'result-card', style: { padding: '40px', marginTop: '20px', textAlign: 'left' } },
                e('h3', { className: 'result-title', style: { fontSize: '1.4rem', marginBottom: '15px', color: '#00f5ff' } }, 'Our Mission'),
                e('p', { style: { color: '#94a3b8', lineHeight: '1.8', fontSize: '1.05rem', marginBottom: '25px' } },
                    'At QuickKit, our goal is simple: to build high-performance web utilities that respect your privacy and maximize your efficiency. Whether you are testing your typing speed, generating a creative professional bio, auditing your password security, or computing instant daily metrics with our all-in-one calculator, QuickKit offers a seamless, premium user experience.'
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
// --- NEW: English Sentence Checker Component ---
// --- STRICT TENSE & GRAMMAR CHECKER COMPONENT ---
// --- FIXED: Sentence Checker with Premium Card Design (Matching Calculator Hub) ---
// --- SENTENCE CHECKER - Card pe click karein to tool khule ---
const SentenceChecker = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [sentence, setSentence] = useState('');
    const [status, setStatus] = useState('');
    const [correctedText, setCorrectedText] = useState('');
    const [errorDetails, setErrorDetails] = useState([]);

    // Tense detection function
    const detectTenseIssues = (text) => {
        const issues = [];
        let tempText = text;
        
        const tensePatterns = [
            { pattern: /\b(he|she|it)\s+are\b/gi, message: "Use 'is' instead of 'are' with he/she/it", fix: (t) => t.replace(/\b(he|she|it)\s+are\b/gi, '$1 is') },
            { pattern: /\b(they|we|you)\s+is\b/gi, message: "Use 'are' instead of 'is' with they/we/you", fix: (t) => t.replace(/\b(they|we|you)\s+is\b/gi, '$1 are') },
            { pattern: /\b(I)\s+is\b/gi, message: "Use 'am' instead of 'is' with 'I'", fix: (t) => t.replace(/\bI\s+is\b/gi, 'I am') },
            { pattern: /\b(he|she|it)\s+have\b/gi, message: "Use 'has' instead of 'have' with he/she/it", fix: (t) => t.replace(/\b(he|she|it)\s+have\b/gi, '$1 has') },
            { pattern: /\b(they|we|you|I)\s+has\b/gi, message: "Use 'have' instead of 'has' with they/we/you/I", fix: (t) => t.replace(/\b(they|we|you|I)\s+has\b/gi, '$1 have') },
            { pattern: /\b(they|we|you)\s+was\b/gi, message: "Use 'were' instead of 'was' with they/we/you", fix: (t) => t.replace(/\b(they|we|you)\s+was\b/gi, '$1 were') },
            { pattern: /\b(he|she|it)\s+were\b/gi, message: "Use 'was' instead of 'were' with he/she/it", fix: (t) => t.replace(/\b(he|she|it)\s+were\b/gi, '$1 was') }
        ];

        for (const pattern of tensePatterns) {
            pattern.pattern.lastIndex = 0;
            if (pattern.pattern.test(text)) {
                issues.push(pattern.message);
                if (pattern.fix) {
                    tempText = pattern.fix(tempText);
                }
            }
        }
        
        return { issues, correctedText: tempText };
    };

    const handleCheck = async () => {
        if (!sentence.trim()) return;
        setStatus('loading');
        setCorrectedText('');
        setErrorDetails([]);

        try {
            const tenseResults = detectTenseIssues(sentence);
            
            const response = await fetch('https://api.languagetool.org/v2/check', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({ text: sentence, language: 'en-US' })
            });
            const data = await response.json();
            
            const grammarMatches = data.matches.filter(match =>
                match.rule.issueType !== 'misspelling' && 
                match.rule.category.id !== 'TYPOS' &&
                match.rule.category.name !== 'Typo'
            );

            let allIssues = [...tenseResults.issues];
            let finalCorrectedText = sentence;
            let detailedReasons = [];

            const sortedMatches = [...grammarMatches].sort((a, b) => b.offset - a.offset);
            sortedMatches.forEach(match => {
                if (match.replacements && match.replacements[0]) {
                    const bestSuggestion = match.replacements[0].value;
                    const prefix = finalCorrectedText.substring(0, match.offset);
                    const suffix = finalCorrectedText.substring(match.offset + match.length);
                    finalCorrectedText = prefix + bestSuggestion + suffix;
                }
                const issueType = match.rule.category.name || 'Grammar Issue';
                const wrongWord = sentence.substring(match.offset, match.offset + match.length);
                const correctWord = match.replacements && match.replacements[0] ? match.replacements[0].value : '?';
                detailedReasons.push(`${issueType}: "${wrongWord}" → "${correctWord}"`);
                allIssues.push(match.message);
            });

            if (tenseResults.issues.length > 0 && tenseResults.correctedText !== sentence) {
                finalCorrectedText = tenseResults.correctedText;
            }

            if (allIssues.length > 0) {
                setStatus('incorrect');
                setCorrectedText(finalCorrectedText);
                setErrorDetails(detailedReasons.length > 0 ? detailedReasons : tenseResults.issues);
            } else {
                setStatus('perfect');
            }
        } catch (error) {
            console.error("Error:", error);
            setStatus('incorrect');
            setCorrectedText("Server error! Please check your internet connection.");
            setErrorDetails(["Unable to connect to grammar checker API."]);
        }
    };

    // 1. CARD VIEW (Pehle card dikhega)
    if (!isOpen) {
        return e('div', { 
            className: 'calculator-container', 
            style: { 
                padding: '90px 20px 40px 20px',
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                gap: '12px'
            } 
        },
            e('h2', { 
                className: 'tester-main-title', 
                style: { 
                    textAlign: 'center', 
                    fontSize: 'clamp(1.8rem, 5vw, 2.4rem)', 
                    color: '#ffffff',
                    fontWeight: '700',
                    margin: '0',
                    letterSpacing: '0.5px',
                    wordBreak: 'break-word'
                } 
            }, 'Sentence Checker'),

            e('p', {
                style: {
                    color: '#64748b',
                    fontSize: 'clamp(13px, 4vw, 15px)',
                    textAlign: 'center',
                    margin: '0 0 20px 0',
                    maxWidth: '500px',
                    lineHeight: '1.5',
                    padding: '0 10px',
                    wordBreak: 'break-word'
                }
            }, 'Check English sentences for tense errors, subject-verb agreement, and grammar mistakes with AI-powered verification.'),

            // Premium Card
            e('div', {
                className: 'premium-tool-card calc-card',
                onClick: () => setIsOpen(true),
                onMouseEnter: () => setIsHovered(true),
                onMouseLeave: () => setIsHovered(false),
                style: {
                    cursor: 'pointer',
                    padding: '24px',
                    borderRadius: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    textAlign: 'left',
                    width: '100%',
                    maxWidth: '420px',
                    background: isHovered ? 'rgba(30, 41, 59, 0.7)' : 'rgba(30, 41, 59, 0.45)',
                    backdropFilter: 'blur(12px)',
                    border: isHovered ? '1px solid rgba(0, 245, 255, 0.6)' : '1px solid rgba(255, 255, 255, 0.08)',
                    transform: isHovered ? 'translateY(-5px)' : 'translateY(0px)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: isHovered ? '0 20px 30px -10px rgba(0, 0, 0, 0.5)' : 'none'
                }
            },
                e('div', { className: 'premium-badge' }, '📝 Grammar Audit'),
                e('div', { className: 'card-icon-container' }, '✍️'),
                e('h3', { className: 'card-main-title', style: { wordBreak: 'break-word' } }, 'English Tense & Grammar Checker'),
                e('p', { className: 'card-secondary-desc', style: { wordBreak: 'break-word' } },
                    'Detect subject-verb agreement issues, incorrect tense usage, and grammar mistakes in your English sentences.'
                ),
                e('div', { className: 'card-action-link-footer' },
                    'Open Tool',
                    e('span', { className: 'arrow-vector' }, '→')
                )
            )
        );
    }

    // 2. TOOL INTERFACE (Card click karne ke baad ye khulega - Bilkul tumhari wali design)
    return e('main', { className: 'main-content', style: { paddingTop: '80px' } },
        e('div', { className: 'tester-section-wrapper', style: { maxWidth: '600px', width: '90%', margin: '0 auto', padding: '20px' } },
            
            // Back button to go back to card
            e('button', {
                onClick: () => { 
                    setIsOpen(false); 
                    setSentence(''); 
                    setStatus(''); 
                    setCorrectedText(''); 
                    setErrorDetails([]); 
                },
                style: {
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.02))',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#00f5ff',
                    cursor: 'pointer',
                    marginBottom: '25px',
                    padding: '8px 16px',
                    borderRadius: '30px',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    letterSpacing: '0.5px',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    width: 'max-content'
                }
            }, '← Back to Card'),

            e('div', { 
                style: { 
                    background: 'rgba(30, 41, 59, 0.7)', 
                    backdropFilter: 'blur(12px)', 
                    padding: 'clamp(20px, 5vw, 35px)', 
                    borderRadius: '20px', 
                    border: '1px solid rgba(255,255,255,0.08)',
                    width: '100%',
                    boxSizing: 'border-box',
                    overflowX: 'auto'
                } 
            },
                e('h2', { 
                    className: 'tester-main-title', 
                    style: { 
                        textAlign: 'center', 
                        marginBottom: '8px', 
                        fontSize: 'clamp(1.4rem, 5vw, 1.8rem)',
                        wordBreak: 'break-word'
                    } 
                }, '📝 Tense & Grammar Checker'),
                
                e('p', { 
                    style: { 
                        color: '#64748b', 
                        textAlign: 'center', 
                        marginBottom: '30px', 
                        fontSize: 'clamp(12px, 4vw, 14px)',
                        wordBreak: 'break-word'
                    } 
                }, 'Check for tense errors, subject-verb agreement, and grammar mistakes.'),

                e('div', { 
                    className: 'prompt-search-container',
                    style: {
                        width: '100%',
                        boxSizing: 'border-box'
                    }
                },
                    e('span', { className: 'prompt-icon' }, '✍️'),
                    e('input', {
                        type: 'text',
                        className: 'prompt-input-field',
                        placeholder: 'Type your English sentence here... (e.g., "He go to school yesterday")',
                        value: sentence,
                        disabled: status === 'loading',
                        onChange: (event) => {
                            setSentence(event.target.value);
                            setStatus('');
                        },
                        style: {
                            width: '100%',
                            boxSizing: 'border-box',
                            overflowX: 'auto',
                            whiteSpace: 'normal',
                            wordBreak: 'break-word'
                        }
                    })
                ),

                e('button', {
                    className: 'action-btn',
                    onClick: handleCheck,
                    disabled: status === 'loading',
                    style: { width: '100%', justifyContent: 'center', marginTop: '20px' }
                }, status === 'loading' ? '⏳ Verifying...' : '🔍 Check Sentence'),

                status === 'perfect' && e('div', {
                    style: { 
                        marginTop: '24px', 
                        padding: '15px', 
                        background: 'rgba(34, 197, 94, 0.1)', 
                        border: '1px solid #22c55e', 
                        borderRadius: '10px', 
                        color: '#22c55e', 
                        fontWeight: 'bold', 
                        textAlign: 'center',
                        wordBreak: 'break-word'
                    }
                }, '✅ Sentence looks good! No tense or grammar mistakes found.'),

                status === 'incorrect' && e('div', {
                    style: { 
                        marginTop: '24px', 
                        padding: '20px', 
                        background: 'rgba(239, 68, 68, 0.05)', 
                        border: '1px solid rgba(239, 68, 68, 0.3)', 
                        borderRadius: '14px',
                        wordBreak: 'break-word',
                        overflowX: 'auto'
                    }
                },
                    e('p', { style: { color: '#ef4444', fontWeight: 'bold', margin: '0 0 10px 0' } }, '❌ Issues Detected:'),
                    e('ul', { 
                        style: { 
                            paddingLeft: '20px', 
                            margin: '0 0 18px 0', 
                            color: '#94a3b8', 
                            fontSize: 'clamp(12px, 3.5vw, 0.95rem)',
                            wordBreak: 'break-word'
                        } 
                    },
                        errorDetails.map((err, idx) => e('li', { key: idx, style: { marginBottom: '6px', wordBreak: 'break-word' } }, err))
                    ),
                    correctedText !== sentence && e('div', { style: { marginTop: '15px' } },
                        e('div', { style: { height: '1px', background: 'rgba(255,255,255,0.08)', marginBottom: '18px' } }),
                        e('p', { style: { color: '#64748b', fontSize: '12px', margin: '0 0 6px 0', fontWeight: '600' } }, '💡 SUGGESTED CORRECTION:'),
                        e('p', { 
                            style: { 
                                color: '#00f5ff', 
                                margin: 0, 
                                fontSize: 'clamp(1rem, 4vw, 1.2rem)', 
                                fontWeight: '500',
                                wordBreak: 'break-word',
                                whiteSpace: 'normal'
                            } 
                        }, correctedText)
                    )
                )
            )
        )
    );
};
// --- NEW: Premium Home Component with Typewriter ---
const Home = ({ navigate }) => {
    const [typedText, setTypedText] = useState('');

    // Aapki website se related 3 professional lines jo loop mein chalengi
    const typewriterLines = [
        "Premium digital utilities for your workflow.",
        "Test typing speed with advanced precision metrics.",
        "Evaluate password strength and generate bios.",
        "Calculate exact age and daily calorie metrics.",
        "Fix grammar and check tenses instantly."
    ];

    useEffect(() => {
        let lineIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 60; // Type karne ki speed

        const handleType = () => {
            const currentLine = typewriterLines[lineIndex];

            if (!isDeleting) {
                // Characters ko screen par add karna
                setTypedText(currentLine.slice(0, charIndex + 1));
                charIndex++;

                // Agar poori line type ho jaye
                if (charIndex === currentLine.length) {
                    typingSpeed = 2000; // Poori line likhne ke baad 2 seconds ka pause
                    isDeleting = true;
                } else {
                    typingSpeed = 60;
                }
            } else {
                // Characters ko erase/delete karna
                setTypedText(currentLine.slice(0, charIndex - 1));
                charIndex--;

                // Agar saari line delete ho jaye
                if (charIndex === 0) {
                    isDeleting = false;
                    // Agli line par move karna, agar last line ho to wapas 1st line par jana (Loop)
                    lineIndex = (lineIndex + 1) % typewriterLines.length;
                    typingSpeed = 500; // Nayi line shuru hone se pehle thora sa pause
                } else {
                    typingSpeed = 30; // Erase thora tez hoga
                }
            }

            setTimeout(handleType, typingSpeed);
        };

        // Typewriter effect ko start karna
        const timerId = setTimeout(handleType, typingSpeed);

        // Cleanup mechanism
        return () => clearTimeout(timerId);
    }, []);

    return e('main', { className: 'main-content home-page-bg' }, // Yahan humne class add ki hy
        e('div', { className: 'tester-section-wrapper', style: { gap: '0' } },

            // ── HERO ──
            // ── HERO ──
            e('div', { className: 'home-hero' },

                // ROW 1: Is row mein Text (Left) aur Animation (Right) bilkul aamne-saamne (paros mein) hain
                e('div', { className: 'hero-top-split' },

                    // Left Side: Text, Subtitle aur Dono Buttons
                    e('div', { className: 'hero-content-left' },
                        e('span', { className: 'hero-badge' }, '✦ Free • Local • Fast'),
                        e('h2', { className: 'hero-title', style: { textAlign: 'left' } }, 'Your Digital Toolkit,', e('br'), 'Supercharged.'),
                        e('div', { style: { minHeight: '80px' } },
                            e('p', { className: 'hero-subtitle', style: { textAlign: 'left', margin: '0' } },
                                typedText,
                                e('span', { style: { color: '#00f5ff' } }, '|')
                            )
                        ),
                        e('div', { className: 'hero-btn-group' },
                            e('button', { className: 'action-btn', onClick: () => navigate('typingtester') }, '🚀 Start Typing Test'),
                            e('button', { className: 'learn-more-btn', onClick: () => navigate('about') }, 'Learn More')
                        )
                    ),

                    // Right Side: Animation Box (Jo text ke bilkul barabar mein chalega)
                    e('div', { className: 'hero-visual-right' },
                        e('div', { className: 'toolkit-animation-box' },

                            // Tool 1: Typing Tester Animation
                            e('div', { className: 'tool-motion-card t-typing' },
                                e('div', { className: 'tool-card-icon' }, '⌨️'),
                                e('div', { className: 'tool-card-info' },
                                    e('span', { className: 'tool-card-name' }, 'Typing Tester'),
                                    e('div', { className: 'typing-sim-lines' },
                                        e('span', { className: 'sim-word' }, 'Speed '),
                                        e('span', { className: 'sim-word active' }, 'Test...')
                                    )
                                ),
                                e('span', { className: 'tool-card-status' }, '68 WPM')
                            ),

                            // Tool 2: Password Gen Animation
                            e('div', { className: 'tool-motion-card t-password' },
                                e('div', { className: 'tool-card-icon' }, '🔒'),
                                e('div', { className: 'tool-card-info' },
                                    e('span', { className: 'tool-card-name' }, 'Password Gen'),
                                    e('span', { className: 'crypto-pass-stream' }, 'aK9$m!2P')
                                ),
                                e('span', { className: 'tool-card-status status-purple' }, 'Secure')
                            ),

                            // Tool 3: Zip Extractor Animation// Tool 3: All-In-One Calculator Animation (Zip Extractor ki jagah)
                            e('div', { className: 'tool-motion-card t-calc' },
                                e('div', { className: 'tool-card-icon' }, '🧮'),
                                e('div', { className: 'tool-card-info' },
                                    e('span', { className: 'tool-card-name' }, 'All-In-One Calculator'),
                                    e('span', { className: 'math-stream-text' }, '25% + 75% = 100')
                                ),
                                e('span', { className: 'tool-card-status status-orange' }, 'Instant')
                            ),
                            
                            // Tool 4: AI Bio Writer Animation (Yeh Naya Box Hai)
                            e('div', { className: 'tool-motion-card t-bio' },
                                e('div', { className: 'tool-card-icon' }, '✍️'),
                                e('div', { className: 'tool-card-info' },
                                    e('span', { className: 'tool-card-name' }, 'AI Bio Writer'),
                                    e('span', { className: 'bio-stream-text' }, 'Generating perfect bio...')
                                ),
                                e('span', { className: 'tool-card-status status-pink' }, 'AI Ready')
                            ),
                            

                            // Background Glow effect
                            e('div', { className: 'toolkit-core-glow' }),
                            e('div', { 
    className: 'tool-motion-card t-calc', // Aapki purani card animation class
    style: {
        transition: 'all 0.3s ease',
        cursor: 'pointer'
    },
    // Hover karne par border glow karega ✨
    onMouseEnter: (e) => {
        e.currentTarget.style.borderColor = '#8b5cf6'; // Bright purple border
        e.currentTarget.style.boxShadow = '0 0 15px rgba(139, 92, 246, 0.6)'; // Soft neon glow
    },
    // Mouse hatne par wapis normal ho jayega
    onMouseLeave: (e) => {
        e.currentTarget.style.borderColor = ''; // Normal border
        e.currentTarget.style.boxShadow = ''; // Normal shadow
    }
},
    e('div', { className: 'tool-card-icon' }, '✍️'), // Sentence checker ka icon
    e('div', { className: 'tool-card-info' },
        e('span', { className: 'tool-card-name' }, 'Sentence Checker'), // Tool ka naam
        e('span', { className: 'math-stream-text' }, 'Grammar & Tense Audit') // Subtext / description
    ),
    e('span', { className: 'tool-card-status status-orange' }, 'Instant')
)
                        )
                    )
                ),

                // ROW 2: "4+ Tools" wala section jo split row ke bilkul NEECHAY hai (Animation se strictly niche)
                e('div', { className: 'hero-stats-row' },
                    e('div', { className: 'stat-item stat-delay-1' },
                        e('div', { className: 'stat-number' }, '5+'),
                        e('div', { className: 'stat-label' }, 'Tools')
                    ),
                    e('div', { className: 'stat-item stat-delay-2' },
                        e('div', { className: 'stat-number' }, '100%'),
                        e('div', { className: 'stat-label' }, 'Free')
                    ),
                    e('div', { className: 'stat-item stat-delay-3' },
                        e('div', { className: 'stat-number' }, '0ms'),
                        e('div', { className: 'stat-label' }, 'Server Delay')
                    )
                )
            ),

            // ── FEATURE CARDS ──
            // --- CODES TO REPLACE IN HOME COMPONENT (RIGHT UNDER THE 3+ TOOLS ROW) ---
            e('div', { className: 'premium-tools-grid' },
                // Card 1: Typing Tester Tool
                e('div', {
                    className: 'premium-tool-card typing-card premium-card-delay-1',
                    onClick: () => navigate('typingtester')
                },
                    e('div', null,
                        e('div', { className: 'premium-badge' }, '⚡ Speed Matrix'),
                        e('div', { className: 'card-icon-container' }, '⌨️'),
                        e('h3', { className: 'card-main-title' }, 'Instant Typing Tester'),
                        e('p', { className: 'card-secondary-desc' }, 'Test your writing performance across dynamic difficulty matrices with fluid word-per-minute counters.')
                    ),
                    e('div', { className: 'card-action-link-footer' }, 'Launch Simulator', e('span', { className: 'arrow-vector' }, '→'))
                ),

                // Card 2: Password Strength Checker Tool
                e('div', {
                    className: 'premium-tool-card crypto-card premium-card-delay-2',
                    onClick: () => navigate('passwordchecker')
                },
                    e('div', null,
                        e('div', { className: 'premium-badge' }, '🔒 Security Audit'),
                        e('div', { className: 'card-icon-container' }, '🛡️'),
                        e('h3', { className: 'card-main-title' }, 'Password Strength Checker'),
                        e('p', { className: 'card-secondary-desc' }, 'Evaluate cryptographic entropy, analyze vulnerabilities under strict compliance rules, and auto-suggest passwords.')
                    ),
                    e('div', { className: 'card-action-link-footer' }, 'Check Entropy Now', e('span', { className: 'arrow-vector' }, '→'))
                ),

                // Card 3: Personalized Bio Writer Tool
                e('div', {
                    className: 'premium-tool-card bio-card premium-card-delay-3',
                    onClick: () => navigate('biowriter')
                },
                    e('div', null,
                        e('div', { className: 'premium-badge' }, '✨ Text Generation'),
                        e('div', { className: 'card-icon-container' }, '✍️'),
                        e('h3', { className: 'card-main-title' }, 'Personalized Bio Writer'),
                        e('p', { className: 'card-secondary-desc' }, 'Generate 10+ completely non-repeating high-impact stylish descriptions across multiple corporate professions.')
                    ),
                    e('div', { className: 'card-action-link-footer' }, 'Generate Premium Bio', e('span', { className: 'arrow-vector' }, '→'))
                )// Card 4: All in One Calculator Tool
                , e('div', {
                    className: 'premium-tool-card calc-card premium-card-delay-4',
                    onClick: () => navigate('calculator')
                },
                    e('div', null,
                        e('div', { className: 'premium-badge' }, '🧮 Smart Analytics'),
                        e('div', { className: 'card-icon-container' }, '📐'),
                        e('h3', { className: 'card-main-title' }, 'All in One Calculator'),
                        e('p', { className: 'card-secondary-desc' }, 'Instantly calculate your exact age, daily calorie maintenance, and complex percentage metrics.')
                    ),
                    e('div', { className: 'card-action-link-footer' }, 'Open Calculators', e('span', { className: 'arrow-vector' }, '→'))
                ),
e('div', {
    className: 'premium-tool-card premium-card-delay-5', // Normal class rakhi hy taake background baqi cards jaisa rahe
    style: {
        transition: 'all 0.3s ease',
    },
    // Mouse upar aane par border glow karega ✨
    onMouseEnter: (e) => {
        e.currentTarget.style.borderColor = '#8b5cf6'; // Purple color ka border
        e.currentTarget.style.boxShadow = '0 0 15px rgba(139, 92, 246, 0.6)'; // Glow effect
        e.currentTarget.style.transform = 'translateY(-5px)'; // Thoda upar uthega
    },
    // Mouse hatne par wapis normal ho jayega
    onMouseLeave: (e) => {
        e.currentTarget.style.borderColor = ''; // Normal border
        e.currentTarget.style.boxShadow = ''; // Normal shadow
        e.currentTarget.style.transform = ''; // Normal position
    },
    onClick: () => navigate('sentencechecker')
},
    e('div', null,
        e('div', { className: 'premium-badge' }, '📝 Grammar Audit'),
        e('div', { className: 'card-icon-container' }, '✍️'),
        e('h3', { className: 'card-main-title' }, 'English Sentence Checker'),
        e('p', { className: 'card-secondary-desc' }, 'Verify your sentence structures, evaluate strict tense rules, and fix grammatical mistakes instantly.')
    ),
    e('div', { className: 'card-action-link-footer' }, 'Analyze Tense Structure', e('span', { className: 'arrow-vector' }, '→'))
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
                        e('div', { className: 'step-desc' }, 'Choose from typing tester, password checker, bio writer, or calculator — all free.')
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
            // Card 4
            e('div', { className: 'classic-detail-card classic-delay-4' },
                e('div', { className: 'classic-card-header' },
                    e('div', { className: 'classic-icon-box' }, '⌨️'),
                    e('h3', { className: 'classic-card-title' }, 'Tactile Typing Experience')
                ),
                e('p', { className: 'classic-card-text' },
                    'Typing should be a sensory experience. Our environment is designed to complement the satisfying, rhythmic flow of a mechanical keyboard. Every keystroke is registered with ultra-low latency, ensuring your raw speed is measured with absolute precision.'
                )
            ),

            // Card 5
            e('div', { className: 'classic-detail-card classic-delay-5' },
                e('div', { className: 'classic-card-header' },
                    e('div', { className: 'classic-icon-box' }, '🌐'),
                    e('h3', { className: 'classic-card-title' }, 'Edge-Optimized Deployment')
                ),
                e('p', { className: 'classic-card-text' },
                    'Built for the modern web. The underlying architecture is perfectly configured for seamless live deployments on high-performance edge networks like Vercel. This guarantees instantaneous global access and unparalleled uptime.'
                )
            ),

            // Card 6
            e('div', { className: 'classic-detail-card classic-delay-6' },
                e('div', { className: 'classic-card-header' },
                    e('div', { className: 'classic-icon-box' }, '🛠️'),
                    e('h3', { className: 'classic-card-title' }, 'Native Editor Environment')
                ),
                e('p', { className: 'classic-card-text' },
                    'Engineered for developers who live in their code editors. With a workspace that feels as fluid and responsive as VS Code, QuickKit provides advanced local utilities—like real-time file extraction and text editing workflows—without ever breaking your focus.'
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
                    e('li', null, e('button', { className: 'footer-nav-link', onClick: () => navigate('passwordchecker') }, 'Password Strength Checker')),
                    e('li', null, e('button', { className: 'footer-nav-link', onClick: () => navigate('calculator') }, 'All in One Calculator')),
                    e('li', null, e('button', { className: 'footer-nav-link', onClick: () => navigate('sentencechecker') }, 'Sentence Checker'))
                    
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
    // Conditional Rendering Logic for multi-pages
    let currentView;
    if (currentPage === 'home') {
        currentView = e(Home, { navigate: navigate });
    } else if (currentPage === 'typingtester') {
        currentView = e(Content);
    } else if (currentPage === 'biowriter') {
        currentView = e(BioWriter);
    } else if (currentPage === 'passwordchecker') {
        currentView = e(PasswordChecker);
    } else if (currentPage === 'calculator') {
        currentView = e(AllInOneCalculator, { navigate: navigate });
    } else if (currentPage === 'sentencechecker') { // <-- YEH NAVI CONDITION ADD KI HY
        currentView = e(SentenceChecker);
    } else if (currentPage === 'about') {
        currentView = e(About);
    } else if (currentPage === 'terms') {
        currentView = e(TermsConditions);
    } else if (currentPage === 'privacy') {
        currentView = e(PrivacyPolicy);
    } else if (currentPage === 'contact') {
        currentView = e(ContactUs);
    } else {
        currentView = e(Home, { navigate: navigate });
    }

    return e('div', { className: `app-container ${theme}-theme` },
        e(Header, { title: siteName, theme, toggleTheme }),
        currentView,
        e(Footer, { company: siteName, navigate: navigate })
    );
};

// ==========================================
// 11. ALL IN ONE CALCULATOR HUB COMPONENT
// ==========================================
// ==========================================
// 11. ALL IN ONE CALCULATOR HUB COMPONENT
// ==========================================
// ==========================================
// 11. ALL IN ONE CALCULATOR HUB COMPONENT
// ==========================================
// ========================================================
// 🎓 ERROR-FREE DESIGNER CGPA CALCULATOR COMPONENT
// ========================================================
const CGPACalculator = ({ onBack }) => {
    // Scope error se bachne ke liye React.useState use kiya hai
    const [semesters, setSemesters] = React.useState([
        { id: 1, gpa: '', creditHours: '' },
        { id: 2, gpa: '', creditHours: '' }
    ]);
    const [cgpaResult, setCgpaResult] = React.useState(null);

    const handleInputChange = (id, field, value) => {
        const updated = semesters.map(sem => {
            if (sem.id === id) {
                return Object.assign({}, sem, { [field]: value });
            }
            return sem;
        });
        setSemesters(updated);
    };

    const addSemesterRow = () => {
        if (semesters.length >= 8) {
            alert("Aap maximum 8 semesters hi add kar sakte hain.");
            return;
        }
        setSemesters([].concat(semesters, [{ id: semesters.length + 1, gpa: '', creditHours: '' }]));
    };

    const calculateCGPA = () => {
        let totalQualityPoints = 0;
        let totalCreditHours = 0;
        let isValid = true;

        semesters.forEach(sem => {
            const gpa = parseFloat(sem.gpa);
            const ch = parseFloat(sem.creditHours);

            if (!isNaN(gpa) && !isNaN(ch)) {
                if (gpa < 0 || gpa > 4.0 || ch <= 0) {
                    isValid = false;
                } else {
                    totalQualityPoints += (gpa * ch);
                    totalCreditHours += ch;
                }
            }
        });

        if (!isValid) {
            alert("Sahi values enter karein! GPA 0 se 4 ke darmiyan aur Credit Hours 0 se zyada hone chahiye.");
            return;
        }

        if (totalCreditHours > 0) {
            const finalCgpa = totalQualityPoints / totalCreditHours;
            setCgpaResult(finalCgpa.toFixed(2));
        } else {
            alert("Kam az kam ek semester ka mukammal data enter karein.");
        }
    };

    const resetFields = () => {
        setSemesters([
            { id: 1, gpa: '', creditHours: '' },
            { id: 2, gpa: '', creditHours: '' }
        ]);
        setCgpaResult(null);
    };

    return e('div', {
        className: 'tester-section-wrapper',
        // 1. textAlign: 'left' add kia hy taake button bilkul start mi jaye
        style: { maxWidth: '700px', margin: '80px auto 20px auto', padding: '20px', textAlign: 'left' }
    },

        // ⬅️ COMPACT & LEFT-ALIGNED BUTTON (Exactly like the image)
        e('button', {
            onClick: typeof onBack === 'function' ? onBack : () => window.location.reload(),
            style: {
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.02))',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#00f5ff',
                cursor: 'pointer',
                marginBottom: '25px', // Neeche se thoda faasla
                padding: '8px 16px',  // 2. Padding kam kar di taake button patla aur smart lagay
                borderRadius: '30px',
                fontSize: '0.85rem',  // 3. Font thoda sa chota kiya hy image jaisa
                fontWeight: '600',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                letterSpacing: '0.5px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                width: 'max-content' // 4. Ye trick button ko sirf text jitni width de gi
            }
        }, '← Back to Hub'),

        // Aapka CGPA Card yahan se niche start hoga:
        e('div', {
            className: 'calculator-card',
            style: { padding: '40px', background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(12px)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }
        },
            e('h2', { className: 'tester-main-title', style: { textAlign: 'center', marginBottom: '10px', fontSize: '2rem' } }, '🎓 CGPA Calculator'),
            e('p', { style: { color: '#94a3b8', textAlign: 'center', marginBottom: '35px', fontSize: '14px' } }, 'Enter your semester obtain CGPA and credit hours.'),

            e('div', { style: { display: 'flex', flexDirection: 'column', gap: '20px' } },
                semesters.map((sem, idx) =>
                    e('div', { key: sem.id, style: { display: 'flex', gap: '15px', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '15px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' } },
                        e('span', { style: { color: '#00f5ff', minWidth: '110px', fontWeight: '600', fontSize: '15px' } }, 'Semester 0' + (idx + 1) + ':'),

                        e('div', { className: 'prompt-search-container', style: { flex: 1, margin: 0, padding: 0, background: 'transparent' } },
                            e('input', {
                                type: 'number',
                                step: '0.01',
                                className: 'prompt-input-field',
                                placeholder: 'GPA (e.g., 3.52)',
                                value: sem.gpa,
                                onChange: function (e) { handleInputChange(sem.id, 'gpa', e.target.value); },
                                style: { width: '100%', boxSizing: 'border-box' }
                            })
                        ),

                        e('div', { className: 'prompt-search-container', style: { flex: 1, margin: 0, padding: 0, background: 'transparent' } },
                            e('input', {
                                type: 'number',
                                className: 'prompt-input-field',
                                placeholder: 'Credit Hours',
                                value: sem.creditHours,
                                onChange: function (e) { handleInputChange(sem.id, 'creditHours', e.target.value); },
                                style: { width: '100%', boxSizing: 'border-box' }
                            })
                        )
                    )
                )
            ),

            e('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '15px', marginTop: '35px', justifyContent: 'center' } },
                e('button', { className: 'action-btn', onClick: addSemesterRow, disabled: semesters.length >= 8, style: { background: 'rgba(255,255,255,0.1)', opacity: semesters.length >= 8 ? 0.5 : 1 } }, '➕ Add Semester'),
                e('button', { className: 'action-btn', style: { background: '#00f5ff', color: '#0f172a', fontWeight: 'bold', boxShadow: '0 0 15px rgba(0, 245, 255, 0.4)' }, onClick: calculateCGPA }, '🧮 Calculate CGPA'),
                e('button', { className: 'action-btn', style: { background: '#ef4444', boxShadow: '0 0 15px rgba(239, 68, 68, 0.3)' }, onClick: resetFields }, '🔄 Reset')
            ),

            cgpaResult !== null && e('div', { className: 'result-card', style: { marginTop: '35px', padding: '25px', textAlign: 'center', background: 'rgba(0, 245, 255, 0.05)', border: '1px solid #00f5ff', borderRadius: '12px' } },
                e('h3', { className: 'result-title', style: { color: '#00f5ff', fontSize: '1.7rem', margin: 0 } }, 'Your CGPA: ' + cgpaResult),
                e('p', { style: { color: '#94a3b8', fontSize: '14px', marginTop: '8px', marginBottom: 0 } }, 'Keep learning and expanding your knowledge! 🚀')
            )
        )
    );
};
const CourseCGPACalculator = ({ onBack }) => {
    const [courses, setCourses] = React.useState([
        { id: 1, name: '', grade: '', obtainMarks: '' },
        { id: 2, name: '', grade: '', obtainMarks: '' }
    ]);
    const [cgpaResult, setCgpaResult] = React.useState(null);

    // Extended Grade to Point Mapping (with A-, B-, C-, D-)
    const getGradePoint = (grade) => {
        if (!grade) return 0;
        const g = grade.trim().toUpperCase();

        const mapping = {
            'A+': 4.0, 'A': 3.7, 'A-': 3.3,
            'B+': 3.3, 'B': 3.0, 'B-': 2.7,
            'C+': 2.3, 'C': 2.0, 'C-': 1.7,
            'D+': 1.3, 'D': 1.0, 'D-': 0.7,
            'F': 0.0
        };
        return mapping[g] !== undefined ? mapping[g] : 0;
    };

    const handleInputChange = (id, field, value) => {
        const updated = courses.map(course =>
            course.id === id ? { ...course, [field]: value } : course
        );
        setCourses(updated);
    };

    const addCourse = () => {
        if (courses.length >= 12) {
            alert("Maximum 12 courses allowed.");
            return;
        }
        setCourses([...courses, {
            id: courses.length + 1,
            name: '',
            grade: '',
            obtainMarks: ''
        }]);
    };

    const removeCourse = (id) => {
        if (courses.length === 1) return;
        setCourses(courses.filter(course => course.id !== id));
    };

    const calculateCGPA = () => {
        let totalQualityPoints = 0;
        let totalMarks = 0;
        let isValid = true;

        courses.forEach(course => {
            const gradePoint = getGradePoint(course.grade);
            const marks = parseFloat(course.obtainMarks);

            if (!course.name.trim() || !course.grade || isNaN(marks)) {
                isValid = false;
                return;
            }

            if (marks < 0 || marks > 100) {
                isValid = false;
                return;
            }

            totalQualityPoints += (gradePoint * marks);
            totalMarks += marks;
        });

        if (!isValid) {
            alert("Please fill all fields correctly.\nGrade: A+, A, A-, B+, B, B- etc.\nObtain Marks: 0-100");
            return;
        }

        if (totalMarks > 0) {
            const finalCgpa = totalQualityPoints / totalMarks;
            setCgpaResult(finalCgpa.toFixed(2));
        } else {
            alert("Please enter at least one valid course.");
        }
    };

    const resetFields = () => {
        setCourses([
            { id: 1, name: '', grade: '', obtainMarks: '' },
            { id: 2, name: '', grade: '', obtainMarks: '' }
        ]);
        setCgpaResult(null);
    };

    return e('div', {
        className: 'tester-section-wrapper',
        style: {
            maxWidth: '900px',
            margin: '60px auto 20px auto',
            padding: '15px',
            textAlign: 'left'
        }
    },

        // Back Button
        e('button', {
            onClick: onBack,
            style: {
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.02))',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#00f5ff',
                cursor: 'pointer',
                marginTop: '35px',
                marginBottom: '20px', // Neeche se thoda faasla
                padding: '8px 16px',  // 2. Padding kam kar di taake button patla aur smart lagay
                borderRadius: '30px',
                fontSize: '0.85rem',  // 3. Font thoda sa chota kiya hy image jaisa
                fontWeight: '600',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                letterSpacing: '0.5px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                width: 'max-content' // 4. Ye trick button ko sirf text jitni width de gi
            }
        }, '← Back to Hub'),

        // Main Card
        e('div', {
            className: 'calculator-card',
            style: {
                padding: '25px',
                background: 'rgba(30, 41, 59, 0.85)',
                backdropFilter: 'blur(12px)',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.1)'
            }
        },

            e('h2', {
                className: 'tester-main-title',
                style: { textAlign: 'center', marginBottom: '8px', fontSize: '1.8rem' }
            }, '📝 Course-wise CGPA Calculator'),

            e('p', {
                style: {
                    color: '#94a3b8',
                    textAlign: 'center',
                    marginBottom: '25px',
                    fontSize: '14px'
                }
            }, 'Enter course, grade (A+, A, A-, B- etc.) & obtained marks'),

            // Courses Container - Responsive
            e('div', { style: { display: 'flex', flexDirection: 'column', gap: '16px' } },
                courses.map((course, idx) =>
                    e('div', {
                        key: course.id,
                        style: {
                            display: 'flex',
                            flexDirection: 'column', // Mobile pe column
                            gap: '10px',
                            background: 'rgba(255,255,255,0.04)',
                            padding: '16px',
                            borderRadius: '12px',
                            border: '1px solid rgba(255,255,255,0.06)',
                            '@media (min-width: 768px)': { flexDirection: 'row', alignItems: 'center' } // Desktop pe row
                        }
                    },

                        e('span', {
                            style: {
                                color: '#00f5ff',
                                fontWeight: '700',
                                minWidth: '70px',
                                fontSize: '15px'
                            }
                        }, `Course ${String(idx + 1).padStart(2, '0')}`),

                        // Course Name
                        e('input', {
                            type: 'text',
                            className: 'prompt-input-field',
                            placeholder: 'Course Name',
                            value: course.name,
                            onChange: (e) => handleInputChange(course.id, 'name', e.target.value),
                            style: { flex: 1, minWidth: '140px' }
                        }),

                        // Grade Input (Free Text)
                        e('input', {
                            type: 'text',
                            className: 'prompt-input-field',
                            placeholder: 'Grade',
                            value: course.grade,
                            onChange: (e) => handleInputChange(course.id, 'grade', e.target.value),
                            style: { width: '110px', textTransform: 'uppercase' }
                        }),

                        // Obtain Marks
                        e('input', {
                            type: 'number',
                            className: 'prompt-input-field',
                            placeholder: 'Marks',
                            value: course.obtainMarks,
                            onChange: (e) => handleInputChange(course.id, 'obtainMarks', e.target.value),
                            style: { width: '110px' }
                        }),

                        // Remove Button
                        e('button', {
                            onClick: () => removeCourse(course.id),
                            style: {
                                background: '#ef4444',
                                color: 'white',
                                border: 'none',
                                padding: '8px 12px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                alignSelf: 'flex-start'
                            }
                        }, '✕')
                    )
                )
            ),

            // Buttons
            e('div', {
                style: {
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '12px',
                    marginTop: '30px',
                    justifyContent: 'center'
                }
            },
                e('button', {
                    className: 'action-btn',
                    onClick: addCourse,
                    style: { background: 'rgba(255,255,255,0.1)' }
                }, '➕ Add Course'),

                e('button', {
                    className: 'action-btn',
                    style: { background: '#00f5ff', color: '#0f172a', fontWeight: 'bold' },
                    onClick: calculateCGPA
                }, '🧮 Calculate CGPA'),

                e('button', {
                    className: 'action-btn',
                    style: { background: '#ef4444' },
                    onClick: resetFields
                }, '🔄 Reset')
            ),

            // Result
            cgpaResult && e('div', {
                className: 'result-card',
                style: {
                    marginTop: '35px',
                    padding: '25px',
                    textAlign: 'center',
                    background: 'rgba(0, 245, 255, 0.08)',
                    border: '1px solid #00f5ff'
                }
            },
                e('h3', { style: { color: '#00f5ff', fontSize: '1.85rem', margin: '0 0 8px 0' } },
                    `CGPA: ${cgpaResult}`),
                e('p', { style: { color: '#94a3b8' } }, 'Shandar Performance! Continue like this! 🚀')
            )
        )
    );
};
// ========================================================
// 🔬 ADVANCED SCIENTIFIC CALCULATOR COMPONENT
// ========================================================
// ========================================================
// 🔬 ADVANCED SCIENTIFIC CALCULATOR COMPONENT
// ========================================================
const ScientificCalculator = ({ onBack }) => {
    const [display, setDisplay] = React.useState('0');
    const [expression, setExpression] = React.useState('');
    const [justEvaluated, setJustEvaluated] = React.useState(false);
    const [shiftOn, setShiftOn] = React.useState(false);
    const [angleMode, setAngleMode] = React.useState('DEG');

    const handleBtn = (val) => {
        if (val === 'SHIFT') { setShiftOn(s => !s); return; }
        if (val === 'MODE') { setAngleMode(m => m === 'DEG' ? 'RAD' : 'DEG'); setShiftOn(false); return; }

        if (val === 'AC') {
            setDisplay('0'); setExpression(''); setJustEvaluated(false); setShiftOn(false); return;
        }
        if (val === 'DEL') {
            if (justEvaluated) { setDisplay('0'); setExpression(''); setJustEvaluated(false); return; }
            const nd = display.length > 1 ? display.slice(0, -1) : '0';
            setDisplay(nd); setExpression(nd === '0' ? '' : nd); return;
        }

        setShiftOn(false);

        if (val === '=') {
            try {
                let expr = expression
                    .replace(/sin⁻¹\(/g, 'Math.asin(')
                    .replace(/cos⁻¹\(/g, 'Math.acos(')
                    .replace(/tan⁻¹\(/g, 'Math.atan(')
                    .replace(/sinh\(/g, 'Math.sinh(')
                    .replace(/cosh\(/g, 'Math.cosh(')
                    .replace(/tanh\(/g, 'Math.tanh(')
                    .replace(/sin\(/g, angleMode === 'DEG' ? '(v=>Math.sin(v*Math.PI/180))(' : 'Math.sin(')
                    .replace(/cos\(/g, angleMode === 'DEG' ? '(v=>Math.cos(v*Math.PI/180))(' : 'Math.cos(')
                    .replace(/tan\(/g, angleMode === 'DEG' ? '(v=>Math.tan(v*Math.PI/180))(' : 'Math.tan(')
                    .replace(/log\(/g, 'Math.log10(')
                    .replace(/ln\(/g, 'Math.log(')
                    .replace(/√\(/g, 'Math.sqrt(')
                    .replace(/\^/g, '**')
                    .replace(/π/g, 'Math.PI')
                    .replace(/×/g, '*')
                    .replace(/÷/g, '/')
                    .replace(/(\d+)!/g, (_, n) => { let f = 1; for (let i = 2; i <= parseInt(n); i++) f *= i; return f; })
                    .replace(/(\d*\.?\d+)%/g, '($1/100)');
                const result = eval(expr);
                const formatted = Number.isInteger(result) ? String(result) : parseFloat(result.toFixed(10)).toString();
                setDisplay(formatted); setExpression(formatted); setJustEvaluated(true);
            } catch { setDisplay('Math ERROR'); setExpression(''); setJustEvaluated(true); }
            return;
        }

        let newExpr = (justEvaluated && ![')', '×', '÷', '+', '-', '^', '%'].includes(val)) ? '' : expression;
        setJustEvaluated(false);
        const newExp = newExpr + val;
        setExpression(newExp);
        setDisplay(newExp);
    };

    // Casio fx-991ES button layout — same rows as image
    const rows = [
        // Row 1: SHIFT, MODE/SETUP, (blank), (blank), x⁻¹, logₐb
        [
            { l: 'SHIFT', s: null, sci: true },
            { l: 'MODE', s: null, sci: true },
            { l: '', s: null, blank: true },
            { l: '', s: null, blank: true },
            { l: 'x⁻¹', s: null, sci: true },
            { l: 'logₐ', s: null, sci: true },
        ],
        // Row 2: ab/c, √(, x², xⁿ, log(, ln(
        [
            { l: 'ab/c', s: null, sci: true },
            { l: '√(', s: '³√(', sci: true },
            { l: 'x²', s: 'x³', sci: true },
            { l: 'xⁿ', s: null, sci: true },
            { l: 'log(', s: '10^', sci: true },
            { l: 'ln(', s: 'e^', sci: true },
        ],
        // Row 3: (-), hyp, sin(, cos(, tan(
        [
            { l: '(-)', s: null, sci: true },
            { l: '°\'"', s: null, sci: true },
            { l: 'hyp', s: null, sci: true },
            { l: 'sin(', s: 'sin⁻¹(', sci: true },
            { l: 'cos(', s: 'cos⁻¹(', sci: true },
            { l: 'tan(', s: 'tan⁻¹(', sci: true },
        ],
        // Row 4: RCL, ENG, (, ), S⇔D, M+
        [
            { l: 'RCL', s: null, sci: true },
            { l: 'ENG', s: null, sci: true },
            { l: '(', s: null, sci: true },
            { l: ')', s: null, sci: true },
            { l: 'S⇔D', s: null, sci: true },
            { l: 'M+', s: 'M-', sci: true },
        ],
        // Row 5: 7, 8, 9, DEL, AC
        [
            { l: '7', s: null, num: true },
            { l: '8', s: null, num: true },
            { l: '9', s: null, num: true },
            { l: 'DEL', s: null, del: true },
            { l: 'AC', s: null, ac: true },
        ],
        // Row 6: 4, 5, 6, ×, ÷
        [
            { l: '4', s: null, num: true },
            { l: '5', s: null, num: true },
            { l: '6', s: null, num: true },
            { l: '×', s: null, op: true },
            { l: '÷', s: null, op: true },
        ],
        // Row 7: 1, 2, 3, +, -
        [
            { l: '1', s: null, num: true },
            { l: '2', s: null, num: true },
            { l: '3', s: null, num: true },
            { l: '+', s: null, op: true },
            { l: '-', s: null, op: true },
        ],
        // Row 8: 0, ., x10ˣ, Ans, =
        [
            { l: '0', s: null, num: true },
            { l: '.', s: null, num: true },
            { l: 'x10ˣ', s: null, sci: true },
            { l: 'Ans', s: null, sci: true },
            { l: '=', s: null, eq: true },
        ],
    ];

    return e('div', {
        className: 'tester-section-wrapper',
        style: { maxWidth: '520px', margin: '60px auto 20px auto', padding: '15px', textAlign: 'left' }
    },
        // Back button — tera original style
        e('button', {
            onClick: typeof onBack === 'function' ? onBack : () => window.location.reload(),
            style: {
                background: 'linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#00f5ff', cursor: 'pointer',
                marginTop: '35px', marginBottom: '20px',
                padding: '8px 16px', borderRadius: '30px', fontSize: '0.85rem',
                fontWeight: '600', display: 'inline-flex', alignItems: 'center',
                gap: '8px', letterSpacing: '0.5px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.1)',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', width: 'max-content'
            }
        }, '← Back to Hub'),

        // Main card — tera original dark glass style
        e('div', {
            className: 'calculator-card',
            style: { padding: '30px', background: 'rgba(30,41,59,0.85)', backdropFilter: 'blur(12px)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }
        },
            e('h2', { className: 'tester-main-title', style: { textAlign: 'center', marginBottom: '8px', fontSize: '1.8rem' } }, '🔬 Scientific Calculator'),

            // Mode indicator
            e('div', { style: { display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '14px' } },
                e('span', { style: { fontSize: '0.75rem', color: angleMode === 'DEG' ? '#00f5ff' : '#64748b', fontWeight: '700', border: '1px solid rgba(0,245,255,0.3)', padding: '2px 10px', borderRadius: '20px' } }, 'DEG'),
                e('span', { style: { fontSize: '0.75rem', color: angleMode === 'RAD' ? '#00f5ff' : '#64748b', fontWeight: '700', border: '1px solid rgba(0,245,255,0.3)', padding: '2px 10px', borderRadius: '20px' } }, 'RAD'),
                shiftOn && e('span', { style: { fontSize: '0.75rem', color: '#fbbf24', fontWeight: '700', border: '1px solid rgba(251,191,36,0.4)', padding: '2px 10px', borderRadius: '20px' } }, 'SHIFT ON')
            ),

            // Display — tera original neon style
            e('div', {
                style: {
                    background: 'rgba(0,0,0,0.4)', padding: '20px', borderRadius: '12px',
                    marginBottom: '25px', textAlign: 'right', fontSize: display.length > 16 ? '1.2rem' : '2rem',
                    color: '#00f5ff', letterSpacing: '2px', minHeight: '80px', wordBreak: 'break-all',
                    border: '1px solid rgba(255,255,255,0.05)',
                    display: 'flex', alignItems: 'center', justifyContent: 'flex-end'
                }
            }, display || '0'),

            // Buttons
            e('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px' } },
                rows.map((row, ri) =>
                    e('div', { key: ri, style: { display: 'flex', gap: '8px' } },
                        row.map((btn, bi) => {
                            if (btn.blank) return e('div', { key: bi, style: { flex: 1 } });

                            const label = (shiftOn && btn.s) ? btn.s : btn.l;

                            // Colors — tera neon dark theme
                            let bg, color, border;
                            if (btn.eq) { bg = 'rgba(0,245,255,0.2)'; color = '#00f5ff'; border = '1px solid rgba(0,245,255,0.4)'; }
                            else if (btn.ac || btn.del) { bg = 'rgba(239,68,68,0.15)'; color = '#ef4444'; border = '1px solid rgba(239,68,68,0.3)'; }
                            else if (btn.op) { bg = 'rgba(255,255,255,0.1)'; color = '#00f5ff'; border = '1px solid rgba(255,255,255,0.15)'; }
                            else if (btn.num) { bg = 'rgba(255,255,255,0.06)'; color = '#f3f4f6'; border = '1px solid rgba(255,255,255,0.1)'; }
                            else if (btn.l === 'SHIFT') { bg = shiftOn ? 'rgba(251,191,36,0.2)' : 'rgba(255,255,255,0.05)'; color = shiftOn ? '#fbbf24' : '#94a3b8'; border = '1px solid rgba(251,191,36,0.3)'; }
                            else { bg = 'rgba(255,255,255,0.04)'; color = '#94a3b8'; border = '1px solid rgba(255,255,255,0.07)'; }

                            return e('button', {
                                key: bi,
                                onClick: () => handleBtn(label),
                                style: {
                                    flex: 1, padding: btn.num || btn.op || btn.eq || btn.del || btn.ac ? '14px 4px' : '10px 4px',
                                    background: bg, color: color, border: border,
                                    borderRadius: '10px', cursor: 'pointer',
                                    fontSize: btn.sci ? '0.78rem' : '1.1rem',
                                    fontWeight: btn.num || btn.eq ? '700' : '600',
                                    fontFamily: 'inherit', lineHeight: '1',
                                    boxShadow: 'none', transition: 'all 0.15s',
                                    display: 'flex', flexDirection: 'column',
                                    alignItems: 'center', justifyContent: 'center', gap: '2px',
                                    minWidth: 0
                                }
                            },
                                btn.s && e('span', { style: { fontSize: '0.55rem', color: '#f6ad55', lineHeight: '1' } }, btn.s),
                                e('span', null, btn.l)
                            );
                        })
                    )
                )
            )
        )
    );
};
const AllInOneCalculator = () => {
    const [activeCalc, setActiveCalc] = useState(null); // null, 'age', 'calories', 'percentage'

    // Age Calculator States
    const [birthDate, setBirthDate] = useState('');
    const [ageResult, setAgeResult] = useState(null);

    // Calories Calculator States
    const [calAge, setCalAge] = useState('');
    const [calGender, setCalGender] = useState('male');
    const [calWeight, setCalWeight] = useState('');
    const [calHeight, setCalHeight] = useState('');
    const [calActivity, setCalActivity] = useState('1.2');
    const [calResult, setCalResult] = useState(null);

    // Percentage Calculator States
    const [pNum, setPNum] = useState('');
    const [pTotal, setPTotal] = useState('');
    const [pResult, setPResult] = useState(null);

    // --- LOGIC FUNCTIONS ---
    const calculateAge = () => {
        if (!birthDate) return;

        // User ke likhe format "DD-MM-YYYY" ko split karenge
        const dateParts = birthDate.split('-');

        // Check karein ke user ne sahi format likha hai ya nahi (3 hisse hone chahiye)
        if (dateParts.length !== 3) {
            setAgeResult("Sahi format likhein: DD-MM-YYYY (e.g., 26-12-2004)");
            return;
        }

        const day = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1; // JS mein months 0 se start hote hain (Jan = 0)
        const year = parseInt(dateParts[2], 10);

        // Agar saal poora nahi likha ya galat hai to error handle karein
        if (isNaN(day) || isNaN(month) || isNaN(year) || year < 1000) {
            setAgeResult("Meharbani karke valid date aur poora saal (YYYY) likhein.");
            return;
        }

        const birth = new Date(year, month, day);
        const now = new Date();

        // Agar future ki date daal di ho
        if (birth > now) {
            setAgeResult("Birth date future ki nahi ho sakti!");
            return;
        }

        let years = now.getFullYear() - birth.getFullYear();
        let months = now.getMonth() - birth.getMonth();
        let days = now.getDate() - birth.getDate();

        if (days < 0) {
            months--;
            days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        }
        if (months < 0) {
            years--;
            months += 12;
        }

        setAgeResult(`${years} Years, ${months} Months, aur ${days} Days`);
    };

    const calculateCalories = () => {
        if (!calAge || !calWeight || !calHeight) return;
        const w = parseFloat(calWeight);
        const h = parseFloat(calHeight);
        const a = parseFloat(calAge);

        let bmr = (calGender === 'male')
            ? (10 * w) + (6.25 * h) - (5 * a) + 5
            : (10 * w) + (6.25 * h) - (5 * a) - 161;

        const totalCalories = Math.round(bmr * parseFloat(calActivity));
        setCalResult(`${totalCalories} kcal / day`);
    };

    const calculatePercentage = () => {
        if (!pNum || !pTotal) return;
        const res = (parseFloat(pNum) / parseFloat(pTotal)) * 100;
        setPResult(`${res.toFixed(2)}%`);
    };

    // Inner Card UI Component with glass-calc-card class
    // Inner Card UI Component with advanced animations
    const CalculatorCard = ({ title, icon, desc, onClick }) => {
        return e('div', { className: 'glass-calc-card', onClick: onClick },
            e('div', { className: 'calc-icon' }, icon),
            e('h3', { style: { fontSize: '20px' } }, title),
            e('p', { style: { fontSize: '14px', lineHeight: '1.6' } }, desc),
            // Naya Animated Action Button
            e('div', { className: 'calc-action' }, 'Open Tool →')
        );
    };

    // --- RENDER VIEWS ---
    // --- RENDER VIEWS ---
    if (activeCalc) {
        if (activeCalc === 'cgpa') {
            return e(CGPACalculator, { onBack: () => setActiveCalc(null) });
        }
        // Switch ya if-else block mein ye add karein:
        if (activeCalc === 'course-cgpa') {
            return e(CourseCGPACalculator, { onBack: () => setActiveCalc(null) });
        }

        if (activeCalc === 'scientific') {
            return e(ScientificCalculator, { onBack: () => setActiveCalc(null) });
        }

        let currentForm = null;

        // 1. AGE CALCULATOR (Cyan Neon Theme)
        if (activeCalc === 'age') {
            currentForm = e(React.Fragment, null,

                e('h2', { style: { fontSize: '2rem', fontWeight: '800', marginBottom: '30px', textAlign: 'center', background: 'linear-gradient(to right, #00f5ff, #bd00ff, #ff007f, #00f5ff)', backgroundSize: '300% auto', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'flowColors 8s linear infinite', padding: '20px', border: '1px solid rgba(0,245,255,0.2)', borderTop: '1px solid rgba(0,245,255,0.5)', borderRadius: '16px', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' } }, 'Age Calculator'),
                e('div', { style: { marginBottom: '30px', textAlign: 'left' } },
                    e('label', { style: { display: 'block', color: '#00f5ff', marginBottom: '10px', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: '700' } }, 'Select Date of Birth'),
                    // IS KOD KO PURANE INPUT KI JAGAH RAKHEIN:
                    e('input', {
                        type: 'text',
                        placeholder: 'DD-MM-YYYY', // Placeholder de diya taake user ko pata chale
                        value: birthDate,
                        onChange: (e) => setBirthDate(e.target.value), // Ab user manually likh sakega
                        style: {
                            width: '100%',
                            padding: '16px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            color: '#fff',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '12px',
                            fontSize: '1rem',
                            outline: 'none'
                        }
                    })
                ),

                e('button', { className: 'action-btn', onClick: calculateAge, style: { display: 'block', margin: '0 auto', padding: '16px 40px', fontSize: '1.1rem' } }, '⚡ Calculate Exact Age'),

                ageResult && e('div', { className: 'result-card', style: { marginTop: '30px', padding: '25px', background: 'rgba(0, 245, 255, 0.05)', border: '1px solid rgba(0, 245, 255, 0.3)', boxShadow: '0 0 20px rgba(0, 245, 255, 0.1)' } },
                    e('p', { style: { color: '#94a3b8', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '10px' } }, 'Your Age Is'),
                    e('div', { style: { color: '#00f5ff', fontSize: '1.8rem', fontWeight: '800', textShadow: '0 0 15px rgba(0, 245, 255, 0.4)' } }, ageResult)
                )
            );
        }

        // 2. CALORIES CALCULATOR (Pink Neon Theme)
        else if (activeCalc === 'calories') {
            currentForm = e(React.Fragment, null,

                e('h2', { style: { fontSize: '2rem', fontWeight: '800', marginBottom: '30px', textAlign: 'center', background: 'linear-gradient(to right, #00f5ff, #bd00ff, #ff007f, #00f5ff)', backgroundSize: '300% auto', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'flowColors 8s linear infinite', padding: '20px', border: '1px solid rgba(255,0,127,0.2)', borderTop: '1px solid rgba(255,0,127,0.5)', borderRadius: '16px', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' } }, 'Calories Calculator'),
                e('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '25px', textAlign: 'left' } },

                    e('div', null,
                        e('label', { style: { display: 'block', color: '#ff007f', marginBottom: '8px', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700' } }, 'Age (Years)'),
                        e('input', { type: 'number', placeholder: 'e.g. 22', value: calAge, onChange: (e) => setCalAge(e.target.value), style: { width: '100%', padding: '14px', background: 'rgba(255, 255, 255, 0.05)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', outline: 'none' } })
                    ),
                    e('div', null,
                        e('label', { style: { display: 'block', color: '#ff007f', marginBottom: '8px', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700' } }, 'Gender'),
                        e('select', { value: calGender, onChange: (e) => setCalGender(e.target.value), style: { width: '100%', padding: '14px', background: 'rgba(255, 255, 255, 0.05)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', outline: 'none' } },
                            e('option', { value: 'male', style: { background: '#0f172a' } }, 'Male'),
                            e('option', { value: 'female', style: { background: '#0f172a' } }, 'Female')
                        )
                    ),
                    e('div', null,
                        e('label', { style: { display: 'block', color: '#ff007f', marginBottom: '8px', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700' } }, 'Weight (kg)'),
                        e('input', { type: 'number', placeholder: 'e.g. 70', value: calWeight, onChange: (e) => setCalWeight(e.target.value), style: { width: '100%', padding: '14px', background: 'rgba(255, 255, 255, 0.05)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', outline: 'none' } })
                    ),
                    e('div', null,
                        e('label', { style: { display: 'block', color: '#ff007f', marginBottom: '8px', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700' } }, 'Height (cm)'),
                        e('input', { type: 'number', placeholder: 'e.g. 175', value: calHeight, onChange: (e) => setCalHeight(e.target.value), style: { width: '100%', padding: '14px', background: 'rgba(255, 255, 255, 0.05)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', outline: 'none' } })
                    )
                ),

                e('div', { style: { marginBottom: '30px', textAlign: 'left' } },
                    e('label', { style: { display: 'block', color: '#ff007f', marginBottom: '8px', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700' } }, 'Activity Level'),
                    e('select', { value: calActivity, onChange: (e) => setCalActivity(e.target.value), style: { width: '100%', padding: '14px', background: 'rgba(255, 255, 255, 0.05)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', outline: 'none' } },
                        e('option', { value: '1.2', style: { background: '#0f172a' } }, 'Sedentary (Little to no exercise)'),
                        e('option', { value: '1.375', style: { background: '#0f172a' } }, 'Light (Exercise 1-3 days/week)'),
                        e('option', { value: '1.55', style: { background: '#0f172a' } }, 'Moderate (Exercise 3-5 days/week)'),
                        e('option', { value: '1.725', style: { background: '#0f172a' } }, 'Heavy (Exercise 6-7 days/week)')
                    )
                ),

                e('button', { className: 'action-btn', onClick: calculateCalories, style: { display: 'block', margin: '0 auto', padding: '16px 40px', fontSize: '1.1rem' } }, '⚡ Calculate Daily Calories'),

                calResult && e('div', { className: 'result-card', style: { marginTop: '30px', padding: '25px', background: 'rgba(255, 0, 127, 0.05)', border: '1px solid rgba(255, 0, 127, 0.3)', boxShadow: '0 0 20px rgba(255, 0, 127, 0.1)' } },
                    e('p', { style: { color: '#94a3b8', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '10px' } }, 'Maintenance Energy Required'),
                    e('div', { style: { color: '#ff007f', fontSize: '2.2rem', fontWeight: '800', textShadow: '0 0 15px rgba(255, 0, 127, 0.4)' } }, calResult)
                )
            );
        }

        // 3. PERCENTAGE CALCULATOR (Purple Neon Theme)
        else if (activeCalc === 'percentage') {
            currentForm = e(React.Fragment, null,


                e('h2', { style: { fontSize: '2rem', fontWeight: '800', marginBottom: '30px', textAlign: 'center', background: 'linear-gradient(to right, #00f5ff, #bd00ff, #ff007f, #00f5ff)', backgroundSize: '300% auto', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'flowColors 8s linear infinite', padding: '20px', border: '1px solid rgba(189,0,255,0.2)', borderTop: '1px solid rgba(189,0,255,0.5)', borderRadius: '16px', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' } }, 'Percentage Calculator'),
                e('p', { style: { color: '#94a3b8', fontSize: '0.95rem', marginBottom: '30px', textAlign: 'center' } }, 'Quickly find what percentage an amount is out of a total.'),

                e('div', { style: { display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', justifyContent: 'center' } },
                    e('div', { style: { flex: '1', minWidth: '140px', textAlign: 'left' } },
                        e('label', { style: { display: 'block', color: '#bd00ff', marginBottom: '8px', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700' } }, 'Obtained Marks / Value'),
                        e('input', { type: 'number', placeholder: 'e.g. 450', value: pNum, onChange: (e) => setPNum(e.target.value), style: { width: '100%', padding: '16px', background: 'rgba(255, 255, 255, 0.05)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', outline: 'none', fontSize: '1.1rem' } })
                    ),
                    e('span', { style: { color: '#ffffff', fontWeight: '800', fontSize: '1.2rem', marginTop: '20px', opacity: '0.5' } }, 'OF'),
                    e('div', { style: { flex: '1', minWidth: '140px', textAlign: 'left' } },
                        e('label', { style: { display: 'block', color: '#bd00ff', marginBottom: '8px', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700' } }, 'Total Amount'),
                        e('input', { type: 'number', placeholder: 'e.g. 500', value: pTotal, onChange: (e) => setPTotal(e.target.value), style: { width: '100%', padding: '16px', background: 'rgba(255, 255, 255, 0.05)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', outline: 'none', fontSize: '1.1rem' } })
                    )
                ),


                e('button', { className: 'action-btn', onClick: calculatePercentage, style: { display: 'block', margin: '0 auto', padding: '16px 40px', fontSize: '1.1rem' } }, '⚡ Calculate Percentage'),

                pResult && e('div', { className: 'result-card', style: { marginTop: '30px', padding: '25px', background: 'rgba(189, 0, 255, 0.05)', border: '1px solid rgba(189, 0, 255, 0.3)', boxShadow: '0 0 20px rgba(189, 0, 255, 0.1)' } },
                    e('p', { style: { color: '#94a3b8', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '10px' } }, 'Final Result'),
                    e('div', { style: { color: '#bd00ff', fontSize: '2.5rem', fontWeight: '800', textShadow: '0 0 15px rgba(189, 0, 255, 0.4)' } }, pResult)
                )
            );
        }
        // Agar activeCalc ki value 'cgpa' ho to naya calculator render karo
        if (activeCalc === 'cgpa') {
            return e(CGPACalculator, { onBack: () => setActiveCalc(null) });
        }
        // Jab aap active view render kar rahay hon, to logic is tarha extend kar lein:

        // Return The Premium Wrapper with Stylish Back Button
        return e('div', { className: 'container-section calculator-hub-wrapper' },
            e('div', { className: 'glass-calc-form' },
                e('button', {
                    onClick: () => {
                        setActiveCalc(null);
                        setAgeResult(null);
                        setCalResult(null);
                        setPResult(null);
                    },
                    style: {
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.02))',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        color: '#00f5ff', // Cyan color for neon tech look
                        cursor: 'pointer',
                        marginBottom: '30px',
                        padding: '10px 20px',
                        borderRadius: '30px', // More rounded pill shape
                        fontSize: '0.88rem',
                        fontWeight: '600',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        letterSpacing: '0.5px',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)'
                    }

                }, '← Back to Hub'),
                currentForm
            )
        );
    }

    // Main Hub Layout using glass classes
    // 🧮 CALCULATOR HUB RETURN CONTAINER
    return e('div', { className: 'container-section calculator-hub-wrapper' },
        e('div', { style: { textAlign: 'center', marginBottom: '60px' } },
            e('h1', { className: 'brand-title', style: { marginBottom: '15px' } }, '🧮 Calculator Hub'),
            e('p', { style: { color: '#94a3b8', fontSize: '16px', maxWidth: '500px', margin: '0 auto', lineHeight: '1.6' } }, 'Select any advanced tool below to compute instant daily utilities with precision.')
        ),

        // 4 Cards inside the perfect responsive grid layout
        e('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '35px', maxWidth: '1000px', margin: '0 auto' } },
            CalculatorCard({ title: 'Age Calculator', icon: '📅', desc: 'Sahi baras, mahine, aur dinon ke mutabiq apni exact umar check karein.', onClick: () => setActiveCalc('age') }),
            CalculatorCard({ title: 'Calories Calculator', icon: '🔥', desc: 'BMR formula ke sath apni jism ke mutabiq daily energy calories janiye.', onClick: () => setActiveCalc('calories') }),
            CalculatorCard({ title: 'Percentage Calculator', icon: '📊', desc: 'School marks ya business statistics ke liye kisi bhi raqam ki exact percentage nikalain.', onClick: () => setActiveCalc('percentage') }),
            CalculatorCard({ title: 'CGPA Calculator', icon: '🎓', desc: 'Calculate your exact CGPA first enter your semester obtain CGPA and credit hours.', onClick: () => setActiveCalc('cgpa') }),
            CalculatorCard({
                title: 'Course CGPA',
                icon: '📝',
                desc: 'Courses, grades aur credit hours daal kar apna CGPA calculate karein.',
                onClick: () => setActiveCalc('course-cgpa')
            }),
            // Isko CGPA card wale code ke foran baad paste karein
            e('div', {
                className: 'premium-tool-card calc-card',
                onClick: () => setActiveCalc('scientific')  // ✅ SAHI // <-- DHEAYAN RAHE: Aap apne state function ka naam yahan likhein jo "active" change karta hy
            },
                e('div', null,
                    e('div', { className: 'premium-badge' }, '🔬 Advanced Math'),
                    e('div', { className: 'card-icon-container' }, '📐'),
                    e('h3', { className: 'card-main-title' }, 'Scientific Calculator'),
                    e('p', { className: 'card-secondary-desc' }, 'Evaluate complex mathematical expressions, trigonometry, and logarithms instantly inside your browser.')
                ),
                e('div', { className: 'card-action-link-footer' }, 'Open Calculator', e('span', { className: 'arrow-vector' }, '→'))
            )
        )
    );
    // Isko Percentage Calculator wale card ke thik niche paste karein:

};

// Injection into DOM
const rootElement = document.getElementById('root');
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(e(React.StrictMode, null, e(App)));
}
