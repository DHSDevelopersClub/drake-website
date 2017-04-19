//use "game maker back door" in the class selection prompt to become God (without the quotation marks)

var dungeonRPG = function(){

var playerName = prompt("Welcome adventurer, what is your name?");

//declaring variables
var i = 0;
var i1 = 0;
var battle = 0;
var currentDamage = 0;
var nextDamage = 0;
var overkill = 0;
var overHeal = 0;
var overMana = 0;
var critChanceVar = 0;
var critChance = 0;
var player = 0;
var playerAttackA = 0;
var playerAttackB = 0;
var playerSpecialAttack = 0;
var typePlayerAttack = 0;
var rangerSpecialAttackRandomInt = 0;
var classDecision = true;
var actionChoice = true;
var currentEnemy = 0;
var battleDifficulty = 0;
var enemyDifficultyVar = 0.1;
var enemyDifficulty = 0;
var enemyDifficultyChoice = 0;
var playerAlive = true;
var enemyKillCounter = 0;
var facingEnemy = false;
var bossBattle = false;
var playerEXP = 0;
var levelEXP = 5;
var levelEXPvar = 5;
var levelEXPvarvar = 0;
var playerLevel = 1;
var playerGold = 0;
var enemyEXPdrop = 0;
var enemyGoldDrop = 0;
var bag = [];
var tempBag =[];
var bagSize = 1;
var itemPlaced = false;
var swapItem = 0;
var tempItem = 0;
var tempItem2 = 0;
var bossBattles = [10, 25, 40, 50, 60, 75, 90, 99, 100];
var shopSpawnVar = 0;
var shopSpawn = [];
var shopItems = [];
var itemGenerated = true;
var randomItemVar = 0;
var buyItem = true;
var tempChangeArray = [];
var playerBuff = false;
var enemyBuff = false;
var returnValue = 0;
var talentPoints = 0;
var talentPoint = {
    maxHealth: 0,
    attack: 0,
    defense: 0,
    maxMana: 0,
    maxHealthMult: 0,
    attackMult: 0,
    defenseMult: 0,
    maxManaMult: 0,
    decision: true
};
var talentPointChoice = 0;

//generally used functions
var randomInt = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
var roundInt = function(unroundedNumber){
    if((unroundedNumber - Math.floor(unroundedNumber)) >= 0.5){
        return Math.ceil(unroundedNumber);
    } else {
        return Math.floor(unroundedNumber);
    }
};
for(i=0; i<100; i++){
shopSpawnVar += randomInt(3,5);
shopSpawn[i] = shopSpawnVar;
}

//setting up most of the objects used in the game
var Class = function(playerHealthRegen, playerMaxHealth, playerAttack, playerDefense, playerMaxMana, playerManaRegen, player) {
    this.playerHealthRegen = playerHealthRegen;
    this.playerMaxHealth = playerMaxHealth;
    this.playerHealth = playerMaxHealth;
    this.playerAttack = playerAttack;
    this.playerDefense = playerDefense;
    this.playerBlock = playerDefense;
    this.playerMaxMana = playerMaxMana;
    this.playerMana = playerMaxMana;
    this.playerManaRegen = playerManaRegen;
    this.player = player;
};
var Enemy = function(enemyHealthRegen, enemyMaxHealth, enemyAttack, enemyDefense, enemyCritChanceMultiplier, enemyCritDamageMultiplier, enemySpecialAttack, enemyName, enemySpecialAttackName, enemyLevel){
    this.enemyHealthRegen = roundInt(enemyHealthRegen * ((enemyLevel/10) + 1));
    this.enemyMaxHealth = roundInt(enemyMaxHealth * ((enemyLevel/10) + 1));
    this.enemyHealth = this.enemyMaxHealth;
    this.enemyAttack = roundInt(enemyAttack * ((enemyLevel/10) + 1));
    this.enemyDefense = roundInt(enemyDefense * ((enemyLevel/10) + 1));
    this.enemyBlock = this.enemyDefense;
    this.enemyCritChanceMultiplier = enemyCritChanceMultiplier;
    this.enemyCritDamageMultiplier = enemyCritDamageMultiplier;
    this.enemySpecialAttack = enemySpecialAttack;
    this.enemyName = enemyName;
    this.enemySpecialAttackName = enemySpecialAttackName;
    this.enemyLevel = enemyLevel;
    facingEnemy = true;
};
var playerAttack = function(critChanceMultiplier, critDamageMultiplier, playerAttackMana, playerAttackName){
    this.critChanceMultiplier = critChanceMultiplier;
    this.critDamageMultiplier = critDamageMultiplier;
    this.playerAttackMana = playerAttackMana;
    this.playerAttackName = playerAttackName;
};
var playerSpecialAttacks = function(critChanceMultiplier, critDamageMultiplier, playerSpecialAttackClass, playerSpecialAttackMana, playerSpecialAttackName){
    this.critChanceMultiplier = critChanceMultiplier;
    this.critDamageMultiplier = critDamageMultiplier;
    this.playerSpecialAttackClass = playerSpecialAttackClass;
    this.playerSpecialAttackMana = playerSpecialAttackMana;
    this.playerSpecialAttackName = playerSpecialAttackName;
};
var buff = function(whoTempChange, whichTempChange, quantityTempChange, timeTempChange, statusTempChange){
    this.whoTempChange = whoTempChange;
    this.whichTempChange = whichTempChange;
    this.quantityTempChange = quantityTempChange;
    this.timeTempChange = timeTempChange;
    this.statusTempChange = statusTempChange;
};
//the function used to remove buffs or debuffs from the player or the enemy and restore the temporary changes implemented by these buffs
var removeBuff = function(tempVar){
    if(battle){
    if(tempChangeArray[tempVar].quantityTempChange < 0){
        if(tempChangeArray[tempVar].whoTempChange === "enemy"){
            console.log("The debuff on " + currentEnemy.enemyName + " for " + tempChangeArray[tempVar].quantityTempChange + " " + tempChangeArray[tempVar].whichTempChange + " has worn off.");
        } else {
            console.log("The debuff on you for " + tempChangeArray[tempVar].quantityTempChange + " " + tempChangeArray[tempVar].whichTempChange + " has worn off.");
        }
    } else {
        if(tempChangeArray[tempVar].whoTempChange === "enemy"){
            console.log("The buff on " + currentEnemy.enemyName + " for " + tempChangeArray[tempVar].quantityTempChange + " " + tempChangeArray[tempVar].whichTempChange + " has worn off.");
        } else {
            console.log("The buff on you for " + tempChangeArray[tempVar].quantityTempChange + " " + tempChangeArray[tempVar].whichTempChange + " has worn off.");
        }
    }
    tempChangeArray[tempVar].quantityTempChange = roundInt(tempChangeArray[tempVar].quantityTempChange);
    if(tempChangeArray[tempVar].whoTempChange === "player"){
        switch(tempChangeArray[tempVar].whichTempChange){
            case("attack"):
                player.playerAttack -= tempChangeArray[tempVar].quantityTempChange;
                break;
            case("defense"):
                player.playerDefense -= tempChangeArray[tempVar].quantityTempChange;
                break;
            case("healthRegen"):
                player.playerHealthRegen -= tempChangeArray[tempVar].quantityTempChange;
                break;
            case("manaRegen"):
                player.playerManaRegen -= tempChangeArray[tempVar].quantityTempChange;
                break;
            case("maxHealth"):
                player.playerMaxHealth -= tempChangeArray[tempVar].quantityTempChange;
                if(player.playerHealth > player.playerMaxHealth){
                    player.playerHealth = player.playerMaxHealth;
                } if(player.playerMaxHealth <= 0){
                    console.log("You now have 0 max health and are therefore dead.");
                    playerDeath();
                }
                break;
            case("maxMana"):
                player.playerMaxMana -= tempChangeArray[tempVar].quantityTempChange;
                if(player.playerMana > player.playerMaxMana){
                    player.playerMana = player.playerMaxMana;
                } if(player.playerMaxMana <= 0){
                    console.log("You now have 0 max mana. You feel the power to attack draining out of your body and you crumple to the ground in defeat.");
                    playerDeath();
                }
                break;
        }
    } else if(tempChangeArray[tempVar].whoStatChange === "enemy"){
        switch(tempChangeArray[tempVar].whichStatChange){
            case("attack"):
                currentEnemy.enemyAttack -= tempChangeArray[tempVar].quantityTempChange;
                break;
            case("defense"):
                currentEnemy.enemyDefense -= tempChangeArray[tempVar].quantityTempChange;
                break;
            case("healthRegen"):
                currentEnemy.enemyHealthRegen -= tempChangeArray[tempVar].quantityTempChange;
                break;
            case("maxHealth"):
                currentEnemy.enemyMaxHealth -= tempChangeArray[tempVar].quantityTempChange;
                if(currentEnemy.enemyHealth > currentEnemy.enemyMaxHealth){
                    currentEnemy.enemyHealth = currentEnemy.enemyMaxHealth;
                } if(currentEnemy.enemyMaxHealth <= 0){
                    console.log(currentEnemy.enemyName + " now has 0 max health and is therefore dead.");
                    enemyDeath();
                }
                break;
        }
    }
    }
    tempChangeArray.splice(tempVar, 1);
};

//where I define the classes and where you can add new ones - also where I define all of the player's attack stats except for what their special attack does
var warrior = function(){
    player = new Class(0, 30, 4, 6, 10, 1, "warrior");
    playerAttackA = new playerAttack(0, 1.5, 0, "stab");
    playerAttackB = new playerAttack(1, 3.5, 2, "charge");
    playerSpecialAttack = new playerSpecialAttacks(99999, 4.5, 1, 5, "whirlwind");
    talentPoint.maxHealthMult = 1.2;
    talentPoint.attackMult = 0.6;
    talentPoint.defenseMult = 0.8;
    talentPoint.maxManaMult = 0.6;
};
var ranger = function(){
    player = new Class(0, 10, 8, 6, 5, 2, "ranger");
    playerAttackA = new playerAttack(0, 1.5, 1, "shoot");
    playerAttackB = new playerAttack(1, 5, 3, "snipe");
    playerSpecialAttack = new playerSpecialAttacks(0.75, 1.5, 2, 5, "multi-shot");
    talentPoint.maxHealthMult = 0.8;
    talentPoint.attackMult = 1.2;
    talentPoint.defenseMult = 0.6;
    talentPoint.maxManaMult = 0.6;
};
var cleric = function(){
    player = new Class(0, 15, 5, 5, 10, 2, "cleric");
    playerAttackA = new playerAttack(0, 1, 1, "divination");
    playerAttackB = new playerAttack(0.75, 1.5, 3, "curse");
    playerSpecialAttack = new playerSpecialAttacks(0, 0, 3, 5, "fallen angels");
    talentPoint.maxHealthMult = 1;
    talentPoint.attackMult = 0.4;
    talentPoint.defenseMult = 0.8;
    talentPoint.maxManaMult = 1;
};
var mage = function(){
    player = new Class(0, 10, 12, 4, 20, 4, "mage");
    playerAttackA = new playerAttack(0.6, 1.5, 2, "lightning");
    playerAttackB = new playerAttack(1, 2.2, 3, "fireball");
    playerSpecialAttack = new playerSpecialAttacks(1.5, 3, 4, 12, "fire to consume the world");
    talentPoint.maxHealthMult = 0.4;
    talentPoint.attackMult = 1.4;
    talentPoint.defenseMult = 0.4;
    talentPoint.maxManaMult = 1;
};
var meth = function(){
    player = new Class(0, 10, 5, 5, 9, 3, "meth");
    playerAttackA = new playerAttack(0, 1.1, 2, "vape");
    playerAttackB = new playerAttack(1.5, 2, 4, "boil");
    playerSpecialAttack = new playerSpecialAttacks(0, 0, 420, 7, "Game of Thrones binge");
    talentPoint.maxHealthMult = 1;
    talentPoint.attackMult = 1;
    talentPoint.defenseMult = 1;
    talentPoint.maxManaMult = 1;
};
var God = function(){
    player = new Class(9999, 9999, 9999, 9999, 9999, 9999, "God");
    playerAttackA = new playerAttack(9999, 9999, 9999, "1");
    playerAttackB = new playerAttack(9999, 9999, 9999, "2");
    playerSpecialAttack = new playerSpecialAttacks(9999, 9999, 9999, 9999, "3");
    talentPoint.maxHealthMult = 9999;
    talentPoint.attackMult = 9999;
    talentPoint.defenseMult = 9999;
    talentPoint.maxManaMult = 9999;
};
//the function where the player chooses their class for the game
var chooseClass = function(){
while(classDecision){
    var playerClass = prompt("Choose a class, " + playerName + ": Warrior, Ranger, Cleric, Mage, or more info.");
    switch(playerClass){
        case("Warrior"):
        case("warrior"):
        case("1"):
            warrior();
            classDecision = false;
            break;
        case("Ranger"):
        case("ranger"):
        case("2"):
            ranger();
            classDecision = false;
            break;
        case("Cleric"):
        case("cleric"):
        case("3"):
            cleric();
            classDecision = false;
            break;
        case("Mage"):
        case("mage"):
        case("4"):
            mage();
            classDecision = false;
            break;
        default:
            console.log("Please choose one of the available classes.");
            break;
        case("Meth"):
        case("meth"):
        case("420"):
            meth();
            classDecision = false;
            break;
        case("game maker back door"):
            God();
            classDecision = false;
            break;
        case("0"):
        case("more info"):
        case("More Info"):
        case("5"):
            var playerClass = prompt("Which class would you like more information on? (Warrior, Ranger, Cleric, or Mage)");
            switch(playerClass){
        case("Warrior"):
        case("warrior"):
        case("1"):
            warrior();
            console.log("");
            console.log("The Warrior is a tank known for great stamina and ability to withstand many enemies' attacks in combat, but often struggles with dealing enough damage against enemies of similar build.");
            console.log("It has " + player.playerMaxHealth + " health, " + player.playerHealthRegen + " health regeneration per turn, " + player.playerAttack + " attack, " + player.playerDefense + " defense, " + player.playerMana + " mana, and " + player.playerManaRegen + " mana regeneration per turn.");
            break;
        case("Ranger"):
        case("ranger"):
        case("2"):
            ranger();
            console.log("");
            console.log("The Ranger is a DPS known for quick, high-damage attacks that can quickly eliminate enemies with low health, but does not fare well against enemies in longer battles with many exchanges.");
            console.log("It has " + player.playerMaxHealth + " health, " + player.playerHealthRegen + " health regeneration per turn, " + player.playerAttack + " attack, " + player.playerDefense + " defense, " + player.playerMana + " mana, and " + player.playerManaRegen + " mana regeneration per turn.");
            break;
        case("Cleric"):
        case("cleric"):
        case("3"):
            cleric();
            console.log("");
            console.log("The Cleric is a healer whose special ability can restore health to the user, but lacks in damage and stamina. It works well in conjunction with many items, but has slow game progression ability.");
            console.log("It has " + player.playerMaxHealth + " health, " + player.playerHealthRegen + " health regeneration per turn, " + player.playerAttack + " attack, " + player.playerDefense + " defense, " + player.playerMana + " mana, and " + player.playerManaRegen + " mana regeneration per turn.");
            break;
        case("Mage"):
        case("mage"):
        case("4"):
            mage();
            console.log("");
            console.log("The Mage specializes in rapid fire high-damage spellcasting to quickly eliminate enemies, but is incredibly squishy.");
            console.log("It has " + player.playerMaxHealth + " health, " + player.playerHealthRegen + " health regeneration per turn, " + player.playerAttack + " attack, " + player.playerDefense + " defense, " + player.playerMana + " mana, and " + player.playerManaRegen + " mana regeneration per turn.");
            break;
        case("Meth"):
        case("meth"):
        case("420"):
            console.log("");
            console.log("Smoke weed every dayyyyyyyyyyyy");
            break;
        default:
            console.log("Please choose one of the available classes.");
            break;
            }
        break;
    }
}
confirm("Are you ready to begin your adventure, " + player.player + " " + playerName + "?");
};

//the function used to determine how much base damage the player deals from one of their attacks and whether they crit or not
var playerCrit = function(){
    critChanceVar = Math.random();
    critChance = critChanceVar * 2 * typePlayerAttack.critChanceMultiplier;
    if(critChance >= 1){
        currentDamage = typePlayerAttack.critDamageMultiplier * player.playerAttack;
    } else {
        currentDamage = player.playerAttack;
    }
    currentDamage = roundInt(currentDamage);
};
//the functions to run to kill the enemy or the player - they can be used at pretty much anytime successfully
var playerDeath = function(){
    overkill = Math.abs(player.playerHealth);
    player.playerHealth = 0;
    actionChoice = false;
    battle = false;
    playerAlive = false;
    console.log(currentEnemy.enemyName + " was your enemy when you lost the strength to keep fighting. You retreat while you still can.");
    console.log("");
    console.log("Game Over. You were defeated by " + currentEnemy.enemyName + ".");
};
var enemyDeath = function(){
    overkill = Math.abs(currentEnemy.enemyHealth);
    currentEnemy.enemyHealth = 0;
    battle = false;
    facingEnemy = false;
    console.log("You dealt " + currentDamage + " damage to " + currentEnemy.enemyName + ". It now has 0 health.");
    console.log("");
    if(bossBattle){
        console.log("Great work, " + playerName + "! You have successfully rid the land of one of its many evils, " + currentEnemy.enemyName + "!");
        bossBattle = false;
    } else {
    console.log("Congratulations! You have slain " + currentEnemy.enemyName + "!");
    }
    for(i=0; i<tempChangeArray.length; i++){
        if(tempChangeArray[i].whoTempChange === "enemy"){
            removeBuff(i);
        }
    }
};

//the largest function in the game so far - used to change any of the stats of the enemy or the player by any amount - all console.logs included and such - optionalVar is used to help it work better with playerCrit and enemyCrit so it can be used specifically with player and enemy main attacks
var statChange = function(whoStatChange, whichStatChange, quantityStatChange, optionalVar){
    quantityStatChange = roundInt(quantityStatChange);
    if(whoStatChange === "player"){
        switch(whichStatChange){
            case("bagSize"):
                bagSize += quantityStatChange;
                console.log("You have gained " + quantityStatChange + " extra storage space(s) in your bag. Your now have " + bagSize + " spaces total.");
                break;
            case("attack"):
                player.playerAttack += quantityStatChange;
                if(player.playerAttack > optionalVar){
                    console.log("You are at your maximum attack of " + optionalVar + ".");
                    quantityStatChange = 0;
                    player.playerAttack = optionalVar;
                }
                if(quantityStatChange !== 0){
                if(player.playerAttack <= 0){
                    player.playerAttack = 0;
                } if(quantityStatChange > 0){
                    console.log("Your attack went up by " + quantityStatChange + ". You now have " + player.playerAttack + " attack total.");
                } if(quantityStatChange < 0){
                    console.log("Your attack went down by " + Math.abs(quantityStatChange) + ". You now have " + player.playerAttack + " attack total.");
                }
                }
                break;
            case("defense"):
                player.playerDefense += quantityStatChange;
                if(player.playerDefense > optionalVar){
                    console.log("You are at your maximum defense of " + optionalVar + ".");
                    quantityStatChange = 0;
                    player.playerDefense = optionalVar;
                }
                if(quantityStatChange !== 0){
                if(player.playerDefense <= 0){
                    player.playerDefense = 0;
                } if(quantityStatChange > 0){
                    console.log("Your defense went up by " + quantityStatChange + ". You now have " + player.playerDefense + " defense total.");
                } if(quantityStatChange < 0){
                    console.log("Your defense went down by " + Math.abs(quantityStatChange) + ". You now have " + player.playerDefense + " defense total.");
                }
                }
                break;
            case("health"):
                if(quantityStatChange !== 0){
                overHeal = 0;
                if(optionalVar){
                    quantityStatChange -= player.playerBlock;
                    if(quantityStatChange <= 0){
                        quantityStatChange = 0;
                    }
                    player.playerHealth -= quantityStatChange;
                    if(player.playerHealth <= 0){
                        playerDeath();
                    } else {
                    console.log(currentEnemy.enemyName + " dealt " + quantityStatChange + " damage to you. You now have " + player.playerHealth + " health.");
                    }
                } else {
                player.playerHealth += quantityStatChange;
                if(player.playerHealth > player.playerMaxHealth){
                    overHeal = player.playerHealth - player.playerMaxHealth;
                    player.playerHealth = player.playerMaxHealth;
                } if(player.playerHealth <= 0){
                    playerDeath();
                } if(quantityStatChange < 0 && player.playerHealth > 0){
                    console.log("You lost " + (Math.abs(quantityStatChange) - overHeal) + " health. You now have " + player.playerHealth + " health.");
                } if(quantityStatChange > 0){
                    console.log("You recovered " + (quantityStatChange - overHeal) + " health. You now have " + player.playerHealth + " health.");
                }
                }
                }
                break;
            case("healthRegen"):
                player.playerHealthRegen += quantityStatChange;
                if(player.playerHealthRegen > optionalVar){
                    console.log("You are at your maximum health regeneration of " + optionalVar + ".");
                    quantityStatChange = 0;
                    player.playerHealthRegen = optionalVar;
                }
                if(quantityStatChange !== 0){
                    if(quantityStatChange < 0){
                        console.log("You are now taking an extra " + Math.abs(quantityStatChange) + " damage per turn.");
                    } if(quantityStatChange > 0){
                        console.log("You are now regenerating an extra " + quantityStatChange + " health per turn.");
                    } if(player.playerHealthRegen >= 0){
                        console.log("You now recover " + player.playerHealthRegen + " health each turn.");
                    } if(player.playerHealthRegen < 0){
                        console.log("You now lose " + Math.abs(player.playerHealthRegen) + " health each turn");
                    }
                }
                break;
            case("manaRegen"):
                player.playerManaRegen += quantityStatChange;
                if(player.playerManaRegen > optionalVar){
                    console.log("You are at your maximum mana regeneration of " + optionalVar + ".");
                    quantityStatChange = 0;
                    player.playerManaRegen = optionalVar;
                }
                if(quantityStatChange !== 0){
                    if(quantityStatChange < 0){
                        console.log("You are now losing an extra " + Math.abs(quantityStatChange) + " mana per turn.");
                    } if(quantityStatChange > 0){
                        console.log("You are now regenerating an extra " + quantityStatChange + " mana per turn.");
                    } if(player.playerManaRegen >= 0){
                        console.log("You now recover " + player.playerManaRegen + " mana each turn.");
                    } if(player.playerManaRegen < 0){
                        console.log("You now lose " + Math.abs(player.playerManaRegen) + " mana each turn");
                    }
                }
                break;
            case("maxHealth"):
                player.playerMaxHealth += quantityStatChange;
                if(quantityStatChange !== 0){
                    if(quantityStatChange < 0){
                        console.log("You lost " + Math.abs(quantityStatChange) + " max health point(s). Your max health is now " + player.playerMaxHealth + ".");
                    } if(quantityStatChange > 0){
                        console.log("You gained " + quantityStatChange + " max health point(s). Your max health is now " + player.playerMaxHealth + ".");
                    } if(player.playerMaxHealth <= 0){
                        playerDeath();
                    } if(player.playerHealth > player.playerMaxHealth){
                        player.playerHealth = player.playerMaxHealth;
                    }
                }
                break;
            case("maxMana"):
                player.playerMaxMana += quantityStatChange;
                if(quantityStatChange !== 0){
                    if(quantityStatChange < 0){
                        console.log("You lost " + Math.abs(quantityStatChange) + " max mana point(s). Your max mana is now " + player.playerMaxMana + ".");
                    } if(quantityStatChange > 0){
                        console.log("You gained " + quantityStatChange + " max mana point(s). Your max mana is now " + player.playerMaxMana + ".");
                    } if(player.playerMaxMana <= 0){
                        console.log("You permanently have 0 mana, so you can no longer attack.");
                        playerDeath();
                    } if(player.playerMana > player.playerMaxMana){
                        player.playerMana = player.playerMaxMana;
                    }
                }
                break;
            case("block"):
                player.playerBlock += quantityStatChange;
                if(player.playerBlock <= 0){
                    player.playerBlock = 0;
                    console.log("You were unable to defend.");
                }
                break;
            case("mana"):
                if(quantityStatChange !== 0){
                overMana = 0;
                player.playerMana += quantityStatChange;
                if(player.playerMana > player.playerMaxMana){
                    overMana = player.playerMana - player.playerMaxMana;
                    player.playerMana = player.playerMaxMana;
                } if(player.playerMana < 0){
                    overMana = Math.abs(player.playerMana);
                    player.playerMana = 0;
                } if(quantityStatChange < 0){
                        console.log("You lost " + (Math.abs(quantityStatChange) - overMana) + " mana. You now have " + player.playerMana + " mana.");
                } if(quantityStatChange > 0){
                    console.log("You recovered " + (quantityStatChange - overMana) + " mana. You now have " + player.playerMana + " mana.");
                }
                }
                break;
        }
    } else if(whoStatChange === "enemy"){
        switch(whichStatChange){
            case("attack"):
                currentEnemy.enemyAttack += quantityStatChange;
                if(currentEnemy.enemyAttack > optionalVar){
                    console.log(currentEnemy.enemyName + " is at its maximum defense of " + optionalVar + ".");
                    quantityStatChange = 0;
                    currentEnemy.enemyAttack = optionalVar;
                }
                if(quantityStatChange !== 0){
                if(currentEnemy.enemyAttack <= 0){
                    currentEnemy.enemyAttack = 0;
                } if(quantityStatChange > 0){
                    console.log(currentEnemy.enemyName + "'s attack went up by " + quantityStatChange + ". It now has " + currentEnemy.enemyAttack + " attack total.");
                } if(quantityStatChange < 0){
                    console.log(currentEnemy.enemyName + "'s attack went down by " + Math.abs(quantityStatChange) + ". It now has " + currentEnemy.enemyAttack + " attack total.");
                }
                }
                break;
            case("defense"):
                currentEnemy.enemyDefense += quantityStatChange;
                if(currentEnemy.enemyDefense > optionalVar){
                    console.log(currentEnemy.enemyName + " is at its maximum defense of " + optionalVar + ".");
                    quantityStatChange = 0;
                    currentEnemy.enemyDefense = optionalVar;
                }
                if(quantityStatChange !== 0){
                if(currentEnemy.enemyDefense <= 0){
                    currentEnemy.enemyDefense = 0;
                } if(quantityStatChange > 0){
                    console.log(currentEnemy.enemyName + "'s defense went up by " + quantityStatChange + ". It now has " + currentEnemy.enemyDefense + " defense total.");
                } if(quantityStatChange < 0){
                    console.log(currentEnemy.enemyName + "'s defense went down by " + Math.abs(quantityStatChange) + ". It now has " + currentEnemy.enemyDefense + " defense total.");
                }
                }
                break;
            case("healthRegen"):
                currentEnemy.enemyHealthRegen += quantityStatChange;
                if(currentEnemy.enemyHealthRegen > optionalVar){
                    console.log(currentEnemy.enemyName + " is at its maximum health regeneration of " + optionalVar + ".");
                    quantityStatChange = 0;
                    currentEnemy.enemyHealthRegen = optionalVar;
                }
                if(quantityStatChange !== 0){
                    if(quantityStatChange < 0){
                        console.log(currentEnemy.enemyName + " is now taking an extra " + Math.abs(quantityStatChange) + " damage per turn.");
                    } if(quantityStatChange > 0){
                        console.log(currentEnemy.enemyName + " is now regenerating an extra " + quantityStatChange + " health per turn.");
                    } if(currentEnemy.enemyHealthRegen >= 0){
                        console.log(currentEnemy.enemyName + " now recovers " + currentEnemy.enemyHealthRegen + " health each turn.");
                    } if(currentEnemy.enemyHealthRegen < 0){
                        console.log(currentEnemy.enemyName + " now loses " + Math.abs(currentEnemy.enemyHealthRegen) + " health each turn");
                    }
                }
                break;
            case("maxHealth"):
                currentEnemy.enemyMaxHealth += quantityStatChange;
                if(quantityStatChange !== 0){
                    if(quantityStatChange < 0){
                        console.log(currentEnemy.enemyName + " lost " + Math.abs(quantityStatChange) + " max health point(s). Its max health is now " + Math.abs(currentEnemy.enemyMaxHealth) + ".");
                    } if(quantityStatChange > 0){
                        console.log(currentEnemy.enemyName + " gained " + quantityStatChange + " max health point(s). Its max health is now " + currentEnemy.enemyMaxHealth + ".");
                    } if(currentEnemy.enemyMaxHealth <= 0){
                        enemyDeath();
                    } if(currentEnemy.enemyHealth > currentEnemy.enemyMaxHealth){
                        currentEnemy.enemyHealth = currentEnemy.enemyMaxHealth;
                    }
                }
                break;
            case("block"):
                currentEnemy.enemyBlock += quantityStatChange;
                if(currentEnemy.enemyBlock <= 0){
                    currentEnemy.enemyBlock = 0;
                    console.log(currentEnemy.enemyName + " was unable to defend.");
                }
                break;
            case("health"):
                if(quantityStatChange !== 0){
                overHeal = 0;
                if(optionalVar){
                    quantityStatChange -= currentEnemy.enemyBlock;
                    if(quantityStatChange < 0){
                        quantityStatChange = 0;
                    }
                    currentEnemy.enemyHealth -= quantityStatChange;
                    if(currentEnemy.enemyHealth <= 0){
                        enemyDeath();
                    } else {
                    console.log("You dealt " + quantityStatChange + " damage to " + currentEnemy.enemyName + ". It now has " + currentEnemy.enemyHealth + " health.");
                    }
                } else {
                currentEnemy.enemyHealth += quantityStatChange;
                if(currentEnemy.enemyHealth > currentEnemy.enemyMaxHealth){
                    overHeal = currentEnemy.enemyHealth - currentEnemy.enemyMaxHealth;
                    currentEnemy.enemyHealth = currentEnemy.enemyMaxHealth;
                } else if(currentEnemy.enemyHealth <= 0){
                    enemyDeath();
                    actionChoice = false;
                } else if(quantityStatChange < 0 && currentEnemy.enemyHealth > 0){
                    console.log(currentEnemy.enemyName + " lost " + (Math.abs(quantityStatChange) - overHeal) + " health. It now has " + currentEnemy.enemyHealth + " health.");
                } else if(quantityStatChange > 0){
                    console.log(currentEnemy.enemyName + " recovered " + (quantityStatChange - overHeal) + " health. It now has " + currentEnemy.enemyHealth + " health.");
                }
                }
                }
                break;
        }
    }
};

//another big function pretty much only used to apply buffs and debuffs of any almost any stat to the enemy or player by any amount for any amount of time - statusTempChange is used to determine whether the tempChange was used during the enemy's or player's turn so that it wears off at the correct timing
var tempChange = function(whoTempChange, whichTempChange, quantityTempChange, timeTempChange, statusTempChange){
    tempChangeArray[tempChangeArray.length] = new buff(whoTempChange, whichTempChange, quantityTempChange, timeTempChange, statusTempChange);
    quantityTempChange = roundInt(quantityTempChange);
    if(whoTempChange === "player"){
        switch(whichTempChange){
            case("attack"):
                player.playerAttack += quantityTempChange;
                if(quantityTempChange !== 0){
                if(player.playerAttack <= 0){
                    player.playerAttack = 0;
                } if(quantityTempChange > 0){
                    console.log("Your attack is now increased by " + quantityTempChange + " for " + timeTempChange + " turns. You now have " + player.playerAttack + " attack total.");
                } if(quantityTempChange < 0){
                    console.log("Your attack is now decreased by " + Math.abs(quantityTempChange) + " for " + timeTempChange + " turns. You now have " + player.playerAttack + " attack total.");
                }
                }
                break;
            case("defense"):
                player.playerDefense += quantityTempChange;
                if(quantityTempChange !== 0){
                if(player.playerDefense <= 0){
                    player.playerDefense = 0;
                } if(quantityTempChange > 0){
                    console.log("Your defense is now increased by " + quantityTempChange + " for " + timeTempChange + " turns. You now have " + player.playerDefense + " defense total.");
                } if(quantityTempChange < 0){
                    console.log("Your defense is now decreased by " + Math.abs(quantityTempChange) + " for " + timeTempChange + " turns. You now have " + player.playerDefense + " defense total.");
                }
                }
                break;
            case("healthRegen"):
                player.playerHealthRegen += quantityTempChange;
                if(quantityTempChange !== 0){
                if(quantityTempChange > 0){
                    console.log("You are now regenerating an extra " + quantityTempChange + " health per turn for " + timeTempChange + " turns. You now have " + player.playerHealthRegen + " health regeneration total.");
                } if(quantityTempChange < 0){
                    console.log("You are now taking an extra " + Math.abs(quantityTempChange) + " damage per turn for " + timeTempChange + " turns. You now have " + player.playerHealthRegen + " health regeneration total.");
                }
                }
                break;
            case("manaRegen"):
                player.playerManaRegen += quantityTempChange;
                if(quantityTempChange !== 0){
                if(quantityTempChange > 0){
                    console.log("You are now regenerating an extra " + quantityTempChange + " mana per turn for " + timeTempChange + " turns. You now have " + player.playerManaRegen + " mana regeneration total.");
                } if(quantityTempChange < 0){
                    console.log("You are now losing an extra " + Math.abs(quantityTempChange) + " mana per turn for " + timeTempChange + " turns. You now have " + player.playerManaRegen + " mana regeneration total.");
                }
                }
                break;
            case("maxHealth"):
                player.playerMaxHealth += quantityTempChange;
                if(quantityTempChange !== 0){
                if(player.playerHealth > player.playerMaxHealth){
                    player.playerHealth = player.playerMaxHealth;
                } if(player.playerMaxHealth <= 0){
                    console.log("You now have 0 max health and are therefore dead.");
                    playerDeath();
                } else if(quantityTempChange > 0){
                    console.log("Your max health is now increased by " + quantityTempChange + " for " + timeTempChange + " turns. You now have " + player.playerMaxHealth + " max health total.");
                } else if(quantityTempChange < 0){
                    console.log("Your max health is now decreased by " + Math.abs(quantityTempChange) + " for " + timeTempChange + " turns. You now have " + player.playerMaxHealth + " max health total.");
                }
                }
                break;
            case("maxMana"):
                player.playerMaxMana += quantityTempChange;
                if(quantityTempChange !== 0){
                if(player.playerMana > player.playerMaxMana){
                    player.playerMana = player.playerMaxMana;
                } if(player.playerMaxMana <= 0){
                    console.log("You now have 0 max mana. You feel the power to attack draining out of your body and you crumple to the ground in defeat.");
                    playerDeath();
                } else if(quantityTempChange > 0){
                    console.log("Your max mana is now increased by " + quantityTempChange + " for " + timeTempChange + " turns. You now have " + player.playerMaxMana + " max mana total.");
                } else if(quantityTempChange < 0){
                    console.log("Your max mana is now decreased by " + Math.abs(quantityTempChange) + " for " + timeTempChange + " turns. You now have " + player.playerMaxMana + " max mana total.");
                }
                }
                break;
        }
    } else if(whoTempChange === "enemy"){
        switch(whichTempChange){
            case("attack"):
                currentEnemy.enemyAttack += quantityTempChange;
                if(quantityTempChange !== 0){
                if(currentEnemy.enemyAttack <= 0){
                    currentEnemy.enemyAttack = 0;
                } if(quantityTempChange > 0){
                    console.log(currentEnemy.enemyName + "'s attack is now increased by " + quantityTempChange + " for " + timeTempChange + " turns. It now has " + currentEnemy.enemyAttack + " attack total.");
                } if(quantityTempChange < 0){
                    console.log(currentEnemy.enemyName + "'s attack is now decreased by " + Math.abs(quantityTempChange) + " for " + timeTempChange + " turns. It now has " + currentEnemy.enemyAttack + " attack total.");
                }
                }
                break;
            case("defense"):
                currentEnemy.enemyDefense += quantityTempChange;
                if(quantityTempChange !== 0){
                if(currentEnemy.enemyDefense <= 0){
                    currentEnemy.enemyDefense = 0;
                } if(quantityTempChange > 0){
                    console.log(currentEnemy.enemyName + "'s defense is now increased by " + quantityTempChange + " for " + timeTempChange + " turns. It now has " + currentEnemy.enemyDefense + " defense total.");
                } if(quantityTempChange < 0){
                    console.log(currentEnemy.enemyName + "'s defense is now decreased by " + Math.abs(quantityTempChange) + " for " + timeTempChange + " turns. It now has " + currentEnemy.enemyDefense + " defense total.");
                }
                }
                break;
            case("healthRegen"):
                currentEnemy.enemyHealthRegen += quantityTempChange;
                if(quantityTempChange !== 0){
                if(quantityTempChange > 0){
                    console.log(currentEnemy.enemyName + " is now regenerating an extra " + quantityTempChange + " health per turn for " + timeTempChange + " turns. It now has " + currentEnemy.enemyHealthRegen + " health regeneration total.");
                } if(quantityTempChange < 0){
                    console.log(currentEnemy.enemyName + " is now taking an extra " + Math.abs(quantityTempChange) + " damage per turn for " + timeTempChange + " turns. It now has " + currentEnemy.enemyHealthRegen + " health regeneration total.");
                }
                }
                break;
            case("maxHealth"):
                currentEnemy.enemyMaxHealth += quantityTempChange;
                if(quantityTempChange !== 0){
                if(currentEnemy.enemyHealth > currentEnemy.enemyMaxHealth){
                    currentEnemy.enemyHealth = currentEnemy.enemyMaxHealth;
                } if(currentEnemy.enemyMaxHealth <= 0){
                    console.log(currentEnemy.enemyName + " now has 0 max health and is therefore dead.");
                    enemyDeath();
                } else if(quantityTempChange > 0){
                    console.log(currentEnemy.enemyName + "'s max health is now increased by " + quantityTempChange + " for " + timeTempChange + " turns. It now has " + currentEnemy.enemyMaxHealth + " max health total.");
                } else if(quantityTempChange < 0){
                    console.log(currentEnemy.enemyName + "'s max health is now decreased by " + Math.abs(quantityTempChange) + " for " + timeTempChange + " turns. It now has " + currentEnemy.enemyMaxHealth + " max health total.");
                }
                }
                break;
        }
        }
};

//critChanceMultiplier, critDamageMultiplier, playerSpecialAttackClass, playerSpecialAttackMana, playerSpecialAttackName - reference to help make player special attacks without having to scroll up a bunch to see the order of stats in the function lol
//the place where I set up all of the classes' special attacks - use in conjunction with chooseClass
var warriorSpecialAttack = function(){
    playerCrit();
    statChange("enemy", "health", currentDamage, true);
};
var rangerSpecialAttack = function(){
    nextDamage = 0;
    rangerSpecialAttackRandomInt = randomInt(2,4);
    for(i=1;i<=rangerSpecialAttackRandomInt;i++){
        playerCrit();
        nextDamage += currentDamage;
    }
    currentDamage = nextDamage;
    statChange("enemy", "block", currentEnemy.enemyBlock * (rangerSpecialAttackRandomInt - 1));
    statChange("enemy", "health", currentDamage, true);
};
var clericSpecialAttack = function(){
    statChange("player", "health", 8);
};
var methSpecialAttack = function(){
    statChange("player", "health", 1);
    statChange("player", "manaRegen", 1);
};
var mageSpecialAttack = function(){
    tempChange("enemy", "healthRegen", -1*currentEnemy.enemyMaxHealth/10, 5, true);
};
var godSpecialAttack = function(){
    enemyDeath();
};
//use this one to actually make the special attacks usable by adding a case statement with the playerSpecialAttackClass number inside and when I run special attacks in playerTurn I'll just run this and it will match the case statement to the current class's special attack
var executePlayerSpecialAttack = function(){
    switch(playerSpecialAttack.playerSpecialAttackClass){
    case(1):
        warriorSpecialAttack();
        break;
    case(2):
        rangerSpecialAttack();
        break;
    case(3):
        clericSpecialAttack();
        break;
    case(4):
        mageSpecialAttack();
        break;
    case(420):
        methSpecialAttack();
        break;
    case(9999):
        godSpecialAttack();
        break;
    }
};

//setting up items
var item = function(itemName, itemTarget, itemUse, itemValue, itemAmount, itemCost, itemLevel, equipment, equipmentType){
    this.itemName = itemName;
    this.itemTarget = itemTarget;
    this.itemUse = itemUse;
    this.itemValue = itemValue;
    this.itemAmount = itemAmount;
    this.itemCost = itemCost;
    this.itemLevel = itemLevel;
    this.equipment = equipment;
    this.equipmentType = equipmentType;
};
//how you would get items from enemies loot drops but I haven't really implemented that yet and so I pretty much replaced this with the shop function for now lol
var getItem = function(itemName, itemTarget, itemUse, itemValue, itemAmount, itemCost, itemLevel, equipment, equipmentType){
    tempItem = new item(itemName, itemTarget, itemUse, itemValue, itemAmount, itemCost, itemLevel, equipment, equipmentType);
    console.log("You got " + itemName + " from " + currentEnemy.enemyName + ".");
    console.log("");
    for(i = 0; i < bagSize; i++){
    if(itemPlaced === false){
    if(tempItem.itemName == bag[i].itemName){
        bag[i].itemAmount += tempItem.itemAmount;
        itemPlaced = true;
    } else if(bag[i].itemName === "empty"){
        bag[i] = new item(itemName, itemTarget, itemUse, itemValue, itemAmount);
        itemPlaced = true;
    }
    }
    }
    if(itemPlaced === false){
        console.log("You don't have room in your bag for " + itemName + ".");
        console.log("");
        console.log("In your bag, you have:");
        for(var i = 0; i < bagSize; i++){
            tempItem = bag[i];
            if(tempItem.itemAmount <= 1){
            console.log(i + 1 + ". " + tempItem.itemName);
            } else {
            console.log(i + 1 + ". " + tempItem.itemName + " x " + tempItem.itemAmount);
            }
        }
        swapItem = prompt("Would you like to replace an item in your bag?");
        if(swapItem == true || swapItem === "yes" || swapItem === "1"){
            swapItem = prompt("Which item?");
            for(i = 0; i < bagSize; i++){
            itemPlaced = i + 1;
            if(swapItem == itemPlaced || swapItem == bag[i]){
                console.log("");
                console.log("You drop " + bag[i].itemName + " and pick up " + itemName + " in its place.");
                console.log("");
                bag[i] = new item(itemName, itemTarget, itemUse, itemValue, itemAmount);
            }
            }
        } else {
            console.log("");
            console.log("You leave " + tempItem.itemName + " behind you and continue on.");
            console.log("");
        }
    }
    itemPlaced = false;
};

//items!! Please make more they are pretty fun to make and I can help add them to the randomItem generator below if you are confused on how that works because that will allow them to randomly spawn in the shop based on your level and their item level - I really need more items I will work on it too but please help lol
//items without an itemLevel stat which allows them to spawn in the shop regardless of your level and their cost generally scales with your level as well
var empty = function(equipmentType){
    if(equipmentType != undefined){
    return new item("empty", 0, 0, 0, 0, 0, 0, true, equipmentType);
    } else {
    return new item("empty", 0, 0, 0, 0, 0, 0, false);
    }
};
var equipment = [empty("mainHand"), empty("offHand"), empty("head"), empty("torso"), empty("legs"), empty("feet"), empty("arms"), empty("hands")];
var healthPot = function(){
    return new item("Health Potion", "player", "health", roundInt(playerLevel*2), 1, playerLevel*10);
};
var manaPot = function(){
    return new item("Mana Potion", "player", "mana", roundInt(playerLevel*2.7), 1, playerLevel*10);
};
var protPot = function(){
    return new item("Protection Potion", "player", "block", 9999999, 1, playerLevel*10);
};
var extraPocket = function(){
    return new item("Extra Pocket", "player", "bagSize", 1, 1, playerLevel*50);
};
var healthCrystal = function(){
    return new item("Health Crystal", "player", "maxHealth", 1, 1, playerLevel*100);
};
var manaCrystal = function(){
    return new item("Mana Crystal", "player", "maxMana", 1, 1, playerLevel*100);
};
var GMOHeart = function(){
    return new item("GMO Heart", "player", "healthRegen", 1, 1, playerLevel*500);
};
var mysteriousWand = function(){
    return new item("Mysterious Wand", "player", "manaRegen", 1, 1, playerLevel*500);
};

//the regualr items with fixed item levels and costs that I really need more of to help make the game easier as the enemies get harder rip
var rustyIronDagger = function(){
    return new item("Rusty Iron Dagger", "player", "attack", 1, 1, 75, 1, true, "mainHand");
};
var batteredWoodenShield = function(){
    return new item("Battered Wooden Shield", "player", "defense", 1, 1, 75, 1, true, "offHand");
};
var swordOfSavagery = function(){
    return new item("Sword of Savagery", "player", "attack", 3, 1, 150, 5, true, "mainHand");
};
var shieldOfShielding = function(){
    return new item("Shield of Shielding", "player", "defense", 3, 1, 150, 5, true, "offHand");
};
var bomb = function(){
    return new item("Bomb", "enemy", "health", -25, 1, 90, 5);
};
var pileOfTNT = function(){
    return new item("Pile of TNT", "enemy", "health", randomInt(4,11)*-1, 3, 75, 5);
};

//generates random items for only the shop right now it's kinda weird how I did it idk try to make sense of it if you can and try to add the items you make to it basically just copy paste the case statements and change a couple things
var randomItem = function(playerLevel){
    itemGenerated = true;
    while(itemGenerated){
    randomItemVar = randomInt(1, 100);
    switch(randomItemVar){
    case(1):
        itemGenerated = false;
        returnValue = healthPot();
        break;
    case(2):
        itemGenerated = false;
        returnValue = manaPot();
        break;
    case(3):
        itemGenerated = false;
        returnValue = protPot();
        break;
    case(4):
        itemGenerated = false;
        returnValue = extraPocket();
        break;
    case(5):
        itemGenerated = false;
        returnValue = healthCrystal();
        break;
    case(6):
        itemGenerated = false;
        returnValue = manaCrystal();
        break;
    case(7):
        itemGenerated = false;
        returnValue = GMOHeart();
        break;
    case(8):
        itemGenerated = false;
        returnValue = mysteriousWand();
        break;
    case(9):
        tempItem = rustyIronDagger();
        if(tempItem.itemLevel <= roundInt(playerLevel*1.25 + 1) && tempItem.itemLevel >= roundInt(playerLevel*0.75 - 1)){
        itemGenerated = false;
        returnValue = rustyIronDagger();
        }
        break;
    case(10):
        tempItem = batteredWoodenShield();
        if(tempItem.itemLevel <= roundInt(playerLevel*1.25 + 1) && tempItem.itemLevel >= roundInt(playerLevel*0.75 - 1)){
        itemGenerated = false;
        returnValue = batteredWoodenShield();
        }
        break;
    case(11):
        tempItem = swordOfSavagery();
        if(tempItem.itemLevel <= roundInt(playerLevel*1.25 + 1) && tempItem.itemLevel >= roundInt(playerLevel*0.75 - 1)){
        itemGenerated = false;
        returnValue = swordOfSavagery();
        }
        break;
    case(12):
        tempItem = bomb();
        if(tempItem.itemLevel <= roundInt(playerLevel*1.25 + 1) && tempItem.itemLevel >= roundInt(playerLevel*0.75 - 1)){
        itemGenerated = false;
        returnValue = bomb();
        }
        break;
    case(13):
        tempItem = pileOfTNT();
        if(tempItem.itemLevel <= roundInt(playerLevel*1.25 + 1) && tempItem.itemLevel >= roundInt(playerLevel*0.75 - 1)){
        itemGenerated = false;
        returnValue = pileOfTNT();
        }
        break;
    }
    }
    itemGenerated = true;
    return returnValue;
};

//another important function with a bunch of fancy stuff which pretty much just lets the player decide whether to use their 1st, 2nd, or special attack or to use items in their bag and I'm working on the more info tab - don't worry about this function too much it's pretty much done and it's so convoluted that I barely understand it now lol
var playerTurn = function(){
    console.log("");
    if(player.playerHealthRegen !== 0 && !(player.playerHealth >= player.playerMaxHealth && player.playerHealthRegen > 0)){
        statChange("player", "health", player.playerHealthRegen);
    }
    if(battle){
    if(player.playerManaRegen !== 0 && !(player.playerMana >= player.playerMaxMana && player.playerManaRegen > 0)){
        statChange("player", "mana", player.playerManaRegen);
    }
    for(i=0; i<tempChangeArray.length; i++){
        if(tempChangeArray[i].statusTempChange == true){
            tempChangeArray[i].timeTempChange -= 1;
        }
    }
    for(i=0; i<tempChangeArray.length; i++){
        if(tempChangeArray[i].timeTempChange === 0){
            removeBuff(i);
        }
    }
    currentDamage = 0;
    player.playerBlock = player.playerDefense;
    currentEnemy.enemyBlock = currentEnemy.enemyDefense;
    var battleInfo = playerName + ", you are facing " + currentEnemy.enemyName + " (Level " + currentEnemy.enemyLevel + "). It has " + currentEnemy.enemyHealth + " health, " + currentEnemy.enemyAttack + " attack, and " + currentEnemy.enemyDefense + " defense. You currently have " + player.playerHealth + " health, " + player.playerAttack + " attack, " + player.playerDefense + " defense, and " + player.playerMana + " mana.";
    var actionPrompt = "What will you do, " + playerName + ": " + playerAttackA.playerAttackName + ", " + playerAttackB.playerAttackName + ", " + playerSpecialAttack.playerSpecialAttackName + ", Bag, buff info, or more info";
    console.log(battleInfo);
    console.log("");
    console.log("");
    console.log("");
    console.log("");
    console.log("");
    actionChoice = true;
    while(actionChoice){
        var action = prompt(actionPrompt);
        console.log("");
        console.log("");
        switch(action){
            case(playerAttackA.playerAttackName):
            case("1"):
                typePlayerAttack = playerAttackA;
                if(player.playerMana >= playerAttackA.playerAttackMana){
                console.log("You used " + playerAttackA.playerAttackName + " and used " + playerAttackA.playerAttackMana + " mana.");
                playerCrit();
                statChange("enemy", "health", currentDamage, true);
                actionChoice = false;
                player.playerMana -= playerAttackA.playerAttackMana;
                } else {
                console.log("Not enough mana.");
                }
                break;
            case(playerAttackB.playerAttackName):
            case("2"):
                typePlayerAttack = playerAttackB;
                if(player.playerMana >= playerAttackB.playerAttackMana){
                console.log("You used " + playerAttackB.playerAttackName + " and used " + playerAttackB.playerAttackMana + " mana.");
                playerCrit();
                statChange("enemy", "health", currentDamage, true);
                actionChoice = false;
                player.playerMana -= playerAttackB.playerAttackMana;
                } else {
                console.log("Not enough mana.");
                }
                break;
            case(playerSpecialAttack.playerSpecialAttackName):
            case("3"):
                typePlayerAttack = playerSpecialAttack;
                if(player.playerMana >= playerSpecialAttack.playerSpecialAttackMana){
                console.log("You used " + playerSpecialAttack.playerSpecialAttackName + " and used " + playerSpecialAttack.playerSpecialAttackMana + " mana.");
                executePlayerSpecialAttack();
                actionChoice = false;
                player.playerMana -= playerSpecialAttack.playerSpecialAttackMana;
                } else {
                console.log("Not enough mana.");
                }
                break;
            case("bag"):
            case("4"):
                console.log("In your bag, you have:");
                for(var i = 0; i < bagSize; i++){
                    tempItem = bag[i];
                    if(tempItem.itemAmount <= 1){
                    console.log(i + 1 + ". " + tempItem.itemName);
                    } else {
                    console.log(i + 1 + ". " + tempItem.itemName + " x " + tempItem.itemAmount);
                    }
                }
                console.log("");
                var itemChoice = prompt("Which item do you want to use?");
                for(i = 0; i < bagSize; i++){
                if(itemChoice == (i + 1)){
                tempItem = bag[i];
                if(tempItem.itemName === "empty"){
                console.log("That space in your bag is empty right now.");
                console.log("");
                } else {
                    if(tempItem.equipment){
                        for(i = 0; i < equipment.legth; i++){
                            if(tempItem.equipmentType === equipment[i].equipmentType){
                                tempItem2 = equipment[i];
                                if(tempItem2.itemValue !== 0){
                                console.log("You unequip " + tempItem2.itemName + " and equip " + tempItem.itemName + " in its place.");
                                statChange(tempItem2.itemTarget, tempItem2.itemUse, -1*tempItem2.itemValue);
                                statChange(tempItem.itemTarget, tempItem.itemUse, tempItem.itemValue);
                                bag.splice(itemChoice - 1, 1, tempItem2);
                                equipment.splice(i, 1, tempItem);
                                } else {
                                console.log("You equip " + tempItem.itemName + ".");
                                statChange(tempItem.itemTarget, tempItem.itemUse, tempItem.itemValue);
                                bag.splice(itemChoice - 1, 1, empty());
                                equipment.splice(i, 1, tempItem);
                                }
                            }
                        }
                    }
                    if(tempItem.itemAmount >= 1){
                        statChange(tempItem.itemTarget, tempItem.itemUse, tempItem.itemValue);
                        tempItem.itemAmount -= 1;
                        if(tempItem.itemAmount <= 0){
                            bag[itemChoice - 1] = new item("empty", 0, 0, 0, 0, 0, 0);
                        }
                    } else if(tempItem.itemAmount <= 0){
                        console.log("You do not have an item in bag slot " + i + 1 + " right now.");
                        tempItem.itemAmount = 0;
                    } else {
                        console.log("There was an error with this item.");
                    }
                }
                itemPlaced = true;
                }
                }
                if(itemPlaced === false){
                console.log("You do not have " + itemChoice + " right now.");
                }
                itemPlaced = false;
                break;
            case("buff info"):
            case("Buff Info"):
            case("5"):
                console.log("");
                for(i=0;i<tempChangeArray.length;i++){
                    if(tempChangeArray[i].whoTempChange === "player"){
                        playerBuff = true;
                    }
                    if(tempChangeArray[i].whoTempChange === "enemy"){
                        enemyBuff = true;
                    }
                }
                if(playerBuff){
                console.log("Your current buffs and debuffs are:");
                for(i=0;i<tempChangeArray.length;i++){
                    if(tempChangeArray[i].whoTempChange === "player"){
                        console.log(tempChangeArray[i].quantityTempChange + " " + tempChangeArray[i].whichTempChange + " for " + tempChangeArray[i].timeTempChange + " more turns.");
                    }
                }
                console.log("");
                } else {
                    console.log("You currently have no buffs or debuffs.");
                    console.log("");
                }
                if(enemyBuff){
                console.log(currentEnemy.enemyName + "'s current buffs and debuffs are:");
                for(i=0;i<tempChangeArray.length;i++){
                    if(tempChangeArray[i].whoTempChange === "enemy"){
                        console.log(tempChangeArray[i].quantityTempChange + " " + tempChangeArray[i].whichTempChange + " for " + tempChangeArray[i].timeTempChange + " more turns.");
                    }
                }
                console.log("");
                } else {
                    console.log(currentEnemy.enemyName + " currently has no buffs or debuffs.");
                    console.log("");
                }
                break;
            case("suicide"):
                playerDeath();
                break;
            default:
                console.log("Please choose one of the available options");
                console.log("");
                break;
        }
    }
    }
    console.log("");
};

//enemyHealthRegen, enemyMaxHealth, enemyAttack, enemyDefense, enemyCritChanceMultiplier, enemyCritDamageMultiplier, enemySpecialAttack, enemyName, enemySpecialAttackName - another reference to help make enemies without having to scroll up a bunch to see the order of stats in the function lol
//another thing that you should please help in adding more of and is also kind of complicated to randomly spawn in chooseEnemy down below but try to figure it out and please add enemies too thanks
var slime = function(enemyLevel){
    return new Enemy(1, 50, 1, 1, 1, 1.5, 0.67, "Slime", "Regeneration", enemyLevel);
};
var skeleton = function(enemyLevel){
    return new Enemy(0, 25, 5, 4, 1, 1.2, 0, "Skeleton", "undefined", enemyLevel);
};
var giantSpider = function(enemyLevel){
    return new Enemy(0, 40, 5, 5, 0, 1, 0.6, "Giant Spider", "Poison Bite", enemyLevel);
};
var bat = function(enemyLevel){
    return new Enemy(0, 30, 5, 0, 1.5, 1.3, 0.67, "Bat", "Vampire Bite", enemyLevel);
};
var goblin = function(enemyLevel){
    return new Enemy(0, 20, 6, 3, 1.5, 2, 0.67, "Goblin", "Sharpen", enemyLevel);
};

var kingSlime = function(enemyLevel){
    return new Enemy(3, 500, player.playerDefense, 0, 0.55, 1 + 1 / player.playerDefense, 0.6, "King Slime", "Super Heal", enemyLevel);
};
var Cthulhu = function(enemyLevel){
    return new Enemy(1, 250, 20, 15, 1, 1.25, 0.7, "Cthulhu", "Bane of Existence", enemyLevel);
};

//weird enemy I just used to test whether the tempChanges and everything were working but I might use it in the future again idk
var testEnemy = function(){
    return new Enemy(99999999, 100, 3, 99999999, 0, 0, 9999, "test_creature#001", "test_tempChange");
};

//the speial attacks of the different enemies - similar to how adding player special attacks works but with just all of them in one place instead of calling seperate functions lol I'm too lazy to change that
var executeEnemySpecialAttack = function(){
    console.log(currentEnemy.enemyName + " used " + currentEnemy.enemySpecialAttackName + "!");
    switch(currentEnemy.enemyName){
        case("Bat"):
            currentDamage = currentEnemy.enemyCritDamageMultiplier * currentEnemy.enemyAttack;
            statChange("enemy", "health", ((Math.abs(currentDamage - player.playerBlock))/2));
            break;
        case("Slime"):
            tempChange("enemy", "healthRegen", 1, 7, false);
            break;
        case("Goblin"):
            tempChange("enemy", "attack", 1, randomInt(2,4));
            break;
        case("Giant Spider"):
            tempChange("player", "healthRegen", -1, 2, false);
            break;
        case("King Slime"):
            statChange("enemy", "health", 25);
            break;
        case("Cthulhu"):
            statChange("player", "health", -1*player.playerHealth/2);
            break;
        case("test_creature#001"):
            tempChange("player", "healthRegen", -3, randomInt(1,5), false);
            break;
    }
};

//same as playerCrit but for enemy main attacks and can also use the enemy's special attack instead based on that stat
var enemyCrit = function(){
    critChanceVar = Math.random();
    critChance = Math.floor(critChanceVar * 2 * currentEnemy.enemySpecialAttack);
    if(critChance >= 1){
        executeEnemySpecialAttack();
    } else {
        critChanceVar = Math.random();
        critChance = Math.floor(critChanceVar * 2 * currentEnemy.enemyCritChanceMultiplier);
        if(critChance >= 1){
            currentDamage = currentEnemy.enemyCritDamageMultiplier * currentEnemy.enemyAttack;
        } else {
            currentDamage = currentEnemy.enemyAttack;
        }
    }
    currentDamage = roundInt(currentDamage);
};
//playerTurn but super simplified because all the enemy does is attack the player every turn with EnemyCrit
var enemyTurn = function(){
    if(currentEnemy.enemyHealthRegen !== 0 && !(currentEnemy.enemyHealth >= currentEnemy.enemyMaxHealth && currentEnemy.enemyHealthRegen > 0)){
        statChange("enemy", "health", currentEnemy.enemyHealthRegen);
    }
    if(battle){
    for(i=0; i<tempChangeArray.length; i++){
        if(tempChangeArray[i].statusTempChange == false){
            tempChangeArray[i].timeTempChange -= 1;
        }
    }
    for(i=0; i<tempChangeArray.length; i++){
        if(tempChangeArray[i].timeTempChange === 0){
            removeBuff(i);
        }
    }
    currentDamage = 0;
    player.playerBlock = player.playerDefense;
    currentEnemy.enemyBlock = currentEnemy.enemyDefense;
    enemyCrit();
    statChange("player", "health", currentDamage, true);
    }
    console.log("");
};

//just checking to see if both the enemy and the player are alive and going back and forth until one of them dies then everything stops and it moves on to the next enemy or shop or whatever or the game ends if the player dies
var executeBattle = function(){
while(battle){
    if(battle){
        playerTurn();
    }
    if(battle){
        enemyTurn();
    }
}
};

//based on an array of certain fights like the 10th fight or 50th fight it will spawn a super hard boss with a lot of loot and stuff like gold and exp instead of a regular enemy
var chooseBoss = function(tempVar){
    bossBattle = true;
    switch(tempVar){
    case(0):
        currentEnemy = kingSlime(1);
        break;
    case(1):
        currentEnemy = kingSlime(2);
        break;
    case(2):
        currentEnemy = kingSlime(3);
        break;
    case(3):
        currentEnemy = kingSlime(4);
        break;
    case(4):
        currentEnemy = kingSlime(5);
        break;
    case(5):
        currentEnemy = kingSlime(6);
        break;
    case(6):
        currentEnemy = kingSlime(7);
        break;
    case(7):
        currentEnemy = kingSlime(8);
        break;
    case(8):
        currentEnemy = Cthulhu(1);
    }
    console.log("");
    console.log(currentEnemy.enemyName + " has challenged you to mortal combat!");
    console.log("");
    enemyDifficulty = enemyDifficultyVar * 5;
};
//where you implement the enemies made - it's kinda complicated like a lot of the stuff I do lol but you guys will probably figure it out you are all smart so yeah - enemyDifficulty is only used to determine the amount of gold and exp dropped after the enemy is already chosen so that's why I change it based on how unbalanced the enemy is
var chooseEnemy = function(){
    battleDifficulty = randomInt(1,3);
    if(battleDifficulty === 3){
        battleDifficulty = 1.5;
    } else if(battleDifficulty === 2){
        battleDifficulty = 1.25;
    }
    enemyDifficulty = battleDifficulty * enemyDifficultyVar;
    if(enemyDifficulty <= 0.6){
        enemyDifficultyChoice = randomInt(1,5);
        switch(enemyDifficultyChoice){
        case(1):
        case(2):
            currentEnemy = slime(1);
            break;
        case(3):
        case(4):
            currentEnemy = skeleton(1);
            break;
        case(5):
            currentEnemy = giantSpider(1);
            enemyDifficulty += 0.2;
            break;
        case(6):
            currentEnemy = testEnemy(1);
            break;
        }
    } else if(enemyDifficulty <= 1.2){
        enemyDifficultyChoice = randomInt(1,3);
        switch(enemyDifficultyChoice){
        case(1):
            currentEnemy = giantSpider(1);
            enemyDifficulty += 0.2;
            break;
        case(2):
        case(3):
            currentEnemy = bat(2);
            enemyDifficulty += 0.1;
            break;
        }
    } else if(enemyDifficulty <= 1.8){
        enemyDifficultyChoice = randomInt(1,3);
        switch(enemyDifficultyChoice){
        case(1):
        case(2):
            currentEnemy = goblin(2);
            enemyDifficulty += 0.2;
            break;
        case(3):
            currentEnemy = giantSpider(2);
            enemyDifficulty += 0.2;
            break;
        }
    } else {
        enemyDifficultyChoice = randomInt(1,3);
        switch(enemyDifficultyChoice){
        case(1):
            currentEnemy = bat(playerLevel);
            enemyDifficulty += 0.1;
            break;
        case(2):
            currentEnemy = goblin(playerLevel);
            enemyDifficulty += 0.2;
            break;
        case(3):
            currentEnemy = kingSlime(playerLevel);
            enemyDifficulty = enemyDifficultyVar * 5;
            break;
        case(4):
            currentEnemy = giantSpider(playerLevel);
            enemyDifficulty += 0.2;
            break;
        }
    }
};

//allows you to spend a talent points based on your level when you level up on the player's max health, attack, defense, or max mana which will permanently increase those stats and help keep the player scaled with the enemies and stuff
var levelUp = function(){
    console.log("");
    console.log("Reaching a new level of experience has improved your abilities considerably. You don't even know what to do with all this power! You are able to focus this energy to boost one aspect of yourself.");
    talentPoints += roundInt(playerLevel/2);
    for(i=0; i<roundInt(playerLevel/2); i++){
    talentPoint.maxHealth = 0;
    talentPoint.attack = 0;
    talentPoint.defense = 0;
    talentPoint.maxMana = 0;
    while(talentPoint.decision){
    if(talentPoints > 0){
    console.log("");
    talentPointChoice = prompt("Where would you like to spend your talent point(s)? (Max Health, Attack, Defense, or Max Mana (health and mana are included with more max amounts of each)) You have " + talentPoints + " talent point(s) left to spend.");
    }
    switch(talentPointChoice){
        case("max health"):
        case("Max Health"):
        case("health"):
        case("Health"):
        case("1"):
            talentPoint.maxHealth = 1;
            talentPoints -= 1;
            talentPoint.decision = false;
            break;
        case("Attack"):
        case("attack"):
        case("2"):
            talentPoint.attack = 1;
            talentPoints -= 1;
            talentPoint.decision = false;
            break;
        case("Defense"):
        case("defense"):
        case("3"):
            talentPoint.defense = 1;
            talentPoints -= 1;
            talentPoint.decision = false;
            break;
        case("max mana"):
        case("Max Mana"):
        case("mana"):
        case("Mana"):
        case("4"):
            talentPoint.maxMana = 1;
            talentPoints -= 1;
            talentPoint.decision = false;
            break;
        default:
            console.log("Please choose one of the available options.");
    }
    }
    talentPoint.decision = true;
    if(talentPoint.maxHealth > 0){
    talentPoint.maxHealth = (Math.pow(playerLevel,0.5) * talentPoint.maxHealthMult * talentPoint.maxHealth);
    }
    if(talentPoint.maxHealth < 1 && talentPoint.maxHealth > 0){
        talentPoint.maxHealth = 1;
    }
    if(talentPoint.attack > 0){
    talentPoint.attack = (Math.pow(playerLevel,0.5) * talentPoint.attackMult * talentPoint.attack);
    }
    if(talentPoint.attack < 1 && talentPoint.attack > 0){
        talentPoint.attack = 1;
    }
    if(talentPoint.defense > 0){
    talentPoint.defense = (Math.pow(playerLevel,0.5) * talentPoint.defenseMult * talentPoint.defense);
    }
    if(talentPoint.defense < 1 && talentPoint.defense > 0){
        talentPoint.defense = 1;
    }
    if(talentPoint.maxMana > 0){
    talentPoint.maxMana = (Math.pow(playerLevel,0.5) * talentPoint.maxManaMult * talentPoint.maxMana);
    }
    if(talentPoint.maxMana < 1 && talentPoint.maxMana > 0){
        talentPoint.maxMana = 1;
    }
    
    statChange("player", "maxHealth", talentPoint.maxHealth);
    statChange("player", "health", talentPoint.maxHealth);
    
    statChange("player", "attack", talentPoint.attack);
    
    statChange("player", "defense", talentPoint.defense);
    
    statChange("player", "maxMana", talentPoint.maxMana);
    statChange("player", "mana", talentPoint.maxMana);
    
    console.log("");
    }
    talentPoints = 0;
};
//determines how much gold and exp the enemy will drop based on the enemyDifficulty (as I mentioned above) and a bunch of complicated math which basically just makes it balanced - will be used in the future to make the enemy drop items as well - also determines if the player leveled up
var enemyLoot = function(){
    enemyEXPdrop = roundInt(enemyDifficulty * 10);
    if(enemyEXPdrop <= 0){
        enemyEXPdrop = 1;
    }
    playerEXP += enemyEXPdrop;
    enemyGoldDrop = roundInt(enemyDifficulty * randomInt(25, 35));
    enemyGoldDrop *= roundInt(((((enemyDifficultyVar * 1.5 * 30) / enemyGoldDrop) - 1) / randomInt(1, 5)) + 1);
    if(enemyGoldDrop <= 0){
        enemyGoldDrop = 10;
    }
    playerGold += enemyGoldDrop;
    if(playerEXP >= levelEXP){
        playerLevel ++;
        playerEXP -= levelEXP;
        levelEXPvar += 5 + levelEXPvarvar;
        levelEXPvarvar ++;
        levelEXP += levelEXPvar;
        console.log(currentEnemy.enemyName + " dropped " + enemyGoldDrop + " gold and " + enemyEXPdrop + " experience. You now have " + playerGold + " gold total.");
        console.log("You leveled up! You are now level " + playerLevel + ". You have " + playerEXP + "/" + levelEXP + " experience needed to level up again.");
        levelUp();
    } else {
        console.log(currentEnemy.enemyName + " dropped " + enemyGoldDrop + " gold and " + enemyEXPdrop + " experience. You now have " + playerGold + " gold total and " + playerEXP + "/" + levelEXP + " experience needed to get to level " + (playerLevel + 1) + ".");
    }
};

//pretty simple - makes a shop where you can buy items with your gold and the items are randomly generated based on your level as mentioned above
var shop = function(){
    buyItem = true;
    currentEnemy = new Enemy(0, 0, 0, 0, 0, 0, 0, "Shop");
    console.log("");
    console.log("You encounter a friendly vendor of various items along your journey and they offer to help you, for a price of course.");
    for(i=0; i<roundInt(3+playerLevel/10); i++){
        shopItems[i] = randomItem(playerLevel);
    }
    console.log("");
    console.log("-----///----- Shop -----///-----");
    console.log("");
    console.log("You have " + playerGold + " gold to spend.");
    console.log("");
    for(i=0; i<roundInt(3+playerLevel/10); i++){
        tempItem = shopItems[i];
        console.log(i + 1 + ". " + tempItem.itemName + " - " + tempItem.itemCost + " gold");
    }
    console.log("");
    var itemChoice = prompt("Would you like to buy an item?");
    if(itemChoice === "1" || itemChoice === "yes" || itemChoice == true){
    var itemChoice = prompt("Which Item?");
    for(i = 0; i < roundInt(4+playerLevel/10); i++){
        if(itemChoice == i){
            tempItem = shopItems[itemChoice - 1];
            if(tempItem.itemName === "---Sold---"){
                console.log("");
                console.log("You already bought that item.");
            } else {
                if(playerGold >= tempItem.itemCost){
                playerGold -= tempItem.itemCost;
                console.log("You spent " + tempItem.itemCost + " gold, leaving you with " + playerGold + " gold.");
                getItem(tempItem.itemName, tempItem.itemTarget, tempItem.itemUse, tempItem.itemValue, tempItem.itemAmount, tempItem.itemCost, tempItem.itemLevel);
                shopItems[itemChoice - 1] = new item("---Sold---", 0, 0, 0, 0, 0, 0);
                } else {
                    console.log("");
                    console.log("You can not afford " + tempItem.itemName + ".");
                }
            }
        }
    }
    } else {
        console.log("You the leave the vendor and continue on your adventure.");
        console.log("");
        buyItem = false;
    }
    for(i=0; i<=100; i++){
    if(buyItem){
    console.log("");
    var itemChoice = prompt("Would you like to buy another item?");
    if(itemChoice === "1" || itemChoice === "yes" || itemChoice == true){
    console.log("-----///----- Shop -----///-----");
    console.log("");
    console.log("You have " + playerGold + " gold to spend.");
    console.log("");
    for(i=0; i<roundInt(3+playerLevel/10); i++){
        tempItem = shopItems[i];
        console.log(i + 1 + ". " + tempItem.itemName + " - " + tempItem.itemCost + " gold");
    }
    var itemChoice = prompt("Which Item?");
    for(i = 0; i < roundInt(4+playerLevel/10); i++){
        if(itemChoice == i){
            tempItem = shopItems[itemChoice - 1];
            if(tempItem.itemName === "---Sold---"){
                console.log("");
                console.log("You already bought that item.");
            } else {
                if(playerGold >= tempItem.itemCost){
                console.log("");
                playerGold -= tempItem.itemCost;
                console.log("You spent " + tempItem.itemCost + " gold, leaving you with " + playerGold + " gold.");
                getItem(tempItem.itemName, tempItem.itemTarget, tempItem.itemUse, tempItem.itemValue, tempItem.itemAmount, tempItem.itemCost, tempItem.itemLevel);
                shopItems[itemChoice - 1] = new item("---Sold---", 0, 0, 0, 0, 0, 0);
                } else {
                    console.log("");
                    console.log("You can not afford " + tempItem.itemName + ".");
                }
            }
        }
    }
    } else {
        console.log("You the leave the vendor and continue on your adventure.");
        console.log("");
        buyItem = false;
    }
    }
    }
};

//the final step - first of all chooses a class - generates the enemy (maybe a shop), runs the code to fight the enemy, loots the enemy, and repeats the process until you die
var executeDungeon = function(){
    
chooseClass();
for(i = 0; i < 100; i++){
bag[i] = empty();
}

while(playerAlive){
    
    for(i=0; i<shopSpawn.length; i++){
    if(enemyKillCounter === shopSpawn[i]){
        shop();
    }
    }
    for(i=0;i<bossBattles.length;i++){
        if(enemyKillCounter === bossBattles[i] - 1){
            chooseBoss(i);
        }
    }
    
    if(!(bossBattle)){
        chooseEnemy();
    }
    battle = true;
    
    
    executeBattle();
    
    
    if(playerAlive){
    enemyLoot();
    console.log("");
    console.log("");
    enemyDifficultyVar += 0.1;
    enemyKillCounter++;
    }
    
    }
    
};

//runs all that
executeDungeon();

//tells you how many people you killed
console.log("");
console.log("You defeated " + enemyKillCounter + " enemies total.");

};

//lets me condense the whole thing into 1 line lol XD
dungeonRPG();
