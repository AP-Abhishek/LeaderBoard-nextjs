import { Metadata } from "next";
import { Itim } from "next/font/google";

const itim = Itim({
    weight: "400",
    subsets: ["latin"],
    display: "swap"
});

export const metadata: Metadata = {
    title: 'LeaderBoard',
    icons: {
        icon: '/winner.png'
    }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={itim.className}>
            <body className={itim.className}>
                {children}
            </body>
        </html>
    )
}
