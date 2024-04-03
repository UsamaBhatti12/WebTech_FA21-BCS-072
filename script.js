
const hoverImg = document.getElementById('hover-img');
const menuItem = document.querySelector('#main-menu li:first-child');


hoverImg.addEventListener('mouseover', function() {
    
    menuItem.textContent = 'Image Hovered: ' + hoverImg.alt;
});


hoverImg.addEventListener('mouseout', function() {
    
    menuItem.textContent = 'News';
});
