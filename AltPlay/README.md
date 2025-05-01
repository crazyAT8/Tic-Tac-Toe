# Working Game Title

To modify your Tic Tac Toe game so that each player can only have 3 marks on the board at any one time, 
    and the earliest mark disappears when placing the fourth, 
        you need to track the history of each player's moves 
        and update the board accordingly.

## Key Additions
1. Track moves for each player with an array.
2. When a player reaches 3 moves, their next move will remove the move played two plays ago.
3. Update the board and DOM accordingly.

## How It Works
- Each player has a move history
- If a player already placed 3 symbols, the first move they made is erased from the board before placing the new one.
- The win condition is still valid while a player has any 3 marks.