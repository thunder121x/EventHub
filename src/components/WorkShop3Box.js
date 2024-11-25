import "../styles.css";
import React, { useEffect, useState } from "react";
import { db } from "../firebase"; // ดึง Firebase ที่ตั้งค่าไว้
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import WorkshopRecommendationBox from "./WorkshopRecomendationBox";

function WorkShop3Box() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // อ้างอิง collection event ใน Firestore
        const eventRef = collection(db, "event");

        // Query สำหรับดึงข้อมูลเรียงตาม rating มากไปน้อย และจำกัด 4 อีเวนต์
        const q = query(eventRef, orderBy("rating", "desc"), limit(4)); // เรียงลำดับตาม rating มากไปหาน้อย และจำกัด 3 รายการ

        const querySnapshot = await getDocs(q);

        // จัดกลุ่มข้อมูลเป็น array และกรองเฉพาะที่มี bannerImage
        const eventList = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.bannerImage) { // กรองข้อมูลที่ไม่มี bannerImage
            eventList.push({ id: doc.id, ...data });
          }
        });

        setEvents(eventList); // เก็บข้อมูลที่ได้ใน state
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  // ฟังก์ชันสำหรับเลื่อนไปที่ด้านบนสุด
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth" // ใช้ smooth scrolling
    });
  };

  // ฟังก์ชันที่เรียกเมื่อคลิกที่ WorkshopRecommendationBox
  const handleBoxClick = () => {
    scrollToTop(); // เลื่อนไปที่ด้านบนสุด
  };

  return (
    <div className="px-20">
      <div className="flex justify-center">
        <div className="bg-primary w-2 rounded-[50px] my-4 mr-2"></div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-8">
        {events.map((event) => (
          <div key={event.id} onClick={handleBoxClick}>
            <WorkshopRecommendationBox
              image={event.bannerImage}
              title={event.eventNameEN}
              location={`${event.ampNameEN}, ${event.provNameEN}`}
              id={event.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkShop3Box;
