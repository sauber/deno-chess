# Chess

Bots using a simple single unique principle play chess against each other. Play
a single game and follow the moves on an ansi terminal dashboard. Or play a
tournament of many games where all bots get ranked.

## Usage

### Single game

Run a single game of two random opponents:

```sh
$ deno play.ts

8    ░░░   ░░░ ♚ ░░░    ♜  Score
7 ░░░    ♟  ♟  ♞  ♟  ♟  ♟  Moves: 56
6    ░░░   ░░░ ♟ ░░░    ♞  Result: Score won
5 ░░░   ░░░   ░░░   ░░░
4    ░░░   ░░░ ♝ ░░░   ░░░
3  ♜    ░░░   ░░░   ░░░
2    ░░░   ░░░ ♛ ░░░   ░░░
1  ♔    ░░░   ░░░   ░░░    Forward
   a  b  c  d  e  f  g  h

1. Na3 e6 2. g4 Qh4 3. b4 Bxb4 4. c4 Qxg4 5. Qa4 b5 6. Qxa7 Rxa7 7. Nxb5 Ra5 8. a4 Bb7 9. Na7 Bxd2+ 10. Kxd2 Qd4+ 11. Kc2 Qxa1 12. Bh6 Qxf1 13. e4 Bxe4+ 14. Kb3 Nxh6 15. f4 Bxh1 16. Nf3 Qxf3+ 17. Kb4 Rxa7 18. h4 Qxf4 19. h5 Nc6+ 20. Kc5 Ne7 21. a5 Rxa5+ 22. Kb4 Rxh5 23. Ka4 Qxc4+ 24. Ka3 Rh3+ 25. Kb2 Qe2+ 26. Kc1 Rc3+ 27. Kb1 Be4+ 28. Ka1 Ra3# *
$
```

An ANSI dashboard is displayed live white bots are playing against each other.
At the end, the whole game is exposed in PGN format.

### Tournament

All available bots play a tournament and each bot is ranked with an Elo score.

```sh
$ deno tournament.ts

[ Round #150]                                            [ Standings ]
8    ░░░   ░░░   ░░░   ░░░ Promotion                     ╔════╤═══════════╤══════╤═══════╤════════╤══════╤══════════╗     
7 ░░░   ░░░    ♚    ░░░    Moves: 101                    ║ #  │ Bot       │ Wins │ Draws │ Losses │ Elo  │ Time(ms) ║     
6    ░░░   ░░░   ░░░   ░░░ Result: Insufficient Material ╟────┼───────────┼──────┼───────┼────────┼──────┼──────────╢     
5 ░░░   ░░░   ░░░   ░░░                                  ║  1 │ Score     │   19 │    30 │      3 │ 1284 │    33770 ║     
4    ░░░   ░░░   ░░░   ░░░                               ║  2 │ Decent    │   10 │    11 │      1 │ 1284 │    15171 ║     
3 ░░░   ░░░   ░░░   ░░░                                  ║  3 │ Draw      │    5 │     8 │      3 │ 1237 │     6959 ║     
2    ░░░   ░░░   ░░░   ░░░                               ║  4 │ Steal     │    2 │     3 │      0 │ 1228 │       33 ║     
1 ░░░    ♔    ░░░   ░░░    Capture                       ║  5 │ Space     │    1 │     4 │      0 │ 1221 │     4061 ║     
   a  b  c  d  e  f  g  h                                ║  6 │ Defend    │    1 │    15 │      2 │ 1207 │    43361 ║     
                                                         ║ ...                                                         ║     
                                                         ║ 20 │ Wall      │    0 │     8 │      6 │ 1136 │      178 ║     
                                                         ╚════╧═══════════╧══════╧═══════╧════════╧══════╧══════════╝     

$
```
