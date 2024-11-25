
import { useRouter } from "next/router";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
    const router = useRouter();

    useEffect(() => {
        if (!router.isReady) return;
        // ...existing code...
    }, [router.isReady]);

    return <Component {...pageProps} />;
}

export default MyApp;