const textContainer = document.getElementById('animatedText');
var text = textContainer.innerText;
var newHTML = '';

for (let i = 0; i < text.length; i++) {
    let delay = i * 0.1;
    newHTML += `<span style="animation-delay: ${delay}s;">${text[i]}</span>`;
}

textContainer.innerHTML = newHTML;

document.addEventListener('DOMContentLoaded', function() {
    const cardInner = document.querySelector('.flip-card-inner');
    const frontContent = document.querySelector('.front-content').innerHTML;
    const frontCard = document.querySelector('.flip-card-front');
    const backCard = document.querySelector('.flip-card-back');
    let isFrontVisible = true;

    frontCard.innerHTML = frontContent;

    function flipCard() {
        cardInner.classList.toggle('flipped');
        isFrontVisible = !isFrontVisible;

        // Ensure both sides are displayed during the flip
        frontCard.style.display = "block";
        backCard.style.display = "block";

        // Set display:none to the hidden face after the transition ends
        cardInner.addEventListener('transitionend', handleTransitionEnd, { once: true });
    }

    function handleTransitionEnd() {
        if (isFrontVisible) {
            backCard.style.display = "none";
        } else {
            frontCard.style.display = "none";
        }
    }

    async function updateCardContent(htmlContent, prepareForFront) {
        const contentArea = prepareForFront ? frontCard : backCard;
        contentArea.innerHTML = htmlContent;
        attachLinkListeners(contentArea);
    }

    function handleProjectLinkChange(event) {
        event.preventDefault();
        const target = event.target.closest('.project-link'); // Ensure we get the parent <a> element
        if (!target) return;
    
        const projectId = target.getAttribute('data-project');
        const contentToShow = document.getElementById(projectId + '-content');
    
        if (!contentToShow) {
            console.error('Content for ' + projectId + ' not found');
            return;
        }
    
        updateCardContent(contentToShow.innerHTML, !isFrontVisible);
        flipCard();
        setLineHeight();
    }
    
    function handleNameClick(event) {
        event.preventDefault();
        const contentToShow = document.querySelector('.front-content');

        if (!contentToShow) {
            console.error('Front content not found');
            return;
        }

        updateCardContent(contentToShow.innerHTML, !isFrontVisible);
        flipCard();
    }

    function attachLinkListeners(context) {
        context.querySelectorAll('.project-link').forEach(link => {
            link.addEventListener('click', handleProjectLinkChange);
        });
        context.querySelectorAll('.my-name').forEach(nameBarElement => {
            nameBarElement.addEventListener('click', handleNameClick);
        });
    }

    function setLineHeight() {
        var component1 = document.querySelector(".school1");
        var component2 = document.querySelector(".school2");
        var bulletPointElement = document.querySelector(".bullet-point1");
        var margin = (component1.offsetHeight / 2) - 45;
        bulletPointElement.style.marginTop = margin + "px";

        var lineElement = document.querySelector(".line1");
        lineElement.style.height = ((component1.offsetHeight / 2) + (component2.offsetHeight / 2)) + "px";
        
        component2 = document.querySelector(".school2");
        var component3 = document.querySelector(".school3");
        lineElement = document.querySelector(".line2");
        lineElement.style.height = ((component2.offsetHeight / 2) + (component3.offsetHeight / 2)) + "px";
    }

    window.onload = setLineHeight;
    window.onresize = setLineHeight;

    attachLinkListeners(document);
});
