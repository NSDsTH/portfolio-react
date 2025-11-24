# Smart Factory Dashboard using IIoT (Industrial IoT)

**Smart Factory Dashboard**
โปรเจกต์นี้เป็นการทำระบบ End-to-End IIoT เพื่อเชื่อมต่อข้อมูลจากเครื่องจักร (Production Floor) ขึ้นมาแสดงผลบนหน้าจอ

หลักการทำงานคือ การสร้าง Pipeline ที่ดึงข้อมูลจาก Sensor/PLC ยิงผ่าน Cloud เข้ามาเก็บใน Database แบบ Real-time โดยใช้ Node-RED เป็นตัวกลางคอยจัดการข้อมูลและส่ง Alert แจ้งเตือนอัตโนมัติ ทำให้เราสามารถ Monitor สถานะการผลิตได้ทุกที่ และเมื่อเกิดปัญหา ก็สามารถ Troubleshooting ได้ทันท่วงที

![                                                         End-to-End IIoT Data Pipeline](IoT_flow.png)

**Tech Stack**

- **`Data Ingestion` :** IoT Gateway (V-Box), Cloud (V-NET) และ Node-RED
- **`Database` :** Microsoft SQL Server
- **`Backend` :** Node.js / Express.js
- **`Frontend` :** React ร่วมกับ Recharts

**ฟีเจอร์หลัก (Features)**

- **`Historical Data Query` :** ระบบดึงและแสดงผลข้อมูลย้อนหลังผ่าน SQL
- **`Alert Notification` :** ระบบแจ้งเตือนสถานะความผิดปกติผ่าน LINE Notify

**กระบวนการทำงานของข้อมูล (Detailed Data Flow)**

1. **`Data Acquisition (Edge Layer)`**
   อุปกรณ์ Sensors และ PLCs ทำหน้าที่เก็บข้อมูลดิบ (Raw Data) จากการทำงานของเครื่องจักร และส่งข้อมูลไปยัง IoT Gateway (V-Box)
2. **`Data Ingestion (Cloud Upload)`**
   อุปกรณ์ V-Box ทำการส่งข้อมูลขึ้นสู่ระบบ Cloud (V-NET) แบบ Real-time โดยใช้โปรโตคอล V-NET ที่มีความปลอดภัยสูง
3. **`Data Processing and Storage`**
   Node-RED ทำการเชื่อมต่อกับ V-NET Cloud API เพื่อดึงข้อมูล (Pull/Receive) นำมาประมวลผล และบันทึกข้อมูลรูปแบบ Time-series ลงในฐานข้อมูล Microsoft SQL
4. **`Alerting and Notification`**
   ระบบ Node-RED (หรือ Backend) จะคอยตรวจสอบเงื่อนไขการแจ้งเตือน (Alert Conditions) หากพบความผิดปกติจะทำการส่งข้อความแจ้งเตือนไปยัง LINE Notify ทันที
5. **`Data Visualization (Dashboard)`**
   หน้า Dashboard (พัฒนาด้วย React) จะทำการร้องขอข้อมูล (Request) ไปยัง Backend (Node/Express) ซึ่งจะไปดึงข้อมูลจาก Microsoft SQL และใช้เทคนิค Polling เพื่อจำลองการแสดงผลข้อมูลให้เป็นแบบ Real-time
