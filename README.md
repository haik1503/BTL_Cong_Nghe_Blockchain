
# 🎡 Lucky Draw on Blockchain

Một ứng dụng vòng quay may mắn tích hợp với **Smart Contract trên Sepolia Testnet**, đảm bảo minh bạch và lưu trữ lịch sử người trúng giải trên blockchain.

---

## 📌 Chức năng chính

- 🎯 Quay số ngẫu nhiên chọn người thắng từ danh sách.
- 🧾 Ghi thông tin người thắng lên blockchain (mã người thắng + thời gian).
- 🔍 Xem lại lịch sử 5 người thắng gần nhất từ blockchain.
- 💾 Lưu và xóa danh sách người chơi cục bộ (localStorage).

---

## ⚙️ Công nghệ sử dụng

| Thành phần         | Mô tả                                     |
|--------------------|--------------------------------------------|
| Solidity           | Viết Smart Contract                       |
| Hardhat            | Deploy & test contract                    |
| ethers.js (v6.6.2) | Tương tác blockchain trong trình duyệt    |
| MetaMask           | Ký giao dịch, kết nối mạng Sepolia       |
| HTML/CSS/JS        | Giao diện Web frontend                    |
| Sepolia Testnet    | Mạng blockchain thử nghiệm Ethereum       |

---

## 🚀 Hướng dẫn chạy dự án

### 1. Clone & cài đặt
```bash
git clone https://github.com/your-username/lucky-draw-blockchain
cd lucky-draw-blockchain
npm install
```

### 2. Cấu hình `.env`
Tạo file `.env`:
```env
PRIVATE_KEY=YOUR_WALLET_PRIVATE_KEY
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID
```

### 3. Biên dịch và deploy contract
```bash
npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia
```

📌 Ghi lại địa chỉ contract được hiển thị để dùng trong `app.js`:
```js
const contractAddress = "0x..."; // Địa chỉ sau khi deploy
```

---

## 🧠 Cấu trúc thư mục

```
lucky-draw/
├── contracts/
│   └── LuckyDraw.sol         # Smart contract
├── scripts/
│   └── deploy.js             # Script deploy
├── frontend/
│   ├── index.html            # Giao diện chính
│   ├── style.css             # Giao diện CSS
│   ├── app.js                # Logic kết nối MetaMask + Blockchain
│   └── Winwheel.min.js       # Thư viện tạo vòng quay
├── .env                      # Biến môi trường (RPC URL, Private key)
├── hardhat.config.js
└── README.md
```

---

## 📷 Demo hoạt động

1. Kết nối MetaMask Sepolia
2. Nhập tên người chơi và quay vòng
3. Nhấn "Ghi kết quả lên Blockchain"
4. Kiểm tra MetaMask và xác nhận giao dịch
5. Nhấn "Xem kết quả blockchain" để xem lịch sử trúng thưởng

---

## 💡 Hướng phát triển

- Tích hợp NFT trao thưởng
- Tự động gửi thông báo email/Telegram
- Xuất lịch sử thành file CSV
- Hỗ trợ nhiều mạng: Polygon, BNB Testnet...

---

## 👤 Tác giả

- 👨‍💻 Nguyễn Đăng Chính – [Metamask: 0x...644D4](https://sepolia.etherscan.io/address/0x...)
- 🎓 Đại học Đại Nam


---

