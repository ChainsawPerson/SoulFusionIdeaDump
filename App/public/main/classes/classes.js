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

function createClassDiv(currentClass) {
    const parentDiv = document.getElementById("ClassView"); // Parent is ClassView
    const newCard = document.createElement("button"); // The class "Card"
    newCard.onclick = function(){window.location.replace(`/SoulFusion/Classes/${currentClass.className}`);} // OnClick transfer to selected Class page
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
    var availableClasses = [];

    fetch('getClasses', {
        method: "GET"
    }).then((response) => {
        return response.json()
    }).then((data) => {
        let classes = data;
        console.log(classes[0]);
        classes.map(function(getClass){
            availableClasses.push(new Class(
                getClass.className,
                getClass.classDescription,
                getClass.classSkill
            ));
        });

        for (var c in availableClasses) {
            createClassDiv(availableClasses[c]);
        }
    });
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
    const parts = window.location.href.split('/');
    const foo = lastSegment = parts.pop() || parts.pop();
    console.log(foo);
    fetch(`../getClasses/${foo}`, {
        method: "GET",
        
    }).then((response) => {
        return response.json()
    }).then((data) => {
        let getClass = data[0];
        var skillList = [];
        for (var skill in getClass.classSkillList) {
            skillList.push(new ClassSkill(
                getClass.classSkillList[skill].skillName,
                getClass.classSkillList[skill].skillDescription,
                getClass.classSkillList[skill].skillType,
                getClass.classSkillList[skill].skillBaseDamage,
                getClass.classSkillList[skill].skillBaseCost
            ));
        }
        classDetails(new Class(
                getClass.className,
                getClass.classDescription,
                skillList
            ))
    });
}

function createClassSuggestion(suggestion) {
    fetch('../suggestClass',{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        body: JSON.stringify(suggestion)
    });
}