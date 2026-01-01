// ==========================================
// 1. DATA & CONFIGURATION
// ==========================================
const cityData = {
    "Andaman and Nicobar Islands": ["Port Blair", "Nicobar", "North and Middle Andaman", "South Andaman"],
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Anantapur", "Chittoor", "East Godavari", "West Godavari", "Kadapa", "Krishna", "Prakasam", "Srikakulam", "Vizianagaram"],
    "Arunachal Pradesh": ["Itanagar", "Tawang", "West Kameng", "East Kameng", "Papum Pare", "Kurung Kumey", "Kra Daadi", "Lower Subansiri", "Upper Subansiri", "West Siang", "East Siang", "Siang", "Upper Siang", "Lower Siang", "Lower Dibang Valley", "Upper Dibang Valley", "Anjaw", "Lohit", "Namsai", "Changlang", "Tirap", "Longding"],
    "Assam": ["Guwahati", "Dibrugarh", "Silchar", "Jorhat", "Nagaon", "Tinsukia", "Tezpur", "Barpeta", "Bongaigaon", "Dhubri", "Goalpara", "Golaghat", "Hailakandi", "Karimganj", "Lakhimpur", "Majuli", "Morigaon", "Sivasagar", "Sonitpur"],
    "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia", "Darbhanga", "Arrah", "Begusarai", "Katihar", "Munger", "Chapra", "Nalanda", "Saharsa", "Sasaram", "Hajipur", "Siwan", "Motihari", "Bettiah"],
    "Chandigarh": ["Chandigarh"],
    "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba", "Rajnandgaon", "Jagdalpur", "Ambikapur", "Dhamtari", "Durg", "Mahasamund", "Raigarh"],
    "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Diu", "Silvassa"],
    "Delhi": ["New Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi", "Central Delhi", "North East Delhi", "North West Delhi", "South East Delhi", "South West Delhi", "Shahdara"],
    "Goa": ["North Goa", "South Goa", "Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Gandhinagar", "Junagadh", "Anand", "Navsari", "Morbi", "Bharuch", "Valsad", "Porbandar", "Mehsana"],
    "Haryana": ["Faridabad", "Gurugram", "Panipat", "Ambala", "Yamunanagar", "Rohtak", "Hisar", "Karnal", "Sonipat", "Panchkula", "Bhiwani", "Sirsa", "Jind", "Rewari"],
    "Himachal Pradesh": ["Shimla", "Dharamshala", "Solan", "Mandi", "Kullu", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Lahaul and Spiti", "Sirmaur", "Una"],
    "Jammu and Kashmir": ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Kathua", "Budgam", "Kupwara", "Pulwama", "Rajouri", "Udhampur", "Poonch", "Kulgam", "Samba", "Reasi"],
    "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar", "Hazaribagh", "Giridih", "Ramgarh", "Dumka", "Palamu", "Sahibganj", "Chaibasa"],
    "Karnataka": ["Bengaluru", "Mysuru", "Hubballi-Dharwad", "Mangaluru", "Belagavi", "Kalaburagi", "Ballari", "Vijayapura", "Shivamogga", "Tumakuru", "Raichur", "Bidar", "Hassan", "Udupi", "Davanagere"],
    "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam", "Alappuzha", "Kannur", "Palakkad", "Kottayam", "Kasaragod", "Idukki", "Malappuram", "Pathanamthitta", "Wayanad"],
    "Ladakh": ["Leh", "Kargil"],
    "Lakshadweep": ["Kavaratti", "Agatti", "Minicoy"],
    "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Dewas", "Satna", "Ratlam", "Rewa", "Katni", "Singrauli", "Burhanpur", "Khandwa", "Bhind", "Chhindwara"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad", "Solapur", "Amravati", "Navi Mumbai", "Kolhapur", "Akola", "Jalgaon", "Latur", "Sangli", "Ahmednagar", "Chandrapur", "Parbhani"],
    "Manipur": ["Imphal West", "Imphal East", "Bishnupur", "Thoubal", "Churachandpur", "Senapati", "Ukhrul", "Chandel", "Tamenglong"],
    "Meghalaya": ["Shillong", "Tura", "Jowai", "Nongpoh", "Williamnagar", "Baghmara", "Resubelpara"],
    "Mizoram": ["Aizawl", "Lunglei", "Champhai", "Saiha", "Kolasib", "Serchhip", "Lawngtlai"],
    "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha", "Zunheboto", "Phek", "Mon"],
    "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur", "Puri", "Balasore", "Bhadrak", "Baripada", "Jharsuguda", "Anugul", "Kendujhar"],
    "Puducherry": ["Puducherry", "Karaikal", "Mahe", "Yanam"],
    "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Hoshiarpur", "Pathankot", "Moga", "Abohar", "Phagwara", "Khanna"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Kota", "Bikaner", "Ajmer", "Udaipur", "Bhilwara", "Alwar", "Bharatpur", "Sikar", "Pali", "Sri Ganganagar", "Barmer", "Chittorgarh", "Jhunjhunu"],
    "Sikkim": ["Gangtok", "Gyalshing", "Mangan", "Namchi", "Soreng", "Pakyong"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tiruppur", "Erode", "Vellore", "Thoothukudi", "Tirunelveli", "Ambattur", "Nagercoil", "Thanjavur", "Kancheepuram"],
    "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Ramagundam", "Khammam", "Mahbubnagar", "Nalgonda", "Adilabad", "Suryapet", "Miryalaguda"],
    "Tripura": ["Agartala", "Udaipur", "Dharmanagar", "Ambassa", "Kailasahar", "Belonia", "Khowai"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Meerut", "Varanasi", "Prayagraj", "Bareilly", "Aligarh", "Moradabad", "Saharanpur", "Gorakhpur", "Noida", "Firozabad", "Jhansi", "Muzaffarnagar", "Mathura", "Ayodhya"],
    "Uttarakhand": ["Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rudrapur", "Kashipur", "Rishikesh", "Pithoragarh", "Nainital", "Almora"],
    "West Bengal": ["Kolkata", "Howrah", "Asansol", "Siliguri", "Durgapur", "Bardhaman", "Malda", "Baharampur", "Habra", "Kharagpur", "Shantipur", "Dankuni", "Medinipur", "Jalpaiguri", "Darjeeling", "Cooch Behar", "Purulia", "Bankura"]
};

