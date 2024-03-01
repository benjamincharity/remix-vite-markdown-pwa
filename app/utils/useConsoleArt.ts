import { useEffect } from 'react';

const rock = `
    _______
---'   ____)
      (_____)
      (_____)
      (____)
---.__(___)
(rock)
`;

const paper = `
    _______
---'   ____)____
          ______)
          _______)
         _______)
---.__________)
(paper)
`;

const scissors = `
    _______
---'   ____)____
          ______)
       __________)
      (____)
---.__(___)
(scissors)
`;
const hands = [rock, paper, scissors];

export function useConsoleArt(): void {
  const result = Math.floor(Math.random() * 3);

  useEffect(() => {
    console.log(`
Welcome! 👋🏼

Think you can outsmart me?

${hands[result]}

Refresh to play again!
    `);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
