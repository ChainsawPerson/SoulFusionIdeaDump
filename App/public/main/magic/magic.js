function SecondaryMagic(secondaryMagicName, secondaryMagicDescription, secondaryMagicType,
    secondaryMagicBaseDamage, secondaryMagicBaseCost) {
        this.secondaryMagicName = secondaryMagicName;
        this.secondaryMagicDescription = secondaryMagicDescription;
};

function PrimaryMagic(primaryMagicName, primaryMagicDescription, secondaryMagicList) {
    this.primaryMagicName = primaryMagicName;
    this.primaryMagicDescription = primaryMagicDescription;
    this.secondaryMagicList = secondaryMagicList;
};

function createPrimaryMagicDiv(currentPrimaryMagic) {
    const parentDiv = document.getElementById("MagicView"); // Parent is MagicView
    const newCard = document.createElement("button"); // The primaryMagic "Card"
    newCard.onclick = function(){window.location.href = `/SoulFusion/Magic/${currentPrimaryMagic.primaryMagicName}`;} // OnClick transfer to selected PrimaryMagic page
    newCard.classList.add("PrimaryMagicContainer"); // Define Card PrimaryMagic

    // Card Children:
    // Primary Magic Name:
    const paragraphName = document.createElement("p");
    paragraphName.id = "primaryMagicName";
    const primaryMagicName = document.createTextNode(currentPrimaryMagic.primaryMagicName);
    paragraphName.appendChild(primaryMagicName);

    // PrimaryMagic Description
    const paragraphDescription = document.createElement("p");
    paragraphDescription.id = "primaryMagicDescription";
    const primaryMagicDescription = document.createTextNode(currentPrimaryMagic.primaryMagicDescription);
    paragraphDescription.appendChild(primaryMagicDescription);

    // Insert Children into Card
    newCard.appendChild(paragraphName);
    newCard.appendChild(paragraphDescription);
    // Insert Card into MagicView Container
    parentDiv.appendChild(newCard);
}

function loadMagic() { // Load the Cards
    var availableMagic = [];

    fetch('getPrimaryMagic', {
        method: "GET"
    }).then((response) => {
        return response.json()
    }).then((data) => {
        let magic = data;
        console.log(magic[0]);
        magic.map(function(getPrimaryMagic){
            availableMagic.push(new PrimaryMagic(
                getPrimaryMagic.primaryMagicName,
                getPrimaryMagic.primaryMagicDescription,
                getPrimaryMagic.primaryMagicSecondaryMagic
            ));
        });

        for (var pm in availableMagic) {

            createPrimaryMagicDiv(availableMagic[pm]);
        }
    });
}

function createSecondaryMagicDiv(selectedPrimaryMagic) {
    const secondaryMagicList = selectedPrimaryMagic.secondaryMagicList;
    const details = document.createElement("div");
    details.id = "SecondaryMagicContainer";
    for (let secondaryMagic in secondaryMagicList) {
        const div = document.createElement("div"); // Create the SecondaryMagic Div
        div.id = "SecondaryMagic"; // SecondaryMagic ID

        // First we will add the secondaryMagic name:
        const secondaryMagicNamePar = document.createElement("p"); // SecondaryMagic Name Paragraph
        secondaryMagicNamePar.id = "SecondaryMagicName"; // Paragraph ID
        const secondaryMagicName = document.createTextNode(secondaryMagicList[secondaryMagic].secondaryMagicName); // SecondaryMagic Name
        secondaryMagicNamePar.appendChild(secondaryMagicName); // Name paragraph complete
        div.appendChild(secondaryMagicNamePar); // Add Paragraph to Div

        // Next we will add the secondaryMagic description:
        const secondaryMagicDescriptionPar = document.createElement("p"); // SecondaryMagic Descr Paragraph
        secondaryMagicDescriptionPar.id = "SecondaryMagicDescription"; // Paragraph ID
        const secondaryMagicDescription = document.createTextNode('Description: ' + secondaryMagicList[secondaryMagic].secondaryMagicDescription); // SecondaryMagic Descr
        secondaryMagicDescriptionPar.appendChild(secondaryMagicDescription); // Added Description
        div.appendChild(secondaryMagicDescriptionPar); // Add Paragraph to Div

        // Add the secondaryMagic to the container:
        details.appendChild(div);
    }
    return details;
}

function primaryMagicDetails(selectedPrimaryMagic) {
    createPrimaryMagicDiv(selectedPrimaryMagic);
    const secondaryMagicDiv = createSecondaryMagicDiv(selectedPrimaryMagic);
    const primaryMagicDiv = document.getElementById('MagicView');
    primaryMagicDiv.appendChild(secondaryMagicDiv);
}

function primaryMagicSpecific() {
    const parts = window.location.href.split('/');
    const foo = lastSegment = parts.pop() || parts.pop();
    console.log(foo);
    fetch(`../getPrimaryMagic/${foo}`, {
        method: "GET",
        
    }).then((response) => {
        return response.json()
    }).then((data) => {
        let getPrimaryMagic = data[0];
        var secondaryMagicList = [];
        for (var secondaryMagic in getPrimaryMagic.secondaryMagicList) {
            secondaryMagicList.push(new SecondaryMagic(
                getPrimaryMagic.secondaryMagicList[secondaryMagic].secondaryMagicName,
                getPrimaryMagic.secondaryMagicList[secondaryMagic].secondaryMagicDescription,
            ));
        }
        primaryMagicDetails(new PrimaryMagic(
                getPrimaryMagic.primaryMagicName,
                getPrimaryMagic.primaryMagicDescription,
                secondaryMagicList
            ))
    });
}

function magicSuggestion() {
    const original = window.location.origin;
    window.open(`${original}/SoulFusion/MagicForm`);
}