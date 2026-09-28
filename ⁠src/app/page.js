'use client'
import { useState } from 'react';
import Link from 'next/link';

export default function LandingPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const res = await fetch('/api/analyze-skin', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error("Error analyzing skin:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-pink-100 flex flex-col items-center justify-between p-6 text-gray-700 font-sans">
      
      {/* ส่วนหัว: หัวข้อเว็บฟ้อนต์ตัวใหญ่ น่ารัก */}
      <div className="w-full max-w-md text-center mt-6">
        <span className="bg-pink-200 text-pink-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
          ✨ AI Skincare Assistant ✨
        </span>
        <h1 className="text-4xl font-extrabold text-pink-600 mt-3 tracking-wide drop-shadow-sm">
          Glow & Care 🌸
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          เช็กสภาพผิวหน้าของคุณแบบ Lemon8 ง่ายๆ แค่ปลายนิ้ว
        </p>
      </div>

      {/* ส่วนรูปการ์ตูนสาวๆ แนวดูแลผิวหน้า (สี่ห้าคาแรคเตอร์น่ารักๆ) */}
      <div className="w-full max-w-md my-6 bg-white/60 backdrop-blur-md p-4 rounded-3xl shadow-sm border border-pink-100 flex flex-col items-center">
        <p className="text-xs font-medium text-pink-400 mb-3">💖 เคล็ดลับผิวสวยใสฉบับสาวๆ</p>
        
        {/* รูปการ์ตูนตัวอย่างแนวดูแลผิวหน้า */}
        <div className="grid grid-cols-4 gap-3 w-full">
          <div className="flex flex-col items-center bg-pink-50 p-2 rounded-2xl">
            <span className="text-2xl">🧖‍♀️</span>
            <span className="text-[10px] text-gray-500 mt-1">มาสก์หน้า</span>
          </div>
          <div className="flex flex-col items-center bg-purple-50 p-2 rounded-2xl">
            <span className="text-2xl">🧴</span>
            <span className="text-[10px] text-gray-500 mt-1">ทาครีม</span>
          </div>
          <div className="flex flex-col items-center bg-pink-50 p-2 rounded-2xl">
            <span className="text-2xl">💧</span>
            <span className="text-[10px] text-gray-500 mt-1">ดื่มน้ำ</span>
          </div>
          <div className="flex flex-col items-center bg-purple-50 p-2 rounded-2xl">
            <span className="text-2xl">✨</span>
            <span className="text-[10px] text-gray-500 mt-1">ผิวใส</span>
          </div>
        </div>
      </div>

      {/* ส่วนปุ่มถ่ายรูป/อัปโหลดหลัก (มินิมอล โทนพาสเทล) */}
      <div className="w-full max-w-md bg-white p-6 rounded-3xl shadow-xl border border-pink-100 flex flex-col items-center">
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center space-y-4">
          
          <label className="w-full border-2 border-dashed border-pink-300 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer bg-pink-50/50 hover:bg-pink-50 transition">
            <div className="w-12 h-12 rounded-full bg-pink-200 flex items-center justify-center text-pink-600 mb-2 shadow-inner">
              📷
            </div>
            <span className="text-sm font-medium text-gray-600">แตะเพื่อถ่ายรูป หรือเลือกภาพใบหน้า</span>
            <span className="text-xs text-gray-400 mt-1">(รองรับทั้งมือถือและไอแพด)</span>
            
            <input 
              type="file" 
              accept="image/*" 
              capture="user" 
              onChange={handleImageChange} 
              className="hidden" 
            />
          </label>

          {/* พรีวิวรูปภาพที่ถ่าย */}
          {previewUrl && (
            <div className="w-full rounded-2xl overflow-hidden shadow-md border-2 border-pink-200">
              <img src={previewUrl} alt="Face Preview" className="w-full h-56 object-cover" />
            </div>
          )}

          {/* ปุ่มกดเริ่มวิเคราะห์ */}
          {selectedImage && (
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-2xl shadow-md transition transform active:scale-95"
            >
              {loading ? '🪄 กำลังวิเคราะห์ผิวหน้า...' : '✨ เริ่มสแกนผิวหน้าเลย'}
            </button>
          )}
        </form>

        {/* แสดงผลลัพธ์หลังจาก AI วิเคราะห์เสร็จ */}
        {result && (
          <div className="w-full mt-6 bg-pink-50 p-4 rounded-2xl border border-pink-200 text-left">
            <h2 className="font-bold text-pink-600 text-md">🌸 รายงานสภาพผิวของคุณ</h2>
            <p className="text-sm mt-1">คะแนนผิว: <span className="font-bold text-pink-700">{result.skinScore} คะแนน</span></p>
            <p className="text-sm">ประเภทผิว: <span className="font-bold text-pink-700">{result.skinType}</span></p>
          </div>
        )}
      </div>

      {/* ส่วนท้ายเว็บ */}
      <footer className="w-full text-center py-4 text-xs text-gray-400 mt-6">
        Made with 💖 for Student Project
      </footer>
    </main>
  );
}
