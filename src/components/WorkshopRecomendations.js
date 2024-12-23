import "../styles.css";
import React, { useEffect, useState } from "react";
import { db } from "../firebase"; // ดึง Firebase ที่ตั้งค่าไว้
import { collection, query, where, getDocs } from "firebase/firestore";
import WorkshopRecommendationBox from "./WorkshopRecomendationBox";

function WorkshopRecommendations() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // อ้างอิง collection event ใน Firestore
        const eventRef = collection(db, "event");

        // Query สำหรับดึงข้อมูลโดยฟิลเตอร์ rating >= 4
        const q = query(
          eventRef,
          where("rating", ">=", "4") // กรองอีเวนต์ที่มี rating ตั้งแต่ "4" ขึ้นไป
        );

        const querySnapshot = await getDocs(q);

        // จัดกลุ่มข้อมูลเป็น array และกรองเฉพาะที่มี bannerImage
        const eventList = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.bannerImage) { // กรองข้อมูลที่ไม่มี bannerImage
            eventList.push({ id: doc.id, ...data });
          }
        });

        // แปลง rating จาก string เป็น number และกรองเฉพาะที่มี rating >= 4
        const filteredEvents = eventList
          .map((event) => ({
            ...event,
            rating: parseFloat(event.rating), // แปลง rating จาก string เป็น number
          }))
          .filter((event) => event.rating >= 4); // กรองเฉพาะ rating >= 4

        // เรียงลำดับ events ตาม rating จากมากไปน้อย
        const sortedEvents = filteredEvents.sort((a, b) => b.rating - a.rating);

        // เลือก 15 อีเวนต์แรก
        const finalEvents = sortedEvents.slice(0, 15); // แสดง 15 อีเวนต์
        setEvents(finalEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="px-20">
      <div className="flex justify-center">
        <div className="bg-primary w-2 rounded-[50px] my-4 mr-2"></div>
        <h1 className="display2 text-primary">Workshop Recommendations</h1>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-8">
        {events.map((event) => (
          <WorkshopRecommendationBox
            key={event.id}
            image={event.bannerImage}
            title={event.eventNameEN}
            location={`${event.ampNameEN}, ${event.provNameEN}`}
            id={event.id}
          />
        ))}
      </div>
    </div>
  );
}

export default WorkshopRecommendations;
