function ClassSkill(skillName, skillDescription, skillType,
    skillBaseDamage, skillBaseCost) {
        this.skillName = skillName;
        this.skillDescription = skillDescription;
        this.skillType = skillType;
        this.skillBaseDamage = skillBaseDamage;
        this.skillBaseCost = skillBaseCost;
};

function Class(className, classDescription, classSkillList) {
    this.className = className;
    this.classDescription = classDescription;
    this.classSkillList = classSkillList;
};

/*
    The main classes will be:
    - Mage
    - Warrior
    - Tank
    - Priest
    - Thief
*/

const mageDescription = "The Mage excels in magic.";
const warriorDescription = "The Warrior excels in physical damage.";
const tankDescription = "The Tank excels in defence.";
const priestDescription = "The Priest excels in holy damage.";
const thiefDescription = "The Thief excels in speed and agility.";
    
const mageSkills = new ClassSkill('Fireball', 'Hurl a fireball at a foe', 'Active', 1, 1);
    
let Mage = new Class('Mage', mageDescription, [mageSkills]);
Mage.classSkillList.push(new ClassSkill('Watergun', 'Throw water at a foe', 'Active', 1, 1));
Mage.classSkillList.push(new ClassSkill('Grassknot', 'Throw leaves at a foe', 'Active', 1, 1));
Mage.classSkillList.push(new ClassSkill('Hellfire', 'Rain fire upon your foes', 'Active', 10, 10));

let Warrior = new Class('Warrior', warriorDescription, []);
Warrior.classSkillList.push(new ClassSkill('Battle Furry', 'Increase damage when you have low health', 'Passive', 0, 0));

const availableClasses = [Mage, Warrior];

function createClassDiv(currentClass) {
    const parentDiv = document.getElementById("ClassView"); // Parent is ClassView
    const newCard = document.createElement("button"); // The class "Card"
    newCard.onclick = function(){window.location.href = 'class.html?class='+ currentClass.className} // OnClick transfer to selected Class page
    newCard.classList.add("ClassContainer"); // Define Card Class

    // Card Children:
    // Class Name:
    const paragraphName = document.createElement("p");
    paragraphName.id = "ClassName";
    const className = document.createTextNode(currentClass.className);
    paragraphName.appendChild(className);

    // Class Description
    const paragraphDescription = document.createElement("p");
    paragraphDescription.id = "ClassDescription";
    const classDescription = document.createTextNode(currentClass.classDescription);
    paragraphDescription.appendChild(classDescription);

    // Insert Children into Card
    newCard.appendChild(paragraphName);
    newCard.appendChild(paragraphDescription);
    // Insert Card into ClassView Container
    parentDiv.appendChild(newCard);
}

function loadClasses() { // Load the Cards
    for (var c in availableClasses) {
        createClassDiv(availableClasses[c]);
    }
}

function createSkillDiv(selectedClass) {
    const skillList = selectedClass.classSkillList;
    const details = document.createElement("div");
    details.id = "SkillsContainer";
    for (let skill in skillList) {
        const div = document.createElement("div"); // Create the Skill Div
        div.id = "Skill"; // Skill ID

        // First we will add the skill name:
        const skillNamePar = document.createElement("p"); // Skill Name Paragraph
        skillNamePar.id = "SkillName"; // Paragraph ID
        const skillName = document.createTextNode('Skill: ' + skillList[skill].skillName); // Skill Name
        skillNamePar.appendChild(skillName); // Name paragraph complete
        div.appendChild(skillNamePar); // Add Paragraph to Div

        // Next we will add the skill description:
        const skillDescriptionPar = document.createElement("p"); // Skill Descr Paragraph
        skillDescriptionPar.id = "SkillDescription"; // Paragraph ID
        const skillDescription = document.createTextNode('Description: ' + skillList[skill].skillDescription); // Skill Descr
        skillDescriptionPar.appendChild(skillDescription); // Added Description
        div.appendChild(skillDescriptionPar); // Add Paragraph to Div

        // Next the Skill Type:
        const skillTypePar = document.createElement("p"); // Skill Type Paragraph
        skillTypePar.id = "SkillType"; // Paragraph ID
        const skillType = document.createTextNode('Type: ' + skillList[skill].skillType); // Skill Type
        skillTypePar.appendChild(skillType); // Added Type
        div.appendChild(skillTypePar); // Add Paragraph to Div

        // Next the Base Damage:
        const skillBaseDamagePar = document.createElement("p"); // Skill Type Paragraph
        skillBaseDamagePar.id = "SkillBaseDamage"; // Paragraph ID
        const skillBaseDamage = document.createTextNode('Damage at Lvl 1: ' + skillList[skill].skillBaseDamage); // Skill Base Damage
        skillBaseDamagePar.appendChild(skillBaseDamage); // Added Base Damage
        div.appendChild(skillBaseDamagePar); // Add Paragraph to Div

        //Next the Mana Cost
        const skillBaseCostPar = document.createElement("p"); // Skill Base Cost Paragraph
        skillBaseCostPar.id = "SkillBaseCost"; // Paragraph ID
        const skillBaseCost = document.createTextNode('Mana Cost at Lvl 1: ' + skillList[skill].skillBaseCost); // Base Cost
        skillBaseCostPar.appendChild(skillBaseCost); // Added Base Cost
        div.appendChild(skillBaseCostPar); // Add Paragraph to Div

        // Add the skill to the container:
        details.appendChild(div);
    }
    return details;
}

function classDetails(selectedClass) {
    createClassDiv(selectedClass);
    const skillDiv = createSkillDiv(selectedClass);
    const classDiv = document.getElementById('ClassView');
    classDiv.appendChild(skillDiv);
}

function classSpecific() {
    var foo = window.location.search.substring(1).split("=")[1];
    console.log(foo);
    if (foo === 'Mage') classDetails(Mage);
    else classDetails(Warrior);
}