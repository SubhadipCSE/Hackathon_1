const firebaseConfig = {
  apiKey: "AIzaSyAS0N32VW0Z_FT-LAo-9YA6g1VkheZqqGU",
  authDomain: "grivence-by-codewave.firebaseapp.com",
  projectId: "grivence-by-codewave",
  storageBucket: "grivence-by-codewave.firebasestorage.app",
  messagingSenderId: "1080190479502",
  appId: "1:1080190479502:web:bd6c541c567f806d382ddf",
  measurementId: "G-8FHZ033TL7",
};
// Firebase App Check SDK লিঙ্কে index.html এ থাকা নিশ্চিত করুন
// index.html এ <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app-check.js"></script> দিন

// const appCheck = firebase.appCheck();

// // Billing ছাড়া reCAPTCHA v3 ব্যবহারের জন্য activation
// appCheck.activate(
//     '6Ley-DwsAAAAAML-QM9nYZ86Q747NmQrv8h5yHwT', // আপনার প্রাপ্ত Site Key এখানে বসান
//     true // auto-refresh tokens enabled
// );

// Firebase Initialize kora holo
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

// Global Variable for Admin Action
let currentDocId = "";

// ==========================================
// 1. CITIZEN: COMPLAINT REGISTRATION (index.html)
// ==========================================
async function submitComplaint() {
  const category = document.getElementById("category").value;
  const description = document.getElementById("complaintText").value;
  const submitBtn = document.getElementById("submitBtn");

  if (!description || description.length < 5) {
    alert("Please provide a detailed description.");
    return;
  }

  submitBtn.innerText = "Processing Official Registration...";
  submitBtn.disabled = true;

  // Unique Grievance ID toiri kora (GOI-123456)
  const randomID = "GOI-" + Math.floor(100000 + Math.random() * 900000);

  try {
    await db.collection("complaints").add({
      complaintID: randomID,
      category: category,
      description: description,
      status: "Pending",
      handoverTo: "Central Cell",
      remarks: "Complaint filed successfully.",
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    // Success UI
    document.getElementById("result").classList.remove("hidden");
    document.getElementById("complaintID").innerText = randomID;
    submitBtn.style.display = "none";
  } catch (error) {
    console.error("Error adding document: ", error);
    alert("Registration failed. Please check your internet or Firebase rules.");
    submitBtn.innerText = "Register Grievance";
    submitBtn.disabled = false;
  }
}

// ==========================================
// 2. CITIZEN: TRACK STATUS (track.html)
// ==========================================
async function trackStatus() {
  const searchID = document.getElementById("searchID").value.trim();
  const resultBox = document.getElementById("statusResult");

  if (!searchID) {
    alert("Please enter a valid Grievance ID.");
    return;
  }

  try {
    const snapshot = await db
      .collection("complaints")
      .where("complaintID", "==", searchID)
      .get();

    if (snapshot.empty) {
      alert("No record found for this ID. Please check and try again.");
      return;
    }

    snapshot.forEach((doc) => {
      const data = doc.data();
      resultBox.classList.remove("hidden");
      document.getElementById("displayCat").innerText =
        "Department: " + data.category;
      document.getElementById("displayStatus").innerText = data.status;
      document.getElementById("displayDesc").innerText =
        "Details: " + data.description;
      document.getElementById("displayRemarks").innerHTML = `
                <strong>Current Assignment:</strong> ${
                  data.handoverTo || "Under Process"
                } <br>
                <strong>Official Remarks:</strong> ${
                  data.remarks || "No remarks yet."
                }
            `;
    });
  } catch (error) {
    console.error("Tracking Error:", error);
  }
}

// ==========================================
// 3. OFFICER: ADMIN DASHBOARD (admin.html)
// ==========================================

// Data Load kora ebong Counters update kora
function loadAdminData() {
  console.log("Fetching live data from GOI servers...");
  db.collection("complaints")
    .orderBy("timestamp", "desc")
    .onSnapshot(
      (snap) => {
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

          if (data.status === "Pending" || data.status === "In Progress") {
            pending++;
          } else if (data.status === "Handed Over") {
            handedOver++;
          } else if (data.status === "Resolved") {
            resolved++;
          }

          const statusClass = data.status.replace(/\s/g, "").toLowerCase();

          tableBody.innerHTML += `
                <tr>
                    <td><strong>${data.complaintID}</strong></td>
                    <td>${data.category}</td>
                    <td>${data.description.substring(0, 40)}...</td>
                    <td><span class="badge badge-${statusClass}">${
            data.status
          }</span></td>
                    <td style="color:#000080; font-weight:bold;">${
                      data.handoverTo || "Not Assigned"
                    }</td>
                    <td>
                        <button class="btn-action" onclick="openActionModal('${
                          doc.id
                        }', '${data.complaintID}')" 
                                style="background:#000080; color:white; border:none; padding:8px 12px; cursor:pointer; border-radius:4px;">
                            Take Action
                        </button>
                    </td>
                </tr>
            `;
        });

        // Stats UI update
        document.getElementById("count-total").innerText = total;
        document.getElementById("count-pending").innerText = pending;
        document.getElementById("count-handedover").innerText = handedOver;
        document.getElementById("count-resolved").innerText = resolved;
      },
      (error) => {
        console.error("Admin Load Error:", error);
      }
    );
}

// Action Modal Open kora
window.openActionModal = function (docId, complaintId) {
  currentDocId = docId;
  document.getElementById("modalID").innerText = complaintId;
  document.getElementById("actionModal").classList.remove("hidden");
};

// Action Modal Close kora
window.closeModal = function () {
  document.getElementById("actionModal").classList.add("hidden");
  currentDocId = "";
};

// Action Save/Handover kora
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

    alert("Official Action recorded and Handed Over to " + handover);
    closeModal();
  } catch (error) {
    console.error("Action Update Error:", error);
    alert("Failed to update database. Check Firestore Rules.");
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

    for (let i = 1; i < tr.length; i++) { // i=1 কারণ i=0 হচ্ছে হেডার
        const td = tr[i].getElementsByTagName("td")[0]; // ১ম কলাম (Grievance ID)
        if (td) {
            const txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}