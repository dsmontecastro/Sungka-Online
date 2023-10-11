const dev = import.meta.env.DEV;

export default function BreakPoints() {

    if (dev) return (

        <div className="m-2 p-2 fixed bottom-0 right-0
                         rounded flex items-center text-pink-600
                         3xs:text-[0.4rem] 2xs:text-[0.6rem] xs:text-xs sm:text-sm
                            md:text-base lg:text-lg xl:text-xl 2xl:text-2xl
                         border border-gray-400 bg-gray-300">

            Current breakpoint
            <span className="ml-1 hidden 3xs:inline 2xs:hidden font-extrabold">3xs</span>
            <span className="ml-1 hidden 2xs:inline xs:hidden font-extrabold">2xs</span>
            <span className="ml-1 hidden xs:inline sm:hidden font-extrabold">xs</span>
            <span className="ml-1 hidden sm:inline md:hidden font-extrabold">sm</span>
            <span className="ml-1 hidden md:inline lg:hidden font-extrabold">md</span>
            <span className="ml-1 hidden lg:inline xl:hidden font-extrabold">lg</span>
            <span className="ml-1 hidden xl:inline 2xl:hidden font-extrabold">xl</span>
            <span className="ml-1 hidden 2xl:inline font-extrabold">2xl</span>

        </div>

    );

}