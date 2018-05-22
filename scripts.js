const root = document.getElementsByTagName('html')[0];
function lockview(){
    root.classList.add('noscroll');
};
function unlockview(){
    root.classList.remove('noscroll');
};

var anchors = document.querySelectorAll('.gallery ul li a');
var images = document.querySelectorAll('.gallery ul img');
const overlay = document.querySelector('.gallery__overlay');
const frame = document.querySelector('.gallery__overlay-frame img');
const nextbutton = document.querySelector('.gallery__next');
const prevbutton = document.querySelector('.gallery__prev');
const close = document.querySelector('.gallery__close');
var imageslength = images.length - 1;
var currentimageindex;
var currentimage;
var src;

function overlayopen(){
    overlay.classList.remove('gallery__overlay--invisible');
    overlay.classList.add('gallery__overlay--visible');
    lockview();
};
function overlayclose(){
    overlay.classList.add('gallery__overlay--invisible');
    overlay.classList.remove('gallery__overlay--visible');
    root.classList.remove('noscroll');
    unlockview();
};

// get rid of anchor default function
anchors.forEach(function (e) {
    e.addEventListener('click', function (event) {
        event.preventDefault()
    });
})

images.forEach(function (image, index) {
    // click image to open it
    image.addEventListener('click', function () {
        src = image.getAttribute('src');
        overlayopen();
        frame.setAttribute('src', src);
        // next image
        currentimageindex = index;
    });
    // Focus functionality
    let listitem = image.closest('.gallery-li');
    console.log(listitem);
    listitem.addEventListener('focus',function(){
        document.addEventListener('keypress',function(k){
            if (k.key === "Enter"){
                src = image.getAttribute('src');
                overlayopen();
                frame.setAttribute('src', src);
                // next image
                currentimageindex = index;
            };
        });
    });
});

function applynewindex(i) {
    currentimage = images[i];
    src = currentimage.getAttribute('src');
    frame.setAttribute('src', src);
};

function nextaction(){
    function next(){
        currentimageindex++;
        applynewindex(currentimageindex);
    };
    function reset(){
        currentimageindex = 0;
        applynewindex(currentimageindex);
    };
    if ( currentimageindex === imageslength){
        reset();
    } else {
        next();
    };
};


function prevaction(){
    function prev(){
        currentimageindex--;
        applynewindex(currentimageindex);
    };
    function reset(){
        currentimageindex = imageslength;
        applynewindex(currentimageindex);
    };
    if ( currentimageindex === 0){
        reset();
    } else {
        prev();
    };
};


nextbutton.addEventListener('click', nextaction );
prevbutton.addEventListener('click', prevaction );


// Arrow keys
document.addEventListener('keydown',function(i){
    if ( i.keyCode == 39 ){
        nextaction();
    } else if ( i.keyCode == 37 ){
        prevaction();
    };
});


close.addEventListener('click',function(){
    overlayclose();
});

document.addEventListener('keydown',function(i){
    if ( i.keyCode == 27 ){
        overlayclose();
    };
});