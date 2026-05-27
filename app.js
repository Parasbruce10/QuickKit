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

    // Aapki website se related 3 professional lines jo loop mein chalengi
    const typewriterLines = [
        "Premium digital utilities to supercharge your daily workflow.",
        "Test your typing speed with real-time advanced precision metrics.",
        "Evaluate password strength and generate aesthetic bios locally."
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
                // Stats Row - teeno boxes ek wrapper mein
e('div', { className: 'hero-stats-row' },
    e('div', { className: 'stat-item stat-delay-1' },
        e('div', { className: 'stat-number' }, '3+'),
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
),
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