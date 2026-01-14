# SAP Auto Invoice

![RPA.png](RPA.png)

**Project Overview:**
พัฒนาระบบ Robotic Process Automation (RPA) เพื่อเปลี่ยนกระบวนการออกใบแจ้งหนี้ (Billing) ในระบบ SAP ให้เป็นอัตโนมัติ 100% ตั้งแต่ขั้นตอนการรับคำสั่งซื้อไปจนถึงการส่งเอกสารให้ลูกค้าทางอีเมล โปรเจกต์นี้ช่วยลดระยะเวลาการทำงานซ้ำซ้อน (Repetitive Tasks) ลดความผิดพลาดจากการป้อนข้อมูล (Human Error) และทำให้กระบวนการ Billing รวดเร็วและแม่นยำยิ่งขึ้น

**Key Features:**

- **Automated Order Processing:** บอททำการสร้าง Sales Order (SO) และ Scheduling Agreement (SA) ในระบบ SAP โดยอัตโนมัติเมื่อได้รับ Trigger
- **Seamless Inventory Transaction:** จัดการกระบวนการตัดสต็อก (Post Good Issue) และออกใบส่งของ (Delivery Order - DO) โดยไม่ต้องใช้คนกดอนุมัติทีละรายการ
- **Billing & Distribution:** ระบบทำการ Create Billing และส่งไฟล์ Invoice ไปยังลูกค้าทาง Email ทันทีเมื่อกระบวนการเสร็จสิ้น
- **Error Handling:** มีระบบแจ้งเตือนเมื่อเกิดข้อผิดพลาดระหว่างกระบวนการ SAP

**RPA Tools & Technologies:**

- **RPA Tool:** Microsoft Power Automate, Python, iRPA (SAP iRPA)
- **Target Application:** SAP ERP / S/4HANA