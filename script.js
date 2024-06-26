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

        frontCard.style.display = "block";
        backCard.style.display = "block";

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
        const target = event.target.closest('.project-link');
        const projectId = target.getAttribute('data-project');
        const contentToShow = document.getElementById(projectId + '-content');
        updateCardContent(contentToShow.innerHTML, !isFrontVisible);
        flipCard();
    }
    
    function handleNameClick(event) {
        event.preventDefault();
        const contentToShow = document.querySelector('.front-content');
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
    
    attachLinkListeners(document);
});
