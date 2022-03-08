const gameData = {
	"GeneralData": {
		"LanguageName": "English",
		"LanguageVersion": 44,
		"ImageBasedRendering": false,
		"GeneralAudio": {
			"GreatAudio": "http://server.com/audio/english/feedback/great.wav",
			"FantasticAudio": "http://server.com/audio/english/feedback/fantastic.wav"
		},
		"GeneralImages": {
			"GreatImage": "http://server.com/images/english/feedback/great.png",
			"FantasticImage": "http://server.com/images/english/feedback/fantastic.png",
		}
	},
	"Levels" : [
		{
			"LevelNumber": 3,
			"LevelMeta": {
				"SubSkillName": "vwl_E",
				"SubSkillPoints": 25,
				"LevelType": "LetterOnly",
				"PromptType": "Visible",
				"PromptFadeout": 0
			},
			"Puzzles": [
				{
					"SegmentNumber": 0,
					"prompt": {"PromptText": "e", "PromptAudio": "http://server.com/audio/english/letters/e.wav"},
					"targetstones": [ {"StoneText": "e"} ],
					"foilstones": [ {"StoneText": "m"}, {"StoneText": "b"}, {"StoneText": "o"}, {"StoneText": "m"}, {"StoneText": "m"}, {"StoneText": "m"} ]
				},
				{
					"SegmentNumber": 1,
					"prompt": {"PromptText": "m", "PromptAudio": "http://server.com/audio/english/letters/m.wav"},
					"targetstones": [ {"StoneText": "m"} ],
					"foilstones": [ {"StoneText": "e"}, {"StoneText": "b"}, {"StoneText": "o"} ]
				},
				{
					"SegmentNumber": 2,
					"prompt": {"PromptText": "b", "PromptAudio": "http://server.com/audio/english/letters/b.wav"},
					"targetstones": [ {"StoneText": "b"} ],
					"foilstones": [ {"StoneText": "m"}, {"StoneText": "e"}, {"StoneText": "o"} ]
				},
				{
					"SegmentNumber": 3,
					"prompt": {"PromptText": "e", "PromptAudio": "http://server.com/audio/english/letters/e.wav"},
					"targetstones": [ {"StoneText": "e"} ],
					"foilstones": [ {"StoneText": "m"}, {"StoneText": "b"}, {"StoneText": "o"} ]
				},
				{
					"SegmentNumber": 4,
					"prompt": {"PromptText": "o", "PromptAudio": "http://server.com/audio/english/letters/o.wav"},
					"targetstones": [ {"StoneText": "o"} ],
					"foilstones": [ {"StoneText": "m"}, {"StoneText": "b"}, {"StoneText": "e"} ]
				}
			]
		},
		{
			"LevelNumber": 4,
			"LevelMeta": {
				"SubSkillName": "vwl_E",
				"SubSkillPoints": 25,
				"LevelType": "LetterOnly",
				"PromptType": "Hidden",
				"PromptFadeout": 0
			},
			"Puzzles": [
				{
					"SegmentNumber": 0,
					"prompt": {"PromptText": "e", "PromptAudio": "http://server.com/audio/english/letters/e.wav"},
					"targetstones": [ {"StoneText": "e"} ],
					"foilstones": [ {"StoneText": "m"}, {"StoneText": "b"}, {"StoneText": "o"} ]
				},
				{
					"SegmentNumber": 1,
					"prompt": {"PromptText": "m", "PromptAudio": "http://server.com/audio/english/letters/m.wav"},
					"targetstones": [ {"StoneText": "m"} ],
					"foilstones": [ {"StoneText": "e"}, {"StoneText": "b"}, {"StoneText": "o"} ]
				},
				{
					"SegmentNumber": 2,
					"prompt": {"PromptText": "b", "PromptAudio": "http://server.com/audio/english/letters/b.wav"},
					"targetstones": [ {"StoneText": "b"} ],
					"foilstones": [ {"StoneText": "m"}, {"StoneText": "e"}, {"StoneText": "o"} ]
				},
				{
					"SegmentNumber": 3,
					"prompt": {"PromptText": "e", "PromptAudio": "http://server.com/audio/english/letters/e.wav"},
					"targetstones": [ {"StoneText": "e"} ],
					"foilstones": [ {"StoneText": "m"}, {"StoneText": "b"}, {"StoneText": "o"} ]
				},
				{
					"SegmentNumber": 4,
					"prompt": {"PromptText": "o", "PromptAudio": "http://server.com/audio/english/letters/o.wav"},
					"targetstones": [ {"StoneText": "o"} ],
					"foilstones": [ {"StoneText": "m"}, {"StoneText": "b"}, {"StoneText": "e"} ]
				}
			]
		},
		{
			"LevelNumber": 5,
			"LevelMeta": {
				"SubSkillName": "vwl_E",
				"SubSkillPoints": 25,
				"LevelType": "LetterInWord",
				"PromptType": "Visible",
				"PromptFadeout": 0
			},
			"Puzzles": [
				{
					"SegmentNumber": 0,
					"prompt": {"PromptText": "eat", "PromptAudio": "http://server.com/audio/english/letters/e.wav"},
					"targetstones": [ {"StoneText": "e"} ],
					"foilstones": [ {"StoneText": "m"}, {"StoneText": "b"}, {"StoneText": "o"} , {"StoneText": "m"}, {"StoneText": "m"}, {"StoneText": "m"}]
				},
				{
					"SegmentNumber": 1,
					"prompt": {"PromptText": "men", "PromptAudio": "http://server.com/audio/english/letters/m.wav"},
					"targetstones": [ {"StoneText": "m"} ],
					"foilstones": [ {"StoneText": "e"}, {"StoneText": "b"}, {"StoneText": "o"} ]
				},
				{
					"SegmentNumber": 2,
					"prompt": {"PromptText": "bed", "PromptAudio": "http://server.com/audio/english/letters/b.wav"},
					"targetstones": [ {"StoneText": "b"} ],
					"foilstones": [ {"StoneText": "m"}, {"StoneText": "e"}, {"StoneText": "o"} ]
				},
				{
					"SegmentNumber": 3,
					"prompt": {"PromptText": "end", "PromptAudio": "http://server.com/audio/english/letters/e.wav"},
					"targetstones": [ {"StoneText": "e"} ],
					"foilstones": [ {"StoneText": "m"}, {"StoneText": "b"}, {"StoneText": "o"} ]
				},
				{
					"SegmentNumber": 4,
					"prompt": {"PromptText": "one", "PromptAudio": "http://server.com/audio/english/letters/o.wav"},
					"targetstones": [ {"StoneText": "o"} ],
					"foilstones": [ {"StoneText": "m"}, {"StoneText": "b"}, {"StoneText": "e"} ]
				}
			]
		},
		{
			"LevelNumber": 6,
			"LevelMeta": {
				"SubSkillName": "vwl_E",
				"SubSkillPoints": 25,
				"LevelType": "Word",
				"PromptType": "Visible",
				"PromptFadeout": 0
			},
			"Puzzles": [
				{
					"SegmentNumber": 0,
					"prompt": {"PromptText": "eat", "PromptAudio": "http://server.com/audio/english/words/eat.wav"},
					"targetstones": [ {"StoneText": "e"},  {"StoneText": "a"},  {"StoneText": "t"} ],
					"foilstones": [ {"StoneText": "m"} ]
				},
				{
					"SegmentNumber": 1,
					"prompt": {"PromptText": "men", "PromptAudio": "http://server.com/audio/english/words/men.wav"},
					"targetstones": [ {"StoneText": "m"},  {"StoneText": "e"},  {"StoneText": "n"} ],
					"foilstones": [{"StoneText": "b"}  ]
				},
				{
					"SegmentNumber": 2,
					"prompt": {"PromptText": "bed", "PromptAudio": "http://server.com/audio/english/words/bed.wav"},
					"targetstones": [ {"StoneText": "b"},  {"StoneText": "e"},  {"StoneText": "d"} ],
					"foilstones": [ {"StoneText": "a"}]
				},
				{
					"SegmentNumber": 3,
					"prompt": {"PromptText": "end", "PromptAudio": "http://server.com/audio/english/words/end.wav"},
					"targetstones": [ {"StoneText": "e"},{"StoneText": "n"},  {"StoneText": "d"} ],
					"foilstones": [ {"StoneText": "m"} ]
				},
				{
					"SegmentNumber": 4,
					"prompt": {"PromptText": "one", "PromptAudio": "http://server.com/audio/english/words/one.wav"},
					"targetstones": [ {"StoneText": "o"} ],
					"foilstones": [ {"StoneText": "m"}, {"StoneText": "b"}, {"StoneText": "e"} ]
				}
			]
		},

		{
			"LevelNumber": 7,
			"LevelMeta": {
				"SubSkillName": "vwl_E",
				"SubSkillPoints": 25,
				"LevelType": "Word",
				"PromptType": "Hidden",
				"PromptFadeout": 0
			},
			"Puzzles": [
				{
					"SegmentNumber": 0,
					"prompt": {"PromptText": "eat", "PromptAudio": "http://server.com/audio/english/words/eat.wav"},
					"targetstones": [ {"StoneText": "e"},  {"StoneText": "a"},  {"StoneText": "t"} ],
					"foilstones": [ {"StoneText": "m"} ]
				},
				{
					"SegmentNumber": 1,
					"prompt": {"PromptText": "men", "PromptAudio": "http://server.com/audio/english/words/men.wav"},
					"targetstones": [ {"StoneText": "m"},  {"StoneText": "e"},  {"StoneText": "n"} ],
					"foilstones": [{"StoneText": "b"}  ]
				},
				{
					"SegmentNumber": 2,
					"prompt": {"PromptText": "bed", "PromptAudio": "http://server.com/audio/english/words/bed.wav"},
					"targetstones": [ {"StoneText": "b"},  {"StoneText": "e"},  {"StoneText": "d"} ],
					"foilstones": [ {"StoneText": "a"}]
				},
				{
					"SegmentNumber": 3,
					"prompt": {"PromptText": "end", "PromptAudio": "http://server.com/audio/english/words/end.wav"},
					"targetstones": [ {"StoneText": "e"},{"StoneText": "n"},  {"StoneText": "d"} ],
					"foilstones": [ {"StoneText": "m"} ]
				},
				{
					"SegmentNumber": 4,
					"prompt": {"PromptText": "one", "PromptAudio": "http://server.com/audio/english/words/one.wav"},
					"targetstones": [ {"StoneText": "o"} ],
					"foilstones": [ {"StoneText": "m"}, {"StoneText": "b"}, {"StoneText": "e"} ]
				}
			]
		}
	]
}

export default gameData;
