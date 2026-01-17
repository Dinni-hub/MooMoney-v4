import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Plus, Trash2, Edit2, List, Palette, PieChart, Wallet, X, ChevronDown, FileText, Download, Calendar, History, ArrowRightCircle, Upload, Menu, Settings, Calculator, DollarSign, TrendingUp } from 'lucide-react';

// --- 1. AMAN: SAVE DATA KE HP (LOCAL STORAGE) ---
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Gagal baca data:", error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Gagal simpan data:", error);
    }
  };

  return [storedValue, setValue];
};

// --- 2. KOMPONEN GAMBAR SAPI (AMAN) ---
const CowAvatar = ({ mood }) => {
  const isAngry = mood === 'angry';
  const isWarning = mood === 'warning';
  const isHappy = mood === 'happy'; 
  // Warna Sapi
  const hornColor = "#9ca3af";
  const skinColor = isAngry ? "#fee2e2" : "#ffffff";
  const muzzleColor = isAngry ? "#fca5a5" : "#fbcfe8";
  
  return (
    <div className={`transition-transform duration-500 ${isAngry ? 'animate-bounce' : ''} flex justify-center items-center w-20 h-20 md:w-40 md:h-40`}>
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
        {/* Kepala */}
        <path d="M55 75 Q 40 55 50 45 Q 60 45 70 70 Z" fill={hornColor} stroke="black" strokeWidth="2" />
        <path d="M145 75 Q 160 55 150 45 Q 140 45 130 70 Z" fill={hornColor} stroke="black" strokeWidth="2" />
        <rect x="50" y="50" width="100" height="100" rx="40" fill={skinColor} stroke="black" strokeWidth="3" />
        {/* Telinga */}
        <ellipse cx="40" cy="95" rx="20" ry="12" fill={skinColor} stroke="black" strokeWidth="2" transform="rotate(-20 40 95)"/>
        <ellipse cx="160" cy="95" rx="20" ry="12" fill={skinColor} stroke="black" strokeWidth="2" transform="rotate(20 160 95)"/>
        {/* Mata */}
        {isAngry ? (
            <>
                <path d="M70 85 L 90 95" stroke="black" strokeWidth="3" />
                <path d="M130 85 L 110 95" stroke="black" strokeWidth="3" />
            </>
        ) : (
            <>
                <circle cx="80" cy="90" r="5" fill="black" />
                <circle cx="120" cy="90" r="5" fill="black" />
            </>
        )}
        {/* Moncong */}
        <ellipse cx="100" cy="125" rx="35" ry="20" fill={muzzleColor} stroke="black" strokeWidth="2" />
        <circle cx="90" cy="125" r="3" fill={isAngry ? "red" : "black"} opacity="0.5"/>
        <circle cx="110" cy="125" r="3" fill={isAngry ? "red" : "black"} opacity="0.5"/>
        {isHappy && <path d="M85 135 Q 100 145 115 135" stroke="black" strokeWidth="2" fill="none" />}
      </svg>
    </div>
  );
};

