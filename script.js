// Wait for the web page to fully load before running the code
document.addEventListener("DOMContentLoaded", function() {

    /* ==================================================
       1. Typewriter Effect
       ================================================== */
    let typewriterElement = document.getElementById("typewriter");
    let texts = ["Learn about cyber threats.", "Secure your digital world.", "Stay safe online."];
    let textIndex = 0;
    let charIndex = 0;

    function typeWriter() {
        // Get the current sentence we are supposed to type
        let currentText = texts[textIndex];
        
        // Show the sentence up to the current character index
        typewriterElement.textContent = currentText.substring(0, charIndex);
        charIndex++;

        // If the whole sentence is successfully typed out
        if (charIndex > currentText.length) {
            
            // Wait for 2 seconds, then reset and go to the next sentence
            setTimeout(function() {
                charIndex = 0;
                textIndex++;
                
                // If we reach the end of our text list, go back to the first sentence
                if (textIndex >= texts.length) {
                    textIndex = 0;
                }
                
                typeWriter(); // Start typing the next sentence
            }, 2000);
            
        } else {
            // Wait 100 milliseconds, then type the next character
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start the typewriter effect
    if (typewriterElement) {
        typeWriter();
    }


    /* ==================================================
       2. Matrix Hacker Background Animation
       ================================================== */
    let canvas = document.getElementById('matrixCanvas');
    if (canvas) {
        let ctx = canvas.getContext('2d');
        
        // Make the canvas take up the full screen
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let letters = '01'.split(''); // The characters that will fall
        let fontSize = 16;
        let columns = canvas.width / fontSize; // Figure out how many columns can fit
        
        // Setup an array to track the Y position (drop) of each falling column
        let drops = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }

        function drawMatrix() {
            // Draw a semi-transparent black square over everything to create a trail effect
            ctx.fillStyle = 'rgba(5, 8, 16, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Set the color and font for the falling letters
            ctx.fillStyle = '#00ff66'; // Neon Green color
            ctx.font = fontSize + 'px monospace';

            // Loop through each column
            for (let i = 0; i < drops.length; i++) {
                // Pick a random 0 or 1
                let text = letters[Math.floor(Math.random() * letters.length)];
                
                // Draw the text on the screen at this column's specific drop height
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                // If the drop is off the bottom of the screen, randomly reset it to the top
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                
                // Move the drop down 1 step for the next time it draws
                drops[i]++;
            }
        }

        // Run the drawMatrix drawing code 35 times a second
        setInterval(drawMatrix, 35);
    }


    /* ==================================================
       3. Scroll Reveal Animations (Fade elements in)
       ================================================== */
    let reveals = document.querySelectorAll('.reveal');

    function revealElements() {
        let windowHeight = window.innerHeight;
        
        // Loop through all elements that have the "reveal" class
        for (let i = 0; i < reveals.length; i++) {
            // Get how far the element is from the top of the browser window
            let elementTop = reveals[i].getBoundingClientRect().top;
            let triggerPoint = 100; // Give it 100px before showing

            // If the element is on the screen, add the "active" class to fade it in
            if (elementTop < windowHeight - triggerPoint) {
                reveals[i].classList.add('active');
            }
        }
    }

    // Check for elements when the user scrolls the page
    window.addEventListener('scroll', revealElements);
    revealElements(); // Run once right away when page loads


    /* ==================================================
       4. Animated Statistics Counters
       ================================================== */
    let counters = document.querySelectorAll('.counter');
    let hasAnimated = false; // A flag to make sure it only plays exactly once

    function startCounters() {
        if (hasAnimated) return; // Stop if it's already finished animating
        
        let statsSection = document.getElementById('stats');
        if (!statsSection) return;

        let sectionPosition = statsSection.getBoundingClientRect().top;
        
        // Check if the statistics section is visible on screen
        if (sectionPosition < window.innerHeight - 100) {
            hasAnimated = true; // Mark as done so it doesn't replay backwards
            
            // Loop over every single counter box
            for (let i = 0; i < counters.length; i++) {
                let counter = counters[i];
                let targetNumber = parseInt(counter.getAttribute('data-target')); 
                let currentNumber = 0;
                let step = Math.ceil(targetNumber / 100); // Calculate a clean chunk to add smoothly

                // Setup a timer to add progress to the number every 20 milliseconds
                let timer = setInterval(function() {
                    currentNumber = currentNumber + step;
                    
                    if (currentNumber >= targetNumber) {
                        counter.innerText = targetNumber; // End cleanly on the target number
                        clearInterval(timer); // Turn off the timer loop
                    } else {
                        counter.innerText = currentNumber;
                    }
                }, 20);
            }
        }
    }

    // Check counters whenever the user scrolls
    window.addEventListener('scroll', startCounters);


    /* ==================================================
       5. FAQ Accordion (Open and close questions)
       ================================================== */
    let questions = document.querySelectorAll('.faq-question');
    
    // Apply logic to every question box
    for (let i = 0; i < questions.length; i++) {
        questions[i].addEventListener('click', function() {
            // Find the exact answer box that is directly below the clicked question
            let answer = this.nextElementSibling;
            
            // Toggle the 'active' CSS class to flip the arrow icon
            this.classList.toggle('active');
            
            // If the answer is already open (maxHeight exists), close it!
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
                this.setAttribute('aria-expanded', 'false'); // Accessibility
            } 
            // If the answer is closed, open it!
            else {
                // "scrollHeight" naturally finds the exact pixel height the answer takes up
                answer.style.maxHeight = answer.scrollHeight + "px";
                this.setAttribute('aria-expanded', 'true'); // Accessibility
            }
        });
    }


    /* ==================================================
       6. Navbar & Mobile Menu Features
       ================================================== */
    let navbar = document.getElementById('navbar');
    
    // Change navbar color when scrolling down past the very top
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(5, 8, 16, 0.95)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(5, 8, 16, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Mobile Hamburger button
    let hamburger = document.querySelector('.hamburger');
    let navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        // Adds/Removes the 'active' class on mobile which slides it in and out
        navLinks.classList.toggle('active');
    });

    // Automatically close the mobile menu whenever a menu link is tapped
    let links = document.querySelectorAll('.nav-links li a');
    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    }

    /* ==================================================
       7. Dummy Contact Form Logic
       ================================================== */
    let contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Stop the page from normally refreshing
            
            let button = contactForm.querySelector('button');
            
            // Show a success message inside the button
            button.innerHTML = '<span>Message Sent!</span> <i class="fa-solid fa-check"></i>';
            button.style.borderColor = '#00ff66';
            button.style.color = '#00ff66';
            
            // Instantly clear out the form input text
            contactForm.reset();
        });
    }
});
