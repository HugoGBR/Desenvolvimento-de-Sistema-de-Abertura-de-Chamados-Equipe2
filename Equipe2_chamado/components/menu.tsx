'use client'
import { cn } from "@/lib/utils";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { useEffect, useState } from "react";


export default function NavbarDemo() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div>
            <div className="relative w-full flex items-center justify-center">
                <Navbar className="top-2" />
            </div>
            <button
                onClick={toggleDarkMode}
                className="fixed bottom-4 right-4 p-2 bg-gray-400 text-white rounded"
            >
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
        </div>
    );
}

function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
    return (
        <div
            className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
        >
            <Menu setActive={setActive}>
                <MenuItem setActive={setActive} active={active} item="Cadastros">
                    <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink href="/routes/usuario">Usuarios</HoveredLink>
                        <HoveredLink href="/routes/categoria">Categoria</HoveredLink>
                    </div>
                </MenuItem>
                <MenuItem setActive={setActive} active={active} item="Chamados">
                    <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink href="/routes/chamados">Chamados</HoveredLink>
                    </div>
                </MenuItem>
                <MenuItem setActive={setActive} active={active} item="Resolver chamados">
                    <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink href="/routes/resolverChamado">Resolver</HoveredLink>
                    </div>
                </MenuItem>
                <MenuItem setActive={setActive} active={active} item="Historico">
                    <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink href="/routes/historico">Historico</HoveredLink>
                    </div>
                </MenuItem>
            </Menu>
        </div>
    );
}
