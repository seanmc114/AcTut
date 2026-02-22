/* drills.js — LC Drill Banks v2 (Scaffold-enabled)
   Rapid:   { q, a }
   Cloze:   { text, blanks, bank? }
   Structured: { q, a? , scaffold:{build:[], strength:[], exam:[]} }
*/

(function(){
  const N = (s)=> String(s||"").trim().toLowerCase();

  const S = (build, strength, exam)=>({ build, strength, exam });

  // Seed banks (you can expand later without touching engine)
  const DRILL_BANK = {
    "Maths": {
      rapid: [
        { q:"State the quadratic formula (type a recognisable version)", a:["(-b±√(b^2-4ac))/(2a)","(-b±sqrt(b^2-4ac))/(2a)","quadratic formula"] },
        { q:"Differentiate x^3", a:["3x^2","3x^2 + c","3x^2"] },
        { q:"Expand (x+3)(x-2)", a:["x^2+x-6","x^2 + x - 6"] },
        { q:"Simplify: (x^2)(x^3)", a:["x^5","x^5"] },
        { q:"Solve: 2x=10", a:["5","x=5"] },
        { q:"Rearrange: y=3x+2 for x", a:["(y-2)/3","x=(y-2)/3"] },
        { q:"sin(90°) =", a:["1","1.0"] },
        { q:"Mean of 2 and 8 =", a:["5"] },
        { q:"Probability of a certain event =", a:["1"] },
        { q:"Constant ratio C/D for a circle =", a:["pi","π"] },
      ],
      structured: [
        { q:"Solve: x^2 - 5x + 6 = 0",
          a:["2,3","2 and 3","x=2 and x=3","x=2,3"],
          scaffold: S(
            ["1) Set equation to 0", "2) Factorise", "3) Set each bracket to 0", "4) Write both solutions"],
            ["Factorise → set brackets = 0 → two answers"],
            ["Show method briefly (factorise or formula)"]
          )
        },
        { q:"Differentiate: 3x^2 + 4x",
          a:["6x+4","6x + 4"],
          scaffold: S(
            ["1) Differentiate term-by-term", "2) Power rule: d/dx(x^n)=n x^(n-1)", "3) Simplify"],
            ["Power rule → simplify"],
            ["Answer + 1 method line"]
          )
        },
        { q:"Gradient between (1,2) and (3,8)",
          a:["3","m=3"],
          scaffold: S(
            ["1) Use m=(y2-y1)/(x2-x1)", "2) Substitute: (8-2)/(3-1)", "3) Simplify"],
            ["m=(8-2)/(3-1) → simplify"],
            ["State formula or substitution"]
          )
        },
        { q:"Probability: if P(A)=0.3, find P(not A)",
          a:["0.7","7/10"],
          scaffold: S(
            ["1) Use P(not A)=1-P(A)", "2) Substitute: 1-0.3", "3) Answer"],
            ["1 - 0.3 = ?"],
            ["One line: 1-P(A)"]
          )
        },
        { q:"Rearrange: V=IR for I",
          a:["i=v/r","i = v/r","v/r"],
          scaffold: S(
            ["1) Start: V=IR", "2) Divide both sides by R", "3) I=V/R"],
            ["Divide by R → I=V/R"],
            ["I=V/R"]
          )
        }
      ],
      cloze: [
        { text:"The derivative of x^n is ___ x^(n-1).", blanks:["n"], bank:["n","n-1","1/n"] },
        { text:"Slope formula: m = (y2 - y1) / (___ - x1).", blanks:["x2"], bank:["x2","x","y2"] },
        { text:"P(A or B) = P(A) + P(B) - P(A and ___).", blanks:["B"], bank:["B","A","not A"] },
        { text:"Area of circle = ___ r^2.", blanks:["π"], bank:["π","2π","pi"] },
        { text:"To solve a quadratic, set it equal to ___ first.", blanks:["0"], bank:["0","1","c"] }
      ]
    },

    "English": {
      rapid: [
        { q:"Write a good linker: 'Furthermore,'", a:["furthermore","furthermore,"] },
        { q:"Write a contrast linker: 'However,'", a:["however","however,"] },
        { q:"Technique: repetition / rhetorical question / emotive language (type one)", a:["repetition","rhetorical question","emotive language","statistics","rule of three","anecdote"] },
        { q:"What does imagery create? (1 word)", a:["picture","image","visual"] },
        { q:"What is 'tone'? (1 word example: serious)", a:["serious","sarcastic","humorous","formal","informal","critical"] },
        { q:"Thesis starter: 'In this text, ...' (type start)", a:["in this text","in this text,"] },
        { q:"Conclusion cue: 'Overall,'", a:["overall","overall,"] },
        { q:"What is a theme? (1 word)", a:["idea","message","topic"] },
        { q:"PEE stands for? (type PEE)", a:["pee","p.e.e","p e e"] },
        { q:"Q + I stands for quote + ___", a:["insight","interpretation","inference"] },
      ],
      structured: [
        { q:"Paragraph (PEE) – write the order",
          a:["point|evidence|explain","point | evidence | explain","pee"],
          scaffold: S(
            ["Point: make your claim", "Evidence: embed a short quote", "Explain: effect + link to question"],
            ["Point → Quote → Effect (link back)"],
            ["One tight PEE paragraph"]
          )
        },
        { q:"Embedded quote frame (type the frame)",
          a:["“” which shows","which shows"],
          scaffold: S(
            ["He suggests “___” which shows ___", "Then: This makes the reader ___"],
            ["“___” shows ___ → effect"],
            ["Quote + effect"]
          )
        },
        { q:"Comparative frame (3 parts)",
          a:["similarity","difference","effect"],
          scaffold: S(
            ["Similarity: both texts…", "Difference: however…", "Effect: this changes…"],
            ["Both… / However… / Therefore…"],
            ["Compare + judge"]
          )
        },
        { q:"Timing plan (Plan/Write/Check)",
          a:["plan 5 | write 35 | check 5","plan 5 write 35 check 5","plan/write/check"],
          scaffold: S(
            ["Plan (5): thesis + 3 points", "Write (35): PEE x 3", "Check (5): quotes + spelling + link"],
            ["5/35/5 with PEE"],
            ["Quick plan + check"]
          )
        },
        { q:"Intro scaffold (2 lines): thesis + 2 points",
          a:["thesis","point"],
          scaffold: S(
            ["Line 1: Thesis (your argument)", "Line 2: Two points you will prove"],
            ["Thesis + 2 points"],
            ["Short thesis"]
          )
        }
      ],
      cloze: [
        { text:"A paragraph should make a ___, support it with ___, then explain the ___.", blanks:["point","evidence","effect"], bank:["point","evidence","effect","theme"] },
        { text:"A rhetorical question makes the reader ___ rather than get an ___.", blanks:["think","answer"], bank:["think","answer","laugh"] },
        { text:"A thesis is the main ___ of your answer.", blanks:["argument"], bank:["argument","quote","title"] },
        { text:"Analyse by focusing on ___ and ___ (not retelling).", blanks:["language","effect"], bank:["language","effect","spelling"] },
        { text:"Conclusions should ___ the thesis and end with a final ___.", blanks:["restate","insight"], bank:["restate","insight","quote"] }
      ]
    },

    // Languages: placeholders (engine ready; swap your Turbo banks later)
    "Spanish": placeholderLanguage("Spanish"),
    "French": placeholderLanguage("French"),
    "German": placeholderLanguage("German"),

    "Accounting": scaffoldedRecallSubject("Accounting"),
    "Economics": scaffoldedRecallSubject("Economics"),
    "Physics": scaffoldedRecallSubject("Physics"),
    "Biology": scaffoldedRecallSubject("Biology"),
    "Chemistry": scaffoldedRecallSubject("Chemistry"),
    "PE": scaffoldedRecallSubject("PE"),
    "Home Ec": scaffoldedRecallSubject("Home Ec"),
    "History": scaffoldedRecallSubject("History"),
    "Geography": scaffoldedRecallSubject("Geography"),
    "Business": scaffoldedRecallSubject("Business"),
    "Art": scaffoldedRecallSubject("Art")
  };

  function placeholderLanguage(name){
    return {
      rapid: [
        { q:`${name}: translate a short core phrase (any attempt counts for now)`, a:["*"] },
        { q:`${name}: connector (because/but) in target language (any attempt)`, a:["*"] },
        { q:`${name}: one past time marker (any attempt)`, a:["*"] },
        { q:`${name}: one future time marker (any attempt)`, a:["*"] },
        { q:`${name}: opinion phrase (any attempt)`, a:["*"] },
        { q:`${name}: one adjective (any attempt)`, a:["*"] },
        { q:`${name}: one place word (any attempt)`, a:["*"] },
        { q:`${name}: one hobby word (any attempt)`, a:["*"] },
        { q:`${name}: one family word (any attempt)`, a:["*"] },
        { q:`${name}: one school word (any attempt)`, a:["*"] },
      ],
      structured: [
        { q:`${name}: sentence frame`, a:["*"],
          scaffold: S(
            ["Subject + verb + time", "Add a connector (because/but)", "Add one extra detail"],
            ["Verb + connector + detail"],
            ["One strong sentence"]
          )
        },
        { q:`${name}: past tense frame`, a:["*"],
          scaffold: S(
            ["Time phrase (yesterday/last week)", "Past verb", "Place/detail"],
            ["Past verb + detail"],
            ["Past sentence"]
          )
        },
        { q:`${name}: accuracy checklist`, a:["*"],
          scaffold: S(
            ["Check verb ending", "Check agreement", "Check accents (if relevant)"],
            ["Ending + agreement"],
            ["Final check"]
          )
        },
        { q:`${name}: opinion paragraph plan`, a:["*"],
          scaffold: S(
            ["Opinion", "Reason", "Example", "Extra detail"],
            ["Opinion + because + example"],
            ["Short opinion"]
          )
        },
        { q:`${name}: speaking support plan`, a:["*"],
          scaffold: S(
            ["Start phrase", "Two key points", "One extra detail", "Finish phrase"],
            ["Start + 2 points"],
            ["Short speak plan"]
          )
        }
      ],
      cloze: [
        { text:`${name}: A strong answer needs a clear ___ and one extra ___.`, blanks:["verb","detail"], bank:["verb","detail","title"] },
        { text:`${name}: Use a connector to add ___.`, blanks:["complexity"], bank:["complexity","colour","silence"] },
        { text:`${name}: Check agreement: gender and ___.`, blanks:["number"], bank:["number","nation","noise"] },
        { text:`${name}: Past answers need a past ___.`, blanks:["verb"], bank:["verb","noun","adjective"] },
        { text:`${name}: Extra detail earns extra ___.`, blanks:["marks"], bank:["marks","music","magic"] },
      ]
    };
  }

  function scaffoldedRecallSubject(name){
    // A lightweight bank: the engine + scaffolds do the heavy lifting.
    // You can expand with real paper-specific items later without changing engine.
    const rapid = [
      { q:`${name}: define 1 key term (any one word)`, a:["*"] },
      { q:`${name}: list 2 keywords for a 12-mark answer (any)`, a:["*"] },
      { q:`${name}: one useful connector (therefore/however)`, a:["therefore","however","overall","ultimately","because"] },
      { q:`${name}: one example phrase: "for example"`, a:["for example","e.g.","for instance"] },
      { q:`${name}: one evaluation word`, a:["overall","therefore","however","ultimately","significant"] },
      { q:`${name}: one diagram/data word (axis/trend/label)`, a:["axis","trend","label","increase","decrease"] },
      { q:`${name}: one command word meaning "explain"`, a:["explain","describe","outline","evaluate"] },
      { q:`${name}: one command word meaning "compare"`, a:["compare","contrast"] },
      { q:`${name}: one command word meaning "give two"`, a:["state","list","name"] },
      { q:`${name}: one timing habit (plan/check)`, a:["plan","check"] },
    ];

    const structured = [
      { q:`${name}: short-answer scaffold (Define → Explain → Example)`,
        a:["*"],
        scaffold: S(
          ["Define the term (1 line)", "Explain it (1–2 lines)", "Give an example"],
          ["Define + explain + example"],
          ["Tight define + example"]
        )
      },
      { q:`${name}: 12-mark scaffold (3 paragraphs)`,
        a:["*"],
        scaffold: S(
          ["P1: Point + example", "P2: Point + example", "P3: Point + evaluate/judge"],
          ["2 points + judgement"],
          ["3 key points"]
        )
      },
      { q:`${name}: data/diagram scaffold`,
        a:["*"],
        scaffold: S(
          ["State the trend", "Give numbers", "Explain why", "Link back to question"],
          ["Trend + numbers + why"],
          ["Trend + why"]
        )
      },
      { q:`${name}: revision loop scaffold`,
        a:["*"],
        scaffold: S(
          ["Recall (2 mins)", "Test (5 mins)", "Fix errors (3 mins)", "Retest (2 mins)"],
          ["Test → fix → retest"],
          ["Retest"]
        )
      },
      { q:`${name}: exam habit scaffold`,
        a:["*"],
        scaffold: S(
          ["Underline command word", "Plan 30 seconds", "Answer to marks", "Final check"],
          ["Command word + plan + check"],
          ["Answer to marks"]
        )
      }
    ];

    const cloze = [
      { text:`${name}: A strong answer should define the ___, then give an ___, then link to the ___.`, blanks:["term","example","question"], bank:["term","example","question","title"] },
      { text:`${name}: In exams, match your detail to the ___ available.`, blanks:["marks"], bank:["marks","minutes","mood"] },
      { text:`${name}: Always respond to the command word: ___ / explain / evaluate.`, blanks:["state"], bank:["state","sleep","sing"] },
      { text:`${name}: A good judgement uses "Overall," plus a clear ___.`, blanks:["reason"], bank:["reason","rhyme","rule"] },
      { text:`${name}: Improvement comes from ___, not just repetition.`, blanks:["feedback"], bank:["feedback","luck","silence"] }
    ];

    return { rapid, structured, cloze };
  }

  window.DRILL_BANK = DRILL_BANK;
  window.__NORM = N;
})();
