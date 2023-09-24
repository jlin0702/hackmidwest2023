/*
{
    name : test,
    effect: this is a description,
    steps: [ // iterate through each step and do action
        
    ], 
}
*/

let self = 0;
let opp = 1;

function setSelfOpp (self) {
    opp = (self + 1) % 2;
}

// STEPS
// targetId = player index
function damage(target, value) {
    let newHp = players[target].activeMonster.hp - value;
    return Math.max(0, newHp);
}

function heal(target, value) {
    let newHp = players[target].activeMonster.hp + value;
    return Math.max(0, newHp);
}


// NAMED MOVES
const moves = [
    {
        name: "Bind",
        effect: "A medium attack that entangles the enemy",
        steps: function() {damage(opp,10)}
    }, {
        name: "Wave",
        effect: "A light attack which slightly moves",
        steps: function() {damage(opp, 5)}
    }, {
        name: "Harden",
        effect: "A hard attack that makes you tough",
        steps: function() {damage(opp, 5)}
    }, {
        name: "Photosynthesis",
        effect: "Heals yourself for 10",
        steps: function() {heal(self, 10)}
    }, {
        name: "Claw",
        effect: "A light attack with paws",
        steps: function() {damage(opp, 5)}
    }, {
        name: "Swipe",
        effect: "A medium attack with paws",
        steps: function() {damage(opp,10)}
    }, {
        name: "Thrash",
        effect: "A hard attack with paws",
        steps: function() {damage(opp,15)}
    }, {
        name: "Bite",
        effect: "A finishing move that does 100% more damage when the enemy has less than 25 health",
        steps: function() {if (opp.hp < 25) {damage(opp,20)} else {damage(opp,10)}}
    }, {
        name: "Web3",
        effect: "Trap the opponent in web3 world",
        steps: function() {damage(opp, 30)}
    }, {
        name: "Blazing Speeds",
        effect: "A quick attack that does damage to the enemy",
        steps: function() {damage(opp, 30)}
    }, {
        name: "API Beam",
        effect: "A tough beam of API attack",
        steps: function() {damage(opp, 30)}
    }, {
        name: "Elimination",
        effect: "A finishing move that does 100% more damage when the enemy has less than 50 health",
        steps: function() {if (opp.hp < 50) {damage(opp,50)} else {damage(opp,25)}}
    }, {
        name: "Become a Llama",
        effect: "CHARRRRGEEEEE (deal 5 damage to yourself)",
        steps: function() { damage(opp, 45); {damage((opp+1)%2), 5}}
    }, {
        name: "Dedication",
        effect: "Heals yourself for 100",
        steps: function() { heal(self,45)}
    }, {
        name: "Headbutt",
        effect: "A light attack with head",
        steps: function() {damage(opp, 10)}
    }, {
        name: "Bite",
        effect: "A medium attack with teeth",
        steps: function() {damage(opp,10)}
    }, {
        name: "Kick",
        effect: "A hard attack with legs",
        steps: function() {damage(opp,10)}
    }, {
        name: "Frenzied Bite",
        effect: "A strong move that also damages self by 5",
        steps: function() {damage(opp, 20); damage(self, 5)}
    }
]