# Defect Management System

**Project Overview:**
พัฒนาเว็บแอปพลิเคชันสำหรับบริหารจัดการของเสีย (Defect Management) ภายในสายการผลิต โดยมีเป้าหมายเพื่อลดความผิดพลาดจากการทำงานด้วยมือ (Human Error) และเพิ่มความแม่นยำในการคำนวณต้นทุนความเสียหาย เชื่อมต่อข้อมูลโดยตรงกับระบบ SAP เพื่อดึงข้อมูล Job Order และบันทึกผลการตรวจสอบคุณภาพแบบ Real-time

**Key Features:**

- **SAP Integration:** พัฒนาระบบ Interface เพื่อดึงข้อมูล Job Order และ Master Data จาก SAP มาแสดงผลบน Web Application โดยอัตโนมัติ ลดเวลาในการกรอกข้อมูลซ้ำซ้อน
- **Defect Recording:** ระบบบันทึกจำนวนของเสีย (NG Parts) โดยจำแนกตามประเภทของ Defect และ Work Center
- **Cost Calculation:** คำนวณมูลค่าความเสียหาย (Financial Loss) จากจำนวนของเสียทันที ช่วยให้ฝ่ายบริหารเห็นตัวเลขต้นทุนที่สูญเสียไปอย่างชัดเจน
- **Data Visualization & Reporting:** สรุปข้อมูลในรูปแบบ Dashboard และตารางสถิติ แสดงยอดรวมของเสียและมูลค่าความเสียหาย เพื่อใช้ในการวิเคราะห์และปรับปรุงกระบวนการผลิต

**Tech Stack:** Next JS, React, Tailwind, Microsoft SQL

- Frontend: React, Tailwind,
- Backend: Next JS, JavaScript, Node JS
- Database: Microsoft SQL
- Integration: SAP HANA on OPENQUERY
