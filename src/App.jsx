import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Plus, Trash2, DollarSign, TrendingUp, Calculator, Edit2, List, Palette, PieChart, Wallet, Check, X, ChevronDown, AlertTriangle, FileText, Download, Calendar, Filter, XCircle, History, ArrowLeft, ArrowRightCircle, LogOut, Upload, Menu, Settings } from 'lucide-react';

// --- CUSTOM HOOK: LOCAL STORAGE SYNC ---
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue, true];
};

// --- COMPONENTS ---

const CowAvatar = ({ mood, className = "w-48 h-48 sm:w-60 sm:h-60", uniqueId = "main" }) => {
  const isAngry = mood === 'angry';
  const isWarning = mood === 'warning';
  const isHappy = mood === 'happy'; 
  const isAnnoyed = mood === 'annoyed';
  const skinColor = isAngry ? "#fee2e2" : "#ffffff";
  const muzzleColor = isAngry ? "#fca5a5" : "#fbcfe8"; 
  const hornColor = "#9ca3af";
  const spotColor = "#2d3748";

  const safeId = uniqueId.replace(/[^a-zA-Z0-9-_]/g, '_');
  const clipId = `face-${safeId}`;
  const leftEarId = `lear-${safeId}`;
  const rightEarId = `rear-${safeId}`;

  return (
    <div className={`transition-all duration-500 transform ${isAngry || isWarning ? 'scale-105 sm:scale-110 animate-shake' : 'scale-100'} ${className} flex items-center justify-center`}>
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-lg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id={clipId}><rect x="50" y="50" width="100" height="100" rx="40" /></clipPath>
          <clipPath id={leftEarId}><ellipse cx="40" cy="95" rx="25" ry="18" transform="rotate(-20 40 95)"/></clipPath>
          <clipPath id={rightEarId}><ellipse cx="160" cy="95" rx="25" ry="18" transform="rotate(20 160 95)"/></clipPath>
        </defs>

        {isAngry && <circle cx="100" cy="100" r="90" fill="#fee2e2" className="animate-pulse" />}
        {isWarning && <circle cx="100" cy="100" r="90" fill="#ffedd5" className="animate-pulse" />}
        {isHappy && <circle cx="100" cy="100" r="90" fill="#dcfce7" className="animate-pulse" />}
        {isAnnoyed && <circle cx="100" cy="100" r="90" fill="#f3f4f6" className="animate-pulse" />}

        {/* Tanduk */}
        <path d="M55 75 Q 40 55 50 45 Q 60 45 70 70 Z" fill={hornColor} stroke="#000" strokeWidth="3" />
        <path d="M145 75 Q 160 55 150 45 Q 140 45 130 70 Z" fill={hornColor} stroke="#000" strokeWidth="3" />

        {/* Telinga */}
        <g>
            <ellipse cx="40" cy="95" rx="25" ry="18" fill={skinColor} stroke="#000" strokeWidth="3" transform="rotate(-20 40 95)"/>
            <g clipPath={`url(#${leftEarId})`}><path d="M20 90 Q 40 100 30 115 L 15 105 Z" fill={spotColor} opacity="0.95" /></g>
            <ellipse cx="40" cy="95" rx="25" ry="18" fill="none" stroke="#000" strokeWidth="3" transform="rotate(-20 40 95)"/>
        </g>
        <g>
            <ellipse cx="160" cy="95" rx="25" ry="18" fill={skinColor} stroke="#000" strokeWidth="3" transform="rotate(20 160 95)"/>
            <g clipPath={`url(#${rightEarId})`}><path d="M180 90 Q 160 100 170 115 L 185 105 Z" fill={spotColor} opacity="0.95" /></g>
            <ellipse cx="160" cy="95" rx="25" ry="18" fill="none" stroke="#000" strokeWidth="3" transform="rotate(20 160 95)"/>
        </g>
        
        {/* Wajah */}
        <g clipPath={`url(#${clipId})`}>
            <rect x="50" y="50" width="100" height="100" rx="40" fill={skinColor} />
            <path d="M50 40 Q 80 50 60 70 Q 40 80 30 60 Z" fill={spotColor} opacity="0.95" /> 
            <path d="M150 110 Q 120 120 140 140 Q 160 150 170 130 Z" fill={spotColor} opacity="0.95" /> 
        </g>
        <rect x="50" y="50" width="100" height="100" rx="40" fill="none" stroke="#000" strokeWidth="3" />

        {/* Moncong */}
        <ellipse cx="100" cy="125" rx="40" ry="22" fill={muzzleColor} stroke="#000" strokeWidth="3" />
        <circle cx="85" cy="125" r="4" fill={isAngry ? "#ef4444" : "#ec4899"} />
        <circle cx="115" cy="125" r="4" fill={isAngry ? "#ef4444" : "#ec4899"} />

        {/* Mata & Ekspresi */}
        {isAngry ? (
          <>
            <path d="M70 80 L 90 90" stroke="#000" strokeWidth="3" strokeLinecap="round" />
            <path d="M130 80 L 110 90" stroke="#000" strokeWidth="3" strokeLinecap="round" />
            <circle cx="80" cy="90" r="4" fill="#000" />
            <circle cx="120" cy="90" r="4" fill="#000" />
            <path d="M75 125 Q 60 140 50 135" stroke="#ef4444" strokeWidth="2" fill="none" className="animate-bounce" />
            <path d="M125 125 Q 140 140 150 135" stroke="#ef4444" strokeWidth="2" fill="none" className="animate-bounce" />
          </>
        ) : isWarning ? (
          <>
            <circle cx="80" cy="85" r="8" fill="#fff" stroke="#000" strokeWidth="2" />
            <circle cx="80" cy="85" r="3" fill="#000" />
            <circle cx="120" cy="85" r="8" fill="#fff" stroke="#000" strokeWidth="2" />
            <circle cx="120" cy="85" r="3" fill="#000" />
            <circle cx="100" cy="135" r="5" fill="#333" />
            {/* Tetesan Air Keringat */}
            <path d="M135 40 Q 145 55 145 62 A 10 10 0 1 1 125 62 Q 125 55 135 40 Z" fill="#3b82f6" opacity="0.9" />
            <path d="M132 55 Q 133 52 135 55" stroke="#fff" strokeWidth="2" fill="none" opacity="0.7" />
          </>
        ) : isHappy ? (
           <>
            <path d="M70 90 Q 80 80 90 90" stroke="#000" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M110 90 Q 120 80 130 90" stroke="#000" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M85 135 Q 100 150 115 135" stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round" />
            {/* Pipi Merona */}
           <circle cx="65" cy="105" r="6" fill="#fca5a5" opacity="0.6" />
            <circle cx="135" cy="105" r="6" fill="#fca5a5" opacity="0.6" />
           </>
        ) : isAnnoyed ? (
          <>
            <path d="M70 85 L 90 85" stroke="#000" strokeWidth="3" strokeLinecap="round" />
            <path d="M110 85 L 130 85" stroke="#000" strokeWidth="3" strokeLinecap="round" />
            <circle cx="80" cy="90" r="4" fill="#000" />
            <circle cx="120" cy="90" r="4" fill="#000" />
            <path d="M90 140 L 110 140" stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M65 75 L 95 75" stroke="#000" strokeWidth="2" strokeLinecap="round" />
            <path d="M105 75 L 135 75" stroke="#000" strokeWidth="2" strokeLinecap="round" />
          </>
        ) : (
          <>
            <circle cx="80" cy="85" r="5" fill="#000" />
             <circle cx="120" cy="85" r="5" fill="#000" />
            <circle cx="78" cy="83" r="2" fill="#fff" />
            <circle cx="118" cy="83" r="2" fill="#fff" />
            <path d="M90 135 Q 100 145 110 135" stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round" />
          </>
        )}
      </svg>
    </div>
  );
};

