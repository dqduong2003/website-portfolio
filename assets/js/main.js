/* ----- NAVIGATION BAR FUNCTION ----- */
function myMenuFunction(){
  var menuBtn = document.getElementById("myNavMenu");

  if(menuBtn.className === "nav-menu"){
    menuBtn.className += " responsive";
  } else {
    menuBtn.className = "nav-menu";
  }
}

document.getElementById('downloadCV').addEventListener('click', function() {
  var link = document.createElement('a');
  link.href = 'https://drive.google.com/uc?export=download&id=1wHlPh8bLsNwvMML_WAiOoPb5F1iALsZi'; // Replace with the actual path to your CV file
  link.download = 'QDD_resume.pdf'; // Replace with desired filename
  link.style.display = 'none'; // Hide the link
  document.body.appendChild(link);
  link.click(); // Trigger the download
  document.body.removeChild(link); // Remove the link from the DOM
});
document.getElementById('downloadCV2').addEventListener('click', function() {
  var link = document.createElement('a');
  link.href = 'https://drive.google.com/uc?export=download&id=1wHlPh8bLsNwvMML_WAiOoPb5F1iALsZi'; // Replace with the actual path to your CV file
  link.download = 'QDD_resume.pdf'; // Replace with desired filename
  link.style.display = 'none'; // Hide the link
  document.body.appendChild(link);
  link.click(); // Trigger the download
  document.body.removeChild(link); // Remove the link from the DOM
});
document.getElementById('downloadCV3').addEventListener('click', function() {
  var link = document.createElement('a');
  link.href = 'https://drive.google.com/uc?export=download&id=1wHlPh8bLsNwvMML_WAiOoPb5F1iALsZi'; // Replace with the actual path to your CV file
  link.download = 'QDD_resume.pdf'; // Replace with desired filename
  link.style.display = 'none'; // Hide the link
  document.body.appendChild(link);
  link.click(); // Trigger the download
  document.body.removeChild(link); // Remove the link from the DOM
});

/* ----- ADD SHADOW ON NAVIGATION BAR WHILE SCROLLING ----- */
window.onscroll = function() {headerShadow()};

function headerShadow() {
  const navHeader =document.getElementById("header");

  if (document.body.scrollTop > 50 || document.documentElement.scrollTop >  50) {

    navHeader.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.1)";
    navHeader.style.height = "70px";
    navHeader.style.lineHeight = "70px";

  } else {

    navHeader.style.boxShadow = "none";
    navHeader.style.height = "90px";
    navHeader.style.lineHeight = "90px";

  }
}


/* ----- TYPING EFFECT ----- */
var typingEffect = new Typed(".typedText",{
  strings : ["Software Engineer","Fullstack Developer","Data Scientist"],
  loop : true,
  typeSpeed : 100, 
  backSpeed : 80,
  backDelay : 2000
})


/* ----- ## -- SCROLL REVEAL ANIMATION -- ## ----- */
const sr = ScrollReveal({
      origin: 'top',
      distance: '80px',
      duration: 2000,
      reset: true     
})

/* -- HOME -- */
sr.reveal('.featured-text-card',{})
sr.reveal('.featured-name',{delay: 100})
sr.reveal('.featured-text-info',{delay: 200})
sr.reveal('.featured-text-btn',{delay: 200})
sr.reveal('.social_icons',{delay: 200})
sr.reveal('.featured-image',{delay: 300})


/* -- PROJECT BOX -- */
sr.reveal('.project-box',{interval: 200})

/* -- HEADINGS -- */
sr.reveal('.top-header',{})

/* ----- ## -- SCROLL REVEAL LEFT_RIGHT ANIMATION -- ## ----- */

/* -- ABOUT INFO & CONTACT INFO -- */
const srLeft = ScrollReveal({
origin: 'left',
distance: '80px',
duration: 2000,
reset: true
})

srLeft.reveal('.about-info',{delay: 100})
srLeft.reveal('.contact-info',{delay: 100})
srLeft.reveal('.education-info',{delay: 100})

/* -- ABOUT SKILLS & FORM BOX -- */
const srRight = ScrollReveal({
origin: 'right',
distance: '80px',
duration: 2000,
reset: true
})

srRight.reveal('.skills-box',{delay: 100})
srRight.reveal('.form-control',{delay: 100})

document.addEventListener('DOMContentLoaded', function() {
  const gpaElement = document.getElementById('gpa-number');
  const targetGPA = 3.7; // The target GPA value
  
  let isAnimating = false;
  
  function animateGPA() {
      let start = 0;
      let end = targetGPA;
      let duration = 2000; // Duration of the animation in ms
      let stepTime = 100; // Time between updates in ms
      let stepCount = Math.ceil(duration / stepTime);
      let stepValue = (end - start) / stepCount;
      
      function animate() {
          start += stepValue;
          if (start >= end) {
              start = end;
              gpaElement.textContent = end.toFixed(1);
              return;
          }
          gpaElement.textContent = start.toFixed(1);
          setTimeout(animate, stepTime);
      }
      animate();
  }
  
  const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              if (!isAnimating) {
                  animateGPA();
                  isAnimating = true;
              }
          } else {
              if (isAnimating) {
                  // Reset the animation
                  gpaElement.textContent = '0';
                  isAnimating = false;
              }
          }
      });
  }, { threshold: 0.5 }); // Trigger when at least 50% of the element is in view

  observer.observe(gpaElement);
});

