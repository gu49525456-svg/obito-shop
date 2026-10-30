'use client';
import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, Flame, Sparkles, User, ShoppingBag, Gift, RefreshCw, 
  CreditCard, Key, CheckCircle, AlertCircle, Search, Menu, X, 
  ChevronRight, Trophy, Clock, Lock, ExternalLink, Settings, 
  Plus, Edit, Trash2, Check, XCircle, LogOut, ArrowRight, Zap,
  TrendingUp, Users, DollarSign, Award, Star, History, HelpCircle,
  Copy, Image as ImageIcon, Layout, Tag, Sliders, Eye, EyeOff, Upload,
  Percent, FileText, CheckSquare, Layers
} from 'lucide-react';

// --- UTILITY HASH SIMULATOR FOR SECURITY REQUIREMENTS ---
const hashPassword = (plain) => {
  let hash = 0;
  for (let i = 0; i < plain.length; i++) {
    const char = plain.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return `hashed_${Math.abs(hash).toString(16)}`;
};

// INITIAL ADMIN CREDENTIALS HASH (Password: nu112522)
const INITIAL_ADMIN_HASH = hashPassword('nu112522');

// --- INITIAL DATA STORES ---
const INITIAL_SITE_CONFIG = {
  logoTitle: 'OBITO SHOP',
  tagline: 'Kamui Gaming Store',
  heroBannerUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=1200',
  heroHeading: 'ร้านจำหน่ายไอดีเกม & บริการเติมเกม อันดับ 1',
  heroSubheading: 'รับประกันความปลอดภัย 100% ระบบอัตโนมัติ 24 ชม. รหัสสะอาด การันตีไม่มีการดึงคืน',
  announcement: '🔥 โปรโมชั่นต้อนรับกิจกรรมใหม่! สุ่มวงล้อเริ่มต้นเพียง 25 เครดิต การันตีรหัสแท้ 100%',
  primaryThemeColor: '#FF7A18',
  secondaryThemeColor: '#E53935',
  contactFb: 'ObitoShop Official',
  contactLine: '@obitoshop',
  characterImageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
};

const INITIAL_GAMES = [
  { id: 'roblox', name: 'Roblox', icon: '🎮', banner: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=600' },
  { id: 'rov', name: 'Arena of Valor (ROV)', icon: '⚔️', banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600' },
  { id: 'freefire', name: 'Free Fire', icon: '🔥', banner: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=600' }
];

const INITIAL_ACCOUNTS = [
  {
    id: 'acc-1',
    gameId: 'roblox',
    title: 'ไอดี Blox Fruits เลเวลตัน + ผลโมจิตื่นครบ + หมัดมังกร',
    price: 490,
    stock: 3,
    image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&q=80&w=500',
    details: 'รายละเอียด: Level 2550 (Max) | Melee: Godhuman / Dragon Talon | Sword: Cursed Dual Katana | Fruit: Dough Awakened',
    credentials: ['user_bf_01:pass_blox_998', 'user_bf_02:pass_blox_771', 'user_bf_03:pass_blox_334'],
    soldCount: 18,
    status: 'ACTIVE'
  },
  {
    id: 'acc-2',
    gameId: 'rov',
    title: 'ไอดี ROV แรงค์คอนเควรอเรอร์ สกิน Dimension Breaker Violet',
    price: 1290,
    stock: 1,
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=500',
    details: 'ฮีโร่ครบ 112 ตัว | สกิน 240+ | รูน 30 ครบทุกสาย | รับประกันไม่ติดล็อค สะอาด 100%',
    credentials: ['rov_god_vip:pass_rov_007'],
    soldCount: 42,
    status: 'ACTIVE'
  },
  {
    id: 'acc-3',
    gameId: 'freefire',
    title: 'ไอดี Free Fire เสื้อสตรีทวิเศษ + ชุดกระต่ายขาโหด + หมัดไฟ',
    price: 350,
    stock: 4,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=500',
    details: 'ไอดีเชื่อม Facebook สะอาด เปลี่ยนรหัสได้ทันที | ปืนอัปเกรด level 7 สองกระบอก',
    credentials: ['ff_pro_01:ff_pass_11', 'ff_pro_02:ff_pass_22', 'ff_pro_03:ff_pass_33', 'ff_pro_04:ff_pass_44'],
    soldCount: 95,
    status: 'ACTIVE'
  }
];

const INITIAL_TOPUP_PACKAGES = [
  { id: 'top-rb-1', gameId: 'roblox', name: '400 Robux (Fast)', price: 150, amount: '400 Robux', status: 'ACTIVE' },
  { id: 'top-rb-2', gameId: 'roblox', name: '800 Robux (VIP Group)', price: 290, amount: '800 Robux', status: 'ACTIVE' },
  { id: 'top-rov-1', gameId: 'rov', name: '210 คูปอง ROV', price: 100, amount: '210 Vouchers', status: 'ACTIVE' },
  { id: 'top-rov-2', gameId: 'rov', name: '1,080 คูปอง ROV', price: 500, amount: '1,080 Vouchers', status: 'ACTIVE' },
  { id: 'top-ff-1', gameId: 'freefire', name: '310 เพชร Free Fire', price: 90, amount: '310 Diamonds', status: 'ACTIVE' },
  { id: 'top-ff-2', gameId: 'freefire', name: '1,060 เพชร Free Fire', price: 300, amount: '1,060 Diamonds', status: 'ACTIVE' }
];

const INITIAL_WHEEL_ITEMS = [
  { id: 'w1', name: 'ไอดี ROV สกินแท้', chance: 5, color: '#E53935', type: 'ACCOUNT', value: 'ROV-CONQ-998', image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=150' },
  { id: 'w2', name: '10 เครดิต', chance: 35, color: '#262626', type: 'CREDIT', value: 10, image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=150' },
  { id: 'w3', name: '50 เครดิต', chance: 20, color: '#FF7A18', type: 'CREDIT', value: 50, image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=150' },
  { id: 'w4', name: 'ไอดี Blox Fruits ตัน', chance: 2, color: '#E53935', type: 'ACCOUNT', value: 'BLOX-MAX-554', image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&q=80&w=150' },
  { id: 'w5', name: 'เกลือ (0 เครดิต)', chance: 28, color: '#171717', type: 'NONE', value: 0, image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=150' },
  { id: 'w6', name: '500 เครดิต Jackpot!', chance: 1, color: '#F59E0B', type: 'CREDIT', value: 500, image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=150' },
  { id: 'w7', name: '20 เครดิต', chance: 9, color: '#FF7A18', type: 'CREDIT', value: 20, image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=150' }
];

const INITIAL_PROMO_CODES = [
  { id: 'p1', code: 'OBITO2026', reward: 50, maxUses: 100, usedCount: 12, expires: '2026-12-31', status: 'ACTIVE' },
  { id: 'p2', code: 'WELCOME', reward: 20, maxUses: 500, usedCount: 88, expires: '2026-12-31', status: 'ACTIVE' }
];

const INITIAL_USERS_DB = [
  { id: 'u1', username: 'admin', passHash: INITIAL_ADMIN_HASH, role: 'ADMIN', credits: 9999, email: 'admin@obito.com', joinDate: '2026-01-01', status: 'ACTIVE' },
  { id: 'u2', username: 'ObitoFan99', passHash: hashPassword('123456'), role: 'USER', credits: 500, email: 'obito@kamui.com', joinDate: '2026-01-15', status: 'ACTIVE' }
];

export default function App() {
  // --- MANDATORY AUTH BARRIER STATE ---
  const [currentUser, setCurrentUser] = useState(null); // NULL = Forces Login View
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register' | 'forgot'
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [forgotEmail, setForgotEmail] = useState('');

  // Admin Security
  const [adminPasswordHash, setAdminPasswordHash] = useState(INITIAL_ADMIN_HASH);
  const [usersDb, setUsersDb] = useState(INITIAL_USERS_DB);

  // App Navigation & Layout
  const [currentPage, setCurrentPage] = useState('home');
  const [adminSubMenu, setAdminSubMenu] = useState('dashboard'); // 'dashboard', 'site', 'products', 'codes', 'wheel', 'topup', 'users', 'orders', 'credits'
  const [selectedGameFilter, setSelectedGameFilter] = useState('all');
  const [selectedCategoryTab, setSelectedCategoryTab] = useState('buy'); 
  const [searchQuery, setSearchQuery] = useState('');

  // Dynamic Site Config
  const [siteConfig, setSiteConfig] = useState(INITIAL_SITE_CONFIG);

  // Core Store Data
  const [accounts, setAccounts] = useState(INITIAL_ACCOUNTS);
  const [wheelItems, setWheelItems] = useState(INITIAL_WHEEL_ITEMS);
  const [topupPackages, setTopupPackages] = useState(INITIAL_TOPUP_PACKAGES);
  const [promoCodes, setPromoCodes] = useState(INITIAL_PROMO_CODES);
  const [spinCost, setSpinCost] = useState(25);

  // Transaction Logs
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [spinHistory, setSpinHistory] = useState([]);
  const [topupHistory, setTopupHistory] = useState([]);
  const [depositHistory, setDepositHistory] = useState([]);
  const [creditAuditLogs, setCreditAuditLogs] = useState([]);
  const [pendingDeposits, setPendingDeposits] = useState([
    { id: 'DEP-902', username: 'ObitoFan99', amount: 200, slipUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=300', date: '2026-03-30 09:10', status: 'PENDING' }
  ]);

  // Modals & Popups
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [postPurchaseModal, setPostPurchaseModal] = useState(null); // { orderId, title, image, credentials }
  const [spinResultModal, setSpinResultModal] = useState(null);

  // Interactive Spin state
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);

  // Deposit & Topup Forms
  const [depositAmount, setDepositAmount] = useState(100);
  const [slipFile, setSlipFile] = useState(null);
  const [isSubmittingSlip, setIsSubmittingSlip] = useState(false);
  const [topupUid, setTopupUid] = useState('');
  const [selectedTopupPkg, setSelectedTopupPkg] = useState(null);
  const [inputCode, setInputCode] = useState('');

  // Admin New Product & Code Forms
  const [newAccForm, setNewAccForm] = useState({ gameId: 'roblox', title: '', price: 100, details: '', credentials: '', image: '' });
  const [newCodeForm, setNewCodeForm] = useState({ code: '', reward: 50, maxUses: 100, expires: '2026-12-31' });
  const [userCreditAdj, setUserCreditAdj] = useState({ targetUserId: '', amount: 0, reason: '' });

  // Notifications Helper
  const triggerToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3500);
  };

  // ----------------------------------------------------
  // AUTHENTICATION LOGIC (BARRIER + ENFORCED ADMIN ROUTE)
  // ----------------------------------------------------

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const enteredHash = hashPassword(loginForm.password);

    // Hard Check for Master Admin: admin / nu112522
    if (loginForm.username === 'admin' && enteredHash === adminPasswordHash) {
      const adminAcc = {
        id: 'u1',
        username: 'admin',
        role: 'ADMIN',
        credits: 9999,
        email: 'admin@obito.com',
        joinDate: '2026-01-01',
        profilePic: siteConfig.characterImageUrl,
        favorites: []
      };
      setCurrentUser(adminAcc);
      setCurrentPage('admin'); // AUTO REDIRECT TO ADMIN DASHBOARD FOR ADMIN
      triggerToast('เข้าสู่ระบบหลังบ้าน ADMIN อัตโนมัติเรียบร้อย!', 'success');
      return;
    }

    // Check General User DB
    const foundUser = usersDb.find(u => u.username === loginForm.username && u.passHash === enteredHash);
    
    if (foundUser) {
      if (foundUser.status === 'BANNED') {
        triggerToast('บัญชีของคุณถูกระงับการใช้งาน กรุณาติดต่อ Admin', 'error');
        return;
      }

      const activeUser = {
        ...foundUser,
        profilePic: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
        favorites: []
      };
      setCurrentUser(activeUser);

      if (foundUser.role === 'ADMIN') {
        setCurrentPage('admin');
        triggerToast('เข้าสู่ระบบในฐานะ Admin เรียบร้อย!', 'success');
      } else {
        setCurrentPage('home');
        triggerToast(`ยินดีต้อนรับกลับคุณ ${foundUser.username}!`, 'success');
      }
    } else {
      triggerToast('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง', 'error');
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!registerForm.username || !registerForm.password || !registerForm.email) {
      triggerToast('กรุณากรอกข้อมูลให้ครบทุกช่อง', 'error');
      return;
    }
    if (registerForm.password !== registerForm.confirmPassword) {
      triggerToast('รหัสผ่านไม่ตรงกัน', 'error');
      return;
    }

    if (usersDb.some(u => u.username === registerForm.username)) {
      triggerToast('ชื่อผู้ใช้นี้มีในระบบแล้ว', 'error');
      return;
    }

    const newUserObj = {
      id: `u-${Date.now()}`,
      username: registerForm.username,
      passHash: hashPassword(registerForm.password),
      role: 'USER',
      credits: 50, // Welcome Bonus
      email: registerForm.email,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'ACTIVE'
    };

    setUsersDb([...usersDb, newUserObj]);
    setCurrentUser({
      ...newUserObj,
      profilePic: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      favorites: []
    });
    setCurrentPage('home');
    triggerToast('สมัครสมาชิกสำเร็จ! ได้รับโบนัสฟรี 50 เครดิต', 'success');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('home');
    setLoginForm({ username: '', password: '' });
    triggerToast('ออกจากระบบเรียบร้อย');
  };

  // ----------------------------------------------------
  // STORE & TRANSACTION LOGIC
  // ----------------------------------------------------

  const handleBuyAccount = (account) => {
    if (!currentUser) return;
    if (account.stock <= 0) {
      triggerToast('สินค้าหมดชั่วคราว', 'error');
      return;
    }
    if (currentUser.credits < account.price) {
      triggerToast('เครดิตไม่เพียงพอ กรุณาเติมเครดิตก่อนสั่งซื้อ', 'error');
      return;
    }

    // Retrieve credential
    const deliveredCredential = account.credentials[0] || 'REDEEMED-KEY-SECRET-9981';

    // Update Accounts state
    setAccounts(prev => prev.map(a => {
      if (a.id === account.id) {
        return {
          ...a,
          stock: a.stock - 1,
          soldCount: a.soldCount + 1,
          credentials: a.credentials.slice(1)
        };
      }
      return a;
    }));

    // Deduct user credit
    setCurrentUser(prev => ({ ...prev, credits: prev.credits - account.price }));

    // Create Order Record
    const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      id: orderId,
      date: new Date().toLocaleString('th-TH'),
      title: account.title,
      price: account.price,
      credentials: deliveredCredential,
      image: account.image,
      userId: currentUser.id,
      status: 'SUCCESS'
    };

    setPurchaseHistory([newOrder, ...purchaseHistory]);

    // POPUP PURCHASE SUCCESS MODAL IMMEDIATELY
    setPostPurchaseModal(newOrder);
    triggerToast('ซื้อสินค้าสำเร็จแล้ว!', 'success');
  };

  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text);
    triggerToast('คัดลอกรหัสลงคลิปบอร์ดแล้ว!', 'success');
  };

  const handleSpinWheel = () => {
    if (isSpinning || !currentUser) return;
    if (currentUser.credits < spinCost) {
      triggerToast('เครดิตไม่เพียงพอสำหรับการสุ่ม', 'error');
      return;
    }

    setCurrentUser(prev => ({ ...prev, credits: prev.credits - spinCost }));
    setIsSpinning(true);

    const totalChance = wheelItems.reduce((acc, curr) => acc + curr.chance, 0);
    let rand = Math.random() * totalChance;
    let selectedItem = wheelItems[0];

    for (let item of wheelItems) {
      if (rand < item.chance) {
        selectedItem = item;
        break;
      }
      rand -= item.chance;
    }

    const itemIndex = wheelItems.findIndex(i => i.id === selectedItem.id);
    const sliceAngle = 360 / wheelItems.length;
    const targetAngle = 360 * 5 + (360 - (itemIndex * sliceAngle + sliceAngle / 2));

    setWheelRotation(prev => prev + targetAngle);

    setTimeout(() => {
      setIsSpinning(false);
      setSpinResultModal(selectedItem);

      if (selectedItem.type === 'CREDIT' && selectedItem.value > 0) {
        setCurrentUser(u => ({ ...u, credits: u.credits + Number(selectedItem.value) }));
      }

      setSpinHistory(prev => [{
        id: `SPIN-${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toLocaleString('th-TH'),
        prizeName: selectedItem.name,
        cost: spinCost
      }, ...prev]);

    }, 4500);
  };

  const handleRedeemCode = (e) => {
    e.preventDefault();
    const codeObj = promoCodes.find(c => c.code.toUpperCase() === inputCode.trim().toUpperCase() && c.status === 'ACTIVE');
    
    if (!codeObj) {
      triggerToast('โค้ดส่วนลดไม่ถูกต้องหรือถูกปิดใช้งาน', 'error');
      return;
    }
    if (codeObj.usedCount >= codeObj.maxUses) {
      triggerToast('โค้ดนี้ถูกใช้งานครบจำนวนแล้ว', 'error');
      return;
    }

    setCurrentUser(prev => ({ ...prev, credits: prev.credits + codeObj.reward }));
    setPromoCodes(prev => prev.map(c => c.id === codeObj.id ? { ...c, usedCount: c.usedCount + 1 } : c));
    
    setDepositHistory(prev => [{
      id: `CODE-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleString('th-TH'),
      amount: codeObj.reward,
      method: `โค้ดส่วนลด (${codeObj.code})`,
      status: 'SUCCESS'
    }, ...prev]);

    setInputCode('');
    triggerToast(`ยินดีด้วย! คุณได้รับ ${codeObj.reward} เครดิต`, 'success');
  };

  // Image Upload Simulator
  const handleImageUploadSim = (e, callback) => {
    const file = e.target.files[0];
    if (file) {
      const simulatedUrl = URL.createObjectURL(file);
      callback(simulatedUrl);
      triggerToast('อัปโหลดและอัปเดตรูปภาพเรียบร้อย!');
    }
  };

  // ----------------------------------------------------
  // VIEW 1: MANDATORY LOGIN SCREEN (BEFORE ACCESSING STORE)
  // ----------------------------------------------------
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-neutral-950 flex flex-col justify-center items-center px-4 relative overflow-hidden font-sans selection:bg-orange-500 selection:text-black">
        {/* Background Decorative Glows */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* TOAST NOTIFICATIONS */}
        {toast.show && (
          <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl backdrop-blur-md border animate-bounce ${
            toast.type === 'error' ? 'bg-red-950/90 border-red-500 text-red-200' : 'bg-orange-950/90 border-orange-500 text-orange-200'
          }`}>
            {toast.type === 'error' ? <XCircle className="w-5 h-5 text-red-400" /> : <CheckCircle className="w-5 h-5 text-orange-400" />}
            <span className="font-medium text-sm">{toast.message}</span>
          </div>
        )}

        {/* LOGO HEADER */}
        <div className="text-center mb-8 space-y-2 z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-red-600 via-orange-500 to-amber-400 p-0.5 shadow-xl shadow-orange-500/30">
            <div className="w-full h-full bg-neutral-950 rounded-full flex items-center justify-center">
              <Flame className="w-9 h-9 text-orange-500" />
            </div>
          </div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-orange-400 via-red-500 to-amber-300 bg-clip-text text-transparent tracking-wider">
            {siteConfig.logoTitle}
          </h1>
          <p className="text-xs text-neutral-400 font-mono tracking-widest uppercase">กรุณาเข้าสู่ระบบเพื่อใช้งาน OBITO GAMING SHOP</p>
        </div>

        {/* AUTH CARD */}
        <div className="w-full max-w-md bg-neutral-900/90 border border-orange-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl shadow-orange-950/50 z-10">
          
          {/* TAB BUTTONS */}
          <div className="flex border-b border-neutral-800 mb-6 pb-2">
            <button 
              onClick={() => setAuthMode('login')}
              className={`flex-1 text-center font-bold pb-2 text-sm transition ${authMode === 'login' ? 'text-orange-400 border-b-2 border-orange-500' : 'text-neutral-500 hover:text-neutral-300'}`}
            >
              เข้าสู่ระบบ
            </button>
            <button 
              onClick={() => setAuthMode('register')}
              className={`flex-1 text-center font-bold pb-2 text-sm transition ${authMode === 'register' ? 'text-orange-400 border-b-2 border-orange-500' : 'text-neutral-500 hover:text-neutral-300'}`}
            >
              สมัครสมาชิก
            </button>
          </div>

          {/* FORM: LOGIN */}
          {authMode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">ชื่อผู้ใช้งาน (Username)</label>
                <input 
                  type="text" 
                  required
                  placeholder="Username" 
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">รหัสผ่าน (Password)</label>
                <input 
                  type="password" 
                  required
                  placeholder="Password" 
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <button 
                  type="button" 
                  onClick={() => setAuthMode('forgot')}
                  className="text-orange-400 hover:underline"
                >
                  ลืมรหัสผ่าน?
                </button>
              </div>

              <button 
                type="submit" 
                className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold rounded-xl text-sm shadow-lg shadow-orange-600/30 transition transform hover:scale-[1.01]"
              >
                เข้าสู่ระบบ
              </button>

              <div className="mt-4 p-3 bg-neutral-950/60 rounded-xl border border-neutral-800 text-[11px] text-neutral-400 space-y-1">
                <div className="text-amber-400 font-bold">🔑 เข้าใช้งาน Admin หลังบ้าน:</div>
                <div>Username: <span className="font-mono text-white">admin</span></div>
                <div>Password: <span className="font-mono text-white">nu112522</span></div>
              </div>
            </form>
          )}

          {/* FORM: REGISTER */}
          {authMode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">ชื่อผู้ใช้งาน</label>
                <input 
                  type="text" 
                  required
                  placeholder="Username" 
                  value={registerForm.username}
                  onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">อีเมล</label>
                <input 
                  type="email" 
                  required
                  placeholder="example@gmail.com" 
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">รหัสผ่าน</label>
                <input 
                  type="password" 
                  required
                  placeholder="Password" 
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">ยืนยันรหัสผ่าน</label>
                <input 
                  type="password" 
                  required
                  placeholder="Confirm Password" 
                  value={registerForm.confirmPassword}
                  onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-xl text-sm shadow-lg shadow-orange-600/30 transition"
              >
                ยืนยันสมัครสมาชิก
              </button>
            </form>
          )}

          {/* FORM: FORGOT PASSWORD */}
          {authMode === 'forgot' && (
            <div className="space-y-4">
              <p className="text-xs text-neutral-400">กรุณากรอกอีเมลเพื่อรับลิงก์รีเซ็ตรหัสผ่านของคุณ</p>
              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">อีเมลของคุณ</label>
                <input 
                  type="email" 
                  placeholder="yourname@gmail.com"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>
              <button 
                onClick={() => {
                  triggerToast('ส่งข้อมูลคำขอรีเซ็ตรหัสผ่านไปยังอีเมลของคุณเรียบร้อย!');
                  setAuthMode('login');
                }}
                className="w-full py-3 bg-orange-500 text-white font-bold rounded-xl text-sm"
              >
                ส่งลิงก์กู้คืน
              </button>
              <button 
                onClick={() => setAuthMode('login')}
                className="w-full text-center text-xs text-neutral-500 hover:text-white block pt-2"
              >
                กลับไปหน้าเข้าสู่ระบบ
              </button>
            </div>
          )}

        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // VIEW 2: LOGGED-IN MAIN APPLICATION
  // ----------------------------------------------------
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-orange-500 selection:text-black">
      
      {/* --- TOAST NOTIFICATIONS --- */}
      {toast.show && (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl backdrop-blur-md border animate-bounce ${
          toast.type === 'error' ? 'bg-red-950/90 border-red-500 text-red-200' : 'bg-orange-950/90 border-orange-500 text-orange-200'
        }`}>
          {toast.type === 'error' ? <XCircle className="w-5 h-5 text-red-400" /> : <CheckCircle className="w-5 h-5 text-orange-400" />}
          <span className="font-medium text-sm">{toast.message}</span>
        </div>
      )}

      {/* --- ANNOUNCEMENT BANNER --- */}
      {siteConfig.announcement && (
        <div className="bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 text-white text-xs font-bold py-2 px-4 text-center tracking-wide flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 animate-spin" />
          <span>{siteConfig.announcement}</span>
        </div>
      )}

      {/* --- NAVBAR --- */}
      <header className="sticky top-0 z-40 bg-neutral-900/90 backdrop-blur-md border-b border-orange-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div 
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-12 h-12 rounded-full bg-gradient-to-tr from-red-600 via-orange-500 to-amber-400 p-0.5 shadow-lg shadow-orange-500/30 group-hover:scale-105 transition">
              <div className="w-full h-full bg-neutral-950 rounded-full flex items-center justify-center">
                <Flame className="w-7 h-7 text-orange-500" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-black tracking-wider bg-gradient-to-r from-orange-400 via-red-500 to-amber-300 bg-clip-text text-transparent">
                {siteConfig.logoTitle}
              </span>
              <p className="text-[10px] text-neutral-400 tracking-widest uppercase font-mono">{siteConfig.tagline}</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 bg-neutral-950/80 p-1.5 rounded-full border border-neutral-800">
            <button 
              onClick={() => setCurrentPage('home')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${currentPage === 'home' ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-md' : 'text-neutral-300 hover:text-white hover:bg-neutral-800'}`}
            >
              หน้าหลัก
            </button>
            <button 
              onClick={() => { setCurrentPage('store'); setSelectedCategoryTab('buy'); }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${currentPage === 'store' && selectedCategoryTab === 'buy' ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-md' : 'text-neutral-300 hover:text-white hover:bg-neutral-800'}`}
            >
              ซื้อรหัสเกม
            </button>
            <button 
              onClick={() => { setCurrentPage('store'); setSelectedCategoryTab('spin'); }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition flex items-center gap-1.5 ${currentPage === 'store' && selectedCategoryTab === 'spin' ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-md' : 'text-neutral-300 hover:text-white hover:bg-neutral-800'}`}
            >
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              วงล้อสุ่ม
            </button>
            <button 
              onClick={() => { setCurrentPage('store'); setSelectedCategoryTab('topup'); }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${currentPage === 'store' && selectedCategoryTab === 'topup' ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-md' : 'text-neutral-300 hover:text-white hover:bg-neutral-800'}`}
            >
              เติมเกม
            </button>
            <button 
              onClick={() => setCurrentPage('deposit')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${currentPage === 'deposit' ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-md' : 'text-neutral-300 hover:text-white hover:bg-neutral-800'}`}
            >
              เติมเครดิต
            </button>
            {currentUser.role === 'ADMIN' && (
              <button 
                onClick={() => setCurrentPage('admin')}
                className={`px-4 py-2 rounded-full text-sm font-bold transition text-amber-400 border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20`}
              >
                ผู้ดูแลระบบ
              </button>
            )}
          </nav>

          {/* User Credits & Profile */}
          <div className="flex items-center gap-3">
            <div 
              onClick={() => setCurrentPage('deposit')}
              className="flex items-center gap-2 bg-neutral-950 border border-orange-500/40 px-3 py-1.5 rounded-full cursor-pointer hover:border-orange-500 transition"
            >
              <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold text-xs">฿</div>
              <span className="font-bold text-orange-400 text-sm">{currentUser.credits.toLocaleString()}</span>
              <Plus className="w-4 h-4 text-neutral-400" />
            </div>

            <button
              onClick={() => setCurrentPage('profile')}
              className="flex items-center gap-2 p-1 bg-neutral-950 border border-neutral-800 rounded-full hover:border-orange-500/50 transition"
            >
              <img src={currentUser.profilePic} alt="profile" className="w-8 h-8 rounded-full object-cover" />
              <span className="hidden md:inline font-medium text-sm pr-3 text-neutral-200">{currentUser.username}</span>
            </button>

            <button 
              onClick={handleLogout} 
              title="ออกจากระบบ" 
              className="p-2 rounded-full bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-red-400"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      {/* --- PAGE ROUTING --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ==================== HOME PAGE ==================== */}
        {currentPage === 'home' && (
          <div className="space-y-12">
            
            {/* HERO BANNER */}
            <div className="relative rounded-3xl overflow-hidden border border-orange-500/30 bg-neutral-900 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent z-10" />
              <img 
                src={siteConfig.heroBannerUrl} 
                alt="Hero Banner" 
                className="w-full h-[380px] object-cover opacity-60"
              />
              <div className="absolute inset-0 z-20 flex flex-col justify-center px-8 md:px-16 max-w-2xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold w-fit">
                  <Flame className="w-4 h-4 text-orange-500" /> OFFICIAL GAMING STORE
                </div>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
                  {siteConfig.heroHeading}
                </h1>
                <p className="text-neutral-300 text-sm md:text-base">
                  {siteConfig.heroSubheading}
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <button 
                    onClick={() => { setCurrentPage('store'); setSelectedCategoryTab('buy'); }}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold shadow-lg shadow-orange-600/30 hover:scale-105 transition flex items-center gap-2"
                  >
                    <ShoppingBag className="w-5 h-5" /> เลือกซื้อไอดี
                  </button>
                  <button 
                    onClick={() => { setCurrentPage('store'); setSelectedCategoryTab('spin'); }}
                    className="px-6 py-3 rounded-xl bg-neutral-950 border border-amber-500/50 text-amber-400 font-bold hover:bg-amber-500/10 transition flex items-center gap-2"
                  >
                    <Sparkles className="w-5 h-5 text-amber-400" /> วงล้อลุ้นโชค
                  </button>
                </div>
              </div>
            </div>

            {/* GAME CATEGORIES */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Flame className="w-6 h-6 text-orange-500" /> เลือกเกมที่คุณต้องการ
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {INITIAL_GAMES.map((game) => (
                  <div 
                    key={game.id}
                    onClick={() => { setSelectedGameFilter(game.id); setCurrentPage('store'); }}
                    className="group relative rounded-2xl overflow-hidden border border-neutral-800 hover:border-orange-500/50 bg-neutral-900 cursor-pointer transition duration-300 hover:-translate-y-1"
                  >
                    <img src={game.banner} alt={game.name} className="w-full h-44 object-cover opacity-80 group-hover:scale-105 transition duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{game.icon}</span>
                        <div>
                          <h3 className="font-bold text-lg text-white group-hover:text-orange-400 transition">{game.name}</h3>
                          <p className="text-xs text-neutral-400">ไอดี & สุ่มรหัส & เติมเกม</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-neutral-400 group-hover:text-orange-400 transition" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* HOT PRODUCTS */}
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-6">
                <TrendingUp className="w-6 h-6 text-red-500" /> สินค้ามาแรงขายดี
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {accounts.filter(a => a.status === 'ACTIVE').slice(0, 3).map((acc) => (
                  <div key={acc.id} className="bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden hover:border-orange-500/40 transition group flex flex-col justify-between">
                    <div>
                      <div className="relative h-48 overflow-hidden bg-neutral-950">
                        <img src={acc.image} alt={acc.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                        <div className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-md border border-neutral-800 px-2.5 py-1 rounded-full text-xs font-semibold text-orange-400">
                          {acc.gameId.toUpperCase()}
                        </div>
                      </div>

                      <div className="p-5 space-y-3">
                        <h3 className="font-bold text-white text-base line-clamp-2 group-hover:text-orange-400 transition">
                          {acc.title}
                        </h3>
                        <p className="text-xs text-neutral-400 line-clamp-2 bg-neutral-950/60 p-3 rounded-xl border border-neutral-800/80">
                          {acc.details}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 pt-0">
                      <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                        <div>
                          <div className="text-xs text-neutral-500">คงเหลือ {acc.stock} ชิ้น</div>
                          <div className="text-xl font-black text-orange-400">฿{acc.price.toLocaleString()}</div>
                        </div>
                        <button 
                          onClick={() => handleBuyAccount(acc)}
                          className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold transition shadow-md shadow-orange-500/20"
                        >
                          สั่งซื้อทันที
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PROMO REDEMPTION */}
            <div className="bg-gradient-to-r from-neutral-900 via-red-950/40 to-neutral-900 border border-red-500/30 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <span className="text-xs font-bold text-amber-400 tracking-wider uppercase">PROMO CODE REDEMPTION</span>
                <h3 className="text-2xl font-black text-white">มีโค้ดส่วนลดหรือโค้ดเครดิตฟรี?</h3>
                <p className="text-sm text-neutral-400">กรอกโค้ดเพื่อรับเครดิตเข้าบัญชีทันที ทดลองใช้: <span className="font-mono text-orange-400">OBITO2026</span></p>
              </div>

              <form onSubmit={handleRedeemCode} className="flex w-full md:w-auto gap-2">
                <input 
                  type="text" 
                  placeholder="กรอกโค้ดที่นี่..." 
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  className="bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500 flex-1 md:w-64"
                />
                <button type="submit" className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 font-bold rounded-xl text-white shadow-md text-sm hover:scale-105 transition">
                  ใช้งานโค้ด
                </button>
              </form>
            </div>

          </div>
        )}

        {/* ==================== STORE PAGE ==================== */}
        {currentPage === 'store' && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-neutral-900/80 p-3 rounded-2xl border border-neutral-800">
              <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
                <button 
                  onClick={() => setSelectedCategoryTab('buy')}
                  className={`px-5 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition flex items-center gap-2 ${selectedCategoryTab === 'buy' ? 'bg-orange-500 text-white shadow-md' : 'bg-neutral-950 text-neutral-400'}`}
                >
                  <ShoppingBag className="w-4 h-4" /> ซื้อรหัสเกม
                </button>
                <button 
                  onClick={() => setSelectedCategoryTab('spin')}
                  className={`px-5 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition flex items-center gap-2 ${selectedCategoryTab === 'spin' ? 'bg-orange-500 text-white shadow-md' : 'bg-neutral-950 text-neutral-400'}`}
                >
                  <Sparkles className="w-4 h-4 text-amber-300" /> วงล้อสุ่มรหัส
                </button>
                <button 
                  onClick={() => setSelectedCategoryTab('topup')}
                  className={`px-5 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition flex items-center gap-2 ${selectedCategoryTab === 'topup' ? 'bg-orange-500 text-white shadow-md' : 'bg-neutral-950 text-neutral-400'}`}
                >
                  <Zap className="w-4 h-4" /> เติมเกมออนไลน์
                </button>
              </div>

              <select 
                value={selectedGameFilter}
                onChange={(e) => setSelectedGameFilter(e.target.value)}
                className="bg-neutral-950 border border-neutral-800 text-neutral-300 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-500 w-full md:w-auto"
              >
                <option value="all">ทุกเกม (All Games)</option>
                <option value="roblox">Roblox</option>
                <option value="rov">Arena of Valor (ROV)</option>
                <option value="freefire">Free Fire</option>
              </select>
            </div>

            {selectedCategoryTab === 'buy' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {accounts
                  .filter(a => a.status === 'ACTIVE' && (selectedGameFilter === 'all' || a.gameId === selectedGameFilter))
                  .map((acc) => (
                    <div key={acc.id} className="bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden hover:border-orange-500/40 transition group flex flex-col justify-between">
                      <div>
                        <div className="relative h-48 overflow-hidden bg-neutral-950">
                          <img src={acc.image} alt={acc.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                          <div className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-md border border-neutral-800 px-2.5 py-1 rounded-full text-xs font-semibold text-orange-400">
                            {acc.gameId.toUpperCase()}
                          </div>
                        </div>

                        <div className="p-5 space-y-3">
                          <h3 className="font-bold text-white text-base line-clamp-2 group-hover:text-orange-400 transition">
                            {acc.title}
                          </h3>
                          <p className="text-xs text-neutral-400 line-clamp-3 bg-neutral-950/60 p-3 rounded-xl border border-neutral-800/80">
                            {acc.details}
                          </p>
                        </div>
                      </div>

                      <div className="p-5 pt-0">
                        <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                          <div>
                            <div className="text-xs text-neutral-500">คงเหลือ {acc.stock} ชิ้น</div>
                            <div className="text-xl font-black text-orange-400">฿{acc.price.toLocaleString()}</div>
                          </div>
                          <button 
                            onClick={() => handleBuyAccount(acc)}
                            disabled={acc.stock <= 0}
                            className={`px-4 py-2 rounded-xl text-sm font-bold transition ${
                              acc.stock > 0 
                                ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-500/20' 
                                : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                            }`}
                          >
                            {acc.stock > 0 ? 'สั่งซื้อทันที' : 'สินค้าหมด'}
                          </button>
                        </div>
                      </div>
                    </div>
                ))}
              </div>
            )}

            {selectedCategoryTab === 'spin' && (
              <div className="max-w-4xl mx-auto space-y-8">
                <div className="bg-neutral-900 border border-orange-500/30 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
                  <div className="text-center space-y-2 mb-8">
                    <span className="text-xs font-bold text-orange-400 tracking-widest uppercase">LUCKY WHEEL</span>
                    <h2 className="text-3xl font-black text-white">วงล้อเสี่ยงโชคลุ้นไอดี & เครดิต</h2>
                    <p className="text-xs text-neutral-400">ค่าสุ่มครั้งละ <span className="font-bold text-orange-400">{spinCost} เครดิต</span></p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="relative flex items-center justify-center">
                      <div className="absolute -top-3 z-30 w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[24px] border-t-red-600 filter drop-shadow-md" />
                      <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-full border-4 border-orange-500/50 p-2 shadow-2xl bg-neutral-950">
                        <div 
                          className="w-full h-full rounded-full overflow-hidden relative transition-all ease-out"
                          style={{
                            transform: `rotate(${wheelRotation}deg)`,
                            transitionDuration: isSpinning ? '4.5s' : '0s'
                          }}
                        >
                          {wheelItems.map((item, idx) => {
                            const count = wheelItems.length;
                            const rotateDeg = (360 / count) * idx;
                            const skewDeg = 90 - (360 / count);
                            return (
                              <div 
                                key={item.id}
                                className="absolute top-0 right-0 w-1/2 h-1/2 origin-bottom-left flex items-center justify-center"
                                style={{
                                  transform: `rotate(${rotateDeg}deg) skewY(-${skewDeg}deg)`,
                                  backgroundColor: item.color
                                }}
                              >
                                <span 
                                  className="text-[11px] font-bold text-white tracking-tighter absolute select-none text-center px-1"
                                  style={{
                                    transform: `skewY(${skewDeg}deg) rotate(${180 / count}deg) translate(50px, -20px)`
                                  }}
                                >
                                  {item.name}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                        <div className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-neutral-950 border-2 border-orange-500 flex items-center justify-center z-20">
                          <Flame className="w-8 h-8 text-orange-500" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 space-y-3">
                        <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">รายการของรางวัล & อัตราออก</h4>
                        <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                          {wheelItems.map((item) => (
                            <div key={item.id} className="flex items-center justify-between text-xs py-1.5 border-b border-neutral-900">
                              <span className="text-white font-medium flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                                {item.name}
                              </span>
                              <span className="text-orange-400 font-mono font-bold">{item.chance}%</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button 
                        onClick={handleSpinWheel}
                        disabled={isSpinning}
                        className={`w-full py-4 rounded-2xl font-black text-lg text-white shadow-xl transition flex items-center justify-center gap-2 ${
                          isSpinning 
                            ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed' 
                            : 'bg-gradient-to-r from-orange-500 via-red-500 to-amber-500 hover:scale-105'
                        }`}
                      >
                        <Sparkles className="w-6 h-6 text-amber-300 animate-spin" />
                        {isSpinning ? 'กำลังหมุนวงล้อ...' : `เริ่มสุ่มเลย (${spinCost} เครดิต)`}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedCategoryTab === 'topup' && (
              <div className="space-y-8">
                <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-white mb-2">เลือกแพ็กเกจเติมเกม</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    {topupPackages
                      .filter(pkg => pkg.status === 'ACTIVE' && (selectedGameFilter === 'all' || pkg.gameId === selectedGameFilter))
                      .map((pkg) => (
                        <div 
                          key={pkg.id}
                          onClick={() => setSelectedTopupPkg(pkg)}
                          className={`p-5 rounded-2xl border cursor-pointer transition flex flex-col justify-between space-y-4 ${
                            selectedTopupPkg?.id === pkg.id 
                              ? 'bg-orange-500/10 border-orange-500 text-white' 
                              : 'bg-neutral-950 border-neutral-800 text-neutral-300'
                          }`}
                        >
                          <div>
                            <div className="text-xs font-semibold text-orange-400 uppercase tracking-wider mb-1">{pkg.gameId}</div>
                            <h3 className="font-bold text-lg text-white">{pkg.name}</h3>
                            <div className="text-xs text-neutral-400 mt-1">ได้รับ: {pkg.amount}</div>
                          </div>
                          <div className="flex items-center justify-between pt-3 border-t border-neutral-800">
                            <span className="text-xl font-black text-orange-400">฿{pkg.price}</span>
                            <span className="text-xs px-3 py-1 rounded-full bg-neutral-900 font-bold text-orange-400">เลือก</span>
                          </div>
                        </div>
                    ))}
                  </div>

                  {selectedTopupPkg && (
                    <div className="mt-8 pt-8 border-t border-neutral-800 max-w-xl mx-auto space-y-4 bg-neutral-950 p-6 rounded-2xl border border-orange-500/30">
                      <h3 className="font-bold text-white text-lg">กรอกข้อมูลผู้ใช้ ({selectedTopupPkg.name})</h3>
                      <input 
                        type="text" 
                        placeholder="UID / Player ID" 
                        value={topupUid}
                        onChange={(e) => setTopupUid(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500"
                      />
                      <button 
                        onClick={() => {
                          if (!topupUid) return triggerToast('กรุณากรอก UID', 'error');
                          if (currentUser.credits < selectedTopupPkg.price) return triggerToast('เครดิตไม่เพียงพอ', 'error');
                          setCurrentUser(u => ({ ...u, credits: u.credits - selectedTopupPkg.price }));
                          triggerToast('เติมเกมสำเร็จ! รายการได้รับการบันทึกแล้ว');
                          setTopupUid('');
                          setSelectedTopupPkg(null);
                        }}
                        className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-600 font-bold text-white rounded-xl text-sm"
                      >
                        ยืนยันการเติมเงิน (฿{selectedTopupPkg.price})
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>
        )}

        {/* ==================== CREDIT DEPOSIT PAGE ==================== */}
        {currentPage === 'deposit' && (
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 md:p-10 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-orange-500" /> เติมเครดิตเข้าบัญชี
                </h2>
                <p className="text-xs text-neutral-400 mt-1">สแกนชำระผ่าน PromptPay QR Code อัตโนมัติ</p>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                {[50, 100, 300, 500, 1000].map((amt) => (
                  <button 
                    key={amt}
                    onClick={() => setDepositAmount(amt)}
                    className={`py-3 rounded-xl font-bold text-sm border transition ${
                      depositAmount === amt 
                        ? 'bg-orange-500 border-orange-500 text-white shadow-md' 
                        : 'bg-neutral-950 border-neutral-800 text-neutral-300'
                    }`}
                  >
                    ฿{amt}
                  </button>
                ))}
              </div>

              <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 flex flex-col items-center justify-center text-center space-y-4">
                <div className="bg-white p-4 rounded-xl shadow-inner">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=OBITO_SHOP_PAY_${depositAmount}`} 
                    alt="PromptPay QR" 
                    className="w-44 h-44 object-contain"
                  />
                </div>
                <div className="text-2xl font-black text-orange-400">฿{depositAmount.toLocaleString()}</div>
              </div>

              <div className="space-y-4 pt-4 border-t border-neutral-800">
                <label className="text-xs font-bold text-neutral-400 block uppercase">แนบหลักฐานการโอนเงิน (สลิป)</label>
                <div className="border-2 border-dashed border-neutral-800 rounded-2xl p-6 text-center hover:border-orange-500/50 transition bg-neutral-950/50 cursor-pointer">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => setSlipFile(e.target.files[0])}
                    className="hidden" 
                    id="slip-upload"
                  />
                  <label htmlFor="slip-upload" className="cursor-pointer space-y-2 block">
                    <Upload className="w-8 h-8 text-neutral-500 mx-auto" />
                    <span className="text-xs text-neutral-300 block font-medium">
                      {slipFile ? slipFile.name : 'คลิกเพื่อเลือกไฟล์สลิปชำระเงิน'}
                    </span>
                  </label>
                </div>

                <button 
                  onClick={() => {
                    if (!slipFile) return triggerToast('กรุณาเลือกไฟล์สลิปก่อนส่ง', 'error');
                    setIsSubmittingSlip(true);
                    setTimeout(() => {
                      setIsSubmittingSlip(false);
                      setPendingDeposits([{
                        id: `DEP-${Math.floor(1000 + Math.random() * 9000)}`,
                        username: currentUser.username,
                        amount: Number(depositAmount),
                        slipUrl: URL.createObjectURL(slipFile),
                        date: new Date().toLocaleString('th-TH'),
                        status: 'PENDING'
                      }, ...pendingDeposits]);
                      setSlipFile(null);
                      triggerToast('ส่งหลักฐานแล้ว! รอ Admin ตรวจสอบเงินเข้าบัญชี');
                    }, 1000);
                  }}
                  disabled={isSubmittingSlip}
                  className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-xl text-sm"
                >
                  {isSubmittingSlip ? 'กำลังส่ง...' : 'แจ้งการชำระเงิน'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== USER PROFILE & HISTORY PAGE ==================== */}
        {currentPage === 'profile' && (
          <div className="space-y-8">
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <img src={currentUser.profilePic} alt="profile" className="w-20 h-20 rounded-full object-cover border-2 border-orange-500" />
                <div>
                  <h2 className="text-2xl font-bold text-white">{currentUser.username}</h2>
                  <p className="text-xs text-neutral-400 mt-1">{currentUser.email}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-neutral-400">เครดิตคงเหลือ</div>
                <div className="text-2xl font-black text-orange-400">฿{currentUser.credits.toLocaleString()}</div>
              </div>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 md:p-8 space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <History className="w-5 h-5 text-orange-500" /> ประวัติการซื้อสินค้าของคุณ
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-neutral-300">
                  <thead className="bg-neutral-950 text-neutral-400 font-bold uppercase border-b border-neutral-800">
                    <tr>
                      <th className="p-3">รหัสคำสั่งซื้อ</th>
                      <th className="p-3">สินค้า</th>
                      <th className="p-3">ราคา</th>
                      <th className="p-3">รหัสที่ได้รับ</th>
                      <th className="p-3">วันที่</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    {purchaseHistory.filter(p => p.userId === currentUser.id).map((item) => (
                      <tr key={item.id} className="hover:bg-neutral-950/50">
                        <td className="p-3 font-mono text-orange-400">{item.id}</td>
                        <td className="p-3 font-semibold text-white">{item.title}</td>
                        <td className="p-3 text-orange-400 font-bold">฿{item.price}</td>
                        <td className="p-3">
                          <span className="bg-neutral-950 border border-neutral-800 px-2.5 py-1 rounded text-[11px] font-mono select-all text-amber-300">
                            {item.credentials}
                          </span>
                        </td>
                        <td className="p-3 text-neutral-500">{item.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ==================== COMPLETE ADMIN BACKEND SUITE ==================== */}
        {currentPage === 'admin' && currentUser.role === 'ADMIN' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* ADMIN SIDEBAR NAVIGATION */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-4 h-fit space-y-1">
              <div className="p-3 border-b border-neutral-800 mb-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">ADMIN CONTROLLER</span>
                <span className="text-lg font-black text-white">เมนูจัดการระบบ</span>
              </div>

              {[
                { id: 'dashboard', label: '1. Dashboard สรุปผล', icon: TrendingUp },
                { id: 'site', label: '2. จัดการหน้าเว็บไซต์ & รูป', icon: Layout },
                { id: 'products', label: '3. จัดการไอดีสินค้า', icon: ShoppingBag },
                { id: 'codes', label: '4. จัดการ PROMO CODE', icon: Tag },
                { id: 'wheel', label: '5. จัดการวงล้อสุ่ม', icon: Sparkles },
                { id: 'topup', label: '6. จัดการเติมเกม', icon: Zap },
                { id: 'users', label: '7. จัดการสมาชิก', icon: Users },
                { id: 'orders', label: '8. ตรวจสอบสลิป & เครดิต', icon: Clock },
              ].map((item) => {
                const IconComponent = item.icon;
                return (
                  <button 
                    key={item.id}
                    onClick={() => setAdminSubMenu(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold flex items-center gap-3 transition ${
                      adminSubMenu === item.id 
                        ? 'bg-amber-500 text-neutral-950 shadow-md' 
                        : 'text-neutral-400 hover:text-white hover:bg-neutral-950'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* ADMIN SUB-PANEL CONTENT */}
            <div className="lg:col-span-3 space-y-8">

              {/* 1. DASHBOARD OVERVIEW */}
              {adminSubMenu === 'dashboard' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl">
                      <div className="text-xs text-neutral-400">ยอดขายรวม</div>
                      <div className="text-2xl font-black text-amber-400">฿{purchaseHistory.reduce((a,c) => a + c.price, 0).toLocaleString()}</div>
                    </div>
                    <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl">
                      <div className="text-xs text-neutral-400">สมาชิกทั้งหมด</div>
                      <div className="text-2xl font-black text-white">{usersDb.length} คน</div>
                    </div>
                    <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl">
                      <div className="text-xs text-neutral-400">คำสั่งซื้อสำเร็จ</div>
                      <div className="text-2xl font-black text-green-400">{purchaseHistory.length} รายการ</div>
                    </div>
                    <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl">
                      <div className="text-xs text-neutral-400">สลิปที่รอตรวจสอบ</div>
                      <div className="text-2xl font-black text-red-400">{pendingDeposits.length} รายการ</div>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. SITE MANAGEMENT & IMAGE UPLOADER */}
              {adminSubMenu === 'site' && (
                <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-6">
                  <h3 className="font-bold text-white text-lg flex items-center gap-2">
                    <Layout className="w-5 h-5 text-amber-400" /> ปรับแต่งหน้าเว็บไซต์ & เปลี่ยนรูปภาพ
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-neutral-400 block mb-1">ชื่อเว็บไซต์ (Logo Title)</label>
                      <input 
                        type="text" 
                        value={siteConfig.logoTitle}
                        onChange={(e) => setSiteConfig({ ...siteConfig, logoTitle: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-neutral-400 block mb-1">ข้อความประกาศบนสุด</label>
                      <input 
                        type="text" 
                        value={siteConfig.announcement}
                        onChange={(e) => setSiteConfig({ ...siteConfig, announcement: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="text-xs text-neutral-400 block mb-1">หัวข้อแบนเนอร์หลัก (Hero Heading)</label>
                      <input 
                        type="text" 
                        value={siteConfig.heroHeading}
                        onChange={(e) => setSiteConfig({ ...siteConfig, heroHeading: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="text-xs text-neutral-400 block mb-1">อัปโหลดแบนเนอร์ใหม่จากคอมพิวเตอร์</label>
                      <div className="flex items-center gap-4">
                        <img src={siteConfig.heroBannerUrl} alt="Hero preview" className="w-24 h-14 object-cover rounded-xl border border-neutral-800" />
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => handleImageUploadSim(e, (url) => setSiteConfig(s => ({ ...s, heroBannerUrl: url })))}
                          className="text-xs text-neutral-400"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. PRODUCT & INVENTORY MANAGEMENT */}
              {adminSubMenu === 'products' && (
                <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-6">
                  <h3 className="font-bold text-white text-lg flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-amber-400" /> จัดการสินค้าและเพิ่มรหัส
                  </h3>

                  {/* Add New Product Form */}
                  <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 space-y-4">
                    <h4 className="text-xs font-bold text-amber-400 uppercase">+ เพิ่มสินค้าใหม่</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input 
                        type="text" 
                        placeholder="ชื่อสินค้า" 
                        value={newAccForm.title}
                        onChange={(e) => setNewAccForm({ ...newAccForm, title: e.target.value })}
                        className="bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
                      />
                      <input 
                        type="number" 
                        placeholder="ราคา (บาท)" 
                        value={newAccForm.price}
                        onChange={(e) => setNewAccForm({ ...newAccForm, price: e.target.value })}
                        className="bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
                      />
                      <textarea 
                        placeholder="รหัสสินค้าคลัง (แยกบรรทัดละ 1 ชุด)" 
                        rows={2}
                        value={newAccForm.credentials}
                        onChange={(e) => setNewAccForm({ ...newAccForm, credentials: e.target.value })}
                        className="md:col-span-2 bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                      />
                    </div>
                    <button 
                      onClick={() => {
                        if (!newAccForm.title) return triggerToast('กรุณากรอกชื่อสินค้า', 'error');
                        const creds = newAccForm.credentials.split('\n').filter(c => c.trim().length > 0);
                        setAccounts([{
                          id: `acc-${Date.now()}`,
                          gameId: newAccForm.gameId,
                          title: newAccForm.title,
                          price: Number(newAccForm.price),
                          stock: creds.length || 1,
                          image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=500',
                          details: 'รายละเอียดสินค้า',
                          credentials: creds.length > 0 ? creds : ['demo_user:demo_pass'],
                          soldCount: 0,
                          status: 'ACTIVE'
                        }, ...accounts]);
                        setNewAccForm({ gameId: 'roblox', title: '', price: 100, details: '', credentials: '', image: '' });
                        triggerToast('เพิ่มสินค้าสำเร็จแล้ว!');
                      }}
                      className="px-4 py-2 bg-amber-500 text-neutral-950 font-bold rounded-xl text-xs"
                    >
                      บันทึกสินค้าใหม่
                    </button>
                  </div>

                  {/* Existing Products List */}
                  <div className="space-y-3">
                    {accounts.map(acc => (
                      <div key={acc.id} className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <img src={acc.image} className="w-12 h-12 object-cover rounded-xl" />
                          <div>
                            <div className="font-bold text-white text-xs">{acc.title}</div>
                            <div className="text-[11px] text-neutral-500">คงเหลือ: {acc.stock} | ราคา: ฿{acc.price}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => setAccounts(accounts.map(a => a.id === acc.id ? { ...a, status: a.status === 'ACTIVE' ? 'HIDDEN' : 'ACTIVE' } : a))}
                            className="px-3 py-1.5 rounded-xl text-xs border border-neutral-800 text-neutral-300"
                          >
                            {acc.status === 'ACTIVE' ? 'ซ่อน' : 'เปิดขาย'}
                          </button>
                          <button 
                            onClick={() => setAccounts(accounts.filter(a => a.id !== acc.id))}
                            className="p-1.5 rounded-xl bg-red-950 border border-red-500/30 text-red-400"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. PROMO CODE CREATOR */}
              {adminSubMenu === 'codes' && (
                <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-6">
                  <h3 className="font-bold text-white text-lg flex items-center gap-2">
                    <Tag className="w-5 h-5 text-amber-400" /> จัดการ PROMO CODE
                  </h3>

                  <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 space-y-3">
                    <h4 className="text-xs font-bold text-amber-400 uppercase">+ สร้างโค้ดใหม่</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <input 
                        type="text" 
                        placeholder="ชื่อโค้ด (เช่น GIFT2026)" 
                        value={newCodeForm.code}
                        onChange={(e) => setNewCodeForm({ ...newCodeForm, code: e.target.value })}
                        className="bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
                      />
                      <input 
                        type="number" 
                        placeholder="เครดิตที่ได้รับ" 
                        value={newCodeForm.reward}
                        onChange={(e) => setNewCodeForm({ ...newCodeForm, reward: Number(e.target.value) })}
                        className="bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
                      />
                      <input 
                        type="number" 
                        placeholder="จำนวนครั้งที่ใช้ได้" 
                        value={newCodeForm.maxUses}
                        onChange={(e) => setNewCodeForm({ ...newCodeForm, maxUses: Number(e.target.value) })}
                        className="bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <button 
                      onClick={() => {
                        if (!newCodeForm.code) return triggerToast('กรุณากรอกชื่อโค้ด', 'error');
                        setPromoCodes([{
                          id: `p-${Date.now()}`,
                          code: newCodeForm.code.toUpperCase(),
                          reward: newCodeForm.reward,
                          maxUses: newCodeForm.maxUses,
                          usedCount: 0,
                          expires: newCodeForm.expires,
                          status: 'ACTIVE'
                        }, ...promoCodes]);
                        setNewCodeForm({ code: '', reward: 50, maxUses: 100, expires: '2026-12-31' });
                        triggerToast('สร้างโค้ดสำเร็จ!');
                      }}
                      className="px-4 py-2 bg-amber-500 text-neutral-950 font-bold rounded-xl text-xs"
                    >
                      สร้างโค้ด
                    </button>
                  </div>

                  <div className="space-y-2">
                    {promoCodes.map(code => (
                      <div key={code.id} className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-mono text-amber-400 font-bold mr-3">{code.code}</span>
                          <span className="text-neutral-400">รางวัล: {code.reward} เครดิต | ใช้แล้ว: {code.usedCount}/{code.maxUses}</span>
                        </div>
                        <button 
                          onClick={() => setPromoCodes(promoCodes.filter(c => c.id !== code.id))}
                          className="text-red-400"
                        >
                          ลบ
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 8. SLIP APPROVAL QUEUE */}
              {adminSubMenu === 'orders' && (
                <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-4">
                  <h3 className="font-bold text-white text-lg">รายการเติมเงินที่รอตรวจสอบ</h3>
                  {pendingDeposits.map(dep => (
                    <div key={dep.id} className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img src={dep.slipUrl} className="w-12 h-12 object-cover rounded-xl" />
                        <div>
                          <div className="font-bold text-white text-xs">{dep.username} - ฿{dep.amount}</div>
                          <div className="text-[10px] text-neutral-500">{dep.date}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => {
                            setPendingDeposits(pendingDeposits.filter(p => p.id !== dep.id));
                            triggerToast(`อนุมัติเงิน ฿${dep.amount} เข้าบัญชี ${dep.username} เรียบร้อย`);
                          }}
                          className="px-3 py-1.5 bg-green-600 text-white font-bold rounded-xl text-xs"
                        >
                          อนุมัติ
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>
        )}

      </main>

      {/* --- POPUP 1: POST PURCHASE CODE DISPLAY --- */}
      {postPurchaseModal && (
        <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-orange-500/50 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl relative">
            <button 
              onClick={() => setPostPurchaseModal(null)}
              className="absolute top-4 right-4 text-neutral-500 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <CheckCircle className="w-12 h-12 text-orange-500 mx-auto" />
              <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">OBITO SHOP</span>
              <h3 className="text-xl font-black text-white">ซื้อสินค้าสำเร็จ!</h3>
            </div>

            <div className="flex items-center gap-3 bg-neutral-950 p-3 rounded-2xl border border-neutral-800">
              <img src={postPurchaseModal.image} alt="product" className="w-14 h-14 object-cover rounded-xl" />
              <div className="flex-1 min-w-0">
                <div className="font-bold text-white text-xs truncate">{postPurchaseModal.title}</div>
                <div className="text-[11px] text-neutral-500 font-mono">คำสั่งซื้อ: {postPurchaseModal.id}</div>
              </div>
            </div>

            <div className="bg-neutral-950 p-4 rounded-2xl border border-orange-500/30 text-center space-y-2">
              <span className="text-[11px] text-neutral-400 font-medium">รหัสสินค้าของคุณ:</span>
              <div className="p-3 bg-neutral-900 rounded-xl border border-neutral-800 font-mono text-sm text-amber-300 font-bold select-all break-all">
                {postPurchaseModal.credentials}
              </div>
              <button 
                onClick={() => handleCopyText(postPurchaseModal.credentials)}
                className="w-full py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-2"
              >
                <Copy className="w-4 h-4 text-orange-400" /> คัดลอกรหัสสินค้า
              </button>
            </div>

            <button 
              onClick={() => setPostPurchaseModal(null)}
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-xl text-sm shadow-md"
            >
              ปิดหน้าต่าง
            </button>
          </div>
        </div>
      )}

      {/* --- POPUP 2: LUCKY SPIN RESULT --- */}
      {spinResultModal && (
        <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-amber-500/50 rounded-3xl max-w-sm w-full p-6 text-center space-y-4">
            <Trophy className="w-16 h-16 text-amber-400 mx-auto" />
            <h3 className="text-xl font-black text-white">ยินดีด้วย! คุณได้รับรางวัล</h3>
            <div className="p-4 bg-neutral-950 rounded-2xl border border-neutral-800 font-bold text-orange-400 text-lg">
              {spinResultModal.name}
            </div>
            <button 
              onClick={() => setSpinResultModal(null)}
              className="w-full py-3 bg-orange-500 text-white font-bold rounded-xl text-sm shadow-lg"
            >
              รับรางวัลและปิด
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
