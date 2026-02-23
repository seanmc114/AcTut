const LS_KEY = "SYNGE_LC_COACH_V5";
let state = loadState();

const LC_STRUCTURE = {

  English: {
    H:[{k:"P1",l:"Paper 1",w:50},{k:"P2",l:"Paper 2",w:50}],
    O:[{k:"P1",l:"Paper 1",w:50},{k:"P2",l:"Paper 2",w:50}]
  },

  Maths:{
    H:[{k:"P1",l:"Paper 1",w:50},{k:"P2",l:"Paper 2",w:50}],
    O:[{k:"P1",l:"Paper 1",w:50},{k:"P2",l:"Paper 2",w:50}]
  },

  Spanish:{
    H:[
      {k:"oral",l:"Oral",w:25},
      {k:"aural",l:"Aural",w:25},
      {k:"reading",l:"Reading",w:25},
      {k:"writing",l:"Writing",w:25}
    ],
    O:[
      {k:"oral",l:"Oral",w:20},
      {k:"aural",l:"Aural",w:20},
      {k:"reading",l:"Reading",w:30},
      {k:"writing",l:"Writing",w:30}
    ]
  },

  French:{ H:[
      {k:"oral",l:"Oral",w:25},
      {k:"aural",l:"Aural",w:25},
      {k:"reading",l:"Reading",w:25},
      {k:"writing",l:"Writing",w:25}
    ],
    O:[
      {k:"oral",l:"Oral",w:20},
      {k:"aural",l:"Aural",w:20},
      {k:"reading",l:"Reading",w:30},
      {k:"writing",l:"Writing",w:30}
    ]
  },

  German:{ H:[
      {k:"oral",l:"Oral",w:25},
      {k:"aural",l:"Aural",w:25},
      {k:"reading",l:"Reading",w:25},
      {k:"writing",l:"Writing",w:25}
    ],
    O:[
      {k:"oral",l:"Oral",w:20},
      {k:"aural",l:"Aural",w:20},
      {k:"reading",l:"Reading",w:30},
      {k:"writing",l:"Writing",w:30}
    ]
  },

  Biology:{H:[
      {k:"A",l:"Short Questions",w:30},
      {k:"B",l:"Experiments",w:20},
      {k:"C",l:"Long Questions",w:50}
  ],O:[
      {k:"A",l:"Short Questions",w:40},
      {k:"C",l:"Long Questions",w:60}
  ]},

  Chemistry:{H:[
      {k:"short",l:"Short Questions",w:40},
      {k:"long",l:"Long Questions",w:60}
  ],O:[
      {k:"short",l:"Short Questions",w:40},
      {k:"long",l:"Long Questions",w:60}
  ]},

  Physics:{H:[
      {k:"short",l:"Short Questions",w:40},
      {k:"long",l:"Long Questions",w:60}
  ],O:[
      {k:"short",l:"Short Questions",w:40},
      {k:"long",l:"Long Questions",w:60}
  ]},

  Accounting:{H:[
      {k:"Q1",l:"Q1",w:40},
      {k:"Q2",l:"Q2",w:30},
      {k:"Q3",l:"Q3",w:30}
  ],O:[
      {k:"Q1",l:"Q1",w:40},
      {k:"Q2",l:"Q2",w:30},
      {k:"Q3",l:"Q3",w:30}
  ]},

  Economics:{H:[
      {k:"short",l:"Short Questions",w:40},
      {k:"long",l:"Long Questions",w:60}
  ],O:[
      {k:"short",l:"Short Questions",w:40},
      {k:"long",l:"Long Questions",w:60}
  ]},

  Business:{H:[
      {k:"short",l:"Short Questions",w:40},
      {k:"abq",l:"ABQ/Applied",w:60}
  ],O:[
      {k:"short",l:"Short Questions",w:40},
      {k:"abq",l:"ABQ/Applied",w:60}
  ]},

  History:{H:[
      {k:"doc",l:"Document/Source",w:40},
      {k:"essay",l:"Essay",w:60}
  ],O:[
      {k:"doc",l:"Document/Source",w:40},
      {k:"essay",l:"Essay",w:60}
  ]},

  Geography:{H:[
      {k:"short",l:"Short Questions",w:40},
      {k:"long",l:"Long Questions",w:60}
  ],O:[
      {k:"short",l:"Short Questions",w:40},
      {k:"long",l:"Long Questions",w:60}
  ]},

  "Home Ec":{H:[
      {k:"core",l:"Core",w:60},
      {k:"elective",l:"Elective",w:40}
  ],O:[
      {k:"core",l:"Core",w:60},
      {k:"elective",l:"Elective",w:40}
  ]},

  PE:{H:[
      {k:"written",l:"Written",w:70},
      {k:"project",l:"Project",w:30}
  ],O:[
      {k:"written",l:"Written",w:70},
      {k:"project",l:"Project",w:30}
  ]},

  Art:{H:[
      {k:"history",l:"History/Appreciation",w:50},
      {k:"practical",l:"Practical/Project",w:50}
  ],O:[
      {k:"history",l:"History/Appreciation",w:50},
      {k:"practical",l:"Practical/Project",w:50}
  ]}
};
