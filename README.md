
# 🎡 Lucky Draw on Blockchain

**Lucky Draw on Blockchain:** là một ứng dụng vòng quay may mắn được xây dựng trên nền tảng blockchain nhằm đảm bảo tính minh bạch, công bằng và không thể gian lận. Thay vì chỉ quay số trên giao diện web như các ứng dụng thông thường, toàn bộ kết quả người thắng sẽ được ghi lại trực tiếp lên smart contract triển khai trên Sepolia Testnet – một mạng thử nghiệm của Ethereum.

Người dùng có thể kết nối ví MetaMask, tham gia quay số, và xác nhận giao dịch để ghi kết quả. Mỗi lượt trúng thưởng đều được lưu trữ trên blockchain, cho phép bất kỳ ai kiểm chứng lại lịch sử một cách công khai. Đây là một minh chứng cho việc ứng dụng công nghệ blockchain vào các hoạt động tương tác, sự kiện, hoặc trò chơi may rủi cần yếu tố minh bạch và đáng tin cậy.

---

## 🚀 Tính năng nổi bật

- 🔄 Quay số ngẫu nhiên chọn người trúng thưởng.

- ⛓️ Ghi kết quả trúng giải (mã người chơi + thời gian) lên blockchain.

- 🕵️‍♂️ Truy xuất lịch sử 5 lượt trúng gần nhất từ smart contract.

- 💾 Quản lý danh sách người chơi bằng trình duyệt (localStorage).

- 🔐 Tích hợp ví MetaMask để xác thực và ký giao dịch.

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

- 📈 Mở rộng & phát triển

- 🖼️ Tặng NFT cho người thắng cuộc

- 📬 Gửi thông báo qua Email/Telegram

- 📊 Xuất lịch sử kết quả thành CSV

- 🔗 Hỗ trợ nhiều mạng: Polygon, Binance Smart Chain (Testnet/Mainnet)

- 🎯 Tự động hóa quá trình chọn và ghi nhận kết quả định kỳ

---

🔒 Minh bạch & bảo mật

- Kết quả được ghi vĩnh viễn lên blockchain, không thể chỉnh sửa

- Mỗi người thắng đều được xác nhận thông qua giao dịch blockchain

- Giao dịch có thể theo dõi tại Sepolia Etherscan

---

📚 Tài liệu tham khảo

- ethers.js Documentation

- Hardhat Official Site

- Winwheel.js

---

## 👤 Tác giả

- 👨‍💻 Nguyễn Đăng Chính – [Metamask: 0x...644D4](https://sepolia.etherscan.io/address/0x...)
- 🎓 Đại học Đại Nam


---

