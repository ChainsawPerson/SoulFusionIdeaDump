function showForm() {
    const skillForm = document.getElementById('suggestSkill');
    const button = document.getElementById('addSkill');
    if (skillForm.hidden) {
        button.innerText = 'Just Class';
        createSkillForm(1);
        createSkillForm(2);
    } else {
        button.innerText = 'Add Skills';
        document.getElementById('suggestSkill').replaceChildren();
    }
    skillForm.hidden = !skillForm.hidden;
}

function getSkillData(skillNo) {
    const skillCard = document.getElementById(`suggestSkillCard${skillNo}`);

    const skillSuggestion = {
        "skillSuggestion": {
            "skillName": "",
            "skillDescription": "",
            "skillNotes": ""
        }
    }

    if (skillCard) {
        const children = skillCard.children;

        for (var i = 0; i < children.length; i++) {
            if (children[i].id === 'skillName') { skillSuggestion.skillSuggestion.skillName = children[i].value; }
            else if (children[i].id === 'skillDescription') { skillSuggestion.skillSuggestion.skillDescription = children[i].value; }
            else if (children[i].id === 'skillNotes') { skillSuggestion.skillSuggestion.skillNotes = children[i].value; }
            else continue;
        }
    }
    return skillSuggestion;
}

function getData() {
    const classSuggestion = {
        "classSuggestion": {
            "className": document.getElementById('className').value,
            "classDescription": document.getElementById('classDescription').value,
            "classNotes": document.getElementById('classNotes').value,
            "classSkillList": [
                getSkillData(1),
                getSkillData(2),
            ]
        },
        "creatorName": document.getElementById('creatorName').value || "anonymous"
    };
    if (!(classSuggestion.classSuggestion.className === "")) {
        fetch(`./suggestClass`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(classSuggestion)
        });
    } else {
        alert('Request failed: No Class Specified');
    }
    location.reload();
}

function createSkillForm(skillNo) {
    const hiddenDiv = document.getElementById('suggestSkill'); // Parent Div
    const parentDiv = document.createElement('div'); // Parent Div
    parentDiv.id = `suggestSkillCard${skillNo}`;
    parentDiv.setAttribute('class', 'suggestSkillCard');

    // Skill Name Field
    const skillNameLabel = document.createElement('label');
    const skillName = document.createTextNode('Skill Name:');
    const skillNameInput = document.createElement('input');
    skillNameLabel.appendChild(skillName);
    skillNameInput.id = 'skillName';
    skillNameInput.name = 'skillName';
    skillNameLabel.setAttribute('for', 'skillName');
    parentDiv.appendChild(skillNameLabel);
    parentDiv.appendChild(document.createElement('br'));
    parentDiv.appendChild(skillNameInput);
    parentDiv.appendChild(document.createElement('br'));
    // Skill Description Field
    const skillDescriptionLabel = document.createElement('label');
    const skillDescription = document.createTextNode('Skill Description:');
    const skillDescriptionInput = document.createElement('textarea');
    skillDescriptionLabel.appendChild(skillDescription);
    skillDescriptionInput.id = 'skillDescription';
    skillDescriptionInput.name = 'skillDescription';
    skillDescriptionLabel.setAttribute('for', 'skillDescription');
    parentDiv.appendChild(skillDescriptionLabel);
    parentDiv.appendChild(document.createElement('br'));
    parentDiv.appendChild(skillDescriptionInput);
    parentDiv.appendChild(document.createElement('br'));
    // Skill Notes Field
    const skillNotesLabel = document.createElement('label');
    const skillNotes = document.createTextNode('Notes:');
    const skillNotesInput = document.createElement('textarea');
    skillNotesLabel.appendChild(skillNotes);
    skillNotesInput.id = 'skillNotes';
    skillNotesInput.name = 'skillNotes';
    skillNotesLabel.setAttribute('for', 'skillNotes');
    parentDiv.appendChild(skillNotesLabel);
    parentDiv.appendChild(document.createElement('br'));
    parentDiv.appendChild(skillNotesInput);
    parentDiv.appendChild(document.createElement('br'));

    hiddenDiv.appendChild(parentDiv);
}