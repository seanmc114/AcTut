/* drills.js — LC Drill Banks (Serious LC Edition v2)
   - No placeholders
   - JC→LC bridge difficulty (not too hard)
   - Rapid / Structured / Cloze for ALL core subjects
*/

(function(){

const N = (s)=> String(s||"").trim().toLowerCase();

function S(build,strength,exam){
  return { build,strength,exam };
}

function A(q, answers){ return { q, a: answers }; }
function C(text, blanks){ return { text, blanks }; }

/* =========================
   MATHS (keep strong)
========================= */

const Maths = {
  rapid: [
    A("Solve: 3x + 5 = 20", ["5","x=5"]),
    A("Differentiate: 4x^3", ["12x^2"]),
    A("Solve: x^2 - 16 = 0", ["4,-4","4 and -4","x=4,-4","-4,4"]),
    A("sin(30°)", ["0.5","1/2"]),
    A("Factorise: x^2 + 5x + 6", ["(x+2)(x+3)"]),
    A("Mean of 4, 6, 10", ["20/3","6.67","6.666","6.7"]),
    A("Differentiate: constant 7", ["0"]),
    A("Rearrange: A = πr^2 for r", ["√(a/π)","sqrt(a/pi)","(a/pi)^(1/2)"]),
    A("Solve: 2^x = 8", ["3"]),
    A("Expand: (x+4)^2", ["x^2+8x+16","x^2 + 8x + 16"])
  ],
  structured: [
    { q:"Solve fully: x^2 - 5x + 6 = 0",
      scaffold: S(
        ["Set equal to 0","Factorise","Set each bracket = 0","Give 2 solutions"],
        ["Factorise → 2 solutions"],
        ["Show key steps"]
      )
    },
    { q:"Differentiate: 3x^2 + 4x - 5",
      scaffold: S(
        ["Power rule each term","Simplify","Final answer"],
        ["Power rule → simplify"],
        ["Answer only (correct)"]
      )
    },
    { q:"Find gradient between (1,2) and (5,10)",
      scaffold: S(
        ["m=(y2−y1)/(x2−x1)","Substitute","Simplify"],
        ["Formula → substitute"],
        ["State gradient"]
      )
    },
    { q:"Integration: ∫ 6x dx",
      scaffold: S(
        ["Increase power by 1","Divide by new power","Add +C"],
        ["Power + divide + C"],
        ["Include +C"]
      )
    },
    { q:"Probability: explain your method (short)",
      scaffold: S(
        ["State sample space","Count favourable","Write probability"],
        ["Count + divide"],
        ["Answer + brief method"]
      )
    }
  ],
  cloze: [
    C("The derivative of x^n is ___ x^(n-1).", ["n"]),
    C("To solve quadratics, first set equal to ___.", ["0"]),
    C("m = (y2 - y1) / (___ - x1).", ["x2"]),
    C("∫ x^2 dx = x^3 / ___ + C.", ["3"]),
    C("Probability of certain event = ___.", ["1"])
  ]
};

/* =========================
   BIOLOGY
========================= */

const Biology = {
  rapid: [
    A("Define osmosis (short)", ["movement of water","movement of water from high to low","movement of water across a membrane"]),
    A("Site of respiration?", ["mitochondria","mitochondrion"]),
    A("Name one enzyme", ["amylase","protease","lipase","catalase"]),
    A("Define diffusion (short)", ["movement from high to low","movement of particles from high to low"]),
    A("Role of chlorophyll?", ["absorbs light","absorbs light energy"]),
    A("Name a vitamin", ["a","b","c","d","k","vitamin a","vitamin b","vitamin c","vitamin d","vitamin k"]),
    A("Gas released in photosynthesis?", ["oxygen"]),
    A("Function of xylem?", ["water transport","transports water","transport water"]),
    A("Name a plant hormone", ["auxin","gibberellin"]),
    A("Define habitat", ["place where organism lives","where an organism lives"])
  ],
  structured: [
    { q:"Explain photosynthesis (structure)",
      scaffold: S(
        ["Word equation","Where it happens","Light energy","Products","One limiting factor"],
        ["Equation + place + factor"],
        ["Clear explanation"]
      )
    },
    { q:"Describe respiration (structure)",
      scaffold: S(
        ["Definition","Where it happens","Aerobic vs anaerobic","Products"],
        ["Definition + products"],
        ["Clear definition"]
      )
    },
    { q:"Experiment answer structure (Biology)",
      scaffold: S(
        ["Aim","Apparatus","Method","Control","Result/Conclusion"],
        ["Aim → method → conclusion"],
        ["Exam layout"]
      )
    },
    { q:"Explain enzyme action (structure)",
      scaffold: S(
        ["Active site","Substrate","Specific fit","Denature (heat/pH)"],
        ["Active site + denature"],
        ["Clear mechanism"]
      )
    },
    { q:"Explain a food chain (structure)",
      scaffold: S(
        ["Producer","Consumer(s)","Energy flow","Example"],
        ["Producer → consumer → energy"],
        ["Concise answer"]
      )
    }
  ],
  cloze: [
    C("The ___ is the site of respiration.", ["mitochondrion"]),
    C("Water moves by ___ (special diffusion of water).", ["osmosis"]),
    C("Photosynthesis requires ___ energy.", ["light"]),
    C("Enzymes are ___ catalysts.", ["biological"]),
    C("Gas taken in for aerobic respiration is ___.", ["oxygen"])
  ]
};

/* =========================
   ENGLISH
========================= */

const English = {
  rapid: [
    A("Name one persuasive technique", ["repetition","emotive language","statistics","rhetorical question","anecdote","hyperbole"]),
    A("Define tone (short)", ["attitude","writer's attitude","speaker's attitude"]),
    A("Define theme (short)", ["central idea","main idea"]),
    A("What is imagery used for?", ["creates picture","creates a picture","visualise","visualize"]),
    A("PEE stands for?", ["point evidence explain","point, evidence, explain","point evidence explanation"]),
    A("Name one narrative technique", ["flashback","foreshadowing","dialogue","description"]),
    A("Define thesis (short)", ["main argument","main point","central argument"]),
    A("What does 'evaluate' mean?", ["judge","assess","weigh up","give judgement","give a judgement"]),
    A("One linking word for comparison", ["however","similarly","whereas","in contrast"]),
    A("Purpose of rhetorical question?", ["engage reader","engage the reader","make reader think"])
  ],
  structured: [
    { q:"PEE paragraph structure (write the steps)",
      scaffold: S(
        ["Point","Evidence (quote/example)","Explain effect","Link back"],
        ["Point + evidence + effect"],
        ["Clear paragraph"]
      )
    },
    { q:"Speech structure (steps)",
      scaffold: S(
        ["Address audience","Clear position","3 points","Strong close"],
        ["Audience + points + close"],
        ["Persuasive shape"]
      )
    },
    { q:"Comparative paragraph structure",
      scaffold: S(
        ["Similarity","Difference","Evidence","Judgement"],
        ["Compare + judge"],
        ["Analytical"]
      )
    },
    { q:"Personal essay opening (steps)",
      scaffold: S(
        ["Hook","Sense of voice","Direction"],
        ["Hook + direction"],
        ["Focused opening"]
      )
    },
    { q:"Answering a question: plan (steps)",
      scaffold: S(
        ["Underline key words","Pick 2–3 points","Find evidence","Write"],
        ["Key words + 3 points"],
        ["Exam habits"]
      )
    }
  ],
  cloze: [
    C("A paragraph should make a ___ then support it with ___.", ["point","evidence"]),
    C("A thesis states the main ___ of the essay.", ["argument"]),
    C("Imagery creates a mental ___.", ["picture"]),
    C("Evaluation requires a clear ___.", ["judgement","judgment"]),
    C("PEE = Point, ___ , Explain.", ["evidence"])
  ]
};

/* =========================
   SPANISH (JC→LC bridge, real)
========================= */

const Spanish = {
  rapid: [
    A("Translate: I went yesterday", ["fui ayer"]),
    A("Translate: I have to study", ["tengo que estudiar"]),
    A("Translate: In my opinion", ["en mi opinión","en mi opinion"]),
    A("Translate: however", ["sin embargo"]),
    A("Translate: because", ["porque"]),
    A("Translate: I would like", ["me gustaría","me gustaria"]),
    A("Preterite of 'tener' (yo)", ["tuve"]),
    A("Future of 'comer' (yo)", ["comeré","comere"]),
    A("How do you say 'there is/are'?", ["hay"]),
    A("Translate: last year", ["el año pasado","el ano pasado"])
  ],
  structured: [
    { q:"90-word opinion paragraph: structure (steps)",
      scaffold: S(
        ["Opinion sentence","2 reasons","1 example","Connector","Finish with judgement"],
        ["Opinion + reasons + example"],
        ["Exam paragraph shape"]
      )
    },
    { q:"Describe your school: structure (steps)",
      scaffold: S(
        ["Where it is","Facilities","Opinion","One improvement"],
        ["Facilities + opinion"],
        ["Clear description"]
      )
    },
    { q:"Role-play answer structure (steps)",
      scaffold: S(
        ["Polite opener","Key info","Reason","Question back"],
        ["Info + reason + question"],
        ["Oral tactics"]
      )
    },
    { q:"Past tense story: structure (steps)",
      scaffold: S(
        ["When/where","What happened","How you felt","Ending"],
        ["When + what + feeling"],
        ["Clear past narrative"]
      )
    },
    { q:"Improve a sentence (steps)",
      scaffold: S(
        ["Add time phrase","Add opinion","Add connector","Check verb"],
        ["Time + opinion + connector"],
        ["Upgrade basics"]
      )
    }
  ],
  cloze: [
    C("I went = ___", ["fui"]),
    C("I have to = ___ que", ["tengo"]),
    C("In my opinion = en mi ___", ["opinión","opinion"]),
    C("There is/are = ___", ["hay"]),
    C("Last year = el año ___", ["pasado","pasado"])
  ]
};

/* =========================
   FRENCH (JC→LC bridge, real)
========================= */

const French = {
  rapid: [
    A("Translate: in my opinion", ["à mon avis","a mon avis"]),
    A("Translate: because", ["parce que"]),
    A("Translate: however", ["cependant","pourtant"]),
    A("Translate: I went", ["je suis allé","je suis alle","je suis allée","je suis allee"]),
    A("Translate: I like", ["j'aime","jaime"]),
    A("Translate: last year", ["l'année dernière","lannee derniere","l annee derniere"]),
    A("How do you say 'there is/are'?", ["il y a"]),
    A("Translate: I would like", ["je voudrais"]),
    A("Translate: I have to", ["je dois"]),
    A("Translate: at the weekend", ["le week-end","le weekend"])
  ],
  structured: [
    { q:"90-word opinion paragraph: structure (steps)",
      scaffold: S(
        ["Opinion","2 reasons","1 example","Connector","Finish"],
        ["Opinion + reasons + example"],
        ["Exam paragraph shape"]
      )
    },
    { q:"Describe your town: structure (steps)",
      scaffold: S(
        ["Where","What there is","Opinion","One improvement"],
        ["Details + opinion"],
        ["Clear description"]
      )
    },
    { q:"Past narrative: structure (steps)",
      scaffold: S(
        ["Quand/où","Ce que j'ai fait","Sentiment","Fin"],
        ["Quand + action + sentiment"],
        ["Clear story"]
      )
    },
    { q:"Oral response: structure (steps)",
      scaffold: S(
        ["Polite opener","Key info","Reason","Question"],
        ["Info + reason + question"],
        ["Oral tactics"]
      )
    },
    { q:"Upgrade a sentence: structure (steps)",
      scaffold: S(
        ["Add time phrase","Add opinion","Add connector","Check verb"],
        ["Time + opinion + connector"],
        ["Upgrade basics"]
      )
    }
  ],
  cloze: [
    C("In my opinion = à mon ___", ["avis"]),
    C("There is/are = il y ___", ["a"]),
    C("Because = parce ___", ["que"]),
    C("I have to = je ___", ["dois"]),
    C("Last year = l'année ___", ["dernière","derniere"])
  ]
};

/* =========================
   GERMAN (JC→LC bridge, real)
========================= */

const German = {
  rapid: [
    A("Translate: in my opinion", ["meiner meinung nach","meiner Meinung nach"]),
    A("Translate: because", ["weil"]),
    A("Translate: however", ["aber","jedoch"]),
    A("Translate: I went", ["ich ging","ich bin gegangen"]),
    A("Translate: I like", ["ich mag"]),
    A("Translate: last year", ["letztes jahr","letztes Jahr"]),
    A("How do you say 'there is/are'?", ["es gibt"]),
    A("Translate: I would like", ["ich möchte","ich mochte","ich möchte gern","ich mochte gern"]),
    A("Translate: I have to", ["ich muss"]),
    A("Translate: at the weekend", ["am wochenende","am Wochenende"])
  ],
  structured: [
    { q:"90-word opinion paragraph: structure (steps)",
      scaffold: S(
        ["Meinung","2 Gründe","1 Beispiel","Konjunktion","Schluss"],
        ["Meinung + Gründe + Beispiel"],
        ["Exam paragraph shape"]
      )
    },
    { q:"Describe your school: structure (steps)",
      scaffold: S(
        ["Wo","Was es gibt","Meinung","Verbesserung"],
        ["Details + Meinung"],
        ["Clear description"]
      )
    },
    { q:"Past narrative: structure (steps)",
      scaffold: S(
        ["Wann/wo","Was ich gemacht habe","Gefühl","Ende"],
        ["Wann + Aktion + Gefühl"],
        ["Clear story"]
      )
    },
    { q:"Oral response: structure (steps)",
      scaffold: S(
        ["Höflich","Info","Grund","Frage"],
        ["Info + Grund + Frage"],
        ["Oral tactics"]
      )
    },
    { q:"Upgrade a sentence: structure (steps)",
      scaffold: S(
        ["Zeitphrase","Meinung","Konjunktion","Verb prüfen"],
        ["Zeit + Meinung + Konjunktion"],
        ["Upgrade basics"]
      )
    }
  ],
  cloze: [
    C("Because = ___", ["weil"]),
    C("There is/are = es ___", ["gibt"]),
    C("I have to = ich ___", ["muss"]),
    C("Last year = letztes ___", ["jahr","Jahr"]),
    C("However = ___ / jedoch", ["aber"])
  ]
};

/* =========================
   ACCOUNTING (real)
========================= */

const Accounting = {
  rapid: [
    A("Purpose of Trial Balance?", ["check arithmetic","checks arithmetic","to check arithmetic"]),
    A("Depreciation reduces value of?", ["fixed assets","fixed asset"]),
    A("Name one depreciation method", ["straight line","reducing balance"]),
    A("Current ratio formula (words)", ["current assets/current liabilities","current assets divided by current liabilities"]),
    A("Gross profit = ?", ["sales - cost of sales","sales minus cost of sales"]),
    A("Trade receivables are also called", ["debtors","accounts receivable"]),
    A("Trade payables are also called", ["creditors","accounts payable"]),
    A("Suspense account used for?", ["errors","error correction","to correct errors"]),
    A("Bank overdraft is a", ["current liability","liability"]),
    A("Stock is valued at", ["lower of cost and net realisable value","lower of cost and nrv"])
  ],
  structured: [
    { q:"Explain how to correct an error using Suspense (steps)",
      scaffold: S(
        ["Identify error","Work out double entry","Post journals","Update suspense"],
        ["Identify → journal → clear suspense"],
        ["Clear steps"]
      )
    },
    { q:"Ratio answer structure (steps)",
      scaffold: S(
        ["State formula","Substitute figures","Calculate","Comment"],
        ["Formula + comment"],
        ["Exam style"]
      )
    },
    { q:"Depreciation question structure (steps)",
      scaffold: S(
        ["State method","Show workings","Update asset value","Profit effect"],
        ["Method + workings"],
        ["Clear layout"]
      )
    },
    { q:"Control account structure (steps)",
      scaffold: S(
        ["Opening balance","Credit sales/purchases","Payments/returns","Closing balance"],
        ["Op + movements + close"],
        ["Exam layout"]
      )
    },
    { q:"Income statement structure (steps)",
      scaffold: S(
        ["Sales","Cost of sales","Gross profit","Expenses","Net profit"],
        ["GP then expenses"],
        ["Clear headings"]
      )
    }
  ],
  cloze: [
    C("Gross profit = Sales − ___", ["cost of sales"]),
    C("Current ratio = Current assets / Current ___", ["liabilities"]),
    C("Depreciation applies to ___ assets.", ["fixed"]),
    C("Debtors are trade ___", ["receivables"]),
    C("Creditors are trade ___", ["payables"])
  ]
};

/* =========================
   ECONOMICS (real, LC-mapped)
========================= */

const Economics = {
  rapid: [
    A("Define opportunity cost (short)", ["next best alternative foregone","next best alternative forgone","next best alternative given up"]),
    A("Inflation means general ___ in prices", ["rise","increase"]),
    A("Name one function of money", ["medium of exchange","store of value","unit of account"]),
    A("GDP is total value of ___ produced", ["goods and services","goods & services"]),
    A("One cause of inflation", ["increased demand","cost push","demand pull","higher wages","oil prices"]),
    A("One effect of inflation", ["reduced purchasing power","uncertainty","worse competitiveness"]),
    A("Define elasticity (short)", ["responsiveness","responsiveness of demand","responsiveness of quantity demanded"]),
    A("Market equilibrium is where", ["supply equals demand","supply = demand","where demand equals supply"]),
    A("Name one factor of production", ["land","labour","labor","capital","enterprise"]),
    A("Fiscal policy relates to", ["taxation and government spending","tax and spending","government spending and taxation"])
  ],
  structured: [
    { q:"Explain a change in demand (steps)",
      scaffold: S(
        ["State cause","Shift demand curve","Effect on price","Effect on quantity"],
        ["Shift → price/quantity"],
        ["Diagram + explanation"]
      )
    },
    { q:"Explain inflation (structure)",
      scaffold: S(
        ["Define","2 causes","2 effects","One policy to reduce"],
        ["Define + causes + effects"],
        ["Balanced answer"]
      )
    },
    { q:"Evaluation paragraph (structure)",
      scaffold: S(
        ["Point","Evidence/example","Counterpoint","Judgement"],
        ["Point + counter + judgement"],
        ["Exam evaluation"]
      )
    },
    { q:"Unemployment answer (structure)",
      scaffold: S(
        ["Define","Types","Causes","Effects","Solution"],
        ["Define + effects"],
        ["Clear layout"]
      )
    },
    { q:"Trade / globalisation answer (structure)",
      scaffold: S(
        ["Define","Benefits","Costs","Example","Judgement"],
        ["Benefits + costs"],
        ["Balanced answer"]
      )
    }
  ],
  cloze: [
    C("Opportunity cost = next best alternative ___", ["foregone","forgone"]),
    C("Inflation is a general ___ in prices.", ["rise","increase"]),
    C("When demand rises, the demand curve shifts to the ___", ["right"]),
    C("Equilibrium is where supply equals ___", ["demand"]),
    C("GDP measures output of goods and ___", ["services"])
  ]
};

/* =========================
   PHYSICS (real)
========================= */

const Physics = {
  rapid: [
    A("Unit of force", ["newton","n"]),
    A("Speed = distance / ___", ["time"]),
    A("Acceleration unit", ["m/s^2","m/s²"]),
    A("Ohm’s law (words)", ["v=ir","v = ir"]),
    A("Power (electrical) formula", ["p=vi","p = vi"]),
    A("Weight = mass × ___", ["g"]),
    A("Name one type of wave", ["transverse","longitudinal"]),
    A("Refraction happens when light", ["changes speed","changes direction","changes speed and direction"]),
    A("Energy unit", ["joule","j"]),
    A("Voltage is also called", ["potential difference","p.d.","pd"])
  ],
  structured: [
    { q:"Answering a calculation (steps)",
      scaffold: S(
        ["Write formula","Substitute","Units","Final answer"],
        ["Formula + substitute + units"],
        ["Exam layout"]
      )
    },
    { q:"Describe an experiment (steps)",
      scaffold: S(
        ["Aim","Apparatus","Method","Safety","Result"],
        ["Aim → method → result"],
        ["Clear structure"]
      )
    },
    { q:"Explain a graph (steps)",
      scaffold: S(
        ["Describe trend","Use data","Explain physics reason"],
        ["Trend + reason"],
        ["Exam explanation"]
      )
    },
    { q:"Electric circuits explanation (steps)",
      scaffold: S(
        ["State concept","Use Ohm’s law","Explain effect"],
        ["Concept + law + effect"],
        ["Clear reasoning"]
      )
    },
    { q:"Forces explanation (steps)",
      scaffold: S(
        ["Identify forces","Net force","Effect on motion"],
        ["Forces → net → motion"],
        ["Clear logic"]
      )
    }
  ],
  cloze: [
    C("Ohm’s law: V = I × ___", ["r"]),
    C("Power: P = V × ___", ["i"]),
    C("Weight = mass × ___", ["g"]),
    C("Speed = distance / ___", ["time"]),
    C("Force unit is the ___", ["newton"])
  ]
};

/* =========================
   CHEMISTRY (real)
========================= */

const Chemistry = {
  rapid: [
    A("pH below 7 is", ["acidic","acid"]),
    A("pH above 7 is", ["basic","alkaline"]),
    A("Name one alkali", ["sodium hydroxide","naoh","potassium hydroxide","koh"]),
    A("Atom with charge is an", ["ion"]),
    A("Name one type of bond", ["ionic","covalent","metallic"]),
    A("Mole symbol", ["mol"]),
    A("Mass number = protons + ___", ["neutrons"]),
    A("Periodic table groups go", ["vertical","up and down"]),
    A("Name one laboratory safety item", ["goggles","lab coat","gloves"]),
    A("HCl is", ["hydrochloric acid"])
  ],
  structured: [
    { q:"Acid/base answer structure (steps)",
      scaffold: S(
        ["Define acid/alkali","pH reference","Example","Safety"],
        ["Define + example"],
        ["Clear answer"]
      )
    },
    { q:"Bonding answer structure (steps)",
      scaffold: S(
        ["Type of bond","How formed","Diagram idea","Property"],
        ["Formed + property"],
        ["Exam explanation"]
      )
    },
    { q:"Mole calculation (steps)",
      scaffold: S(
        ["Write formula (n=m/M)","Substitute","Units","Answer"],
        ["Formula + substitute"],
        ["Exam layout"]
      )
    },
    { q:"Titration description (steps)",
      scaffold: S(
        ["Apparatus","Indicator","Endpoint","Repeat for accuracy"],
        ["Apparatus + endpoint"],
        ["Practical answer"]
      )
    },
    { q:"Rates of reaction (steps)",
      scaffold: S(
        ["Factor","What happens","Reason (collisions)","Example"],
        ["Factor + reason"],
        ["Clear explanation"]
      )
    }
  ],
  cloze: [
    C("Acid has pH ___ 7.", ["below","less than"]),
    C("Alkali has pH ___ 7.", ["above","greater than"]),
    C("Mass number = protons + ___", ["neutrons"]),
    C("Moles: n = m / ___", ["molar mass","m"]),
    C("HCl is ___ acid.", ["hydrochloric"])
  ]
};

/* =========================
   PE (real)
========================= */

const PE = {
  rapid: [
    A("Name one principle of training", ["specificity","overload","progression","reversibility","individual differences"]),
    A("Aerobic energy system used for", ["endurance","long duration","long duration exercise"]),
    A("Anaerobic energy system used for", ["short bursts","sprinting","high intensity short"]),
    A("Warm-up purpose (one)", ["prevent injury","increase blood flow","prepare body"]),
    A("Cool-down purpose (one)", ["reduce lactic acid","reduce heart rate","aid recovery"]),
    A("Flexibility improves", ["range of motion","rom"]),
    A("Skill-related fitness component", ["agility","balance","coordination","power","reaction time"]),
    A("Health-related fitness component", ["cardiovascular endurance","strength","muscular endurance","flexibility","body composition"]),
    A("SMART goals: S = ___", ["specific"]),
    A("RPE stands for", ["rating of perceived exertion"])
  ],
  structured: [
    { q:"Training plan answer structure (steps)",
      scaffold: S(
        ["Goal","Programme (FITT)","Progression","Recovery"],
        ["Goal + FITT + progression"],
        ["Clear plan"]
      )
    },
    { q:"Analysing performance (steps)",
      scaffold: S(
        ["Identify skill","Strengths","Weakness","How to improve"],
        ["Strength + weakness + fix"],
        ["Coach-style answer"]
      )
    },
    { q:"Energy systems comparison (steps)",
      scaffold: S(
        ["Aerobic","Anaerobic","Example sport","Why"],
        ["Compare + examples"],
        ["Clear comparison"]
      )
    },
    { q:"Injury prevention (steps)",
      scaffold: S(
        ["Warm-up","Technique","Equipment","Recovery"],
        ["Warm-up + recovery"],
        ["Practical answer"]
      )
    },
    { q:"FITT principle (steps)",
      scaffold: S(
        ["Frequency","Intensity","Time","Type","Example"],
        ["FITT + example"],
        ["Clear structure"]
      )
    }
  ],
  cloze: [
    C("FITT: F = ___", ["frequency"]),
    C("FITT: I = ___", ["intensity"]),
    C("Warm-up increases ___ flow.", ["blood"]),
    C("Aerobic = with ___", ["oxygen"]),
    C("Anaerobic = without ___", ["oxygen"])
  ]
};

/* =========================
   HOME ECONOMICS (real)
========================= */

const HomeEc = {
  rapid: [
    A("Name one macronutrient", ["carbohydrate","protein","fat","carbs"]),
    A("Protein function (one)", ["growth","repair","build tissue","repair tissue"]),
    A("Vitamin C source (one)", ["orange","citrus","fruit","pepper"]),
    A("Mineral needed for bones", ["calcium"]),
    A("Food preservation method", ["freezing","drying","salting","pickling","refrigeration"]),
    A("HACCP is about", ["food safety","hygiene"]),
    A("Saturated fats found in", ["butter","animal fats","cream"]),
    A("Unsaturated fats found in", ["olive oil","vegetable oil","nuts","fish"]),
    A("Consumer right (one)", ["safety","information","choice","to be heard"]),
    A("Balanced diet means", ["variety","all nutrients","correct amounts"])
  ],
  structured: [
    { q:"Nutrition answer structure (steps)",
      scaffold: S(
        ["Name nutrient","Function","Source","Deficiency/excess"],
        ["Function + source"],
        ["Exam layout"]
      )
    },
    { q:"Food safety answer structure (steps)",
      scaffold: S(
        ["Hazard","Prevention","Hygiene","Example"],
        ["Hazard + prevention"],
        ["Practical answer"]
      )
    },
    { q:"Consumer question structure (steps)",
      scaffold: S(
        ["State right","Explain","Example","Link back"],
        ["Right + example"],
        ["Clear explanation"]
      )
    },
    { q:"Meal planning structure (steps)",
      scaffold: S(
        ["Target group","Nutrition needs","Budget","Timing"],
        ["Needs + budget"],
        ["Clear plan"]
      )
    },
    { q:"Food lab write-up (steps)",
      scaffold: S(
        ["Ingredients","Method","Safety","Evaluation"],
        ["Method + evaluation"],
        ["Exam style"]
      )
    }
  ],
  cloze: [
    C("Protein is needed for growth and ___", ["repair"]),
    C("Calcium helps build strong ___", ["bones"]),
    C("HACCP focuses on food ___", ["safety"]),
    C("Vitamin C deficiency causes ___", ["scurvy"]),
    C("Balanced diet requires ___", ["variety"])
  ]
};

/* =========================
   HISTORY (real)
========================= */

const History = {
  rapid: [
    A("What is a primary source?", ["first hand account","firsthand account","original source","evidence from the time"]),
    A("What is a secondary source?", ["written later","interpretation","analysis"]),
    A("One reason to study sources", ["evidence","bias","reliability"]),
    A("Bias means", ["one-sided","one sided","prejudice"]),
    A("Propaganda is", ["persuasive information","information to influence"]),
    A("One command word: describe means", ["give details","give details of"]),
    A("One command word: explain means", ["give reasons","how/why"]),
    A("One feature of good essay", ["structure","evidence","dates","evaluation"]),
    A("Name a historian skill", ["analysis","evaluation","context"]),
    A("What is context?", ["background","background information"])
  ],
  structured: [
    { q:"Documents/source question structure (steps)",
      scaffold: S(
        ["Identify source","What it shows","Purpose/bias","Use evidence"],
        ["Shows + purpose/bias"],
        ["Exam method"]
      )
    },
    { q:"Essay paragraph structure (steps)",
      scaffold: S(
        ["Point","Evidence (date/example)","Explain","Link"],
        ["Point + evidence + explain"],
        ["Clear paragraph"]
      )
    },
    { q:"Compare two sources (steps)",
      scaffold: S(
        ["Similarity","Difference","Evidence from each","Judgement"],
        ["Compare + evidence"],
        ["Analytical"]
      )
    },
    { q:"Cause & consequence structure (steps)",
      scaffold: S(
        ["State cause","Explain","Consequence","Example/date"],
        ["Cause + example"],
        ["Clear logic"]
      )
    },
    { q:"Reliability question (steps)",
      scaffold: S(
        ["Origin","Purpose","Content","Limitations"],
        ["Origin + purpose + limits"],
        ["OPCV style"]
      )
    }
  ],
  cloze: [
    C("A primary source is from the ___ period.", ["same"]),
    C("Bias means ___-sided.", ["one"]),
    C("Context = historical ___", ["background"]),
    C("Evidence can include dates and ___.", ["examples"]),
    C("Propaganda aims to ___ opinion.", ["influence"])
  ]
};

/* =========================
   GEOGRAPHY (real)
========================= */

const Geography = {
  rapid: [
    A("Grid reference uses ___ and northings", ["eastings"]),
    A("Contour lines show", ["height","elevation"]),
    A("A delta forms where a river", ["deposits","deposits material","deposits sediment"]),
    A("Weather vs climate: climate is long-term ___", ["average","pattern","average weather"]),
    A("One renewable energy source", ["wind","solar","hydro","geothermal"]),
    A("One factor affecting climate", ["latitude","altitude","ocean currents","distance from sea"]),
    A("Urbanisation means", ["growth of cities","growth of towns","movement to cities"]),
    A("Migration push factor (one)", ["war","poverty","unemployment"]),
    A("Migration pull factor (one)", ["jobs","education","safety"]),
    A("Erosion means", ["wearing away","wear away"])
  ],
  structured: [
    { q:"OS map answer structure (steps)",
      scaffold: S(
        ["State feature","Grid reference","Evidence from map","Conclusion"],
        ["Feature + evidence"],
        ["Exam method"]
      )
    },
    { q:"River process answer structure (steps)",
      scaffold: S(
        ["Process","Where it happens","Result/landform","Example"],
        ["Process + landform"],
        ["Clear explanation"]
      )
    },
    { q:"Climate answer structure (steps)",
      scaffold: S(
        ["Define","Factors","Example","Impact"],
        ["Factors + impact"],
        ["Balanced answer"]
      )
    },
    { q:"Urban study answer structure (steps)",
      scaffold: S(
        ["Location","Functions","Advantages","Problems","Solutions"],
        ["Pros + problems + solutions"],
        ["Clear layout"]
      )
    },
    { q:"Development answer structure (steps)",
      scaffold: S(
        ["Define development","Indicator","Reasons","Example"],
        ["Indicator + reasons"],
        ["Exam answer"]
      )
    }
  ],
  cloze: [
    C("Contours show ___ above sea level.", ["height","elevation"]),
    C("Grid references use eastings and ___", ["northings"]),
    C("Erosion means wearing ___", ["away"]),
    C("A renewable energy source: ___", ["wind","solar","hydro"]),
    C("Urbanisation = growth of ___", ["cities","towns"])
  ]
};

/* =========================
   BUSINESS (real)
========================= */

const Business = {
  rapid: [
    A("Stakeholder example (one)", ["customers","employees","owners","suppliers","government"]),
    A("Entrepreneur is a person who", ["takes risk","takes risks","starts a business"]),
    A("Marketing mix: one P", ["product","price","place","promotion"]),
    A("Profit = revenue − ___", ["costs","expenses"]),
    A("Branding helps to", ["differentiate","stand out","recognition"]),
    A("Cash flow is", ["money in and out","movement of cash"]),
    A("A sole trader has ___ owner", ["one","1"]),
    A("Limited liability means", ["loss limited to investment","not responsible beyond investment"]),
    A("Break-even is where", ["costs equal revenue","revenue equals costs"]),
    A("ABQ stands for", ["applied business question"])
  ],
  structured: [
    { q:"ABQ answer structure (steps)",
      scaffold: S(
        ["Identify issue","Use case evidence","Apply theory","Recommend"],
        ["Evidence + apply + recommend"],
        ["Exam ABQ style"]
      )
    },
    { q:"Marketing answer structure (steps)",
      scaffold: S(
        ["Define","Give example","Benefits","Limitations"],
        ["Example + judgement"],
        ["Balanced answer"]
      )
    },
    { q:"Finance question structure (steps)",
      scaffold: S(
        ["State formula","Substitute","Calculate","Interpret"],
        ["Calculate + interpret"],
        ["Exam layout"]
      )
    },
    { q:"People in business answer (steps)",
      scaffold: S(
        ["Role","Why important","Example","Conclusion"],
        ["Role + example"],
        ["Clear explanation"]
      )
    },
    { q:"Business plan structure (steps)",
      scaffold: S(
        ["Idea","Market","Costs","Promotion","Risks"],
        ["Idea + market + risks"],
        ["Clear plan"]
      )
    }
  ],
  cloze: [
    C("Profit = Revenue − ___", ["costs","expenses"]),
    C("Marketing mix includes Product, Price, ___, Promotion.", ["place"]),
    C("Limited liability limits your ___", ["loss","losses"]),
    C("Break-even: revenue equals ___", ["costs"]),
    C("An entrepreneur takes ___", ["risk","risks"])
  ]
};

/* =========================
   ART (real)
========================= */

const Art = {
  rapid: [
    A("Name one element of art", ["line","shape","form","tone","texture","colour","color","space"]),
    A("Name one principle of design", ["balance","contrast","rhythm","emphasis","unity","pattern"]),
    A("Perspective creates sense of", ["depth","space"]),
    A("A portrait is a picture of a", ["person","someone"]),
    A("Composition means", ["arrangement","arrangement of elements"]),
    A("Tone refers to", ["light and dark","light and dark values"]),
    A("Texture can be", ["real","actual","visual","implied"]),
    A("Primary colours (one)", ["red","blue","yellow"]),
    A("Impressionism focuses on", ["light","light and colour","light and color"]),
    A("A critique includes", ["description analysis evaluation","describe analyse evaluate","description analysis evaluation"])
  ],
  structured: [
    { q:"Art appreciation paragraph structure (steps)",
      scaffold: S(
        ["Describe what you see","Analyse elements","Interpret meaning","Evaluate"],
        ["Describe + analyse + evaluate"],
        ["Exam method"]
      )
    },
    { q:"Comparing two artworks (steps)",
      scaffold: S(
        ["Similarity","Difference","Use art terms","Judgement"],
        ["Compare + terms + judge"],
        ["Clear comparison"]
      )
    },
    { q:"Artist study answer structure (steps)",
      scaffold: S(
        ["Who/when","Style","Techniques","One artwork","Why important"],
        ["Style + techniques + artwork"],
        ["Structured answer"]
      )
    },
    { q:"Design brief response (steps)",
      scaffold: S(
        ["Purpose","Target audience","Materials/techniques","Evaluation"],
        ["Audience + techniques"],
        ["Design logic"]
      )
    },
    { q:"Practical reflection (steps)",
      scaffold: S(
        ["What you did","What worked","What you’d change","Next step"],
        ["Worked + change + next"],
        ["Reflective answer"]
      )
    }
  ],
  cloze: [
    C("Perspective creates ___ in an image.", ["depth"]),
    C("Tone = light and ___", ["dark"]),
    C("Composition means ___ of elements.", ["arrangement"]),
    C("Primary colour: red, blue, ___", ["yellow"]),
    C("Critique steps: describe, analyse, ___", ["evaluate"])
  ]
};

window.DRILL_BANK = {
  Maths,
  Biology,
  English,
  Spanish,
  French,
  German,
  Accounting,
  Economics,
  Physics,
  Chemistry,
  PE,
  "Home Ec": HomeEc,
  History,
  Geography,
  Business,
  Art
};

window.__NORM = N;

})();
