//  DATA & CONFIGURATION

const MASTER_KEY = "TeamCodewave@2026";
let finalProcessedImage = null;
let editorCanvas, editorCtx;
let isDrawing = false;
const DistrictData = {
  "Andaman and Nicobar Islands": [
    "Port Blair",
    "Nicobar",
    "North and Middle Andaman",
    "South Andaman",
  ],
  "Andhra Pradesh": [
    "Visakhapatnam",
    "Vijayawada",
    "Guntur",
    "Nellore",
    "Kurnool",
    "Anantapur",
    "Chittoor",
    "East Godavari",
    "West Godavari",
    "Kadapa",
    "Krishna",
    "Prakasam",
    "Srikakulam",
    "Vizianagaram",
  ],
  "Arunachal Pradesh": [
    "Itanagar",
    "Tawang",
    "West Kameng",
    "East Kameng",
    "Papum Pare",
    "Kurung Kumey",
    "Kra Daadi",
    "Lower Subansiri",
    "Upper Subansiri",
    "West Siang",
    "East Siang",
    "Siang",
    "Upper Siang",
    "Lower Siang",
    "Lower Dibang Valley",
    "Upper Dibang Valley",
    "Anjaw",
    "Lohit",
    "Namsai",
    "Changlang",
    "Tirap",
    "Longding",
  ],
  Assam: [
    "Guwahati",
    "Dibrugarh",
    "Silchar",
    "Jorhat",
    "Nagaon",
    "Tinsukia",
    "Tezpur",
    "Barpeta",
    "Bongaigaon",
    "Dhubri",
    "Goalpara",
    "Golaghat",
    "Hailakandi",
    "Karimganj",
    "Lakhimpur",
    "Majuli",
    "Morigaon",
    "Sivasagar",
    "Sonitpur",
  ],
  Bihar: [
    "Patna",
    "Gaya",
    "Bhagalpur",
    "Muzaffarpur",
    "Purnia",
    "Darbhanga",
    "Arrah",
    "Begusarai",
    "Katihar",
    "Munger",
    "Chapra",
    "Nalanda",
    "Saharsa",
    "Sasaram",
    "Hajipur",
    "Siwan",
    "Motihari",
    "Bettiah",
  ],
  Chandigarh: ["Chandigarh"],
  Chhattisgarh: [
    "Raipur",
    "Bhilai",
    "Bilaspur",
    "Korba",
    "Rajnandgaon",
    "Jagdalpur",
    "Ambikapur",
    "Dhamtari",
    "Durg",
    "Mahasamund",
    "Raigarh",
  ],
  "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Diu", "Silvassa"],
  Delhi: [
    "New Delhi",
    "North Delhi",
    "South Delhi",
    "East Delhi",
    "West Delhi",
    "Central Delhi",
    "North East Delhi",
    "North West Delhi",
    "South East Delhi",
    "South West Delhi",
    "Shahdara",
  ],
  Goa: [
    "North Goa",
    "South Goa",
    "Panaji",
    "Margao",
    "Vasco da Gama",
    "Mapusa",
    "Ponda",
  ],
  Gujarat: [
    "Ahmedabad",
    "Surat",
    "Vadodara",
    "Rajkot",
    "Bhavnagar",
    "Jamnagar",
    "Gandhinagar",
    "Junagadh",
    "Anand",
    "Navsari",
    "Morbi",
    "Bharuch",
    "Valsad",
    "Porbandar",
    "Mehsana",
  ],
  Haryana: [
    "Faridabad",
    "Gurugram",
    "Panipat",
    "Ambala",
    "Yamunanagar",
    "Rohtak",
    "Hisar",
    "Karnal",
    "Sonipat",
    "Panchkula",
    "Bhiwani",
    "Sirsa",
    "Jind",
    "Rewari",
  ],
  "Himachal Pradesh": [
    "Shimla",
    "Dharamshala",
    "Solan",
    "Mandi",
    "Kullu",
    "Chamba",
    "Hamirpur",
    "Kangra",
    "Kinnaur",
    "Lahaul and Spiti",
    "Sirmaur",
    "Una",
  ],
  "Jammu and Kashmir": [
    "Srinagar",
    "Jammu",
    "Anantnag",
    "Baramulla",
    "Kathua",
    "Budgam",
    "Kupwara",
    "Pulwama",
    "Rajouri",
    "Udhampur",
    "Poonch",
    "Kulgam",
    "Samba",
    "Reasi",
  ],
  Jharkhand: [
    "Ranchi",
    "Jamshedpur",
    "Dhanbad",
    "Bokaro",
    "Deoghar",
    "Hazaribagh",
    "Giridih",
    "Ramgarh",
    "Dumka",
    "Palamu",
    "Sahibganj",
    "Chaibasa",
  ],
  Karnataka: [
    "Bengaluru",
    "Mysuru",
    "Hubballi-Dharwad",
    "Mangaluru",
    "Belagavi",
    "Kalaburagi",
    "Ballari",
    "Vijayapura",
    "Shivamogga",
    "Tumakuru",
    "Raichur",
    "Bidar",
    "Hassan",
    "Udupi",
    "Davanagere",
  ],
  Kerala: [
    "Thiruvananthapuram",
    "Kochi",
    "Kozhikode",
    "Thrissur",
    "Kollam",
    "Alappuzha",
    "Kannur",
    "Palakkad",
    "Kottayam",
    "Kasaragod",
    "Idukki",
    "Malappuram",
    "Pathanamthitta",
    "Wayanad",
  ],
  Ladakh: ["Leh", "Kargil"],
  Lakshadweep: ["Kavaratti", "Agatti", "Minicoy"],
  "Madhya Pradesh": [
    "Indore",
    "Bhopal",
    "Jabalpur",
    "Gwalior",
    "Ujjain",
    "Sagar",
    "Dewas",
    "Satna",
    "Ratlam",
    "Rewa",
    "Katni",
    "Singrauli",
    "Burhanpur",
    "Khandwa",
    "Bhind",
    "Chhindwara",
  ],
  Maharashtra: [
    "Mumbai",
    "Pune",
    "Nagpur",
    "Thane",
    "Nashik",
    "Aurangabad",
    "Solapur",
    "Amravati",
    "Navi Mumbai",
    "Kolhapur",
    "Akola",
    "Jalgaon",
    "Latur",
    "Sangli",
    "Ahmednagar",
    "Chandrapur",
    "Parbhani",
  ],
  Manipur: [
    "Imphal West",
    "Imphal East",
    "Bishnupur",
    "Thoubal",
    "Churachandpur",
    "Senapati",
    "Ukhrul",
    "Chandel",
    "Tamenglong",
  ],
  Meghalaya: [
    "Shillong",
    "Tura",
    "Jowai",
    "Nongpoh",
    "Williamnagar",
    "Baghmara",
    "Resubelpara",
  ],
  Mizoram: [
    "Aizawl",
    "Lunglei",
    "Champhai",
    "Saiha",
    "Kolasib",
    "Serchhip",
    "Lawngtlai",
  ],
  Nagaland: [
    "Kohima",
    "Dimapur",
    "Mokokchung",
    "Tuensang",
    "Wokha",
    "Zunheboto",
    "Phek",
    "Mon",
  ],
  Odisha: [
    "Bhubaneswar",
    "Cuttack",
    "Rourkela",
    "Berhampur",
    "Sambalpur",
    "Puri",
    "Balasore",
    "Bhadrak",
    "Baripada",
    "Jharsuguda",
    "Anugul",
    "Kendujhar",
  ],
  Puducherry: ["Puducherry", "Karaikal", "Mahe", "Yanam"],
  Punjab: [
    "Ludhiana",
    "Amritsar",
    "Jalandhar",
    "Patiala",
    "Bathinda",
    "Mohali",
    "Hoshiarpur",
    "Pathankot",
    "Moga",
    "Abohar",
    "Phagwara",
    "Khanna",
  ],
  Rajasthan: [
    "Jaipur",
    "Jodhpur",
    "Kota",
    "Bikaner",
    "Ajmer",
    "Udaipur",
    "Bhilwara",
    "Alwar",
    "Bharatpur",
    "Sikar",
    "Pali",
    "Sri Ganganagar",
    "Barmer",
    "Chittorgarh",
    "Jhunjhunu",
  ],
  Sikkim: ["Gangtok", "Gyalshing", "Mangan", "Namchi", "Soreng", "Pakyong"],
  "Tamil Nadu": [
    "Chennai",
    "Coimbatore",
    "Madurai",
    "Tiruchirappalli",
    "Salem",
    "Tiruppur",
    "Erode",
    "Vellore",
    "Thoothukudi",
    "Tirunelveli",
    "Ambattur",
    "Nagercoil",
    "Thanjavur",
    "Kancheepuram",
  ],
  Telangana: [
    "Hyderabad",
    "Warangal",
    "Nizamabad",
    "Karimnagar",
    "Ramagundam",
    "Khammam",
    "Mahbubnagar",
    "Nalgonda",
    "Adilabad",
    "Suryapet",
    "Miryalaguda",
  ],
  Tripura: [
    "Agartala",
    "Udaipur",
    "Dharmanagar",
    "Ambassa",
    "Kailasahar",
    "Belonia",
    "Khowai",
  ],
  "Uttar Pradesh": [
    "Lucknow",
    "Kanpur",
    "Ghaziabad",
    "Agra",
    "Meerut",
    "Varanasi",
    "Prayagraj",
    "Bareilly",
    "Aligarh",
    "Moradabad",
    "Saharanpur",
    "Gorakhpur",
    "Noida",
    "Firozabad",
    "Jhansi",
    "Muzaffarnagar",
    "Mathura",
    "Ayodhya",
  ],
  Uttarakhand: [
    "Dehradun",
    "Haridwar",
    "Roorkee",
    "Haldwani",
    "Rudrapur",
    "Kashipur",
    "Rishikesh",
    "Pithoragarh",
    "Nainital",
    "Almora",
  ],
  "West Bengal": [
    "Alipurduar",
    "Bankura",
    "Birbhum",
    "Cooch Behar",
    "Dakshin Dinajpur",
    "Darjeeling",
    "Hooghly",
    "Howrah",
    "Jalpaiguri",
    "Jhargram",
    "Kalimpong",
    "Kolkata",
    "Malda",
    "Murshidabad",
    "Nadia",
    "North 24 Parganas",
    "Paschim Bardhaman",
    "Paschim Medinipur",
    "Purba Bardhaman",
    "Purba Medinipur",
    "Purulia",
    "South 24 Parganas",
    "Uttar Dinajpur",
  ],
};