// --- HELPER: SVG PIE CHART ---
const SvgPieChart = ({ data, size = 120 }) => {
    if (!data || data.length === 0) return <div className="w-full h-full rounded-full bg-gray-200"></div>;

    const total = data.reduce((sum, item) => sum + item.value, 0);
    let cumulativePercent = 0;

    const getCoordinatesForPercent = (percent) => {
        const x = Math.cos(2 * Math.PI * percent);
        const y = Math.sin(2 * Math.PI * percent);
        return [x, y];
    };

    return (
        <svg viewBox="-1 -1 2 2" style={{ transform: 'rotate(-90deg)' }} className="w-full h-full">
            {data.map((slice, index) => {
                const start = cumulativePercent;
                const percent = slice.value / total;
                cumulativePercent += percent;
                const end = cumulativePercent;

                const [startX, startY] = getCoordinatesForPercent(start);
                const [endX, endY] = getCoordinatesForPercent(end);
                const largeArcFlag = percent > 0.5 ? 1 : 0;

                const pathData = [
                    `M 0 0`,
                    `L ${startX} ${startY}`,
                    `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
                    `Z`
                ].join(' ');

                const textAngle = start + percent / 2;
                const textRadius = 0.7; 
                const textX = Math.cos(2 * Math.PI * textAngle) * textRadius;
                const textY = Math.sin(2 * Math.PI * textAngle) * textRadius;
                const showText = percent > 0.05;

                return (
                    <g key={index}>
                        <path d={pathData} fill={slice.color} stroke="white" strokeWidth="0.02" />
                        {showText && (
                            <text
                                x={textX}
                                y={textY}
                                fill="white"
                                fontSize="0.15" 
                                fontWeight="bold"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                style={{ transform: `rotate(90deg)`, transformOrigin: `${textX}px ${textY}px` }} 
                                transform={`rotate(90, ${textX}, ${textY})`}
                            >
                                {Math.round(percent * 100)}%
                            </text>
                        )}
                    </g>
                );
            })}
        </svg>
    );
};

// --- SETTINGS MODAL ---
const SettingsModal = ({ isOpen, onClose, cutoffDay, setCutoffDay }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in backdrop-blur-sm">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden relative border-4 border-blue-200">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                         <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2"><Settings size={24} /> Pengaturan</h3>
                         <button onClick={onClose}><X size={24} className="text-gray-400 hover:text-gray-600" /></button>
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-bold text-gray-600 mb-2">Tanggal Mulai Pembukuan (Cutoff)</label>
                        <p className="text-xs text-gray-400 mb-3">Pilih tanggal gajian kamu. Laporan akan dihitung mulai dari tanggal ini setiap bulannya.</p>
                        <select 
                            value={cutoffDay} 
                            onChange={(e) => setCutoffDay(parseInt(e.target.value) || 1)} 
                            className="w-full p-3 rounded-xl border border-gray-300 font-bold text-lg bg-gray-50 focus:border-blue-500 focus:outline-none cursor-pointer"
                        >
                            {[...Array(28)].map((_, i) => (
                                <option key={i+1} value={i+1}>Tanggal {i+1}</option>
                            ))}
                        </select>
                    </div>
                    <button onClick={onClose} className="w-full py-3 rounded-xl bg-blue-500 font-bold text-white hover:bg-blue-600 shadow-lg">Simpan & Tutup</button>
                </div>
            </div>
        </div>
    );
}

const HistoryModal = ({ isOpen, onClose, archives, onLoadArchive, onDeleteArchive, currentMonthLabel }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative max-h-[80vh] flex flex-col">
        <div className="p-4 border-b flex justify-between items-center bg-gray-50">
          <h3 className="font-bold text-gray-800 flex items-center gap-2"><History size={20} /> Riwayat Laporan</h3>
          <button onClick={onClose}><X size={20} className="text-gray-400 hover:text-gray-600" /></button>
        </div>
        <div className="p-4 overflow-y-auto flex-1">
          {archives.length === 0 ? ( <div className="text-center py-8 text-gray-400"><p>Belum ada arsip laporan bulanan.</p></div> ) : (
            <div className="space-y-2">
              {archives.map((arch) => (
                <div key={arch.id} className="w-full p-2 pl-4 pr-2 rounded-xl border border-gray-100 hover:border-pink-300 hover:bg-pink-50 transition-all flex justify-between items-center group">
                  <div onClick={() => onLoadArchive(arch)} className="flex-1 text-left cursor-pointer">
                    <p className="font-bold text-gray-800">{arch.period}</p>
                    <p className="text-xs text-gray-500">Saldo: {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(arch.balance)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                      <button onClick={() => onLoadArchive(arch)} className="p-2 text-gray-300 hover:text-pink-500 transition-colors" title="Lihat & Edit"> <ChevronDown className="-rotate-90" size={20} /> </button>
                      <button onClick={(e) => { e.stopPropagation(); onDeleteArchive(arch.id); }} className="p-2 text-gray-300 hover:text-red-500 transition-colors" title="Hapus Arsip"> <Trash2 size={18} /> </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="p-4 bg-gray-50 border-t text-center text-xs text-gray-400"> Bulan Aktif: <span className="font-bold text-gray-600">{currentMonthLabel}</span> </div>
      </div>
    </div>
  );
};

const SummaryModal = ({ isOpen, onClose, totalBudget, totalExpenses, balance, theme }) => {
  if (!isOpen) return null;
  const isSurplus = balance >= 0;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={24} /></button>
        <div className={`p-6 text-center ${isSurplus ? 'bg-green-50' : 'bg-red-50'}`}>
           <h2 className="text-2xl font-bold text-gray-800 mb-2">Laporan Akhir Bulan</h2>
           <p className="text-sm text-gray-500">Ringkasan Keuangan MooMoney</p>
          <div className="mt-6 mb-4"><CowAvatar mood={isSurplus ? 'happy' : 'angry'} className="w-32 h-32 mx-auto" uniqueId="summary-cow" /></div>
           <p className={`text-lg font-bold ${isSurplus ? 'text-green-600' : 'text-red-600'} mb-6`}>{isSurplus ? "Moo~ Mantap! Kamu Hemat!" : "Moo... Kantong Jebol!"}</p>
        </div>
        <div className="p-6 space-y-4">
           <div className="flex justify-between items-center border-b border-dashed pb-2"><span className="text-gray-500">Total Pemasukan (Budget)</span><span className="font-bold text-gray-800">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalBudget)}</span></div>
            <div className="flex justify-between items-center border-b border-dashed pb-2"><span className="text-gray-500">Total Pengeluaran</span><span className="font-bold text-red-500">-{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalExpenses)}</span></div>
           <div className={`flex justify-between items-center pt-2 text-xl font-bold ${isSurplus ? 'text-green-600' : 'text-red-600'}`}><span>{isSurplus ? 'Sisa Tabungan' : 'Defisit / Hutang'}</span><span>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Math.abs(balance))}</span></div>
        </div>
        <div className="p-6 pt-0"><button onClick={onClose} className={`w-full py-3 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95 ${theme.bg} ${theme.hover}`}>Tutup Laporan</button></div>
      </div>
    </div>
  );
};

const NewMonthModal = ({ isOpen, onClose, onExport, onReset, monthName }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-in fade-in backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative border-4 border-pink-200">
        <div className="p-6 text-center bg-pink-50">
           <h2 className="text-2xl font-bold text-pink-600 mb-2 flex items-center justify-center gap-2">
             <Calendar size={28} /> Bulan Baru!
           </h2>
           <p className="text-sm text-gray-600">
             Moo! Sepertinya kita sudah masuk bulan <b>{monthName}</b>.
             Waktunya mengarsipkan data bulan lalu dan mulai lembaran baru yang bersih! ✨
           </p>
           <div className="mt-4">
             <CowAvatar mood="happy" className="w-24 h-24 mx-auto" uniqueId="new-month-cow" />
           </div>
        </div>
        <div className="p-6 space-y-3">
          <button onClick={onExport} className="w-full py-3 rounded-xl font-bold text-white bg-green-500 hover:bg-green-600 shadow-lg flex items-center justify-center gap-2"> <Download size={20} /> Unduh Laporan (Excel) </button>
          <button onClick={onReset} className="w-full py-3 rounded-xl font-bold text-white bg-pink-500 hover:bg-pink-600 shadow-lg"> Reset Data & Mulai Baru (Arsipkan Otomatis) </button>
          <button onClick={onClose} className="w-full py-2 text-xs font-bold text-gray-400 hover:text-gray-600"> Nanti Saja (Tetap di Data Lama) </button>
        </div>
      </div>
    </div>
  );
}

const ManualMonthChangeModal = ({ isOpen, onClose, onConfirm, newMonthName }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-in fade-in backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden relative border-4 border-orange-200">
         <div className="p-6 text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-500"> <ArrowRightCircle size={32} /> </div>
             <h3 className="text-xl font-bold text-gray-800 mb-2">Ganti ke {newMonthName}?</h3>
            <p className="text-sm text-gray-500 mb-6"> Kamu memasukkan tanggal di bulan baru. Sistem akan otomatis mengarsipkan data bulan ini ke Riwayat dan memulai lembaran baru untuk <b>{newMonthName}</b>. </p>
            <div className="flex gap-2">
              <button onClick={onClose} className="flex-1 py-2 rounded-xl border border-gray-300 font-bold text-gray-600 hover:bg-gray-50">Batal</button>
               <button onClick={onConfirm} className="flex-1 py-2 rounded-xl bg-orange-500 font-bold text-white hover:bg-orange-600 shadow-lg">Lanjut</button>
            </div>
         </div>
      </div>
    </div>
  );
}

const SapiFinanceApp = () => {
  // --- Constants ---
  const INITIAL_CATEGORIES = ['Kebutuhan Bulanan', 'Kebutuhan Mingguan', 'Buah', 'Snack', 'Tagihan', 'Skincare', 'Kesehatan', 'Sedekah', 'Transportasi', 'Lainnya'];
  const CATEGORY_UNITS = { 'Kebutuhan Bulanan': 'pcs', 'Kebutuhan Mingguan': 'pcs/kg', 'Buah': 'kg', 'Snack': 'pcs', 'Tagihan': '-', 'Skincare': 'pcs', 'Kesehatan': 'pcs', 'Sedekah': '-', 'Transportasi': 'kali', 'Lainnya': '-', 'Refill Galon': 'galon', 'Galon': 'galon' };
  const THEMES = {
    pink: { base: 'pink', hex: '#ec4899', name: 'Pink', bg: 'bg-pink-500', bgSoft: 'bg-pink-50', text: 'text-pink-600', border: 'border-pink-400', hover: 'hover:bg-pink-600', light: 'bg-pink-100', icon: 'text-pink-400', ring: 'focus:border-pink-500', table: { header: ['bg-pink-200', 'bg-pink-300', 'bg-pink-400', 'bg-pink-500', 'bg-pink-600', 'bg-pink-700', 'bg-pink-800'], cell: ['bg-pink-50', 'bg-pink-100', 'bg-pink-200', 'bg-pink-300', 'bg-pink-400', 'bg-pink-500', 'bg-pink-600'] } },
    blue: { base: 'blue', hex: '#3b82f6', name: 'Biru', bg: 'bg-blue-500', bgSoft: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-400', hover: 'hover:bg-blue-600', light: 'bg-blue-100', icon: 'text-blue-400', ring: 'focus:border-blue-500', table: { header: ['bg-blue-200', 'bg-blue-300', 'bg-blue-400', 'bg-blue-500', 'bg-blue-600', 'bg-blue-700', 'bg-blue-800'], cell: ['bg-blue-50', 'bg-blue-100', 'bg-blue-200', 'bg-blue-300', 'bg-blue-400', 'bg-blue-500', 'bg-blue-600'] } },
    green: { base: 'emerald', hex: '#10b981', name: 'Hijau', bg: 'bg-emerald-500', bgSoft: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-400', hover: 'hover:bg-emerald-600', light: 'bg-emerald-100', icon: 'text-emerald-400', ring: 'focus:border-emerald-500', table: { header: ['bg-emerald-200', 'bg-emerald-300', 'bg-emerald-400', 'bg-emerald-500', 'bg-emerald-600', 'bg-emerald-700', 'bg-emerald-800'], cell: ['bg-emerald-50', 'bg-emerald-100', 'bg-emerald-200', 'bg-emerald-300', 'bg-emerald-400', 'bg-emerald-500', 'bg-emerald-600'] } },
    purple: { base: 'purple', hex: '#8b5cf6', name: 'Ungu', bg: 'bg-purple-500', bgSoft: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-400', hover: 'hover:bg-purple-600', light: 'bg-purple-100', icon: 'text-purple-400', ring: 'focus:border-purple-500', table: { header: ['bg-purple-200', 'bg-purple-300', 'bg-purple-400', 'bg-purple-500', 'bg-purple-600', 'bg-purple-700', 'bg-purple-800'], cell: ['bg-purple-50', 'bg-purple-100', 'bg-purple-200', 'bg-purple-300', 'bg-purple-400', 'bg-purple-500', 'bg-purple-600'] } },
    orange: { base: 'orange', hex: '#f97316', name: 'Oranye', bg: 'bg-orange-500', bgSoft: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-400', hover: 'hover:bg-orange-600', light: 'bg-orange-100', icon: 'text-orange-400', ring: 'focus:border-orange-500', table: { header: ['bg-orange-200', 'bg-orange-300', 'bg-orange-400', 'bg-orange-500', 'bg-orange-600', 'bg-orange-700', 'bg-orange-800'], cell: ['bg-orange-50', 'bg-orange-100', 'bg-orange-200', 'bg-orange-300', 'bg-orange-400', 'bg-orange-500', 'bg-orange-600'] } },
  };
  const THEME_HUES = { pink: 330, blue: 217, green: 150, purple: 270, orange: 30 };
  const getCurrentMonthISO = () => new Date().toISOString().slice(0, 7);

  // --- STATE ---
  const [budget, setBudget] = useLocalStorage('moomoney_budget', 2000000);
  const [cutoffDay, setCutoffDay] = useLocalStorage('moomoney_cutoff', 1);
  const [themeKey, setThemeKey] = useLocalStorage('moomoney_theme', 'pink');
  const [categories, setCategories] = useLocalStorage('moomoney_categories', INITIAL_CATEGORIES);
  const [visibleBudgetCats, setVisibleBudgetCats] = useLocalStorage('moomoney_visibleBudgets', []);
  const [lastActiveMonth, setLastActiveMonth, isMonthLoaded] = useLocalStorage('moomoney_lastMonth', getCurrentMonthISO());
  const [archives, setArchives] = useLocalStorage('moomoney_archives', []);
  const [categoryBudgets, setCategoryBudgets] = useLocalStorage('moomoney_categoryBudgets', { 'Kebutuhan Bulanan': 0, 'Kebutuhan Mingguan': 0, 'Buah': 0, 'Snack': 0, 'Tagihan': 0, 'Skincare': 0, 'Kesehatan': 0, 'Sedekah': 0, 'Transportasi': 0, 'Lainnya': 0 });
  const [expenses, setExpenses] = useLocalStorage('moomoney_expenses', [
    { id: 1, date: new Date().toISOString().slice(0, 10), item: 'Beli Rumput Premium', category: 'Kebutuhan Bulanan', amount: 50000, qty: 1, unit: 'kg', isCustomCategory: false },
  ]);

  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [isAddingCat, setIsAddingCat] = useState(false); 
  const [isCreatingCustom, setIsCreatingCustom] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const newCatInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showMonthAlert, setShowMonthAlert] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  const [viewArchiveData, setViewArchiveData] = useState(null);
  const [filterCategory, setFilterCategory] = useState(null);
  const [showManualMonthAlert, setShowManualMonthAlert] = useState(false);
  const [pendingMonth, setPendingMonth] = useState(null);
  const [pendingRowId, setPendingRowId] = useState(null);
  const [pendingDateValue, setPendingDateValue] = useState(null);

  // --- HELPER: PERIOD CALCULATION (SAFE MODE) ---
  const getActivePeriodRange = () => {
      const today = new Date();
      const currentYear = today.getFullYear();
      const currentMonth = today.getMonth(); 
      const currentDay = today.getDate();
      
      const day = parseInt(cutoffDay) || 1;

      let start, end;
      if (currentDay >= day) {
          start = new Date(currentYear, currentMonth, day);
          end = new Date(currentYear, currentMonth + 1, day - 1);
      } else {
          start = new Date(currentYear, currentMonth - 1, day);
          end = new Date(currentYear, currentMonth, day - 1);
      }
      return { start, end };
  };

  const { start: periodStart, end: periodEnd } = getActivePeriodRange();
  
  // SAFE HEADER LABEL
  let headerMonthLabel = "Loading...";
  try {
      headerMonthLabel = `${periodStart.getDate()} ${periodStart.toLocaleDateString('id-ID', {month:'short'})} - ${periodEnd.getDate()} ${periodEnd.toLocaleDateString('id-ID', {month:'short'})} ${periodEnd.getFullYear()}`;
  } catch (e) {
      headerMonthLabel = "Periode Aktif";
  }

  // Filter Expenses by Active Period
  const activePeriodExpenses = useMemo(() => {
    if (viewArchiveData) return viewArchiveData.expenses;
    return expenses.filter(e => {
        if (!e.date) return false;
        const d = new Date(e.date);
        const checkDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
        const pStart = new Date(periodStart.getFullYear(), periodStart.getMonth(), periodStart.getDate());
        const pEnd = new Date(periodEnd.getFullYear(), periodEnd.getMonth(), periodEnd.getDate());
        return checkDate >= pStart && checkDate <= pEnd;
    });
  }, [expenses, periodStart, periodEnd, viewArchiveData]);

  // Derived Values
  const activeBudget = viewArchiveData ? viewArchiveData.budget : budget;
  const activeCategoryBudgets = viewArchiveData ? viewArchiveData.categoryBudgets : categoryBudgets;
  const totalExpenses = activePeriodExpenses.reduce((acc, curr) => acc + (parseFloat(curr.amount) || 0), 0);
  const balance = activeBudget - totalExpenses;
  const isOverBudget = totalExpenses > activeBudget;
  const currentTheme = THEMES[themeKey] || THEMES.pink;

  const expenseByCategory = useMemo(() => {
    const totals = {};
    activePeriodExpenses.forEach(e => {
      const amount = parseFloat(e.amount) || 0;
      const cat = e.category || 'Lainnya';
      totals[cat] = (totals[cat] || 0) + amount;
    });
    return totals;
  }, [activePeriodExpenses]);

  const overBudgetCategories = useMemo(() => {
    const catsToCheck = viewArchiveData ? Object.keys(activeCategoryBudgets) : (Array.isArray(visibleBudgetCats) ? visibleBudgetCats : []);
    return catsToCheck.filter(cat => {
      const bud = activeCategoryBudgets[cat] || 0;
      const spent = expenseByCategory[cat] || 0;
      return bud > 0 && spent > bud;
    });
  }, [visibleBudgetCats, activeCategoryBudgets, expenseByCategory, viewArchiveData]);

  const almostOverBudgetCategories = useMemo(() => {
    const catsToCheck = viewArchiveData ? Object.keys(activeCategoryBudgets) : (Array.isArray(visibleBudgetCats) ? visibleBudgetCats : []);
    return catsToCheck.filter(cat => {
      const bud = activeCategoryBudgets[cat] || 0;
      const spent = expenseByCategory[cat] || 0;
      return bud > 0 && spent >= (bud * 0.8) && spent <= bud;
    });
  }, [visibleBudgetCats, activeCategoryBudgets, expenseByCategory, viewArchiveData]);

  const filteredExpenses = useMemo(() => {
    let result = activePeriodExpenses;
    if (filterCategory) {
      result = activePeriodExpenses.filter(e => e.category === filterCategory);
    }
    return [...result].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [activePeriodExpenses, filterCategory]);

  // Effects & Handlers
  const hasCheckedRef = useRef(false);
  useEffect(() => {
    if (!isMonthLoaded || hasCheckedRef.current) return; 
    const currentISO = getCurrentMonthISO();
    if (lastActiveMonth && lastActiveMonth < currentISO && !showMonthAlert && !showManualMonthAlert) {
      setShowMonthAlert(true);
    }
    hasCheckedRef.current = true;
  }, [lastActiveMonth, showMonthAlert, showManualMonthAlert, isMonthLoaded]);

  useEffect(() => {
    if (window.XLSX) return;
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };
    Promise.all([
      loadScript("https://cdnjs.cloudflare.com/ajax/libs/exceljs/4.4.0/exceljs.min.js"),
      loadScript("https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js"),
      loadScript("https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js")
    ]).catch(e => console.error("Failed to load excel libraries", e));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Mood Logic
  let cowMood = 'normal';
  let cowMessage = 'Moo~ Aman nih !';
  let appBg = currentTheme.bgSoft;
  let headerBg = currentTheme.bg;
  let cardBorder = currentTheme.border;
  let progressBarColor = currentTheme.bg;
  let speechBubbleClass = `${currentTheme.border} ${currentTheme.text}`;

  if (isOverBudget) {
    cowMood = 'angry';
    cowMessage = "Moo!! Boros banget sih ! 😡";
    appBg = 'bg-red-50';
    headerBg = 'bg-red-500';
    cardBorder = 'border-red-500';
    progressBarColor = 'bg-red-600';
    speechBubbleClass = 'border-red-500 text-red-600 font-bold';
  } else if (overBudgetCategories.length > 0) {
    cowMood = 'warning';
    cowMessage = `Moo! Ada kebutuhan yang sudah over budget!`;
    appBg = 'bg-orange-50';
    speechBubbleClass = 'border-orange-400 text-orange-600 font-bold';
  } else if (almostOverBudgetCategories.length > 0) {
    cowMood = 'warning';
    cowMessage = `Moo! Ada kebutuhan yang hampir over budget.`;
    appBg = 'bg-yellow-50';
    speechBubbleClass = 'border-yellow-500 text-yellow-700 font-bold';
  } else if (balance < (activeBudget * 0.2) && activeBudget > 0) {
    cowMood = 'annoyed';
    cowMessage = "Moo... Uang Mulai Menipis nih";
    speechBubbleClass = `${currentTheme.border} ${currentTheme.text} font-extrabold text-lg border-4`;
  }
  
  if (viewArchiveData) {
     cowMessage = `Arsip: ${viewArchiveData.period}`;
     appBg = 'bg-gray-100';
  }

  // Chart Data
  const chartData = useMemo(() => {
    const data = {};
    let total = 0;
    activePeriodExpenses.forEach(e => {
      const amount = parseFloat(e.amount) || 0;
      if (amount > 0) {
        const cat = e.category || 'Tanpa Kategori';
        data[cat] = (data[cat] || 0) + amount;
        total += amount;
      }
    });
    const sortedEntries = Object.entries(data).sort(([,a], [,b]) => b - a);
    const baseHue = THEME_HUES[themeKey] || 330; 
    const count = sortedEntries.length;
    return sortedEntries.map(([name, value], index) => {
        const startL = 40; 
        const endL = 85;
        const step = count > 1 ? (endL - startL) / (count - 1) : 0;
        const l = startL + (step * index);
        return {
            name, value, 
            percentage: total > 0 ? ((value / total) * 100).toFixed(1) : 0,
            color: `hsl(${baseHue}, 85%, ${l}%)` 
        };
    });
  }, [activePeriodExpenses, themeKey]);

  const gradientString = useMemo(() => {
    if (chartData.length === 0) return 'conic-gradient(#e5e7eb 0% 100%)';
    let currentDeg = 0;
    const gradients = chartData.map(d => {
      const start = currentDeg;
      const percent = parseFloat(d.percentage);
      currentDeg += percent;
      return `${d.color} ${start}% ${currentDeg}%`;
    });
    return `conic-gradient(${gradients.join(', ')})`;
  }, [chartData]);

  // Handlers
  const updateArchive = (updatedData) => {
     if (!viewArchiveData) return;
     const newArchiveData = { ...viewArchiveData, ...updatedData };
     if (updatedData.expenses || updatedData.budget) {
         const exps = updatedData.expenses || newArchiveData.expenses;
         const bud = updatedData.budget !== undefined ? updatedData.budget : newArchiveData.budget;
         const newTotal = exps.reduce((acc, curr) => acc + (parseFloat(curr.amount) || 0), 0);
         newArchiveData.totalExpenses = newTotal;
         newArchiveData.balance = bud - newTotal;
     }
     setViewArchiveData(newArchiveData);
     const updatedArchives = archives.map(arc => arc.id === viewArchiveData.id ? newArchiveData : arc);
     setArchives(updatedArchives);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const inputs = Array.from(document.querySelectorAll('input:not([type="hidden"]), select'));
      const index = inputs.indexOf(e.target);
      if (index > -1 && index < inputs.length - 1) {
        const nextInput = inputs[index + 1];
        nextInput.focus(); if (nextInput.type === 'text' || nextInput.type === 'number') nextInput.select();
      }
    }
  };
  const formatNumber = (num) => new Intl.NumberFormat('id-ID').format(num);
  const formatRupiah = (number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
  
  const smartParseItem = (id, text) => { 
    if (!text) return; 
    let newQty = null;
    let newUnit = null; let newItemName = text; 
    const regexWithUnit = /(.*)\s+(\d+[\.,]?\d*)\s*(kg|g|gr|gram|liter|l|ml|pcs|buah|bks|bungkus|pak|kotak|dus|sak|ons|porsi|mangkok|gelas|cup|btl|botol|lusin|kodi|ikat|butir|galon|ekor)$/i; 
    const matchUnit = text.match(regexWithUnit);
    if (matchUnit) { 
        newItemName = matchUnit[1].trim(); 
        newQty = parseFloat(matchUnit[2].replace(',', '.')); 
        newUnit = matchUnit[3].toLowerCase();
    } 
    if (!newUnit) { const lowerItem = newItemName.toLowerCase(); if (lowerItem.includes('galon')) newUnit = 'galon';
    else if (lowerItem.includes('mi') || lowerItem.includes('nasi')) newUnit = 'porsi'; } 
    const updateLogic = row => { if (row.id === id) { return { ...row, item: newItemName, qty: newQty !== null ? newQty : row.qty, unit: newUnit !== null ? newUnit : row.unit }; } return row; };
    if (viewArchiveData) { updateArchive({ expenses: viewArchiveData.expenses.map(updateLogic) }); } else { setExpenses(expenses.map(updateLogic)); }
  };
  
  const handleCategoryBudgetChange = (cat, value) => { 
      const cleanValue = value.replace(/\D/g, '');
      const val = cleanValue ? parseFloat(cleanValue) : 0;
      if (viewArchiveData) { updateArchive({ categoryBudgets: { ...viewArchiveData.categoryBudgets, [cat]: val } }); } 
      else { setCategoryBudgets(prev => ({ ...prev, [cat]: val })); }
  };
  
  const handleMainBudgetChange = (value) => { 
      const cleanValue = value.replace(/\D/g, '');
      const val = cleanValue ? parseFloat(cleanValue) : 0;
      if (viewArchiveData) { updateArchive({ budget: val }); } else { setBudget(val); }
  };

  const handleAddCategoryToBudget = (catName) => {
    if (viewArchiveData) { updateArchive({ categoryBudgets: { ...viewArchiveData.categoryBudgets, [catName]: 0 } }); } 
    else { if (!visibleBudgetCats.includes(catName)) { setVisibleBudgetCats([...visibleBudgetCats, catName]); } }
    setIsAddingCat(false);
  };

  const handleRemoveCategoryFromBudget = (catName) => { 
      if (viewArchiveData) { const newCatBudgets = { ...viewArchiveData.categoryBudgets }; delete newCatBudgets[catName]; updateArchive({ categoryBudgets: newCatBudgets }); } 
      else { setVisibleBudgetCats(visibleBudgetCats.filter(c => c !== catName)); }
  };
  
  const handleToggleFilter = (cat) => { if (filterCategory === cat) { setFilterCategory(null); } else { setFilterCategory(cat); } };
  
  const handleAddCustomCategory = () => { 
    if (newCatName.trim()) {
        const name = newCatName.trim();
        if (!categories.includes(name)) setCategories([...categories, name]);
        if (viewArchiveData) { updateArchive({ categoryBudgets: { ...viewArchiveData.categoryBudgets, [name]: 0 } }); } 
        else { setVisibleBudgetCats([...visibleBudgetCats, name]); setCategoryBudgets(prev => ({ ...prev, [name]: 0 })); }
        setNewCatName(""); setIsCreatingCustom(false); setIsAddingCat(false);
    }
  };

  const handleChange = (id, field, value) => {
    if (!viewArchiveData && field === 'date' && value) {
        const inputMonth = value.slice(0, 7);
        if (inputMonth !== lastActiveMonth) { setPendingMonth(inputMonth); setPendingRowId(id); setPendingDateValue(value); setShowManualMonthAlert(true); return; }
    }
    const updateLogic = (row) => {
       if (row.id === id) {
        if (field === 'amount') { const cleanValue = value.replace(/\D/g, ''); return { ...row, [field]: cleanValue ? parseFloat(cleanValue) : 0 }; }
        return { ...row, [field]: value };
      }
      return row;
    };
    if (viewArchiveData) { updateArchive({ expenses: viewArchiveData.expenses.map(updateLogic) }); } else { setExpenses(expenses.map(updateLogic)); }
  };

  const handleConfirmManualSwitch = () => {
    const dateObj = new Date(lastActiveMonth + "-01");
    const monthLabel = dateObj.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
    const newArchive = { id: Date.now(), period: monthLabel, isoDate: lastActiveMonth, budget: budget, categoryBudgets: categoryBudgets, expenses: expenses, totalExpenses: totalExpenses, balance: balance };
    setArchives(prev => [newArchive, ...prev]);
    const triggeringRow = expenses.find(e => e.id === pendingRowId) || {};
    const newRow = { id: 1, date: pendingDateValue, item: triggeringRow.item || '', category: triggeringRow.category || 'Lainnya', amount: triggeringRow.amount || 0, qty: triggeringRow.qty || 1, unit: triggeringRow.unit || '-' };
    setExpenses([newRow]); setLastActiveMonth(pendingMonth); setShowManualMonthAlert(false); setPendingMonth(null); setPendingRowId(null); setPendingDateValue(null);
  };

  const handleAddRow = () => { 
      const targetList = viewArchiveData ? viewArchiveData.expenses : expenses;
      const newId = targetList.length > 0 ? Math.max(...targetList.map(e => e.id)) + 1 : 1; 
      const today = new Date().toISOString().slice(0, 10);
      let defaultDate = today;
      if (targetList.length > 0) { const maxDate = targetList.reduce((max, p) => p.date > max ? p.date : max, targetList[0].date); defaultDate = maxDate; }
      const newRow = { id: newId, date: defaultDate, item: '', category: 'Lainnya', amount: 0, qty: 1, unit: '-', isCustomCategory: false };
      if(viewArchiveData) { updateArchive({ expenses: [newRow, ...targetList] }); } else { setExpenses([newRow, ...targetList]); }
  };
  const handleDeleteRow = (id) => { if (viewArchiveData) { updateArchive({ expenses: viewArchiveData.expenses.filter(row => row.id !== id) }); } else { setExpenses(expenses.filter(row => row.id !== id)); } };
  const toggleCategoryMode = (id) => { const updateLogic = row => { if (row.id === id) { return { ...row, isCustomCategory: !row.isCustomCategory, category: '' }; } return row; }; if (viewArchiveData) { updateArchive({ expenses: viewArchiveData.expenses.map(updateLogic) }); } else { setExpenses(expenses.map(updateLogic)); } };
  const handleDeleteArchive = (id) => { setArchives(archives.filter(a => a.id !== id)); if (viewArchiveData && viewArchiveData.id === id) { setViewArchiveData(null); } };
  const handleLoadArchive = (archivedData) => { setViewArchiveData(archivedData); setShowHistory(false); };
  const handleBackToCurrent = () => { setViewArchiveData(null); };
  const handleArchiveAndReset = () => { 
      const dateObj = new Date(lastActiveMonth + "-01");
      const monthLabel = dateObj.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
      const newArchive = { id: Date.now(), period: monthLabel, isoDate: lastActiveMonth, budget: budget, categoryBudgets: categoryBudgets, expenses: expenses, totalExpenses: totalExpenses, balance: balance };
      setArchives(prev => [newArchive, ...prev]); setExpenses([]); setLastActiveMonth(getCurrentMonthISO()); setShowMonthAlert(false); 
  };
  const handleResetData = handleArchiveAndReset; 
  const handleKeepData = () => { setLastActiveMonth(getCurrentMonthISO()); setShowMonthAlert(false); };
  const exportToExcel = async () => { if (!window.ExcelJS || !window.saveAs) { alert("Sistem Excel sedang dimuat..."); return; } const workbook = new window.ExcelJS.Workbook(); const worksheet = workbook.addWorksheet('Laporan'); const colorHex = currentTheme.hex.replace('#', ''); const argb = 'FF' + colorHex; const headerFill = { type: 'pattern', pattern: 'solid', fgColor: { argb: argb } }; const whiteFont = { name: 'Arial', color: { argb: 'FFFFFFFF' }, bold: true }; const titleFont = { name: 'Arial', size: 16, bold: true, color: { argb: argb } }; worksheet.mergeCells('A1:G1'); const title = worksheet.getCell('A1'); title.value = `Laporan MooMoney - ${viewArchiveData ? viewArchiveData.period : headerMonthLabel}`; title.font = titleFont; title.alignment = { horizontal: 'center' }; worksheet.addRow([]); const sumRows = [['Total Pemasukan', activeBudget], ['Total Pengeluaran', totalExpenses], ['Sisa Saldo', balance]]; sumRows.forEach((d, i) => { const r = worksheet.addRow(['', d[0], d[1]]); r.getCell(3).numFmt = '"Rp"#,##0'; if(i===1) r.getCell(3).font = {color:{argb:'FFFF0000'}, bold:true}; if(i===2) r.getCell(3).font = {color:{argb:balance>=0?'FF008000':'FFFF0000'}, bold:true}; }); worksheet.addRow([]); const head = worksheet.addRow(['No', 'Tanggal', 'Deskripsi', 'Qty', 'Kategori', 'Jumlah']); head.eachCell(c => { c.fill=headerFill; c.font=whiteFont; }); activePeriodExpenses.forEach((item, idx) => { const r = worksheet.addRow([idx+1, item.date, item.item, `${item.qty} ${item.unit||''}`, item.category, item.amount]); r.getCell(6).numFmt = '"Rp"#,##0'; }); const buffer = await workbook.xlsx.writeBuffer(); const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }); window.saveAs(blob, `MooMoney_Laporan.xlsx`); };
  
  // FIX: MOBILE IMPORT LABEL
  const handleFileImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!window.XLSX) { alert("Sistem Excel belum siap. Coba lagi sebentar."); return; }
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = new Uint8Array(evt.target.result);
        const wb = window.XLSX.read(data, { type: 'array' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const dataJson = window.XLSX.utils.sheet_to_json(ws, { header: 1 });
        let headerIndex = -1;
        for(let i=0; i<Math.min(dataJson.length, 20); i++) {
            const rowStr = dataJson[i] ? dataJson[i].join(' ').toLowerCase() : '';
            if (rowStr.includes('tanggal') && rowStr.includes('jumlah')) { headerIndex = i; break; }
        }
        if (headerIndex === -1) { alert("Format file tidak dikenali. Pastikan menggunakan file Excel dari MooMoney."); return; }
        const headers = dataJson[headerIndex];
        const rows = dataJson.slice(headerIndex + 1);
        const dateIdx = headers.indexOf('Tanggal');
        const itemIdx = headers.indexOf('Deskripsi');
        const qtyIdx = headers.indexOf('Qty');
        const catIdx = headers.indexOf('Kategori');
        const amtIdx = headers.indexOf('Jumlah');
        if (dateIdx === -1 || itemIdx === -1 || amtIdx === -1) { alert("Kolom penting (Tanggal, Deskripsi, Jumlah) tidak ditemukan."); return; }
        const groupedExpenses = {};
        rows.forEach((row) => {
            if (!row[dateIdx]) return;
            const rawQtyStr = row[qtyIdx] || "1";
            let qty = 1, unit = '-';
            if (typeof rawQtyStr === 'string') {
                const qtyMatch = rawQtyStr.match(/^([\d\.,]+)\s*(.*)$/);
                if (qtyMatch) { qty = parseFloat(qtyMatch[1].replace(',', '.')) || 1; unit = qtyMatch[2] ? qtyMatch[2].trim() : '-'; }
            } else if (typeof rawQtyStr === 'number') { qty = rawQtyStr; }
            let amount = 0;
            if (typeof row[amtIdx] === 'number') { amount = row[amtIdx]; } else { amount = parseFloat(String(row[amtIdx]||0).replace(/[^\d]/g, '')) || 0; }
            let dateStr = row[dateIdx];
            if (typeof dateStr === 'number') { const jsDate = new Date(Math.round((dateStr - 25569)*86400*1000)); if (!isNaN(jsDate)) { dateStr = jsDate.toISOString().split('T')[0]; } else { dateStr = new Date().toISOString().split('T')[0]; } }
            if (!dateStr || amount <= 0) return;
            const monthKey = dateStr.slice(0, 7);
            if (!groupedExpenses[monthKey]) { groupedExpenses[monthKey] = []; }
            groupedExpenses[monthKey].push({ id: Date.now() + Math.random(), date: dateStr, item: row[itemIdx] || 'Item Impor', category: row[catIdx] || 'Lainnya', amount: amount, qty: qty, unit: unit || '-', isCustomCategory: false });
        });
        const activeMonth = viewArchiveData ? viewArchiveData.isoDate : lastActiveMonth;
        let addedToCurrent = 0, addedToArchive = 0, createdArchive = 0;
        Object.keys(groupedExpenses).forEach(monthKey => {
            const expenseList = groupedExpenses[monthKey];
            if (monthKey === activeMonth) {
                if (viewArchiveData) { updateArchive({ expenses: [...viewArchiveData.expenses, ...expenseList] }); } 
                else { setExpenses(prev => [...prev, ...expenseList]); }
                addedToCurrent += expenseList.length;
            } else {
                const existingArchive = archives.find(a => a.isoDate === monthKey);
                if (existingArchive) {
                    const updatedExpenses = [...existingArchive.expenses, ...expenseList];
                    const newTotal = updatedExpenses.reduce((acc, curr) => acc + curr.amount, 0);
                    const newArchiveData = { ...existingArchive, expenses: updatedExpenses, totalExpenses: newTotal, balance: existingArchive.budget - newTotal };
                    setArchives(prev => prev.map(a => a.id === existingArchive.id ? newArchiveData : a));
                    addedToArchive += expenseList.length;
                } else {
                    const dateObj = new Date(monthKey + "-01");
                    const monthLabel = dateObj.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
                    const totalAmt = expenseList.reduce((acc, curr) => acc + curr.amount, 0);
                    const newArchive = { id: Date.now() + Math.random(), period: monthLabel, isoDate: monthKey, budget: 0, categoryBudgets: { ...categoryBudgets }, expenses: expenseList, totalExpenses: totalAmt, balance: 0 - totalAmt };
                    setArchives(prev => [newArchive, ...prev]);
                    createdArchive += 1;
                }
            }
        });
        alert(`Impor Selesai!\n- Ditambahkan ke Tampilan Ini: ${addedToCurrent} item\n- Ditambahkan ke Arsip Lama: ${addedToArchive} item\n- Arsip Baru Dibuat: ${createdArchive}`);
      } catch (err) { console.error(err); alert("Gagal membaca file Excel. Pastikan file tidak rusak."); }
    };
    reader.readAsArrayBuffer(file);
    e.target.value = null;
  };
  
  const handleImportClick = () => { if (fileInputRef.current) { fileInputRef.current.click(); } };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 pb-20 ${appBg}`}>
      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} cutoffDay={cutoffDay} setCutoffDay={setCutoffDay} />
      <NewMonthModal isOpen={showMonthAlert} onClose={handleKeepData} onExport={exportToExcel} onReset={handleArchiveAndReset} monthName={new Date().toLocaleDateString('id-ID', { month: 'long' })} />
      <ManualMonthChangeModal isOpen={showManualMonthAlert} onClose={() => setShowManualMonthAlert(false)} onConfirm={handleConfirmManualSwitch} newMonthName={pendingMonth ? new Date(pendingMonth + "-01").toLocaleDateString('id-ID', { month: 'long', year: 'numeric' }) : ''} />
      <SummaryModal isOpen={showSummary} onClose={() => setShowSummary(false)} totalBudget={activeBudget} totalExpenses={totalExpenses} balance={balance} theme={currentTheme} />
      <HistoryModal isOpen={showHistory} onClose={() => setShowHistory(false)} archives={archives} onLoadArchive={handleLoadArchive} onDeleteArchive={handleDeleteArchive} currentMonthLabel={headerMonthLabel} />

      {/* Hidden File Input for Import - CRITICAL FIX FOR MOBILE: USE OPACITY 0 INSTEAD OF HIDDEN */}
      <input 
        id="import-excel-input"
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileImport} 
        accept=".xlsx, .xls" 
        style={{ opacity: 0, position: 'absolute', zIndex: -1, width: 1, height: 1 }}
      />

      <div className={`w-full px-4 py-3 md:p-4 shadow-md transition-colors duration-300 ${headerBg} text-white sticky top-0 z-30`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="bg-white p-1 rounded-full shadow-sm overflow-hidden">
              <CowAvatar mood="happy" className="w-8 h-8 md:w-10 md:h-10" uniqueId="header-logo" />
            </div>
            <div><h1 className="text-lg md:text-2xl font-bold tracking-wide leading-tight">MooMoney</h1><p className="text-[10px] md:text-xs opacity-90 font-medium">{viewArchiveData ? 'Arsip Laporan' : `Periode: ${headerMonthLabel}`}</p></div>
          </div>
          
          <div className="flex items-center gap-2">
            {viewArchiveData && ( <button onClick={handleBackToCurrent} className="bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 animate-pulse"> <ArrowLeft size={16} /> KEMBALI </button> )}
            
            {/* BUTTONS (Visible on both Desktop & Mobile) */}
            <div className="flex gap-2">
                <button onClick={() => setShowHistory(true)} className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors flex items-center gap-1" title="Riwayat"><History size={18} /></button>
                <button onClick={() => setShowSettings(true)} className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors flex items-center gap-1" title="Pengaturan"><Settings size={18} /></button>
                
                 {/* THEME BUTTON */}
                 <div className="relative">
                    <button onClick={() => setShowThemeSelector(!showThemeSelector)} className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors flex items-center gap-1" title="Ganti Tema">
                        <Palette size={18} />
                    </button>
                    {showThemeSelector && (
                        <div className="absolute right-0 top-12 bg-white text-gray-800 rounded-xl shadow-xl p-3 w-40 z-50 animate-in fade-in slide-in-from-top-2 border border-gray-100">
                            <div className="grid grid-cols-1 gap-1">
                                {Object.entries(THEMES).map(([key, theme]) => (
                                    <button key={key} onClick={() => { setThemeKey(key); setShowThemeSelector(false); }} className={`flex items-center gap-2 px-2 py-1.5 rounded text-sm hover:bg-gray-100 ${themeKey === key ? 'font-bold bg-gray-50' : ''}`}>
                                        <div className={`w-4 h-4 rounded-full ${theme.bg}`}></div> {theme.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                 </div>

                {/* Desktop Specific */}
                <button onClick={() => setShowSummary(true)} className="hidden md:flex p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors items-center gap-1" title="Laporan"><FileText size={18} /></button>
                <button onClick={exportToExcel} className="hidden md:flex p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors items-center gap-1" title="Excel"><Download size={18} /></button>
                <button onClick={handleImportClick} className="hidden md:flex p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors items-center gap-1" title="Import Excel"><Upload size={18} /></button>
            </div>

            {/* Mobile Hamburger Menu */}
            <div className="md:hidden relative" ref={mobileMenuRef}>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors text-white">
                    <Menu size={24} />
                </button>
                
                {isMobileMenuOpen && (
                    <div className="absolute right-0 top-12 bg-white text-gray-800 rounded-xl shadow-xl p-2 w-48 z-50 border border-gray-100 animate-in fade-in slide-in-from-top-2">
                         <div className="flex flex-col gap-1">
                            <button onClick={() => { setShowSummary(true); setIsMobileMenuOpen(false); }} className="px-3 py-2 text-left text-sm hover:bg-gray-100 rounded-lg flex items-center gap-2"><FileText size={16}/> Laporan</button>
                            <button onClick={() => { exportToExcel(); setIsMobileMenuOpen(false); }} className="px-3 py-2 text-left text-sm hover:bg-gray-100 rounded-lg flex items-center gap-2"><Download size={16}/> Download Excel</button>
                            {/* MOBILE IMPORT: USE LABEL FOR NATIVE FILE TRIGGER */}
                            <label htmlFor="import-excel-input" className="px-3 py-2 text-left text-sm hover:bg-gray-100 rounded-lg flex items-center gap-2 cursor-pointer"><Upload size={16}/> Import Excel</label>
                         </div>
                    </div>
                )}
            </div>

          </div>
        </div>
      </div>
      
      {/* ... (Rest of the UI remains the same) ... */}
      <div className="max-w-7xl mx-auto p-3 md:p-6 lg:p-8">
        {viewArchiveData && ( <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 rounded shadow-sm"> <p className="font-bold flex items-center gap-2"><History size={18}/> Mode Arsip: {viewArchiveData.period}</p> <p className="text-xs">Data masa lalu (Dapat diedit).</p> </div> )}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className={`bg-white rounded-3xl shadow-lg p-4 md:p-6 flex flex-col items-center justify-center border-4 ${cardBorder} text-center relative overflow-visible mt-6 lg:mt-0 transition-colors`}>
            <div className={`absolute -top-6 lg:top-4 right-1/2 translate-x-1/2 lg:translate-x-0 lg:right-4 w-max max-w-[90%] bg-white border-2 px-3 py-2 md:px-4 md:py-2 rounded-xl rounded-b-none lg:rounded-bl-none lg:rounded-b-xl shadow-sm z-10 transition-colors text-sm md:text-base ${speechBubbleClass}`}>{cowMessage}</div>
            <CowAvatar mood={cowMood} uniqueId="main-cow" />
            <div className={`mt-2 md:mt-4 font-bold text-base md:text-lg ${cowMood === 'angry' ? 'text-red-600' : cowMood === 'warning' ? 'text-orange-600' : 'text-gray-700'}`}>Status: {cowMood === 'angry' ? 'BAHAYA' : cowMood === 'warning' ? 'WASPADA' : 'AMAN'}</div>
          </div>
          <div className="lg:col-span-2 flex flex-col gap-4">
              <div className={`grid grid-cols-1 ${totalExpenses > 0 ? 'md:grid-cols-2' : ''} gap-4`}>
              <div className={`bg-white rounded-2xl shadow-lg p-4 md:p-6 border-l-8 ${cardBorder} transition-colors flex flex-col justify-center`}>
                <h2 className="text-gray-500 text-xs md:text-sm font-semibold uppercase tracking-wider mb-2">Target Budget Bulanan</h2>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                  <div className={`hidden sm:block p-3 rounded-full ${isOverBudget ? 'bg-red-100 text-red-600' : `${currentTheme.light} ${currentTheme.text}`}`}> <TrendingUp size={24} /> </div>
                  <div className="flex-1 w-full"> <label className="text-[10px] md:text-xs text-gray-400 block mb-1">Ketuk angka untuk edit</label> <div className="relative w-full"> <span className="absolute left-0 bottom-2 text-lg md:text-2xl font-bold text-gray-400">Rp</span> <input type="text" inputMode="numeric" value={activeBudget === 0 ? '' : formatNumber(activeBudget)} placeholder="0" onChange={(e) => handleMainBudgetChange(e.target.value)} onKeyDown={handleKeyDown} disabled={!!viewArchiveData} className={`w-full pl-8 md:pl-10 pb-1 text-2xl md:text-4xl font-bold text-gray-800 border-b-2 border-dashed border-gray-300 ${currentTheme.ring} focus:outline-none bg-transparent transition-all disabled:opacity-50`} /> </div> </div>
                </div>
              </div>
              
              {/* Chart Always Visible */}
               <div className="bg-white rounded-2xl shadow-lg p-4 md:p-5 border-l-8 border-indigo-300 transition-colors flex flex-col justify-center">
                  <h3 className="text-gray-600 text-sm font-bold flex items-center gap-2 mb-3"> <PieChart size={16} className="text-indigo-400" /> Statistik Pengeluaran </h3>
                  {totalExpenses > 0 ? (
                  <div className="flex flex-row items-center gap-4 justify-between">
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0">
                      <div className="w-full h-full rounded-full shadow-inner" style={{ background: gradientString, transition: 'background 0.5s ease-in-out' }}>
                          <SvgPieChart data={chartData} />
                      </div>
                    </div>
                    <div className="flex-1 overflow-y-auto max-h-32 custom-scrollbar">
                      <div className="grid grid-cols-1 gap-1">
                        {chartData.map((d, i) => (
                           <div key={i} className="flex items-center justify-between text-[10px] sm:text-xs">
                            <div className="flex items-center gap-1.5"> 
                                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }}></span> 
                                <span className="text-gray-600 truncate max-w-[80px]">{d.name}</span> 
                            </div> 
                            <span className="font-mono text-gray-500 font-bold">{formatRupiah(d.value)}</span>
                          </div>
                          ))}
                      </div>
                    </div>
                  </div>
                  ) : (
                      <div className="flex flex-col items-center justify-center h-full min-h-[100px] text-gray-400">
                        <div className="w-20 h-20 rounded-full border-4 border-dashed border-gray-200 flex items-center justify-center mb-2">
                            <span className="text-xs font-bold text-gray-300">0%</span>
                        </div>
                        <span className="text-xs italic">Belum ada pengeluaran</span>
                    </div>
                  )}
              </div>
            </div>
             
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <div className={`rounded-2xl shadow-lg p-4 md:p-5 border-l-8 ${isOverBudget ? 'bg-red-50 border-red-500' : 'bg-white border-green-400'}`}>
                 <div className="flex justify-between items-start"> <div> <p className="text-gray-500 text-xs md:text-sm font-semibold">Terpakai</p> <p className={`text-xl md:text-2xl font-bold mt-1 break-all ${isOverBudget ? 'text-red-600' : 'text-gray-800'}`}> {formatRupiah(totalExpenses)} </p> </div> <Calculator className={`w-5 h-5 md:w-6 md:h-6 ${isOverBudget ? 'text-red-300' : 'text-green-300'}`} /> </div>
                 <div className="w-full bg-gray-200/80 rounded-full h-2 mt-3 md:mt-4 overflow-hidden"> <div className={`h-2 rounded-full transition-all duration-500 ${progressBarColor}`} style={{ width: `${activeBudget > 0 ? Math.min((totalExpenses / activeBudget) * 100, 100) : 0}%` }}></div> </div>
                 <p className="text-[10px] md:text-xs text-right mt-1 text-gray-400"> {activeBudget > 0 ? ((totalExpenses/activeBudget)*100).toFixed(1) : 0}% dari budget </p>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-4 md:p-5 border-l-8 border-blue-400">
                 <div className="flex justify-between items-start"> <div> <p className="text-gray-500 text-xs md:text-sm font-semibold">Sisa Saldo</p> <p className={`text-xl md:text-2xl font-bold mt-1 break-all ${balance < 0 ? 'text-red-500' : 'text-blue-600'}`}> {formatRupiah(balance)} </p> </div> <DollarSign className="w-5 h-5 md:w-6 md:h-6 text-blue-300" /> </div>
                 <p className="text-[10px] md:text-xs mt-3 md:mt-4 text-gray-400"> {balance < 0 ? 'Segera evaluasi!' : 'Aman terkendali.'} </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border border-gray-100 mb-8">
          <h3 className={`text-lg font-bold ${currentTheme.text} flex items-center gap-2 mb-4`}> <Wallet size={20} /> Alokasi Budget per Kategori </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {(viewArchiveData ? Object.keys(activeCategoryBudgets) : visibleBudgetCats).map((cat, idx) => {
              if (viewArchiveData && !activeCategoryBudgets[cat] && !expenseByCategory[cat]) return null;
              const spent = expenseByCategory[cat] || 0;
              const catBudget = activeCategoryBudgets[cat] || 0;
              const displaySpent = catBudget > 0 ? spent : 0; 
              const isCatOver = catBudget > 0 && spent > catBudget;
              const percent = catBudget > 0 ? Math.min((spent / catBudget) * 100, 100) : 0;
              const isSelected = filterCategory === cat;
              const catCardBorder = isCatOver ? 'border-l-4 border-red-500 bg-red-50' : `border-l-4 ${currentTheme.border.replace('border-', 'border-')} ${isSelected ? 'bg-gray-50 ring-2 ring-offset-1 ' + currentTheme.ring.replace('focus:', '') : 'bg-white'}`;
              return (
                <div key={cat} onClick={() => handleToggleFilter(cat)} className={`shadow-sm rounded-xl p-3 relative overflow-hidden border border-gray-100 ${catCardBorder} transition-all group cursor-pointer hover:shadow-md`}>
                  {!viewArchiveData && <button onClick={(e) => { e.stopPropagation(); handleRemoveCategoryFromBudget(cat); }} className="absolute top-1 right-1 text-gray-300 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity p-1 z-20"><X size={14} /></button>}
                  <div className="flex justify-between items-start mb-2 pr-4 relative">
                    <div> <span className="text-xs font-bold text-gray-600 truncate mr-2 block mb-1" title={cat}>{cat}</span> <span className={`text-[10px] font-mono ${isCatOver ? 'text-red-600 font-bold' : 'text-gray-400'}`}> Terpakai: {formatRupiah(displaySpent)} </span> </div>
                    <div className="absolute top-0 right-4 scale-75 origin-top-right transform translate-x-2 -translate-y-2 pointer-events-none"> <CowAvatar mood={isCatOver ? 'angry' : 'normal'} className="w-16 h-16" uniqueId={`mini-${idx}-${cat}`} /> </div>
                    {isSelected && <div className="absolute bottom-0 right-0 p-1"><Filter size={12} className="text-blue-500"/></div>}
                  </div>
                  <div className="relative mb-2 w-full mt-2" onClick={(e) => e.stopPropagation()}>
                    <span className="absolute left-0 bottom-1 text-xs font-bold text-gray-400">Rp</span>
                    <input type="text" inputMode="numeric" placeholder="0" value={catBudget === 0 ? '' : formatNumber(catBudget)} onChange={(e) => handleCategoryBudgetChange(cat, e.target.value)} onKeyDown={handleKeyDown} disabled={!!viewArchiveData} className={`w-full pl-6 text-right text-lg font-bold border-b border-dashed border-gray-300 focus:outline-none bg-transparent relative z-20 ${isCatOver ? 'text-red-600' : 'text-gray-700'} ${currentTheme.ring} disabled:opacity-50`} />
                  </div>
                  <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden"> <div className={`h-full rounded-full transition-all duration-500 ${isCatOver ? 'bg-red-500' : currentTheme.bg}`} style={{ width: `${percent}%` }}></div> </div>
                  {catBudget > 0 && ( <div className="flex justify-between items-center mt-1"> {isCatOver && <AlertTriangle size={10} className="text-red-500" />} <p className={`text-[9px] text-right w-full ${isCatOver ? 'text-red-500 font-bold' : 'text-gray-400'}`}> {isCatOver ? 'Over Budget!' : `Sisa: ${formatRupiah(catBudget - spent)}`} </p> </div> )}
                </div>
              );
            })}
            
            {!viewArchiveData && (isAddingCat ? (
              <div className={`shadow-sm rounded-xl p-3 relative overflow-hidden border border-gray-100 border-l-4 ${currentTheme.border} bg-white flex flex-col justify-center min-h-[100px]`}>
                 {isCreatingCustom ? (
                    <>
                         <p className="text-xs font-bold text-gray-500 mb-1">Nama Kategori Baru:</p>
                        <div className="flex gap-2 items-center">
                           <input ref={newCatInputRef} type="text" value={newCatName} onChange={(e) => setNewCatName(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') handleAddCustomCategory(); if (e.key === 'Escape') setIsCreatingCustom(false); }} placeholder="..." className={`w-full border-b-2 ${currentTheme.border} focus:outline-none text-sm py-1 bg-transparent`} />
                           <button onClick={handleAddCustomCategory} className="text-green-500 hover:text-green-700 p-1"><Check size={16} /></button>
                           <button onClick={() => setIsCreatingCustom(false)} className="text-red-400 hover:text-red-600 p-1"><X size={16} /></button>
                        </div>
                    </>
                 ) : (
                    <>
                        <div className="flex justify-between items-center mb-2 pb-1 border-b border-gray-50"> <p className="text-xs font-bold text-gray-500">Pilih Kategori:</p> <button onClick={() => setIsAddingCat(false)} className="text-gray-400 hover:text-red-500"><X size={14} /></button> </div>
                        <div className="flex-1 overflow-y-auto max-h-[120px] custom-scrollbar pr-1">
                           <div className="grid grid-cols-1 gap-1">
                             {categories.filter(c => !visibleBudgetCats.includes(c)).map(cat => ( <button key={cat} onClick={() => handleAddCategoryToBudget(cat)} className={`text-left text-xs px-2 py-1.5 rounded hover:bg-gray-50 ${currentTheme.text} transition-colors flex items-center justify-between group`}> {cat} <Plus size={10} className="opacity-0 group-hover:opacity-100" /> </button> ))}
                             <button onClick={() => setIsCreatingCustom(true)} className="text-left text-xs px-2 py-1.5 rounded hover:bg-pink-50 text-pink-500 font-bold flex items-center gap-1 mt-1 border-t border-gray-50 pt-2"> <Plus size={10} /> Buat Kategori Sendiri </button>
                           </div>
                        </div>
                    </>
                 )}
              </div>
            ) : (
               <button onClick={() => setIsAddingCat(true)} className="border-2 border-dashed border-gray-300 rounded-xl p-3 flex flex-col items-center justify-center text-gray-400 hover:border-pink-400 hover:text-pink-500 transition-colors min-h-[100px]"> <Plus size={24} /> <span className="text-xs font-bold mt-1">Tambahkan Kategori</span> </button>
            ))}
          </div>
        </div>

        <div className={`bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 mb-8`}>
           <div className={`p-3 md:p-4 ${currentTheme.light} border-b border-gray-100 flex flex-wrap justify-between items-center gap-2 transition-colors`}>
           {/* IKON CATATAN PENGELUARAN: FILE TEXT */}
             <h3 className={`font-bold ${currentTheme.text} flex items-center gap-2 text-sm md:text-base`}>
              <div className="bg-white/50 p-1.5 rounded text-inherit">
                <FileText size={20} />
              </div>
              <span className="hidden sm:inline">Catatan Pengeluaran</span>
              {filterCategory && ( <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full flex items-center gap-1"> Filter: {filterCategory} <button onClick={() => setFilterCategory(null)}><XCircle size={12}/></button> </span> )}
              <span className="inline sm:hidden">Daftar</span>
             </h3>
             {/* --- FIX: TOMBOL TAMBAH BARIS KEMBALI MUNCUL DI HP --- */}
             <button onClick={handleAddRow} className={`${currentTheme.bg} ${currentTheme.hover} text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium flex items-center gap-1 md:gap-2 transition-colors shadow-md active:scale-95 cursor-pointer`}>
               <Plus size={14} className="md:w-4 md:h-4" /> <span className="inline">Tambah</span><span className="hidden sm:inline"> Baris</span>
             </button>
           </div>
           
           <div className="w-full">
             {/* --- DESKTOP TABLE VIEW (MD UP) --- */}
             <table className="w-full text-left border-collapse table-fixed hidden md:table">
               <thead>
                 <tr className="text-gray-900 text-[10px] md:text-sm uppercase tracking-wider">
                   <th className={`p-1 md:p-4 w-[8%] md:w-12 text-center ${currentTheme.table.header[0]} text-white rounded-tl-xl`}>No</th>
                    <th className={`p-1 md:p-4 w-[19%] md:w-28 ${currentTheme.table.header[1]} text-gray-900`}>Tanggal</th>
                   <th className={`p-1 md:p-4 w-[21%] md:w-auto ${currentTheme.table.header[2]} text-gray-900`}>Deskripsi Item</th>
                   <th className={`p-1 md:p-4 w-[10%] md:w-20 text-center ${currentTheme.table.header[3]} text-gray-900`}>Qty</th>
                   <th className={`p-1 md:p-4 w-[14%] md:w-44 ${currentTheme.table.header[4]} text-gray-900`}>Kategori</th>
                    <th className={`p-1 md:p-4 w-[20%] md:w-32 text-right ${currentTheme.table.header[5]} text-gray-900`}>Jumlah (Rp)</th>
                   <th className={`p-1 md:p-4 w-[8%] md:w-16 text-center ${currentTheme.table.header[6]} text-gray-900 rounded-tr-xl`}>Aksi</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-100">
                 {filteredExpenses.length === 0 ? (
                   <tr>
                     <td colSpan="7" className="p-8 text-center text-gray-400 italic text-sm">
                       {filterCategory ? (
                          `Belum ada pengeluaran di kategori ${filterCategory}`
                       ) : (
                          <div className="flex flex-col items-center gap-3">
                            <p>Belum ada pengeluaran. Sapi senang! 🐮</p>
                            <CowAvatar mood="happy" className="w-20 h-20" uniqueId="empty-table-happy" />
                          </div>
                       )}
                     </td>
                   </tr>
                 ) : (
                   filteredExpenses.map((row, index) => {
                     const isNewDateGroup = index === 0 || row.date !== filteredExpenses[index - 1].date;
                     
                     // CALCULATE DAILY TOTAL
                     let dailyTotalElement = null;
                     if (isNewDateGroup) {
                         const dailyTotal = filteredExpenses
                             .filter(e => e.date === row.date)
                             .reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
                         
                         const dateObj = new Date(row.date);
                         const dateLabel = dateObj.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

                         dailyTotalElement = (
                             <tr className="bg-gray-100/50 border-t-2 border-gray-200/50">
                                 <td colSpan="7" className="p-2 md:px-4">
                                     <div className="flex justify-between items-center text-xs md:text-sm font-bold text-gray-600">
                                         <span>{dateLabel}</span>
                                         <span className={`${currentTheme.text} bg-white px-2 py-0.5 rounded shadow-sm border border-gray-100`}>
                                             Total: {formatRupiah(dailyTotal)}
                                         </span>
                                     </div>
                                 </td>
                             </tr>
                         );
                     }

                     return (
                     <React.Fragment key={row.id}>
                       {dailyTotalElement}
                       <tr className="hover:bg-gray-50 transition-colors group">
                         <td className={`p-1 md:p-4 text-center text-gray-900 font-mono text-[10px] md:text-xs ${currentTheme.table.cell[0]}`}>{index + 1}</td>
                         <td className={`p-1 md:p-2 ${currentTheme.table.cell[1]}`}>
                           <input type="date" value={row.date} onChange={(e) => handleChange(row.id, 'date', e.target.value)} onKeyDown={handleKeyDown} className={`w-full p-1 md:p-2 rounded border border-transparent hover:border-gray-900/20 ${currentTheme.ring} focus:bg-white focus:outline-none bg-transparent transition-all text-[10px] md:text-sm text-gray-900`} />
                         </td>
                         <td className={`p-1 md:p-2 ${currentTheme.table.cell[2]}`}>
                           <input type="text" placeholder="Contoh: Duku" value={row.item} onChange={(e) => handleChange(row.id, 'item', e.target.value)} onBlur={(e) => smartParseItem(row.id, e.target.value)} onKeyDown={handleKeyDown} className={`w-full p-1 md:p-2 rounded border border-transparent hover:border-gray-900/20 ${currentTheme.ring} focus:bg-white focus:outline-none bg-transparent transition-all font-medium text-[10px] md:text-sm text-gray-900 placeholder-gray-500`} />
                         </td>
                         <td className={`p-1 md:p-2 ${currentTheme.table.cell[3]}`}>
                           <div className="flex flex-col items-center gap-0.5">
                             <input type="number" min="0.1" step="0.1" placeholder="1" value={row.qty} onChange={(e) => handleChange(row.id, 'qty', e.target.value)} onKeyDown={handleKeyDown} className={`w-full p-1 md:p-2 text-center rounded border border-transparent hover:border-gray-900/20 ${currentTheme.ring} focus:bg-white focus:outline-none bg-transparent transition-all font-mono text-[10px] md:text-sm text-gray-900`} />
                             <input type="text" placeholder="pcs/kg" value={row.unit || ''} onChange={(e) => handleChange(row.id, 'unit', e.target.value)} onKeyDown={handleKeyDown} className="w-full text-center bg-transparent text-[8px] md:text-xs text-gray-900 border-none p-0 focus:ring-0 hover:text-pink-800 focus:text-pink-900 placeholder-gray-600" />
                           </div>
                         </td>
                         <td className={`p-1 md:p-2 ${currentTheme.table.cell[4]}`}>
                           <div className="flex gap-1 md:gap-2 items-center">
                             {row.isCustomCategory && !viewArchiveData ? (
                               <input type="text" placeholder="Ketik..." value={row.category} autoFocus onChange={(e) => handleChange(row.id, 'category', e.target.value)} onKeyDown={handleKeyDown} className={`w-full p-1 md:p-2 rounded border border-gray-900/20 ${currentTheme.ring} focus:bg-white focus:outline-none bg-transparent transition-all text-[10px] md:text-sm text-gray-900 placeholder-gray-300`} />
                             ) : (
                               <select value={row.category} onChange={(e) => handleChange(row.id, 'category', e.target.value)} onKeyDown={handleKeyDown} className={`w-full p-1 md:p-2 rounded border border-transparent hover:border-gray-900/20 ${currentTheme.ring} focus:bg-white focus:outline-none bg-transparent transition-all text-[10px] md:text-sm text-gray-900 cursor-pointer appearance-none`}>
                                   <option value="">Pilih</option>
                                   {categories.map((cat) => (
                                     <option key={cat} value={cat}>{cat}</option>
                                   ))}
                               </select>
                             )}
                             {/* Tombol Toggle Mode (Pensil / List) */}
                             <button onClick={() => toggleCategoryMode(row.id)} className={`hidden md:block p-1.5 md:p-2 rounded-full text-gray-800 hover:bg-white/40 transition-all flex-shrink-0`} title={row.isCustomCategory ? "Pilih dari daftar" : "Ketik kategori baru"}>
                               {row.isCustomCategory ? <List size={14} className="md:w-4 md:h-4" /> : <Edit2 size={14} className="md:w-4 md:h-4" />}
                             </button>
                           </div>
                         </td>
                         <td className={`p-1 md:p-2 ${currentTheme.table.cell[5]}`}>
                           <input type="text" inputMode="numeric" placeholder="0" value={row.amount === 0 ? '' : formatNumber(row.amount)} onChange={(e) => handleChange(row.id, 'amount', e.target.value)} onKeyDown={handleKeyDown} enterKeyHint="done" className={`w-full p-1 md:p-2 text-right rounded border border-transparent hover:border-gray-900/20 ${currentTheme.ring} focus:bg-white focus:outline-none bg-transparent transition-all font-mono font-medium text-[10px] md:text-sm text-gray-900`} />
                         </td>
                         <td className={`p-1 md:p-4 text-center ${currentTheme.table.cell[6]} rounded-br-xl`}>
                           <button onClick={() => handleDeleteRow(row.id)} className="text-gray-900 hover:text-red-600 transition-colors p-1 rounded hover:bg-white/40" title="Hapus Baris">
                             <Trash2 size={14} className="md:w-[18px] md:h-[18px]" />
                           </button>
                         </td>
                       </tr>
                     </React.Fragment>
                     );
                   })
                 )}
               </tbody>
              </table>
              
              {/* --- MOBILE CARD VIEW (VISIBLE ON < MD) --- */}
              <div className="block md:hidden bg-gray-50/50">
                  {filteredExpenses.length === 0 && (
                      <div className="p-8 text-center text-gray-400 italic text-sm flex flex-col items-center gap-3">
                        <p>Belum ada pengeluaran. Sapi senang! 🐮</p>
                        <CowAvatar mood="happy" className="w-20 h-20" uniqueId="empty-mobile-happy" />
                      </div>
                  )}
                  {filteredExpenses.map((row, index) => {
                       const isNewDateGroup = index === 0 || row.date !== filteredExpenses[index - 1].date;
                       let dailyTotalElement = null;
                        if (isNewDateGroup) {
                            const dailyTotal = filteredExpenses.filter(e => e.date === row.date).reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
                            const dateObj = new Date(row.date);
                            const dateLabel = dateObj.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
                            dailyTotalElement = (
                                <div className="p-2 px-3 bg-gray-100 text-xs font-bold text-gray-600 flex justify-between items-center sticky top-14 z-20 shadow-sm">
                                    <span>{dateLabel}</span>
                                    <span className="bg-white px-2 py-0.5 rounded border">Total: {formatNumber(dailyTotal)}</span>
                                </div>
                            );
                        }
                        return (
                            <React.Fragment key={row.id}>
                                {dailyTotalElement}
                                <div className="bg-white p-3 border-b border-gray-100">
                                    <div className="flex justify-between gap-2 mb-2">
                                        <div className="flex-1">
                                            <label className="text-[10px] text-gray-400 font-bold uppercase">Deskripsi</label>
                                            <input type="text" value={row.item} onChange={(e) => handleChange(row.id, 'item', e.target.value)} onBlur={(e) => smartParseItem(row.id, e.target.value)} className="w-full font-bold text-gray-800 border-b border-dotted border-gray-300 focus:outline-none focus:border-pink-500 py-1" placeholder="Item..." />
                                        </div>
                                        <div className="w-1/3 text-right">
                                            <label className="text-[10px] text-gray-400 font-bold uppercase">Rp</label>
                                            <input type="text" inputMode="numeric" value={row.amount === 0 ? '' : formatNumber(row.amount)} onChange={(e) => handleChange(row.id, 'amount', e.target.value)} className="w-full font-bold text-gray-800 text-right border-b border-dotted border-gray-300 focus:outline-none focus:border-pink-500 py-1" placeholder="0" />
                                        </div>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                         <div className="flex-1">
                                             <select value={row.category} onChange={(e) => handleChange(row.id, 'category', e.target.value)} className="w-full text-xs bg-gray-50 rounded p-1 border border-gray-200">
                                                <option value="">Kategori...</option>
                                                {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                                             </select>
                                         </div>
                                         <div className="flex items-center gap-1 w-20">
                                            <input type="number" value={row.qty} onChange={(e) => handleChange(row.id, 'qty', e.target.value)} className="w-8 text-center text-xs border-b border-gray-300 py-1" placeholder="1" />
                                            <input type="text" value={row.unit || ''} onChange={(e) => handleChange(row.id, 'unit', e.target.value)} className="w-10 text-center text-[10px] text-gray-500 border-none bg-transparent" placeholder="unit" />
                                         </div>
                                         <input type="date" value={row.date} onChange={(e) => handleChange(row.id, 'date', e.target.value)} className="text-[10px] w-5 bg-transparent" />
                                         <button onClick={() => handleDeleteRow(row.id)} className="text-red-400 p-2"><Trash2 size={16} /></button>
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                  })}
              </div>

           </div>
        </div>
        
        {/* FOOTER: HATI */}
        <div className="text-center mt-8 pb-8 text-gray-400 text-xs md:text-sm">
           Dibuat dengan 💖 oleh Asisten AI-mu | <span className={`${currentTheme.text}`}>Hemat pangkal kaya!</span>
        </div>

      </div>

      {/* FLOATING ACTION BUTTON FOR MOBILE ADD ROW (Opsional, tetap ada sebagai cadangan) */}
      <button 
        onClick={handleAddRow} 
        className={`md:hidden fixed bottom-6 right-6 ${currentTheme.bg} text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center z-40 active:scale-90 transition-transform`}
        aria-label="Tambah Baris"
      >
        <Plus size={32} />
      </button>

    </div>
  );
};

export default SapiFinanceApp;