document.addEventListener('DOMContentLoaded', () => {
  // Function to handle adding animation class when element is in view
  const handleAnimation = (entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('animate');
              // Stop observing the element once it has been animated
              observer.unobserve(entry.target);
          }
      });
  };

  // Create an intersection observer instance
  const observer = new IntersectionObserver(handleAnimation, {
      threshold: 0.1 // Adjust threshold as needed
  });

  // Select all experience containers
  const experienceContainers = document.querySelectorAll('.experience-container');

  // Observe each container
  experienceContainers.forEach(container => {
      observer.observe(container);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // Function to handle adding animation class when element is in view
  const handleAnimation2 = (entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('animate-line');
              // Stop observing the element once it has been animated
              observer.unobserve(entry.target);
          }
      });
  };

  // Create an intersection observer instance
  const observer2 = new IntersectionObserver(handleAnimation2, {
      threshold: 0.1 // Adjust threshold as needed
  });

  // Select all experience containers
  const experienceContainers2 = document.querySelectorAll('.experience-info');

  // Observe each container
  experienceContainers2.forEach(container => {
      observer2.observe(container);
  });
});


/* ----- PROJECT BOXES AND POP UP MODAL ----- */
document.addEventListener('DOMContentLoaded', () => {
  const projectBoxes = document.querySelectorAll('.project-box');
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modal-body');
  const closeBtn = document.querySelector('.close');

  const projectDetails = {
      0: {
          title: "Fine-tuning LLM to build a Machine Reading Comprehension (MRC)",
          description: `<ul>
          <li><b>Fine-tuned BERT model</b> using datasets such as COVIDQA and cpgQA to produce an MRC capable of reading
          biomedical articles and answering user queries.</li>
          <li>Utilized <b>PEFT</b> techniques, such as LoRA and QLoRA, to optimize efficiency and reduce storage costs by fine-tuning
          only a subset of the model parameters.</li>
          <li>Compared the performance of fine-tuning the base BERT models and those pre-trained with the SQuAD dataset. The
          finished model has an <b>F1 score of 59.5</b> and an <b>exact match of 27.6</b>.</li>
          </ul>`,
          // liveDemo: "https://example.com/demo1",
          sourceCode: "https://github.com/MasterGomi/T2-MRC/tree/master/DanielDang",
      },
      1: {
          title: "Automated Resolution of ML issues using ChatGPT",
          description: `<ul>
            <li>Collected and analyzed a dataset of 140 GitHub ML issues, including project names, issue URLs, and pull requests for issue resolution.</li>
            <li>Compared human solutions from repository commits with solutions generated by ChatGPT using the ChatGPT4 API, providing specific code files for prompt-based resolution.</li>
            <li>Evaluated ChatGPT’s performance and similarity to human solutions, identifying its potential as a tool for fixing ML code while emphasizing the need for human expertise in complex cases.</li>
        </ul>
        `,
          // liveDemo: "https://example.com/demo1",
          sourceCode: "https://github.com/dqduong2003/Automated-Resolution-of-ML-issues-using-ChatGPT"
      },
      2: {
          title: "Maze Search Algorithms Visualisation",
          description: `<h3>Autonomous Robot Navigation</h3>
            <p>Autonomous robots are essential in various applications such as space, transportation, industry, and defense. These robots must navigate both static and dynamic environments effectively. The main goal is to move safely and efficiently from the start point to the target position, ensuring an optimal path length while avoiding obstacles.</p>
            
            <p>The robot navigation problem involves multiple challenges including:</p>
            <ul>
                <li>Perceiving the environment</li>
                <li>Making decisions based on perceptions</li>
                <li>Controlling movements accordingly</li>
            </ul>

            <p>Key sub-problems include localization, mapping, path planning, and motion control. Various techniques have been developed for path planning, including:</p>
            <ul>
                <li>Tree-based search algorithms such as A* and Dijkstra’s algorithms</li>
                <li>Algorithms represented as trees of possible paths, guided by heuristics to reach the goal</li>
            </ul>

            <p>This report will explore and compare the following tree-based search algorithms:</p>
            <ul>
                <li>Depth-First Search (DFS)</li>
                <li>Breadth-First Search (BFS)</li>
                <li>A* Search</li>
                <li>Greedy Best First Search (GBFS)</li>
                <li>Dijkstra's Algorithm</li>
                <li>Iterative Deepening A*</li>
            </ul>`,
          // liveDemo: "https://example.com/demo2",
          sourceCode: "https://github.com/dqduong2003/Maze-Search-Algorithms-Visualisation"
      },
      3: {
          title: "Plant Disease Prediction Platform",
          description: `<ul>
          <li>Created an image classification model by training and fine-tuning VGG16 model and integrated it into the platform’s
          backend. </li>
          <li>Enabled the client to upload images and obtain prediction results with <b>98.6% accuracy</b> and detailed
          graphs.</li>
          <li>Engaged directly with the client, gathering requirements, and collaborating with team members. Provided
          leadership to drive project success and was rewarded among the <b>top 10 best projects</b></li></ul>`,
          // liveDemo: "https://example.com/demo3",
          sourceCode: "https://github.com/ANSHK310702/Research-Project"
      },
      4: {
          title: "World Energy Consumption Visualisation",
          description: `
          <p>The purpose of this visualization is to compare the consumption and production of various types of energy across the globe from 1980 to 2012.</p>
          <p>This visualization is created using <strong>D3.js</strong>.</p>

          <p>The website will let users:</p>
          <ul>
              <li>Easily compare the energy amount of each country in each year</li>
              <li>Select between different types of energy to display</li>
              <li>Select between energy production and consumption</li>
              <li>Observe each country’s fluctuation over time by the bar chart or line chart</li>
          </ul>`,
          liveDemo: "https://dqduong2003.github.io/World-Energy-Consumption-Visualisation/",
          sourceCode: "https://github.com/dqduong2003/World-Energy-Consumption-Visualisation"
      },
      5: {
          title: "PvP Chess Engine",
          description: `<h3>Features</h3>
        <ul>
            <li>Player-vs-Player</li>
            <li>Undo and Redo moves</li>
            <li>Highlight the square that the mouse hovers on</li>
            <li>Possible moves highlighting</li>
            <li>Warning when king is under possible attack</li>
            <li>User can switch between console and GUI to display the game at runtime</li>
            <li>Countdown timers</li>
            <li>Pawn promotion</li>
        </ul>
        <h3>Design Patterns</h3>
        <ol>
            <li>Factory: Used for ChessBoard to generate pieces without specifying the exact class of the pieces that will be created.</li>
            <li>Singleton: Used for PieceFactory to ensure that only one single object of this class is created.</li>     
            <li>Command: Allows for Undo and Redo actions. Commands such as Move a piece and Attack a piece are used to store actions and enable going back and forth.</li>           
            <li>Strategy: Allows switching between GUI and console methods to display the game at runtime, making the program more complex and flexible.</li>
        </ol>

        <h3>Design Principles</h3>
        <ol>
            <li>Extensible: Program can be updated to include more chess-like games, such as checkers or go, with minimal modifications.</li>
            <li>Robust: Coded to be resilient against syntax errors and other potential issues.</li>
            <li>Flexible & Modular: Game can easily switch between console and GUI based on the user's choice at runtime. It can also be displayed using various libraries.</li>
        </ol>`,
          // liveDemo: "https://example.com/demo5",
          sourceCode: "https://github.com/dqduong2003/OOP-Chess-Game"
      }
  };

  projectBoxes.forEach(box => {
    box.addEventListener('click', () => {
        const index = box.getAttribute('data-index');
        console.log(index);
        const details = projectDetails[index];
        
        // Extract the image URL from the clicked project-box
        const projectImage = box.querySelector('.project-icon').src;

        // Create the HTML for the modal content
        let modalContent = `
              <img src="${projectImage}" alt="Project Image" style="width:100%;height:auto;margin-bottom:15px;">
              <h2>${details.title}</h2>
              <div class="modal-description">${details.description}</div>
              <div class="featured-text-btn">
              ${details.liveDemo ? `<button class="btn" onclick="openInNewTab('${details.liveDemo}')">Live Demo</button>` : ''}
              <button class="btn blue-btn" onclick="openInNewTab('${details.sourceCode}')">Source Code</button>
              </div>
          `;

        modalBody.innerHTML = modalContent;
        modal.style.display = 'flex';
    });
});

  closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
      if (event.target === modal) {
          modal.style.display = 'none';
      }
  });
});


// Function to open a URL in a new tab
function openInNewTab(url) {
  window.open(url, '_blank');
}

/* ----- CHANGE ACTIVE LINK ----- */

const sections = document.querySelectorAll('section[id]')

function scrollActive() {
const scrollY = window.scrollY;

sections.forEach(current =>{
  const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 50,
    sectionId = current.getAttribute('id')

  if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) { 

      document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active-link')

  }  else {

    document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active-link')

  }
})
}

function sendMail() {
  console.log("clicked")
  let parms = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value
  }

  emailjs.send('service_915rmqo', 'template_mhmmii9', parms)
    .then(function(response) {
      console.log('SUCCESS!', response.status, response.text);
      alert('Message sent successfully!');
    }, function(error) {
      console.log('FAILED...', error);
      alert('Failed to send message!');
    });
}

window.addEventListener('scroll', scrollActive)