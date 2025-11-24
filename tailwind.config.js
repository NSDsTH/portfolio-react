/** @type {import('tailwindcss').Config} */
export default {
  // 1. สำคัญมาก! ต้องบอก Tailwind ว่าไฟล์ React ของเราอยู่ที่ไหน
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  // 2. ใส่ Plugin Typography ตรงนี้
  plugins: [
    require('@tailwindcss/typography'),
  ],
}