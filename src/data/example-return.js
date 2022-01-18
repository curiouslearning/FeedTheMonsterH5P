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
			"FantasticImage": "http://server.com/images/english/feedback/fantastic.png"
		}
	},
	"Levels" : [
		{	
			"LevelNumber": 3,
			"backgroundImage" : require("../../assets/images/images1.jpg"),
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
					"prompt": {"PromptText": "e", "PromptAudio": 'https://www.kozco.com/tech/piano2.wav'},
					"targetstones": [ {"StoneText": "e"} ],
					"foilstones": [ {"StoneText": "m"}, {"StoneText": "b"}, {"StoneText": "o"} ]
				},
				{
					"SegmentNumber": 1,
					"prompt": {"PromptText": "m", "PromptAudio": "https://www.kozco.com/tech/piano2.wav"},
					"targetstones": [ {"StoneText": "m"} ],
					"foilstones": [ {"StoneText": "e"}, {"StoneText": "b"}, {"StoneText": "o"} ]
				},
				{
					"SegmentNumber": 2,
					"prompt": {"PromptText": "b", "PromptAudio": "https://www.kozco.com/tech/piano2.wav"},
					"targetstones": [ {"StoneText": "b"} ],
					"foilstones": [ {"StoneText": "m"}, {"StoneText": "e"}, {"StoneText": "o"} ]
				},
				{
					"SegmentNumber": 3,
					"prompt": {"PromptText": "e", "PromptAudio": "https://www.kozco.com/tech/piano2.wav"},
					"targetstones": [ {"StoneText": "e"} ],
					"foilstones": [ {"StoneText": "m"}, {"StoneText": "b"}, {"StoneText": "o"} ]
				},
				{
					"SegmentNumber": 4,
					"prompt": {"PromptText": "o", "PromptAudio": "https://www.kozco.com/tech/piano2.wav"},
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
				"PromptType": "Fadeout",
				"PromptFadeout": 4
			},
			"Puzzles": [
				{
					"SegmentNumber": 0,
					"prompt": {"PromptText": "e", "PromptAudio": "https://www.kozco.com/tech/piano2.wav"},
					"targetstones": [ {"StoneText": "e"} ],
					"foilstones": [ {"StoneText": "m"}, {"StoneText": "b"}, {"StoneText": "o"} ]
				},
				{
					"SegmentNumber": 1,
					"prompt": {"PromptText": "m", "PromptAudio": "https://www.kozco.com/tech/piano2.wav"},
					"targetstones": [ {"StoneText": "m"} ],
					"foilstones": [ {"StoneText": "e"}, {"StoneText": "b"}, {"StoneText": "o"} ]
				},
				{
					"SegmentNumber": 2,
					"prompt": {"PromptText": "b", "PromptAudio": "https://www.kozco.com/tech/piano2.wav"},
					"targetstones": [ {"StoneText": "b"} ],
					"foilstones": [ {"StoneText": "m"}, {"StoneText": "e"}, {"StoneText": "o"} ]
				},
				{
					"SegmentNumber": 3,
					"prompt": {"PromptText": "e", "PromptAudio": "https://www.kozco.com/tech/piano2.wav"},
					"targetstones": [ {"StoneText": "e"} ],
					"foilstones": [ {"StoneText": "m"}, {"StoneText": "b"}, {"StoneText": "o"} ]
				},
				{
					"SegmentNumber": 4,
					"prompt": {"PromptText": "o", "PromptAudio": "https://www.kozco.com/tech/piano2.wav"},
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
				"LevelType": "LetterOnly",
				"PromptType": "Hidden",
				"PromptFadeout": 0
			},
			"Puzzles": [
				{
					"SegmentNumber": 0,
					"prompt": {"PromptText": "e", "PromptAudio": "https://www.kozco.com/tech/piano2.wav"},
					"targetstones": [ {"StoneText": "e"} ],
					"foilstones": [ {"StoneText": "m"}, {"StoneText": "b"}, {"StoneText": "o"} ]
				},
				{
					"SegmentNumber": 1,
					"prompt": {"PromptText": "m", "PromptAudio": "https://www.kozco.com/tech/piano2.wav"},
					"targetstones": [ {"StoneText": "m"} ],
					"foilstones": [ {"StoneText": "e"}, {"StoneText": "b"}, {"StoneText": "o"} ]
				},
				{
					"SegmentNumber": 2,
					"prompt": {"PromptText": "b", "PromptAudio": "https://www.kozco.com/tech/piano2.wav"},
					"targetstones": [ {"StoneText": "b"} ],
					"foilstones": [ {"StoneText": "m"}, {"StoneText": "e"}, {"StoneText": "o"} ]
				},
				{
					"SegmentNumber": 3,
					"prompt": {"PromptText": "e", "PromptAudio": "https://www.kozco.com/tech/piano2.wav"},
					"targetstones": [ {"StoneText": "e"} ],
					"foilstones": [ {"StoneText": "m"}, {"StoneText": "b"}, {"StoneText": "o"} ]
				},
				{
					"SegmentNumber": 4,
					"prompt": {"PromptText": "o", "PromptAudio": "https://www.kozco.com/tech/piano2.wav"},
					"targetstones": [ {"StoneText": "o"} ],
					"foilstones": [ {"StoneText": "m"}, {"StoneText": "b"}, {"StoneText": "e"} ]
				}
			]
		}
	]
}

export default gameData;
