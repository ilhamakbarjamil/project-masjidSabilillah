import { useState, useEffect } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react'; 
import { Menu, X, Bell, ChevronDown, Search, CheckCircle2, AlertCircle } from 'lucide-react'; 

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // --- PERBAIKAN DI SINI: Tambahkan default value = {} ---
    const { flash = {} } = usePage().props; 
    const [showFlash, setShowFlash] = useState(false);

    // Efek notifikasi (Cek jika flash ada isinya dulu)
    useEffect(() => {
        if (flash?.success || flash?.error || flash?.message) {
            setShowFlash(true);
            const timer = setTimeout(() => setShowFlash(false), 4000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    // Efek scroll navbar
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-[#f5f5f7]">
            
            {/* --- NOTIFIKASI TOAST --- */}
            {/* Gunakan Optional Chaining (?.) agar tidak error jika flash undefined */}
            {showFlash && (flash?.success || flash?.message) && (
                <div className="fixed top-24 right-4 z-[60] animate-in slide-in-from-right fade-in duration-300">
                    <div className="bg-emerald-600 text-white px-6 py-4 rounded-2xl shadow-xl shadow-emerald-200 flex items-center gap-3">
                        <CheckCircle2 size={24} className="text-emerald-200" />
                        <div>
                            <p className="font-bold text-sm">Berhasil!</p>
                            <p className="text-sm opacity-90">{flash.success || flash.message}</p>
                        </div>
                        <button onClick={() => setShowFlash(false)} className="ml-2 hover:bg-emerald-500 p-1 rounded-full"><X size={16}/></button>
                    </div>
                </div>
            )}
             {showFlash && flash?.error && (
                <div className="fixed top-24 right-4 z-[60] animate-in slide-in-from-right fade-in duration-300">
                    <div className="bg-red-500 text-white px-6 py-4 rounded-2xl shadow-xl shadow-red-200 flex items-center gap-3">
                        <AlertCircle size={24} className="text-red-200" />
                        <div>
                            <p className="font-bold text-sm">Gagal!</p>
                            <p className="text-sm opacity-90">{flash.error}</p>
                        </div>
                        <button onClick={() => setShowFlash(false)} className="ml-2 hover:bg-red-400 p-1 rounded-full"><X size={16}/></button>
                    </div>
                </div>
            )}

            {/* NAVBAR */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled 
                    ? 'bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm' 
                    : 'bg-[#f5f5f7] border-b border-transparent'
            }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 md:h-20 items-center">
                        <div className="flex items-center gap-8">
                            {/* Logo */}
                            <div className="shrink-0 flex items-center gap-3">
                                <Link href="/" className="group flex items-center gap-2">
                                    <div className="w-9 h-9 bg-black text-white rounded-xl flex items-center justify-center shadow-lg shadow-black/10 group-hover:scale-105 transition-transform">
                                        <span className="font-bold text-lg">S</span>
                                    </div>
                                    <span className="font-semibold text-[#1d1d1f] tracking-tight hidden md:block">Sabilillah.</span>
                                </Link>
                            </div>

                            {/* Desktop Navigation Links */}
                            <div className="hidden space-x-8 sm:-my-px sm:flex">
                                <NavLink href={route('dashboard')} active={route().current('dashboard')} className="font-medium">
                                    Overview
                                </NavLink>
                                <NavLink href={route('inventory.index')} active={route().current('inventory.*')} className="font-medium">
                                    Inventaris
                                </NavLink>
                                <NavLink href={route('finance.index')} active={route().current('finance.*')} className="font-medium">
                                    Keuangan
                                </NavLink>
                                <NavLink href={route('articles.index')} active={route().current('articles.*')} className="font-medium">
                                    Berita
                                </NavLink>
                                <NavLink href={route('schedules.index')} active={route().current('schedules.*')} className="font-medium">
                                    Agenda
                                </NavLink>
                                <NavLink href={route('donations.index')} active={route().current('donations.*')} className="font-medium">
                                    Infaq
                                </NavLink>
                                
                                {/* --- MENU KHUSUS ADMIN --- */}
                                {user.role === 'admin' && (
                                    <NavLink href={route('admin.loans.index')} active={route().current('admin.loans.*')} className="font-medium text-emerald-700">
                                        Cek Peminjaman
                                    </NavLink>
                                )}
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6 gap-4">
                            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                                <Search size={20} />
                            </button>
                            
                            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors relative">
                                <Bell size={20} />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                            </button>

                            <div className="h-6 w-px bg-gray-300"></div>

                            <div className="relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center gap-2 px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-full text-[#1d1d1f] hover:bg-white hover:shadow-sm transition ease-in-out duration-150"
                                            >
                                                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <span className="hidden md:inline">{user.name}</span>
                                                <ChevronDown size={14} className="text-gray-400" />
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <div className="px-4 py-3 border-b border-gray-100">
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Signed in as</p>
                                            <p className="text-sm font-semibold text-gray-900 truncate">{user.email}</p>
                                        </div>
                                        <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button" className="text-red-600 hover:bg-red-50">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none transition duration-150 ease-in-out"
                            >
                                {showingNavigationDropdown ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden bg-white/90 backdrop-blur-xl border-b border-gray-200'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>Overview</ResponsiveNavLink>
                        <ResponsiveNavLink href={route('inventory.index')} active={route().current('inventory.*')}>Inventaris</ResponsiveNavLink>
                        <ResponsiveNavLink href={route('finance.index')} active={route().current('finance.*')}>Keuangan</ResponsiveNavLink>
                        <ResponsiveNavLink href={route('articles.index')} active={route().current('articles.*')}>Berita</ResponsiveNavLink>
                        <ResponsiveNavLink href={route('schedules.index')} active={route().current('schedules.*')}>Agenda</ResponsiveNavLink>
                        <ResponsiveNavLink href={route('donations.index')} active={route().current('donations.*')}>Infaq</ResponsiveNavLink> 

                        {user.role === 'admin' && (
                            <ResponsiveNavLink href={route('admin.loans.index')} active={route().current('admin.loans.*')} className="text-emerald-700 font-bold">
                                Cek Peminjaman
                            </ResponsiveNavLink> 
                        )}
                    </div>

                    <div className="pt-4 pb-4 border-t border-gray-200">
                        <div className="px-4 flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-lg">
                                {user.name.charAt(0)}
                            </div>
                            <div>
                                <div className="font-medium text-base text-gray-800">{user.name}</div>
                                <div className="font-medium text-sm text-gray-500">{user.email}</div>
                            </div>
                        </div>
                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button" className="text-red-600">Log Out</ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="pt-20 md:pt-24 pb-6"> 
                {header && (
                    <header>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}
            </div>

            <main className="animate-in fade-in duration-500">
                {children}
            </main>
        </div>
    );
}