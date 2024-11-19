import "../styles.css";
import React, { useEffect, useState } from "react";
import { db } from "../firebase"; // ดึง Firebase ที่ตั้งค่าไว้
import { collection, query, where, getDocs } from "firebase/firestore";
import WorkshopRecommendationBox from "./WorkshopRecomendationBox";

function WorkShop3Box() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // อ้างอิง collection event ใน Firestore
        const eventRef = collection(db, "event");
        
        // Query สำหรับดึงข้อมูลเฉพาะจังหวัด
        const q = query(
          eventRef,
          where("provNameEN", "in", ["Ang Thong"])
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

        // จัดกลุ่มข้อมูล และดึงมาเพียงจังหวัดละ 3 อีเวนต์
        const groupedEvents = {};
        eventList.forEach((event) => {
          if (!groupedEvents[event.provNameEN]) {
            groupedEvents[event.provNameEN] = [];
          }
          groupedEvents[event.provNameEN].push(event);
        });

        const finalEvents = Object.values(groupedEvents)
          .flatMap((events) => events.slice(0, 3)); // ดึงมาเพียง 3 อีเวนต์ต่อจังหวัด
        
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

export default WorkShop3Box;