function updateCities() {
    const stateSelect = document.getElementById("issuePlace");
    const citySelect = document.getElementById("issueCity");
    const selectedState = stateSelect.value;
    citySelect.innerHTML = '<option value="">-- Select City --</option>';
    if (selectedState && cityData[selectedState]) {
        cityData[selectedState].sort().forEach(city => {
            let option = document.createElement("option");
            option.value = city;
            option.text = city;
            citySelect.add(option);
        });
    } else {
        citySelect.innerHTML = '<option value="">-- Select State First --</option>';
    }
}

const firebaseConfig = {
    apiKey: "AIzaSyAS0N32VW0Z_FT-LAo-9YA6g1VkheZqqGU",
    authDomain: "grivence-by-codewave.firebaseapp.com",
    projectId: "grivence-by-codewave",
    storageBucket: "grivence-by-codewave.firebasestorage.app",
    messagingSenderId: "1080190479502",
    appId: "1:1080190479502:web:bd6c541c567f806d382ddf",
    measurementId: "G-8FHZ033TL7",
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();
let currentDocId = "";

// ==========================================
// 2. CITIZEN: REGISTRATION & TRACKING
// ==========================================
async function submitComplaint() {
    const category = document.getElementById('category').value;
    const state = document.getElementById('issuePlace').value;
    const city = document.getElementById('issueCity').value;
    const dateOfIncident = document.getElementById('incidentDate').value;
    const description = document.getElementById('complaintText').value;

    if (!category || !state || !city || !dateOfIncident || !description) {
        alert("Please fill all fields!");
        return;
    }

    const randomID = "GOI-" + Math.floor(100000 + Math.random() * 900000);
    try {
        await db.collection("complaints").add({
            complaintID: randomID,
            category: category,
            state: state,
            city: city,
            incidentDate: dateOfIncident,
            status: "Pending",
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        document.getElementById('result').classList.remove('hidden');
        document.getElementById('complaintID').innerText = randomID;
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

async function trackStatus() {
    const searchID = document.getElementById("searchID").value.trim();
    const resultBox = document.getElementById("statusResult");
    if (!searchID) { alert("Please enter a valid Grievance ID."); return; }
    try {
        const snapshot = await db.collection("complaints").where("complaintID", "==", searchID).get();
        if (snapshot.empty) { alert("No record found."); return; }
        snapshot.forEach((doc) => {
            const data = doc.data();
            resultBox.classList.remove("hidden");
            document.getElementById("displayCat").innerText = "Department: " + data.category;
            document.getElementById("displayStatus").innerText = data.status;
            document.getElementById("displayDesc").innerText = "Details: " + data.description;
            document.getElementById("displayRemarks").innerHTML = `
                <strong>Current Assignment:</strong> ${data.handoverTo || "Under Process"} <br>
                <strong>Official Remarks:</strong> ${data.remarks || "No remarks yet."}`;
        });
    } catch (error) { console.error("Tracking Error:", error); }
}

// ==========================================
// 3. OFFICER: ADMIN DASHBOARD
// ==========================================
function loadAdminData() {
    db.collection("complaints").orderBy("timestamp", "desc").onSnapshot((snap) => {
        const tableBody = document.getElementById("adminTableBody");
        if (!tableBody) return;
        tableBody.innerHTML = "";
        let total = 0, pending = 0, resolved = 0, handedOver = 0;

        snap.forEach((doc) => {
            const data = doc.data();
            total++;
            if (data.status === "Pending" || data.status === "In Progress") pending++;
            else if (data.status === "Handed Over") handedOver++;
            else if (data.status === "Resolved") resolved++;

            tableBody.innerHTML += `
                <tr>
                    <td><strong>${data.complaintID}</strong></td>
                    <td>${data.incidentDate || 'No Date'}</td> 
                    <td>${data.category}</td>
                    <td><div class="desc-cell" title="Hover to read more">${data.description}</div></td>
                    <td><span class="badge badge-${data.status.replace(/\s/g, '').toLowerCase()}">${data.status}</span></td>
                    <td style="color:#000080; font-weight:bold;">${data.handoverTo || "N/A"}</td>
                    <td><button class="btn-action" onclick="openActionModal('${doc.id}', '${data.complaintID}')">Take Action</button></td>
                </tr>`;
        });
        updateStatsUI(total, pending, handedOver, resolved);
    });
}

function updateStatsUI(total, pending, handedOver, resolved) {
    if(document.getElementById('count-total')) document.getElementById('count-total').innerText = total;
    if(document.getElementById('count-pending')) document.getElementById('count-pending').innerText = pending;
    if(document.getElementById('count-handedover')) document.getElementById('count-handedover').innerText = handedOver;
    if(document.getElementById('count-resolved')) document.getElementById('count-resolved').innerText = resolved;
}

window.openActionModal = function (docId, complaintId) {
    currentDocId = docId;
    document.getElementById("modalID").innerText = complaintId;
    document.getElementById("actionModal").classList.remove("hidden");
};

window.closeModal = function () {
    document.getElementById("actionModal").classList.add("hidden");
    currentDocId = "";
};

window.saveAction = async function () {
    const status = document.getElementById("newStatus").value;
    const handover = document.getElementById("handoverDept").value;
    const remarks = document.getElementById("officerRemarks").value;
    if (!currentDocId) return;
    try {
        await db.collection("complaints").doc(currentDocId).update({
            status: status,
            handoverTo: handover,
            remarks: remarks,
            lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
        });
        alert("Action recorded!");
        closeModal();
    } catch (error) { alert("Error updating database."); }
};

function logoutAdmin() {
    sessionStorage.removeItem("isLoggedIn");
    window.location.href = "admin_login.html";
}

function filterAdminTable() {
    const input = document.getElementById("adminSearchInput");
    const filter = input.value.toUpperCase();
    const table = document.getElementById("complaintTable");
    const tr = table.getElementsByTagName("tr");

    for (let i = 1; i < tr.length; i++) {
        const td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            const txtValue = td.textContent || td.innerText;
            tr[i].style.display = txtValue.toUpperCase().indexOf(filter) > -1 ? "" : "none";
        }
    }
}