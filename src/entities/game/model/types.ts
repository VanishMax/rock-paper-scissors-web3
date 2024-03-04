export const Turns = ['rock', 'paper', 'scissors', 'lizard', 'spock'] as const;

export type TurnType = typeof Turns[number];
