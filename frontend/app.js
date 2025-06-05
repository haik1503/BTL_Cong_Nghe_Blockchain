// app.js

const contractAddress = "0x785999970688b697350646575B64d2bCDfEAd212";
const abi = [
  "function saveWinner(string code, string time) public",
  "function getWinner(uint index) public view returns (string, string)",
  "function getWinnerCount() public view returns (uint)"
];


let participants = [];
let theWheel;
let history = [];
let currentRotation = 0;

window.onload = () => {
  loadParticipants();
  initWheel();
};

function addParticipant() {
  const name = document.getElementById("nameInput").value.trim();
  if (!name) return;
  participants.push(name);
  updateParticipantList();
  initWheel();
  document.getElementById("nameInput").value = "";
}

function addMultiple() {
  const bulk = document.getElementById("bulkNames").value.trim();
  if (!bulk) return;
  const names = bulk.split("\n").map(n => n.trim()).filter(n => n);
  participants.push(...names);
  updateParticipantList();
  initWheel();
  document.getElementById("bulkNames").value = "";
}

function updateParticipantList() {
  const list = document.getElementById("participantList");
  list.innerHTML = "";
  participants.forEach((name, i) => {
    const li = document.createElement("li");
    li.textContent = `${i + 1}. ${name}`;
    list.appendChild(li);
  });
}

function initWheel() {
  if (participants.length === 0) return;
  const segments = participants.map(p => ({ fillStyle: getRandomColor(), text: p }));
  theWheel = new Winwheel({
    'canvasId': 'wheelCanvas',
    'numSegments': segments.length,
    'segments': segments,
    'rotationAngle': currentRotation,
    'animation': {
      'type': 'spinToStop',
      'duration': 4,
      'spins': 8,
      'callbackFinished': announceWinner,
      'callbackAfter': drawPointer
    }
  });
  drawPointer();
}

function getRandomColor() {
  const letters = '789ABCDEF';
  return '#' + Array.from({ length: 6 }, () => letters[Math.floor(Math.random() * letters.length)]).join('');
}

function spinWheel() {
  if (!theWheel || participants.length === 0) return;
  theWheel.stopAnimation(false);
  theWheel.rotationAngle = currentRotation;
  theWheel.draw();
  drawPointer();
  theWheel.startAnimation();
}

function announceWinner(indicatedSegment) {
  const winner = indicatedSegment.text;
  const time = new Date().toLocaleTimeString('vi-VN') + ' ' + new Date().toLocaleDateString('vi-VN');

  document.getElementById("winnerDisplay").innerHTML =
    `🎉 <b>Người thắng:</b> ${winner}<br>🕒 <b>${time}</b>`;

  const log = `${winner} - ${time}`;
  history.unshift(log);
  renderHistory();

  currentRotation = theWheel.rotationAngle % 360;
  drawPointer();
}

function renderHistory() {
  const ul = document.getElementById("historyList");
  ul.innerHTML = "";
  history.slice(0, 10).forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    ul.appendChild(li);
  });
}

function saveParticipants() {
  localStorage.setItem("luckyDrawParticipants", JSON.stringify(participants));
  alert("📁 Danh sách người tham gia đã được lưu!");
}

function clearParticipants() {
  if (!confirm("Bạn có chắc muốn xoá toàn bộ danh sách không?")) return;
  participants = [];
  localStorage.removeItem("luckyDrawParticipants");
  updateParticipantList();
  initWheel();
  alert("🗑️ Danh sách đã được xoá!");
}

function loadParticipants() {
  const data = localStorage.getItem("luckyDrawParticipants");
  if (data) {
    participants = JSON.parse(data);
    updateParticipantList();
    initWheel();
  }
}

function generateCode(name) {
  return btoa(unescape(encodeURIComponent(name))).slice(0, 8).toUpperCase();
}

// ⚙️ Ghi người thắng mới lên blockchain Sepolia
async function saveToBlockchain() {
  if (history.length === 0) return alert("❌ Chưa có người thắng!");

  const [winner, time] = history[0].split(" - ");
  const winnerCode = generateCode(winner);

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    const tx = await contract.saveWinner(winnerCode, time);
    await tx.wait();

    alert("✅ Đã ghi kết quả lên blockchain Sepolia!");
    console.log("📝 Ghi:", { winnerCode, time });
  } catch (err) {
    console.error("❌ Ghi blockchain lỗi:", err);
    alert("❌ Không thể ghi dữ liệu lên blockchain!");
  }
}

// 📖 Xem kết quả gần nhất
async function viewBlockchainResult() {
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    const [code, time] = await contract.getLastWinner();
    alert(`🧞 Mã người thắng: ${code}\n🕒 Thời gian: ${time}`);
  } catch (err) {
    console.error("❌ Không đọc được blockchain:", err);
    alert("❌ Không đọc được kết quả từ blockchain!");
  }
}

// 📜 Xem top 5 người thắng gần nhất
async function showHistory() {
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    const count = Number(await contract.getWinnerCount());  // ⬅️ ép kiểu tại đây
    let allResults = [];

    for (let i = count - 1; i >= Math.max(0, count - 5); i--) {
      const [code, time] = await contract.getWinner(i);
      allResults.push(`🆔 Mã: ${code} - 🕒 ${time}`);
    }

    alert("📜 Top 5 người thắng gần nhất:\n" + allResults.join("\n"));
  } catch (err) {
    console.error("❌ Lỗi khi đọc dữ liệu từ blockchain:", err);
    alert("❌ Lỗi khi đọc dữ liệu từ blockchain!");
  }
}


function drawPointer() {
  const canvas = document.getElementById("wheelCanvas");
  const ctx = canvas.getContext("2d");
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = canvas.width / 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  theWheel.draw(false);

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(centerX, centerY - radius + 40);
  ctx.lineTo(centerX - 15, centerY - radius - 35);
  ctx.lineTo(centerX + 15, centerY - radius - 35);
  ctx.closePath();
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.restore();
}
