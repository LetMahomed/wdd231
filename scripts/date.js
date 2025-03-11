document.addEventListener("DOMContentLoaded", function () {
    const courseLinks = document.querySelectorAll(".links a");
    const courseItems = document.querySelectorAll(".more-links a");
    const nav = document.querySelector("nav");
    const menuButton = document.createElement("button");
    const menuList = document.createElement("ul");
    
    menuButton.textContent = "☰ Menu";
    menuButton.classList.add("menu-button");
    menuList.classList.add("menu-list");
    
    const menuItems = [
        { text: "Home", href: "index.html" },
        { text: "Chamber", href: "#page2" },
        { text: "GitHub Profile", href: "https://github.com/LetMahomed" },
        { text: "LinkedIn", href: "#page4" }
    ];
    
    menuItems.forEach(item => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.textContent = item.text;
        a.href = item.href;
        li.appendChild(a);
        menuList.appendChild(li);
    });
    
    nav.innerHTML = ""; 
    nav.appendChild(menuButton);
    nav.appendChild(menuList);
    
    menuButton.addEventListener("click", function () {
        menuList.classList.toggle("open");
    });
    
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            menuButton.style.display = "block";
            menuList.style.display = "none";
        } else {
            menuButton.style.display = "none";
            menuList.style.display = "flex";
            menuList.classList.add("menu-center");
        }
    }
    
    window.addEventListener("resize", checkScreenSize);
    checkScreenSize();
    
    courseLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const category = this.textContent.trim();
            
            courseItems.forEach(course => {
                if (category === "All") {
                    course.style.display = "inline-block";
                } else if (course.textContent.includes(category)) {
                    course.style.display = "inline-block";
                } else {
                    course.style.display = "none";
                }
            });
        });
    });

    
    const courseData = {
        "CSE 110": { credits: 3, taken: true },
        "WDD 130": { credits: 3, taken: false },
        "CSE 111": { credits: 4, taken: true },
        "CSE 210": { credits: 3, taken: false },
        "WDD 131": { credits: 3, taken: true },
        "WDD 231": { credits: 3, taken: false }
    };
    
    courseItems.forEach(course => {
        const courseName = course.textContent.trim();
        if (courseData[courseName]) {
            course.textContent += ` (${courseData[courseName].credits} credits, ${courseData[courseName].taken ? "Taken" : "Not Taken"})`;
        }
    });

});