// IMAGE EDITOR & CANVAS LOGIC

// File select korle ei function ti trigger hobe
window.handleFileSelect = function (event) {
  const file = event.target.files[0];
  if (!file) return;

  const modal = document.getElementById("redactionModal");
  editorCanvas = document.getElementById("editorCanvas");

  if (!modal || !editorCanvas) {
    return;
  }

  editorCtx = editorCanvas.getContext("2d");
  const reader = new FileReader();

  reader.onload = function (e) {
    const img = new Image();
    img.onload = function () {
      editorCanvas.width = img.width;
      editorCanvas.height = img.height;
      editorCtx.drawImage(img, 0, 0);
      modal.style.display = "flex";
      setupEditorDrawingEvents();
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
};

// edit event korar logic
function setupEditorDrawingEvents() {
  if (!editorCanvas) return;

  editorCanvas.onmousedown = (e) => {
    isDrawing = true;
    drawOnCanvas(e);
  };
  editorCanvas.onmouseup = () => {
    isDrawing = false;
    editorCtx.beginPath();
  };
  editorCanvas.onmousemove = (e) => {
    if (isDrawing) drawOnCanvas(e);
  };

  // mobile er jonno
  editorCanvas.addEventListener("touchstart", (e) => {
    isDrawing = true;
    drawOnCanvas(e.touches[0]);
    e.preventDefault();
  });
  editorCanvas.addEventListener("touchmove", (e) => {
    if (isDrawing) drawOnCanvas(e.touches[0]);
    e.preventDefault();
  });
  editorCanvas.addEventListener("touchend", () => {
    isDrawing = false;
  });
}

// Edit korar function
function drawOnCanvas(e) {
  const rect = editorCanvas.getBoundingClientRect();
  const scaleX = editorCanvas.width / rect.width;
  const scaleY = editorCanvas.height / rect.height;

  const x = (e.clientX - rect.left) * scaleX;
  const y = (e.clientY - rect.top) * scaleY;

  editorCtx.fillStyle = "black";
  editorCtx.fillRect(x - 20, y - 20, 40, 40); // ৪০ পিক্সেল সাইজের বক্স
}

// ৪. Edit Save Button
window.saveRedaction = function () {
  if (editorCanvas) {
    finalProcessedImage = editorCanvas.toDataURL("image/jpeg", 0.8);
    document.getElementById("redactionModal").style.display = "none";
    alert("Image Processed! Now you can submit.");
  }
};

//  Edit Cancel Button
window.cancelRedaction = function () {
  document.getElementById("redactionModal").style.display = "none";
  document.getElementById("evidenceFile").value = ""; // ফাইল ইনপুট ক্লিয়ার
  finalProcessedImage = null;
};

// districts update
window.updateDistricts = function () {
  const stateSelect = document.getElementById("issuePlace");
  const citySelect = document.getElementById("issueCity");
  const selectedState = stateSelect.value;

  citySelect.innerHTML = '<option value="">-- Loading... --</option>';

  if (selectedState && DistrictData[selectedState]) {
    citySelect.innerHTML = '<option value="">-- Select Dist --</option>'; // Reset
    DistrictData[selectedState].sort().forEach((city) => {
      let option = document.createElement("option");
      option.value = city;
      option.text = city;
      citySelect.add(option);
    });
  } else {
    citySelect.innerHTML = '<option value="">-- Select State First --</option>';
  }
};

const firebaseConfig = {
  apiKey: "AIzaSyAS0N32VW0Z_FT-LAo-9YA6g1VkheZqqGU",
  authDomain: "grivence-by-codewave.firebaseapp.com",
  projectId: "grivence-by-codewave",
  storageBucket: "grivence-by-codewave.firebasestorage.app",
  messagingSenderId: "1080190479502",
  appId: "1:1080190479502:web:bd6c541c567f806d382ddf",
  measurementId: "G-8FHZ033TL7",
};

// evidence file encryption kora
async function encryptFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const fileData = e.target.result;
        const encrypted = CryptoJS.AES.encrypt(fileData, MASTER_KEY).toString();
        resolve(encrypted);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();
let currentDocId = "";

// 2 CITIZEN REGISTRATION & TRACKING

async function submitComplaint() {
  const category = document.getElementById("category").value;
  const state = document.getElementById("issuePlace").value;
  const city = document.getElementById("issueCity").value;
  const dateOfIncident = document.getElementById("incidentDate").value;
  const description = document.getElementById("complaintText").value;
  const fileInput = document.getElementById("evidenceFile");

  // Validation check
  if (!category || !state || !city || !dateOfIncident || !description) {
    alert("Please fill all fields!");
    return;
  }

  let encryptedEvidence = null;

  try {
    console.log("Checking for edited image...");

    if (finalProcessedImage) {
      console.log("Encrypting EDITED image...");
      encryptedEvidence = CryptoJS.AES.encrypt(
        finalProcessedImage,
        MASTER_KEY
      ).toString();
    } else if (fileInput && fileInput.files.length > 0) {
      console.log("Encrypting ORIGINAL file...");
      const file = fileInput.files[0];

      if (file.size > 700 * 1024) {
        alert("File too large! Max 700KB allowed.");
        return;
      }

      const base64Raw = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      encryptedEvidence = CryptoJS.AES.encrypt(
        base64Raw,
        MASTER_KEY
      ).toString();
    }
    // ---------------------

    const randomID = "GOI-" + Math.floor(100000 + Math.random() * 900000);

    // firebase e store kora
    await db.collection("complaints").add({
      complaintID: randomID,
      category: category,
      state: state,
      city: city,
      incidentDate: dateOfIncident,
      description: description,
      evidence: encryptedEvidence,
      status: "Pending",
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    // success hoye gele
    document.getElementById("submitBtn").style.display = "none";
    document.getElementById("result").classList.remove("hidden");
    document.getElementById("complaintID").innerText = randomID;
    document.getElementById("result").scrollIntoView({ behavior: "smooth" });

    // variable reset
    finalProcessedImage = null;
  } catch (e) {
    console.error("Submission Error:", e);
    alert("Upload failed. Check Console.");
  }
}

async function trackStatus() {
  const searchID = document.getElementById("searchID").value.trim();
  const resultBox = document.getElementById("statusResult");

  if (!searchID) return alert("Enter Grievance ID");

  try {
    const snapshot = await db
      .collection("complaints")
      .where("complaintID", "==", searchID)
      .get();
    if (snapshot.empty) return alert("ID not found!");

    snapshot.forEach((doc) => {
      const data = doc.data();
      resultBox.classList.remove("hidden");

      // complaint date r complaint ta kotodin hoyechhe ta janar jonno
      if (data.timestamp) {
        const createdDate = data.timestamp.toDate();
        document.getElementById("time-submitted").innerText =
          createdDate.toLocaleDateString();
        const diffDays = Math.ceil(
          Math.abs(new Date() - createdDate) / (1000 * 60 * 60 * 24)
        );
        document.getElementById("displayAge").innerText = diffDays;
      }

      // kothay achhe setar details dekhar jonno
      document.getElementById("displayAuthority").innerText =
        data.handoverTo || "Central Processing Cell";
      document.getElementById("displayStatus").innerText = data.status;
      document.getElementById("displayCat").innerText = data.category;

      // Status er road map mane complaint ta kothay achhe seta dekhar jonno
      resetRoadmap();
      document.getElementById("step-pending").classList.add("completed");

      if (data.status === "In Progress" || data.status === "Handed Over") {
        document.getElementById("step-inprogress").classList.add("active");
        document.getElementById("time-updated").innerText = data.lastUpdated
          ? data.lastUpdated.toDate().toLocaleDateString()
          : "Processing";
        document.getElementById("displayRemarks").innerText =
          data.remarks || "Processing your grievance.";
      } else if (data.status === "Resolved") {
        document.getElementById("step-inprogress").classList.add("completed");
        document.getElementById("step-resolved").classList.add("completed");
        document.getElementById("time-resolved").innerText = data.lastUpdated
          ? data.lastUpdated.toDate().toLocaleDateString()
          : "Done";
        document.getElementById("displayRemarks").innerText =
          data.remarks || "Resolved successfully.";
      } else if (data.status === "Rejected") {
        document.getElementById("step-rejected").style.display = "block";
        document
          .getElementById("step-rejected")
          .classList.add("active-rejected");

        const updateTime = data.lastUpdated
          ? data.lastUpdated.toDate().toLocaleDateString()
          : "Date Not Available";
        document.getElementById("time-rejected").innerText = updateTime;

        // if reject then it will highlight with color red
        document.getElementById(
          "displayRemarks"
        ).innerHTML = `<span style="color: #d32f2f; font-weight: bold;">Reason: ${
          data.remarks || "No reason provided."
        }</span>`;
      }
    });
  } catch (e) {
    console.error("Error Tracking:", e);
  }
}

function resetRoadmap() {
  const steps = [
    "step-pending",
    "step-inprogress",
    "step-resolved",
    "step-rejected",
  ];
  steps.forEach((s) => {
    const el = document.getElementById(s);
    if (el) {
      el.classList.remove("active", "completed", "active-rejected");
      if (s === "step-rejected") el.style.display = "none";
    }
  });
}

// ADMIN CONTROL SECTION

function loadAdminData() {
  db.collection("complaints")
    .orderBy("timestamp", "desc")
    .onSnapshot((snap) => {
      const tableBody = document.getElementById("adminTableBody");
      if (!tableBody) return;
      tableBody.innerHTML = "";
      let total = 0,
        pending = 0,
        resolved = 0,
        handedOver = 0;

      snap.forEach((doc) => {
        const data = doc.data();
        total++;
        if (data.status === "Pending" || data.status === "In Progress")
          pending++;
        else if (data.status === "Handed Over") handedOver++;
        else if (data.status === "Resolved") resolved++;

        tableBody.innerHTML += `
                <tr>
                    <td><strong>${data.complaintID}</strong></td>
                    <td>${data.incidentDate || "No Date"}</td> 
                    <td>${data.category}</td>
                    <td><div class="desc-cell" title="Hover to read more">${
                      data.description
                    }</div></td>
                    <td><span class="badge badge-${data.status
                      .replace(/\s/g, "")
                      .toLowerCase()}">${data.status}</span></td>
                    <td style="color:#000080; font-weight:bold;">${
                      data.handoverTo || "N/A"
                    }</td>
                    <td>
                        <div class="action-dropdown">
                            <button class="btn-action" onclick="toggleDropdown('${
                              doc.id
                            }')">Actions ▼</button>
                            <div id="dropdown-${
                              doc.id
                            }" class="dropdown-content hidden">
                                <a href="javascript:void(0)" onclick="viewDetails('${
                                  doc.id
                                }')">🔍 View Details</a>
                                <a href="javascript:void(0)" onclick="openActionModal('${
                                  doc.id
                                }', '${data.complaintID}')">🛠️ Take Action</a>
                            </div>
                        </div>
                    </td>
                </tr>`;
      });
      updateStatsUI(total, pending, handedOver, resolved);
    });
}

// Dropdown Control
window.toggleDropdown = function (id) {
  const el = document.getElementById(`dropdown-${id}`);
  document.querySelectorAll(".dropdown-content").forEach((d) => {
    if (d.id !== `dropdown-${id}`) d.classList.add("hidden");
  });
  el.classList.toggle("hidden");
};

// Eta complaint Details dekhar jonno
window.viewDetails = async function (docId) {
  try {
    const doc = await db.collection("complaints").doc(docId).get();
    const data = doc.data();

    // Grivence list er details
    document.getElementById("dt-id").innerText = data.complaintID;
    document.getElementById("dt-cat").innerText = data.category;
    document.getElementById("dt-loc").innerText = `${data.state || "N/A"}, ${
      data.city || ""
    }`;
    document.getElementById("dt-date").innerText = data.incidentDate || "N/A";
    document.getElementById("dt-desc").innerText = data.description;
    document.getElementById("dt-status").innerText = data.status;
    document.getElementById("dt-remarks").innerText =
      data.remarks || "No remarks yet.";

    // evidence decrypt kora ekhane
    const imgTag = document.getElementById("dt-evidence-img");
    const downloadLink = document.getElementById("dt-evidence-download");
    const noEvMsg = document.getElementById("no-evidence");

    if (data.evidence) {
      try {
        // CryptoJS Use kore Data decrypt kora hoyechhe ekhane
        const bytes = CryptoJS.AES.decrypt(data.evidence, MASTER_KEY);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

        if (decryptedData) {
          imgTag.src = decryptedData;
          imgTag.style.display = "block";
          downloadLink.href = decryptedData;
          downloadLink.style.display = "inline-block";
          noEvMsg.style.display = "none";
        }
      } catch (err) {
        console.error("Decryption failed:", err);
        noEvMsg.innerText = "❌ Failed to decrypt evidence (Invalid Key).";
      }
    } else {
      imgTag.style.display = "none";
      downloadLink.style.display = "none";
      noEvMsg.style.display = "block";
    }

    // model dekhanor jonno
    document.getElementById("viewModal").classList.remove("hidden");
  } catch (e) {
    console.error("Error:", e);
    alert("Could not load details.");
  }
};
// View Details Modal Close hobe ekhane
window.closeViewModal = function () {
  document.getElementById("viewModal").classList.add("hidden");
};
// Baire click korle dropdown bondho hobe
window.onclick = function (event) {
  if (!event.target.matches(".btn-action")) {
    document
      .querySelectorAll(".dropdown-content")
      .forEach((el) => el.classList.add("hidden"));
  }
};

function updateStatsUI(total, pending, handedOver, resolved) {
  if (document.getElementById("count-total"))
    document.getElementById("count-total").innerText = total;
  if (document.getElementById("count-pending"))
    document.getElementById("count-pending").innerText = pending;
  if (document.getElementById("count-handedover"))
    document.getElementById("count-handedover").innerText = handedOver;
  if (document.getElementById("count-resolved"))
    document.getElementById("count-resolved").innerText = resolved;
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
  const handover = document.getElementById("handoverDept").value; // Handed Over Option
  const remarks = document.getElementById("officerRemarks").value; // kothay achhe tar remark

  if (!currentDocId) return;

  try {
    await db.collection("complaints").doc(currentDocId).update({
      status: status,
      handoverTo: handover,
      remarks: remarks,
      lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
    });
    alert("Action successfully recorded!");
    closeModal();
  } catch (error) {
    console.error("Error updating database:", error);
  }
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
      tr[i].style.display =
        txtValue.toUpperCase().indexOf(filter) > -1 ? "" : "none";
    }
  }
}
