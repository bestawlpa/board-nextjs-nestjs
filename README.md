โปรเจคนี้เป็นแอปพลิเคชันเว็บแบบ Full-Stack ที่ใช้ Next.js สำหรับฝั่ง Frontend และ NestJS สำหรับฝั่ง Backend เป็น(Forum App) ที่ให้ผู้ใช้สามารถสร้าง ดู และแสดงความคิดเห็นในกระทู้ได้ ผู้ใช้จำเป็นต้องเข้าสู่ระบบเพื่อสร้างกระทู้หรือแสดงความคิดเห็น

ข้อกำหนดเบื้องต้น
Node.js (v14+)
npm
MongoDB

ติดตั้ง dependencies

# Frontend (Next.js)

cd board
npm install

# Backend (NestJS)

cd backend
npm install

รันแอปพลิเคชัน

# Frontend (Next.js)

cd board
npm run dev

# Backend (NestJS)

cd backend
npm run start:dev

ฟีเจอร์ของแอป

1. หน้าแสดงกระทู้ (Board Page)
   แสดงรายการกระทู้ทั้งหมดพร้อมหัวเรื่องและคำอธิบายสั้น ๆ
   ทุกคนสามารถเข้าถึงได้โดยไม่ต้องเข้าสู่ระบบ
2. หน้าสร้างกระทู้ใหม่
   สำหรับผู้ใช้ที่เข้าสู่ระบบแล้วสามารถสร้างกระทู้ใหม่ได้
   ต้องเข้าสู่ระบบก่อนถึงจะสร้างกระทู้ได้
3. หน้ารายละเอียดกระทู้และความคิดเห็น
   แสดงรายละเอียดของกระทู้ที่เลือก
   ด้านล่างของกระทู้ จะแสดงรายการความคิดเห็น
   ผู้ใช้ที่เข้าสู่ระบบสามารถเพิ่มความคิดเห็นในกระทู้ได้
4. การยืนยันตัวตนของผู้ใช้
   ผู้ใช้ที่ไม่ได้เข้าสู่ระบบสามารถดูรายการกระทู้ได้ แต่ต้องเข้าสู่ระบบก่อนถึงจะสามารถสร้างกระทู้หรือแสดงความคิดเห็นได้

\*\*
รบกวนแนะนำเพิ่มเติมและแนะนำแนวทางการทำ unittest หน่อยครับ เนื่องจากยังไม่เคยทำ เพื่อเป็นแนวทางให้พัฒนาต่อไปด้วยครับ
