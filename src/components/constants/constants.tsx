export default class LevelFields {
  LevelNumber: number;
  LevelType: string;
  PromptType: string;
  LetterGroup: string;
  PromptFadeout: number;
  Puzzle: {
    targetStones: [];
    foilstones: [];
    prompt: { PromptAudio: string; PromptText: string };
  };
  Puzzles: [];

  constructor(
    LevelNumber: number,
    LevelType: string,
    PromptType: string,
    LetterGroup: string,
    PromptFadeout: number,
    Puzzle: {
      targetStones: [];
      foilstones: [];
      prompt: { PromptAudio: string; PromptText: string };
    },
    Puzzles: []
  ) {
    this.LevelNumber = LevelNumber;
    this.LevelType = LevelType;
    this.PromptType = PromptType;
    this.LetterGroup = LetterGroup;
    this.PromptFadeout = PromptFadeout;
    this.Puzzle = Puzzle;
    this.Puzzles = Puzzles;
  }
  get _levelNumber() {
    return this.LevelNumber;
  }
  get _levelType() {
    return this.LevelType;
  }
  get _promptType() {
    return this.PromptType;
  }
  get _letterGroup() {
    return this.LetterGroup;
  }
  get _promptFadeout() {
    return this.PromptFadeout;
  }
  get _puzzle() {
    return this.Puzzle;
  }
  get _puzzles() {
    return this.Puzzles;
  }
}
