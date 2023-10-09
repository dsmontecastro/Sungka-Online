/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly TITLE: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}