import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Welcome/Navbar';
import Hero from '@/Components/Welcome/Hero';
import Features from '@/Components/Welcome/Features';
import TrendingClips from '@/Components/Welcome/TrendingClips';
import CTA from '@/Components/Welcome/CTA';
import Footer from '@/Components/Welcome/Footer';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome | ClipTube" />
            <div className="bg-slate-50 min-h-screen font-sans selection:bg-indigo-200 selection:text-indigo-900">
                <Navbar auth={auth} />
                <main className="overflow-hidden">
                    <Hero />
                    <Features />
                    <TrendingClips />
                    <CTA />
                </main>
                <Footer />
            </div>
        </>
    );
}