// --- 3. KOMPONEN PIE CHART (SVG MURNI) ---
const SvgPieChart = ({ data }) => {
    if (!data || data.length === 0) return <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-[10px] text-gray-400">Kosong</div>;
    
    let cumulativePercent = 0;
    const total = data.reduce((sum, item) => sum + (item.value || 0), 0);

    return (
        <svg viewBox="-1 -1 2 2" style={{ transform: 'rotate(-90deg)' }} className="w-full h-full">
            {data.map((slice, index) => {
                if (slice.value === 0) return null;
                const percent = slice.value / total;
                const startX = Math.cos(2 * Math.PI * cumulativePercent);
                const startY = Math.sin(2 * Math.PI * cumulativePercent);
                cumulativePercent += percent;
                const endX = Math.cos(2 * Math.PI * cumulativePercent);
                const endY = Math.sin(2 * Math.PI * cumulativePercent);
                const largeArcFlag = percent > 0.5 ? 1 : 0;
                
                const pathData = `M 0 0 L ${startX} ${startY} A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;

                // Posisi Teks Persen
                const textAngle = cumulativePercent - (percent / 2);
                const textX = Math.cos(2 * Math.PI * textAngle) * 0.7;
                const textY = Math.sin(2 * Math.PI * textAngle) * 0.7;

                return (
                    <g key={index}>
                        <path d={pathData} fill={slice.color} stroke="white" strokeWidth="0.01" />
                        {percent > 0.1 && (
                            <text x={textX} y={textY} fill="white" fontSize="0.15" fontWeight="bold" textAnchor="middle" dominantBaseline="middle" transform={`rotate(90, ${textX}, ${textY})`}>
                                {Math.round(percent * 100)}%
                            </text>
                        )}
                    </g>
                );
            })}
        </svg>
    );
};

// --- 4. APLIKASI UTAMA ---
const SapiFinanceApp = () => {
  // --- STATE (PENYIMPANAN DATA) ---
  const [budget, setBudget] = useLocalStorage('moo_budget', 2000000);
  const [cutoffDay, setCutoffDay] = useLocalStorage('moo_cutoff', 1); // Default Tanggal 1
  const [themeKey, setThemeKey] = useLocalStorage('moo_theme', 'pink');
  const [expenses, setExpenses] = useLocalStorage('moo_expenses', []);
  const [categories, setCategories] = useLocalStorage('moo_cats', ['Makan', 'Transport', 'Belanja', 'Tagihan', 'Lainnya']);
  const [archives, setArchives] = useLocalStorage('moo_archives', []);

  // --- UI STATE ---
  const [viewArchive, setViewArchive] = useState(null); // Kalau null = Mode Normal
  const [showSettings, setShowSettings] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const fileInputRef = useRef(null);

  // --- TEMA WARNA ---
  const themes = {
      pink: { bg: 'bg-pink-500', soft: 'bg-pink-50', text: 'text-pink-600', border: 'border-pink-500' },
      blue: { bg: 'bg-blue-500', soft: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-500' },
      green: { bg: 'bg-emerald-500', soft: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-500' },
      orange: { bg: 'bg-orange-500', soft: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-500' },
  };
  const theme = themes[themeKey] || themes.pink;

  // --- LOGIKA HITUNG TANGGAL (JANGAN DIUBAH) ---
  const getPeriod = () => {
      const now = new Date();
      const day = now.getDate();
      const cut = parseInt(cutoffDay) || 1;
      
      let start, end;
      // Jika hari ini >= tanggal gajian, berarti periode bulan ini
      if (day >= cut) {
          start = new Date(now.getFullYear(), now.getMonth(), cut);
          end = new Date(now.getFullYear(), now.getMonth() + 1, cut - 1);
      } else {
      // Jika belum, berarti masih periode bulan lalu
          start = new Date(now.getFullYear(), now.getMonth() - 1, cut);
          end = new Date(now.getFullYear(), now.getMonth(), cut - 1);
      }
      return { start, end };
  };

  const { start: periodStart, end: periodEnd } = getPeriod();

  // --- FILTER DATA SESUAI PERIODE ---
  const currentData = useMemo(() => {
      if (viewArchive) return viewArchive.expenses; // Kalo lagi lihat arsip, pake data arsip
      
      return expenses.filter(item => {
          if (!item.date) return false;
          const d = new Date(item.date);
          const check = new Date(d.getFullYear(), d.getMonth(), d.getDate());
          // Cek apakah tanggal item masuk dalam rentang periode
          return check >= new Date(periodStart.getFullYear(), periodStart.getMonth(), periodStart.getDate()) &&
                 check <= new Date(periodEnd.getFullYear(), periodEnd.getMonth(), periodEnd.getDate());
      }).sort((a, b) => new Date(b.date) - new Date(a.date)); // Urutkan tanggal terbaru di atas
  }, [expenses, periodStart, periodEnd, viewArchive]);

  // --- HITUNG TOTAL ---
  const activeBudget = viewArchive ? viewArchive.budget : budget;
  const totalSpent = currentData.reduce((acc, item) => acc + (parseFloat(item.amount) || 0), 0);
  const balance = activeBudget - totalSpent;
  const isBoros = totalSpent > activeBudget;

  // --- DATA CHART ---
  const chartData = useMemo(() => {
      const map = {};
      currentData.forEach(i => {
          const cat = i.category || 'Lainnya';
          const val = parseFloat(i.amount) || 0;
          map[cat] = (map[cat] || 0) + val;
      });
      return Object.entries(map).map(([name, value], idx) => ({
          name, value, color: `hsl(${idx * 60}, 70%, 50%)`
      })).sort((a, b) => b.value - a.value);
  }, [currentData]);

  // --- FUNGSI FORMAT RUPIAH ---
  const rp = (num) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num || 0);

  // --- 🔴 FUNGSI TAMBAH BARIS (DIJAMIN JALAN) ---
  const addRow = () => {
      const newItem = {
          id: Date.now(), // ID Unik dari waktu sekarang
          date: new Date().toISOString().slice(0, 10), // Tanggal hari ini
          item: '',
          category: 'Makan',
          amount: 0,
          qty: 1,
          unit: 'pcs',
          isCustomCategory: false
      };

      if (viewArchive) {
          alert("Mode Arsip hanya untuk melihat. Kembali ke mode aktif untuk menambah data.");
          return;
      }

      // Masukkan ke paling DEPAN array (index 0) supaya muncul di atas
      setExpenses(prev => [newItem, ...prev]);
  };

  // --- 🔴 FUNGSI HAPUS ---
  const deleteRow = (id) => {
      if (viewArchive) return;
      setExpenses(prev => prev.filter(item => item.id !== id));
  };

  // --- 🔴 FUNGSI EDIT ---
  const updateRow = (id, field, val) => {
      if (viewArchive) return;
      setExpenses(prev => prev.map(item => {
          if (item.id === id) {
              return { ...item, [field]: val };
          }
          return item;
      }));
  };

  // --- 🔴 FUNGSI IMPORT EXCEL (NATIVE API) ---
  const handleImport = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (evt) => {
          try {
              const data = new Uint8Array(evt.target.result);
              // Panggil library XLSX global (dimuat lewat CDN di bawah)
              const wb = window.XLSX.read(data, { type: 'array' });
              const ws = wb.Sheets[wb.SheetNames[0]];
              const json = window.XLSX.utils.sheet_to_json(ws, { header: 1 });
              
              // Cari baris header
              let headIdx = -1;
              json.forEach((row, i) => {
                  const s = row.join(' ').toLowerCase();
                  if (s.includes('tanggal') && s.includes('jumlah')) headIdx = i;
              });

              if (headIdx === -1) { alert("Format Excel salah!"); return; }
              
              const headers = json[headIdx];
              const newItems = [];

              for (let i = headIdx + 1; i < json.length; i++) {
                  const row = json[i];
                  if (!row || row.length === 0) continue;
                  
                  // Mapping manual (sesuaikan index kolom excel)
                  // Asumsi: Tanggal (1), Deskripsi (2), Kategori (4), Jumlah (5) -> index kira2
                  const dateVal = row[headers.indexOf('Tanggal')];
                  let dateStr = new Date().toISOString().slice(0, 10);
                  // Excel date serial number fix
                  if (typeof dateVal === 'number') {
                      dateStr = new Date(Math.round((dateVal - 25569) * 86400 * 1000)).toISOString().slice(0, 10);
                  }

                  const amt = parseFloat(String(row[headers.indexOf('Jumlah')] || 0).replace(/\D/g,''));

                  if (amt > 0) {
                      newItems.push({
                          id: Date.now() + Math.random(),
                          date: dateStr,
                          item: row[headers.indexOf('Deskripsi')] || 'Import',
                          category: row[headers.indexOf('Kategori')] || 'Lainnya',
                          amount: amt,
                          qty: 1,
                          unit: 'pcs',
                          isCustomCategory: false
                      });
                  }
              }
              setExpenses(prev => [...newItems, ...prev]);
              alert(`Masuk ${newItems.length} data!`);
          } catch (err) {
              alert("Gagal baca file.");
          }
      };
      reader.readAsArrayBuffer(file);
      e.target.value = null; // Reset input biar bisa pilih file sama lagi
  };

  // --- DOWNLOAD EXCEL ---
  const downloadExcel = async () => {
    if (!window.ExcelJS || !window.saveAs) { alert("Tunggu sebentar, sistem lagi loading..."); return; }
    const wb = new window.ExcelJS.Workbook();
    const ws = wb.addWorksheet('Laporan');
    
    ws.addRow(['Laporan MooMoney', viewArchive ? viewArchive.period : 'Periode Aktif']);
    ws.addRow(['Total Pengeluaran', totalSpent]);
    ws.addRow(['']);
    ws.addRow(['Tanggal', 'Item', 'Kategori', 'Jumlah']);
    
    currentData.forEach(d => {
        ws.addRow([d.date, d.item, d.category, d.amount]);
    });

    const buf = await wb.xlsx.writeBuffer();
    window.saveAs(new Blob([buf]), 'Laporan_MooMoney.xlsx');
  };

  // --- LOAD SCRIPTS ---
  useEffect(() => {
     const scripts = [
         "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js",
         "https://cdnjs.cloudflare.com/ajax/libs/exceljs/4.4.0/exceljs.min.js",
         "https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js"
     ];
     scripts.forEach(s => {
         if (!document.querySelector(`script[src="${s}"]`)) {
             const sc = document.createElement('script');
             sc.src = s;
             sc.async = true;
             document.body.appendChild(sc);
         }
     });
  }, []);

  return (
    <div className={`min-h-screen ${theme.soft} pb-20 font-sans text-gray-800`}>
      
      {/* --- HEADER --- */}
      <div className={`sticky top-0 z-50 ${theme.bg} text-white shadow-lg px-4 py-3`}>
        <div className="max-w-xl mx-auto flex justify-between items-center">
            {/* Kiri: Logo & Info */}
            <div className="flex items-center gap-3">
                <div className="bg-white p-1 rounded-full"><CowAvatar mood="happy" /></div>
                <div>
                    <h1 className="font-bold text-lg leading-tight">MooMoney</h1>
                    <p className="text-[10px] opacity-90">{viewArchive ? `Arsip: ${viewArchive.period}` : `Periode: ${periodStart.getDate()} - ${periodEnd.getDate()} (Gajian tgl ${cutoffDay})`}</p>
                </div>
            </div>

            {/* Kanan: Tombol-Tombol Penting */}
            <div className="flex items-center gap-2">
                {viewArchive && <button onClick={() => setViewArchive(null)} className="bg-black/20 px-2 py-1 rounded text-xs">Exit Arsip</button>}
                
                <button onClick={() => setShowHistory(true)} className="p-2 bg-white/20 rounded-full hover:bg-white/30"><History size={18}/></button>
                <button onClick={() => setShowSettings(true)} className="p-2 bg-white/20 rounded-full hover:bg-white/30"><Settings size={18}/></button>
                
                {/* Mobile Menu Trigger */}
                <div className="relative">
                    <button onClick={() => setShowMenu(!showMenu)} className="p-2 bg-white/20 rounded-full hover:bg-white/30"><Menu size={18}/></button>
                    
                    {/* MENU DROPDOWN */}
                    {showMenu && (
                        <div className="absolute right-0 top-12 bg-white text-gray-800 shadow-xl rounded-xl w-48 p-2 border animate-in fade-in z-50">
                            <div className="text-xs font-bold text-gray-400 px-2 mb-1">TEMA</div>
                            <div className="flex gap-2 px-2 mb-3">
                                {Object.keys(themes).map(k => (
                                    <button key={k} onClick={() => setThemeKey(k)} className={`w-6 h-6 rounded-full border ${themes[k].bg}`}></button>
                                ))}
                            </div>
                            <hr className="my-2"/>
                            <button onClick={downloadExcel} className="w-full text-left px-2 py-2 hover:bg-gray-50 flex gap-2 items-center rounded"><Download size={14}/> Download Excel</button>
                            
                            {/* INPUT FILE UNTUK IMPORT (PAKAI LABEL HTML SUPAYA JALAN DI HP) */}
                            <label htmlFor="excel-upload" className="w-full text-left px-2 py-2 hover:bg-gray-50 flex gap-2 items-center rounded cursor-pointer">
                                <Upload size={14}/> Import Excel
                            </label>
                            {/* Hidden Input Asli */}
                            <input id="excel-upload" type="file" className="hidden" accept=".xlsx" onChange={handleImport} />

                            <button onClick={() => setShowSummary(true)} className="w-full text-left px-2 py-2 hover:bg-gray-50 flex gap-2 items-center rounded"><FileText size={14}/> Ringkasan</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
      </div>

      {/* --- CONTENT --- */}
      <div className="max-w-xl mx-auto p-4 space-y-4">
        
        {/* KARTU BUDGET & CHART */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
             {/* Info Saldo */}
             <div className="flex justify-between items-end mb-2">
                 <div>
                     <p className="text-xs text-gray-400 font-bold">BUDGET</p>
                     <div className="flex items-center gap-1">
                        <span className="text-gray-400">Rp</span>
                        <input 
                            type="text" 
                            value={activeBudget} 
                            onChange={(e) => !viewArchive && setBudget(e.target.value)} 
                            className="text-xl font-bold w-32 border-b border-dashed outline-none"
                        />
                     </div>
                 </div>
                 <div className="text-right">
                     <p className="text-xs text-gray-400 font-bold">SISA</p>
                     <p className={`text-xl font-bold ${balance < 0 ? 'text-red-500' : 'text-green-500'}`}>{rp(balance)}</p>
                 </div>
             </div>

             {/* Progress Bar */}
             <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden mb-4">
                 <div className={`h-full ${isBoros ? 'bg-red-500' : theme.bg}`} style={{width: `${Math.min((totalSpent/activeBudget)*100, 100)}%`}}></div>
             </div>

             {/* Chart & List */}
             <div className="flex items-center gap-4">
                 <div className="w-24 h-24 flex-shrink-0 relative">
                     <SvgPieChart data={chartData} />
                 </div>
                 <div className="flex-1 h-28 overflow-y-auto text-xs space-y-1 pr-1 custom-scrollbar">
                     {chartData.map((d, i) => (
                         <div key={i} className="flex justify-between">
                             <span className="flex items-center gap-1">
                                 <span className="w-2 h-2 rounded-full" style={{backgroundColor: d.color}}></span> {d.name}
                             </span>
                             <span className="font-bold">{rp(d.value)}</span>
                         </div>
                     ))}
                     {chartData.length === 0 && <p className="text-gray-400 text-center mt-8">Belum ada data</p>}
                 </div>
             </div>
        </div>

        {/* LIST TRANSAKSI */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-3 bg-gray-50 border-b flex justify-between items-center">
                <h3 className="font-bold text-gray-700 flex items-center gap-2"><List size={16}/> Transaksi</h3>
                {/* TOMBOL TAMBAH (PASTI BISA KLIK) */}
                <button onClick={addRow} className={`${theme.bg} text-white px-4 py-1.5 rounded-full text-sm font-bold shadow hover:brightness-110 active:scale-95 transition-transform flex items-center gap-1`}>
                    <Plus size={16}/> Tambah
                </button>
            </div>
            
            <div className="divide-y divide-gray-100">
                {currentData.length === 0 && (
                    <div className="p-8 text-center text-gray-400">
                        <p>Daftar kosong.</p>
                        <p className="text-xs">Klik tombol "Tambah" di atas ☝️</p>
                    </div>
                )}
                
                {currentData.map((item, idx) => {
                    // Header Tanggal
                    const showHeader = idx === 0 || item.date !== currentData[idx-1].date;
                    const dailyTotal = currentData.filter(x => x.date === item.date).reduce((a,b) => a + (parseFloat(b.amount)||0), 0);

                    return (
                        <div key={item.id}>
                            {showHeader && (
                                <div className="bg-gray-100 px-3 py-1 text-xs font-bold text-gray-500 flex justify-between">
                                    <span>{new Date(item.date).toLocaleDateString('id-ID', {weekday:'short', day:'numeric', month:'short'})}</span>
                                    <span>{rp(dailyTotal)}</span>
                                </div>
                            )}
                            
                            <div className="p-3 hover:bg-blue-50 transition-colors flex gap-2 items-center group">
                                {/* Input Tanggal (Kecil) */}
                                <input 
                                    type="date" 
                                    className="w-4 h-8 opacity-50" 
                                    value={item.date}
                                    onChange={e => updateRow(item.id, 'date', e.target.value)}
                                />
                                
                                <div className="flex-1">
                                    {/* Baris 1: Item & Kategori */}
                                    <div className="flex gap-2 mb-1">
                                        <input 
                                            type="text" 
                                            className="font-bold text-gray-700 w-full bg-transparent border-b border-transparent focus:border-blue-300 outline-none"
                                            placeholder="Nama barang..."
                                            value={item.item}
                                            onChange={e => updateRow(item.id, 'item', e.target.value)}
                                        />
                                        
                                        {/* Toggle Kategori: Dropdown / Text */}
                                        <div className="relative w-24 flex-shrink-0">
                                            {item.isCustomCategory ? (
                                                <input 
                                                    autoFocus
                                                    className="w-full text-xs border-b border-blue-300 outline-none" 
                                                    value={item.category}
                                                    onChange={e => updateRow(item.id, 'category', e.target.value)}
                                                />
                                            ) : (
                                                <select 
                                                    className="w-full text-xs bg-gray-100 rounded px-1 appearance-none cursor-pointer"
                                                    value={item.category}
                                                    onChange={e => updateRow(item.id, 'category', e.target.value)}
                                                >
                                                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                                </select>
                                            )}
                                            <button 
                                                onClick={() => updateRow(item.id, 'isCustomCategory', !item.isCustomCategory)}
                                                className="absolute right-0 top-0 text-gray-400 p-0.5"
                                            >
                                                {item.isCustomCategory ? <List size={10}/> : <Edit2 size={10}/>}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Baris 2: Qty & Harga */}
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-1 text-xs">
                                            <input type="number" className="w-8 bg-gray-100 rounded text-center" value={item.qty} onChange={e=>updateRow(item.id,'qty', e.target.value)}/>
                                            <input type="text" className="w-8 bg-gray-100 rounded text-center" value={item.unit} onChange={e=>updateRow(item.id,'unit', e.target.value)}/>
                                        </div>
                                        <input 
                                            type="text" 
                                            inputMode="numeric"
                                            className="text-right font-mono font-bold text-gray-700 bg-transparent w-32 outline-none border-b border-transparent focus:border-blue-300"
                                            value={item.amount === 0 ? '' : new Intl.NumberFormat('id-ID').format(item.amount)}
                                            placeholder="0"
                                            onChange={e => updateRow(item.id, 'amount', e.target.value.replace(/\D/g,''))}
                                        />
                                    </div>
                                </div>

                                {/* Tombol Hapus */}
                                <button onClick={() => deleteRow(item.id)} className="text-gray-300 hover:text-red-500 p-2">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

      </div>

      {/* --- MODAL SETTINGS (UNTUK TANGGAL GAJIAN) --- */}
      {showSettings && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white p-6 rounded-2xl w-full max-w-xs">
                  <h3 className="font-bold text-lg mb-4">Pengaturan Tanggal</h3>
                  <label className="block text-sm text-gray-500 mb-2">Mulai Hitungan Tiap Tanggal:</label>
                  <select 
                    value={cutoffDay} 
                    onChange={e => setCutoffDay(e.target.value)}
                    className="w-full p-2 border rounded-lg text-lg font-bold mb-4"
                  >
                      {[...Array(28)].map((_, i) => <option key={i+1} value={i+1}>{i+1}</option>)}
                  </select>
                  <button onClick={() => setShowSettings(false)} className={`w-full py-2 ${theme.bg} text-white rounded-lg`}>Simpan</button>
              </div>
          </div>
      )}

      {/* --- MODAL HISTORY (ARSIP) --- */}
      {showHistory && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white p-4 rounded-2xl w-full max-w-sm h-3/4 flex flex-col">
                <div className="flex justify-between mb-4">
                    <h3 className="font-bold">Riwayat Laporan</h3>
                    <button onClick={() => setShowHistory(false)}><X/></button>
                </div>
                <div className="flex-1 overflow-y-auto space-y-2">
                    {archives.length === 0 && <p className="text-center text-gray-400 mt-10">Belum ada arsip.</p>}
                    {archives.map(arc => (
                        <div key={arc.id} className="border p-3 rounded-lg flex justify-between items-center hover:bg-gray-50 cursor-pointer" onClick={() => { setViewArchive(arc); setShowHistory(false); }}>
                            <div>
                                <p className="font-bold">{arc.period}</p>
                                <p className="text-xs text-gray-500">Saldo: {rp(arc.balance)}</p>
                            </div>
                            <ChevronDown className="-rotate-90 text-gray-300"/>
                        </div>
                    ))}
                </div>
                {/* Tombol Arsipkan Manual */}
                <button 
                    onClick={() => {
                        const newArc = {
                            id: Date.now(),
                            period: headerMonthLabel,
                            expenses: [...expenses],
                            budget: budget,
                            balance: balance,
                            isoDate: new Date().toISOString().slice(0,7) // YYYY-MM
                        };
                        setArchives([newArc, ...archives]);
                        setExpenses([]); // Reset
                        setShowHistory(false);
                    }}
                    className="mt-4 w-full py-2 bg-gray-800 text-white rounded-lg text-sm font-bold"
                >
                    Arsip & Reset Data Sekarang
                </button>
            </div>
        </div>
      )}

    </div>
  );
};

export default SapiFinanceApp;
