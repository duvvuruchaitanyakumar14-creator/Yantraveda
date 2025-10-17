// ===== Section toggle =====
const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('.section');

function showSection(id) {
    sections.forEach(sec => {
        if (sec.id === id) sec.classList.add('active');
        else sec.classList.remove('active');
    });
}

// Nav click events
navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        showSection(targetId);
    });
});

// Show home by default
showSection('home');



// Calculation logic for Yantras
// document.addEventListener("DOMContentLoaded", () => {
//     const locationInput = document.getElementById("locationCreate");
//     const latitudeInput = document.getElementById("latitudeCreate");
//     const yantraSelect = document.getElementById("yantraCreate");
//     const calculateBtn = document.getElementById("calculateCreate");
//     const resultsDiv = document.getElementById("resultsCreate");

//     calculateBtn.addEventListener("click", () => {
//         const location = locationInput.value || "Unknown";
//         const lat = parseFloat(latitudeInput.value);
//         const yantraType = yantraSelect.value;

//         if (isNaN(lat)) {
//             alert("Please enter a valid latitude!");
//             return;
//         }

//         let gnomonInclination = lat;
//         let dimensions = {};
//         let siteArea = 0;
//         let explanation = "";

//         switch (yantraType) {
//             case "samrat":
//                 dimensions = { gnomonHeight: Math.tan(lat * Math.PI / 180).toFixed(2), baseLength: 1 };
//                 siteArea = (1 * 1).toFixed(2);
//                 explanation = "Samrat Yantra: giant sundial; gnomon inclination equals local latitude.";
//                 break;
//             case "ram":
//                 dimensions = { radius: 1, height: 1.5 };
//                 siteArea = (Math.PI * Math.pow(1, 2)).toFixed(2);
//                 explanation = "Ram Yantra: circular walls measure altitude & azimuth.";
//                 break;
//             case "dakshinottara":
//                 dimensions = { wallHeight: 1, length: 2 };
//                 siteArea = (1 * 2).toFixed(2);
//                 explanation = "Dakshinottara Bhitti Yantra: measures meridian altitude with north-south wall.";
//                 break;
//         }

//         resultsDiv.innerHTML = `
//             <h4>${yantraType.toUpperCase()} Yantra Results</h4>
//             <p><b>Location:</b> ${location}</p>
//             <p><b>Gnomon Inclination:</b> ${gnomonInclination.toFixed(2)}°</p>
//             <p><b>Primary Dimensions:</b> ${JSON.stringify(dimensions)}</p>
//             <p><b>Site Area Requirements:</b> ${siteArea} unit²</p>
//             <p><b>Explanation:</b> ${explanation}</p>
//             <img src="assets/${yantraType}yantra.jpg" alt="${yantraType}" width="300">
//         `;
//     });
// });


document.addEventListener("DOMContentLoaded", () => {
    const locationInput = document.getElementById("locationCreate");
    const longitudeInput = document.getElementById("latitudeCreate"); // renamed in UI for your requirement
    const yantraSelect = document.getElementById("yantraCreate");
    const calculateBtn = document.getElementById("calculateCreate");
    const resultsDiv = document.getElementById("resultsCreate");
    const referenceDiv = document.getElementById("referenceImages");
    const guideDiv = document.getElementById("yantraGuide");

    const yantraData = {
        samrat: {
            mainImg: "assets/samrat_yantra.jpg",
            refs: ["assets/samrat1.png","assets/samrat2.png","assets/samrat3.png"],
            guide: `
            <h4>Simple Guide to Building a Samrat Yantra</h4>
            <p>Gnomon angle = Latitude (ϕ)</p>
            <p>Height H = Base × tan(ϕ)</p>
            <p>Site Area = (2.5 × Base)²</p>
            <table>
              <tr><th>Item</th><th>Material</th><th>Cost (INR)</th></tr>
              <tr><td>Base Foundation</td><td>Concrete slab</td><td>15,000 - 25,000</td></tr>
              <tr><td>Gnomon</td><td>Stone/Concrete</td><td>20,000 - 50,000</td></tr>
              <tr><td>Quadrant Arcs</td><td>Brick/Concrete</td><td>30,000 - 75,000</td></tr>
              <tr><td>Hour Markings</td><td>Engraved brass</td><td>10,000 - 20,000</td></tr>
              <tr><td>Labor & Tools</td><td>Skilled workers</td><td>50,000 - 1,00,000</td></tr>
            </table>
            <p>Steps: Find True North, Build Base, Build Gnomon, Build Quadrant Arcs, Add Time Markings & Test.</p>
            `
        },
        ram: {
            mainImg: "assets/ram_yantra.jpg",
            refs: ["assets/ram1.png","assets/ram2.png","assets/ram3.png"],
            guide: `
            <h4>Guide to Building Ram Yantra</h4>
            <p>Measures altitude & azimuth using circular walls.</p>
            <p>Radius = 1 + lon/180 (scale based on longitude)</p>
            <p>Height = 1.5 × cos(lat)</p>
            <p>Site Area = π × radius²</p>
            `
        }
    };

    calculateBtn.addEventListener("click", () => {
        const location = locationInput.value || "Unknown";
        const lon = parseFloat(longitudeInput.value);
        const yantraType = yantraSelect.value;

        if (isNaN(lon)) {
            alert("Please enter a valid longitude!");
            return;
        }

        let gnomonInclination = lon.toFixed(2); // display as Location label
        let dimensions = {};
        let siteArea = 0;

        switch(yantraType){
            case "samrat":
                const base = 2 + lon/90; // scale base with longitude
                const gnomonHeight = base * Math.tan(lon * Math.PI/180); // use lon as gnomon angle
                dimensions = { baseRadius: base.toFixed(2), gnomonHeight: gnomonHeight.toFixed(2) };
                siteArea = (2.5*base*2.5*base).toFixed(2);
                break;
            case "ram":
                const radius = 1 + lon/180;
                const height = (1.5 * Math.cos(lon * Math.PI/180)).toFixed(2);
                dimensions = { radius: radius.toFixed(2), height: height };
                siteArea = (Math.PI * Math.pow(radius,2)).toFixed(2);
                break;
            case "dakshinottara":
                dimensions = { wallHeight:1, length:2 };
                siteArea = (1*2).toFixed(2);
                break;
        }

        resultsDiv.innerHTML = `
            <h4>${yantraType.toUpperCase()} Yantra Results</h4>
            <p><b>Location:</b> ${location}</p>
            <p><b>Gnomon Inclination:</b> ${gnomonInclination}°</p>
            <p><b>Primary Dimensions:</b> ${JSON.stringify(dimensions)}</p>
            <p><b>Site Area Requirements:</b> ${siteArea} unit²</p>
            <img src="${yantraData[yantraType].mainImg}" alt="${yantraType}" width="300">
        `;

        referenceDiv.innerHTML = "";
        yantraData[yantraType].refs.forEach(img => {
            const el = document.createElement("img");
            el.src = img;
            referenceDiv.appendChild(el);
        });

        guideDiv.innerHTML = yantraData[yantraType].guide;
    });
});





function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(sec => sec.style.display = 'none');
    const target = document.getElementById(sectionId);
    if (target) target.style.display = 'block';
}

// Optional: wrap nav link logic in DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        const targetId = link.getAttribute('href').substring(1);
        if (document.getElementById(targetId)) {
            link.addEventListener('click', e => {
                e.preventDefault();
                showSection(targetId);
            });
        }
    });
});

