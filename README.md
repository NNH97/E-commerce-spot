# 🏆 EcommerSpot - Website Bán Dụng Cụ Thể Thao

Website thương mại điện tử bán dụng cụ thể thao với giao diện hiện đại, responsive.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-blue?logo=tailwindcss)
![React](https://img.shields.io/badge/React-18-blue?logo=react)

## ✨ Tính Năng

- 🏠 Trang chủ với hero banner, danh mục sản phẩm
- 📦 Danh sách sản phẩm với filter & sort
- 🔍 Lọc theo danh mục, thương hiệu, giá
- 📄 Trang chi tiết sản phẩm
- 🛒 Giỏ hàng (lưu localStorage)
- 💳 Trang thanh toán
- 📱 Responsive design
- 🌙 Dark theme

## 🛍️ Danh Mục Sản Phẩm

- 🏸 Cầu Lông (Yonex, Victor, Lining)
- ⚽ Bóng Đá (Nike, Adidas)
- 🏀 Bóng Rổ (Nike, Spalding)
- 🎾 Tennis (Wilson)
- 🎒 Phụ Kiện

## 🚀 Cài Đặt

```bash
# Clone repo
git clone https://github.com/NNH97/E-commerce-spot.git
cd E-commerce-spot

# Cài dependencies
npm install

# Chạy development server
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem website.

## 📁 Cấu Trúc

```
src/
├── app/                 # Next.js App Router
│   ├── page.jsx         # Trang chủ
│   ├── products/        # Trang sản phẩm
│   ├── cart/            # Giỏ hàng
│   └── checkout/        # Thanh toán
├── components/          # React components
├── context/             # Cart context
└── data/                # Mock data
```

## 🛠️ Tech Stack

- **Framework:** Next.js 14
- **Styling:** TailwindCSS 3
- **Icons:** React Icons
- **State:** React Context + localStorage

## 📝 License

MIT License
