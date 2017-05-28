# Roguelike Dungeon Crawler

A roguelike game built as part of Free Code Camp's React challenges that uses React and Redux.

### User Stories

1. I have health, a level, and a weapon. I can pick up a better weapon. I can pick up health items.
2. All the items and enemies on the map are arranged at random.
3. I can move throughout a map, discovering items.
4. I can move anywhere within the map's boundaries, but I can't move through an enemy until I've beaten it.
5. Much of the map is hidden. When I take a step, all spaces that are within a certain number of spaces from me are revealed.
6. When I beat an enemy, the enemy goes away and I get XP, which eventually increases my level.
7. When I fight an enemy, we take turns damaging each other until one of us loses. I do damage based off of my level and my weapon. The enemy does damage based off of its level. Damage is somewhat random within a range.
8. When I find and beat the boss, I win.
9. The game should be challenging, but theoretically winnable.

### Technology Used:

* Node
* React
* Redux
* React-Redux
* Webpack
* Babel
* Dungeon Factory (Map Generator)

### Installation:

Provided Node and NPM are installed, enter the following CLI command to install dependencies:
```
$ npm install
```

### Usage:

To run the app, enter the following command:
```
$ npm run start
```

### Heroku Demo:

You can view a live demo of the game at https://tom-p-uk-dungeon-crawler.herokuapp.com/
